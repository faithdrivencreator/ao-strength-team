"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { items, isOpen, itemCount, subtotal, closeCart, removeItem, updateQuantity } = useCart();

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60" onClick={closeCart} />

      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-black border-l border-white/10 flex flex-col animate-slide-in">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="font-sans font-black text-sm tracking-[-0.025em] uppercase text-white">
            YOUR CART ({itemCount})
          </h2>
          <button
            onClick={closeCart}
            className="text-white/50 transition-colors duration-150 hover:text-white"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <p className="font-mono text-[11px] tracking-[0.1em] text-white/40 uppercase">
                YOUR CART IS EMPTY
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="font-mono text-[11px] tracking-[0.1em] text-white uppercase transition-colors duration-150 hover:text-white/70"
              >
                SHOP NOW &rarr;
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={`${item.productSlug}-${item.color}-${item.size}`}
                  className="flex gap-4 border-b border-white/5 pb-6"
                >
                  <div className="w-20 h-20 bg-gray-900 flex-shrink-0 relative overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="font-sans font-bold text-xs uppercase tracking-[-0.025em] text-white truncate">
                        {item.name}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.1em] text-white/40 mt-1">
                        {item.color} / {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() =>
                            updateQuantity(item.productSlug, item.color, item.size, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-white/50 transition-colors duration-150 hover:text-white text-xs"
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center font-mono text-[11px] text-white border-x border-white/10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productSlug, item.color, item.size, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-white/50 transition-colors duration-150 hover:text-white text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productSlug, item.color, item.size)}
                        className="font-mono text-[10px] tracking-[0.1em] text-white/30 uppercase transition-colors duration-150 hover:text-white"
                        aria-label={`Remove ${item.name}`}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>

                  <p className="font-mono text-xs text-white flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase">
                SUBTOTAL
              </span>
              <span className="font-sans font-bold text-sm text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button className="w-full h-12 bg-white text-black font-sans font-black text-xs tracking-[0.1em] uppercase transition-colors duration-150 hover:bg-gray-200">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
