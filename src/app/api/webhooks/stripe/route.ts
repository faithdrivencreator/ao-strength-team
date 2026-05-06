import { NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Webhook signature or secret missing", { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown signature error";
    console.error("Stripe webhook signature verification failed:", message);
    return new Response(`Webhook signature verification failed: ${message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe] Checkout completed:", {
        id: session.id,
        amount_total: session.amount_total,
        customer_email: session.customer_details?.email,
        shipping_address: session.collected_information?.shipping_details?.address,
      });
      // TODO: persist order, send fulfillment email, notify owner
      break;
    }
    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log("[stripe] Payment intent succeeded:", intent.id);
      break;
    }
    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.warn("[stripe] Payment failed:", intent.id, intent.last_payment_error?.message);
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      console.log("[stripe] Charge refunded:", charge.id, charge.amount_refunded);
      break;
    }
    default:
      console.log(`[stripe] Unhandled event type: ${event.type}`);
  }

  return Response.json({ received: true });
}
