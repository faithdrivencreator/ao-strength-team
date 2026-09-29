/**
 * Storefront data for the unified product template, the shop grid and the
 * homepage. One entry per live product, built from the existing per-collection
 * variant files so there is still a single source for colors, images and prices.
 *
 * Honesty rules (store redesign, 2026-09-29):
 * - Garment facts are shown only when they are confirmed. The live products'
 *   exact blank, fabric weight, print method and garment measurements are still
 *   being confirmed with the print partner, so `facts` says so instead of
 *   guessing. Do NOT write "heavyweight" or a GSM here until it is confirmed.
 * - Prices come from the collection files (the same numbers SLEEVE_PRICES
 *   charges). Compare-at prices stay in products.ts and are display only.
 */
import type { Fit, Sleeve } from "./products";
import * as warpaint from "./warpaint";
import * as unbreakable from "./unbreakable";
import * as cornerstone from "./cornerstone";
import * as croptop from "./croptop";

export interface StoreColorway {
  id: string;
  garmentColor: string;
  garmentHex: string;
  printColor: string;
  printHex: string;
  /** Flat mockup used in the cart and as the main flat image. */
  image: string;
  /** Separate front flat, when the collection has one. */
  front?: string;
}

export interface StoreSleeve {
  price: number;
  colorways: StoreColorway[];
}

export interface ModelShots {
  front: string;
  back?: string;
}

export interface StoreProduct {
  slug: string;
  /** Cart and checkout name, e.g. "AO Warpaint". Must match the old showcase. */
  cartName: string;
  /** Collections encode the sleeve in the cart slug ("ao-warpaint-short-sleeve"); the crop does not. */
  sleeveInCartSlug: boolean;
  /** Short display name, e.g. "Warpaint". */
  title: string;
  /** One line under the name. */
  tagline: string;
  /** Where the print sits, stated from the product images. */
  printPlacement: string;
  /** Which image leads: the design's main print. */
  leadSide: "back" | "front";
  scripture: string;
  scriptureRef: string;
  story: string;
  sizes: string[];
  sleeves: Partial<Record<Sleeve, StoreSleeve>>;
  /** Fit options the shopper can pick. A single entry hides the picker. */
  fits: Fit[];
  models: Partial<Record<Fit, ModelShots>>;
  /** Card and hero image on the shop grid. */
  cardImage: string;
  cardImageAlt: string;
  seoTitle: string;
  metaDescription: string;
  ogImage: string;
  badges: string[];
}

const withFront = (v: StoreColorway): StoreColorway => ({
  ...v,
  front: v.image.replace(/\.webp$/, "-front.webp"),
});

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "ao-warpaint",
    sleeveInCartSlug: true,
    cartName: warpaint.PRODUCT_NAME,
    title: "Warpaint",
    tagline: "Alpha and Omega in raw, hand-painted strokes.",
    printPlacement: "Small mark on the left chest, large brush print across the back.",
    leadSide: "back",
    scripture: "He trains my hands for war, my fingers for battle.",
    scriptureRef: "Psalm 144:1",
    story:
      "The Warpaint Collection. A hand-painted ALPHA, cross, OMEGA mark: small on the chest, big across the back. Short sleeve and long sleeve across the Warm Stone series.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sleeves: {
      short: { price: warpaint.PRODUCT_PRICE_SHORT, colorways: warpaint.shortSleeveVariants },
      long: { price: warpaint.PRODUCT_PRICE_LONG, colorways: warpaint.longSleeveVariants },
    },
    fits: ["mens", "womens"],
    models: {
      mens: { front: "/images/models/warpaint/man-front.webp", back: "/images/models/warpaint/man-back.webp" },
      womens: { front: "/images/models/warpaint/woman-front.webp", back: "/images/models/warpaint/woman-back.webp" },
    },
    cardImage: "/images/models/warpaint/man-back.webp",
    cardImageAlt: "Back of a black Warpaint tee with the brush ALPHA, cross, OMEGA print",
    seoTitle: "Warpaint Christian Gym Tee, Short and Long Sleeve",
    metaDescription:
      "Warpaint: a hand-painted ALPHA, cross, OMEGA back print. Psalm 144:1. Short sleeve $29.99, long sleeve $34.99. 10% of every order goes to the charity you choose.",
    ogImage: "/images/og/ao-warpaint.jpg",
    badges: ["Men's + women's fit", "Short + long sleeve"],
  },
  {
    slug: "ao-cornerstone",
    sleeveInCartSlug: true,
    cartName: cornerstone.PRODUCT_NAME,
    title: "Cornerstone",
    tagline: "Boxed Alpha and Omega, cross at the center.",
    printPlacement: "Small boxed emblem on the left chest, large boxed emblem across the back.",
    leadSide: "back",
    scripture: "The stone the builders rejected has become the cornerstone.",
    scriptureRef: "Psalm 118:22",
    story:
      "AO Cornerstone. A clean boxed ALPHA, cross, OMEGA emblem, built for the ones whose foundation does not move. Short sleeve and long sleeve across the Warm Stone series.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sleeves: {
      short: { price: cornerstone.PRODUCT_PRICE_SHORT, colorways: cornerstone.shortSleeveVariants.map(withFront) },
      long: { price: cornerstone.PRODUCT_PRICE_LONG, colorways: cornerstone.longSleeveVariants.map(withFront) },
    },
    fits: ["mens", "womens"],
    models: {
      mens: { front: "/images/models/cornerstone/man-front.webp", back: "/images/models/cornerstone/man-back.webp" },
      womens: { front: "/images/models/cornerstone/woman-front.webp", back: "/images/models/cornerstone/woman-back.webp" },
    },
    cardImage: "/images/models/cornerstone/man-back.webp",
    cardImageAlt: "Back of a black Cornerstone tee with the boxed ALPHA, cross, OMEGA emblem",
    seoTitle: "Cornerstone Christian Workout Tee, Short and Long Sleeve",
    metaDescription:
      "Cornerstone: the boxed ALPHA, cross, OMEGA emblem, Psalm 118:22. Short sleeve $29.99, long sleeve $34.99. 10% of every order goes to the charity you choose.",
    ogImage: "/images/og/ao-cornerstone.jpg",
    badges: ["Men's + women's fit", "Short + long sleeve"],
  },
  {
    slug: "ao-unbreakable",
    sleeveInCartSlug: true,
    cartName: unbreakable.PRODUCT_NAME,
    title: "Unbreakable",
    tagline: "Hard pressed, not crushed.",
    printPlacement: "ALPHA. OMEGA. UNBREAKABLE. across the chest, a small cross on the back.",
    leadSide: "front",
    scripture: "Hard pressed on every side, but not crushed.",
    scriptureRef: "2 Corinthians 4:8",
    story:
      "Unbreakable. For the ones who do not bend. ALPHA. OMEGA. UNBREAKABLE. across the chest. Short sleeve and long sleeve across the Warm Stone series.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    sleeves: {
      short: { price: unbreakable.PRODUCT_PRICE_SHORT, colorways: unbreakable.shortSleeveVariants },
      long: { price: unbreakable.PRODUCT_PRICE_LONG, colorways: unbreakable.longSleeveVariants },
    },
    fits: ["mens", "womens"],
    models: {
      mens: { front: "/images/models/unbreakable/man-front.webp", back: "/images/models/unbreakable/man-back.webp" },
      womens: { front: "/images/models/unbreakable/woman-front.webp", back: "/images/models/unbreakable/woman-back.webp" },
    },
    cardImage: "/images/models/unbreakable/woman-front.webp",
    cardImageAlt: "Front of a black Unbreakable tee reading ALPHA. OMEGA. UNBREAKABLE.",
    seoTitle: "Unbreakable Christian Gym Tee, Short and Long Sleeve",
    metaDescription:
      "Unbreakable: ALPHA. OMEGA. UNBREAKABLE. across the chest, 2 Corinthians 4:8. Short sleeve $29.99, long sleeve $34.99. 10% of every order goes to the charity you choose.",
    ogImage: "/images/og/ao-unbreakable.jpg",
    badges: ["Men's + women's fit", "Short + long sleeve"],
  },
  {
    slug: "ao-croptop",
    sleeveInCartSlug: false,
    cartName: croptop.PRODUCT_NAME,
    title: "Cornerstone Crop",
    tagline: "The Cornerstone emblem, cut for women.",
    printPlacement: "Boxed emblem on the front chest, a small cross at the back of the neck.",
    leadSide: "front",
    scripture: "The stone the builders rejected has become the cornerstone.",
    scriptureRef: "Psalm 118:22",
    story:
      "AO Cornerstone Crop. A flowy cropped tee with a modest crop, the boxed ALPHA, cross, OMEGA emblem on the front chest and a small cross at the nape. Cut for women in sizes S to 2XL.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    sleeves: {
      short: { price: croptop.PRODUCT_PRICE, colorways: croptop.variants.map(withFront) },
    },
    fits: ["womens"],
    models: {
      womens: { front: "/images/models/croptop/woman-front.webp" },
    },
    cardImage: "/images/models/croptop/woman-front.webp",
    cardImageAlt: "Woman training in the black Cornerstone Crop",
    seoTitle: "Cornerstone Crop, Women's Christian Workout Crop Tee",
    metaDescription:
      "The Cornerstone Crop: a women's cropped tee with the boxed ALPHA, cross, OMEGA emblem, Psalm 118:22. $25.99. 10% of every order goes to the charity you choose.",
    ogImage: "/images/og/ao-croptop.jpg",
    badges: ["Women's cut"],
  },
];

export function getStoreProduct(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}

/** Lowest current price across sleeves (display only). */
export function fromPrice(p: StoreProduct): number {
  return Math.min(...Object.values(p.sleeves).map((s) => s!.price));
}

/** Unique garment colors across all sleeves, in first-seen order. */
export function garmentSwatches(p: StoreProduct): { name: string; hex: string }[] {
  const seen = new Map<string, string>();
  for (const s of Object.values(p.sleeves)) {
    for (const c of s!.colorways) if (!seen.has(c.garmentColor)) seen.set(c.garmentColor, c.garmentHex);
  }
  return [...seen].map(([name, hex]) => ({ name, hex }));
}

/**
 * The cart line for a selection. Kept identical to what the old per-collection
 * showcases sent, because checkout, the webhook and the order email to the
 * print partner parse these fields (slug suffix, "<Garment> / <Print> Print").
 */
export function cartLine(
  p: StoreProduct,
  sleeve: Sleeve,
  colorway: StoreColorway,
  size: string,
  fit: Fit,
) {
  const suffix = p.sleeveInCartSlug;
  return {
    productSlug: suffix ? `${p.slug}-${sleeve}-sleeve` : p.slug,
    name: suffix ? `${p.cartName} ${sleeve === "long" ? "Long Sleeve" : "Short Sleeve"}` : p.cartName,
    price: p.sleeves[sleeve]!.price,
    color: `${colorway.garmentColor} / ${colorway.printColor} Print`,
    size,
    quantity: 1,
    image: colorway.image,
    fit,
  };
}

/**
 * What we can say about the garment today. Everything not confirmed is
 * labeled as such; the size guide is the store's existing body chest guide,
 * not garment measurements.
 */
export const GARMENT_FACTS = {
  fabric: "Being confirmed with our print partner. We will post the exact blank, fabric and weight here once confirmed, not a guess.",
  printMethod: "Being confirmed with our print partner.",
  fit: "Runs true to size. Most of the team wears their normal size. For a roomier fit, size up one.",
  bodyChest: [
    ["S", "38-40"],
    ["M", "41-43"],
    ["L", "44-46"],
    ["XL", "47-49"],
    ["2XL", "50-52"],
    ["3XL", "53-55"],
  ] as [string, string][],
  garmentMeasurements:
    "Garment measurements (body width, length, sleeve) are being measured on a real sample and will be added here.",
  care: [
    "Machine wash cold with like colors, inside out.",
    "Tumble dry low or hang dry to preserve fit and print.",
    "Do not bleach. Do not iron the print.",
  ],
  shipping: "$7.95 flat US shipping. Free on orders $75 and up.",
  returns: "Email returns@aostrengthteam.store to start a return or exchange. Refunds processed within 5 business days of receipt.",
  giving: "10% of every order goes to the charity you choose at checkout.",
};
