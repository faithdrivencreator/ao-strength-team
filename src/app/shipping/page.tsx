import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns | AO Strength Team",
  description:
    "How we ship. How returns work. Free shipping on orders over $75. Built for the long set.",
};

const EFFECTIVE_DATE = "May 13, 2026";
const HELLO = "hello@aostrengthteam.store";
const RETURNS = "returns@aostrengthteam.store";
const SUPPORT = "support@aostrengthteam.store";

export default function ShippingPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 md:px-10 py-20 md:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-6">
        // SHIPPING &amp; RETURNS
      </p>
      <h1 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
        Shipping &amp; Returns
      </h1>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-16">
        Effective {EFFECTIVE_DATE}
      </p>

      <div className="space-y-12 font-sans text-base leading-7 text-white/75">
        <p className="text-lg leading-8 text-white">
          We build for the long set. The shipping policy follows the same rule. Clear terms. No surprises.
        </p>

        <Section number="01" title="Free Shipping Over $75">
          <p>
            Orders $75 or more ship free. USPS Priority Mail, 3–5 business days, U.S. addresses only.
          </p>
          <p>
            Under $75, shipping is a flat $7.95. Same carrier. Same timing. No tiered upsells.
          </p>
        </Section>

        <Section number="02" title="Processing">
          <p>
            Orders are packed and dispatched within 2–3 business days. Monday through Friday, holidays excluded.
          </p>
          <p>
            The moment your order leaves the bench, you get a tracking email. One link. The carrier handles the rest.
          </p>
        </Section>

        <Section number="03" title="Where We Ship">
          <p>
            All 50 states, D.C., and U.S. territories. International shipping is not available yet.
          </p>
          <p>
            If your address is outside the U.S. and you want gear, write{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${HELLO}`}>
              {HELLO}
            </a>
            . We&rsquo;ll log demand by country.
          </p>
        </Section>

        <Section number="04" title="Returns — 30 Days">
          <p>
            Thirty days from the day your order arrives. Items must be unworn, unwashed, and have the original tags attached.
          </p>
          <p>
            You cover the return shipping. If the return is on us — defect, wrong item, damage in transit — we cover it.
          </p>
          <p>
            Start a return:{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${RETURNS}?subject=Return%20request`}>
              {RETURNS}
            </a>
            . Include the order number and the reason.
          </p>
        </Section>

        <Section number="05" title="Refund Timing">
          <p>
            Once we receive the return, we inspect it within 2 business days. Approved refunds post to the original payment method within 5–7 business days after that.
          </p>
          <p>
            Your bank decides the exact day it lands. We don&rsquo;t.
          </p>
        </Section>

        <Section number="06" title="Damaged or Wrong Item">
          <p>
            Open the box the day it arrives. If something is damaged, defective, or not what you ordered, contact{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${SUPPORT}?subject=Damaged%20or%20wrong%20item`}>
              {SUPPORT}
            </a>{" "}
            within 7 days. Include a photo.
          </p>
          <p>
            We&rsquo;ll replace it free of charge. No return shipping required for the original.
          </p>
        </Section>

        <Section number="07" title="Lost in Transit">
          <p>
            If tracking shows delivered and the package isn&rsquo;t at your door — check with neighbors and the building, then wait 24 hours. Carriers occasionally mark packages early.
          </p>
          <p>
            Still nothing after 48 hours, email{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${SUPPORT}?subject=Lost%20package`}>
              {SUPPORT}
            </a>
            . We&rsquo;ll work with the carrier and make it right.
          </p>
        </Section>

        <Section number="08" title="Address Accuracy">
          <p>
            Double-check the address before you confirm. We can&rsquo;t recover orders shipped to bad addresses, but we&rsquo;ll always try.
          </p>
          <p>
            If you catch an error within an hour of ordering, email{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${HELLO}?subject=Address%20correction`}>
              {HELLO}
            </a>
            . If we haven&rsquo;t packed it yet, we&rsquo;ll fix it.
          </p>
        </Section>

        <Section number="09" title="Contact">
          <p>
            General questions —{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${HELLO}`}>
              {HELLO}
            </a>
            .
          </p>
          <p>
            Returns —{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${RETURNS}`}>
              {RETURNS}
            </a>
            .
          </p>
          <p>
            Order issues —{" "}
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${SUPPORT}`}>
              {SUPPORT}
            </a>
            .
          </p>
        </Section>

        <p className="pt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
          // BUILT FOR THE LONG SET
        </p>
      </div>
    </main>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
        // {number}
      </p>
      <h2 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-5">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
