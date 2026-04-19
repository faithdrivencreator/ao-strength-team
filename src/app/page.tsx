"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import { getAllProducts } from "@/data/products";

/* ── Decorative Cross SVG ── */
function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="40" y="0" width="20" height="100" fill="currentColor" />
      <rect x="0" y="25" width="100" height="20" fill="currentColor" />
    </svg>
  );
}

/* ── Decorative thin cross ── */
function ThinCross({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="28" y="0" width="4" height="80" fill="currentColor" />
      <rect x="0" y="20" width="60" height="4" fill="currentColor" />
    </svg>
  );
}

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

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="flex flex-col overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════
          HERO — Full viewport, cinematic
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/images/hero/hero-bg.png"
            alt="Alpha Omega Strength Team"
            fill
            priority
            className="object-cover object-top"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />

        {/* Subtle thin cross — static, elegant, fades in */}
        <motion.div
          className="absolute top-[18%] right-[12%] text-white/[0.05] pointer-events-none hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 2 }}
        >
          <ThinCross className="w-16 h-20" />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-16">
          <motion.h1
            className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] uppercase leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            BUILT FOR THE
            <br />
            BEGINNING.
          </motion.h1>

          <motion.h2
            className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] uppercase leading-[0.95] tracking-tight mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            PROVEN AT
            <br />
            THE FINISH.
          </motion.h2>

          <motion.p
            className="mt-12 font-sans text-lg md:text-xl font-light text-white/60 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Performance apparel for the disciplined. From Alpha to Omega — we are
            with you from the first step to the last rep.
          </motion.p>

          <motion.div
            className="mt-14 flex flex-col sm:flex-row gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link
              href="/shop"
              className="bg-white text-black font-sans text-sm font-bold uppercase tracking-[0.15em] px-12 py-5 hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Shop New Arrivals
            </Link>
            <Link
              href="#signup"
              className="border border-white/60 text-white font-sans text-sm font-bold uppercase tracking-[0.15em] px-12 py-5 hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Join the Team
            </Link>
          </motion.div>
        </div>

        {/* Bottom tag */}
        <motion.span
          className="absolute bottom-8 left-8 md:left-16 font-mono text-[12px] tracking-[0.2em] text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
        >
          EST. 2026 &nbsp;/&nbsp; 33.7490° N, 84.3880° W
        </motion.span>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</span>
          <motion.div
            className="w-px h-8 bg-white/30"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════════════════════ */}
      <div className="border-y border-white/10">
        <ScrollingMarquee />
      </div>


      {/* ════════════════════════════════════════════════════════════
          NEW ARRIVALS — Big product showcase
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 lg:py-56">
        {/* Background decorative cross */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] pointer-events-none">
          <CrossIcon className="w-[500px] h-[500px] md:w-[700px] md:h-[700px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
          <div className="flex items-end justify-between mb-20">
            <div>
              <motion.span
                className="font-mono text-[12px] tracking-[0.2em] text-white/40 uppercase block mb-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                // 01
              </motion.span>
              <motion.h2
                className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.05]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                NEW ARRIVALS
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link
                href="/shop"
                className="font-mono text-[12px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300 border-b border-white/20 hover:border-white pb-1"
              >
                SHOP ALL →
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {products.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-950 border border-white/5">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    {product.status === "sold-out" && (
                      <span className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.15em] uppercase bg-black/90 text-white/80 px-4 py-2 border border-white/10">
                        SOLD OUT
                      </span>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="font-sans font-bold text-base uppercase tracking-[0.05em]">
                      {product.name}
                    </h3>
                    <p className="font-mono text-sm text-white/50">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          BRAND STORY — "FAITHFUL" with background texture
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dark gradient background with subtle texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />

        {/* Large decorative cross watermark */}
        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2 text-white/[0.03] pointer-events-none"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <ThinCross className="w-[300px] h-[400px] md:w-[400px] md:h-[530px]" />
        </motion.div>

        {/* Floating small crosses */}
        <motion.div
          className="absolute top-[10%] left-[8%] text-white/[0.04]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThinCross className="w-8 h-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[15%] text-white/[0.03]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThinCross className="w-12 h-16" />
        </motion.div>

        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 py-32 md:py-48">
          <div className="max-w-3xl">
            <motion.span
              className="font-mono text-[13px] tracking-[0.25em] uppercase text-white/30 block mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              FAITHFUL
            </motion.span>

            <motion.h2
              className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              HE IS THE
              <br />
              BEGINNING //
              <br />
              <span className="text-white/60">AND THE END</span>
            </motion.h2>

            <motion.p
              className="mt-14 font-sans text-lg font-light text-white/60 leading-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Alpha — God is the beginning. The One who set it all in motion. The
              reason we rise, the reason we train, the reason we push through.
              <br /><br />
              Omega — He is the end. The promise that no effort is wasted when your
              strength comes from Him. We don&apos;t just wear this name. We carry it.
            </motion.p>

            <motion.blockquote
              className="mt-14 border-l-2 border-white/15 pl-10 italic text-base text-white/40 leading-8 max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              &ldquo;I am the Alpha and the Omega, the First and the Last, the
              Beginning and the End.&rdquo;
              <span className="block mt-4 not-italic font-mono text-[12px] tracking-[0.2em] text-white/30">
                — Revelation 22:13
              </span>
            </motion.blockquote>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          FOUR PILLARS — Each one is a statement
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 lg:py-56">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
          {/* Section header */}
          <motion.div
            className="text-center mb-24 md:mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-white/30 block mb-4">
              // WHAT WE STAND FOR
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.05]">
              OUR PILLARS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.num}
                className="relative bg-black p-12 md:p-16 lg:p-20 group transition-colors duration-500 hover:bg-white/[0.03]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Large background number */}
                <span className="absolute top-8 right-8 md:top-12 md:right-12 font-sans font-black text-[120px] md:text-[160px] leading-none text-white/[0.03] select-none pointer-events-none">
                  {pillar.num}
                </span>

                <span className="font-mono text-[12px] tracking-[0.2em] text-white/40 uppercase block mb-6">
                  // {pillar.num}
                </span>

                <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight mb-8 leading-[1.1]">
                  {pillar.title}
                </h3>

                <p className="font-sans text-base font-light text-white/60 leading-8 mb-10 max-w-md">
                  {pillar.text}
                </p>

                <blockquote className="border-l-2 border-white/10 pl-6 italic text-[15px] text-white/35 leading-7 max-w-md group-hover:border-white/20 transition-colors duration-500">
                  {pillar.quote}
                  <span className="block mt-3 not-italic font-mono text-[11px] tracking-[0.2em] text-white/25">
                    — {pillar.ref}
                  </span>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          GENESIS — Full-screen cinematic CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_70%)]" />

        {/* Animated cross at center (behind text) */}
        <motion.div
          className="absolute text-white/[0.04] pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <CrossIcon className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]" />
        </motion.div>

        <div className="relative text-center px-8 md:px-16">
          <motion.span
            className="font-mono text-[13px] tracking-[0.3em] uppercase text-white/30 block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            GENESIS
          </motion.span>

          <motion.span
            className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 block mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            // LIMITED RELEASE
          </motion.span>

          <motion.h2
            className="font-sans font-black text-5xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight leading-[0.95]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            THE FIRST
            <br />
            DROP
          </motion.h2>

          <motion.p
            className="mt-10 font-sans text-lg font-light text-white/50 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Limited release. Built for the faithful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/shop"
              className="inline-block mt-12 bg-white text-black font-sans text-sm font-bold uppercase tracking-[0.15em] px-14 py-5 hover:bg-white/90 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]"
            >
              SHOP THE DROP →
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          SCRIPTURE — Full-screen moment of reflection
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />

        {/* Subtle cross watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] pointer-events-none">
          <ThinCross className="w-[200px] h-[260px]" />
        </div>

        <div className="relative text-center px-8 md:px-16 py-32 md:py-48">
          <motion.span
            className="font-mono text-[12px] tracking-[0.3em] uppercase text-white/20 block mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            STRENGTH
          </motion.span>

          <motion.blockquote
            className="font-sans font-black text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tight leading-[1.1] max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            &ldquo;I can do all things through Christ who strengthens me.&rdquo;
          </motion.blockquote>

          <motion.p
            className="mt-10 font-mono text-[13px] tracking-[0.2em] text-white/30"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            — Philippians 4:13
          </motion.p>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          BRAND MANIFESTO — Dramatic reveal
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 lg:py-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-950 to-black" />

        {/* Decorative crosses floating */}
        <motion.div
          className="absolute top-[20%] right-[8%] text-white/[0.03]"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThinCross className="w-16 h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] right-[20%] text-white/[0.02]"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <CrossIcon className="w-24 h-24" />
        </motion.div>

        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
          <div className="max-w-3xl">
            <motion.span
              className="font-mono text-[12px] tracking-[0.2em] text-white/40 uppercase block mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              // 05
            </motion.span>

            <motion.h2
              className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05] mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              THIS IS MORE
              <br />
              THAN CLOTHING.
            </motion.h2>

            {/* Manifesto lines with generous spacing */}
            <div className="space-y-8 mb-16">
              <motion.p
                className="font-sans text-lg font-light text-white/60 leading-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Alpha Omega Strength Team is a community rooted in faith and forged
                in discipline.
              </motion.p>
              <motion.p
                className="font-sans text-lg font-light text-white/60 leading-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                We train with purpose, live with conviction, and refuse to settle.
              </motion.p>
              <motion.p
                className="font-sans text-lg font-light text-white/80 leading-8 max-w-2xl font-normal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                When you wear the mark, you carry the standard — and you carry it
                for Him.
              </motion.p>
            </div>

            <motion.blockquote
              className="border-l-2 border-white/15 pl-10 italic text-base text-white/40 leading-8 max-w-xl mb-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              &ldquo;Have I not commanded you? Be strong and courageous. Do not be
              afraid; do not be discouraged, for the Lord your God will be with you
              wherever you go.&rdquo;
              <span className="block mt-4 not-italic font-mono text-[12px] tracking-[0.2em] text-white/25">
                — Joshua 1:9
              </span>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Link
                href="#signup"
                className="inline-block bg-white text-black font-sans text-sm font-bold uppercase tracking-[0.15em] px-14 py-5 hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                JOIN THE STRENGTH TEAM →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          EMAIL SIGNUP — Final CTA with cross backdrop
      ════════════════════════════════════════════════════════════ */}
      <section id="signup" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

        {/* Center cross watermark */}
        <motion.div
          className="absolute text-white/[0.03] pointer-events-none"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <CrossIcon className="w-[300px] h-[300px]" />
        </motion.div>

        <div className="relative max-w-xl mx-auto text-center px-8 md:px-16 py-32 md:py-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-white/25 block mb-6">
              // JOIN US
            </span>

            <h2 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tight leading-[1.05] mb-8">
              JOIN THE
              <br />
              STRENGTH TEAM
            </h2>
          </motion.div>

          <motion.p
            className="font-sans text-base italic text-white/40 mb-14 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            &ldquo;For where two or three gather in my name, there am I with
            them.&rdquo;
            <span className="block mt-3 not-italic font-mono text-[11px] tracking-[0.2em] text-white/25">
              — Matthew 18:20
            </span>
          </motion.p>

          <motion.form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="YOUR EMAIL"
              required
              className="flex-1 bg-transparent border border-white/15 px-5 py-4 font-mono text-[12px] tracking-[0.15em] text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-white text-black font-sans text-[12px] font-bold uppercase tracking-[0.15em] px-8 py-4 hover:bg-white/90 transition-all duration-300"
            >
              SUBSCRIBE
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
