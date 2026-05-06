"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

function PreviewAccess() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/preview-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password.");
        setSubmitting(false);
        return;
      }
      // Redirect to /shop so Pete sees the gated content immediately
      window.location.href = "/shop";
    } catch {
      setError("Network error.");
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white/50 transition-colors"
      >
        // PREVIEW ACCESS
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="PASSWORD"
        className="bg-transparent border border-white/15 px-3 h-9 font-mono text-[10px] tracking-[0.15em] text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-white/90 hover:bg-white text-black font-mono text-[10px] tracking-[0.15em] uppercase px-3 h-9 transition-colors disabled:opacity-60"
      >
        {submitting ? "..." : "Enter"}
      </button>
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setPassword("");
          setError(null);
        }}
        className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors px-2"
        aria-label="Cancel"
      >
        ✕
      </button>
      {error && (
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-red-400 ml-2">
          {error}
        </span>
      )}
    </form>
  );
}

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      {/* ── Full-bleed hero background ─────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Layered atmospheric overlays for legibility */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Faint cross watermark, far behind */}
      <CrossIcon className="absolute inset-0 m-auto w-[40vmin] h-[40vmin] text-white/[0.04] pointer-events-none" />

      {/* ── Content layer ──────────────────────────────────────── */}
      <section className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-[760px] w-full text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 mb-10"
          >
            // 01 — FIRST DROP INCOMING
          </motion.p>

          {/* Brand wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-black text-[56px] sm:text-[72px] md:text-[96px] lg:text-[120px] leading-[0.9] tracking-[-0.04em] uppercase text-white"
          >
            ALPHA
            <br />
            OMEGA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-sans font-black text-sm sm:text-base tracking-[0.4em] uppercase text-white/80 mt-6 mb-14"
          >
            STRENGTH&nbsp;&nbsp;TEAM
          </motion.p>

          {/* Manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-base sm:text-lg leading-relaxed text-white/75 max-w-[520px] mb-3"
          >
            Performance apparel for the disciplined.
            <br className="hidden sm:block" />
            <span className="text-white/55">Built for those who train with purpose.</span>
          </motion.p>

          {/* Scripture */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-sm italic text-white/45 mb-12 max-w-[460px]"
          >
            &ldquo;I can do all things through Christ who strengthens me.&rdquo;
            <span className="block mt-2 not-italic font-mono text-[10px] tracking-[0.3em] text-white/30">
              — PHILIPPIANS 4:13
            </span>
          </motion.blockquote>

          {/* Email capture — primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="w-full max-w-md"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 mb-4">
              Be first when the drop hits
            </p>
            <HomeEmailForm />
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-24 h-px bg-white/15 my-12"
          />

          {/* Instagram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              Follow the journey
            </p>
            <Link
              href="https://www.instagram.com/alphaomegastrengthteam/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-white/25 px-6 py-3 hover:border-white/70 hover:bg-white/5 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/80 group-hover:text-white transition-colors">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
                @alphaomegastrengthteam
              </span>
            </Link>
          </motion.div>

          {/* Bottom signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mt-20 mb-6"
          >
            STAY STRONG. STAY FAITHFUL. STAY READY.
          </motion.p>

          {/* Preview access (owner only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <PreviewAccess />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
