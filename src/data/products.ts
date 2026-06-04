export interface ProductVariant {
  color: string;
  colorHex: string;
  sizes: string[];
  inStock: boolean;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  /**
   * Original retail price, shown as strikethrough when present.
   * Use ONLY for honest, time-limited promotions tied to a real drop.
   * never as a permanent MSRP anchor.
   */
  compareAtPrice?: number;
  description: string;
  scripture: string;
  scriptureRef: string;
  images: string[];
  variants: ProductVariant[];
  category: string;
  tags: string[];
  status: 'in-stock' | 'sold-out' | 'coming-soon';
}

const products: Product[] = [
  {
    slug: 'ao-warpaint',
    name: 'AO Warpaint Collection',
    price: 29.99,
    description:
      'The Warpaint Collection. Hand-painted ALPHA OMEGA mark on heavyweight cotton. Available in Short Sleeve and Long Sleeve, ten colorways across the Warm Stone series.',
    scripture:
      'He trains my hands for war, my fingers for battle.',
    scriptureRef: 'Psalm 144:1',
    images: [
      '/images/products/warpaint/short-sleeve/military-green-white.webp',
      '/images/products/warpaint/long-sleeve/natural-black.webp',
      '/images/products/warpaint/short-sleeve/natural-gray.webp',
      '/images/products/warpaint/long-sleeve/black-white.webp',
    ],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Asphalt', colorHex: '#515151', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Military Green', colorHex: '#4A5D3A', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Natural', colorHex: '#E8DCC8', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'White', colorHex: '#f5f5f5', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
    ],
    category: 'collections',
    tags: ['warpaint', 'warm-stone', 'collection', 'short-sleeve', 'long-sleeve'],
    status: 'in-stock',
  },
  {
    slug: 'ao-unbreakable',
    name: 'AO Unbreakable',
    price: 29.99,
    description:
      'Unbreakable. Forged for the ones who do not bend. Heavyweight cotton, Warm Stone Series. Available in Short Sleeve and Long Sleeve, seven colorways with ALPHA OMEGA UNBREAKABLE across the chest and STRENGTH TEAM down the sleeve.',
    scripture:
      'Hard pressed on every side, but not crushed.',
    scriptureRef: '2 Corinthians 4:8',
    images: [
      '/images/products/unbreakable/short-sleeve/military-green-white.webp',
      '/images/products/unbreakable/short-sleeve/black-white.webp',
      '/images/products/unbreakable/short-sleeve/asphalt-black.webp',
      '/images/products/unbreakable/short-sleeve/white-black.webp',
    ],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Asphalt', colorHex: '#515151', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Military Green', colorHex: '#4A5D3A', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'White', colorHex: '#f5f5f5', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
    ],
    category: 'collections',
    tags: ['unbreakable', 'warm-stone', 'collection', 'short-sleeve', 'long-sleeve'],
    status: 'in-stock',
  },
  {
    slug: 'ao-cornerstone',
    name: 'AO Cornerstone',
    price: 29.99,
    description:
      'AO Cornerstone. A clean boxed ALPHA, cross, OMEGA emblem pressed into heavyweight cotton, built for the ones whose foundation does not move. Available in Short Sleeve and Long Sleeve across the Warm Stone series.',
    scripture:
      'The stone the builders rejected has become the cornerstone.',
    scriptureRef: 'Psalm 118:22',
    images: [
      '/images/products/cornerstone/short-sleeve/black-white.webp',
      '/images/products/cornerstone/long-sleeve/natural-black.webp',
      '/images/products/cornerstone/short-sleeve/military-green-white.webp',
      '/images/products/cornerstone/long-sleeve/white-black.webp',
    ],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Asphalt', colorHex: '#515151', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Military Green', colorHex: '#4A5D3A', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Natural', colorHex: '#E8DCC8', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'White', colorHex: '#f5f5f5', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
    ],
    category: 'collections',
    tags: ['cornerstone', 'warm-stone', 'collection', 'short-sleeve', 'long-sleeve'],
    status: 'in-stock',
  },
  {
    slug: 'ao-croptop',
    name: 'AO Cornerstone Crop',
    price: 25.99,
    compareAtPrice: 34.99,
    description:
      'AO Cornerstone Crop. A flowy cropped tee in soft 65/35 poly-viscose with a modest crop, the boxed ALPHA, cross, OMEGA emblem on the front chest and a small cross at the nape. Cut for women in sizes S to 2XL.',
    scripture:
      'The stone the builders rejected has become the cornerstone.',
    scriptureRef: 'Psalm 118:22',
    images: [
      '/images/products/croptop/black-white-front.webp',
      '/images/products/croptop/heather-dust-black-front.webp',
      '/images/products/croptop/white-black-front.webp',
    ],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: true },
      { color: 'Heather Dust', colorHex: '#D9CFC2', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: true },
      { color: 'White', colorHex: '#f5f5f5', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: true },
    ],
    category: 'collections',
    tags: ['croptop', 'cornerstone', 'womens', 'crop', 'collection'],
    status: 'in-stock',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Per-variant pricing model. Collections sell short sleeve at one price and
 * long sleeve at another; the flat `Product.price` above is only a display
 * anchor and must NOT be used to charge a customer.
 *
 * Keyed by base product slug. `short` / `long` are the authoritative unit
 * prices in dollars. A product with a single sleeve length (e.g. Unbreakable)
 * omits the missing length, and the single available price applies.
 *
 * These mirror PRODUCT_PRICE_SHORT / PRODUCT_PRICE_LONG in the per-collection
 * data files (warpaint.ts, unbreakable.ts, cornerstone.ts).
 */
const SLEEVE_PRICES: Record<string, { short?: number; long?: number }> = {
  'ao-warpaint': { short: 29.99, long: 34.99 },
  'ao-unbreakable': { short: 29.99, long: 34.99 },
  'ao-cornerstone': { short: 29.99, long: 34.99 },
};

/**
 * Former (pre-June-2-drop) per-sleeve prices, shown struck-through.
 * DISPLAY ONLY - never feeds checkout. These are the genuine prices charged
 * before the launch markdown: SS was 34.99, LS was 39.99.
 */
const SLEEVE_COMPARE_PRICES: Record<string, { short?: number; long?: number }> = {
  'ao-warpaint': { short: 34.99, long: 39.99 },
  'ao-unbreakable': { short: 34.99, long: 39.99 },
  'ao-cornerstone': { short: 34.99, long: 39.99 },
};

export type Sleeve = 'short' | 'long';

/**
 * Garment fit. 'mens' = standard retail cut; 'womens' = the women's-cut
 * equivalent the print partner pulls. Absent is treated as 'mens'.
 * Pure type - flows cart -> checkout -> webhook -> fulfillment email.
 */
export type Fit = 'mens' | 'womens';

/**
 * Normalize a cart line slug into its base product slug + sleeve.
 *
 * Showcase components add items with a slug like `ao-warpaint-short-sleeve`
 * or `ao-warpaint-long-sleeve`. The product detail page adds the bare base
 * slug (`ao-warpaint`). This returns the base slug plus the sleeve when one
 * is encoded in the slug.
 */
export function parseProductSlug(slug: string): { baseSlug: string; sleeve?: Sleeve } {
  if (slug.endsWith('-short-sleeve')) {
    return { baseSlug: slug.slice(0, -'-short-sleeve'.length), sleeve: 'short' };
  }
  if (slug.endsWith('-long-sleeve')) {
    return { baseSlug: slug.slice(0, -'-long-sleeve'.length), sleeve: 'long' };
  }
  return { baseSlug: slug };
}

/**
 * Resolve the authoritative unit price (in dollars) for a product + sleeve,
 * derived entirely from server-side data. Returns undefined if the product is
 * unknown or the requested sleeve is not sold for that product.
 *
 * Resolution order:
 *  1. Use the sleeve encoded in the slug, or the explicit sleeve argument.
 *  2. If no sleeve is known but the product has exactly one sleeve price,
 *     that single price applies.
 *  3. Fall back to the product's flat display price only when no per-sleeve
 *     pricing exists for the product at all.
 */
export function getAuthoritativeUnitPrice(
  slug: string,
  sleeveHint?: Sleeve,
): number | undefined {
  const { baseSlug, sleeve: slugSleeve } = parseProductSlug(slug);
  const product = getProduct(baseSlug);
  if (!product) return undefined;

  const sleevePrices = SLEEVE_PRICES[baseSlug];
  if (!sleevePrices) {
    // No per-sleeve model for this product: flat price is authoritative.
    return product.price;
  }

  const sleeve = slugSleeve ?? sleeveHint;
  if (sleeve) {
    const price = sleevePrices[sleeve];
    return price; // undefined when this product does not sell that sleeve
  }

  // No sleeve specified: only safe if exactly one sleeve price exists.
  const available = Object.values(sleevePrices).filter(
    (p): p is number => typeof p === 'number',
  );
  if (available.length === 1) return available[0];

  return undefined; // ambiguous: caller must supply a sleeve
}

/**
 * Display-only price string for product cards and listings.
 *
 * Multi-sleeve collections (more than one sleeve price present) show
 * "from $<lowest sleeve price>" so the card reflects the real starting price.
 * Single-sleeve products show a plain "$<price>".
 *
 * This is presentation only. Checkout still derives the authoritative
 * per-variant price via getAuthoritativeUnitPrice / SLEEVE_PRICES, and
 * structured data still uses Product.price. Nothing here changes what a
 * customer is charged.
 */
export function getDisplayPrice(product: Product): string {
  const sleevePrices = SLEEVE_PRICES[product.slug];
  const available = sleevePrices
    ? Object.values(sleevePrices).filter(
        (p): p is number => typeof p === 'number',
      )
    : [];

  if (available.length > 1) {
    const min = Math.min(...available);
    return `from $${min.toFixed(2)}`;
  }

  if (available.length === 1) {
    return `$${available[0].toFixed(2)}`;
  }

  return `$${product.price.toFixed(2)}`;
}

/**
 * Former price for a specific line (display-only struck price).
 * Resolves per-sleeve compare for the standard collections, else the
 * product-level compareAtPrice (e.g. the crop top).
 */
export function getCompareAtPrice(slug: string, sleeveHint?: Sleeve): number | undefined {
  const { baseSlug, sleeve: slugSleeve } = parseProductSlug(slug);
  const sleeve = slugSleeve ?? sleeveHint;
  const comparePrices = SLEEVE_COMPARE_PRICES[baseSlug];
  if (comparePrices && sleeve) {
    return comparePrices[sleeve];
  }
  const product = getProduct(baseSlug);
  return product?.compareAtPrice;
}

/**
 * Former price to display alongside getDisplayPrice (the "from" / lowest
 * current price) on cards. Display-only.
 */
export function getDisplayCompareAtPrice(product: Product): number | undefined {
  const comparePrices = SLEEVE_COMPARE_PRICES[product.slug];
  if (comparePrices) {
    const available = Object.values(comparePrices).filter(
      (p): p is number => typeof p === 'number',
    );
    if (available.length) return Math.min(...available);
  }
  return product.compareAtPrice;
}

/** Dollar savings if a real former price exists and exceeds the current price. */
export function getSavings(price: number, compareAt?: number): number {
  if (compareAt && compareAt > price) return compareAt - price;
  return 0;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.status === 'in-stock');
}
