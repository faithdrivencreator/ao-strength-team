import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds | Alpha Omega Strength Team",
  description:
    "Our return window, eligibility, and refund process for orders from Alpha Omega Strength Team.",
};

const EFFECTIVE_DATE = "May 6, 2026";

export default function ReturnsPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 md:px-10 py-20 md:py-28">
      <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-6">
        // LEGAL
      </p>
      <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight mb-4">
        Returns &amp; Refunds
      </h1>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-12">
        Effective {EFFECTIVE_DATE}
      </p>

      <div className="space-y-8 font-sans text-base leading-7 text-white/75">
        <p>
          We want you to love what you wear. If something isn&rsquo;t right, here&rsquo;s how to return it.
        </p>

        <Section title="1. Return Window">
          <p>
            You have <strong>30 days from the delivery date</strong> to request a return. Returns requested after 30 days will not be accepted.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>To be eligible for a return, your item must be:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Unworn and unwashed</li>
            <li>In its original condition with all tags attached</li>
            <li>Free of stains, odors, pet hair, or signs of use</li>
            <li>Returned in its original packaging where possible</li>
          </ul>
          <p className="mt-4">
            We reserve the right to refuse returns that do not meet these conditions.
          </p>
        </Section>

        <Section title="3. Non-Returnable Items">
          <p>The following items are final sale and cannot be returned:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Items marked as &ldquo;Final Sale&rdquo; or sold during a clearance event</li>
            <li>Gift cards</li>
            <li>Customized or made-to-order items</li>
          </ul>
        </Section>

        <Section title="4. How to Start a Return">
          <p>
            Email{" "}
            <a className="underline hover:text-white" href="mailto:hello@alphaomegateam.com">
              hello@alphaomegateam.com
            </a>{" "}
            with the subject line &ldquo;Return Request&rdquo; and include:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Your order number</li>
            <li>The item(s) you&rsquo;re returning</li>
            <li>The reason for the return</li>
          </ul>
          <p className="mt-4">
            We&rsquo;ll respond within 1–2 business days with return instructions and the address to ship to. <strong>Do not send items back without contacting us first</strong> — unauthorized returns may not be processed.
          </p>
        </Section>

        <Section title="5. Return Shipping">
          <p>
            Customers are responsible for return shipping costs unless the return is due to our error (e.g., wrong item shipped, defective product). We recommend using a tracked shipping method, as we cannot be responsible for returns lost in transit.
          </p>
        </Section>

        <Section title="6. Refunds">
          <p>
            Once we receive and inspect your return, we&rsquo;ll send an email confirming approval or rejection. Approved refunds are issued to the original payment method within <strong>5–10 business days</strong>. Depending on your bank, it may take an additional 2–5 business days for the refund to appear on your statement.
          </p>
          <p className="mt-4">
            Original shipping charges are non-refundable.
          </p>
        </Section>

        <Section title="7. Exchanges">
          <p>
            We do not currently offer direct exchanges. If you need a different size or color, please return the original item for a refund and place a new order for the replacement.
          </p>
        </Section>

        <Section title="8. Defective or Incorrect Items">
          <p>
            If you receive a defective or incorrect item, contact us within 7 days of delivery at{" "}
            <a className="underline hover:text-white" href="mailto:hello@alphaomegateam.com">
              hello@alphaomegateam.com
            </a>{" "}
            with your order number and photos. We&rsquo;ll cover return shipping and either reship the correct item or issue a full refund.
          </p>
        </Section>

        <Section title="9. Late or Missing Refunds">
          <p>
            If you haven&rsquo;t received a refund within the timeframe above, first check with your bank or credit card company — refund posting times vary. If you&rsquo;ve done that and still haven&rsquo;t received your refund, email us and we&rsquo;ll investigate.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            All return inquiries:{" "}
            <a className="underline hover:text-white" href="mailto:hello@alphaomegateam.com">
              hello@alphaomegateam.com
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
