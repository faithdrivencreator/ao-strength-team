/**
 * AO Strength Team - print-partner fulfillment email.
 *
 * This is the vendor work order sent to the print partner (Prodigy Athletic
 * Gear) after every completed purchase. It is intentionally NOT the dark
 * consumer brand shell. It is a clean, high-contrast, easy-to-print B2B work
 * order: white background, dark text, plain ops language.
 *
 * Writing rules enforced throughout this file: ASCII hyphen only (no em or en
 * dashes), and no exclamation points anywhere.
 */

export const PRINT_PARTNER_TO = 'Prodigy Athletic Gear <admin@prodigyathleticgear.com>';
export const PRINT_PARTNER_FROM = 'AO Strength Team <orders@aostrengthteam.store>';
export const PRINT_PARTNER_REPLYTO = 'pete@fluidfaithsolutions.com';

export interface FulfillmentItem {
  collection: string;
  sleeve: string;
  garmentColor: string;
  emblemColor: string;
  size: string;
  quantity: number;
  imageUrl: string;
  // Garment fit. 'womens' = pull the women's-cut equivalent blank. Missing => 'mens'.
  fit?: 'mens' | 'womens';
}

export interface FulfillmentOrder {
  orderRef: string;
  orderDate: string;
  customerName: string;
  shippingLines: string[];
  items: FulfillmentItem[];
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Escape a controlled text value before it is dropped into HTML. The inputs
 * here come from our own product data and Stripe, not raw user HTML, but we
 * still render every value as plain text so nothing can inject markup.
 */
function esc(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const isLongSleeve = (sleeve: string) =>
  sleeve.toLowerCase().includes('long');

const blankForItem = (item: FulfillmentItem): string => {
  const base = isLongSleeve(item.sleeve) ? 'BC 3501 (retail fit)' : 'BC 3001 (retail fit)';
  if (item.fit === 'womens') {
    return `Women's-cut equivalent of ${base}`;
  }
  return base;
};

/* ------------------------------------------------------------------ */
/* subject                                                            */
/* ------------------------------------------------------------------ */

export function buildPrintPartnerSubject(orderRef: string): string {
  return `AO Print Order - #${orderRef} - ready to fulfill`;
}

/* ------------------------------------------------------------------ */
/* main render                                                        */
/* ------------------------------------------------------------------ */

export function buildPrintPartnerEmailHtml(order: FulfillmentOrder): string {
  const FONT =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
  const INK = '#1a1a1a';
  const MUTED = '#666666';
  const BORDER = '#d4d4d4';

  const dash = (v: string) => (v && v.trim() ? esc(v) : '-');

  // One card per item: shirt image on the left, a clean spec grid on the right.
  // Garment color and emblem color are two distinct rows so the print partner
  // never has to guess which color is the ink.
  const specRow = (label: string, value: string) => `
                      <tr>
                        <td style="padding:5px 16px 5px 0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};white-space:nowrap;vertical-align:top">${esc(label)}</td>
                        <td style="padding:5px 0;font-family:${FONT};font-size:14px;font-weight:700;color:${INK};vertical-align:top">${value}</td>
                      </tr>`;

  const itemCards = order.items
    .map((item) => {
      const imageCell = item.imageUrl
        ? `<img src="${esc(item.imageUrl)}" width="120" alt="${esc(item.garmentColor)} ${esc(item.collection)}" style="display:block;width:120px;height:auto;border:1px solid #eeeeee;background:#f5f5f5">`
        : `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="120" style="border-collapse:collapse"><tr><td style="width:120px;height:120px;border:1px solid #eeeeee;background:#f5f5f5;font-family:${FONT};font-size:11px;color:${MUTED};text-align:center;line-height:1.4;vertical-align:middle">No image<br>on file</td></tr></table>`;

      return `
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border:1px solid ${BORDER};margin-bottom:14px">
            <tr>
              <td width="130" style="width:130px;padding:14px;vertical-align:top">
                ${imageCell}
              </td>
              <td style="padding:14px 14px 14px 4px;vertical-align:top">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
                  ${specRow('Design / Collection', dash(item.collection))}
                  ${specRow('Sleeve', dash(item.sleeve))}
                  ${specRow('Garment Color', dash(item.garmentColor))}
                  ${specRow('Emblem Color', dash(item.emblemColor))}
                  ${specRow('Blank', blankForItem(item))}
                  ${specRow('Size', dash(item.size))}
                  ${specRow('Fit', item.fit === 'womens'
                    ? '<span style="display:inline-block;padding:2px 8px;background:#000;color:#fff;font-weight:800;letter-spacing:0.04em">WOMEN&#39;S FIT</span>'
                    : "MEN&#39;S FIT")}
                  ${specRow('Quantity', esc(String(item.quantity)))}
                </table>
              </td>
            </tr>
          </table>`;
    })
    .join('');

  const shipTo = order.shippingLines.map((line) => esc(line)).join('<br>');

  const sectionLabel = (n: string, title: string) => `
            <tr>
              <td style="padding:28px 28px 10px 28px">
                <p style="margin:0;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED}">${esc(n)}&nbsp;&nbsp;${esc(title)}</p>
                <div style="border-top:2px solid ${INK};margin-top:8px;height:0;line-height:0;font-size:0">&nbsp;</div>
              </td>
            </tr>`;

  const kv = (label: string, value: string) => `
                  <tr>
                    <td style="padding:6px 18px 6px 0;font-family:${FONT};font-size:13px;color:${MUTED};white-space:nowrap;vertical-align:top">${esc(label)}</td>
                    <td style="padding:6px 0;font-family:${FONT};font-size:14px;color:${INK};font-weight:700;vertical-align:top">${esc(value)}</td>
                  </tr>`;

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AO Print and Fulfillment Work Order - #${esc(order.orderRef)}</title>
</head>
<body style="margin:0;padding:0;background-color:#eeeeee;-webkit-font-smoothing:antialiased">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#eeeeee;border-collapse:collapse">
  <tr>
    <td align="center" style="padding:24px 12px 40px 12px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;background-color:#ffffff;border-collapse:collapse;border:1px solid ${BORDER}">

        <!-- black header bar -->
        <tr>
          <td style="padding:24px 28px;background-color:#000000">
            <p style="margin:0;font-family:${FONT};font-size:20px;font-weight:800;letter-spacing:0.06em;color:#ffffff;text-transform:uppercase">AO STRENGTH TEAM</p>
            <p style="margin:6px 0 0 0;font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:0.14em;color:#cccccc;text-transform:uppercase">PRINT and FULFILLMENT WORK ORDER</p>
          </td>
        </tr>

        <!-- greeting -->
        <tr>
          <td style="padding:26px 28px 0 28px">
            <p style="margin:0 0 6px 0;font-family:${FONT};font-size:16px;font-weight:700;color:${INK}">Frank,</p>
            <p style="margin:0;font-family:${FONT};font-size:14px;color:${INK};line-height:1.6">A new order just came through. Everything you need to print and ship it is below.</p>
          </td>
        </tr>

        <!-- SECTION 1: ORDER -->
        ${sectionLabel('SECTION 1', 'ORDER')}
        <tr>
          <td style="padding:6px 28px 4px 28px">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
              ${kv('Order Ref', `#${order.orderRef}`)}
              ${kv('Order Date', order.orderDate)}
            </table>
          </td>
        </tr>

        <!-- SECTION 2: PRINT SPEC -->
        ${sectionLabel('SECTION 2', 'PRINT SPEC')}
        <tr>
          <td style="padding:10px 28px 4px 28px">
            ${itemCards}
          </td>
        </tr>

        <!-- SECTION 3: BLANK REFERENCE -->
        ${sectionLabel('SECTION 3', 'BLANK REFERENCE')}
        <tr>
          <td style="padding:6px 28px 4px 28px">
            <p style="margin:0 0 8px 0;font-family:${FONT};font-size:14px;color:${INK};line-height:1.6">All AO tees print on Bella+Canvas blanks, retail fit (not athletic): Short Sleeve = BC 3001, Long Sleeve = BC 3501. Match the garment color above to the Warm Stone series. Use the standard AO emblem ink tones and color codes already on file.</p>
            <p style="margin:0;font-family:${FONT};font-size:14px;color:${INK};line-height:1.6"><strong>Women&#39;s fit lines</strong> print on the women&#39;s-cut equivalent of the same Bella+Canvas blank (the FIT row on each item says WOMEN&#39;S FIT). Match the size run to the women&#39;s-cut garment.</p>
          </td>
        </tr>

        <!-- SECTION 4: SHIP TO -->
        ${sectionLabel('SECTION 4', 'SHIP TO')}
        <tr>
          <td style="padding:6px 28px 4px 28px">
            <p style="margin:0 0 10px 0;font-family:${FONT};font-size:15px;font-weight:700;color:${INK};line-height:1.6">${esc(order.customerName)}</p>
            <p style="margin:0 0 14px 0;font-family:${FONT};font-size:14px;color:${INK};line-height:1.7">${shipTo}</p>
            <p style="margin:0;font-family:${FONT};font-size:13px;color:${MUTED};line-height:1.6">Ship directly to the customer at the address above. Use AO Strength Team as the sender.</p>
          </td>
        </tr>

        <!-- SECTION 5: QUESTIONS -->
        ${sectionLabel('SECTION 5', 'QUESTIONS')}
        <tr>
          <td style="padding:6px 28px 8px 28px">
            <p style="margin:0;font-family:${FONT};font-size:14px;color:${INK};line-height:1.6">Reply to this email to reach Pete directly.</p>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="padding:24px 28px;border-top:1px solid ${BORDER}">
            <p style="margin:0;font-family:${FONT};font-size:12px;color:${MUTED};line-height:1.6">AO Strength Team - aostrengthteam.store &nbsp;&middot;&nbsp; Order #${esc(order.orderRef)}</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body></html>`;
}
