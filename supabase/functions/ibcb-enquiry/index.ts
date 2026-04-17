import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FROM = "IBCB <noreply@projekt.aleksa.ai>";
const PASTOR_EMAIL = "edtarleton2020@gmail.com";

interface EnquiryData {
  fullName: string;
  email: string;
  message?: string;
  firstTime: boolean;
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

    const data: EnquiryData = await req.json();
    if (
      !data.fullName?.trim() || !data.email?.trim() ||
      data.firstTime === undefined
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
      .from("ibcb_enquiries")
      .insert({
        full_name: data.fullName,
        email: data.email,
        message: data.message ?? null,
        first_time: data.firstTime,
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .select()
      .single();
    if (error) throw new Error(`DB: ${error.message}`);

    // Notification to Pastor Ed
    await sendMail(
      apiKey,
      [PASTOR_EMAIL],
      "New Church Enquiry",
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#3c3c3b;">New church enquiry</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:6px 0; font-weight:bold;">Name</td><td>${data.fullName}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Email</td><td>${data.email}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">First time</td><td>${
        data.firstTime ? "Yes" : "No"
      }</td></tr>
          ${
        data.message
          ? `<tr><td style="padding:6px 0; font-weight:bold; vertical-align:top;">Message</td><td>${
            data.message.replace(/\n/g, "<br>")
          }</td></tr>`
          : ""
      }
        </table>
        <p style="color:#999; font-size:12px; margin-top:24px;">Submitted: ${new Date().toISOString()}</p>
      </div>`,
    );

    // Confirmation to submitter
    await sendMail(
      apiKey,
      [data.email],
      "Thanks for reaching out to IBCB",
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#3c3c3b;">Hi ${data.fullName}, thanks for reaching out!</h2>
        <p>We've received your message and Pastor Ed will get back to you soon.</p>
        <p>Looking forward to welcoming you — may God bless you!</p>
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
