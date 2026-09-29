"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import PriceTag from "@/components/PriceTag";
import { getCompareAtPrice, type Fit, type Sleeve } from "@/data/products";
import {
  GARMENT_FACTS,
  STORE_PRODUCTS,
  cartLine,
  fromPrice,
  getStoreProduct,
  type StoreColorway,
} from "@/data/storefront";
import { trackAddToCart, trackViewItem } from "@/lib/gtag";

/* One product page for every live product. Gallery first, the buy box on the
   first phone screen, a sticky add-to-bag bar once the main button scrolls
   away, then the story, the verse and the garment facts we can stand behind. */

const SLEEVE_LABEL: Record<Sleeve, string> = { short: "Short Sleeve", long: "Long Sleeve" };
const FIT_LABEL: Record<Fit, string> = { mens: "Men's", womens: "Women's" };

interface Slide {
  src: string;
  alt: string;
  contain?: boolean;
}

const noopSubscribe = () => () => {};

function uniqueColors(list: StoreColorway[], key: "garment" | "print") {
  const seen = new Map<string, string>();
  for (const c of list) {
    const name = key === "garment" ? c.garmentColor : c.printColor;
    const hex = key === "garment" ? c.garmentHex : c.printHex;
    if (!seen.has(name)) seen.set(name, hex);
  }
  return [...seen].map(([name, hex]) => ({ name, hex }));
}

export default function ProductTemplate({ slug }: { slug: string }) {
  const product = getStoreProduct(slug)!;
  const { addItem, openCart } = useCart();

  const sleeveOptions = Object.keys(product.sleeves) as Sleeve[];
  const [sleeve, setSleeve] = useState<Sleeve>(sleeveOptions[0]);
  // ?fit=womens from the Women's page presets the fit. Read on the client so
  // the page itself stays static; the shopper's own choice wins after that.
  const urlFit = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("fit"),
    () => null,
  );
  const [chosenFit, setFit] = useState<Fit | null>(null);
  const fit: Fit =
    chosenFit ?? (product.fits.find((f) => f === urlFit) as Fit | undefined) ?? product.fits[0];
  const colorways = product.sleeves[sleeve]!.colorways;
  const defaultColorway =
    colorways.find((c) => c.garmentColor === "Black" && c.printColor === "White") ??
    colorways.find((c) => c.garmentColor === "Black") ??
    colorways[0];
  const [garment, setGarment] = useState(defaultColorway.garmentColor);
  const [print, setPrint] = useState(defaultColorway.printColor);
  const [size, setSize] = useState<string | null>(null);
  const [needSize, setNeedSize] = useState(false);
  const [slide, setSlide] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  const galleryRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLButtonElement>(null);
  const sizeRef = useRef<HTMLFieldSetElement>(null);


  const colorway =
    colorways.find((c) => c.garmentColor === garment && c.printColor === print) ??
    colorways.find((c) => c.garmentColor === garment) ??
    colorways[0];

  const price = product.sleeves[sleeve]!.price;
  const compareAt = getCompareAtPrice(product.slug, sleeve);
  const garments = uniqueColors(colorways, "garment");
  const printsForGarment = uniqueColors(
    colorways.filter((c) => c.garmentColor === colorway.garmentColor),
    "print",
  );

  const slides: Slide[] = (() => {
    const out: Slide[] = [];
    const model = product.models[fit] ?? Object.values(product.models)[0]!;
    const who = fit === "womens" ? "woman" : "man";
    const backShot = model.back
      ? { src: model.back, alt: `Back of the ${product.title} tee on a ${who}: ${product.printPlacement}` }
      : null;
    const frontShot = { src: model.front, alt: `Front of the ${product.title} tee on a ${who}` };
    if (product.leadSide === "back" && backShot) out.push(backShot, frontShot);
    else out.push(frontShot, ...(backShot ? [backShot] : []));
    const label = `${colorway.garmentColor} ${product.title} ${SLEEVE_LABEL[sleeve].toLowerCase()}, ${colorway.printColor.toLowerCase()} print`;
    out.push({ src: colorway.image, alt: `${label}, flat lay`, contain: true });
    if (colorway.front) out.push({ src: colorway.front, alt: `${label}, front flat lay`, contain: true });
    for (const other of product.fits.filter((f) => f !== fit)) {
      const m = product.models[other];
      if (m) out.push({ src: m.front, alt: `Front of the ${product.title} tee on a ${other === "womens" ? "woman" : "man"}` });
    }
    return out;
  })();

  useEffect(() => {
    trackViewItem({ slug: product.slug, name: product.cartName, price: fromPrice(product), category: "tees" });
  }, [product]);

  // Sticky bar: show once the main add-to-bag button has scrolled above the viewport.
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function scrollToSlide(i: number) {
    const g = galleryRef.current;
    if (!g) return;
    g.scrollTo({ left: i * g.clientWidth, behavior: "smooth" });
  }

  function onGalleryScroll() {
    const g = galleryRef.current;
    if (!g) return;
    setSlide(Math.round(g.scrollLeft / g.clientWidth));
  }

  function selectSleeve(next: Sleeve) {
    setSleeve(next);
    const list = product.sleeves[next]!.colorways;
    const match =
      list.find((c) => c.garmentColor === garment && c.printColor === print) ??
      list.find((c) => c.garmentColor === garment) ??
      list[0];
    setGarment(match.garmentColor);
    setPrint(match.printColor);
  }

  function selectGarment(name: string) {
    const match =
      colorways.find((c) => c.garmentColor === name && c.printColor === print) ??
      colorways.find((c) => c.garmentColor === name)!;
    setGarment(match.garmentColor);
    setPrint(match.printColor);
    const flatIndex = slides.findIndex((s) => s.contain);
    if (flatIndex > -1) scrollToSlide(flatIndex);
  }

  function addToBag() {
    if (!size) {
      setNeedSize(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const line = cartLine(product, sleeve, colorway, size, fit);
    addItem(line);
    trackAddToCart(line);
    openCart();
  }

  const others = STORE_PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <div className="bg-ink text-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="hidden md:block mx-auto max-w-[1280px] px-10 pt-8">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
          <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-white" aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-[1280px] md:px-10 md:pt-6 grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        {/* Gallery */}
        <div className="md:sticky md:top-[108px] md:self-start">
          <div className="relative">
            <div
              ref={galleryRef}
              onScroll={onGalleryScroll}
              className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
              aria-label={`${product.title} photos`}
              aria-roledescription="carousel"
            >
              {slides.map((s, i) => (
                <div
                  key={s.src + i}
                  className={`relative aspect-square md:aspect-[4/5] w-full shrink-0 snap-center ${s.contain ? "bg-[#ECE7DE]" : "bg-[#C9C3B8]"}`}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    className={s.contain ? "object-contain" : "object-cover object-top"}
                  />
                </div>
              ))}
            </div>
            <p className="absolute left-3 bottom-3 bg-ink/85 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white">
              {slide + 1} / {slides.length}
              <span className="md:hidden"> · swipe</span>
            </p>
          </div>
          {/* Thumbnails */}
          <div className="mt-2 hidden md:flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Choose a photo">
            {slides.map((s, i) => (
              <button
                key={s.src + "t" + i}
                type="button"
                role="tab"
                aria-selected={slide === i}
                aria-label={`Photo ${i + 1}`}
                onClick={() => scrollToSlide(i)}
                className={`relative h-16 w-13 shrink-0 overflow-hidden ${s.contain ? "bg-[#ECE7DE]" : "bg-[#C9C3B8]"} ring-offset-2 ring-offset-ink ${slide === i ? "ring-2 ring-cream" : "ring-1 ring-white/20"}`}
              >
                <Image src={s.src} alt="" fill sizes="52px" className={s.contain ? "object-contain" : "object-cover object-top"} />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div className="px-5 md:px-0 pt-4 md:pt-2 pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
            {product.fits.length > 1 ? "Men's and women's fit" : "Women's cut"} · Warm Stone Series
          </p>
          <h1 className="mt-2 font-sans font-black uppercase tracking-tight leading-[0.95] text-4xl md:text-5xl lg:text-6xl">
            {product.title}
          </h1>
          <p className="mt-2 text-[15px] leading-snug text-white/80">{product.tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <PriceTag variant="pdp" price={price} compareAt={compareAt} />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/75">{SLEEVE_LABEL[sleeve]}</span>
          </div>

          {/* Sleeve */}
          {sleeveOptions.length > 1 && (
            <fieldset className="mt-6">
              <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 mb-2">Sleeve</legend>
              <div className="grid grid-cols-2 gap-2">
                {sleeveOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={sleeve === s}
                    onClick={() => selectSleeve(s)}
                    className={`min-h-12 px-3 font-sans text-[13px] font-bold uppercase tracking-[0.08em] border transition-colors ${sleeve === s ? "bg-white text-black border-white" : "border-white/35 text-white hover:border-white"}`}
                  >
                    {s === "long" ? "Long" : "Short"} · ${product.sleeves[s]!.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Fit */}
          {product.fits.length > 1 && (
            <fieldset className="mt-5">
              <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 mb-2">Fit</legend>
              <div className="grid grid-cols-2 gap-2">
                {product.fits.map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={fit === f}
                    onClick={() => setFit(f)}
                    className={`min-h-12 px-3 font-sans text-[13px] font-bold uppercase tracking-[0.08em] border transition-colors ${fit === f ? "bg-white text-black border-white" : "border-white/35 text-white hover:border-white"}`}
                  >
                    {FIT_LABEL[f]}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Garment color */}
          <fieldset className="mt-5">
            <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 mb-2">
              Color: <span className="text-white">{colorway.garmentColor}</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {garments.map((g) => (
                <button
                  key={g.name}
                  type="button"
                  aria-pressed={colorway.garmentColor === g.name}
                  aria-label={g.name}
                  title={g.name}
                  onClick={() => selectGarment(g.name)}
                  className={`h-11 w-11 rounded-full ring-offset-2 ring-offset-ink ${colorway.garmentColor === g.name ? "ring-2 ring-cream" : "ring-1 ring-white/30"}`}
                  style={{ backgroundColor: g.hex }}
                />
              ))}
            </div>
          </fieldset>

          {/* Print color */}
          {printsForGarment.length > 1 && (
            <fieldset className="mt-5">
              <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 mb-2">
                Print: <span className="text-white">{colorway.printColor}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {printsForGarment.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    aria-pressed={colorway.printColor === p.name}
                    onClick={() => setPrint(p.name)}
                    className={`min-h-11 px-4 inline-flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-[0.08em] border ${colorway.printColor === p.name ? "border-white text-white" : "border-white/35 text-white/85 hover:border-white"}`}
                  >
                    <span className="h-3 w-3 rounded-full ring-1 ring-white/40" style={{ backgroundColor: p.hex }} aria-hidden="true" />
                    {p.name}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Size */}
          <fieldset className="mt-5" ref={sizeRef}>
            <div className="mb-2 flex items-center justify-between">
              <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                Size{size ? <>: <span className="text-white">{size}</span></> : null}
              </legend>
              <a href="#size-guide" className="font-mono text-[11px] uppercase tracking-[0.14em] text-white underline underline-offset-4">
                Size guide
              </a>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => {
                    setSize(s);
                    setNeedSize(false);
                  }}
                  className={`min-h-12 font-sans text-[14px] font-bold border transition-colors ${size === s ? "bg-white text-black border-white" : "border-white/35 text-white hover:border-white"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-white/80">{GARMENT_FACTS.fit}</p>
            {needSize && (
              <p role="alert" className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-cream">
                Select a size to add this to your bag.
              </p>
            )}
          </fieldset>

          <button
            ref={buyRef}
            type="button"
            onClick={addToBag}
            className="mt-6 w-full min-h-14 bg-white text-black font-sans font-black text-[14px] uppercase tracking-[0.14em] hover:bg-cream transition-colors"
          >
            {size ? `Add to bag · $${price.toFixed(2)}` : "Select a size"}
          </button>

          <ul className="mt-5 space-y-2 border-t border-white/15 pt-5 text-[13px] leading-snug text-white/85">
            <li>{GARMENT_FACTS.shipping}</li>
            <li>{GARMENT_FACTS.giving}</li>
            <li>Secure checkout through Stripe. Apple Pay accepted.</li>
          </ul>

          <blockquote className="mt-8 border-l-2 border-cream pl-4">
            <p className="text-[17px] leading-relaxed text-white">&ldquo;{product.scripture}&rdquo;</p>
            <cite className="mt-2 block font-mono text-[11px] not-italic uppercase tracking-[0.16em] text-white/75">
              {product.scriptureRef}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-[1280px] px-5 md:px-10 py-12 md:py-20 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-sans font-black uppercase tracking-tight text-2xl md:text-3xl">The story</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/85">{product.story}</p>
          <dl className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {[
              ["Print placement", product.printPlacement],
              ["Fit", GARMENT_FACTS.fit],
              ["Fabric and weight", GARMENT_FACTS.fabric],
              ["Print method", GARMENT_FACTS.printMethod],
              ["Care", GARMENT_FACTS.care.join(" ")],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/75 pt-0.5">{k}</dt>
                <dd className="text-[14px] leading-relaxed text-white/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="size-guide" className="scroll-mt-32">
          <h2 className="font-sans font-black uppercase tracking-tight text-2xl md:text-3xl">Size guide</h2>
          <p className="mt-4 text-[14px] leading-relaxed text-white/85">
            Body chest measurement in inches. Measure around the fullest part of your chest and pick the size that
            contains it.
          </p>
          <table className="mt-5 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/25">
                <th scope="col" className="py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 font-normal">Size</th>
                <th scope="col" className="py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 font-normal">Body chest (in)</th>
              </tr>
            </thead>
            <tbody>
              {GARMENT_FACTS.bodyChest
                .filter(([s]) => product.sizes.includes(s))
                .map(([s, chest]) => (
                  <tr key={s} className="border-b border-white/10">
                    <td className="py-3 text-[15px] font-bold">{s}</td>
                    <td className="py-3 text-[15px] text-white/90">{chest}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="mt-4 text-[13px] leading-relaxed text-white/80">{GARMENT_FACTS.garmentMeasurements}</p>

          <h3 className="mt-10 font-mono text-[12px] uppercase tracking-[0.14em] text-white">Shipping and returns</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-white/85">{GARMENT_FACTS.shipping}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/85">{GARMENT_FACTS.returns}</p>
        </div>
      </section>

      {/* More from the drop */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-12 md:py-16">
          <h2 className="font-sans font-black uppercase tracking-tight text-2xl md:text-3xl">More from Drop 01</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {others.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#C9C3B8]">
                  <Image src={p.cardImage} alt={p.cardImageAlt} fill sizes="(max-width: 768px) 50vw, 30vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-3 font-sans font-black uppercase tracking-tight text-lg leading-none">{p.title}</p>
                <p className="mt-1 font-mono text-[12px] text-white/85">From ${fromPrice(p).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky add-to-bag bar (phones) */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-[70] border-t border-white/15 bg-ink/95 backdrop-blur px-4 py-3 transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!showSticky}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-sans font-black uppercase text-[14px] leading-tight">{product.title}</p>
            <p className="truncate font-mono text-[11px] text-white/80">
              {colorway.garmentColor} · {SLEEVE_LABEL[sleeve]} · {size ?? "No size yet"}
            </p>
          </div>
          <button
            type="button"
            tabIndex={showSticky ? 0 : -1}
            onClick={addToBag}
            className="min-h-12 shrink-0 bg-white px-5 text-black font-sans font-black text-[13px] uppercase tracking-[0.1em]"
          >
            {size ? `Add · $${price.toFixed(2)}` : "Select size"}
          </button>
        </div>
      </div>
    </div>
  );
}
