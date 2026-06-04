"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import CollectionCards from "@/components/CollectionCards";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import ShopByFit from "@/components/ShopByFit";
import HomeEmailForm from "@/components/HomeEmailForm";
import LaunchCountdown from "@/components/LaunchCountdown";
import NotifyDropModal from "@/components/NotifyDropModal";
import { getAllProducts } from "@/data/products";
import type { BlogPost } from "@/lib/blog";

const JOURNAL_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const PURCHASE_LOCKED = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";

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

/* ── Pillar icons (24px stroke set) ── */
function DumbbellIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="9" width="3" height="6" rx="0.5" />
      <rect x="5" y="7.5" width="3" height="9" rx="0.5" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <rect x="16" y="7.5" width="3" height="9" rx="0.5" />
      <rect x="19" y="9" width="3" height="6" rx="0.5" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3 L4 6 V12 C4 16.5 7.5 19.8 12 21 C16.5 19.8 20 16.5 20 12 V6 L12 3 Z" />
    </svg>
  );
}

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20 C5 16 8 14 12 14 C16 14 19 16 19 20" />
    </svg>
  );
}

function PillarCrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="6" y1="9" x2="18" y2="9" />
    </svg>
  );
}

const trustPillars = [
  { Icon: DumbbellIcon, title: "DISCIPLINED", line: "Training. Mindset." },
  { Icon: ShieldIcon, title: "UNBREAKABLE", line: "Built to last. Built to lead." },
  { Icon: PersonIcon, title: "COMMUNITY", line: "Stronger together." },
  { Icon: PillarCrossIcon, title: "FAITH DRIVEN", line: "Purpose in every rep." },
];

const charities = [
  { name: "Compassion International", theme: "CHILD DEVELOPMENT", blurb: "Releasing children from extreme poverty and providing education in Jesus' name.", logo: "/images/charities/compassion.svg", url: "https://www.compassion.com" },
  { name: "Samaritan's Purse", theme: "DISASTER RELIEF", blurb: "Deploying emergency aid, food, and mobile field hospitals to crisis zones around the world.", logo: "/images/charities/samaritans-purse.svg", url: "https://www.samaritanspurse.org" },
  { name: "Mercy Ships", theme: "MEDICAL CARE", blurb: "Bringing life-saving surgeries and care to developing nations aboard the world's largest civilian hospital ships.", logo: "/images/charities/mercy-ships.png", url: "https://www.mercyships.org" },
  { name: "World Vision", theme: "CLEAN WATER & COMMUNITY", blurb: "Helping vulnerable families break the cycle of poverty with clean water and sustainable support.", logo: "/images/charities/world-vision.svg", url: "https://www.worldvision.org" },
];

interface MainHomeProps {
  latestPosts?: BlogPost[];
}

export default function MainHome({ latestPosts = [] }: MainHomeProps) {
  const products = getAllProducts();
  const [notifyOpen, setNotifyOpen] = useState(false);

  return (
    <div className="flex flex-col overflow-x-hidden">

      {PURCHASE_LOCKED && (
        <NotifyDropModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />
      )}

      {/* ════════════════════════════════════════════════════════════
          HERO Split layout (text left, image right) + trust bar
      ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-ink flex flex-col">
        <div className="flex flex-col md:flex-row">
        {/* Left side - black with text */}
        <div className="relative w-full md:w-[48%] bg-ink-deep flex items-end md:items-center min-h-[50vh] md:min-h-[calc(100vh-220px)]">
          <div className="relative z-10 px-8 md:px-16 lg:px-20 pb-12 md:pb-0 pt-8 md:pt-0">
            <motion.h1
              className="font-sans font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              BUILT FOR THE
              <br />
              BEGINNING.
            </motion.h1>

            <motion.h2
              className="font-sans font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-[0.95] tracking-tight mt-3 text-white/40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              PROVEN AT THE FINISH.
            </motion.h2>

            <motion.p
              className="mt-10 font-mono text-[12px] tracking-[0.25em] uppercase text-white/55"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              STRENGTHEN. ENDURE. FINISH.
            </motion.p>

            {PURCHASE_LOCKED && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
              >
                <LaunchCountdown />
              </motion.div>
            )}

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {PURCHASE_LOCKED ? (
                <>
                  <button
                    onClick={() => setNotifyOpen(true)}
                    className="bg-white text-black font-sans text-[13px] font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-white/90 transition-all duration-300 text-center"
                  >
                    Get First Access
                  </button>
                  <Link
                    href="/shop"
                    className="border border-white/40 text-white font-sans text-[13px] font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-white/10 hover:border-white transition-all duration-300 text-center"
                  >
                    See the Drop
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/shop"
                    className="bg-white text-black font-sans text-[13px] font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-white/90 transition-all duration-300 text-center"
                  >
                    Shop the Collection
                  </Link>
                  <Link
                    href="#signup"
                    className="border border-white/40 text-white font-sans text-[13px] font-bold uppercase tracking-[0.15em] px-10 py-4 hover:bg-white/10 hover:border-white transition-all duration-300 text-center"
                  >
                    Join the Team
                  </Link>
                </>
              )}
            </motion.div>

            <motion.span
              className="block mt-16 font-mono text-[11px] tracking-[0.2em] text-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              EST. 2026 &nbsp;/&nbsp; 33.7490° N, 84.3880° W
            </motion.span>
          </div>
        </div>

        {/* Right side - hero image */}
        <div className="relative w-full md:w-[52%] min-h-[50vh] md:min-h-[calc(100vh-220px)] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <Image
              src="/images/hero/hero-bg.webp"
              alt="Athlete from behind wearing the Alpha Omega Unbreakable hoodie in a dark gym"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 52vw"
              className="object-cover object-[70%_center]"
            />
          </motion.div>
        </div>
        </div>

        {/* Trust bar - 4 pillars across full width */}
        <motion.div
          className="relative z-10 border-t border-white/10 bg-ink"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
            {trustPillars.map(({ Icon, title, line }) => (
              <div
                key={title}
                className="group flex flex-col items-center text-center px-6 md:px-8 py-10 md:py-12 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <Icon className="w-10 h-10 md:w-12 md:h-12 text-white shrink-0 mb-5 transition-transform duration-300 group-hover:scale-[1.08]" />
                <div className="font-sans font-black text-[15px] md:text-[17px] tracking-[0.2em] uppercase text-white leading-tight">
                  {title}
                </div>
                <div className="font-sans text-[12px] md:text-[13px] text-white/55 mt-3 leading-snug max-w-[180px]">
                  {line}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════════════════════ */}
      <div className="border-y border-white/10">
        <ScrollingMarquee />
      </div>


      {/* ════════════════════════════════════════════════════════════
          NEW ARRIVALS Big product showcase (hidden while purchase is locked)
      ════════════════════════════════════════════════════════════ */}
      {!PURCHASE_LOCKED && (
      <section className="relative pt-32 md:pt-48 lg:pt-56 pb-20 md:pb-24">
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

          <CollectionCards products={products} />

          <motion.p
            className="mt-16 font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            // THE FIRST THREE ARE LIVE. THE NEXT IS ALREADY IN THE FORGE.
          </motion.p>
        </div>
      </section>
      )}

      {!PURCHASE_LOCKED && <ShopByFit />}

      {/* ════════════════════════════════════════════════════════════
          CAMPAIGN BANNER Full-bleed cinematic call to action
      ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[60vh] min-h-[440px] md:h-[70vh] overflow-hidden">
        <Image
          src="/images/campaign/strength-banner.webp"
          alt="Athlete training toward the light"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 flex items-center justify-center md:justify-end">
          <motion.div
            className="max-w-md text-center md:text-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#E8DCC8]/80 block mb-4">
              // STRENGTH WITH A PURPOSE
            </span>
            <h2 className="font-sans font-black uppercase tracking-tight text-3xl md:text-5xl leading-[1.05] text-white">
              WEAR YOUR
              <br />
              FAITH.
            </h2>
            <p className="font-sans font-light text-white/70 text-base mt-5 md:ml-auto max-w-sm">
              Faith-forged gear in three collections. 10% of every order goes
              back to those on the frontlines of human need.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-8 bg-white text-black font-sans text-sm font-bold uppercase tracking-[0.15em] px-14 py-5 hover:bg-white/90 transition-all duration-300"
            >
              SHOP THE COLLECTION →
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          LOOKBOOK Editorial bento grid of lifestyle photography
      ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 md:pt-28 pb-32 md:pb-48 bg-ink">
        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
            <div className="max-w-2xl">
              <motion.span
                className="font-mono text-[12px] tracking-[0.2em] text-white/40 uppercase block mb-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                // 02 &nbsp;/&nbsp; WORN BY THE TEAM
              </motion.span>
              <motion.h2
                className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.05]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                WORN IN. LIVED OUT.
              </motion.h2>
              <motion.p
                className="mt-6 font-sans font-light text-white/55 text-base md:text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Built for the work. Cut for movement. This is the gear under load,
                between sets, and walking out stronger than it walked in.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link
                href="/shop"
                className="font-mono text-[12px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300 border-b border-white/20 hover:border-white pb-1 whitespace-nowrap"
              >
                SHOP THE COLLECTION →
              </Link>
            </motion.div>
          </div>

          {/* Bento grid - balanced editorial: full-width 16:9 features framing 3-up portrait rows */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {/* Row 1 - full-width landscape feature (clickable) */}
            <motion.div
              className="col-span-2 md:col-span-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0 }}
            >
              <Link
                href="/shop"
                className="group relative block w-full aspect-[16/9] overflow-hidden bg-neutral-950 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <Image
                  src="/images/lifestyle/female-back-black.webp"
                  alt="Athlete seen from behind wearing the black Alpha Omega sweater"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500 pointer-events-none" />
                <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#E8DCC8]">
                  // THE STRENGTH TEAM
                </span>
              </Link>
            </motion.div>

            {/* Row 2 - 3-up equal portraits (couple clickable) */}
            <motion.div
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0 }}
            >
              <div className="group relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
                <Image
                  src="/images/lifestyle/male-overhead-press.webp"
                  alt="Athlete pressing overhead in the black Alpha Omega gear"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <div className="group relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
                <Image
                  src="/images/lifestyle/female-bench-press.webp"
                  alt="Athlete on the bench press in the cream Alpha Omega gear"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              className="col-span-2 md:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.16 }}
            >
              <Link
                href="/shop"
                className="group relative block w-full aspect-[4/5] overflow-hidden bg-neutral-950 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <Image
                  src="/images/lifestyle/couple-walkout.webp"
                  alt="A couple walking out of the gym in matching cream Alpha Omega tanks"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500 pointer-events-none" />
                <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#E8DCC8]">
                  // CORNERSTONE
                </span>
              </Link>
            </motion.div>

            {/* Row 3 - full-width landscape feature (clickable) */}
            <motion.div
              className="col-span-2 md:col-span-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Link
                href="/shop"
                className="group relative block w-full aspect-[16/9] overflow-hidden bg-neutral-950 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <Image
                  src="/images/lifestyle/male-portrait-cream.webp"
                  alt="Portrait of an athlete in the cream Alpha Omega sweater"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500 pointer-events-none" />
                <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#E8DCC8]">
                  // TRAIN. ENDURE. FINISH.
                </span>
              </Link>
            </motion.div>

            {/* Row 4 - 3-up equal portraits */}
            <motion.div
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0 }}
            >
              <div className="group relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
                <Image
                  src="/images/lifestyle/female-cable-row.webp"
                  alt="Athlete on the cable row in the black Alpha Omega gear"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <div className="group relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
                <Image
                  src="/images/lifestyle/female-portrait-sage.webp"
                  alt="Portrait of an athlete in the sage Alpha Omega piece"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              className="col-span-2 md:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.16 }}
            >
              <div className="group relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
                <Image
                  src="/images/lifestyle/male-towel-rest.webp"
                  alt="Athlete resting between sets in the black Alpha Omega gear"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          BRAND STORY - "FAITHFUL" with background texture
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-cream">
        {/* Dark gradient background with subtle texture */}
        <div className="absolute inset-0 bg-cream" />

        {/* Large decorative cross watermark */}
        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2 text-ink/[0.05] pointer-events-none"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <ThinCross className="w-[300px] h-[400px] md:w-[400px] md:h-[530px]" />
        </motion.div>

        {/* Floating small crosses */}
        <motion.div
          className="absolute top-[10%] left-[8%] text-ink/[0.06]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThinCross className="w-8 h-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[15%] text-ink/[0.05]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThinCross className="w-12 h-16" />
        </motion.div>

        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 py-32 md:py-48">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="font-mono text-[13px] tracking-[0.25em] uppercase text-military block mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              FAITHFUL
            </motion.span>

            <motion.h2
              className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05] text-ink"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              HE IS THE
              <br />
              BEGINNING //
              <br />
              <span className="text-ink/60">AND THE END</span>
            </motion.h2>

            <motion.p
              className="mt-14 font-sans text-lg font-light text-ink/70 leading-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Alpha: God is the beginning. The One who set it all in motion. The
              reason we rise, the reason we train, the reason we push through.
              <br /><br />
              Omega: He is the end. The promise that no effort is wasted when your
              strength comes from Him. We don&apos;t just wear this name. We carry it.
            </motion.p>

            <motion.blockquote
              className="mt-14 border-l-2 border-ink/20 pl-10 text-base text-ink/60 leading-8 max-w-xl mx-auto text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              &ldquo;I am the Alpha and the Omega, the First and the Last, the
              Beginning and the End.&rdquo;
              <span className="block mt-4 not-italic font-mono text-[12px] tracking-[0.2em] text-military">
                Revelation 22:13
              </span>
            </motion.blockquote>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          10% TITHE Strength with a purpose, giving back
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 bg-cream overflow-hidden">
        {/* Impact montage background */}
        <div className="absolute inset-0 -z-0">
          <Image
            src="/images/tithe/impact-montage.webp"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/90 to-cream/95" />
        </div>
        {/* Background cross watermarks */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-ink/[0.04] pointer-events-none">
          <CrossIcon className="w-[420px] h-[420px] md:w-[600px] md:h-[600px]" />
        </div>
        <motion.div
          className="absolute bottom-[8%] right-[6%] text-ink/[0.05] pointer-events-none"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThinCross className="w-12 h-16 md:w-16 md:h-20" />
        </motion.div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="font-mono text-[12px] tracking-[0.2em] uppercase text-military block mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              // STRENGTH WITH A PURPOSE
            </motion.span>

            <motion.h2
              className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05] text-ink"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              OUR 10%
              <br />
              TITHE
            </motion.h2>

            <motion.p
              className="mt-12 font-sans text-lg font-light text-ink/70 leading-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Alpha Omega Strength Team, we believe true strength isn&apos;t just
              built in the gym. It comes directly from God, the Beginning and the
              End. Our gear is a bold reminder of where your power truly originates.
              But we want this brand to do more than equip you for your workouts. We
              want it to equip others for life.
            </motion.p>

            <motion.p
              className="mt-6 font-sans text-lg font-light text-ink/80 leading-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Starting with our very first drop on Tuesday, June 2nd, 10% of every
              purchase goes directly to vetted, high-impact Christian charities.
            </motion.p>
          </div>

          {/* Impact sub-band */}
          <motion.div
            className="max-w-3xl mx-auto text-center mt-24 md:mt-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-military block mb-6">
              // HOW YOUR PURCHASE MAKES AN IMPACT
            </span>
            <p className="font-sans text-base md:text-lg font-light text-ink/70 leading-8">
              We selected four ECFA-accredited organizations so every dollar is
              stewarded faithfully and reaches the frontlines of human need. A
              portion of every purchase actively supports:
            </p>
          </motion.div>

          {/* Impact cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 md:mt-20">
            {charities.map((c, index) => (
              <motion.div
                key={c.name}
                className="flex flex-col bg-ink backdrop-blur-sm border border-white/10 p-8 hover:bg-ink-soft transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg p-4 h-20 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#E8DCC8] block mt-8 mb-3">
                  // {c.theme}
                </span>

                <h3 className="font-sans font-bold text-base uppercase tracking-[0.05em] text-white leading-tight">
                  {c.name}
                </h3>

                <p className="mt-4 font-sans text-sm font-light text-white/55 leading-relaxed">
                  {c.blurb}
                </p>

                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block self-start font-mono text-[11px] tracking-[0.15em] uppercase text-white/40 hover:text-white border-b border-transparent hover:border-white pb-1 transition-colors duration-300"
                >
                  VISIT →
                </a>
              </motion.div>
            ))}
          </div>

          {/* Scripture */}
          <motion.blockquote
            className="max-w-3xl mx-auto mt-24 md:mt-28 border-l-2 border-ink/20 pl-10 text-base md:text-lg text-ink/60 leading-8 text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            &ldquo;Each of you should give what you have decided in your heart to
            give, not reluctantly or under compulsion, for God loves a cheerful
            giver.&rdquo;
            <span className="block mt-4 not-italic font-mono text-[12px] tracking-[0.2em] text-military">
              2 Corinthians 9:7
            </span>
          </motion.blockquote>

          {/* Join the team closing */}
          <motion.div
            className="max-w-3xl mx-auto text-center mt-24 md:mt-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-military block mb-6">
              // JOIN THE TEAM
            </span>
            <p className="font-sans text-base md:text-lg font-light text-ink/70 leading-8 max-w-2xl mx-auto">
              We are called to be strong, courageous, and to be the hands and feet
              of Christ for those who are hurting. Grab your gear, wear your faith,
              and let&apos;s make a kingdom impact together.
            </p>

            <div className="mt-12">
              <Link
                href="/shop"
                className="inline-block bg-military text-cream font-sans text-sm font-bold uppercase tracking-[0.15em] px-14 py-5 hover:bg-military-deep transition-colors duration-300"
              >
                SHOP THE DROP →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          TRAIN WITH PURPOSE Bridge band
      ════════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-cream/15 bg-military-deep overflow-hidden">
        <motion.div
          className="absolute -right-10 top-1/2 -translate-y-1/2 text-cream/[0.06] pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <ThinCross className="w-[260px] h-[340px]" />
        </motion.div>

        <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 py-20 md:py-28 text-center">
          <motion.span
            className="font-mono text-[12px] tracking-[0.25em] uppercase text-cream/70 block mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            // THE STANDARD
          </motion.span>
          <motion.h2
            className="font-sans font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            TRAIN WITH
            <br />
            <span className="text-cream/75">PURPOSE.</span>
          </motion.h2>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          THE JOURNAL Editorial 3-card block, latest blog posts
          Auto-refreshes via ISR on the parent page (revalidate=60s).
      ════════════════════════════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section className="relative py-32 md:py-40 overflow-hidden">
          {/* Radial gradient background - matches the section it replaced */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_70%)]" />

          {/* Slow-rotating cross behind heading (kept for visual continuity) */}
          <motion.div
            className="absolute left-1/2 top-32 -translate-x-1/2 text-white/[0.03] pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          >
            <CrossIcon className="w-[320px] h-[320px] md:w-[460px] md:h-[460px]" />
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            {/* ── Heading area ───────────────────────────────── */}
            <div className="text-center mb-20 md:mb-24">
              <motion.span
                className="font-mono text-[13px] tracking-[0.3em] uppercase text-white/30 block mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                LATEST FROM THE JOURNAL
              </motion.span>

              <motion.span
                className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 block mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                NEW WRITING EVERY MORNING
              </motion.span>

              <motion.h2
                className="font-sans font-black text-5xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight leading-[0.95]"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                FROM
                <br />
                THE FLOOR
              </motion.h2>

              <motion.p
                className="mt-10 font-sans text-lg font-light text-white/50 leading-relaxed max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Notes on training, faith, and the long discipline.
              </motion.p>
            </div>

            {/* ── 3-card grid ────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
              {latestPosts.map((post, i) => {
                const primaryTag = post.tags?.[0];
                const formattedDate = JOURNAL_DATE_FORMATTER.format(
                  new Date(post.date),
                ).toUpperCase();

                return (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                    >
                      {/* Card index - small mono numeric in the top-left corner of the image */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950 mb-6">
                        {post.mainImage ? (
                          <Image
                            src={post.mainImage.src}
                            alt={post.mainImage.alt || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
                        )}

                        {/* Numeric index overlay */}
                        <div className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.25em] text-white/70 mix-blend-difference">
                          // 0{i + 1}
                        </div>

                        {/* Subtle dark wash on hover for legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {primaryTag && (
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
                          // {primaryTag.toUpperCase()}
                        </p>
                      )}

                      <h3 className="font-sans font-bold uppercase tracking-tight leading-[1.15] text-white text-xl md:text-[22px] group-hover:text-white/75 transition-colors duration-200">
                        {post.title}
                      </h3>

                      <time
                        dateTime={post.date}
                        className="block mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35"
                      >
                        {formattedDate}
                      </time>
                    </Link>
                  </motion.article>
                );
              })}
            </div>

            {/* ── Read-all CTA ───────────────────────────────── */}
            <motion.div
              className="text-center mt-20 md:mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.25em] uppercase text-white/70 hover:text-white border-b border-white/20 hover:border-white/60 pb-1 transition-all duration-300"
              >
                <span>READ EVERY POST</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════════════
          SCRIPTURE Full-screen moment of reflection
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
            Philippians 4:13
          </motion.p>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          BRAND MANIFESTO Dramatic reveal
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="font-mono text-[12px] tracking-[0.2em] text-white/40 uppercase block mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
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
                When you wear the mark, you carry the standard, and you carry it
                for Him.
              </motion.p>
            </div>

            <motion.blockquote
              className="border-l-2 border-white/15 pl-10 text-base text-white/40 leading-8 max-w-xl mb-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              &ldquo;Have I not commanded you? Be strong and courageous. Do not be
              afraid; do not be discouraged, for the Lord your God will be with you
              wherever you go.&rdquo;
              <span className="block mt-4 not-italic font-mono text-[12px] tracking-[0.2em] text-white/25">
                Joshua 1:9
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
          EMAIL SIGNUP Final CTA with cross backdrop
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
              // THE WEEKLY DISCIPLINE
            </span>

            <h2 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tight leading-[1.05] mb-6">
              SCRIPTURE.
              <br />
              TRAINING. DROPS.
            </h2>

            <p className="font-sans text-base font-light text-white/60 max-w-md mx-auto leading-relaxed mb-10">
              Discipline your mind. Strengthen your body. Lead with purpose. One
              short read every Sunday morning, plus first access to every new drop.
            </p>
          </motion.div>

          <motion.p
            className="font-sans text-base text-white/40 mb-14 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            &ldquo;For where two or three gather in my name, there am I with
            them.&rdquo;
            <span className="block mt-3 not-italic font-mono text-[11px] tracking-[0.2em] text-white/25">
              Matthew 18:20
            </span>
          </motion.p>

          <HomeEmailForm />
        </div>
      </section>
    </div>
  );
}
