"use client";

import { useEffect, useState } from "react";

interface LaunchCountdownProps {
  /** ISO 8601 target datetime (with timezone). Falls back to env var, then May 25 2026 8pm ET. */
  target?: string;
  /** Visual size variant. */
  size?: "compact" | "hero";
  /** Optional class names appended to the root. */
  className?: string;
}

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function computeParts(targetMs: number): Parts {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const DEFAULT_TARGET =
  process.env.NEXT_PUBLIC_LAUNCH_DATETIME || "2026-05-26T00:00:00Z";

export default function LaunchCountdown({
  target = DEFAULT_TARGET,
  size = "hero",
  className = "",
}: LaunchCountdownProps) {
  const targetMs = new Date(target).getTime();

  // Render a stable SSR shell first; hydrate the live numbers on the client.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(computeParts(targetMs));
    const id = window.setInterval(() => {
      setParts(computeParts(targetMs));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const isCompact = size === "compact";

  const labelClass = isCompact
    ? "font-mono text-[9px] tracking-[0.20em] text-white/40 mt-1"
    : "font-mono text-[10px] tracking-[0.22em] text-white/45 mt-2";

  const numberClass = isCompact
    ? "font-serif text-[28px] md:text-[34px] leading-none tabular-nums text-white"
    : "font-serif text-[44px] md:text-[56px] leading-none tabular-nums text-white";

  const sepClass = isCompact
    ? "font-serif text-[26px] md:text-[30px] text-white/25 leading-none"
    : "font-serif text-[40px] md:text-[50px] text-white/20 leading-none";

  if (parts?.done) {
    return (
      <div className={`${className}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
          // The drop is live.
        </p>
      </div>
    );
  }

  // SSR / pre-hydration shell uses --:--:-- so layout doesn't shift
  const display = parts ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  return (
    <div className={className} aria-live="polite" aria-atomic="true">
      <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/55 mb-3">
        // Official drop · May 25 · 8PM ET
      </p>
      <div className="flex items-start gap-3 md:gap-5">
        <Cell value={parts ? display.days : null} label="Days" numClass={numberClass} labClass={labelClass} />
        <span className={sepClass} aria-hidden>:</span>
        <Cell value={parts ? display.hours : null} label="Hours" numClass={numberClass} labClass={labelClass} />
        <span className={sepClass} aria-hidden>:</span>
        <Cell value={parts ? display.minutes : null} label="Minutes" numClass={numberClass} labClass={labelClass} />
        <span className={sepClass} aria-hidden>:</span>
        <Cell value={parts ? display.seconds : null} label="Seconds" numClass={numberClass} labClass={labelClass} />
      </div>
    </div>
  );
}

function Cell({
  value,
  label,
  numClass,
  labClass,
}: {
  value: number | null;
  label: string;
  numClass: string;
  labClass: string;
}) {
  return (
    <div className="flex flex-col items-start min-w-[50px] md:min-w-[64px]">
      <span className={numClass}>{value === null ? "--" : pad(value)}</span>
      <span className={labClass}>{label}</span>
    </div>
  );
}
