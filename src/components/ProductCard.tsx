import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block border border-white/10">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>
      <div className="px-4 py-4">
        <h3 className="font-sans font-bold text-[14px] uppercase tracking-wide">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-sans font-normal text-[14px] text-white/70">
            ${product.price.toFixed(2)}
          </span>
          {product.status === "sold-out" && (
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-500">
              SOLD OUT
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
