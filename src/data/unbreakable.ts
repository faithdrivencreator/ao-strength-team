/**
 * Unbreakable Collection - variant data
 *
 * Flat-lay mockups live under public/images/products/unbreakable/.
 * `id` is the filename stem (no extension). `image` is the public path.
 *
 * Both sleeve lengths carry the same 7 colorways; the showcase shows the
 * SS/LS toggle and preserves the selected color across the switch via sharedIds.
 */

export type UnbreakableVariant = {
  id: string;
  garmentColor: string;
  garmentHex: string;
  printColor: string;
  printHex: string;
  image: string;
};

export const shortSleeveVariants: UnbreakableVariant[] = [
  {
    id: "asphalt-black",
    garmentColor: "Asphalt",
    garmentHex: "#515151",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/unbreakable/short-sleeve/asphalt-black.webp",
  },
  {
    id: "black-gray",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/unbreakable/short-sleeve/black-gray.webp",
  },
  {
    id: "black-white",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/unbreakable/short-sleeve/black-white.webp",
  },
  {
    id: "military-green-black",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/unbreakable/short-sleeve/military-green-black.webp",
  },
  {
    id: "military-green-gray",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/unbreakable/short-sleeve/military-green-gray.webp",
  },
  {
    id: "military-green-white",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/unbreakable/short-sleeve/military-green-white.webp",
  },
  {
    id: "white-black",
    garmentColor: "White",
    garmentHex: "#f5f5f5",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/unbreakable/short-sleeve/white-black.webp",
  },
];

export const longSleeveVariants: UnbreakableVariant[] = [
  {
    id: "asphalt-black",
    garmentColor: "Asphalt",
    garmentHex: "#515151",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/unbreakable/long-sleeve/asphalt-black.webp",
  },
  {
    id: "black-gray",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/unbreakable/long-sleeve/black-gray.webp",
  },
  {
    id: "black-white",
    garmentColor: "Black",
    garmentHex: "#0a0a0a",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/unbreakable/long-sleeve/black-white.webp",
  },
  {
    id: "military-green-black",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/unbreakable/long-sleeve/military-green-black.webp",
  },
  {
    id: "military-green-gray",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "Gray",
    printHex: "#737373",
    image: "/images/products/unbreakable/long-sleeve/military-green-gray.webp",
  },
  {
    id: "military-green-white",
    garmentColor: "Military Green",
    garmentHex: "#4A5D3A",
    printColor: "White",
    printHex: "#f5f5f5",
    image: "/images/products/unbreakable/long-sleeve/military-green-white.webp",
  },
  {
    id: "white-black",
    garmentColor: "White",
    garmentHex: "#f5f5f5",
    printColor: "Black",
    printHex: "#0a0a0a",
    image: "/images/products/unbreakable/long-sleeve/white-black.webp",
  },
];

export const sharedIds: string[] = shortSleeveVariants
  .map((v) => v.id)
  .filter((id) => longSleeveVariants.some((s) => s.id === id));

export type SharedColorway = (typeof sharedIds)[number];

export type SleeveLength = "short" | "long";

export const PRODUCT_SLUG = "ao-unbreakable";
export const PRODUCT_NAME = "AO Unbreakable";
export const PRODUCT_PRICE_LONG = 39.99;
export const PRODUCT_PRICE_SHORT = 34.99;
