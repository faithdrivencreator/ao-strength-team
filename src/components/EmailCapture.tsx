"use client";

import { useState, useEffect, useCallback } from "react";

export default function EmailCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("ao-email-capture-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem("ao-email-capture-dismissed", "true");
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-black border border-white/10 p-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/30 transition-colors duration-150 hover:text-white"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <p className="font-sans font-black text-lg tracking-[-0.025em] uppercase text-white">
              WELCOME TO THE TEAM.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.1em] text-white/40 uppercase mb-3">
                // STRENGTH TEAM
              </p>
              <h2 className="font-sans font-black text-2xl tracking-[-0.025em] uppercase text-white mb-3">
                Join the Strength Team
              </h2>
              <p className="font-sans text-[13px] font-light text-white/60 leading-relaxed">
                Be first to access new releases, limited drops, and training insights.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                required
                className="w-full h-12 bg-transparent border border-white/10 px-4 font-mono text-[11px] tracking-[0.1em] text-white placeholder:text-white/20 outline-none transition-colors duration-150 focus:border-white/30"
              />
              <button
                type="submit"
                className="w-full h-12 bg-white text-black font-sans font-black text-xs tracking-[0.1em] uppercase transition-colors duration-150 hover:bg-gray-200"
              >
                Get Early Access
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
