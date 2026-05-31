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
    slug: 'ao-brushstroke',
    name: 'AO Brushstroke Collection',
    price: 39.99,
    description:
      'The Brushstroke Collection. Hand-painted ALPHA OMEGA mark on heavyweight cotton. Available in Short Sleeve and Long Sleeve, ten colorways across the Warm Stone series.',
    scripture:
      'I have fought the good fight, I have finished the race, I have kept the faith.',
    scriptureRef: '2 Timothy 4:7',
    images: [
      '/images/products/brushstroke/short-sleeve/military-green-white.webp',
      '/images/products/brushstroke/long-sleeve/natural-black.webp',
      '/images/products/brushstroke/short-sleeve/natural-gray.webp',
      '/images/products/brushstroke/long-sleeve/black-white.webp',
    ],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Asphalt', colorHex: '#515151', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Military Green', colorHex: '#4A5D3A', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Natural', colorHex: '#E8DCC8', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'White', colorHex: '#f5f5f5', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
    ],
    category: 'collections',
    tags: ['brushstroke', 'warm-stone', 'collection', 'short-sleeve', 'long-sleeve'],
    status: 'in-stock',
  },
  {
    slug: 'ao-unbreakable',
    name: 'AO Unbreakable',
    price: 34.99,
    description:
      'Unbreakable. Forged for the ones who do not bend. Heavyweight cotton tee, Warm Stone Series. Available in Short Sleeve now, Long Sleeve coming soon.',
    scripture:
      'I have fought the good fight, I have finished the race, I have kept the faith.',
    scriptureRef: '2 Timothy 4:7',
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
    tags: ['unbreakable', 'warm-stone', 'collection', 'short-sleeve'],
    status: 'in-stock',
  },
  {
    slug: 'ao-cornerstone',
    name: 'AO Cornerstone',
    price: 34.99,
    description:
      'AO Cornerstone. A clean boxed ALPHA, cross, OMEGA emblem pressed into heavyweight cotton, built for the ones whose foundation does not move. Available in Short Sleeve and Long Sleeve across the Warm Stone series.',
    scripture:
      'I am the Alpha and the Omega, the First and the Last, the Beginning and the End.',
    scriptureRef: 'Revelation 22:13',
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
 * data files (brushstroke.ts, unbreakable.ts, cornerstone.ts).
 */
const SLEEVE_PRICES: Record<string, { short?: number; long?: number }> = {
  'ao-brushstroke': { short: 34.99, long: 39.99 },
  'ao-unbreakable': { short: 34.99 },
  'ao-cornerstone': { short: 34.99, long: 39.99 },
};

export type Sleeve = 'short' | 'long';

/**
 * Normalize a cart line slug into its base product slug + sleeve.
 *
 * Showcase components add items with a slug like `ao-brushstroke-short-sleeve`
 * or `ao-brushstroke-long-sleeve`. The product detail page adds the bare base
 * slug (`ao-brushstroke`). This returns the base slug plus the sleeve when one
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

export function getAllProducts(): Product[] {
  return products;
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.status === 'in-stock');
}
