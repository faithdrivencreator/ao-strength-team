/**
 * Single source of truth for the free-shipping threshold.
 * Checkout enforcement (api/checkout) and every customer-facing display
 * (top bar, cart progress bar) import from here so the number can never drift.
 */
export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
export const FREE_SHIPPING_THRESHOLD_DOLLARS = FREE_SHIPPING_THRESHOLD_CENTS / 100;

/** Format whole-dollar cents as "$75". */
export function dollars(cents: number): string {
  return `$${Math.round(cents / 100)}`;
}

/** Dollars still needed to reach free shipping, clamped at 0. */
export function remainingToFreeShip(subtotalDollars: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD_DOLLARS - subtotalDollars);
}

/** True once the subtotal reaches the threshold. */
export function hasFreeShipping(subtotalDollars: number): boolean {
  return subtotalDollars >= FREE_SHIPPING_THRESHOLD_DOLLARS;
}
