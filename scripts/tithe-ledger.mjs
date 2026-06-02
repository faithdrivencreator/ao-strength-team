/**
 * tithe-ledger.mjs
 *
 * Pulls all completed AO Strength Team orders from Stripe and produces a
 * per-charity breakdown showing exactly how much 10% tithe is owed.
 *
 * Usage:
 *   node scripts/tithe-ledger.mjs
 *   node scripts/tithe-ledger.mjs --since 2026-06-01
 *   node scripts/tithe-ledger.mjs --since 2026-06-01 --until 2026-06-30
 *
 * Reads STRIPE_SECRET_KEY from the environment or from .env.local.
 * Never moves money - reporting only.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

// ---------------------------------------------------------------------------
// Resolve script dir so relative paths work from any cwd
// ---------------------------------------------------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Load .env.local if present (simple KEY=VALUE parser, no external deps)
// ---------------------------------------------------------------------------
function loadEnvLocal() {
  const envPath = path.join(REPO_ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    // Only set if not already in process.env so real env vars win
    if (key && !(key in process.env)) {
      let val = line.slice(eq + 1).trim();
      // Strip surrounding quotes (single or double)
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

loadEnvLocal();

// ---------------------------------------------------------------------------
// Validate key
// ---------------------------------------------------------------------------
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  console.error('\nERROR: STRIPE_SECRET_KEY is not set.');
  console.error('Add it to .env.local or export it before running this script.\n');
  process.exit(1);
}

const keyMode = STRIPE_SECRET_KEY.startsWith('sk_live') ? 'LIVE' : 'TEST';

// ---------------------------------------------------------------------------
// Charity registry (mirrors src/data/charities.ts)
// ---------------------------------------------------------------------------
const CHARITIES = [
  { id: 'compassion',       name: 'Compassion International', url: 'https://www.compassion.com' },
  { id: 'samaritans-purse', name: "Samaritan's Purse",        url: 'https://www.samaritanspurse.org' },
  { id: 'mercy-ships',      name: 'Mercy Ships',              url: 'https://www.mercyships.org' },
  { id: 'world-vision',     name: 'World Vision',             url: 'https://www.worldvision.org' },
];

// Build a lookup by id -> charity
const charityMap = Object.fromEntries(CHARITIES.map((c) => [c.id, c]));

// ---------------------------------------------------------------------------
// Parse CLI args: --since YYYY-MM-DD  --until YYYY-MM-DD
// ---------------------------------------------------------------------------
function parseDateArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  const raw = process.argv[idx + 1];
  if (!raw || raw.startsWith('--')) {
    console.error(`\nERROR: ${flag} requires a date argument (YYYY-MM-DD)\n`);
    process.exit(1);
  }
  const ms = Date.parse(raw);
  if (isNaN(ms)) {
    console.error(`\nERROR: Invalid date for ${flag}: "${raw}". Use YYYY-MM-DD format.\n`);
    process.exit(1);
  }
  return Math.floor(ms / 1000); // Unix timestamp in seconds
}

const sinceTs = parseDateArg('--since');
const untilTs = parseDateArg('--until');

// Human-readable period label for filenames and output headers
function periodLabel() {
  if (sinceTs && untilTs) {
    return `${tsToDateStr(sinceTs)}_to_${tsToDateStr(untilTs)}`;
  }
  if (sinceTs) {
    return `since-${tsToDateStr(sinceTs)}`;
  }
  return 'all-time';
}

function tsToDateStr(ts) {
  return new Date(ts * 1000).toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Stripe client - match the apiVersion used by src/lib/stripe.ts
// ---------------------------------------------------------------------------
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
  typescript: false,
});

// ---------------------------------------------------------------------------
// Pull sessions
// ---------------------------------------------------------------------------
async function fetchSessions() {
  const params = {
    limit: 100,
    status: 'complete',
  };

  if (sinceTs) params.created = { ...params.created, gte: sinceTs };
  if (untilTs) params.created = { ...params.created, lte: untilTs };

  const sessions = [];
  let count = 0;

  // autopaginate returns an async iterable
  for await (const session of stripe.checkout.sessions.list(params)) {
    count++;
    // Guard: only AO Strength Team orders, only paid
    if (session.metadata?.source_site !== 'aostrengthteam.store') continue;
    if (session.payment_status !== 'paid') continue;
    sessions.push(session);
  }

  return { sessions, totalFetched: count };
}

// ---------------------------------------------------------------------------
// Group and accumulate
// ---------------------------------------------------------------------------
function buildLedger(sessions) {
  // buckets keyed by charity id or 'UNASSIGNED'
  const buckets = {};

  for (const session of sessions) {
    const charityId = session.metadata?.tithe_charity || null;
    const charityName = session.metadata?.tithe_charity_name || null;

    // Resolve to a known charity id; fallback to UNASSIGNED
    let key;
    let resolvedName;
    let resolvedUrl;

    if (charityId && charityMap[charityId]) {
      key = charityId;
      resolvedName = charityMap[charityId].name;
      resolvedUrl = charityMap[charityId].url;
    } else if (charityName) {
      // Try matching by name (case-insensitive) against known charities
      const match = CHARITIES.find(
        (c) => c.name.toLowerCase() === charityName.toLowerCase()
      );
      if (match) {
        key = match.id;
        resolvedName = match.name;
        resolvedUrl = match.url;
      } else {
        key = 'UNASSIGNED';
        resolvedName = charityName || '(none)';
        resolvedUrl = null;
      }
    } else {
      key = 'UNASSIGNED';
      resolvedName = '(none)';
      resolvedUrl = null;
    }

    if (!buckets[key]) {
      buckets[key] = {
        id: key,
        name: resolvedName,
        url: resolvedUrl,
        orders: 0,
        grossCents: 0,
      };
    }

    buckets[key].orders += 1;
    buckets[key].grossCents += session.amount_total ?? 0;
  }

  // Compute tithe on each bucket
  const rows = Object.values(buckets).map((b) => ({
    ...b,
    grossDollars: b.grossCents / 100,
    titheCents: Math.round(b.grossCents * 0.10),
    titheDollars: Math.round(b.grossCents * 0.10) / 100,
  }));

  // Sort: known charities in definition order, UNASSIGNED last
  const knownOrder = CHARITIES.map((c) => c.id);
  rows.sort((a, b) => {
    const ai = knownOrder.indexOf(a.id);
    const bi = knownOrder.indexOf(b.id);
    if (a.id === 'UNASSIGNED') return 1;
    if (b.id === 'UNASSIGNED') return -1;
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return rows;
}

// ---------------------------------------------------------------------------
// Print console table
// ---------------------------------------------------------------------------
function printTable(rows, totalFetched) {
  const totalOrders = rows.reduce((s, r) => s + r.orders, 0);
  const totalGross = rows.reduce((s, r) => s + r.grossDollars, 0);
  const totalTithe = rows.reduce((s, r) => s + r.titheDollars, 0);

  const COL = {
    charity: 28,
    orders: 8,
    gross: 14,
    tithe: 14,
    url: 36,
  };

  const hr = '-'.repeat(COL.charity + COL.orders + COL.gross + COL.tithe + COL.url + 10);

  function pad(str, len, right = false) {
    const s = String(str ?? '');
    return right ? s.padStart(len) : s.padEnd(len);
  }

  function fmtDollars(n) {
    return `$${n.toFixed(2)}`;
  }

  console.log('');
  console.log('AO STRENGTH TEAM - TITHE LEDGER');
  console.log(`Mode: ${keyMode} | Period: ${periodLabel()}`);
  console.log(`Sessions scanned: ${totalFetched} | Qualifying orders: ${totalOrders}`);
  console.log(hr);
  console.log(
    pad('CHARITY', COL.charity) +
    pad('ORDERS', COL.orders, true) +
    pad('GROSS SALES', COL.gross, true) +
    pad('10% TO GIVE', COL.tithe, true) +
    '  ' + 'DONATE URL'
  );
  console.log(hr);

  for (const row of rows) {
    const flag = row.id === 'UNASSIGNED' ? ' [!]' : '';
    console.log(
      pad(row.name + flag, COL.charity) +
      pad(row.orders, COL.orders, true) +
      pad(fmtDollars(row.grossDollars), COL.gross, true) +
      pad(fmtDollars(row.titheDollars), COL.tithe, true) +
      '  ' + (row.url ?? 'N/A - see notes below')
    );
  }

  console.log(hr);
  console.log(
    pad('TOTAL', COL.charity) +
    pad(totalOrders, COL.orders, true) +
    pad(fmtDollars(totalGross), COL.gross, true) +
    pad(fmtDollars(totalTithe), COL.tithe, true)
  );
  console.log(hr);

  const unassigned = rows.find((r) => r.id === 'UNASSIGNED');
  if (unassigned) {
    console.log('');
    console.log(
      `[!] ${unassigned.orders} order(s) had a missing or unrecognized charity.` +
      ' Review them in the Stripe dashboard and assign manually.'
    );
  }

  console.log('');
}

// ---------------------------------------------------------------------------
// Write dated markdown statement
// ---------------------------------------------------------------------------
function writeStatement(rows) {
  const now = new Date();
  const generatedOn = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  const totalOrders = rows.reduce((s, r) => s + r.orders, 0);
  const totalGross = rows.reduce((s, r) => s + r.grossDollars, 0);
  const totalTithe = rows.reduce((s, r) => s + r.titheDollars, 0);

  const label = periodLabel();
  const filename = `tithe-statement-${label}.md`;
  const outDir = path.join(REPO_ROOT, 'operations', 'tithe-statements');
  const outPath = path.join(outDir, filename);

  const unassigned = rows.find((r) => r.id === 'UNASSIGNED');

  const charityRows = rows
    .filter((r) => r.id !== 'UNASSIGNED')
    .map((r) => {
      const titheFmt = `$${r.titheDollars.toFixed(2)}`;
      const grossFmt = `$${r.grossDollars.toFixed(2)}`;
      return [
        `### ${r.name}`,
        '',
        `- Orders this period: ${r.orders}`,
        `- Gross sales: ${grossFmt}`,
        `- **Tithe to give: ${titheFmt}**`,
        `- Give here: ${r.url}`,
        '',
      ].join('\n');
    })
    .join('\n');

  const unassignedSection = unassigned
    ? [
        '## Unassigned Orders',
        '',
        `> ${unassigned.orders} order(s) did not carry a recognized charity ID.`,
        `> Gross: $${unassigned.grossDollars.toFixed(2)} | Tithe: $${unassigned.titheDollars.toFixed(2)}`,
        '>',
        '> Action: look up each session in the Stripe dashboard, identify which charity',
        '> the customer chose (or assign to the default charity), and add that amount',
        '> to the corresponding charity total above.',
        '',
      ].join('\n')
    : '';

  const md = [
    `# AO Strength Team - Tithe Statement`,
    '',
    `**Period:** ${label}`,
    `**Mode:** ${keyMode}`,
    `**Generated:** ${generatedOn}`,
    '',
    '---',
    '',
    '## Summary',
    '',
    `| Charity | Orders | Gross Sales | 10% Tithe |`,
    `|---------|--------|-------------|-----------|`,
    ...rows.map(
      (r) =>
        `| ${r.name}${r.id === 'UNASSIGNED' ? ' [UNASSIGNED]' : ''} | ${r.orders} | $${r.grossDollars.toFixed(2)} | $${r.titheDollars.toFixed(2)} |`
    ),
    `| **TOTAL** | **${totalOrders}** | **$${totalGross.toFixed(2)}** | **$${totalTithe.toFixed(2)}** |`,
    '',
    '---',
    '',
    '## Per-Charity Giving Instructions',
    '',
    charityRows,
    unassignedSection,
    '---',
    '',
    '> This statement is generated by `scripts/tithe-ledger.mjs` from live Stripe data.',
    '> It reports what to give - it does not move money.',
    '> Always verify totals in the Stripe dashboard before donating.',
  ].join('\n');

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, md, 'utf8');

  return outPath;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('\nFetching Stripe sessions...');

  let totalFetched, sessions;
  try {
    ({ sessions, totalFetched } = await fetchSessions());
  } catch (err) {
    console.error('\nStripe API error:', err.message);
    process.exit(1);
  }

  const rows = buildLedger(sessions);

  printTable(rows, totalFetched);

  if (rows.length === 0) {
    console.log('No qualifying orders found for this period.\n');
  } else {
    const outPath = writeStatement(rows);
    console.log(`Statement written to: ${outPath}\n`);
  }
}

main();
