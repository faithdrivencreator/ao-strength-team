import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import {
  getProduct,
  parseProductSlug,
  getAuthoritativeUnitPrice,
  type Sleeve,
} from '@/data/products';
import { isValidCharityId, getCharity } from '@/data/charities';

interface CheckoutItem {
  slug: string;
  color: string;
  size: string;
  quantity: number;
  // Optional client hints. Never trusted for pricing: the server re-derives the
  // unit price from product data, and `price` (if sent) is only used to detect
  // tampering or drift, never to charge.
  sleeve?: Sleeve;
  price?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { items: CheckoutItem[]; charity?: string };

    if (!body.items || body.items.length === 0) {
      return Response.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    if (!isValidCharityId(body.charity)) {
      return Response.json(
        { error: 'Please select a charity for your tithe.' },
        { status: 400 }
      );
    }

    const charity = getCharity(body.charity)!;

    // Validate + price every line server-side before building the Stripe
    // session. Any client/server mismatch is a 400, not a silent overcharge.
    const validationError = (() => {
      for (const item of body.items) {
        const { baseSlug } = parseProductSlug(item.slug);
        const product = getProduct(baseSlug);

        if (!product) {
          return `Product not found: ${item.slug}`;
        }
        if (product.status === 'sold-out') {
          return `Product is sold out: ${product.name}`;
        }

        const unitPrice = getAuthoritativeUnitPrice(item.slug, item.sleeve);
        if (typeof unitPrice !== 'number') {
          return `Unavailable variant for ${product.name}`;
        }

        // If the client sent a price, it MUST equal the server-derived legal
        // price for this product + sleeve. Reject mismatches outright.
        if (
          typeof item.price === 'number' &&
          Math.round(item.price * 100) !== Math.round(unitPrice * 100)
        ) {
          return `Price mismatch for ${product.name}`;
        }
      }
      return null;
    })();

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const lineItems = body.items.map((item) => {
      const { baseSlug, sleeve: slugSleeve } = parseProductSlug(item.slug);
      // Non-null assertions are safe: the validation pass above already
      // confirmed the product exists and the unit price resolves.
      const product = getProduct(baseSlug)!;
      const unitPrice = getAuthoritativeUnitPrice(item.slug, item.sleeve)!;

      // Resolve the sleeve so the full variant (color / size / sleeve) flows
      // through to Stripe - the customer receipt and the print-partner work
      // order both depend on it.
      const sleeve = slugSleeve ?? item.sleeve;
      const sleeveLabel =
        sleeve === 'short' ? 'Short Sleeve' : sleeve === 'long' ? 'Long Sleeve' : '';

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: `${item.color} / ${item.size}${sleeveLabel ? ` / ${sleeveLabel}` : ''}`,
            images: product.images.length > 0
              ? [
                  `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${product.images[0]}`,
                ]
              : undefined,
            metadata: {
              collection: product.name,
              base_slug: baseSlug,
              color: item.color,
              size: item.size,
              sleeve: sleeveLabel || 'n/a',
            },
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_creation: 'always',
      line_items: lineItems,
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/shop`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        source_site: 'aostrengthteam.store',
        brand: 'ao-strength-team',
        revenue_type: 'apparel',
        tithe_charity: charity.id,
        tithe_charity_name: charity.name,
      },
      payment_intent_data: {
        statement_descriptor: 'AO STRENGTH TEAM',
        metadata: {
          source_site: 'aostrengthteam.store',
          brand: 'ao-strength-team',
          revenue_type: 'apparel',
          tithe_charity: charity.id,
          tithe_charity_name: charity.name,
        },
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
