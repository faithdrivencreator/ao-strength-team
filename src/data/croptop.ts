/**
 * AO Cornerstone Crop - variant data
 *
 * BELLA+CANVAS BC8882 women's flowy cropped tee carrying the Cornerstone
 * emblem (boxed ALPHA, cross, OMEGA) on the front chest and a small cross at
 * the back of the neck. Single garment style, no sleeve length variants.
 *
 * Flat-lay mockups live under public/images/products/croptop/.
 * `id` is the filename stem (no extension). `image` is the BACK view; the
 * front lives next to it with a `-front` suffix (same convention as
 * cornerstone.ts).
 */

export type CropTopVariant = {
  id: string;
  garmentColor: string;
  garmentHex: string;
  printColor: string;
  printHex: string;
  image: string;
};

export const variants: CropTopVariant[] = [
  {
    id: "black-white",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/croptop/black-white.webp",
  },
  {
    id: "heather-dust-black",
    garmentColor: "Heather Dust",
    garmentHex: "#D9CFC2",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/croptop/heather-dust-black.webp",
  },
  {
    id: "white-black",
    garmentColor: "White",
    garmentHex: "#f5f5f5",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/croptop/white-black.webp",
  },
];

export const PRODUCT_SLUG = "ao-croptop";
export const PRODUCT_NAME = "AO Cornerstone Crop";
export const PRODUCT_PRICE = 34.99;
