"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react";
import { useCart } from "@/contexts/CartContext";
import ProductInfoPanel from "@/components/ProductInfoPanel";
import { getProduct, getCompareAtPrice } from "@/data/products";
import type { Fit } from "@/data/products";
import PriceTag from "@/components/PriceTag";
import {
  longSleeveVariants,
  shortSleeveVariants,
  sharedIds,
  PRODUCT_SLUG,
  PRODUCT_NAME,
  PRODUCT_PRICE_LONG,
  PRODUCT_PRICE_SHORT,
  type WarpaintVariant,
  type SleeveLength,
} from "@/data/warpaint";

const PRODUCT_INFO = getProduct("ao-warpaint");

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Clamp + wrap helper for ghost stack offsets. */
function relIndex(active: number, target: number, len: number): number {
  // signed distance accounting for wrap
  let diff = target - active;
  if (diff > len / 2) diff -= len;
  if (diff < -len / 2) diff += len;
  return diff;
}

/* ------------------------------------------------------------------ */
/* Picker constants                                                   */
/* ------------------------------------------------------------------ */

// Order: gritty -> light. Drives chip ordering.
const GARMENT_ORDER: Array<{ name: string; hex: string }> = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "Asphalt", hex: "#515151" },
  { name: "Military Green", hex: "#4A5D3A" },
  { name: "Natural", hex: "#E8DCC8" },
  { name: "White", hex: "#f5f5f5" },
];

const EMBLEM_ORDER: Array<{ name: string; hex: string }> = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "Gray", hex: "#737373" },
  { name: "White", hex: "#f5f5f5" },
];

const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
type Size = (typeof SIZES)[number];

const RING_COLOR = "#E8DCC8";

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function WarpaintShowcase({ defaultFit }: { defaultFit?: Fit }) {
  const { addItem, openCart } = useCart();
  const prefersReducedMotion = useReducedMotion();

  const [sleeve, setSleeve] = useState<SleeveLength>("short");
  // Single source of truth: derive activeVariant + activeIndex from these.
  // Default the configurator to Black when a Black variant exists.
  const defaultVariant =
    longSleeveVariants.find((v) => v.garmentColor === "Black") ??
    longSleeveVariants[0];
  const [garmentColor, setGarmentColor] = useState<string>(
    defaultVariant.garmentColor,
  );
  const [printColor, setPrintColor] = useState<string>(
    defaultVariant.printColor,
  );
  const [size, setSize] = useState<Size | null>(null);

  // On-model hero controls
  const [heroGender, setHeroGender] = useState<"him" | "her">(
    defaultFit === "womens" ? "her" : "him",
  );
  const [heroSide, setHeroSide] = useState<"front" | "back">("front");

  const [isMobile, setIsMobile] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [isMorphing, setIsMorphing] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const variants = sleeve === "long" ? longSleeveVariants : shortSleeveVariants;

  // Derive active variant. If the (garment, print) combo doesn't exist in this
  // sleeve's catalog, fall back to first variant with that garment.
  const activeVariant = useMemo<WarpaintVariant>(() => {
    const exact = variants.find(
      (v) => v.garmentColor === garmentColor && v.printColor === printColor,
    );
    if (exact) return exact;
    const byGarment = variants.find((v) => v.garmentColor === garmentColor);
    if (byGarment) return byGarment;
    return variants[0];
  }, [variants, garmentColor, printColor]);

  const activeIndex = useMemo(
    () => variants.findIndex((v) => v.id === activeVariant.id),
    [variants, activeVariant.id],
  );

  // Self-heal: if the active variant's print color drifted from state
  // (because user picked a garment that doesn't support the current emblem),
  // sync state back. Same for garment.
  useEffect(() => {
    if (activeVariant.printColor !== printColor) {
      setPrintColor(activeVariant.printColor);
    }
    if (activeVariant.garmentColor !== garmentColor) {
      setGarmentColor(activeVariant.garmentColor);
    }
  }, [activeVariant, printColor, garmentColor]);

  const price = sleeve === "long" ? PRODUCT_PRICE_LONG : PRODUCT_PRICE_SHORT;

  /* ----- selection helpers ----- */
  const selectVariant = useCallback((v: WarpaintVariant) => {
    setGarmentColor(v.garmentColor);
    setPrintColor(v.printColor);
  }, []);

  const selectGarmentColor = useCallback(
    (color: string) => {
      const available = variants.filter((v) => v.garmentColor === color);
      if (available.length === 0) return;
      const match =
        available.find((v) => v.printColor === printColor) ?? available[0];
      selectVariant(match);
    },
    [variants, printColor, selectVariant],
  );

  const selectPrintColor = useCallback(
    (color: string) => {
      const match = variants.find(
        (v) => v.garmentColor === garmentColor && v.printColor === color,
      );
      if (!match) return; // disabled combo: no-op
      selectVariant(match);
    },
    [variants, garmentColor, selectVariant],
  );

  // Availability lookups
  const availableGarments = useMemo(() => {
    return new Set(variants.map((v) => v.garmentColor));
  }, [variants]);

  const availableEmblemsForGarment = useMemo(() => {
    return new Set(
      variants
        .filter((v) => v.garmentColor === garmentColor)
        .map((v) => v.printColor),
    );
  }, [variants, garmentColor]);

  /* ----- responsive detection ----- */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ----- keyboard nav (carousel) ----- */
  const advance = useCallback(
    (dir: 1 | -1) => {
      const next = (activeIndex + dir + variants.length) % variants.length;
      selectVariant(variants[next]);
    },
    [activeIndex, variants, selectVariant],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible) return;
      // Don't hijack arrow keys when focus is inside a radiogroup chip
      const target = e.target as HTMLElement | null;
      if (target?.closest('[role="radiogroup"]')) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advance(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        advance(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  /* ----- announce changes for screen readers ----- */
  useEffect(() => {
    setAnnounce(
      `Now viewing ${activeVariant.garmentColor} with ${activeVariant.printColor} print, ${sleeve === "long" ? "long" : "short"} sleeve`,
    );
  }, [activeVariant.garmentColor, activeVariant.printColor, sleeve]);

  /* ----- sleeve toggle with id-preserving jump ----- */
  function toggleSleeve(next: SleeveLength) {
    if (next === sleeve) return;
    const currentId = activeVariant.id;
    const nextList = next === "long" ? longSleeveVariants : shortSleeveVariants;
    let target = nextList.find((v) => v.id === currentId);
    if (!target) {
      target = nextList.find((v) => v.garmentColor === garmentColor);
    }
    if (!target) {
      target = nextList[0];
    }

    setIsMorphing(true);
    setSleeve(next);
    setGarmentColor(target.garmentColor);
    setPrintColor(target.printColor);
    window.setTimeout(() => setIsMorphing(false), 350);
  }

  /* ----- drag-to-advance ----- */
  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = 44;
    setHasSwiped(true);
    if (info.offset.x < -threshold || info.velocity.x < -250) {
      advance(1);
    } else if (info.offset.x > threshold || info.velocity.x > 250) {
      advance(-1);
    }
    dragX.set(0);
  }

  /* ----- background tint driven from active ----- */
  const bgTint = hexToRgba(activeVariant.garmentHex, 0.12);
  const bgTintEdge = hexToRgba(activeVariant.garmentHex, 0.0);

  /* ----- watermark parallax ----- */
  const watermarkX = useTransform(dragX, [-200, 0, 200], [-20, 0, 20]);
  const watermarkOffset = (activeIndex % 3) * 20 - 20;

  /* ----- card stack render ----- */
  const ghostRange = isMobile ? 1 : 2;

  const cardsToRender = useMemo(() => {
    const out: { v: WarpaintVariant; rel: number; idx: number }[] = [];
    for (let i = 0; i < variants.length; i++) {
      const rel = relIndex(activeIndex, i, variants.length);
      if (Math.abs(rel) <= ghostRange) {
        out.push({ v: variants[i], rel, idx: i });
      }
    }
    return out;
  }, [activeIndex, variants, ghostRange]);

  /* ----- CTA ----- */
  const canAdd = size !== null;
  function handleAddToBag() {
    if (!canAdd || size === null) return;
    addItem({
      productSlug: `${PRODUCT_SLUG}-${sleeve}-sleeve`,
      name: `${PRODUCT_NAME} ${sleeve === "long" ? "Long Sleeve" : "Short Sleeve"}`,
      price,
      color: `${activeVariant.garmentColor} / ${activeVariant.printColor} Print`,
      size,
      quantity: 1,
      image: activeVariant.image,
      fit: heroGender === "her" ? "womens" : "mens",
    });
    openCart();
  }

  /* ----------------------------------------------------------------- */
  /* Render                                                            */
  /* ----------------------------------------------------------------- */

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-black text-white"
      aria-label="AO Warpaint Collection showcase"
    >
      {/* Live region for accessibility */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </p>

      {/* Animated background tint vignette */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          background: `radial-gradient(ellipse at center, ${bgTint} 0%, ${bgTintEdge} 60%, #000 100%)`,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: [0.25, 1, 0.5, 1],
        }}
      />

      {/* Film grain overlay */}
      {!prefersReducedMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[5] opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "320px 320px",
            animation: "aoGrainDrift 8s steps(6) infinite",
          }}
        />
      )}

      <style>{`
        @keyframes aoGrainDrift {
          0% { transform: translate(0,0); }
          20% { transform: translate(-8px,4px); }
          40% { transform: translate(6px,-6px); }
          60% { transform: translate(-4px,8px); }
          80% { transform: translate(8px,2px); }
          100% { transform: translate(0,0); }
        }
        @keyframes aoUnderlineWipe {
          0% { transform: scaleX(0); transform-origin: left center; }
          100% { transform: scaleX(1); transform-origin: left center; }
        }
      `}</style>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 pt-16 pb-24 lg:gap-12 lg:pt-24 lg:pb-32">
        {/* Section label */}
        <div className="flex w-full items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
            // FAITH-GROUNDED PERFORMANCE TEE
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
            FROM ${PRODUCT_PRICE_SHORT.toFixed(2)}
          </p>
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55">
              Collection
            </p>
            <h1 className="text-center text-[44px] font-black uppercase leading-[0.95] tracking-[-0.02em] md:text-[72px] lg:text-[88px]">
              Warpaint
            </h1>
            <p className="mt-3 max-w-[34ch] text-center font-mono text-[12px] leading-relaxed tracking-[0.04em] text-white/70 md:text-[13px]">
              &ldquo;He trains my hands for war, my fingers for battle.&rdquo;
              <span className="mt-1 block text-[11px] tracking-[0.14em] text-white/45">
                Psalm 144:1 ✞
              </span>
            </p>
            <p className="mt-2 max-w-[40ch] text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              Alpha and Omega in raw, hand-painted strokes.
            </p>
          </div>
          <Image
            src="/brand/logo-horizontal-white.png"
            alt="Alpha cross Omega"
            width={3800}
            height={900}
            priority
            sizes="(max-width: 768px) 70vw, 460px"
            className="h-auto w-[70vw] max-w-[460px] opacity-40"
          />
        </div>

        {/* On-model hero - the lead of the page */}
        <div className="flex flex-col items-center gap-5">
          <div className="relative aspect-[4/5] w-[min(88vw,520px)] overflow-hidden rounded-xl bg-[#1c1814] ring-1 ring-white/5">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`${heroGender}-${heroSide}`}
                className="absolute inset-0"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              >
                <Image
                  src={`/images/models/warpaint/${heroGender === "him" ? "man" : "woman"}-${heroSide}.webp`}
                  alt={`Model wearing the AO Warpaint tee in black, ${heroSide} view`}
                  fill
                  sizes="(max-width: 768px) 88vw, 520px"
                  className="object-cover"
                  priority
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Vertical scroll rail - hugs the right edge of the model image */}
            <button
              type="button"
              aria-label="Scroll to choose your color"
              onClick={() =>
                document.getElementById("choose-your-color")?.scrollIntoView({
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                  block: "start",
                })
              }
              className="group absolute right-3 bottom-4 z-10 flex cursor-pointer flex-col items-center gap-3 rounded outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/90 transition-colors duration-200 [writing-mode:vertical-rl] group-hover:text-[#0a0a0a]">
                Scroll
              </span>
              <span aria-hidden className="relative block h-16 w-px bg-[#0a0a0a]/25">
                <motion.span
                  className="absolute left-1/2 top-0 block h-6 w-px -translate-x-1/2"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,10,10,0), #0a0a0a)",
                  }}
                  initial={false}
                  animate={
                    prefersReducedMotion
                      ? { y: 20, opacity: 1 }
                      : { y: [-8, 64], opacity: [0, 1, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
                  }
                />
              </span>
              <motion.span
                aria-hidden
                className="block opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: "#0a0a0a" }}
                animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </button>
          </div>

          {/* Hero toggles - styled to match the SS / LS pill */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="relative inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] p-1 backdrop-blur-sm">
              {(["him", "her"] as const).map((g) => {
                const isActive = heroGender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setHeroGender(g)}
                    className="relative z-10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200"
                    style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="warpaint-hero-gender"
                        className="absolute inset-0 -z-10 rounded-full ao-toggle-glow"
                        style={{ backgroundColor: "#5f7d33" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {g === "him" ? "Him" : "Her"}
                  </button>
                );
              })}
            </div>
            <div className="relative inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] p-1 backdrop-blur-sm">
              {(["front", "back"] as const).map((sd) => {
                const isActive = heroSide === sd;
                return (
                  <button
                    key={sd}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setHeroSide(sd)}
                    className="relative z-10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200"
                    style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="warpaint-hero-side"
                        className="absolute inset-0 -z-10 rounded-full ao-toggle-glow"
                        style={{ backgroundColor: "#5f7d33" }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {sd === "front" ? "Front" : "Back"}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            Shown in Black · Relaxed fit
          </p>
        </div>

        {/* Configurator eyebrow */}
        <p
          id="choose-your-color"
          className="scroll-mt-24 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55"
        >
          // CHOOSE YOUR COLOR
        </p>

        {/* Top pill toggle - SS / LS */}
        <div
          role="tablist"
          aria-label="Sleeve length"
          className="relative inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] p-1 backdrop-blur-sm"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") toggleSleeve("long");
            if (e.key === "ArrowLeft") toggleSleeve("short");
          }}
        >
          {(["short", "long"] as const).map((s) => {
            const isActive = sleeve === s;
            return (
              <button
                key={s}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => toggleSleeve(s)}
                className="relative z-10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 md:px-6 md:py-2.5 md:text-[12px]"
                style={{ color: isActive ? "#0a0a0a" : "rgba(255,255,255,0.7)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="warpaint-pill"
                    className="absolute inset-0 -z-10 rounded-full ao-toggle-glow"
                    style={{ backgroundColor: "#5f7d33" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {s === "short" ? "Short Sleeve" : "Long Sleeve"}
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div
          ref={stageRef}
          className="relative flex w-full items-center justify-center"
          style={{
            perspective: "1200px",
            minHeight: isMobile ? "380px" : "580px",
          }}
        >
          {/* Wordmark watermark layer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ x: watermarkX }}
          >
            <motion.span
              className="select-none whitespace-nowrap text-center font-black uppercase leading-none tracking-[-0.04em] text-white/[0.06]"
              style={{ fontSize: isMobile ? "180px" : "340px" }}
              animate={{ x: watermarkOffset }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
              Α Ω
            </motion.span>
          </motion.div>

          {/* Draggable card layer */}
          <motion.div
            className="relative h-full w-full touch-pan-y"
            style={{ transformStyle: "preserve-3d", x: dragX }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.32}
            onDragEnd={onDragEnd}
          >
            <div
              className="relative mx-auto h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {cardsToRender.map(({ v, rel, idx }) => {
                  const isActive = rel === 0;
                  const absRel = Math.abs(rel);
                  const side = rel === 0 ? 0 : rel > 0 ? 1 : -1;

                  const xOffset = side * (absRel === 1 ? 440 : 700);
                  const rotY = side * (absRel === 1 ? 28 : 42) * (isMobile ? 0.6 : 1);
                  const scale = absRel === 0 ? 1 : absRel === 1 ? 0.78 : 0.6;
                  const opacity =
                    absRel === 0 ? 1 : absRel === 1 ? 0.55 : 0.25;
                  const z = absRel === 0 ? 5 : absRel === 1 ? 3 : 1;

                  const xActual = isMobile ? xOffset * 0.55 : xOffset;
                  const scaleActual = isMobile
                    ? scale * (isMorphing && isActive ? 0.82 : 0.92)
                    : scale * (isMorphing && isActive ? 0.9 : 1);

                  return (
                    <motion.button
                      key={`${sleeve}-${v.id}`}
                      type="button"
                      onClick={() => !isActive && selectVariant(variants[idx])}
                      aria-roledescription="slide"
                      aria-label={`${v.garmentColor} garment with ${v.printColor} print`}
                      aria-current={isActive ? "true" : undefined}
                      className="absolute left-1/2 top-1/2 block aspect-square w-[min(86vw,560px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-[#1c1814] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] outline-none ring-1 ring-white/5 focus-visible:ring-2 focus-visible:ring-[#E8DCC8]"
                      style={{ zIndex: z }}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x: side >= 0 ? 600 : -600,
                              rotateY: rotY,
                              scale: scale * 0.9,
                            }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity }
                          : {
                              opacity,
                              x: xActual,
                              rotateY: rotY,
                              scale: scaleActual,
                            }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x: side < 0 ? -700 : 700,
                              rotateY: isMobile ? -55 : -78,
                              scale: 0.6,
                              transition: {
                                duration: 0.42,
                                ease: [0.76, 0, 0.24, 1],
                              },
                            }
                      }
                      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Image
                        src={v.image}
                        alt={`${PRODUCT_NAME} ${sleeve === "long" ? "long sleeve" : "short sleeve"} - ${v.garmentColor} with ${v.printColor} print`}
                        fill
                        sizes="(max-width: 768px) 90vw, 600px"
                        priority={isActive}
                        className="object-cover"
                        draggable={false}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-xl"
                        style={{
                          boxShadow:
                            "inset 0 0 60px 0 rgba(0,0,0,0.35), inset 0 1px 0 0 rgba(255,255,255,0.06)",
                        }}
                      />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Swipe indicator: pagination dots + first-time mobile hint */}
        <div className="-mt-2 flex flex-col items-center gap-3">
          <div
            className="flex max-w-full flex-wrap items-center justify-center gap-1.5"
            role="group"
            aria-label="Color options"
          >
            {variants.map((v, i) => {
              const on = i === activeIndex;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => selectVariant(variants[i])}
                  aria-label={`View color ${i + 1} of ${variants.length}`}
                  aria-current={on ? "true" : undefined}
                  className="p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-[#E8DCC8] rounded-full"
                >
                  <span
                    aria-hidden
                    className="block h-[6px] rounded-full transition-all duration-300"
                    style={{
                      width: on ? 22 : 6,
                      backgroundColor: on ? "#E8DCC8" : "rgba(255,255,255,0.25)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {!hasSwiped && (
              <motion.div
                aria-hidden
                className="flex items-center gap-2 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  style={{ color: "#E8DCC8" }}
                  animate={prefersReducedMotion ? undefined : { x: [-2, 1, -2] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Swipe for colors
                </span>
                <motion.span
                  style={{ color: "#E8DCC8" }}
                  animate={prefersReducedMotion ? undefined : { x: [2, -1, 2] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Caption block (scripture line) */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative inline-block">
            <p className="font-sans text-[16px] font-black uppercase tracking-[0.04em] text-white md:text-[20px]">
              {activeVariant.garmentColor}
              <span className="mx-3 text-white/30">/</span>
              {activeVariant.printColor} Print
            </p>
            <span
              key={`${sleeve}-${activeVariant.id}-underline`}
              className="absolute -bottom-1.5 left-0 right-0 mx-auto block h-[2px] w-full"
              style={{
                backgroundColor: "#E8DCC8",
                animation: prefersReducedMotion
                  ? undefined
                  : "aoUnderlineWipe 220ms cubic-bezier(0.76,0,0.24,1) forwards",
                transformOrigin: "left center",
                transform: prefersReducedMotion ? "scaleX(1)" : "scaleX(0)",
              }}
            />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 md:text-[11px]">
            Warpaint Collection · Warm Stone Series
          </p>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Picker UI                                                  */}
        {/* ---------------------------------------------------------- */}
        <div className="flex w-full max-w-xl mx-auto flex-col gap-6">
          {/* A. Garment color */}
          <PickerGroup
            label="Garment Color"
            currentName={activeVariant.garmentColor}
            ariaLabel="Garment color"
          >
            {GARMENT_ORDER.map((g) => {
              const isSelected = g.name === activeVariant.garmentColor;
              const isAvailable = availableGarments.has(g.name);
              const isWhite = g.hex.toLowerCase() === "#f5f5f5";
              return (
                <ChipButton
                  key={g.name}
                  selected={isSelected}
                  disabled={!isAvailable}
                  onSelect={() => selectGarmentColor(g.name)}
                  ariaLabel={`${g.name}${!isAvailable ? " (unavailable in this sleeve)" : ""}`}
                  size={{ w: 44, h: 44 }}
                >
                  <span
                    className="absolute inset-0 rounded-md"
                    style={{
                      backgroundColor: g.hex,
                      border: isWhite ? "1px solid rgba(255,255,255,0.2)" : undefined,
                      boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.4)",
                    }}
                  />
                </ChipButton>
              );
            })}
          </PickerGroup>

          {/* B. Emblem color */}
          <PickerGroup
            label="Emblem Color"
            currentName={activeVariant.printColor}
            ariaLabel="Emblem color"
          >
            {EMBLEM_ORDER.map((p) => {
              const isSelected = p.name === activeVariant.printColor;
              const isAvailable = availableEmblemsForGarment.has(p.name);
              const isWhite = p.hex.toLowerCase() === "#f5f5f5";
              return (
                <ChipButton
                  key={p.name}
                  selected={isSelected}
                  disabled={!isAvailable}
                  onSelect={() => selectPrintColor(p.name)}
                  ariaLabel={`${p.name}${!isAvailable ? " (not available for selected garment)" : ""}`}
                  size={{ w: 44, h: 44 }}
                  strikeWhenDisabled
                  label={p.name}
                >
                  <span
                    className="absolute inset-0 rounded-md"
                    style={{
                      backgroundColor: p.hex,
                      border: isWhite ? "1px solid rgba(255,255,255,0.2)" : undefined,
                      boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.4)",
                    }}
                  />
                </ChipButton>
              );
            })}
          </PickerGroup>

          {/* C. Size */}
          <PickerGroup
            label="Size"
            currentName={size ?? "-"}
            ariaLabel="Size"
          >
            {SIZES.map((s) => {
              const isSelected = s === size;
              return (
                <ChipButton
                  key={s}
                  selected={isSelected}
                  disabled={false}
                  onSelect={() => setSize(s)}
                  ariaLabel={`Size ${s}`}
                  size={{ w: 48, h: 44 }}
                  variant="size"
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center rounded-md text-[12px] font-bold tracking-[0.05em]"
                    style={{
                      border: isSelected
                        ? "1px solid #ffffff"
                        : "1px solid rgba(255,255,255,0.25)",
                      backgroundColor: isSelected
                        ? "#ffffff"
                        : "rgba(255,255,255,0.03)",
                      color: isSelected ? "#000000" : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {s}
                  </span>
                </ChipButton>
              );
            })}
          </PickerGroup>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 pt-2">
          {/* Price */}
          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              // {sleeve === "long" ? "Long Sleeve" : "Short Sleeve"}
            </p>
            <p
              className="font-sans text-[32px] font-black leading-none tracking-[-0.01em] md:text-[40px]"
              style={{ color: "#E8DCC8" }}
            >
              <PriceTag
                variant="pdp"
                price={price}
                compareAt={getCompareAtPrice(PRODUCT_SLUG, sleeve)}
              />
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToBag}
            disabled={!canAdd}
            className={`group inline-flex items-center gap-3 px-8 py-4 text-[12px] font-black uppercase tracking-[0.22em] transition-transform duration-150 ${
              canAdd
                ? "hover:-translate-y-[1px] active:translate-y-0"
                : "opacity-60 cursor-not-allowed"
            }`}
            style={{ backgroundColor: "#E8DCC8", color: "#0a0a0a" }}
          >
            <span className="font-mono text-[11px]" style={{ color: "rgba(10,10,10,0.5)" }}>[</span>
            <span style={{ color: "#0a0a0a" }}>
              {canAdd
                ? `Add ${activeVariant.garmentColor.toUpperCase()} / ${activeVariant.printColor.toUpperCase()} / ${size} to Bag`
                : "Select a Size"}
            </span>
            <span className="font-mono text-[11px]" style={{ color: "rgba(10,10,10,0.5)" }}>]</span>
          </button>
        </div>

        {/* Purchase-decision content: story, scripture, trust, info */}
        {PRODUCT_INFO && (
          <ProductInfoPanel
            scripture={PRODUCT_INFO.scripture}
            scriptureRef={PRODUCT_INFO.scriptureRef}
            description={PRODUCT_INFO.description}
          />
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PickerGroup + ChipButton                                            */
/* ------------------------------------------------------------------ */

function PickerGroup({
  label,
  currentName,
  ariaLabel,
  children,
}: {
  label: string;
  currentName: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
          {label}
        </span>
        <span className="font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-white/90">
          {currentName}
        </span>
      </div>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="flex flex-wrap items-center gap-3"
        onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          const group = e.currentTarget;
          const chips = Array.from(
            group.querySelectorAll<HTMLButtonElement>(
              'button[role="radio"]:not([aria-disabled="true"])',
            ),
          );
          const active = document.activeElement as HTMLElement | null;
          const currentIdx = chips.findIndex((c) => c === active);
          if (currentIdx === -1) return;
          e.preventDefault();
          const next =
            e.key === "ArrowRight"
              ? (currentIdx + 1) % chips.length
              : (currentIdx - 1 + chips.length) % chips.length;
          chips[next].focus();
          chips[next].click();
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ChipButton({
  selected,
  disabled,
  onSelect,
  ariaLabel,
  children,
  size,
  strikeWhenDisabled = false,
  variant = "swatch",
  label,
}: {
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  size: { w: number; h: number };
  strikeWhenDisabled?: boolean;
  variant?: "swatch" | "size";
  label?: string;
}) {
  const swatchShadow =
    selected && !disabled
      ? `inset 0 0 0 2px rgba(0,0,0,0.4), 0 0 0 2px #0a0a0a, 0 0 0 4px ${RING_COLOR}`
      : `inset 0 0 0 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.18)`;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      tabIndex={selected ? 0 : -1}
      onClick={() => !disabled && onSelect()}
      className={`group inline-flex flex-col items-center gap-1.5 rounded-md outline-none ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <span
        className={`relative block rounded-md transition-transform duration-150 ${
          disabled ? "" : "group-hover:scale-[1.06]"
        }`}
        style={{
          width: size.w,
          height: size.h,
          boxShadow: swatchShadow,
          opacity: disabled ? (strikeWhenDisabled ? 0.5 : 0.3) : 1,
          filter: disabled && strikeWhenDisabled ? "grayscale(1)" : undefined,
          outline:
            disabled && strikeWhenDisabled
              ? "1px dashed rgba(255,255,255,0.5)"
              : undefined,
          outlineOffset: disabled && strikeWhenDisabled ? 3 : undefined,
        }}
      >
        {children}
        {disabled && strikeWhenDisabled && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 44 44"
            preserveAspectRatio="none"
          >
            <line
              x1="4"
              y1="4"
              x2="40"
              y2="40"
              stroke={RING_COLOR}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      {label && (
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.08em] ${
            disabled
              ? "text-white/30 line-through"
              : selected
                ? "text-white"
                : "text-white/45"
          }`}
        >
          {label}
        </span>
      )}
      {/* Suppress unused-variant warnings */}
      <span hidden aria-hidden>{variant}</span>
    </button>
  );
}

// Keep sharedIds reachable for future variants (avoid dead-code warnings in editors)
export const __sharedIds = sharedIds;
