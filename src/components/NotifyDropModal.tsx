"use client";

import { useEffect, useState } from "react";

interface NotifyDropModalProps {
  /** When omitted, the modal acts as a generic "get first access" prompt. */
  productSlug?: string;
  productName?: string;
  open: boolean;
  onClose: () => void;
}

const LAUNCH_DATE_LABEL = process.env.NEXT_PUBLIC_LAUNCH_DATE_LABEL || "June 2";

export default function NotifyDropModal({
  productSlug,
  productName,
  open,
  onClose,
}: NotifyDropModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setEmail("");
      setErrorMsg("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: productSlug ? `drop-notify:${productSlug}` : "drop-notify:homepage",
        }),
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-drop-title"
    >
      <div
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/15 px-6 py-8 md:px-8 md:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-white/50 hover:text-white text-xl leading-none"
        >
          ×
        </button>

        <p className="font-mono text-[11px] uppercase tracking-[0.20em] text-white/55 mb-3">
          // Drop · {LAUNCH_DATE_LABEL}
        </p>

        {status === "success" ? (
          <>
            <h2
              id="notify-drop-title"
              className="font-serif text-2xl md:text-[28px] leading-tight text-white mb-3"
            >
              You're on the list.
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed">
              {productName ? (
                <>We'll email you the moment the <strong className="text-white">{productName}</strong> goes live on {LAUNCH_DATE_LABEL}. First access. Limited drop.</>
              ) : (
                <>We'll email you the moment the drop goes live on {LAUNCH_DATE_LABEL}. First access. Limited release.</>
              )}
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full h-11 bg-white text-black font-sans font-bold text-[13px] uppercase tracking-wide hover:bg-white/90"
            >
              Keep Browsing
            </button>
          </>
        ) : (
          <>
            <h2
              id="notify-drop-title"
              className="font-serif text-2xl md:text-[28px] leading-tight text-white mb-3"
            >
              {productName ? "Notify me on drop day." : "Get first access."}
            </h2>
            <p className="text-white/65 text-[14px] leading-relaxed mb-5">
              {productName ? (
                <><strong className="text-white">{productName}</strong> drops {LAUNCH_DATE_LABEL}. Drop the email and we'll send you the link the second it's live.</>
              ) : (
                <>The Alpha Omega drop goes live {LAUNCH_DATE_LABEL} at 8PM ET. Drop your email and we'll send the link the moment it's live - before the public shop opens.</>
              )}
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full h-11 px-4 bg-black border border-white/20 text-white placeholder-white/30 focus:border-white focus:outline-none text-[14px]"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="w-full h-11 bg-white text-black font-sans font-bold text-[13px] uppercase tracking-wide hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "..." : "Notify Me"}
              </button>
              {errorMsg && (
                <p className="text-red-400 text-[12px]">{errorMsg}</p>
              )}
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 pt-1">
                // No spam. Drop alert only.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
