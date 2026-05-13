"use client";

import Link from "next/link";
import { motion } from "motion/react";

function DumbbellIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="9" width="3" height="6" rx="0.5" />
      <rect x="5" y="7.5" width="3" height="9" rx="0.5" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <rect x="16" y="7.5" width="3" height="9" rx="0.5" />
      <rect x="19" y="9" width="3" height="6" rx="0.5" />
    </svg>
  );
}
function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3 L4 6 V12 C4 16.5 7.5 19.8 12 21 C16.5 19.8 20 16.5 20 12 V6 L12 3 Z" />
    </svg>
  );
}
function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20 C5 16 8 14 12 14 C16 14 19 16 19 20" />
    </svg>
  );
}
function PillarCrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="6" y1="9" x2="18" y2="9" />
    </svg>
  );
}

const pillars = [
  { Icon: DumbbellIcon, title: "DISCIPLINED", line: "Training. Mindset." },
  { Icon: ShieldIcon, title: "UNBREAKABLE", line: "Built to last. Built to lead." },
  { Icon: PersonIcon, title: "COMMUNITY", line: "Stronger together." },
  { Icon: PillarCrossIcon, title: "FAITH DRIVEN", line: "Purpose in every rep." },
];

const manifestoLines = [
  "We train with purpose.",
  "We live with conviction.",
  "We refuse to settle.",
  "We finish strong.",
];

const principles = [
  {
    eyebrow: "ALPHA",
    title: "THE BEGINNING.",
    body:
      "Every rep starts with a decision. We make ours daily. Faith first, then the work. The order matters.",
  },
  {
    eyebrow: "OMEGA",
    title: "THE FINISH.",
    body:
      "Anyone can begin. The team is built around finishing. The last rep, the last mile, the last yard — all of it carries the same weight as the first.",
  },
  {
    eyebrow: "UNBREAKABLE",
    title: "THE STANDARD.",
    body:
      "Quiet conviction over loud bravado. Premium materials over cheap hype. Built once, built right, built to be passed on.",
  },
];

export default function AboutClient() {
  return (
    <div className="flex flex-col overflow-x-hidden bg-black">
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black" />

        <div className="relative max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20 py-24 md:py-32 w-full">
          <motion.span
            className="font-mono text-[12px] tracking-[0.25em] uppercase text-white/40 block mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            // BUILT FOR THE DISCIPLINED
          </motion.span>
          <motion.h1
            className="font-sans font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            WE TRAIN
            <br />
            <span className="text-white/50">WITH PURPOSE.</span>
          </motion.h1>
          <motion.p
            className="mt-10 font-sans text-lg md:text-xl font-light text-white/60 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Alpha Omega Strength Team is performance apparel for the disciplined.
            We build for the beginning. We are proven at the finish. Every garment
            we make carries one standard &mdash; quiet, restrained, and built on faith.
          </motion.p>
        </div>
      </section>

      {/* ── MANIFESTO LINES ── */}
      <section className="relative py-28 md:py-40 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20">
          <motion.span
            className="font-mono text-[12px] tracking-[0.25em] uppercase text-white/30 block mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            // THE MANIFESTO
          </motion.span>
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 text-center">
            {manifestoLines.map((line, i) => (
              <motion.p
                key={line}
                className="font-sans font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.05]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALPHA / OMEGA / UNBREAKABLE — THREE PRINCIPLES ── */}
      <section className="relative py-28 md:py-40 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20">
          <motion.span
            className="font-mono text-[12px] tracking-[0.25em] uppercase text-white/30 block mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            RESTRAINED · ENCOURAGING · DISCIPLINED · FAITH-GROUNDED
          </motion.span>
          <motion.h2
            className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.05] text-center mb-20 md:mb-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            WHAT WE STAND FOR
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {principles.map((p, i) => (
              <motion.div
                key={p.eyebrow}
                className="relative bg-black p-10 md:p-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/40 block mb-5">
                  // {p.eyebrow}
                </span>
                <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight leading-[1.1] mb-6">
                  {p.title}
                </h3>
                <p className="font-sans font-light text-white/60 leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCRIPTURE ── */}
      <section className="relative py-28 md:py-40 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/40 to-black" />
        <div className="relative max-w-3xl mx-auto px-8 md:px-16 text-center">
          <motion.blockquote
            className="font-sans font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.1]"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            &ldquo;I am the Alpha and the Omega,
            <br />
            the First and the Last,
            <br />
            <span className="text-white/55">the Beginning and the End.&rdquo;</span>
          </motion.blockquote>
          <motion.p
            className="mt-10 font-mono text-[13px] tracking-[0.2em] text-white/40"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            — Revelation 22:13
          </motion.p>
        </div>
      </section>

      {/* ── TRUST BAR — same 4 pillars as homepage hero ── */}
      <section className="bg-black border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
          {pillars.map(({ Icon, title, line }) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center px-6 md:px-8 py-10 md:py-12 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <Icon className="w-10 h-10 md:w-12 md:h-12 text-white shrink-0 mb-5 transition-transform duration-300 group-hover:scale-[1.08]" />
              <div className="font-sans font-black text-[15px] md:text-[17px] tracking-[0.2em] uppercase text-white leading-tight">
                {title}
              </div>
              <div className="font-sans text-[12px] md:text-[13px] text-white/55 mt-3 leading-snug max-w-[180px]">
                {line}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 md:py-40">
        <div className="max-w-3xl mx-auto px-8 md:px-16 text-center">
          <motion.span
            className="font-mono text-[12px] tracking-[0.25em] uppercase text-white/30 block mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            // JOIN THE TEAM
          </motion.span>
          <motion.h2
            className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight leading-[1.05] mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            BUILT FOR THE
            <br />
            <span className="text-white/55">DISCIPLINED.</span>
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/shop"
              className="bg-white text-black font-sans text-[13px] font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-white/90 transition-all duration-300"
            >
              Shop the Collection
            </Link>
            <Link
              href="/#signup"
              className="border border-white/40 text-white font-sans text-[13px] font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Get The Weekly Discipline
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
