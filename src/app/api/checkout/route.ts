import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/shipping';
import {
  getProduct,
  parseProductSlug,
  getAuthoritativeUnitPrice,
  type Sleeve,
} from '@/data/products';
import { isValidCharityId, getCharity } from '@/data/charities';
import {
  shortSleeveVariants as warpaintShort,
  longSleeveVariants as warpaintLong,
} from '@/data/warpaint';
import {
  shortSleeveVariants as cornerstoneShort,
  longSleeveVariants as cornerstoneLong,
} from '@/data/cornerstone';
import {
  shortSleeveVariants as unbreakableShort,
  longSleeveVariants as unbreakableLong,
} from '@/data/unbreakable';
import { variants as croptopVariants } from '@/data/croptop';

// Server-side variant lookup so we can resolve the exact shirt image (garment +
// emblem) the customer chose. The cart only forwards slug / color / size /
// sleeve, so the image is resolved here from base product data.
type ImageVariant = { garmentColor: string; printColor: string; image: string };

const VARIANT_LOOKUP: Record<string, { short: ImageVariant[]; long: ImageVariant[] }> = {
  'ao-warpaint': { short: warpaintShort, long: warpaintLong },
  'ao-cornerstone': { short: cornerstoneShort, long: cornerstoneLong },
  'ao-unbreakable': { short: unbreakableShort, long: unbreakableLong },
  // Crop is single-style; both keys map to the one variant list because the
  // checkout image lookup defaults to 'short' when no sleeve is encoded.
  'ao-croptop': { short: croptopVariants, long: croptopVariants },
};

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

      // Split the combined cart color "<Garment> / <Emblem> Print" into its two
      // parts so the print partner sees garment and emblem as distinct values.
      const parts = item.color.split(' / ');
      const garmentColor = (parts[0] ?? item.color).trim();
      const emblemColor = (parts[1] ?? '').replace(/\s*Print$/i, '').trim();

      // Resolve the exact variant image (garment + emblem) the customer chose.
      // Default to 'short' for the image lookup only when no sleeve is known.
      const imageSleeve = sleeve === 'long' ? 'long' : 'short';
      const variantList = VARIANT_LOOKUP[baseSlug]?.[imageSleeve] ?? [];
      const matchedVariant = variantList.find(
        (v) => v.garmentColor === garmentColor && v.printColor === emblemColor,
      );
      const variantImage =
        matchedVariant?.image ?? (product.images.length > 0 ? product.images[0] : '');

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        'http://localhost:3000';

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: `${item.color} / ${item.size}${sleeveLabel ? ` / ${sleeveLabel}` : ''}`,
            images: variantImage ? [`${baseUrl}${variantImage}`] : undefined,
            metadata: {
              collection: product.name,
              base_slug: baseSlug,
              color: item.color,
              size: item.size,
              sleeve: sleeveLabel || 'n/a',
              garment_color: garmentColor,
              emblem_color: emblemColor || 'n/a',
              variant_image: variantImage,
            },
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    // Shipping policy: flat $7.95, free on orders $75 or more. The threshold is
    // evaluated on the pre-discount subtotal (sum of line items), matching the
    // public shipping page. USPS Priority, 3-5 business days.
    const subtotalCents = lineItems.reduce(
      (sum, li) => sum + li.price_data.unit_amount * li.quantity,
      0,
    );
    const FLAT_SHIPPING_CENTS = 795;
    const deliveryEstimate = {
      minimum: { unit: 'business_day' as const, value: 3 },
      maximum: { unit: 'business_day' as const, value: 5 },
    };
    const shippingOptions =
      subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
        ? [
            {
              shipping_rate_data: {
                type: 'fixed_amount' as const,
                fixed_amount: { amount: 0, currency: 'usd' },
                display_name: 'Free Shipping',
                delivery_estimate: deliveryEstimate,
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: 'fixed_amount' as const,
                fixed_amount: { amount: FLAT_SHIPPING_CENTS, currency: 'usd' },
                display_name: 'Standard Shipping',
                delivery_estimate: deliveryEstimate,
              },
            },
          ];

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_creation: 'always',
      line_items: lineItems,
      shipping_options: shippingOptions,
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
