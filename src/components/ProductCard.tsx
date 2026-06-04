import Link from "next/link";
import Image from "next/image";
import { getDisplayPrice, getDisplayCompareAtPrice, type Product, type Fit } from "@/data/products";
import PriceTag from "@/components/PriceTag";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onModelFront?: string;
  onModelBack?: string;
  /** When set, the card links to the PDP pre-set to this fit. */
  fit?: Fit;
}

function displayName(name: string): string {
  return name
    .replace(/^AO\s+/i, "")
    .replace(/\s+Collection$/i, "")
    .toUpperCase();
}

function fromPrice(product: Product): string {
  // getDisplayPrice returns the starting (short-sleeve) price, e.g. "from $29.99"
  // for multi-sleeve collections or "$25.99" for single-sleeve products.
  const display = getDisplayPrice(product);
  const match = display.match(/\$[\d.]+/);
  const amount = match ? match[0] : `$${product.price.toFixed(2)}`;
  return `FROM ${amount}`;
}

export default function ProductCard({
  product,
  priority = false,
  onModelFront,
  onModelBack,
  fit,
}: ProductCardProps) {
  const name = displayName(product.name);

  return (
    <Link
      href={fit ? `/products/${product.slug}?fit=${fit}` : `/products/${product.slug}`}
      className="group block rounded-xl overflow-hidden ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1c1814]">
        {onModelFront ? (
          <>
            {onModelBack && (
              <Image
                src={onModelBack}
                alt={`${product.name} worn by the team`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-[1.04] transition-opacity duration-500"
              />
            )}
            <Image
              src={onModelFront}
              alt={`${product.name} worn by the team`}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-[1.04] transition-opacity duration-500"
            />
          </>
        ) : (
          <Image
            src={product.images[0]}
            alt={`${product.name} worn by the team`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-500"
          />
        )}

        {/* Bottom scrim for text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        {/* Sold-out tag */}
        {product.status === "sold-out" && (
          <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.1em] uppercase text-red-500">
            SOLD OUT
          </span>
        )}

        {/* Overlay text */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-white/70">
            WARM STONE SERIES
          </p>
          <h3 className="mt-1 font-sans font-black text-2xl md:text-3xl uppercase tracking-tight leading-none text-white">
            {name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <PriceTag
              prefix="From"
              price={Number(fromPrice(product).match(/[\d.]+/)?.[0] ?? product.price)}
              compareAt={getDisplayCompareAtPrice(product)}
            />
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/70">
                EXPLORE
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-white/70 translate-x-0 group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
