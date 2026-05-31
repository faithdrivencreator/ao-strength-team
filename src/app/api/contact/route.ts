import { NextRequest } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // ImprovMX forwards support@aostrengthteam.store -> faithdrivencreator@gmail.com.
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL || "support@aostrengthteam.store";
  const fromAddr =
    process.env.CONTACT_FROM_EMAIL || "AO Strength Team <hello@aostrengthteam.store>";
  const contactAudienceId = process.env.RESEND_CONTACT_AUDIENCE_ID;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing");
    return Response.json({ error: "Contact service not configured" }, { status: 500 });
  }

  const submittedAt = new Date().toISOString();
  const subjectLine = `[AO Contact] ${subject} - ${name}`;
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="font-size: 18px; margin: 0 0 16px; color: #0a0a0a;">New AO Strength Team contact submission</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1a1a1a;">
        <tr><td style="padding: 6px 0; color: #666; width: 110px;">Name</td><td style="padding: 6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #1a73e8;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Subject</td><td style="padding: 6px 0;">${escapeHtml(subject)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666; vertical-align: top;">Message</td><td style="padding: 6px 0; white-space: pre-wrap;">${escapeHtml(message)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Submitted</td><td style="padding: 6px 0; color: #888; font-size: 12px;">${submittedAt}</td></tr>
      </table>
    </div>
  `;
  const textBody = `New AO Strength Team contact submission

Name:    ${name}
Email:   ${email}
Subject: ${subject}

Message:
${message}

Submitted: ${submittedAt}
`;

  // 1) Notify via Resend transactional email - lands in support@aostrengthteam.store
  //    which ImprovMX forwards to faithdrivencreator@gmail.com.
  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [notifyTo],
        reply_to: email,
        subject: subjectLine,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("[contact] Resend email failed", emailRes.status, errText);
      return Response.json({ error: "Could not send message" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Resend network error", err);
    return Response.json({ error: "Network error" }, { status: 500 });
  }

  // 2) Best-effort: also add the submitter to the AO Contact Inquiries audience
  //    so we have a queryable record (Resend Audiences UI) of who's reached out.
  //    Failure here is non-fatal - the email is what matters.
  if (contactAudienceId) {
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ");
    try {
      const contactRes = await fetch(
        `https://api.resend.com/audiences/${contactAudienceId}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            unsubscribed: false,
          }),
        },
      );
      if (!contactRes.ok) {
        const errBody = await contactRes.text();
        if (!errBody.toLowerCase().includes("already")) {
          console.warn("[contact] audience add non-fatal failure", contactRes.status, errBody);
        }
      }
    } catch (err) {
      console.warn("[contact] audience add network error (non-fatal)", err);
    }
  }

  return Response.json({ ok: true });
}
