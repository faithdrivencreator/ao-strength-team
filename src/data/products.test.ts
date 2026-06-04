import { describe, it, expect } from "vitest";
import {
  getCompareAtPrice,
  getDisplayCompareAtPrice,
  getSavings,
  getAuthoritativeUnitPrice,
  getProduct,
} from "./products";

describe("compare-at pricing (display-only)", () => {
  it("returns the SS former price for a warpaint short-sleeve slug", () => {
    expect(getCompareAtPrice("ao-warpaint-short-sleeve")).toBe(34.99);
  });

  it("returns the LS former price for a long-sleeve slug", () => {
    expect(getCompareAtPrice("ao-unbreakable-long-sleeve")).toBe(39.99);
  });

  it("honors an explicit sleeve hint on a bare base slug", () => {
    expect(getCompareAtPrice("ao-cornerstone", "long")).toBe(39.99);
  });

  it("returns the crop top former price from the product field", () => {
    expect(getCompareAtPrice("ao-croptop")).toBe(34.99);
  });

  it("getDisplayCompareAtPrice returns the lowest sleeve compare for a collection", () => {
    const warpaint = getProduct("ao-warpaint")!;
    expect(getDisplayCompareAtPrice(warpaint)).toBe(34.99);
  });

  it("getDisplayCompareAtPrice falls back to product.compareAtPrice for crop", () => {
    const crop = getProduct("ao-croptop")!;
    expect(getDisplayCompareAtPrice(crop)).toBe(34.99);
  });

  it("getSavings is the positive difference, else 0", () => {
    expect(getSavings(29.99, 34.99)).toBeCloseTo(5.0, 2);
    expect(getSavings(29.99, undefined)).toBe(0);
    expect(getSavings(29.99, 29.99)).toBe(0);
  });
});

describe("pricing authority is unaffected by compare-at", () => {
  it("warpaint short still charges 29.99", () => {
    expect(getAuthoritativeUnitPrice("ao-warpaint-short-sleeve")).toBe(29.99);
  });
  it("warpaint long still charges 34.99", () => {
    expect(getAuthoritativeUnitPrice("ao-warpaint-long-sleeve")).toBe(34.99);
  });
  it("crop still charges 25.99", () => {
    expect(getAuthoritativeUnitPrice("ao-croptop")).toBe(25.99);
  });
});
