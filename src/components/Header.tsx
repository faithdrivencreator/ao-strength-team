"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const ANNOUNCEMENT_HEIGHT = 36; // matches the announcement bar height

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-300 border-b border-white/10"
      style={{
        top: ANNOUNCEMENT_HEIGHT,
        backgroundColor: scrolled ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="w-full px-8 md:px-16 lg:px-20 h-14 flex items-center">
        {/* Logo — fixed width so nav centers properly */}
        <div className="w-40">
          <Link href="/" className="text-white font-sans font-black text-base tracking-[-0.025em] uppercase whitespace-nowrap">
            ALPHA OMEGA
          </Link>
        </div>

        {/* Nav — centered */}
        <nav className="hidden md:flex items-center justify-center gap-10 flex-1">
          {["SHOP", "JOURNAL", "CONTACT"].map((item) => (
            <Link
              key={item}
              href={item === "JOURNAL" ? "/blog" : `/${item.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.15em] text-white/60 uppercase transition-colors duration-200 hover:text-white"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right side — fixed width to balance logo */}
        <div className="w-40 flex items-center justify-end gap-4">
          <button
            onClick={toggleCart}
            className="relative text-white/60 transition-colors duration-200 hover:text-white"
            aria-label="Open cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-black text-[9px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/60 transition-colors duration-200 hover:text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-black z-40">
          <nav className="flex flex-col items-start px-8 pt-10 gap-8">
            {["SHOP", "JOURNAL", "CONTACT"].map((item) => (
              <Link
                key={item}
                href={item === "JOURNAL" ? "/blog" : `/${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-black text-3xl tracking-[-0.025em] text-white uppercase transition-colors duration-200 hover:text-white/60"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
