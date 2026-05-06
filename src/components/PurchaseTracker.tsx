"use client";

import { useEffect } from "react";
import { useCart, type CartItem } from "@/contexts/CartContext";
import { trackPurchase } from "@/lib/gtag";

const FIRED_KEY = "ao-purchase-fired";
const STORAGE_KEY = "ao-strength-cart";

export default function PurchaseTracker() {
  const { items, clearCart } = useCart();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      clearCart();
      return;
    }

    // Idempotency — guard against page reloads double-counting
    if (sessionStorage.getItem(FIRED_KEY) === sessionId) {
      clearCart();
      return;
    }

    // Fall back to localStorage if CartProvider hasn't hydrated yet
    let purchaseItems: CartItem[] = items;
    if (!purchaseItems.length) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) purchaseItems = JSON.parse(stored);
      } catch {}
    }

    if (purchaseItems.length) {
      const value = purchaseItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      trackPurchase({
        transactionId: sessionId,
        value,
        items: purchaseItems.map((i) => ({
          item_id: i.productSlug,
          item_name: i.name,
          price: i.price,
          quantity: i.quantity,
          item_variant: `${i.color} / ${i.size}`,
        })),
      });
      sessionStorage.setItem(FIRED_KEY, sessionId);
    }

    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
