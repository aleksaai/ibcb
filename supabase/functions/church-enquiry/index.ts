import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EnquiryData {
  fullName: string;
  email: string;
  message?: string;
  firstTime: boolean;
}

const HEADER_IMAGE = "https://ibcb.lovable.app/images/church-header.png";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const data: EnquiryData = await req.json();

    // Validate inputs
    if (!data.fullName?.trim() || !data.email?.trim() || data.firstTime === undefined) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 1. Send notification to church
    await resend.emails.send({
      from: "IBCB <noreply@projekt.aleksa.ai>",
      to: ["edtarleton2020@gmail.com"],
      subject: "New Church Enquiry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="${HEADER_IMAGE}" alt="IBCB Community" style="width: 100%; border-radius: 12px; margin-bottom: 24px;" />
          <h2 style="color: #3c3c3b;">Hey, we got a new enquiry for church!</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #3c3c3b;">Name</td><td style="padding: 8px 0;">${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #3c3c3b;">Email</td><td style="padding: 8px 0;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #3c3c3b;">First time visitor</td><td style="padding: 8px 0;">${data.firstTime ? "Yes" : "No"}</td></tr>
            ${data.message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #3c3c3b; vertical-align: top;">Message</td><td style="padding: 8px 0;">${data.message.replace(/\n/g, "<br>")}</td></tr>` : ""}
          </table>
          <hr style="margin-top: 24px; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    // 2. Send confirmation to user
    await resend.emails.send({
      from: "IBCB <noreply@projekt.aleksa.ai>",
      to: [data.email],
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="${HEADER_IMAGE}" alt="IBCB Community" style="width: 100%; border-radius: 12px; margin-bottom: 24px;" />
          <h2 style="color: #3c3c3b;">Hello ${data.fullName},</h2>
          <p style="color: #555; line-height: 1.6;">
            Thank you for reaching out to us! We're so glad you're interested in our community.
            We've received your message and will get back to you as soon as possible.
          </p>
          <p style="color: #555; line-height: 1.6;">
            We're looking forward to connecting with you!
          </p>
          <p style="color: #555; margin-top: 24px;">
            Warm regards,<br/>
            <strong>The IBCB Team</strong>
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in church-enquiry:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
