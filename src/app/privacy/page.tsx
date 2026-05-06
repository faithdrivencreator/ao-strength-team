import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alpha Omega Strength Team",
  description:
    "How Alpha Omega Strength Team collects, uses, and protects your personal information.",
};

const EFFECTIVE_DATE = "May 6, 2026";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 md:px-10 py-20 md:py-28">
      <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40 mb-6">
        // LEGAL
      </p>
      <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight mb-4">
        Privacy Policy
      </h1>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-12">
        Effective {EFFECTIVE_DATE}
      </p>

      <div className="space-y-8 font-sans text-base leading-7 text-white/75">
        <p>
          Alpha Omega Strength Team (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a brand operated by FFS LLC, respects your privacy. This Privacy Policy explains what information we collect when you visit aostrengthteam.store, how we use it, and the choices you have. By using our site, you agree to the practices described here.
        </p>

        <Section title="1. Information We Collect">
          <p>
            <strong>Information you provide.</strong> When you place an order, contact us, or sign up for emails, we collect your name, email address, shipping address, and payment details. Payment information is processed by Stripe and is never stored on our servers.
          </p>
          <p className="mt-4">
            <strong>Information collected automatically.</strong> When you visit the site, we automatically collect your IP address, browser type, device information, pages viewed, and referring URLs through cookies and similar technologies, including Google Analytics 4.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Process and fulfill orders</li>
            <li>Communicate about your purchases, including shipping confirmations and customer service</li>
            <li>Send marketing emails (only if you opt in — you can unsubscribe at any time)</li>
            <li>Improve our website, products, and customer experience</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="3. How We Share Your Information">
          <p>
            We do not sell your personal information. We share it only with service providers that help us operate the business, including:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li><strong>Stripe</strong> — payment processing</li>
            <li><strong>Netlify</strong> — site hosting</li>
            <li><strong>Sanity</strong> — content management</li>
            <li><strong>Google Analytics</strong> — site usage analytics</li>
            <li>Shipping carriers — to deliver your orders</li>
          </ul>
          <p className="mt-4">
            We may also disclose information if required by law, to enforce our terms, or to protect the rights, property, or safety of our customers or the public.
          </p>
        </Section>

        <Section title="4. Cookies and Tracking">
          <p>
            We use cookies and similar technologies to remember your cart, keep you logged in if applicable, analyze site traffic, and improve performance. Most browsers allow you to refuse or delete cookies through your settings; doing so may limit some site functionality.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>
            Depending on where you live (including California, Virginia, Colorado, and other U.S. states with consumer privacy laws), you may have the right to:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction or deletion of that information</li>
            <li>Opt out of marketing communications</li>
            <li>Request that we not sell or share your information (we don&rsquo;t sell, but you may still submit a request)</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, email{" "}
            <a className="underline hover:text-white" href="mailto:hello@alphaomegateam.com">
              hello@alphaomegateam.com
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        <Section title="6. Children&rsquo;s Privacy">
          <p>
            Our site is not directed to children under 13, and we do not knowingly collect personal information from anyone under 13. If we learn we have collected such information, we will delete it.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain your information for as long as your account or order history is active and as needed to comply with legal, accounting, and tax requirements. After that, we delete or anonymize it.
          </p>
        </Section>

        <Section title="8. Security">
          <p>
            We use reasonable technical and organizational measures, including HTTPS encryption and PCI-compliant payment processing through Stripe, to protect your information. No system is perfectly secure, but we work hard to safeguard your data.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The effective date at the top of this page reflects the most recent revision. Material changes will be communicated by posting a notice on our site.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about this policy? Email{" "}
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
