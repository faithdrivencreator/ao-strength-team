import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Alpha Omega Strength Team',
  description:
    'Get in touch with Alpha Omega Strength Team. General inquiries, order support, returns, and wholesale.',
};

export default function ContactPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto max-w-[600px]">
          {/* Section label */}
          <p className="separator mb-6">CONTACT</p>

          {/* Heading */}
          <h1 className="font-sans text-[40px] md:text-[56px] font-900 leading-[1.1] tracking-tight mb-12">
            CONTACT
          </h1>

          {/* Form */}
          <ContactForm />

          {/* Email */}
          <div className="mt-16 pt-10 border-t border-white/10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-3">
              // EMAIL
            </p>
            <a
              href="mailto:hello@alphaomegateam.com"
              className="font-mono text-[14px] text-white/70 hover:text-white transition-colors"
            >
              hello@alphaomegateam.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
