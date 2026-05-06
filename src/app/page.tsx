"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import HomeEmailForm from "@/components/HomeEmailForm";

/* ── Decorative Cross SVG ── */
function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="44" y="10" width="12" height="80" fill="currentColor" />
      <rect x="20" y="34" width="60" height="12" fill="currentColor" />
    </svg>
  );
}

export default function ComingSoonPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Pre-launch hero ─────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 py-24">
        {/* Background atmospheric gradients */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] max-w-[160vw] max-h-[160vw] opacity-[0.04] blur-3xl bg-white rounded-full" />
        </div>

        {/* Faint cross watermark, far behind */}
        <CrossIcon className="absolute inset-0 m-auto w-[42vmin] h-[42vmin] text-white/[0.04] pointer-events-none" />

        <div className="relative z-10 max-w-[760px] w-full text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 mb-10"
          >
            // 01 — FIRST DROP INCOMING
          </motion.p>

          {/* Brand wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-black text-[56px] sm:text-[72px] md:text-[96px] lg:text-[112px] leading-[0.9] tracking-[-0.04em] uppercase text-white"
          >
            ALPHA
            <br />
            OMEGA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-sans font-black text-sm sm:text-base tracking-[0.4em] uppercase text-white/70 mt-6 mb-10"
          >
            STRENGTH&nbsp;&nbsp;TEAM
          </motion.p>

          {/* Hero product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[260px] sm:w-[320px] md:w-[380px] aspect-square my-4"
          >
            <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent blur-2xl scale-125" aria-hidden="true" />
            <Image
              src="/images/products/signature-tee-1.png"
              alt="Alpha Omega Signature Tee preview"
              fill
              priority
              sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 380px"
              className="object-contain relative z-10"
            />
          </motion.div>

          {/* Manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-sans text-base sm:text-lg leading-relaxed text-white/65 max-w-[520px] mb-3"
          >
            Performance apparel for the disciplined.
            <br className="hidden sm:block" />
            <span className="text-white/50">Built for those who train with purpose.</span>
          </motion.p>

          {/* Scripture */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="font-sans text-sm italic text-white/40 mb-12 max-w-[460px]"
          >
            &ldquo;I can do all things through Christ who strengthens me.&rdquo;
            <span className="block mt-2 not-italic font-mono text-[10px] tracking-[0.3em] text-white/25">
              — PHILIPPIANS 4:13
            </span>
          </motion.blockquote>

          {/* Email capture — primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="w-full max-w-md"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4">
              Be first when the drop hits
            </p>
            <HomeEmailForm />
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="w-24 h-px bg-white/15 my-12"
          />

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              Follow the journey
            </p>
            <Link
              href="https://www.instagram.com/alphaomegastrengthteam/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3 hover:border-white/60 transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/70 group-hover:text-white transition-colors">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                @alphaomegastrengthteam
              </span>
            </Link>
          </motion.div>

          {/* Bottom signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mt-20"
          >
            STAY STRONG. STAY FAITHFUL. STAY READY.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
