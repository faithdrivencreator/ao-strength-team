import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import HomeEmailForm from "@/components/HomeEmailForm";
import { getAllProducts } from "@/data/products";
import { CHARITIES } from "@/data/charities";
import type { BlogPost } from "@/lib/blog";

/* The homepage as a storefront (store redesign, 2026-09-29). Server rendered,
   about 8 phone screens: the drop on a body with one clear action, the four
   products, shop by fit, where the 10% goes, why the scripture, the journal and
   the list. Every photo shows a product the store actually sells. */

const CARD_SHOTS: Record<string, { front: string; back?: string }> = {
  "ao-warpaint": { front: "/images/models/warpaint/man-back.webp", back: "/images/models/warpaint/man-front.webp" },
  "ao-cornerstone": { front: "/images/models/cornerstone/man-back.webp", back: "/images/models/cornerstone/man-front.webp" },
  "ao-unbreakable": { front: "/images/models/unbreakable/woman-front.webp", back: "/images/models/unbreakable/woman-back.webp" },
  "ao-croptop": { front: "/images/models/croptop/woman-front.webp" },
};

const FIT_TILES = [
  { label: "Men's", href: "/men", image: "/images/models/cornerstone/man-front.webp", alt: "Man wearing the black Cornerstone tee" },
  { label: "Women's", href: "/women", image: "/images/models/warpaint/woman-front.webp", alt: "Woman wearing the black Warpaint tee" },
];

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function StoreHome({ latestPosts = [] }: { latestPosts?: BlogPost[] }) {
  const products = getAllProducts();

  return (
    <div className="flex flex-col overflow-x-hidden bg-ink">
      {/* Hero: the drop on a body, one action */}
      <section className="grid md:grid-cols-2 md:min-h-[calc(100vh-92px)] bg-ink-deep">
        <div className="relative h-[38vh] min-h-[220px] md:h-auto md:order-2 bg-[#C9C3B8]">
          <Image
            src="/images/models/warpaint/man-back.webp"
            alt="Back of the black Warpaint tee: ALPHA, cross, OMEGA in hand-painted strokes"
            fill
            preload
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_18%]"
          />
        </div>
        <div className="flex items-center px-5 pt-5 pb-8 md:px-14 lg:px-20 md:py-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">Drop 01 · Warm Stone Series · Live now</p>
            <h1 className="mt-3 font-sans font-black uppercase leading-[0.95] tracking-tight text-[34px] sm:text-5xl lg:text-7xl">
              Built for the beginning.
              <span className="block text-cream">Proven at the finish.</span>
            </h1>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="inline-flex min-h-13 items-center justify-center gap-2 bg-white px-8 font-sans text-[13px] font-black uppercase tracking-[0.14em] text-black hover:bg-cream transition-colors"
              >
                Shop Drop 01 <Arrow />
              </Link>
              <Link
                href="/women"
                className="hidden sm:inline-flex min-h-13 items-center justify-center border border-white/60 px-8 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-white hover:border-white transition-colors"
              >
                Shop women&apos;s
              </Link>
            </div>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/85">
              Christian training tees with the scripture printed on them. Short and long sleeve, men&apos;s and
              women&apos;s fit, from $25.99.
            </p>
          </div>
        </div>
      </section>

      {/* The drop */}
      <section className="max-w-[1440px] w-full mx-auto px-5 md:px-10 py-14 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-sans font-black uppercase tracking-tight text-3xl md:text-5xl leading-none">Drop 01</h2>
          <Link href="/shop" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-white underline-offset-4 hover:underline">
            View all <Arrow />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} onModelFront={CARD_SHOTS[p.slug]?.front} onModelBack={CARD_SHOTS[p.slug]?.back} />
          ))}
        </div>
      </section>

      {/* Shop by fit */}
      <section className="max-w-[1440px] w-full mx-auto px-5 md:px-10 pb-14 md:pb-20">
        <h2 className="font-sans font-black uppercase tracking-tight text-3xl md:text-5xl leading-none">Shop by fit</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-6">
          {FIT_TILES.map((t) => (
            <Link key={t.href} href={t.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#C9C3B8]">
                <Image src={t.image} alt={t.alt} fill sizes="(max-width: 768px) 50vw, 45vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-3 inline-flex items-center gap-2 font-sans font-black uppercase tracking-tight text-lg md:text-2xl">
                {t.label} <Arrow />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Where the 10% goes */}
      <section className="bg-cream text-ink">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-14 md:py-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-military-deep">Strength with a purpose</p>
            <h2 className="mt-3 font-sans font-black uppercase tracking-tight text-3xl md:text-5xl leading-[0.95]">
              10% of every order goes to the charity you choose at checkout.
            </h2>
            <Link href="/tithe" className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink underline underline-offset-4">
              How the tithe works <Arrow />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {CHARITIES.map((c) => (
              <li key={c.id} className="bg-white p-4">
                <div className="relative h-10">
                  <Image src={c.logo} alt={c.name} fill unoptimized sizes="160px" className="object-contain object-left" />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/80">{c.theme}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why the scripture */}
      <section className="max-w-[900px] w-full mx-auto px-5 md:px-10 py-16 md:py-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">Why we print the Word</p>
        <blockquote className="mt-5">
          <p className="font-sans font-black uppercase tracking-tight text-2xl md:text-4xl leading-[1.1]">
            &ldquo;I am the Alpha and the Omega, the First and the Last, the Beginning and the End.&rdquo;
          </p>
          <cite className="mt-4 block font-mono text-[12px] not-italic uppercase tracking-[0.16em] text-white/80">Revelation 22:13</cite>
        </blockquote>
        <p className="mt-6 mx-auto max-w-[56ch] text-[15px] leading-relaxed text-white/85">
          Strength does not start with us. Every tee carries a verse so the reminder goes where you go: the gym, the
          job, the hard mile. Train with purpose.
        </p>
        <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-white underline underline-offset-4">
          Our story <Arrow />
        </Link>
      </section>

      {/* Journal */}
      {latestPosts.length > 0 && (
        <section className="border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-14 md:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-sans font-black uppercase tracking-tight text-3xl md:text-5xl leading-none">The journal</h2>
              <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-white underline-offset-4 hover:underline">
                All posts <Arrow />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group flex gap-4 md:block">
                    {post.mainImage && (
                      <div className="relative h-24 w-24 shrink-0 md:h-auto md:w-full md:aspect-[16/10] overflow-hidden bg-ink-soft">
                        <Image src={post.mainImage.src} alt={post.mainImage.alt} fill sizes="(max-width: 768px) 96px, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </div>
                    )}
                    <div className="md:mt-4">
                      <p className="font-sans font-bold text-[16px] leading-snug text-white group-hover:underline underline-offset-4">{post.title}</p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/80 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* The list */}
      <section id="signup" className="border-t border-white/10 bg-ink-deep scroll-mt-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">Drop 02 is in the forge</p>
          <h2 className="mt-3 font-sans font-black uppercase tracking-tight text-3xl md:text-5xl leading-none">Join the team</h2>
          <p className="mt-4 mx-auto max-w-[44ch] text-[15px] leading-relaxed text-white/85">
            One email when the next drop is ready, plus the weekly discipline note.
          </p>
          <div className="mt-8">
            <HomeEmailForm />
          </div>
        </div>
      </section>
    </div>
  );
}
