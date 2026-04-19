"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import { getAllProducts } from "@/data/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="flex flex-col">
      {/* ━━━ HERO ━━━ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/hero-bg.png"
          alt="Alpha Omega Strength Team hero background"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Top-left tag */}
        <span className="absolute top-6 left-6 font-mono text-[11px] tracking-widest uppercase text-white/50">
          // ALPHA OMEGA STRENGTH TEAM
        </span>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] uppercase leading-none tracking-tight">
            BUILT FOR THE BEGINNING.
          </h1>
          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] uppercase leading-none tracking-tight mt-2 md:mt-3">
            PROVEN AT THE FINISH.
          </h1>
          <p className="mt-8 font-sans text-[16px] font-light text-white/70 max-w-lg leading-relaxed">
            Performance apparel for the disciplined. From Alpha to Omega — we are with you from the first step to the last rep.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="bg-white text-black font-sans text-[13px] font-bold uppercase tracking-widest px-10 py-4 hover:bg-white/90 transition-colors"
            >
              Shop New Arrivals
            </Link>
            <Link
              href="#signup"
              className="border border-white text-white font-sans text-[13px] font-bold uppercase tracking-widest px-10 py-4 hover:bg-white/10 transition-colors"
            >
              Join the Team
            </Link>
          </div>
        </div>

        {/* Bottom tag */}
        <span className="absolute bottom-6 left-6 font-mono text-[11px] tracking-widest text-white/40">
          EST. 2026 &nbsp;/&nbsp; 33.7490° N, 84.3880° W
        </span>
      </section>

      {/* ━━━ MARQUEE ━━━ */}
      <ScrollingMarquee />

      {/* ━━━ NEW ARRIVALS ━━━ */}
      <section className="py-20 md:py-32 lg:py-40 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase block mb-2">
                // 01
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              href="/products"
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors"
            >
              SHOP ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-950">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-150 group-hover:scale-[1.02]"
                  />
                  {product.status === "sold-out" && (
                    <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.1em] uppercase bg-black/80 text-white px-3 py-1">
                      SOLD OUT
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <h3 className="font-sans font-bold text-[15px] uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="font-sans text-[14px] font-light text-white/70 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BRAND STORY — FAITHFUL ━━━ */}
      <section className="py-20 md:py-32 lg:py-40 px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto max-w-3xl">
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/40 block mb-6">
            FAITHFUL
          </span>
          <h2 className="font-sans font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-none">
            HE IS THE BEGINNING // AND THE END
          </h2>
          <p className="mt-10 font-sans text-base font-light text-white/70 leading-relaxed max-w-2xl">
            Alpha — God is the beginning. The One who set it all in motion. The reason we rise, the reason we train, the reason we push through. Omega — He is the end. The promise that no effort is wasted when your strength comes from Him. We don&apos;t just wear this name. We carry it.
          </p>
          <blockquote className="mt-10 border-l border-white/20 pl-6 italic text-[14px] text-white/50 leading-relaxed max-w-xl">
            &ldquo;I am the Alpha and the Omega, the First and the Last, the Beginning and the End.&rdquo;
            <span className="block mt-2 not-italic font-mono text-[11px] tracking-[0.1em]">
              — Revelation 22:13
            </span>
          </blockquote>
        </div>
      </section>

      {/* ━━━ FOUR PILLARS ━━━ */}
      <section className="py-20 md:py-32 lg:py-40 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DISCIPLINE */}
            <div className="border border-white/10 p-10 md:p-16">
              <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase block mb-4">
                // 01
              </span>
              <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight mb-6">
                DISCIPLINE
              </h3>
              <p className="font-sans text-[15px] font-light text-white/70 leading-relaxed mb-8">
                The foundation of every rep, every decision, every product we make. We train because He calls us to be disciplined in all things.
              </p>
              <blockquote className="border-l border-white/20 pl-4 italic text-[14px] text-white/40 leading-relaxed">
                &ldquo;No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.&rdquo;
                <span className="block mt-2 not-italic font-mono text-[11px] tracking-[0.1em]">
                  — Hebrews 12:11
                </span>
              </blockquote>
            </div>

            {/* RESILIENCE */}
            <div className="border border-white/10 p-10 md:p-16">
              <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase block mb-4">
                // 02
              </span>
              <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight mb-6">
                RESILIENCE
              </h3>
              <p className="font-sans text-[15px] font-light text-white/70 leading-relaxed mb-8">
                Built to endure. Designed to outlast. Made for those who refuse to quit — because our endurance is rooted in something greater than ourselves.
              </p>
              <blockquote className="border-l border-white/20 pl-4 italic text-[14px] text-white/40 leading-relaxed">
                &ldquo;Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him.&rdquo;
                <span className="block mt-2 not-italic font-mono text-[11px] tracking-[0.1em]">
                  — James 1:12
                </span>
              </blockquote>
            </div>

            {/* INTEGRITY */}
            <div className="border border-white/10 p-10 md:p-16">
              <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase block mb-4">
                // 03
              </span>
              <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight mb-6">
                INTEGRITY
              </h3>
              <p className="font-sans text-[15px] font-light text-white/70 leading-relaxed mb-8">
                No shortcuts. No compromises. We walk upright because that is the path He set before us. Quality in every stitch, purpose in every design.
              </p>
              <blockquote className="border-l border-white/20 pl-4 italic text-[14px] text-white/40 leading-relaxed">
                &ldquo;Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out.&rdquo;
                <span className="block mt-2 not-italic font-mono text-[11px] tracking-[0.1em]">
                  — Proverbs 10:9
                </span>
              </blockquote>
            </div>

            {/* COMMUNITY */}
            <div className="border border-white/10 p-10 md:p-16">
              <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase block mb-4">
                // 04
              </span>
              <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight mb-6">
                COMMUNITY
              </h3>
              <p className="font-sans text-[15px] font-light text-white/70 leading-relaxed mb-8">
                Stronger together. A team united by faith, connected through purpose. We sharpen each other and lift each other up.
              </p>
              <blockquote className="border-l border-white/20 pl-4 italic text-[14px] text-white/40 leading-relaxed">
                &ldquo;As iron sharpens iron, so one person sharpens another.&rdquo;
                <span className="block mt-2 not-italic font-mono text-[11px] tracking-[0.1em]">
                  — Proverbs 27:17
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ GENESIS / FIRST DROP CTA ━━━ */}
      <section className="py-20 md:py-32 lg:py-40 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-[1440px] mx-auto text-center">
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/40 block mb-3">
            GENESIS
          </span>
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/50 block mb-8">
            // LIMITED RELEASE
          </span>
          <h2 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-none">
            THE FIRST DROP
          </h2>
          <p className="mt-8 font-sans text-base font-light text-white/60">
            Limited release. Built for the faithful.
          </p>
          <Link
            href="/products"
            className="inline-block mt-10 bg-white text-black font-sans text-[13px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-white/90 transition-colors"
          >
            SHOP THE DROP →
          </Link>
        </div>
      </section>

      {/* ━━━ SCRIPTURE QUOTE BLOCK ━━━ */}
      <section className="py-[120px] md:py-[160px] px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto text-center">
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30 block mb-6">
            STRENGTH
          </span>
          <blockquote className="font-sans font-black text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-tight max-w-4xl mx-auto">
            &ldquo;I can do all things through Christ who strengthens me.&rdquo;
          </blockquote>
          <p className="mt-6 font-mono text-[13px] text-white/40">
            — Philippians 4:13
          </p>
        </div>
      </section>

      {/* ━━━ BRAND MANIFESTO ━━━ */}
      <section className="py-20 md:py-32 lg:py-40 px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto max-w-3xl">
          <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase block mb-4">
            // 05
          </span>
          <h2 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tight leading-none mb-10">
            THIS IS MORE THAN CLOTHING.
          </h2>
          <p className="font-sans text-base font-light text-white/70 leading-relaxed max-w-2xl mb-10">
            Alpha Omega Strength Team is a community rooted in faith and forged in discipline. We train with purpose, live with conviction, and refuse to settle. When you wear the mark, you carry the standard — and you carry it for Him.
          </p>
          <blockquote className="border-l border-white/20 pl-6 italic text-[14px] text-white/50 leading-relaxed max-w-xl mb-14">
            &ldquo;Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.&rdquo;
            <span className="block mt-2 not-italic font-mono text-[11px] tracking-[0.1em]">
              — Joshua 1:9
            </span>
          </blockquote>
          <Link
            href="#signup"
            className="inline-block bg-white text-black font-sans text-[13px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-white/90 transition-colors"
          >
            JOIN THE STRENGTH TEAM →
          </Link>
        </div>
      </section>

      {/* ━━━ EMAIL SIGNUP ━━━ */}
      <section id="signup" className="py-20 md:py-32 lg:py-40 px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto max-w-xl text-center">
          <h2 className="font-sans font-black text-2xl md:text-4xl uppercase tracking-tight mb-6">
            JOIN THE STRENGTH TEAM
          </h2>
          <p className="font-sans text-[15px] italic text-white/50 mb-10">
            &ldquo;For where two or three gather in my name, there am I with them.&rdquo;
            <span className="block mt-1 not-italic font-mono text-[11px] tracking-[0.1em]">
              — Matthew 18:20
            </span>
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="YOUR EMAIL"
              required
              className="flex-1 bg-transparent border border-white/20 px-4 py-3 font-mono text-[12px] tracking-[0.1em] text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black font-sans text-[12px] font-bold uppercase tracking-widest px-6 py-3 hover:bg-white/90 transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
