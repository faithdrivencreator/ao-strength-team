/**
 * Warpaint Collection - variant data
 *
 * Flat-lay mockups already live under public/images/products/warpaint/.
 * `id` is the filename stem (no extension). `image` is the public path.
 */

export type WarpaintVariant = {
  id: string;
  garmentColor: string;
  garmentHex: string;
  printColor: string;
  printHex: string;
  image: string;
};

export const longSleeveVariants: WarpaintVariant[] = [
  {
    id: "asphalt-black",
    garmentColor: "Asphalt",
    garmentHex: "#515151",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/warpaint/long-sleeve/asphalt-black.webp",
  },
  {
    id: "asphalt-white",
    garmentColor: "Asphalt",
    garmentHex: "#515151",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/warpaint/long-sleeve/asphalt-white.webp",
  },
  {
    id: "black-gray",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/warpaint/long-sleeve/black-gray.webp",
  },
  {
    id: "black-white",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/warpaint/long-sleeve/black-white.webp",
  },
  {
    id: "military-green-black",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/warpaint/long-sleeve/military-green-black.webp",
  },
  {
    id: "military-green-white",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/warpaint/long-sleeve/military-green-white.webp",
  },
  {
    id: "natural-black",
    garmentColor: "Natural",
    garmentHex: "#E8DCC8",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/warpaint/long-sleeve/natural-black.webp",
  },
  {
    id: "natural-gray",
    garmentColor: "Natural",
    garmentHex: "#E8DCC8",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/warpaint/long-sleeve/natural-gray.webp",
  },
  {
    id: "white-black",
    garmentColor: "White",
    garmentHex: "#f5f5f5",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/warpaint/long-sleeve/white-black-v2.webp",
  },
  {
    id: "white-gray",
    garmentColor: "White",
    garmentHex: "#f5f5f5",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/warpaint/long-sleeve/white-gray.webp",
  },
];

export const shortSleeveVariants: WarpaintVariant[] = [
  {
    id: "asphalt-white",
    garmentColor: "Asphalt",
    garmentHex: "#515151",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/warpaint/short-sleeve/asphalt-white.webp",
  },
  {
    id: "black-white",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/warpaint/short-sleeve/black-white.webp",
  },
  {
    id: "military-green-white",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/warpaint/short-sleeve/military-green-white.webp",
  },
  {
    id: "natural-black",
    garmentColor: "Natural",
    garmentHex: "#E8DCC8",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/warpaint/short-sleeve/natural-black.webp",
  },
  {
    id: "natural-gray",
    garmentColor: "Natural",
    garmentHex: "#E8DCC8",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/warpaint/short-sleeve/natural-gray.webp",
  },
  {
    id: "white-black",
    garmentColor: "White",
    garmentHex: "#f5f5f5",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/warpaint/short-sleeve/white-black.webp",
  },
  {
    id: "white-gray",
    garmentColor: "White",
    garmentHex: "#f5f5f5",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/warpaint/short-sleeve/white-gray.webp",
  },
];

/**
 * Ids present in BOTH sleeve lengths.
 * Used by the SS/LS toggle to preserve color choice across switch.
 */
export const sharedIds: string[] = longSleeveVariants
  .map((v) => v.id)
  .filter((id) => shortSleeveVariants.some((s) => s.id === id));

export type SharedColorway = (typeof sharedIds)[number];

export type SleeveLength = "short" | "long";

export const PRODUCT_SLUG = "ao-warpaint";
export const PRODUCT_NAME = "AO Warpaint";
export const PRODUCT_PRICE_LONG = 34.99;
export const PRODUCT_PRICE_SHORT = 29.99;
