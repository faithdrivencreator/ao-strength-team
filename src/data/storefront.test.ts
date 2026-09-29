import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { STORE_PRODUCTS, cartLine, getStoreProduct, GARMENT_FACTS } from "./storefront";
import { getAllProducts, getAuthoritativeUnitPrice, type Sleeve } from "./products";

const pub = (p: string) => join(process.cwd(), "public", p);

describe("storefront data", () => {
  it("covers every live product", () => {
    expect(STORE_PRODUCTS.map((p) => p.slug).sort()).toEqual(getAllProducts().map((p) => p.slug).sort());
  });

  it("every image it references exists in public/", () => {
    for (const p of STORE_PRODUCTS) {
      const paths = [p.cardImage];
      for (const m of Object.values(p.models)) paths.push(m!.front, ...(m!.back ? [m!.back] : []));
      for (const s of Object.values(p.sleeves)) for (const c of s!.colorways) paths.push(c.image, ...(c.front ? [c.front] : []));
      for (const path of paths) expect(existsSync(pub(path)), path).toBe(true);
    }
  });

  it("display prices equal what checkout charges", () => {
    for (const p of STORE_PRODUCTS) {
      for (const [sleeve, s] of Object.entries(p.sleeves)) {
        const line = cartLine(p, sleeve as Sleeve, s!.colorways[0], "M", p.fits[0]);
        expect(getAuthoritativeUnitPrice(line.productSlug, sleeve as Sleeve)).toBe(s!.price);
      }
    }
  });

  it("cart lines keep the exact format the old showcases sent", () => {
    const w = getStoreProduct("ao-warpaint")!;
    const c = w.sleeves.long!.colorways.find((v) => v.id === "black-white")!;
    expect(cartLine(w, "long", c, "L", "womens")).toEqual({
      productSlug: "ao-warpaint-long-sleeve",
      name: "AO Warpaint Long Sleeve",
      price: 34.99,
      color: "Black / White Print",
      size: "L",
      quantity: 1,
      image: "/images/products/warpaint/long-sleeve/black-white.webp",
      fit: "womens",
    });
    const crop = getStoreProduct("ao-croptop")!;
    const line = cartLine(crop, "short", crop.sleeves.short!.colorways[0], "S", "womens");
    expect(line.productSlug).toBe("ao-croptop");
    expect(line.name).toBe("AO Cornerstone Crop");
    expect(line.price).toBe(25.99);
  });

  it("makes no unconfirmed or banned claims", () => {
    const text = JSON.stringify({ STORE_PRODUCTS, GARMENT_FACTS }).toLowerCase();
    for (const banned of ["heavyweight", "60-day", "free exchange", "ships in", "gsm", "—", "–"]) {
      expect(text.includes(banned), banned).toBe(false);
    }
  });
});
