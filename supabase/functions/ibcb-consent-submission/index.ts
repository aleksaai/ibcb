import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FROM = "IBCB <noreply@projekt.aleksa.ai>";
const NOTIFY_TO = "info@aleksa.ai";

interface ConsentData {
  fullName: string;
  email: string;
  phone?: string;
  ministry: string;
  consentName: boolean;
  consentEmail: boolean;
  consentPhonePublic: boolean;
  consentPhoneOnRequest: boolean;
  signatureText: string;
}

const MINISTRY_LABEL: Record<string, string> = {
  mens_breakfast: "Men's Breakfast",
  womens_breakfast: "Women's Breakfast (Connected in Christ)",
};

async function sendMail(
  apiKey: string,
  to: string[],
  subject: string,
  html: string,
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data: ConsentData = await req.json();
    if (
      !data.fullName?.trim() || !data.email?.trim() ||
      !data.ministry?.trim() || !data.signatureText?.trim()
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    const anyConsent = data.consentName || data.consentEmail ||
      data.consentPhonePublic || data.consentPhoneOnRequest;
    if (!anyConsent) {
      return new Response(
        JSON.stringify({
          error: "At least one consent option must be selected",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userAgent = req.headers.get("user-agent") ?? "";
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      "";
    const submittedAt = new Date().toISOString();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: record, error } = await supabase
      .from("ibcb_consents")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        ministry: data.ministry,
        consent_name: data.consentName,
        consent_email: data.consentEmail,
        consent_phone_public: data.consentPhonePublic,
        consent_phone_on_request: data.consentPhoneOnRequest,
        signature_text: data.signatureText,
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .select()
      .single();
    if (error) throw new Error(`DB: ${error.message}`);

    const ministryLabel = MINISTRY_LABEL[data.ministry] ?? data.ministry;
    const consentList = [
      data.consentName && "Name (publicly visible)",
      data.consentEmail && "Email (publicly listed)",
      data.consentPhonePublic && "Phone (publicly listed)",
      data.consentPhoneOnRequest &&
      "Phone (shared privately on request only)",
    ].filter(Boolean).map((s) => `<li>${s}</li>`).join("");

    // 1) Admin notification to Aleksa (with proof metadata — GDPR evidence)
    await sendMail(
      apiKey,
      [NOTIFY_TO],
      `New GDPR Consent — ${ministryLabel}`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New consent submission</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:6px 0; font-weight:bold;">Ministry</td><td>${ministryLabel}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Name</td><td>${data.fullName}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Email</td><td>${data.email}</td></tr>
          ${
        data.phone
          ? `<tr><td style="padding:6px 0; font-weight:bold;">Phone</td><td>${data.phone}</td></tr>`
          : ""
      }
          <tr><td style="padding:6px 0; font-weight:bold; vertical-align:top;">Consents</td><td><ul style="margin:0; padding-left:18px;">${consentList}</ul></td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Digital signature</td><td>${data.signatureText}</td></tr>
        </table>
        <hr style="margin:24px 0; border:none; border-top:1px solid #eee;">
        <h3 style="color:#666; font-size:13px;">Proof metadata (GDPR)</h3>
        <table style="width:100%; color:#666; font-size:12px;">
          <tr><td style="padding:4px 0; font-weight:bold;">Consent ID</td><td>${record.id}</td></tr>
          <tr><td style="padding:4px 0; font-weight:bold;">Submitted at</td><td>${submittedAt}</td></tr>
          <tr><td style="padding:4px 0; font-weight:bold;">IP address</td><td>${
        ipAddress || "(not captured)"
      }</td></tr>
          <tr><td style="padding:4px 0; font-weight:bold;">User agent</td><td>${
        userAgent || "(not captured)"
      }</td></tr>
        </table>
      </div>`,
    );

    // 2) Confirmation to submitter (copy for their records, with Widerrufsrecht)
    await sendMail(
      apiKey,
      [data.email],
      "Your IBCB consent — copy for your records",
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#3c3c3b;">Hi ${data.fullName}, thank you!</h2>
        <p>This email confirms your consent to be listed as a contact for <strong>${ministryLabel}</strong> on our IBCB Linktree page.</p>
        <h3 style="color:#3c3c3b;">What you consented to:</h3>
        <ul>${consentList}</ul>
        <p><strong>Digital signature:</strong> "${data.signatureText}"</p>
        <p style="color:#666; font-size:13px; margin-top:24px;">
          <strong>Your rights:</strong> You can withdraw this consent at any time by emailing
          <a href="mailto:info@aleksa.ai">info@aleksa.ai</a> — your details will be removed from the
          Linktree page without undue delay. Withdrawal doesn't affect the lawfulness of processing
          based on consent before its withdrawal. No data is shared with third parties; no analytics
          or marketing use.
        </p>
        <p style="color:#999; font-size:11px;">Submitted: ${submittedAt} · Reference: ${record.id}</p>
        <p style="color:#666;">— IBCB · International Baptist Church of Budapest</p>
      </div>`,
    );

    return new Response(
      JSON.stringify({ success: true, consentId: record.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: String(e) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
