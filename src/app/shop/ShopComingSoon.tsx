"use client";

import { useState } from "react";
import { motion } from "motion/react";
import LaunchCountdown from "@/components/LaunchCountdown";

const EXPO_EASE = [0.22, 1, 0.36, 1] as const;

export default function ShopComingSoon() {
  return (
    <div className="bg-black text-white">
      {/* ════════════════════════════════════════════════════════════
          HERO - "Something is being built." + countdown + email capture
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden border-b border-white/10">
        {/* Soft radial backlight, kept very dark */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(255,255,255,0.04)_0%,_transparent_55%)] pointer-events-none" />

        <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 py-24 md:py-32">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO_EASE }}
            className="block font-mono text-[11px] md:text-[12px] tracking-[0.30em] uppercase text-white/55"
          >
            // FIRST DROP · JUNE 2
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EXPO_EASE, delay: 0.1 }}
            className="mt-6 font-sans font-black uppercase tracking-[-0.04em] leading-[0.9] text-white text-[15vw] sm:text-[13vw] lg:text-[clamp(72px,11vw,168px)]"
          >
            SOMETHING
            <br />
            IS BEING
            <br />
            BUILT.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO_EASE, delay: 0.35 }}
            className="mt-8 md:mt-10 font-sans font-light text-[16px] md:text-[17px] leading-relaxed text-white/75 max-w-[620px]"
          >
            Faith-grounded performance apparel for the disciplined.
            <br />
            Two designs. Five fits. One purpose.
            <br />
            <span className="text-white/55">Strengthen. Endure. Finish.</span>
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO_EASE, delay: 0.5 }}
            className="mt-14 md:mt-16"
          >
            <p className="font-mono text-[10px] md:text-[11px] tracking-[0.30em] uppercase text-white/45 mb-4">
              // TIME REMAINING
            </p>
            <LaunchCountdown size="hero" />
          </motion.div>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO_EASE, delay: 0.7 }}
            className="mt-14 md:mt-16 max-w-[560px]"
          >
            <WaitlistForm placement="hero" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          MANIFESTO - // THE TEAM
      ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 py-28 md:py-40">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EXPO_EASE }}
            className="block font-mono text-[11px] md:text-[12px] tracking-[0.30em] uppercase text-white/55 mb-10"
          >
            // THE TEAM
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease: EXPO_EASE, delay: 0.1 }}
            className="font-sans font-light text-white/75 max-w-[760px] space-y-7 text-[18px] md:text-[20px] leading-[1.65]"
          >
            <p>
              We don&apos;t build for the bandwagon.
              <br />
              We build for the early mornings.
              <br />
              For the last rep no one sees.
              <br />
              For the discipline that turns into worship.
            </p>
            <p>
              Two designs. Each made for the work.
              <br />
              Five fits. Each made for the body that&apos;s earned them.
              <br />
              One team. Built around the Alpha and the Omega - the One who is the Beginning and the End.
            </p>
            <p>
              This is performance apparel for people who train with purpose.
              <br />
              <span className="text-white/55">Faith-grounded. Restraint over decoration. Built for the finish.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCRIPTURE - Revelation 22:13
      ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 py-32 md:py-44 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease: EXPO_EASE }}
            className="font-sans font-light text-white text-[28px] md:text-[40px] leading-[1.5] max-w-[820px] mx-auto"
          >
            &ldquo;I am the Alpha and the Omega,
            <br />
            the First and the Last,
            <br />
            the Beginning and the End.&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EXPO_EASE, delay: 0.2 }}
            className="mt-10 font-mono text-[12px] md:text-[14px] tracking-[0.25em] uppercase text-white/65"
          >
            REVELATION 22:13 · NIV
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ATMOSPHERE STRIP - 3 tactical eyebrows, no product images
      ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-white/10">
          {[
            { num: "01", label: "DISCIPLINE", body: "The rep no one sees. The set no one counts. That's where it's built." },
            { num: "02", label: "ENDURANCE", body: "Run with patience the race set before you. Not the one beside you." },
            { num: "03", label: "FAITH", body: "Training is the practice. The work is the offering. Soli Deo Gloria." },
          ].map((cell, i) => (
            <motion.div
              key={cell.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EXPO_EASE, delay: i * 0.1 }}
              className="px-8 md:px-12 py-16 md:py-24"
            >
              <p className="font-mono text-[11px] md:text-[12px] tracking-[0.30em] uppercase text-white/45">
                // {cell.num} - {cell.label}
              </p>
              <p className="mt-6 font-sans font-light text-[17px] md:text-[19px] leading-[1.55] text-white/80">
                {cell.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FOOTER CTA - Second waitlist
      ════════════════════════════════════════════════════════════ */}
      <section>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 py-32 md:py-44 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EXPO_EASE }}
            className="block font-mono text-[11px] md:text-[12px] tracking-[0.30em] uppercase text-white/55"
          >
            // JOIN US
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EXPO_EASE, delay: 0.1 }}
            className="mt-6 font-sans font-black uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(36px,5.5vw,72px)]"
          >
            THE DROP OPENS JUNE 2.
            <br />
            <span className="text-white/55">BE FIRST IN LINE.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EXPO_EASE, delay: 0.25 }}
            className="mt-12 max-w-[560px] mx-auto"
          >
            <WaitlistForm placement="footer" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WaitlistForm - shared between hero + footer placements
───────────────────────────────────────────────────────────────── */
function WaitlistForm({ placement }: { placement: "hero" | "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `shop-coming-soon:${placement}` }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-white/15 px-6 py-6 md:px-8 md:py-7">
        <p className="font-sans font-medium text-white text-[16px] md:text-[18px]">
          You&apos;re on the team.
        </p>
        <p className="mt-2 font-sans font-light text-white/65 text-[14px] md:text-[15px]">
          We&apos;ll be in touch June 2.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          aria-label="Email address"
          className="flex-1 h-12 px-4 bg-black border border-white/25 text-white placeholder-white/35 focus:border-white focus:outline-none text-[15px]"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="h-12 px-8 bg-white text-black font-sans font-bold text-[13px] uppercase tracking-[0.15em] hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "..." : "Join the Team"}
        </button>
      </div>
      {errorMsg && (
        <p className="text-red-400 text-[12px]">{errorMsg}</p>
      )}
      <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-white/40">
        // First access on drop day. No spam. Ever.
      </p>
    </form>
  );
}
