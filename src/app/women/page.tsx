import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProduct, getCompareAtPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PriceTag from "@/components/PriceTag";

export const metadata: Metadata = {
  title: "Women's | Alpha Omega Strength Team",
  description:
    "Women's faith-forged training gear. Warpaint, Unbreakable, Cornerstone, and the Cornerstone Crop, cut for women. Built to train in, built to believe in.",
};

// The crop is the women's signature piece. It leads as a full-width hero.
const CROP_SLUG = "ao-croptop";
const CROP_IMAGE = "/images/models/croptop/woman-front.webp";

// The three collections sit in a trio beneath the featured crop.
const COLLECTIONS = [
  { slug: "ao-warpaint", front: "/images/models/warpaint/woman-front.webp", back: "/images/models/warpaint/woman-back.webp" },
  { slug: "ao-unbreakable", front: "/images/models/unbreakable/woman-front.webp", back: "/images/models/unbreakable/woman-back.webp" },
  { slug: "ao-cornerstone", front: "/images/models/cornerstone/woman-front.webp", back: "/images/models/cornerstone/woman-back.webp" },
];

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="translate-x-0 group-hover:translate-x-1 transition-transform"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function FeaturedCrop() {
  const crop = getProduct(CROP_SLUG);
  if (!crop) return null;

  return (
    <Link
      href={`/products/${CROP_SLUG}?fit=womens`}
      className="group block rounded-xl overflow-hidden ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Portrait model shot, front only. Held to a tall aspect so it never crops badly. */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#1c1814]">
          <Image
            src={CROP_IMAGE}
            alt="AO Cornerstone Crop worn by the team"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-500"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
        </div>

        {/* Editorial text panel, vertically centered. */}
        <div className="flex flex-col justify-center gap-5 bg-[#121010] p-8 md:p-12 lg:p-16">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#9bbf5f]">
            The Women&apos;s Signature
          </p>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.95] text-white">
            Cornerstone
            <br />
            Crop
          </h2>
          <p className="font-sans text-sm md:text-base leading-relaxed text-white/55 max-w-md">
            A flowy cropped tee with the boxed Alpha, cross, Omega emblem. Modest cut,
            built to train in and built to believe in.
          </p>
          <div className="pt-1">
            <PriceTag
              price={crop.price}
              compareAt={getCompareAtPrice(CROP_SLUG)}
              variant="pdp"
            />
          </div>
          <span className="mt-2 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.18em] uppercase text-white">
            Shop Now
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function WomensPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 pt-16 pb-24">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">The Strength Team</p>
        <h1 className="mt-2 font-sans font-black text-5xl md:text-7xl uppercase tracking-tight text-white">Women&apos;s</h1>

        <div className="mt-12">
          <FeaturedCrop />
        </div>

        <p className="mt-16 font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">The Collections</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map(({ slug, front, back }) => {
            const product = getProduct(slug);
            if (!product) return null;
            return (
              <ProductCard
                key={slug}
                product={product}
                priority
                onModelFront={front}
                onModelBack={back}
                fit="womens"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
