import Link from 'next/link';

export const metadata = {
  title: 'Order Confirmed | Alpha Omega Strength Team',
  description: 'Your order has been confirmed. Thank you for joining the Strength Team.',
};

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-2 font-mono text-sm tracking-widest text-neutral-500">
        // 01
      </p>
      <h1 className="mb-6 text-4xl font-bold uppercase tracking-tight">
        Order Confirmed
      </h1>
      <p className="mb-8 max-w-md text-lg text-neutral-400">
        Thank you for joining the Strength Team.
      </p>
      <blockquote className="mb-12 max-w-lg border-l-2 border-neutral-700 pl-4 text-left italic text-neutral-500">
        &ldquo;I can do all things through Christ who strengthens me.&rdquo;
        <cite className="mt-2 block text-sm not-italic text-neutral-600">
          &mdash; Philippians 4:13
        </cite>
      </blockquote>
      <Link
        href="/shop"
        className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-white transition-colors hover:text-neutral-300"
      >
        Continue Shopping
        <span className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </Link>
    </main>
  );
}
