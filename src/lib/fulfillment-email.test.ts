import { describe, it, expect } from "vitest";
import { buildPrintPartnerEmailHtml, type FulfillmentItem } from "./fulfillment-email";

const baseItem: Omit<FulfillmentItem, "fit"> = {
  collection: "AO Warpaint",
  sleeve: "short",
  garmentColor: "Black",
  emblemColor: "White",
  size: "M",
  quantity: 1,
  imageUrl: "",
};

function render(items: FulfillmentItem[]): string {
  return buildPrintPartnerEmailHtml({
    orderRef: "TEST-1",
    orderDate: "June 4, 2026",
    customerName: "Test Buyer",
    shippingLines: ["123 Main St", "Miami, FL 33101"],
    items,
  });
}

describe("fulfillment email FIT row", () => {
  it("renders WOMEN'S FIT and a women's-cut instruction for a womens line", () => {
    const html = render([{ ...baseItem, fit: "womens" }]);
    expect(html).toContain("WOMEN&#39;S FIT");
    expect(html.toLowerCase()).toContain("women's-cut");
  });

  it("renders MEN'S FIT for a mens line", () => {
    const html = render([{ ...baseItem, fit: "mens" }]);
    expect(html).toContain("MEN&#39;S FIT");
  });
});
