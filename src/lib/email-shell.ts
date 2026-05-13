/**
 * AO Strength Team — branded email shell.
 *
 * Plain HTML string (no React Email) to match Greenstone's pattern and avoid
 * adding `@react-email/components` as a dependency. All CSS is inline so
 * Gmail/Outlook render correctly. Table-based layout. No flex, no grid.
 *
 * Visual tokens follow the AO brand guide:
 *   - Iron Black background, Paper White ink, Steel for metadata
 *   - Inter (body 13px/300, headings 900 uppercase) + JetBrains Mono (eyebrows)
 *   - Eyebrow prefix `// ` — part of the brand's visual signature
 *   - Border-radius 0 everywhere (sharp corners, per §15 web tokens)
 *   - Buttons: solid white on Iron Black, uppercase, +0.06em tracking
 *   - Code blocks: 1px white rule above and below — no surrounding box
 */

const SITE_URL = "https://aostrengthteam.store";
const INK_60 = "rgba(255,255,255,0.60)";
const RULE = "rgba(255,255,255,0.18)";
const STEEL = "#737373";
const BG = "#000000";
const INK = "#FFFFFF";

const FONT_BODY =
  "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const FONT_MONO =
  "'JetBrains Mono','SF Mono',Menlo,Consolas,'Courier New',monospace";
const FONT_IMPORT =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap";

export interface EmailSection {
  /** e.g. "01  WELCOME TO THE TEAM" — rendered as `// 01  WELCOME TO THE TEAM` */
  eyebrow: string;
  /** Optional Inter 900 uppercase heading */
  heading?: string;
  /** Body paragraphs — string or array of paragraphs */
  body?: string | string[];
  /** Optional discount code block — 1px white rules above and below */
  code?: { value: string; note?: string };
  /** Optional 2-col mono table (label, value) */
  table?: Array<[string, string]>;
}

export interface RenderAOEmailOptions {
  /** Hidden preview text shown in inbox list */
  preheader: string;
  /** Optional override for <title> */
  title?: string;
  sections: EmailSection[];
  /** Optional CTA below the sections */
  cta?: { text: string; url: string };
  /** Sign-off line, default "— AΩ" */
  signoff?: string;
  /** Optional postscript paragraph rendered after the sign-off */
  ps?: string;
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function paragraphs(body: string | string[] | undefined): string {
  if (!body) return "";
  const arr = Array.isArray(body) ? body : [body];
  return arr
    .map(
      (p) =>
        `<p style="margin:0 0 14px;color:${INK};font-family:${FONT_BODY};font-size:13px;font-weight:300;line-height:1.6">${p}</p>`,
    )
    .join("");
}

function renderTable(rows: Array<[string, string]>): string {
  const trs = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:${STEEL};font-family:${FONT_MONO};font-size:11px;letter-spacing:0.10em;text-transform:uppercase;vertical-align:top;white-space:nowrap">${label}</td>
          <td style="padding:8px 0;color:${INK};font-family:${FONT_BODY};font-size:13px;font-weight:400;vertical-align:top">${value}</td>
        </tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:8px 0 18px 0;background-color:${BG}">${trs}</table>`;
}

function renderCode(code: { value: string; note?: string }): string {
  const note = code.note
    ? `<p style="margin:10px 0 0;color:${INK_60};font-family:${FONT_BODY};font-size:12px;font-weight:300;text-align:center;line-height:1.5">${code.note}</p>`
    : "";
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:18px 0;background-color:${BG}">
      <tr><td style="border-top:1px solid ${RULE};height:1px;line-height:1px;font-size:1px">&nbsp;</td></tr>
      <tr>
        <td style="padding:22px 0;text-align:center;background-color:${BG}">
          <span style="font-family:${FONT_MONO};font-size:18px;font-weight:500;letter-spacing:0.12em;color:${INK};text-transform:uppercase">${code.value}</span>
        </td>
      </tr>
      <tr><td style="border-top:1px solid ${RULE};height:1px;line-height:1px;font-size:1px">&nbsp;</td></tr>
    </table>
    ${note}`;
}

function renderSection(s: EmailSection): string {
  const eyebrow = `
    <p style="margin:0 0 16px;color:${STEEL};font-family:${FONT_MONO};font-size:11px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase">// ${s.eyebrow}</p>`;
  const heading = s.heading
    ? `<h2 style="margin:0 0 16px;color:${INK};font-family:${FONT_BODY};font-size:22px;font-weight:900;line-height:1.1;letter-spacing:-0.025em;text-transform:uppercase">${s.heading}</h2>`
    : "";
  const body = paragraphs(s.body);
  const table = s.table ? renderTable(s.table) : "";
  const code = s.code ? renderCode(s.code) : "";
  return `
    <tr>
      <td style="padding:28px 36px 0 36px;background-color:${BG}">
        ${eyebrow}
        ${heading}
        ${body}
        ${table}
        ${code}
      </td>
    </tr>`;
}

function renderCta(cta: { text: string; url: string }): string {
  return `
    <tr>
      <td align="left" style="padding:24px 36px 8px 36px;background-color:${BG}">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
          <tr>
            <td style="background-color:${INK};padding:0">
              <a href="${cta.url}" style="display:inline-block;padding:14px 28px;color:${BG};font-family:${FONT_BODY};font-size:16px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;background-color:${INK}">${cta.text}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

/* ------------------------------------------------------------------ */
/* main render                                                         */
/* ------------------------------------------------------------------ */

export function renderAOEmail(opts: RenderAOEmailOptions): string {
  const title = opts.title ?? "AO Strength Team";
  const signoff = opts.signoff ?? "— AΩ";

  const sectionsHtml = opts.sections.map(renderSection).join("");
  const ctaHtml = opts.cta ? renderCta(opts.cta) : "";
  const psHtml = opts.ps
    ? `<tr><td style="padding:24px 36px 0 36px;background-color:${BG}"><p style="margin:0;color:${INK_60};font-family:${FONT_BODY};font-size:13px;font-weight:300;line-height:1.6">${opts.ps}</p></td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark only">
<meta name="supported-color-schemes" content="dark only">
<title>${escapeHtml(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="${FONT_IMPORT}" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:${BG};color:${INK};-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px">${escapeHtml(opts.preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BG};border-collapse:collapse">
  <tr>
    <td align="center" style="padding:32px 16px 48px 16px;background-color:${BG}">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background-color:${BG};border-collapse:collapse">

        <!-- masthead -->
        <tr>
          <td style="padding:36px 36px 16px 36px;background-color:${BG}">
            <a href="${SITE_URL}" style="text-decoration:none;color:${INK}">
              <p style="margin:0;font-family:${FONT_BODY};font-size:22px;font-weight:900;letter-spacing:0.04em;text-transform:uppercase;color:${INK}">AΩ &nbsp;ALPHA OMEGA</p>
              <p style="margin:6px 0 0;font-family:${FONT_MONO};font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:${STEEL}">// STRENGTH TEAM</p>
            </a>
          </td>
        </tr>

        <!-- top rule -->
        <tr><td style="padding:20px 36px 0 36px;background-color:${BG}"><div style="border-top:1px solid ${RULE};height:1px;line-height:1px;font-size:1px">&nbsp;</div></td></tr>

        <!-- sections -->
        ${sectionsHtml}

        <!-- CTA -->
        ${ctaHtml}

        <!-- sign-off -->
        <tr>
          <td style="padding:28px 36px 8px 36px;background-color:${BG}">
            <p style="margin:0;color:${INK};font-family:${FONT_MONO};font-size:13px;font-weight:500;letter-spacing:0.10em">${signoff}</p>
          </td>
        </tr>

        ${psHtml}

        <!-- spam-folder reminder (every transactional email) -->
        <tr>
          <td style="padding:32px 36px 0 36px;background-color:${BG}">
            <p style="margin:0 0 6px;color:${STEEL};font-family:${FONT_MONO};font-size:10px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase">// A NOTE ON DELIVERABILITY</p>
            <p style="margin:0;color:${INK_60};font-family:${FONT_BODY};font-size:12px;font-weight:300;line-height:1.6">If our emails aren&rsquo;t landing in your inbox, check your spam or promotions folder. Mark us as &ldquo;Not spam&rdquo; so future order updates, tracking, and tracking links don&rsquo;t get lost.</p>
          </td>
        </tr>

        <!-- footer rule -->
        <tr><td style="padding:36px 36px 12px 36px;background-color:${BG}"><div style="border-top:1px solid ${RULE};height:1px;line-height:1px;font-size:1px">&nbsp;</div></td></tr>

        <!-- footer line -->
        <tr>
          <td style="padding:0 36px 36px 36px;background-color:${BG}">
            <p style="margin:0;color:${STEEL};font-family:${FONT_MONO};font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;line-height:1.6">
              &copy; 2026 AO STRENGTH TEAM &nbsp;&middot;&nbsp; ST. AUGUSTINE, FL &nbsp;&middot;&nbsp; <a href="${SITE_URL}" style="color:${STEEL};text-decoration:none">AOSTRENGTHTEAM.STORE</a> &nbsp;&middot;&nbsp; <a href="${SITE_URL}/unsubscribe" style="color:${STEEL};text-decoration:underline">UNSUBSCRIBE</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body></html>`;
}
