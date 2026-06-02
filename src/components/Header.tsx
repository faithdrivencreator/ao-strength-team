"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const PURCHASE_LOCKED = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";
// SHOP remains in nav even when locked - it routes to the ShopComingSoon hype page.
const NAV_ITEMS = ["SHOP", "JOURNAL", "ABOUT", "CHARITIES", "CONTACT"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();

  // Swipe-up-to-close for the mobile menu. Track where a touch starts; if the
  // finger lifts at least 50px higher than it began, treat it as a swipe up and
  // collapse the menu. A near-stationary tap on a link stays well under the
  // threshold, so navigation is unaffected.
  const touchStartY = useRef<number | null>(null);

  function handleMenuTouchStart(e: React.TouchEvent) {
    touchStartY.current = e.touches[0].clientY;
  }

  function handleMenuTouchEnd(e: React.TouchEvent) {
    if (touchStartY.current === null) return;
    const swipedUp = touchStartY.current - e.changedTouches[0].clientY;
    if (swipedUp > 50) setMobileMenuOpen(false);
    touchStartY.current = null;
  }

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
      className="fixed left-0 right-0 z-50 top-14 sm:top-9 transition-all duration-300 border-b border-white/10"
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="w-full px-8 md:px-16 lg:px-20 h-14 flex items-center">
        {/* Logo - horizontal wordmark (Alpha [cross] Omega). Fixed width so nav centers properly. */}
        <div className="w-40">
          <Link href="/" aria-label="Alpha Omega Strength Team - Home" className="inline-block">
            <Image
              src="/brand/logo-horizontal-white.png"
              alt="Alpha Omega Strength Team"
              width={3800}
              height={900}
              priority
              sizes="160px"
              className="h-7 w-auto"
            />
          </Link>
        </div>

        {/* Nav - centered */}
        <nav className="hidden md:flex items-center justify-center gap-10 flex-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={item === "JOURNAL" ? "/blog" : `/${item.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.15em] text-white/60 uppercase transition-colors duration-200 hover:text-white"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right side - fixed width to balance logo */}
        <div className="w-40 flex items-center justify-end gap-4">
          {/* Cart icon shows whenever the store is browsable. It is intentionally
             not gated on NEXT_PUBLIC_PURCHASE_LOCKED so the cart stays reachable
             from anywhere while the store is in preview / pre-launch. */}
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
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E8DCC8] text-black text-[9px] font-bold flex items-center justify-center">
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
        <div
          className="md:hidden fixed inset-0 top-28 sm:top-[92px] bg-black z-40"
          onTouchStart={handleMenuTouchStart}
          onTouchEnd={handleMenuTouchEnd}
        >
          {/* Grab handle - signals the menu can be swiped up to dismiss. */}
          <div className="flex justify-center pt-3" aria-hidden="true">
            <span className="h-1 w-10 rounded-full bg-white/25" />
          </div>
          <nav className="flex flex-col items-start px-8 pt-8 gap-8">
            {NAV_ITEMS.map((item) => (
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
