// Server-side helper that emails a customer-reported website issue to Pete,
// the owner of AO Strength Team. Caleb (the site chat) calls this through the
// reportIssue tool when a shopper reports a bug, UX problem, or broken feature.
// It mirrors the contact route: plain Resend REST API via fetch, no SDK. It
// never throws; on any failure it returns { ok: false, error }.

export interface IssueReportInput {
  description: string;
  category: string;
  pageOrArea?: string;
  severity?: string;
  customerEmail?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendIssueReport(
  input: IssueReportInput,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[issue-report] RESEND_API_KEY missing");
      return { ok: false, error: "email not configured" };
    }

    const to = process.env.ISSUE_NOTIFY_EMAIL || "pete@fluidfaithsolutions.com";
    const from =
      process.env.CONTACT_FROM_EMAIL || "AO Strength Team <hello@aostrengthteam.store>";

    const description = (input.description ?? "").trim();
    const category = (input.category ?? "other").trim();
    const severity = input.severity?.trim() || "";
    const pageOrArea = input.pageOrArea?.trim() || "";
    const customerEmail = input.customerEmail?.trim().toLowerCase() || "";
    const hasReplyTo = customerEmail.length > 0 && isValidEmail(customerEmail);

    const submittedAt = new Date().toISOString();
    const singleLine = description.replace(/\s+/g, " ").trim();
    const short =
      singleLine.length > 60 ? singleLine.slice(0, 60).trim() : singleLine;
    const subject = `[AO Caleb Issue] ${category}${severity ? " / " + severity : ""} - ${short}`;

    const severityLabel = severity || "not specified";
    const pageLabel = pageOrArea || "not specified";
    const emailLabel = hasReplyTo ? customerEmail : "not provided";

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="font-size: 18px; margin: 0 0 8px; color: #0a0a0a;">Website issue reported through Caleb</h2>
        <p style="font-size: 13px; color: #666; margin: 0 0 16px;">A customer reported this issue using Caleb, the AO Strength Team site chat.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1a1a1a;">
          <tr><td style="padding: 6px 0; color: #666; width: 130px;">Category</td><td style="padding: 6px 0;">${escapeHtml(category)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Severity</td><td style="padding: 6px 0;">${escapeHtml(severityLabel)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Page / Area</td><td style="padding: 6px 0;">${escapeHtml(pageLabel)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Customer email</td><td style="padding: 6px 0;">${escapeHtml(emailLabel)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666; vertical-align: top;">Description</td><td style="padding: 6px 0; white-space: pre-wrap;">${escapeHtml(description)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Submitted</td><td style="padding: 6px 0; color: #888; font-size: 12px;">${submittedAt}</td></tr>
        </table>
      </div>
    `;

    const textBody = `Website issue reported through Caleb
A customer reported this issue using Caleb, the AO Strength Team site chat.

Category:       ${category}
Severity:       ${severityLabel}
Page / Area:    ${pageLabel}
Customer email: ${emailLabel}

Description:
${description}

Submitted: ${submittedAt}
`;

    const payload: {
      from: string;
      to: string[];
      reply_to?: string;
      subject: string;
      html: string;
      text: string;
    } = {
      from,
      to: [to],
      subject,
      html: htmlBody,
      text: textBody,
    };
    if (hasReplyTo) {
      payload.reply_to = customerEmail;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[issue-report] Resend email failed", res.status, errText);
      return { ok: false, error: `send failed (${res.status})` };
    }

    return { ok: true };
  } catch (err) {
    console.error("[issue-report] unexpected error", err);
    const message = err instanceof Error ? err.message : "unknown error";
    return { ok: false, error: message };
  }
}
