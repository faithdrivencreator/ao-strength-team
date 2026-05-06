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
    slug: 'alpha-omega-signature-tee',
    name: 'Alpha Omega Signature Tee',
    price: 34.99,
    description:
      'The one that started it all. Premium heavyweight cotton with our iconic cross design. Front and back ALPHA OMEGA branding. Built to train in, built to believe in.',
    scripture:
      'I can do all things through Christ who strengthens me.',
    scriptureRef: 'Philippians 4:13',
    images: [
      '/images/products/signature-tee-1.png',
      '/images/products/signature-tee-2.jpg',
      '/images/products/signature-tee-3.jpg',
      '/images/products/signature-tee-4.jpg',
      '/images/products/signature-tee-5.jpg',
    ],
    variants: [
      { color: 'Asphalt', colorHex: '#515151', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Athletic Heather', colorHex: '#B0B0B0', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Black', colorHex: '#000000', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Dark Grey', colorHex: '#333333', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Dark Grey Heather', colorHex: '#4A4A4A', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Deep Heather', colorHex: '#5C5C5C', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Heather Green', colorHex: '#4A5D4A', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Silver', colorHex: '#C0C0C0', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Solid Black Blend', colorHex: '#1A1A1A', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'White', colorHex: '#FFFFFF', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Ash', colorHex: '#B2BEB5', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
      { color: 'Black Heather', colorHex: '#2B2B2B', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], inStock: true },
    ],
    category: 'tees',
    tags: ['signature', 'cross', 'heavyweight', 'bestseller'],
    status: 'in-stock',
  },
  {
    slug: 'strength-team-long-sleeve',
    name: 'Strength Team Long Sleeve',
    price: 42.99,
    description:
      'Represent the team. The Strength Team Long Sleeve features a centered cross with ALPHA OMEGA and STRENGTH TEAM sleeve prints. Clean, bold, and built for those who train with faith. Available in Charcoal, Black, and White.',
    scripture:
      'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    scriptureRef: 'Joshua 1:9',
    images: ['/images/products/strength-team-ls-1.png'],
    variants: [
      { color: 'Charcoal', colorHex: '#36454F', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: false },
      { color: 'Black', colorHex: '#000000', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: false },
      { color: 'White', colorHex: '#FFFFFF', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: false },
    ],
    category: 'long-sleeves',
    tags: ['strength-team', 'cross', 'sleeve-print'],
    status: 'sold-out',
  },
  {
    slug: 'unbreakable-long-sleeve',
    name: 'Unbreakable Long Sleeve',
    price: 42.99,
    description:
      'ALPHA. OMEGA. UNBREAKABLE. This premium long sleeve declares your identity. Bold front print with cross detail and sleeve branding. Available in Black, Cream, and Charcoal.',
    scripture:
      'No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness.',
    scriptureRef: 'Hebrews 12:11',
    images: ['/images/products/unbreakable-ls-1.png'],
    variants: [
      { color: 'Black', colorHex: '#000000', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: false },
      { color: 'Cream', colorHex: '#FFFDD0', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: false },
      { color: 'Charcoal', colorHex: '#36454F', sizes: ['S', 'M', 'L', 'XL', '2XL'], inStock: false },
    ],
    category: 'long-sleeves',
    tags: ['unbreakable', 'cross', 'sleeve-print', 'identity'],
    status: 'sold-out',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.status === 'in-stock');
}
