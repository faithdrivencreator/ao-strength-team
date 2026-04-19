import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProduct } from '@/data/products';

interface CheckoutItem {
  slug: string;
  color: string;
  size: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { items: CheckoutItem[] };

    if (!body.items || body.items.length === 0) {
      return Response.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    const lineItems = body.items.map((item) => {
      const product = getProduct(item.slug);

      if (!product) {
        throw new Error(`Product not found: ${item.slug}`);
      }

      if (product.status === 'sold-out') {
        throw new Error(`Product is sold out: ${product.name}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: `${item.color} / ${item.size}`,
            images: product.images.length > 0
              ? [
                  `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${product.images[0]}`,
                ]
              : undefined,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/shop`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
