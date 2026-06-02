"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCart } from "@/contexts/CartContext";
import { CHARITIES } from "@/data/charities";
import { trackBeginCheckout } from "@/lib/gtag";
import { metaInitiateCheckout } from "@/lib/meta-pixel";

const STONE = "#E8DCC8";
const FREE_SHIPPING_THRESHOLD = 75;

export default function CartDrawer() {
  const {
    items,
    isOpen,
    itemCount,
    subtotal,
    selectedCharity,
    setSelectedCharity,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  async function handleCheckout() {
    if (items.length === 0 || checkingOut || !selectedCharity) return;
    setCheckingOut(true);
    setCheckoutError(null);

    trackBeginCheckout(
      items.map((i) => ({
        item_id: i.productSlug,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity,
        item_variant: `${i.color} / ${i.size}`,
      })),
      subtotal,
    );
    metaInitiateCheckout({
      contentIds: items.map((i) => i.productSlug),
      value: subtotal,
      numItems: items.reduce((sum, i) => sum + i.quantity, 0),
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.productSlug,
            color: i.color,
            size: i.size,
            quantity: i.quantity,
            // Sleeve is encoded in the slug by the showcase add-to-cart flow
            // (e.g. ao-warpaint-short-sleeve). Send it explicitly so the
            // server can derive the authoritative per-sleeve price, and send
            // the displayed price so the server can reject any drift.
            sleeve: i.productSlug.endsWith("-long-sleeve")
              ? "long"
              : i.productSlug.endsWith("-short-sleeve")
                ? "short"
                : undefined,
            price: i.price,
          })),
          charity: selectedCharity,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || "Unable to start checkout. Please try again.");
        setCheckingOut(false);
      }
    } catch {
      setCheckoutError("Network error. Please try again.");
      setCheckingOut(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  const selected = selectedCharity
    ? CHARITIES.find((c) => c.id === selectedCharity)
    : undefined;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 36, mass: 0.9 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-[#14110D]/75 backdrop-blur-sm"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          />

          <motion.aside
            className="absolute top-0 right-0 h-full w-full max-w-md bg-[#1C1814] border-l border-white/10 flex flex-col shadow-[-24px_0_60px_-12px_rgba(0,0,0,0.8)]"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={panelTransition}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="font-sans font-black text-base tracking-[-0.025em] uppercase text-white">
                Your Cart
                <span className="ml-2 font-mono text-xs tracking-[0.18em] text-[#E8DCC8]/90">
                  ({itemCount})
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors duration-150 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8]/70 active:opacity-80"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-7 text-center">
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 text-white/60"
                    aria-hidden="true"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 6h15l-1.5 9h-12z" />
                      <circle cx="9" cy="20" r="1" />
                      <circle cx="18" cy="20" r="1" />
                      <path d="M6 6 5 3H2" />
                    </svg>
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans font-black text-lg uppercase tracking-[-0.02em] text-white">
                      Your Cart Is Empty
                    </p>
                    <p className="font-mono text-xs tracking-[0.14em] text-white/55 uppercase">
                      Train hard. Gear up.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex h-11 items-center justify-center px-7 bg-[#E8DCC8] text-black font-sans font-black text-xs tracking-[0.16em] uppercase transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8]/70 active:opacity-80"
                  >
                    Shop Now &rarr;
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {items.map((item) => (
                    <div
                      key={`${item.productSlug}-${item.color}-${item.size}`}
                      className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                    >
                      <div className="w-24 h-24 bg-white/[0.04] flex-shrink-0 relative overflow-hidden rounded-sm ring-1 ring-white/10">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-sans font-bold text-sm uppercase tracking-[-0.02em] text-white truncate">
                              {item.name}
                            </p>
                            <p className="font-mono text-xs tracking-[0.1em] text-white/65 mt-1.5 uppercase">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <p className="font-sans font-bold text-sm text-white flex-shrink-0 tabular-nums">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center rounded-sm border border-white/15 bg-white/[0.03]">
                            <button
                              onClick={() =>
                                updateQuantity(item.productSlug, item.color, item.size, item.quantity - 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-white/70 transition-colors duration-150 hover:text-white hover:bg-white/5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8DCC8]/70 active:opacity-80"
                              aria-label="Decrease quantity"
                            >
                              &minus;
                            </button>
                            <span className="w-9 h-9 flex items-center justify-center font-mono text-sm text-white border-x border-white/15 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productSlug, item.color, item.size, item.quantity + 1)
                              }
                              className="w-9 h-9 flex items-center justify-center text-white/70 transition-colors duration-150 hover:text-white hover:bg-white/5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8DCC8]/70 active:opacity-80"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.productSlug, item.color, item.size)}
                            className="font-mono text-xs tracking-[0.12em] text-white/55 uppercase transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8]/70 active:opacity-80"
                            aria-label={`Remove ${item.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/10 bg-[#14110D]/60">
                <div className="mb-6">
                  <span className="block font-mono text-xs tracking-[0.18em] text-[#E8DCC8]/90 uppercase">
                    Your 10% Tithe Goes To
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Choose the charity for your 10 percent tithe"
                    className="mt-3 flex flex-col gap-2.5"
                  >
                    {CHARITIES.map((c) => {
                      const isSelected = selectedCharity === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedCharity(c.id)}
                          className={`group flex w-full items-center gap-3 rounded-sm border px-3 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8]/70 active:opacity-80 ${
                            isSelected
                              ? "border-[#E8DCC8] bg-[#4A5D3A]/20 text-white"
                              : "border-white/15 text-white/85 hover:border-[#E8DCC8]/30 hover:bg-white/[0.03]"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                              isSelected ? "border-[#E8DCC8]" : "border-white/40"
                            }`}
                            aria-hidden="true"
                          >
                            {isSelected && (
                              <span className="h-2.5 w-2.5 rounded-full bg-[#E8DCC8]" />
                            )}
                          </span>
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-white p-1.5">
                            <Image
                              src={c.logo}
                              alt={`${c.name} logo`}
                              width={36}
                              height={36}
                              className="h-9 w-9 object-contain"
                            />
                          </span>
                          <span className="flex flex-col min-w-0">
                            <span className="font-sans font-bold text-sm uppercase tracking-[-0.02em] truncate">
                              {c.name}
                            </span>
                            <span
                              className={`font-mono text-xs tracking-[0.1em] uppercase truncate ${
                                isSelected ? "text-[#E8DCC8]/90" : "text-white/55"
                              }`}
                            >
                              {c.theme}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {selected && (
                    <p className="mt-3 font-sans text-xs leading-relaxed text-white/65">
                      {selected.blurb}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  {freeShippingUnlocked ? (
                    <p className="font-mono text-xs tracking-[0.12em] text-[#E8DCC8] uppercase">
                      Free shipping unlocked
                    </p>
                  ) : (
                    <p className="font-mono text-xs tracking-[0.12em] text-[#E8DCC8]/70 uppercase">
                      Add ${remaining.toFixed(2)} for free shipping
                    </p>
                  )}
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#E8DCC8]/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#4A5D3A] to-[#E8DCC8]"
                      initial={false}
                      animate={{ width: `${shippingProgress}%` }}
                      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-xs tracking-[0.18em] text-[#E8DCC8]/80 uppercase">
                    Subtotal
                  </span>
                  <span className="font-sans font-black text-xl text-white tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="mb-5 font-mono text-[11px] tracking-[0.1em] text-white/45 uppercase">
                  Shipping calculated at checkout
                </p>

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut || !selectedCharity}
                  className="w-full min-h-[52px] py-4 bg-[#4A5D3A] text-[#E8DCC8] font-sans font-black text-sm tracking-[0.14em] uppercase transition-colors duration-150 hover:bg-[#3B4A2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14110D] focus-visible:ring-[#E8DCC8] disabled:bg-white/[0.06] disabled:text-white/40 disabled:cursor-not-allowed active:opacity-90"
                >
                  {checkingOut ? "Processing..." : "Checkout"}
                </button>
                {!selectedCharity && (
                  <p className="mt-3 font-mono text-xs tracking-[0.12em] text-white/55 uppercase text-center">
                    Select a charity to continue
                  </p>
                )}
                {checkoutError && (
                  <p className="mt-3 font-mono text-xs tracking-[0.12em] text-red-400 uppercase text-center">
                    {checkoutError}
                  </p>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
