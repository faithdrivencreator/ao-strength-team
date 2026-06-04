import { describe, it, expect } from "vitest";
import {
  FREE_SHIPPING_THRESHOLD_CENTS,
  FREE_SHIPPING_THRESHOLD_DOLLARS,
  dollars,
  remainingToFreeShip,
  hasFreeShipping,
} from "./shipping";

describe("shipping SSOT", () => {
  it("threshold is 7500 cents / 75 dollars", () => {
    expect(FREE_SHIPPING_THRESHOLD_CENTS).toBe(7500);
    expect(FREE_SHIPPING_THRESHOLD_DOLLARS).toBe(75);
  });
  it("dollars() formats whole cents as a plain $N", () => {
    expect(dollars(7500)).toBe("$75");
  });
  it("remainingToFreeShip clamps at 0", () => {
    expect(remainingToFreeShip(60)).toBe(15);
    expect(remainingToFreeShip(80)).toBe(0);
  });
  it("hasFreeShipping at/over threshold", () => {
    expect(hasFreeShipping(74.99)).toBe(false);
    expect(hasFreeShipping(75)).toBe(true);
  });
});
