import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Alpha Omega Strength Team",
  description:
    "The terms governing your use of aostrengthteam.store and any purchases made through the site.",
};

const EFFECTIVE_DATE = "May 6, 2026";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 md:px-10 py-20 md:py-28">
      <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-6">
        // LEGAL
      </p>
      <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight mb-4">
        Terms of Service
      </h1>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-12">
        Effective {EFFECTIVE_DATE}
      </p>

      <div className="space-y-8 font-sans text-base leading-7 text-white/75">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of aostrengthteam.store (the &ldquo;Site&rdquo;) operated by FFS LLC under the brand Alpha Omega Strength Team (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using the Site or placing an order, you agree to these Terms. If you do not agree, do not use the Site.
        </p>

        <Section title="1. Eligibility">
          <p>
            You must be at least 18 years old, or the age of majority in your jurisdiction, to make a purchase. By using the Site, you represent that you meet this requirement.
          </p>
        </Section>

        <Section title="2. Products and Pricing">
          <p>
            We list product details, prices, and availability on the Site. We may change prices, descriptions, or availability at any time without notice. We do our best to display accurate product images, but actual colors and details may vary slightly due to monitor settings or production runs.
          </p>
        </Section>

        <Section title="3. Orders and Payment">
          <p>
            When you place an order, you offer to purchase the product at the listed price. We reserve the right to accept or decline any order at our discretion, including for stock issues, pricing errors, or suspected fraud. Payment is processed securely through Stripe; we do not store your card details. All prices are listed in U.S. dollars.
          </p>
        </Section>

        <Section title="4. Shipping and Delivery">
          <p>
            We currently ship within the United States. See our{" "}
            <Link href="/shipping" className="underline hover:text-white">
              Shipping Policy
            </Link>{" "}
            for details on processing times, methods, and costs.
          </p>
        </Section>

        <Section title="5. Returns and Refunds">
          <p>
            See our{" "}
            <Link href="/returns" className="underline hover:text-white">
              Returns &amp; Refunds Policy
            </Link>{" "}
            for the full terms of returns, exchanges, and refunds.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            All content on the Site — including text, graphics, logos, product designs, photographs, blog posts, and the Alpha Omega Strength Team name and marks — is owned by us or our licensors and protected by U.S. and international intellectual property laws. You may not copy, reproduce, distribute, modify, or create derivative works from any of this content without our prior written consent.
          </p>
        </Section>

        <Section title="7. Acceptable Use">
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Use the Site for any unlawful purpose or in violation of these Terms</li>
            <li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
            <li>Interfere with the operation of the Site, including by introducing malware or running denial-of-service attacks</li>
            <li>Scrape, data-mine, or use automated means to extract content without permission</li>
            <li>Submit false or misleading information when placing orders</li>
          </ul>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <p>
            The Site and all products are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied. To the fullest extent permitted by law, we disclaim all warranties, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Site will be uninterrupted or error-free.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, FFS LLC, Alpha Omega Strength Team, and our officers, employees, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or any product purchased through the Site. Our total liability for any claim arising from your use of the Site or any purchase is limited to the amount you paid for the product giving rise to the claim.
          </p>
        </Section>

        <Section title="10. Indemnification">
          <p>
            You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses (including reasonable attorneys&rsquo; fees) arising out of your violation of these Terms, your misuse of the Site, or your violation of any third-party rights.
          </p>
        </Section>

        <Section title="11. Governing Law">
          <p>
            These Terms are governed by the laws of the State of Florida, without regard to its conflict of law principles. Any dispute arising out of these Terms or your use of the Site will be resolved in the state or federal courts located in Miami-Dade County, Florida, and you consent to the personal jurisdiction of those courts.
          </p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>
            We may update these Terms at any time by posting a revised version on the Site. Continued use of the Site after changes are posted constitutes your acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="13. Contact">
          <p>
            Questions about these Terms? Email{" "}
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
