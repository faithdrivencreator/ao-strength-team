import { getSavings } from "@/data/products";

interface PriceTagProps {
  /** Current (authoritative-display) price in dollars. */
  price: number;
  /** Former price; struck through + drives the SAVE flag. Display-only. */
  compareAt?: number;
  /** "from" prefix for multi-sleeve cards. */
  prefix?: string;
  variant?: "card" | "pdp";
}

/**
 * Honest price display. Renders the current price, an optional struck former
 * price, and a SAVE $X flag - but ONLY when a real former price exceeds the
 * current price. No anchor => clean single price, no flag.
 */
export default function PriceTag({ price, compareAt, prefix, variant = "card" }: PriceTagProps) {
  const savings = getSavings(price, compareAt);
  const onSale = savings > 0;
  const big = variant === "pdp";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={
          big
            ? "font-mono text-base tracking-wide text-white"
            : "font-mono text-[12px] tracking-wide text-white/85"
        }
      >
        {prefix ? `${prefix} ` : ""}${price.toFixed(2)}
      </span>
      {onSale && (
        <>
          <span
            className={
              big
                ? "font-mono text-sm text-white/40 line-through"
                : "font-mono text-[12px] text-white/40 line-through"
            }
          >
            ${compareAt!.toFixed(2)}
          </span>
          <span
            className={
              big
                ? "font-mono text-[11px] tracking-[0.12em] uppercase text-[#9bbf5f] border border-[#5f7d33] rounded px-1.5 py-0.5"
                : "font-mono text-[10px] tracking-[0.1em] uppercase text-[#9bbf5f] border border-[#5f7d33] rounded px-1 py-0.5"
            }
          >
            Save ${savings.toFixed(0)}
          </span>
        </>
      )}
    </span>
  );
}
