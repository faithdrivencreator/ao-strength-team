# Tithe Ledger

Reports exactly how much 10% tithe is owed to each of the 4 charities from AO Strength Team Stripe orders. Reads live Stripe data. Never moves money.

## Run commands

All-time (every completed order ever):
```
node scripts/tithe-ledger.mjs
```

Since a date (e.g. start of June 2026):
```
node scripts/tithe-ledger.mjs --since 2026-06-01
```

Scoped to a specific range (e.g. Q2 2026):
```
node scripts/tithe-ledger.mjs --since 2026-04-01 --until 2026-06-30
```

Run from the repo root (`/Users/pedrofluriach/Ventures/AOStrengthTeam/website`).

## What it reads

- `STRIPE_SECRET_KEY` from `.env.local` (or the environment if already exported)
- All Stripe Checkout Sessions that are `status: complete` and `payment_status: paid` with `metadata.source_site === 'aostrengthteam.store'`
- The `tithe_charity` and `tithe_charity_name` metadata fields written at checkout

## What it produces

1. A console table: charity | orders | gross sales | 10% to give | donate URL
2. A markdown statement in `operations/tithe-statements/tithe-statement-<period>.md` with per-charity giving instructions and direct donation URLs

## Important

- It never moves money - it only reports what to give
- "LIVE" or "TEST" mode is shown based on the `sk_live` or `sk_test` key prefix
- Orders with a missing or unknown charity land in an UNASSIGNED bucket and are flagged so you can handle them manually
- Run it at any cadence (monthly, quarterly, whenever) and donate based on the output

## Charities

| ID | Name | URL |
|----|------|-----|
| compassion | Compassion International | https://www.compassion.com |
| samaritans-purse | Samaritan's Purse | https://www.samaritanspurse.org |
| mercy-ships | Mercy Ships | https://www.mercyships.org |
| world-vision | World Vision | https://www.worldvision.org |
