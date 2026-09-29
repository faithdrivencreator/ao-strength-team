import Link from "next/link";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HomeEmailForm from "@/components/HomeEmailForm";

const products = getAllProducts();

// Lead with the design's main print: back shots for the back-print designs,
// the front for Unbreakable and the crop. Hover shows the other side.
const MODEL_SHOTS: Record<string, { front: string; back?: string }> = {
  "ao-warpaint": { front: "/images/models/warpaint/man-back.webp", back: "/images/models/warpaint/man-front.webp" },
  "ao-cornerstone": { front: "/images/models/cornerstone/man-back.webp", back: "/images/models/cornerstone/man-front.webp" },
  "ao-unbreakable": { front: "/images/models/unbreakable/woman-front.webp", back: "/images/models/unbreakable/woman-back.webp" },
  "ao-croptop": { front: "/images/models/croptop/woman-front.webp" },
};

const FIT_LINKS = [
  { href: "/shop", label: "All", active: true },
  { href: "/men", label: "Men's" },
  { href: "/women", label: "Women's" },
];

export default function ShopPageClient() {
  return (
    <section className="pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.18em] text-white/80 uppercase">
          Drop 01 · Warm Stone Series · Live now
        </p>
        <h1 className="mt-3 font-sans font-black text-4xl md:text-6xl uppercase tracking-tight leading-[0.95]">
          Shop the drop
        </h1>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-white/85">
          Christian gym shirts with the scripture printed on them. Four designs, short and long sleeve, men&apos;s
          and women&apos;s fit. 10% of every order goes to the charity you choose at checkout.
        </p>

        <nav aria-label="Shop by fit" className="mt-6 flex gap-2">
          {FIT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`min-h-11 inline-flex items-center px-4 font-mono text-[12px] uppercase tracking-[0.12em] border ${l.active ? "bg-white text-black border-white" : "border-white/40 text-white hover:border-white"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
          {products.map((product, i) => {
            const shots = MODEL_SHOTS[product.slug];
            return (
              <ProductCard
                key={product.slug}
                product={product}
                priority={i < 2}
                onModelFront={shots?.front}
                onModelBack={shots?.back}
              />
            );
          })}
        </div>

        <div className="mt-20 border-t border-white/15 pt-12 text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/80 uppercase">Drop 02 is in the forge</p>
          <p className="mt-3 mx-auto max-w-[44ch] text-[15px] leading-relaxed text-white/85">
            Join the list and we will email you when the next drop is ready.
          </p>
          <div className="mt-6">
            <HomeEmailForm />
          </div>
        </div>
      </div>
    </section>
  );
}
