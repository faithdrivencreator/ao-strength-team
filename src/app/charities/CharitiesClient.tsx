"use client";

import { motion } from "motion/react";

const charities = [
  { name: "Compassion International", theme: "CHILD DEVELOPMENT", blurb: "Releasing children from extreme poverty and providing education in Jesus' name.", logo: "/images/charities/compassion.svg", url: "https://www.compassion.com" },
  { name: "Samaritan's Purse", theme: "DISASTER RELIEF", blurb: "Deploying emergency aid, food, and mobile field hospitals to crisis zones around the world.", logo: "/images/charities/samaritans-purse.svg", url: "https://www.samaritanspurse.org" },
  { name: "Mercy Ships", theme: "MEDICAL CARE", blurb: "Bringing life-saving surgeries and care to developing nations aboard the world's largest civilian hospital ships.", logo: "/images/charities/mercy-ships.png", url: "https://www.mercyships.org" },
  { name: "World Vision", theme: "CLEAN WATER & COMMUNITY", blurb: "Helping vulnerable families break the cycle of poverty with clean water and sustainable support.", logo: "/images/charities/world-vision.svg", url: "https://www.worldvision.org" },
];

export default function CharitiesClient() {
  return (
    <div className="flex flex-col overflow-x-hidden bg-black">
      {/* ── HERO / INTRO ── */}
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black" />

        <div className="relative max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20 py-24 md:py-32 w-full text-center">
          <motion.span
            className="font-mono text-[12px] tracking-[0.25em] uppercase text-white/40 block mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            // STRENGTH WITH A PURPOSE
          </motion.span>

          <motion.h1
            className="font-sans font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            OUR 10%
            <br />
            <span className="text-white/50">TITHE</span>
          </motion.h1>

          <motion.p
            className="mt-10 font-sans text-lg md:text-xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ten percent of every order goes directly to vetted, high-impact
            Christian charities. You choose which one at checkout, so your gear
            does more than equip your training. It equips others for life.
          </motion.p>

          <motion.p
            className="mt-6 font-sans text-base md:text-lg font-light text-white/50 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            All four organizations are ECFA-accredited, so every dollar is
            stewarded faithfully and reaches the frontlines of human need.
          </motion.p>
        </div>
      </section>

      {/* ── FOUR LARGE CHARITY CARDS ── */}
      <section className="relative py-24 md:py-32 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {charities.map((c, index) => (
              <motion.div
                key={c.name}
                className="flex flex-col bg-ink backdrop-blur-sm border border-white/10 p-10 hover:bg-ink-soft transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg p-4 h-28 flex items-center justify-center">
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

                <h2 className="font-sans font-bold text-xl uppercase tracking-[0.05em] text-white leading-tight">
                  {c.name}
                </h2>

                <p className="mt-4 font-sans text-base font-light text-white/55 leading-relaxed">
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
        </div>
      </section>

      {/* ── CLOSING SCRIPTURE ── */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/40 to-black" />
        <div className="relative max-w-3xl mx-auto px-8 md:px-16">
          <motion.blockquote
            className="border-l-2 border-white/20 pl-10 text-base md:text-lg text-white/60 leading-8 text-left"
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
        </div>
      </section>
    </div>
  );
}
