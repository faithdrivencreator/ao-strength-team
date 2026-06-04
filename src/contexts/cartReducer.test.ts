import { describe, it, expect } from "vitest";
import { cartReducer, type CartItem } from "./CartContext";

const base: CartItem = {
  productSlug: "ao-warpaint-short-sleeve",
  name: "AO Warpaint Short Sleeve",
  price: 29.99,
  color: "Black / White Print",
  size: "M",
  quantity: 1,
  image: "/x.webp",
};

const mens: CartItem = { ...base, fit: "mens" };
const womens: CartItem = { ...base, fit: "womens" };

const empty = { items: [] as CartItem[], isOpen: false, selectedCharity: null };

describe("cart reducer keys on fit", () => {
  it("same slug/color/size but different fit are two lines", () => {
    let s = cartReducer(empty, { type: "ADD_ITEM", payload: mens });
    s = cartReducer(s, { type: "ADD_ITEM", payload: womens });
    expect(s.items).toHaveLength(2);
  });

  it("identical fit/color/size merges quantity", () => {
    let s = cartReducer(empty, { type: "ADD_ITEM", payload: mens });
    s = cartReducer(s, { type: "ADD_ITEM", payload: { ...mens, quantity: 2 } });
    expect(s.items).toHaveLength(1);
    expect(s.items[0].quantity).toBe(3);
  });

  it("REMOVE_ITEM removes only the matching fit", () => {
    let s = cartReducer(empty, { type: "ADD_ITEM", payload: mens });
    s = cartReducer(s, { type: "ADD_ITEM", payload: womens });
    s = cartReducer(s, {
      type: "REMOVE_ITEM",
      payload: { productSlug: base.productSlug, color: base.color, size: base.size, fit: "womens" },
    });
    expect(s.items).toHaveLength(1);
    expect(s.items[0].fit).toBe("mens");
  });

  it("UPDATE_QUANTITY updates only the matching fit", () => {
    let s = cartReducer(empty, { type: "ADD_ITEM", payload: mens });
    s = cartReducer(s, { type: "ADD_ITEM", payload: womens });
    s = cartReducer(s, {
      type: "UPDATE_QUANTITY",
      payload: { productSlug: base.productSlug, color: base.color, size: base.size, fit: "womens", quantity: 5 },
    });
    const w = s.items.find((i) => i.fit === "womens")!;
    const m = s.items.find((i) => i.fit === "mens")!;
    expect(w.quantity).toBe(5);
    expect(m.quantity).toBe(1);
  });
});
