"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function HomeEmailForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not subscribe. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-sans text-[14px] font-bold uppercase tracking-[0.15em] text-white mb-2">
          Welcome to the team.
        </p>
        <p className="font-mono text-[11px] tracking-[0.15em] text-white/40">
          Watch your inbox for the first message.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <div className="flex-1 flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="YOUR EMAIL"
          required
          disabled={submitting}
          aria-label="Email address"
          className="w-full bg-transparent border border-white/15 px-5 py-4 font-mono text-[12px] tracking-[0.15em] text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors duration-300 disabled:opacity-60"
        />
        {error && (
          <p className="font-mono text-[10px] tracking-[0.15em] text-red-400 text-left">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-white text-black font-sans text-[12px] font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-white/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "..." : "SUBSCRIBE"}
      </button>
    </motion.form>
  );
}
