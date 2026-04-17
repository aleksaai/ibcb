import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FROM = "IBCB <noreply@projekt.aleksa.ai>";
const NOTIFY_TO = "info@aleksa.ai";

interface ContactData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

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

    const data: ContactData = await req.json();
    if (
      !data.fullName?.trim() || !data.email?.trim() ||
      !data.subject?.trim() || !data.message?.trim()
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userAgent = req.headers.get("user-agent") ?? "";
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      "";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: record, error } = await supabase
      .from("ibcb_contact_submissions")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        subject: data.subject,
        message: data.message,
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .select()
      .single();
    if (error) throw new Error(`DB: ${error.message}`);

    // Notification to Aleksa
    await sendMail(
      apiKey,
      [NOTIFY_TO],
      `New IBCB Contact: ${data.subject}`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New contact form submission</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:6px 0; font-weight:bold;">Name</td><td>${data.fullName}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Email</td><td>${data.email}</td></tr>
          ${
        data.phone
          ? `<tr><td style="padding:6px 0; font-weight:bold;">Phone</td><td>${data.phone}</td></tr>`
          : ""
      }
          <tr><td style="padding:6px 0; font-weight:bold;">Subject</td><td>${data.subject}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold; vertical-align:top;">Message</td><td>${
        data.message.replace(/\n/g, "<br>")
      }</td></tr>
        </table>
        <p style="color:#999; font-size:12px; margin-top:24px;">Submitted: ${new Date().toISOString()}</p>
      </div>`,
    );

    // Confirmation to submitter
    await sendMail(
      apiKey,
      [data.email],
      "We received your message — IBCB",
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#3c3c3b;">Hi ${data.fullName}, we got your message!</h2>
        <p>Subject: <strong>${data.subject}</strong></p>
        <p>We'll get back to you shortly.</p>
        <p style="color:#666;">— IBCB · International Baptist Church of Budapest</p>
      </div>`,
    );

    return new Response(
      JSON.stringify({ success: true, id: record.id }),
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
