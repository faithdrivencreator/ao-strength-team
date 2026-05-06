import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Alpha Omega Strength Team",
  description:
    "Shipping methods, delivery times, costs, and tracking for orders from Alpha Omega Strength Team.",
};

const EFFECTIVE_DATE = "May 6, 2026";

export default function ShippingPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 md:px-10 py-20 md:py-28">
      <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-6">
        // LEGAL
      </p>
      <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight mb-4">
        Shipping Policy
      </h1>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-12">
        Effective {EFFECTIVE_DATE}
      </p>

      <div className="space-y-8 font-sans text-base leading-7 text-white/75">
        <p>
          Thank you for supporting Alpha Omega Strength Team. This Shipping Policy explains how we process and ship your orders.
        </p>

        <Section title="1. Where We Ship">
          <p>
            We currently ship within the United States only, including all 50 states, Washington D.C., and U.S. territories. International shipping is not yet available.
          </p>
        </Section>

        <Section title="2. Order Processing Time">
          <p>
            Orders are processed within 1–3 business days (Monday through Friday, excluding U.S. holidays). You&rsquo;ll receive an order confirmation email immediately after checkout, and a separate shipping confirmation with tracking once your package leaves our facility.
          </p>
          <p className="mt-4">
            Orders placed on weekends or holidays will begin processing the next business day. During major launches, drops, or holiday seasons, processing may take an additional 1–2 days.
          </p>
        </Section>

        <Section title="3. Shipping Methods and Estimated Delivery">
          <p>
            Standard shipping typically arrives within 3–7 business days after dispatch, depending on your location. Expedited options may be available at checkout.
          </p>
          <p className="mt-4">
            Delivery times are estimates provided by the carrier and are not guaranteed. We are not responsible for delays caused by the carrier, severe weather, or other circumstances outside our control.
          </p>
        </Section>

        <Section title="4. Shipping Costs">
          <p>
            Shipping costs are calculated at checkout based on your address, package weight, and selected shipping method. The total will be displayed before you confirm your order.
          </p>
        </Section>

        <Section title="5. Order Tracking">
          <p>
            Once your order ships, we&rsquo;ll send a confirmation email with a tracking number. You can use that number to follow your package on the carrier&rsquo;s website.
          </p>
        </Section>

        <Section title="6. Address Accuracy">
          <p>
            Please double-check your shipping address before completing checkout. We are not responsible for orders shipped to incorrect or incomplete addresses provided by the customer. If you notice an error after placing your order, contact us immediately at{" "}
            <a className="underline hover:text-white" href="mailto:hello@alphaomegateam.com">
              hello@alphaomegateam.com
            </a>{" "}
            — if your order has not yet shipped, we&rsquo;ll do our best to update it.
          </p>
        </Section>

        <Section title="7. Lost, Stolen, or Damaged Packages">
          <p>
            If your tracking shows your package as delivered but you haven&rsquo;t received it, please:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Check with neighbors or your front desk</li>
            <li>Wait 24–48 hours, as carriers occasionally mark packages delivered prematurely</li>
            <li>Contact the carrier directly to file a missing-package claim</li>
          </ul>
          <p className="mt-4">
            For packages confirmed lost in transit or damaged in shipping, email us at{" "}
            <a className="underline hover:text-white" href="mailto:hello@alphaomegateam.com">
              hello@alphaomegateam.com
            </a>{" "}
            with your order number and any photos of damage. We&rsquo;ll work with you to resolve the issue, typically by reshipping or refunding the order.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            Questions about your shipment? Email{" "}
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
