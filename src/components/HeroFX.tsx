"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Animated background FX for the pre-launch hero.
 *
 * Layers (back to front):
 *   1. Pulsing radial vignette (slow "breathing" glow)
 *   2. Scanning horizontal beam (every ~9s)
 *   3. Drifting tactical text strip (slow vertical scroll)
 *   4. Floating dust particles (slow vertical drift)
 *   5. Rotating cross watermark
 *
 * All layers are absolutely positioned, pointer-events-none, aria-hidden,
 * and use transform/opacity for GPU-accelerated rendering.
 */

const TACTICAL_LINES = [
  "// 01 — FIRST DROP",
  "// 02 — STRENGTH TEAM",
  "// 03 — TRAIN WITH PURPOSE",
  "// 04 — ALPHA OMEGA",
  "// 05 — INCOMING",
  "// 06 — STAY READY",
  "// 07 — DEPLOY",
  "// 08 — DISCIPLINE",
  "// 09 — RECOVERY",
  "// 10 — REPS",
  "// 11 — TRUST",
  "// 12 — UNBREAKABLE",
];

interface Particle {
  left: string;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

function generateParticles(count: number, seed: number): Particle[] {
  // Deterministic pseudo-random for stable SSR/CSR output
  const out: Particle[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    out.push({
      left: `${(rand() * 100).toFixed(2)}%`,
      delay: rand() * 20,
      duration: 18 + rand() * 14,
      size: 1 + rand() * 2,
      opacity: 0.15 + rand() * 0.35,
    });
  }
  return out;
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <rect x="44" y="10" width="12" height="80" fill="currentColor" />
      <rect x="20" y="34" width="60" height="12" fill="currentColor" />
    </svg>
  );
}

export default function HeroFX() {
  const particles = useMemo(() => generateParticles(28, 42), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* ── Layer 1: Breathing radial vignette ─────────────────── */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[140vmax] h-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 35%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Layer 2: Sweeping horizontal scan beam ─────────────── */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
          filter: "blur(1px)",
        }}
        initial={{ top: "-5%", opacity: 0 }}
        animate={{ top: ["-5%", "105%"], opacity: [0, 0.7, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 1],
        }}
      />

      {/* ── Layer 3: Drifting tactical text strip (left edge) ──── */}
      <motion.div
        className="absolute left-4 md:left-8 top-0 bottom-0 flex flex-col gap-12"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {[...TACTICAL_LINES, ...TACTICAL_LINES].map((line, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/15 whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            {line}
          </span>
        ))}
      </motion.div>

      {/* ── Layer 3b: Drifting tactical text strip (right edge, opposite direction) ── */}
      <motion.div
        className="absolute right-4 md:right-8 top-0 bottom-0 flex flex-col gap-12"
        animate={{ y: ["-50%", "0%"] }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      >
        {[...TACTICAL_LINES, ...TACTICAL_LINES].map((line, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/15 whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            {line}
          </span>
        ))}
      </motion.div>

      {/* ── Layer 4: Floating dust particles ───────────────────── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
          }}
          initial={{ top: "100%" }}
          animate={{ top: "-5%", opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
        />
      ))}

      {/* ── Layer 5: Slow-rotating cross watermark, far behind ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vmin] h-[55vmin]"
        animate={{ rotate: 360 }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
      >
        <CrossIcon className="w-full h-full text-white/[0.025]" />
      </motion.div>

      {/* ── Layer 6: Counter-rotating outer cross (different speed for parallax depth) ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vmin] h-[85vmin]"
        animate={{ rotate: -360 }}
        transition={{ duration: 380, repeat: Infinity, ease: "linear" }}
      >
        <CrossIcon className="w-full h-full text-white/[0.015]" />
      </motion.div>

      {/* ── Layer 7: Subtle grain via repeating SVG noise ──────── */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
