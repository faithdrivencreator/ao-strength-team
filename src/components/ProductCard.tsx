import Link from "next/link";
import Image from "next/image";
import { getDisplayCompareAtPrice, type Product, type Fit } from "@/data/products";
import { fromPrice, garmentSwatches, getStoreProduct } from "@/data/storefront";
import PriceTag from "@/components/PriceTag";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onModelFront?: string;
  onModelBack?: string;
  /** When set, the card links to the PDP pre-set to this fit. */
  fit?: Fit;
}

/* Collection card: the on-body photo (hover shows the other side), then the
   name, one honest line, the price, the colors and plain badges. Text sits
   below the photo, not over it, so it stays readable on every image. */
export default function ProductCard({
  product,
  priority = false,
  onModelFront,
  onModelBack,
  fit,
}: ProductCardProps) {
  const store = getStoreProduct(product.slug);
  const title = store?.title ?? product.name.replace(/^AO\s+/i, "");
  const front = onModelFront ?? store?.cardImage ?? product.images[0];
  const swatches = store ? garmentSwatches(store) : [];
  const price = store ? fromPrice(store) : product.price;
  const multiPrice = store ? Object.keys(store.sleeves).length > 1 : false;

  return (
    <Link
      href={fit ? `/products/${product.slug}?fit=${fit}` : `/products/${product.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#C9C3B8]">
        <Image
          src={front}
          alt={store?.cardImageAlt ?? `${product.name} worn by the team`}
          fill
          preload={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={`object-cover object-top transition-opacity duration-500 ${onModelBack ? "group-hover:opacity-0" : ""}`}
        />
        {onModelBack && (
          <Image
            src={onModelBack}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {product.status === "sold-out" && (
          <span className="absolute top-3 left-3 bg-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white">
            Sold out
          </span>
        )}
      </div>

      <div className="pt-3">
        <h3 className="font-sans font-black text-lg md:text-2xl uppercase tracking-tight leading-none text-white">
          {title}
        </h3>
        {store && <p className="mt-1.5 text-[13px] leading-snug text-white/80 line-clamp-2">{store.tagline}</p>}
        <div className="mt-2">
          <PriceTag
            prefix={multiPrice ? "From" : undefined}
            price={price}
            compareAt={getDisplayCompareAtPrice(product)}
          />
        </div>
        {swatches.length > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5" aria-label={`${swatches.length} colors`}>
            {swatches.map((s) => (
              <span
                key={s.name}
                title={s.name}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-white/40"
                style={{ backgroundColor: s.hex }}
              />
            ))}
            <span className="ml-1 font-mono text-[11px] text-white/80">{swatches.length} colors</span>
          </div>
        )}
        {store && store.badges.length > 0 && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/85">{store.badges.join(" · ")}</p>
        )}
      </div>
    </Link>
  );
}
