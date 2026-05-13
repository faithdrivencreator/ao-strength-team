/**
 * Returns AO Strength Team orders waiting to ship — succeeded Stripe
 * PaymentIntents tagged with `metadata.source_site=aostrengthteam.store`
 * that don't yet have a `metadata.shipped_at` timestamp.
 *
 * Auth: same `ADMIN_PASSWORD` as /api/admin/send-shipping.
 *   - Header: `Authorization: Bearer <pw>`
 *   - Query:  `?password=<pw>`
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface StripeAddress {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
}

interface StripeCheckoutSession {
  id: string;
  amount_total: number | null;
  currency: string | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
  payment_intent: string | null;
  payment_status: string;
  metadata?: Record<string, string>;
  shipping_details?: {
    address?: StripeAddress;
    name?: string;
  } | null;
  collected_information?: {
    shipping_details?: {
      address?: StripeAddress;
      name?: string;
    } | null;
  } | null;
  created: number;
}

interface StripePaymentIntent {
  id: string;
  metadata?: Record<string, string>;
  statement_descriptor?: string | null;
  status?: string;
}

export interface PendingOrder {
  sessionId: string;
  orderRef: string;
  paymentIntent: string | null;
  customerEmail: string;
  customerName: string | null;
  customerFirstName: string | null;
  amountTotal: number;
  currency: string;
  shippingAddress: StripeAddress | null;
  itemsSummary: string;
  createdAt: string;
  ageDays: number;
}

function authorize(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const header = req.headers.get("authorization");
  if (header === `Bearer ${expected}`) return true;
  const url = new URL(req.url);
  if (url.searchParams.get("password") === expected) return true;
  return false;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY not set" },
      { status: 500 },
    );
  }

  // Last 30 days of AO-sourced succeeded payment_intents. Stripe Search
  // allows status + metadata + date in one query.
  const now = Math.floor(Date.now() / 1000);
  const thirtyDaysAgo = now - 30 * 86400;

  // Two queries: tagged orders (primary), plus a fallback for any
  // succeeded PI in the window where we use statement_descriptor or
  // metadata.brand to catch AO orders that pre-date the source_site tag.
  const queries = [
    `status:'succeeded' AND created>${thirtyDaysAgo} AND metadata['source_site']:'aostrengthteam.store'`,
    `status:'succeeded' AND created>${thirtyDaysAgo}`,
  ];

  const piMap = new Map<string, StripePaymentIntent>();
  for (const q of queries) {
    try {
      const url = new URL("https://api.stripe.com/v1/payment_intents/search");
      url.searchParams.set("query", q);
      url.searchParams.set("limit", "100");
      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${sk}`,
          "Stripe-Version": "2024-06-20",
        },
      });
      if (!res.ok) {
        console.error("[PendingOrders] Stripe search failed", q, res.status);
        continue;
      }
      const data = (await res.json()) as { data: StripePaymentIntent[] };
      for (const pi of data.data) {
        const isAO =
          pi.metadata?.source_site === "aostrengthteam.store" ||
          pi.metadata?.brand === "ao-strength-team" ||
          (pi.statement_descriptor || "")
            .toUpperCase()
            .includes("AOSTRENGTH") ||
          (pi.statement_descriptor || "").toUpperCase().includes("AO STRENGTH");
        if (!isAO) continue;
        if (!piMap.has(pi.id)) piMap.set(pi.id, pi);
      }
    } catch (err) {
      console.error("[PendingOrders] Stripe search error:", err);
    }
  }

  // Filter out already-shipped
  const pending = Array.from(piMap.values()).filter(
    (pi) => !pi.metadata?.shipped_at,
  );

  // Hydrate each PI with its Checkout Session (email, name, shipping address)
  const orders: PendingOrder[] = [];
  for (const pi of pending) {
    try {
      const url = new URL("https://api.stripe.com/v1/checkout/sessions");
      url.searchParams.set("payment_intent", pi.id);
      url.searchParams.set("limit", "1");
      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${sk}`,
          "Stripe-Version": "2024-06-20",
        },
      });
      if (!res.ok) continue;
      const sessRes = (await res.json()) as { data: StripeCheckoutSession[] };
      const session = sessRes.data?.[0] ?? null;
      if (!session) continue;
      if (!session.customer_details?.email) continue;

      const email = session.customer_details.email;
      const fullName = session.customer_details.name ?? null;
      const firstName = fullName ? fullName.split(" ")[0] : null;
      const shippingAddress =
        session.collected_information?.shipping_details?.address ??
        session.shipping_details?.address ??
        null;

      orders.push({
        sessionId: session.id,
        orderRef: session.id.slice(-8).toUpperCase(),
        paymentIntent: pi.id,
        customerEmail: email,
        customerName: fullName,
        customerFirstName: firstName,
        amountTotal: (session.amount_total ?? 0) / 100,
        currency: (session.currency ?? "usd").toUpperCase(),
        shippingAddress,
        itemsSummary: session.metadata?.items_summary ?? "",
        createdAt: new Date(session.created * 1000).toISOString(),
        ageDays: Math.floor((Date.now() / 1000 - session.created) / 86400),
      });
    } catch (err) {
      console.error("[PendingOrders] Session fetch failed for", pi.id, err);
    }
  }

  // Oldest first — those have been waiting longest. Cap at 50.
  orders.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const capped = orders.slice(0, 50);

  return NextResponse.json({ orders: capped });
}
