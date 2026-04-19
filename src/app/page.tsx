"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import { getAllProducts } from "@/data/products";

const pillars = [
  {
    num: "01",
    title: "DISCIPLINE",
    text: "The foundation of every rep, every decision, every product we make. We train because He calls us to be disciplined in all things.",
    quote:
      "\u201CNo discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.\u201D",
    ref: "Hebrews 12:11",
  },
  {
    num: "02",
    title: "RESILIENCE",
    text: "Built to endure. Designed to outlast. Made for those who refuse to quit \u2014 because our endurance is rooted in something greater than ourselves.",
    quote:
      "\u201CBlessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him.\u201D",
    ref: "James 1:12",
  },
  {
    num: "03",
    title: "INTEGRITY",
    text: "No shortcuts. No compromises. We walk upright because that is the path He set before us. Quality in every stitch, purpose in every design.",
    quote:
      "\u201CWhoever walks in integrity walks securely, but whoever takes crooked paths will be found out.\u201D",
    ref: "Proverbs 10:9",
  },
  {
    num: "04",
    title: "COMMUNITY",
    text: "Stronger together. A team united by faith, connected through purpose. We sharpen each other and lift each other up.",
    quote:
      "\u201CAs iron sharpens iron, so one person sharpens another.\u201D",
    ref: "Proverbs 27:17",
  },
];

const manifestoLines = [
  "Alpha Omega Strength Team is a community rooted in faith and forged in discipline.",
  "We train with purpose, live with conviction, and refuse to settle.",
  "When you wear the mark, you carry the standard \u2014 and you carry it for Him.",
];

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="flex flex-col">
      {/* ━━━ HERO ━━━ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background with slow Ken Burns zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/images/hero/hero-bg.png"
            alt="Alpha Omega Strength Team hero background"
            fill
            priority
            className="object-cover object-top"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Top-left tag */}
        <motion.span
          className="absolute top-6 left-8 font-mono text-[12px] tracking-widest uppercase text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          // ALPHA OMEGA STRENGTH TEAM
        </motion.span>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-12 lg:px-16">
          <motion.h1
            className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] uppercase leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            BUILT FOR THE BEGINNING.
          </motion.h1>
          <motion.h1
            className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] uppercase leading-tight tracking-tight mt-2 md:mt-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            PROVEN AT THE FINISH.
          </motion.h1>
          <motion.p
            className="mt-8 font-sans text-base font-light text-white/70 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Performance apparel for the disciplined. From Alpha to Omega — we are
            with you from the first step to the last rep.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              href="/shop"
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
          </motion.div>
        </div>

        {/* Bottom tag */}
        <motion.span
          className="absolute bottom-6 left-8 font-mono text-[12px] tracking-widest text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          EST. 2026 &nbsp;/&nbsp; 33.7490° N, 84.3880° W
        </motion.span>
      </section>

      {/* ━━━ MARQUEE ━━━ */}
      <ScrollingMarquee />

      {/* ━━━ SECTION DIVIDER ━━━ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ━━━ NEW ARRIVALS ━━━ */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex items-end justify-between mb-14">
            <div>
              <motion.span
                className="font-mono text-[12px] tracking-[0.1em] text-white/50 uppercase block mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                // 01
              </motion.span>
              <motion.h2
                className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight leading-tight"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                NEW ARRIVALS
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/shop"
                className="font-mono text-[12px] tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors"
              >
                SHOP ALL →
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group block transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-950">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    {product.status === "sold-out" && (
                      <span className="absolute top-4 left-4 font-mono text-[12px] tracking-[0.1em] uppercase bg-black/80 text-white px-3 py-1">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ SECTION DIVIDER ━━━ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ━━━ BRAND STORY — FAITHFUL ━━━ */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <motion.span
              className="font-mono text-[12px] tracking-[0.1em] uppercase text-white/40 block mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              FAITHFUL
            </motion.span>
            <motion.h2
              className="font-sans font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              HE IS THE BEGINNING // AND THE END
            </motion.h2>
            <motion.p
              className="mt-10 font-sans text-base font-light text-white/70 leading-7 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Alpha — God is the beginning. The One who set it all in motion. The
              reason we rise, the reason we train, the reason we push through.
              Omega — He is the end. The promise that no effort is wasted when your
              strength comes from Him. We don&apos;t just wear this name. We carry
              it.
            </motion.p>
            <motion.blockquote
              className="mt-10 border-l border-white/20 pl-8 italic text-[15px] text-white/50 leading-relaxed max-w-xl"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              &ldquo;I am the Alpha and the Omega, the First and the Last, the
              Beginning and the End.&rdquo;
              <span className="block mt-2 not-italic font-mono text-[12px] tracking-[0.1em]">
                — Revelation 22:13
              </span>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION DIVIDER ━━━ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ━━━ FOUR PILLARS ━━━ */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.num}
                className="border border-white/10 p-10 md:p-16 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.02]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <span className="font-mono text-[12px] tracking-[0.1em] text-white/50 uppercase block mb-4">
                  // {pillar.num}
                </span>
                <h3 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight mb-6">
                  {pillar.title}
                </h3>
                <p className="font-sans text-[15px] font-light text-white/70 leading-relaxed mb-8">
                  {pillar.text}
                </p>
                <blockquote className="border-l border-white/20 pl-4 italic text-[14px] text-white/40 leading-relaxed">
                  {pillar.quote}
                  <span className="block mt-2 not-italic font-mono text-[12px] tracking-[0.1em]">
                    — {pillar.ref}
                  </span>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ SECTION DIVIDER ━━━ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ━━━ GENESIS / FIRST DROP CTA ━━━ */}
      <section className="py-24 md:py-36 lg:py-44 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center">
            <motion.span
              className="font-mono text-[12px] tracking-[0.1em] uppercase text-white/40 block mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              GENESIS
            </motion.span>
            <motion.span
              className="font-mono text-[12px] tracking-[0.1em] uppercase text-white/50 block mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              // LIMITED RELEASE
            </motion.span>
            <motion.h2
              className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              THE FIRST DROP
            </motion.h2>
            <motion.p
              className="mt-8 font-sans text-base font-light text-white/60 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Limited release. Built for the faithful.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/shop"
                className="relative inline-block mt-10 bg-white text-black font-sans text-[13px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                SHOP THE DROP →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION DIVIDER ━━━ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ━━━ SCRIPTURE QUOTE BLOCK ━━━ */}
      <section className="py-[120px] md:py-[160px]">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center">
            <motion.span
              className="font-mono text-[12px] tracking-[0.1em] uppercase text-white/30 block mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              STRENGTH
            </motion.span>
            <motion.blockquote
              className="font-sans font-black text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-tight max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              &ldquo;I can do all things through Christ who strengthens me.&rdquo;
            </motion.blockquote>
            <motion.p
              className="mt-6 font-mono text-[13px] text-white/40"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              — Philippians 4:13
            </motion.p>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION DIVIDER ━━━ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ━━━ BRAND MANIFESTO ━━━ */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <motion.span
              className="font-mono text-[12px] tracking-[0.1em] text-white/50 uppercase block mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              // 05
            </motion.span>
            <motion.h2
              className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tight leading-tight mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              THIS IS MORE THAN CLOTHING.
            </motion.h2>

            {/* Line-by-line manifesto reveal */}
            <div className="space-y-4 mb-10">
              {manifestoLines.map((line, index) => (
                <motion.p
                  key={index}
                  className="font-sans text-base font-light text-white/70 leading-7 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.blockquote
              className="border-l border-white/20 pl-8 italic text-[15px] text-white/50 leading-relaxed max-w-xl mb-14"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              &ldquo;Have I not commanded you? Be strong and courageous. Do not be
              afraid; do not be discouraged, for the Lord your God will be with you
              wherever you go.&rdquo;
              <span className="block mt-2 not-italic font-mono text-[12px] tracking-[0.1em]">
                — Joshua 1:9
              </span>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="#signup"
                className="inline-block bg-white text-black font-sans text-[13px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-white/90 transition-colors"
              >
                JOIN THE STRENGTH TEAM →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION DIVIDER ━━━ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ━━━ EMAIL SIGNUP ━━━ */}
      <section id="signup" className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2
              className="font-sans font-black text-2xl md:text-4xl uppercase tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              JOIN THE STRENGTH TEAM
            </motion.h2>
            <motion.p
              className="font-sans text-[15px] italic text-white/50 mb-10 leading-relaxed"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              &ldquo;For where two or three gather in my name, there am I with
              them.&rdquo;
              <span className="block mt-1 not-italic font-mono text-[12px] tracking-[0.1em]">
                — Matthew 18:20
              </span>
            </motion.p>
            <motion.form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
