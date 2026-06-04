# Men's / Women's Split + Brand-Safe Conversion Layer - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give AO Strength Team dedicated `/men` and `/women` storefront worlds, thread a `fit` (mens/womens) attribute from cart through Stripe to the print-partner work order so women's orders are fulfilled as women's-cut garments, and layer in honest conversion mechanics (free-ship + sale top bar, truthful compare-at pricing with SAVE flags, cart free-ship progress bar).

**Architecture:** A single shared `Fit` type flows cart -> checkout -> webhook -> fulfillment email, mirroring the existing `style` attribute exactly (added alongside, never in place of). Pricing display gains a compare-at layer that is strictly display-only; `getAuthoritativeUnitPrice` / `SLEEVE_PRICES` remain the sole pricing authority so nothing a customer is charged can change. Category routes are server components that read `?fit=` and pass a `defaultFit` prop into the existing showcases. A shipping single-source-of-truth module guarantees the customer-facing free-ship number can never drift from what checkout enforces.

**Tech Stack:** Next.js 15 App Router (customized - see `AGENTS.md`), React, framer-motion (`motion/react`), TypeScript, Tailwind, Stripe, Resend. Tests: Vitest (added in Task 1; `jsdom` already present).

---

## Pre-flight context (read before Task 0)

**Spec:** `docs/superpowers/specs/2026-06-04-mens-womens-split-and-conversion-layer-design.md` (approved).

**Honesty guardrails (non-negotiable, apply to every task):**
- Compare-at prices are the genuine June 2 pre-drop prices ONLY. Standard collections: SS was `$34.99`, LS was `$39.99`. Crop: was `$34.99`. Never invent an anchor.
- No fabricated reviews, no fake countdown timers, no false "only N left" scarcity.
- All copy: ASCII hyphen only (no em/en dashes), no italic in brand prose, no exclamation points in ops/fulfillment voice, no false return/exchange/shipping claims.
- Compare-at is DISPLAY ONLY. It must never reach checkout pricing.

**Pre-existing box-tee WIP (Task 0 isolates it):** these tracked files hold uncommitted "Oversized Box" WIP, plus untracked `src/data/box-tee.ts`:
`src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`, `src/components/CartDrawer.tsx`, `src/components/CornerstoneShowcase.tsx`, `src/components/WarpaintShowcase.tsx`, `src/contexts/CartContext.tsx`, `src/lib/fulfillment-email.ts`.
Also untracked and unrelated: `public/images/campaign/strength-banner-original.webp`, `public/images/lifestyle/female-back-black.webp.bak-AtO-20260601`, `.playwright-mcp/`. Plus modified binary `public/images/products/croptop/black-white-front.webp`.

**Verification commands used throughout:**
- Type check (fast, per-task): `npx tsc --noEmit`
- Unit tests: `npx vitest run <path>`
- Full build (end of plan): `npm run build`
- There is no lint-blocking CI; `npm run lint` is available but optional.

**Commit discipline:** NEVER `git add -A` or `git add .`. Stage only the explicit paths named in each task's commit step. End every commit message with the Co-Authored-By trailer:
```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```
Do NOT push. Deploy is a separate, Pete-gated step after the whole plan is built and smoke-tested.

---

### Task 0: Isolate the box-tee WIP onto a clean base

**Why:** This feature edits the exact files holding the uncommitted box WIP. A plain `git add <file>` stages the whole file, which would sweep the box WIP into a feature commit and risk deploying half-built code. Stashing the WIP gives a clean base; the WIP is fully preserved and recoverable.

**Files:** none edited - git state only.

- [ ] **Step 1: Confirm the current dirty state**

Run: `git status --short`
Expected (order may vary): the 7 modified WIP files above, modified `public/images/products/croptop/black-white-front.webp`, and untracked `src/data/box-tee.ts`, `public/images/campaign/strength-banner-original.webp`, `public/images/lifestyle/female-back-black.webp.bak-AtO-20260601`, `.playwright-mcp/`.

- [ ] **Step 2: Create the feature branch**

```bash
git checkout -b feat/mens-womens-split-conversion
```

- [ ] **Step 3: Stash the box WIP (including the untracked box-tee data file)**

```bash
git stash push --include-untracked -m "box-tee-wip (preserved during mens/womens build)" \
  src/app/api/checkout/route.ts \
  src/app/api/webhooks/stripe/route.ts \
  src/components/CartDrawer.tsx \
  src/components/CornerstoneShowcase.tsx \
  src/components/WarpaintShowcase.tsx \
  src/contexts/CartContext.tsx \
  src/lib/fulfillment-email.ts \
  src/data/box-tee.ts
```

- [ ] **Step 4: Verify the box WIP is safely stashed and the base is clean**

Run: `git stash list`
Expected: one entry, `stash@{0}: On feat/mens-womens-split-conversion: box-tee-wip (preserved during mens/womens build)`.

Run: `git status --short`
Expected: the 7 WIP files and `src/data/box-tee.ts` no longer appear. Remaining: only the unrelated untracked items (`strength-banner-original.webp`, the `.bak` file, `.playwright-mcp/`) and the modified binary `croptop/black-white-front.webp`. The TypeScript source base is now clean.

> RECOVERY NOTE for later: to restore the box WIP, `git stash pop`. Because this feature edits the same files, the pop will be a normal 3-way merge and may report conflicts in those files - that is expected and resolvable; the WIP was never lost.

- [ ] **Step 5: No commit** (git-state task only). Proceed to Task 1.

---

### Task 1: Test harness (Vitest)

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts + devDependencies)

- [ ] **Step 1: Add Vitest as a dev dependency**

```bash
npm install --save-dev vitest@^2.1.8
```
Expected: `vitest` added under `devDependencies`; `jsdom@^24.1.3` already present is reused.

- [ ] **Step 2: Create the Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 3: Add a test script**

In `package.json`, add to `"scripts"` (keep existing dev/build/start/lint):
```json
"test": "vitest run"
```

- [ ] **Step 4: Smoke the runner with a trivial passing test**

Create `src/lib/_harness.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run it**

Run: `npx vitest run src/lib/_harness.test.ts`
Expected: 1 passed.

- [ ] **Step 6: Remove the smoke test**

```bash
rm src/lib/_harness.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts package.json package-lock.json
git commit -m "test: add vitest harness (jsdom, @ alias)"
```

---

### Task 2: `Fit` type foundation

**Files:**
- Modify: `src/data/products.ts` (beside the `Sleeve` type, line 153)

- [ ] **Step 1: Add the `Fit` type**

In `src/data/products.ts`, immediately after the `Sleeve` definition (`export type Sleeve = 'short' | 'long';`), add:
```ts
/**
 * Garment fit. 'mens' = standard retail cut; 'womens' = the women's-cut
 * equivalent the print partner pulls. Absent is treated as 'mens'.
 * Pure type - flows cart -> checkout -> webhook -> fulfillment email.
 */
export type Fit = 'mens' | 'womens';
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/products.ts
git commit -m "feat: add shared Fit type (mens/womens)"
```

---

### Task 3: Honest compare-at pricing data + helpers (display-only)

**Files:**
- Modify: `src/data/products.ts`
- Test: `src/data/products.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/data/products.test.ts`:
```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/data/products.test.ts`
Expected: FAIL - `getCompareAtPrice`, `getDisplayCompareAtPrice`, `getSavings` are not exported.

- [ ] **Step 3: Set the crop top former price**

In `src/data/products.ts`, in the `ao-croptop` product object, add `compareAtPrice: 34.99,` immediately after `price: 25.99,`:
```ts
{
  slug: 'ao-croptop',
  name: 'AO Cornerstone Crop',
  price: 25.99,
  compareAtPrice: 34.99,
  // ...rest unchanged
```

- [ ] **Step 4: Add the compare-at price map (mirrors SLEEVE_PRICES)**

In `src/data/products.ts`, immediately after the `SLEEVE_PRICES` declaration (lines 147-151), add:
```ts
/**
 * Former (pre-June-2-drop) per-sleeve prices, shown struck-through.
 * DISPLAY ONLY - never feeds checkout. These are the genuine prices charged
 * before the launch markdown: SS was 34.99, LS was 39.99.
 */
const SLEEVE_COMPARE_PRICES: Record<string, { short?: number; long?: number }> = {
  'ao-warpaint': { short: 34.99, long: 39.99 },
  'ao-unbreakable': { short: 34.99, long: 39.99 },
  'ao-cornerstone': { short: 34.99, long: 39.99 },
};
```

- [ ] **Step 5: Add the three display helpers**

In `src/data/products.ts`, after `getDisplayPrice` (ends line 244), add:
```ts
/**
 * Former price for a specific line (display-only struck price).
 * Resolves per-sleeve compare for the standard collections, else the
 * product-level compareAtPrice (e.g. the crop top).
 */
export function getCompareAtPrice(slug: string, sleeveHint?: Sleeve): number | undefined {
  const { baseSlug, sleeve: slugSleeve } = parseProductSlug(slug);
  const sleeve = slugSleeve ?? sleeveHint;
  const comparePrices = SLEEVE_COMPARE_PRICES[baseSlug];
  if (comparePrices && sleeve) {
    return comparePrices[sleeve];
  }
  const product = getProduct(baseSlug);
  return product?.compareAtPrice;
}

/**
 * Former price to display alongside getDisplayPrice (the "from" / lowest
 * current price) on cards. Display-only.
 */
export function getDisplayCompareAtPrice(product: Product): number | undefined {
  const comparePrices = SLEEVE_COMPARE_PRICES[product.slug];
  if (comparePrices) {
    const available = Object.values(comparePrices).filter(
      (p): p is number => typeof p === 'number',
    );
    if (available.length) return Math.min(...available);
  }
  return product.compareAtPrice;
}

/** Dollar savings if a real former price exists and exceeds the current price. */
export function getSavings(price: number, compareAt?: number): number {
  if (compareAt && compareAt > price) return compareAt - price;
  return 0;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run src/data/products.test.ts`
Expected: all PASS.

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/data/products.ts src/data/products.test.ts
git commit -m "feat: add honest compare-at price map + display helpers (display-only)"
```

---

### Task 4: Shipping single source of truth

**Files:**
- Create: `src/lib/shipping.ts`
- Modify: `src/app/api/checkout/route.ts` (import the threshold; note: this file was stashed in Task 0, so it is now at its committed baseline with NO box WIP)
- Test: `src/lib/shipping.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/shipping.test.ts`:
```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/shipping.test.ts`
Expected: FAIL - module not found.

- [ ] **Step 3: Create the module**

Create `src/lib/shipping.ts`:
```ts
/**
 * Single source of truth for the free-shipping threshold.
 * Checkout enforcement (api/checkout) and every customer-facing display
 * (top bar, cart progress bar) import from here so the number can never drift.
 */
export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
export const FREE_SHIPPING_THRESHOLD_DOLLARS = FREE_SHIPPING_THRESHOLD_CENTS / 100;

/** Format whole-dollar cents as "$75". */
export function dollars(cents: number): string {
  return `$${Math.round(cents / 100)}`;
}

/** Dollars still needed to reach free shipping, clamped at 0. */
export function remainingToFreeShip(subtotalDollars: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD_DOLLARS - subtotalDollars);
}

/** True once the subtotal reaches the threshold. */
export function hasFreeShipping(subtotalDollars: number): boolean {
  return subtotalDollars >= FREE_SHIPPING_THRESHOLD_DOLLARS;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/shipping.test.ts`
Expected: all PASS.

- [ ] **Step 5: Refactor checkout to import the threshold (no behavior change)**

In `src/app/api/checkout/route.ts`:
1. Add to the imports at the top of the file:
```ts
import { FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/shipping';
```
2. Delete the local declaration `const FREE_SHIPPING_THRESHOLD_CENTS = 7500;` (currently line 176). Leave `const FLAT_SHIPPING_CENTS = 795;` in place. The existing usage `subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS` now resolves to the imported constant - identical value, no behavior change.

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/shipping.ts src/lib/shipping.test.ts src/app/api/checkout/route.ts
git commit -m "feat: add shipping threshold SSOT; checkout imports it"
```

---

### Task 5: Cart carries `fit`

**Files:**
- Modify: `src/contexts/CartContext.tsx` (stashed in Task 0 - now at clean baseline)
- Test: `src/contexts/cartReducer.test.ts`

**Interface change:** `removeItem` and `updateQuantity` gain a trailing `fit?: Fit` argument. The only call sites are in `CartDrawer.tsx` (Task 6). The reducer identity key gains `fit` so a Men's M and a Women's M never collapse. `style` is deliberately NOT added to the identity key - that is separate box WIP, out of scope.

- [ ] **Step 1: Export the reducer and write the failing test**

First, make the reducer testable. In `src/contexts/CartContext.tsx`, change the reducer declaration from `function cartReducer(` (or `const cartReducer =`) to `export function cartReducer(`. (If it is currently a `const`, change to `export const cartReducer = ...`.) Also ensure the `CartItem` type and the reducer's action union are exported (`CartItem` is already `export interface CartItem`).

Create `src/contexts/cartReducer.test.ts`:
```ts
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

const empty = { items: [] as CartItem[], isOpen: false };

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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/contexts/cartReducer.test.ts`
Expected: FAIL - the reducer still ignores `fit`, so the "two lines" test fails (gets 1 line / merged), and REMOVE/UPDATE payloads lack `fit` in the type.

- [ ] **Step 3: Add `fit` to `CartItem`**

In `src/contexts/CartContext.tsx`, import the type and add the field. At the top, add:
```ts
import type { Fit } from "@/data/products";
```
In the `CartItem` interface, add after `style?` (or after `image` if `style` is absent at this baseline - it was stashed, so the baseline `CartItem` may not have `style`; add `fit` after `image`):
```ts
  // Garment fit. Missing is treated as 'mens'.
  fit?: Fit;
```

- [ ] **Step 4: Add `fit` to the reducer identity key in all three cases**

In `cartReducer`, update the match predicate in `ADD_ITEM` (findIndex), `REMOVE_ITEM` (filter), and `UPDATE_QUANTITY` (filter for qty<=0 AND the map). In each predicate, append the fit comparison so it reads:
```ts
item.productSlug === action.payload.productSlug &&
item.color === action.payload.color &&
item.size === action.payload.size &&
(item.fit ?? "mens") === (action.payload.fit ?? "mens")
```
Apply this to every one of the four predicate occurrences (ADD_ITEM findIndex; REMOVE_ITEM filter; UPDATE_QUANTITY qty<=0 filter; UPDATE_QUANTITY map). The `?? "mens"` keeps legacy lines (no fit) stable.

- [ ] **Step 5: Update the action payload types**

The `REMOVE_ITEM` and `UPDATE_QUANTITY` action payloads must allow an optional `fit`. In the reducer's action type union (the `type CartAction = ...`), update:
```ts
| { type: "REMOVE_ITEM"; payload: { productSlug: string; color: string; size: string; fit?: Fit } }
| { type: "UPDATE_QUANTITY"; payload: { productSlug: string; color: string; size: string; fit?: Fit; quantity: number } }
```
(Match the existing union's exact shape; add `fit?: Fit` to these two payloads only.)

- [ ] **Step 6: Update the context value signatures and dispatchers**

In `interface CartContextValue`, change:
```ts
removeItem: (productSlug: string, color: string, size: string, fit?: Fit) => void;
updateQuantity: (productSlug: string, color: string, size: string, fit?: Fit, quantity?: number) => void;
```
Wait - `updateQuantity` needs `quantity` required. Use a fixed arg order with `fit` before `quantity`:
```ts
removeItem: (productSlug: string, color: string, size: string, fit?: Fit) => void;
updateQuantity: (productSlug: string, color: string, size: string, fit: Fit | undefined, quantity: number) => void;
```
And update the concrete functions in the provider to dispatch the new payloads:
```ts
const removeItem = (productSlug: string, color: string, size: string, fit?: Fit) =>
  dispatch({ type: "REMOVE_ITEM", payload: { productSlug, color, size, fit } });

const updateQuantity = (
  productSlug: string,
  color: string,
  size: string,
  fit: Fit | undefined,
  quantity: number,
) => dispatch({ type: "UPDATE_QUANTITY", payload: { productSlug, color, size, fit, quantity } });
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run src/contexts/cartReducer.test.ts`
Expected: all PASS. (localStorage round-trips `fit` automatically because persistence serializes the whole `CartItem`.)

- [ ] **Step 8: Type-check**

Run: `npx tsc --noEmit`
Expected: errors ONLY in `src/components/CartDrawer.tsx` at the `removeItem` / `updateQuantity` call sites (they now need the `fit` arg). That is expected and fixed in Task 6. If any OTHER file errors, stop and investigate.

- [ ] **Step 9: Commit**

```bash
git add src/contexts/CartContext.tsx src/contexts/cartReducer.test.ts
git commit -m "feat: cart carries fit; reducer keys mens vs womens as distinct lines"
```

---

### Task 6: CartDrawer - fit label, updated call sites, free-ship progress via SSOT

**Files:**
- Modify: `src/components/CartDrawer.tsx` (stashed in Task 0 - clean baseline)

- [ ] **Step 1: Import the shipping SSOT**

At the top of `src/components/CartDrawer.tsx`, add:
```ts
import {
  FREE_SHIPPING_THRESHOLD_DOLLARS,
  remainingToFreeShip,
  hasFreeShipping,
} from "@/lib/shipping";
```

- [ ] **Step 2: Replace the local threshold + derived values with the SSOT**

Replace the local constant (currently line 13) `const FREE_SHIPPING_THRESHOLD = 75;` and the derived block (currently lines 115-120):
```ts
const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
const freeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
```
with:
```ts
const remaining = remainingToFreeShip(subtotal);
const freeShippingUnlocked = hasFreeShipping(subtotal);
const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_DOLLARS) * 100);
```
Remove the now-unused local `const FREE_SHIPPING_THRESHOLD = 75;`.

- [ ] **Step 3: Ensure the progress-bar copy is brand-honest**

Locate the JSX that renders the progress message (it references `remaining` and `freeShippingUnlocked`). Ensure the two states read exactly (no em dash, no exclamation point):
- Under threshold: `{`You are $${remaining.toFixed(0)} away from free shipping`}`
- Unlocked: `You have unlocked free shipping`

If the existing text differs (e.g. uses "Add $X more!" or an em dash), replace it with the two strings above.

- [ ] **Step 4: Add the `fit` argument to the cart line React key and call sites**

Update the line wrapper key (currently line 202) to include fit:
```tsx
key={`${item.productSlug}-${item.color}-${item.size}-${item.fit ?? "mens"}`}
```
Update the decrement call (currently line 236):
```tsx
onClick={() => updateQuantity(item.productSlug, item.color, item.size, item.fit, item.quantity - 1)}
```
Update the increment call (currently line 248):
```tsx
onClick={() => updateQuantity(item.productSlug, item.color, item.size, item.fit, item.quantity + 1)}
```
Update the remove call (currently line 258):
```tsx
onClick={() => removeItem(item.productSlug, item.color, item.size, item.fit)}
```

- [ ] **Step 5: Render a fit label on each line**

In the per-item detail block (currently lines 219-226), directly below the color/size line (`{item.color} / {item.size}`), add:
```tsx
{item.fit && (
  <p className="font-mono text-[10px] tracking-[0.12em] text-white/50 mt-1 uppercase">
    {item.fit === "womens" ? "Women's Fit" : "Men's Fit"}
  </p>
)}
```

- [ ] **Step 6: Thread `fit` into the checkout request payload**

Find where CartDrawer builds the checkout body (the map over `items` that sends `style: i.style ?? "standard"` to `/api/checkout`; at this clean baseline `style` may be absent - in that case find the object that sends `slug`/`color`/`size`/`sleeve`). In that per-item object, add:
```ts
fit: i.fit ?? "mens",
```
(If a `style` field is present here at baseline it was part of WIP and is stashed; do not re-add it. Add only `fit`.)

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (the Task 5 call-site errors are now resolved). The checkout `fit` field will be consumed in Task 12.

- [ ] **Step 8: Commit**

```bash
git add src/components/CartDrawer.tsx
git commit -m "feat: cart drawer shows fit label, sends fit, free-ship bar from SSOT"
```

---

### Task 7: Reusable `PriceTag` (current + struck compare + SAVE)

**Files:**
- Create: `src/components/PriceTag.tsx`

This one component is reused by ProductCard, CollectionCards, and all four showcases (Tasks 8-11) so the compare/SAVE treatment is DRY and consistent.

- [ ] **Step 1: Create the component**

Create `src/components/PriceTag.tsx`:
```tsx
import { getSavings } from "@/data/products";

interface PriceTagProps {
  /** Current (authoritative-display) price in dollars. */
  price: number;
  /** Former price; struck through + drives the SAVE flag. Display-only. */
  compareAt?: number;
  /** "from" prefix for multi-sleeve cards. */
  prefix?: string;
  variant?: "card" | "pdp";
}

/**
 * Honest price display. Renders the current price, an optional struck former
 * price, and a SAVE $X flag - but ONLY when a real former price exceeds the
 * current price. No anchor => clean single price, no flag.
 */
export default function PriceTag({ price, compareAt, prefix, variant = "card" }: PriceTagProps) {
  const savings = getSavings(price, compareAt);
  const onSale = savings > 0;
  const big = variant === "pdp";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={
          big
            ? "font-mono text-base tracking-wide text-white"
            : "font-mono text-[12px] tracking-wide text-white/85"
        }
      >
        {prefix ? `${prefix} ` : ""}${price.toFixed(2)}
      </span>
      {onSale && (
        <>
          <span
            className={
              big
                ? "font-mono text-sm text-white/40 line-through"
                : "font-mono text-[12px] text-white/40 line-through"
            }
          >
            ${compareAt!.toFixed(2)}
          </span>
          <span
            className={
              big
                ? "font-mono text-[11px] tracking-[0.12em] uppercase text-[#9bbf5f] border border-[#5f7d33] rounded px-1.5 py-0.5"
                : "font-mono text-[10px] tracking-[0.1em] uppercase text-[#9bbf5f] border border-[#5f7d33] rounded px-1 py-0.5"
            }
          >
            Save ${savings.toFixed(0)}
          </span>
        </>
      )}
    </span>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PriceTag.tsx
git commit -m "feat: reusable PriceTag (current + struck compare + honest SAVE flag)"
```

---

### Task 8: Compare-at on ProductCard

**Files:**
- Modify: `src/components/ProductCard.tsx`

- [ ] **Step 1: Add the `fit` prop and compare imports**

In `src/components/ProductCard.tsx`, update the imports (line 3) and props (lines 5-10):
```ts
import { getDisplayPrice, getDisplayCompareAtPrice, type Product, type Fit } from "@/data/products";
import PriceTag from "@/components/PriceTag";
```
```ts
interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onModelFront?: string;
  onModelBack?: string;
  /** When set, the card links to the PDP pre-set to this fit. */
  fit?: Fit;
}
```
Add `fit` to the destructure (lines 28-33):
```ts
export default function ProductCard({
  product,
  priority = false,
  onModelFront,
  onModelBack,
  fit,
}: ProductCardProps) {
```

- [ ] **Step 2: Carry fit in the PDP link href**

Change the `<Link href>` (line 38) from:
```tsx
href={`/products/${product.slug}`}
```
to:
```tsx
href={fit ? `/products/${product.slug}?fit=${fit}` : `/products/${product.slug}`}
```

- [ ] **Step 3: Replace the price block with PriceTag**

Replace the price `<span>` block (lines 92-101, the `<span className="flex items-center gap-2">...</span>` that currently renders `fromPrice(product)` plus the inline `compareAtPrice` strikethrough) with:
```tsx
<PriceTag
  prefix="From"
  price={Number(fromPrice(product).match(/[\d.]+/)?.[0] ?? product.price)}
  compareAt={getDisplayCompareAtPrice(product)}
/>
```
Note: `fromPrice` returns e.g. `"FROM $29.99"`; the regex extracts the numeric. The `prefix="From"` re-adds the label via PriceTag, so keep PriceTag's own prefix and drop the old `FROM` from the number. The displayed result is `From $29.99  $34.99  Save $5`.

The old local `fromPrice` helper (lines 19-26) can stay (it still resolves the numeric); the inline `product.compareAtPrice` strikethrough is now removed because PriceTag handles it via `getDisplayCompareAtPrice` (which covers both per-sleeve collections AND the crop's product-level field).

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat: ProductCard shows compare-at + SAVE, can carry fit to PDP"
```

---

### Task 9: `/men` and `/women` category routes

**Files:**
- Create: `src/app/men/page.tsx`
- Create: `src/app/women/page.tsx`

Pure server components (no client needed - ProductCard is server-renderable). They reuse ProductCard with gender-specific on-model shots and `fit` so each card opens the PDP pre-set.

- [ ] **Step 1: Create `/men`**

Create `src/app/men/page.tsx`:
```tsx
import type { Metadata } from "next";
import { getProduct } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Men's | Alpha Omega Strength Team",
  description:
    "Men's faith-forged training gear. Warpaint, Unbreakable, and Cornerstone, cut for men. Built to train in, built to believe in.",
};

const MENS = [
  { slug: "ao-warpaint", front: "/images/models/warpaint/man-front.webp", back: "/images/models/warpaint/man-back.webp" },
  { slug: "ao-unbreakable", front: "/images/models/unbreakable/man-front.webp", back: "/images/models/unbreakable/man-back.webp" },
  { slug: "ao-cornerstone", front: "/images/models/cornerstone/man-front.webp", back: "/images/models/cornerstone/man-back.webp" },
];

export default function MensPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 pt-16 pb-24">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">The Strength Team</p>
        <h1 className="mt-2 font-sans font-black text-5xl md:text-7xl uppercase tracking-tight text-white">Men's</h1>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENS.map(({ slug, front, back }, i) => {
            const product = getProduct(slug);
            if (!product) return null;
            return (
              <ProductCard
                key={slug}
                product={product}
                priority={i < 3}
                onModelFront={front}
                onModelBack={back}
                fit="mens"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create `/women`**

Create `src/app/women/page.tsx`:
```tsx
import type { Metadata } from "next";
import { getProduct } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Women's | Alpha Omega Strength Team",
  description:
    "Women's faith-forged training gear. Warpaint, Unbreakable, Cornerstone, and the Cornerstone Crop, cut for women. Built to train in, built to believe in.",
};

const WOMENS = [
  { slug: "ao-warpaint", front: "/images/models/warpaint/woman-front.webp", back: "/images/models/warpaint/woman-back.webp" },
  { slug: "ao-unbreakable", front: "/images/models/unbreakable/woman-front.webp", back: "/images/models/unbreakable/woman-back.webp" },
  { slug: "ao-cornerstone", front: "/images/models/cornerstone/woman-front.webp", back: "/images/models/cornerstone/woman-back.webp" },
  { slug: "ao-croptop", front: "/images/models/croptop/woman-front.webp", back: undefined },
];

export default function WomensPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 pt-16 pb-24">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">The Strength Team</p>
        <h1 className="mt-2 font-sans font-black text-5xl md:text-7xl uppercase tracking-tight text-white">Women's</h1>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WOMENS.map(({ slug, front, back }, i) => {
            const product = getProduct(slug);
            if (!product) return null;
            return (
              <ProductCard
                key={slug}
                product={product}
                priority={i < 3}
                onModelFront={front}
                onModelBack={back}
                fit="womens"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
```
Note: the crop card passes `back={undefined}` because `croptop/woman-back.webp` does not exist; ProductCard renders front-only when `onModelBack` is absent. The crop's PDP ignores `?fit` (it is always womens), which is correct - harmless.

- [ ] **Step 3: Type-check and verify routes build**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/men/page.tsx src/app/women/page.tsx
git commit -m "feat: add /men and /women category routes with gendered model shots"
```

---

### Task 10: Showcases stamp `fit` + accept `defaultFit`; product pages read `?fit`

**Files:**
- Modify: `src/components/WarpaintShowcase.tsx`, `src/components/UnbreakableShowcase.tsx`, `src/components/CornerstoneShowcase.tsx` (Warpaint + Cornerstone were stashed in Task 0 - clean baseline; Unbreakable was never WIP)
- Modify: `src/components/CropTopShowcase.tsx`
- Modify: `src/app/products/ao-warpaint/page.tsx`, `ao-unbreakable/page.tsx`, `ao-cornerstone/page.tsx`, `ao-croptop/page.tsx`

For Warpaint, Unbreakable, Cornerstone the existing `heroGender: "him" | "her"` toggle becomes the live fit selector (him -> mens, her -> womens) and is seeded from `defaultFit`. Crop is always womens.

- [ ] **Step 1: Warpaint - accept `defaultFit`, seed the toggle, stamp fit on add**

In `src/components/WarpaintShowcase.tsx`:
1. Add the import and prop. Change the component signature:
```tsx
import type { Fit } from "@/data/products";
```
```tsx
export default function WarpaintShowcase({ defaultFit }: { defaultFit?: Fit }) {
```
2. Seed `heroGender` from `defaultFit` (the state declaration is at line 124):
```tsx
const [heroGender, setHeroGender] = useState<"him" | "her">(
  defaultFit === "womens" ? "her" : "him",
);
```
3. In `handleAddToBag` (lines 352-364), add `fit` to the `addItem(...)` payload:
```tsx
addItem({
  productSlug: `${PRODUCT_SLUG}-${sleeve}-sleeve`,
  name: `${PRODUCT_NAME} ${sleeve === "long" ? "Long Sleeve" : "Short Sleeve"}`,
  price,
  color: `${activeVariant.garmentColor} / ${activeVariant.printColor} Print`,
  size,
  quantity: 1,
  image: activeVariant.image,
  fit: heroGender === "her" ? "womens" : "mens",
});
```

- [ ] **Step 2: Unbreakable - same three edits**

In `src/components/UnbreakableShowcase.tsx`: add the `Fit` import, change the signature to `export default function UnbreakableShowcase({ defaultFit }: { defaultFit?: Fit })`, seed `heroGender` (its state is near line 99) the same way, and add `fit: heroGender === "her" ? "womens" : "mens"` to its `addItem` payload.

- [ ] **Step 3: Cornerstone - same three edits, preserving the existing `style` field**

In `src/components/CornerstoneShowcase.tsx`: add the `Fit` import, change the signature to `export default function CornerstoneShowcase({ defaultFit }: { defaultFit?: Fit })`, seed `heroGender` (line 124) the same way, and add `fit` to the `addItem` payload (lines 359-375) WITHOUT touching the existing `style` field:
```tsx
addItem({
  productSlug: `${PRODUCT_SLUG}-${sleeve}-sleeve`,
  name:
    style === "box"
      ? `${PRODUCT_NAME} Oversized Box, ${sleeve === "long" ? "Long Sleeve" : "Short Sleeve"}`
      : `${PRODUCT_NAME} ${sleeve === "long" ? "Long Sleeve" : "Short Sleeve"}`,
  price,
  color: `${activeVariant.garmentColor} / ${activeVariant.printColor} Print`,
  size,
  quantity: 1,
  image: activeVariant.image,
  style,
  fit: heroGender === "her" ? "womens" : "mens",
});
```
> Note: at the Task 0 clean baseline, Cornerstone's `style` toggle and `style` field WERE box WIP and are stashed. If `style` is NOT present in the baseline file, do NOT add it - just add `fit`. Only keep `style` if it already exists in the file you are editing.

- [ ] **Step 4: CropTop - always womens**

In `src/components/CropTopShowcase.tsx`, in `handleAddToBag` (lines 256-268), add `fit: "womens"` to the `addItem` payload. The crop has no gender toggle; it is women-only by definition. (You may add `{ defaultFit }: { defaultFit?: Fit }` to the signature and ignore it, for a uniform prop interface.)

- [ ] **Step 5: Product pages read `?fit` and pass `defaultFit`**

For each of the four product pages, make the component `async`, accept `searchParams`, validate, and pass `defaultFit`. Example for `src/app/products/ao-warpaint/page.tsx` (replace the function at the bottom, lines 21-23):
```tsx
export default async function AoWarpaintPage({
  searchParams,
}: {
  searchParams: Promise<{ fit?: string }>;
}) {
  const { fit } = await searchParams;
  const defaultFit = fit === "womens" ? "womens" : fit === "mens" ? "mens" : undefined;
  return <WarpaintShowcase defaultFit={defaultFit} />;
}
```
Apply the identical pattern to `ao-unbreakable/page.tsx` (-> `UnbreakableShowcase`), `ao-cornerstone/page.tsx` (-> `CornerstoneShowcase`), and `ao-croptop/page.tsx` (-> `CropTopShowcase defaultFit={defaultFit}`; crop ignores it). Keep each page's existing `metadata` export unchanged.

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/WarpaintShowcase.tsx src/components/UnbreakableShowcase.tsx src/components/CornerstoneShowcase.tsx src/components/CropTopShowcase.tsx src/app/products/ao-warpaint/page.tsx src/app/products/ao-unbreakable/page.tsx src/app/products/ao-cornerstone/page.tsx src/app/products/ao-croptop/page.tsx
git commit -m "feat: showcases seed fit from /men /women entry and stamp fit on add"
```

---

### Task 11: Compare-at price on the showcases (PDP) and CollectionCards

**Files:**
- Modify: `src/components/WarpaintShowcase.tsx`, `src/components/UnbreakableShowcase.tsx`, `src/components/CornerstoneShowcase.tsx`, `src/components/CropTopShowcase.tsx`
- Modify: `src/components/CollectionCards.tsx`

- [ ] **Step 1: Add a compare-at price to each standard showcase PDP price block**

In `WarpaintShowcase.tsx`, `UnbreakableShowcase.tsx`, `CornerstoneShowcase.tsx`:
1. Add imports:
```tsx
import { getCompareAtPrice } from "@/data/products";
import PriceTag from "@/components/PriceTag";
```
2. Find where the current price is displayed in the JSX (search for the `price` variable rendered as `${price}` or `$${price.toFixed(2)}`). Replace that price element with:
```tsx
<PriceTag
  variant="pdp"
  price={price}
  compareAt={getCompareAtPrice(PRODUCT_SLUG, sleeve)}
/>
```
`PRODUCT_SLUG` is the base slug constant already defined in each showcase (e.g. `"ao-warpaint"`); `sleeve` is the active sleeve state. PriceTag renders `$29.99  $34.99  Save $5` on short, `$34.99  $39.99  Save $5` on long.

- [ ] **Step 2: Crop showcase PDP price block**

In `CropTopShowcase.tsx`, add the same two imports, then replace the price display with:
```tsx
<PriceTag variant="pdp" price={PRODUCT_PRICE} compareAt={getCompareAtPrice("ao-croptop")} />
```
`PRODUCT_PRICE` is the crop's price constant (25.99). Result: `$25.99  $34.99  Save $9`.

- [ ] **Step 3: CollectionCards dynamic price + compare**

In `src/components/CollectionCards.tsx`:
1. Add imports:
```tsx
import { getProduct, getDisplayPrice, getDisplayCompareAtPrice } from "@/data/products";
import PriceTag from "@/components/PriceTag";
```
2. Replace the static price span (lines 306-308, the `<span className="font-mono text-sm text-white/60">{PRICE_LABEL}</span>`) with a dynamic PriceTag keyed off the card's collection slug. Inside the card render where `config.slug` is in scope, compute and render:
```tsx
{(() => {
  const product = getProduct(config.slug);
  if (!product) return <span className="font-mono text-sm text-white/60">{PRICE_LABEL}</span>;
  const current = Number(getDisplayPrice(product).match(/[\d.]+/)?.[0] ?? product.price);
  return <PriceTag prefix="From" price={current} compareAt={getDisplayCompareAtPrice(product)} />;
})()}
```
You may now remove the unused `PRICE_LABEL` constant (line 31) if no other reference remains; if it is still referenced by the fallback above, keep it.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/WarpaintShowcase.tsx src/components/UnbreakableShowcase.tsx src/components/CornerstoneShowcase.tsx src/components/CropTopShowcase.tsx src/components/CollectionCards.tsx
git commit -m "feat: honest compare-at + SAVE on PDP price blocks and collection cards"
```

---

### Task 12: Top nav adds MEN / WOMEN

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Prepend MEN and WOMEN to NAV_ITEMS**

In `src/components/Header.tsx`, change `NAV_ITEMS` (line 10):
```ts
const NAV_ITEMS = ["MEN", "WOMEN", "SHOP", "JOURNAL", "ABOUT", "TITHE", "CONTACT"];
```
The existing href logic `item === "JOURNAL" ? "/blog" : `/${item.toLowerCase()}`` already maps `MEN -> /men` and `WOMEN -> /women`. No other change needed for routing.

- [ ] **Step 2: Verify mobile menu spacing**

The mobile menu (lines 142-152) maps the same `NAV_ITEMS`. With two more items, confirm the menu still fits. If the items use a fixed-height container that would clip 7 entries, change it to scroll or reduce vertical gap. (Inspect during `npm run build` / manual smoke in Task 16. No code change required if the menu already flows.)

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add MEN and WOMEN to primary nav"
```

---

### Task 13: Homepage "Shop by Fit" block

**Files:**
- Create: `src/components/ShopByFit.tsx`
- Modify: `src/components/MainHome.tsx`

- [ ] **Step 1: Create the ShopByFit section**

Create `src/components/ShopByFit.tsx`:
```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const TILES = [
  { label: "Men's", href: "/men", image: "/images/models/warpaint/man-front.webp" },
  { label: "Women's", href: "/women", image: "/images/models/warpaint/woman-front.webp" },
  { label: "Shop All", href: "/shop", image: "/images/lifestyle/couple-walkout.webp" },
];

export default function ShopByFit() {
  return (
    <section className="relative py-20 md:py-24 bg-[#0a0a0a]">
      <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight text-white mb-12"
        >
          Shop by Fit
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={tile.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-white/10"
              >
                <Image
                  src={tile.image}
                  alt={`${tile.label} collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-sans font-black text-3xl uppercase tracking-tight text-white">
                    {tile.label}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-white/80">
                    Shop Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="translate-x-0 group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount it under New Arrivals, behind the same gate**

In `src/components/MainHome.tsx`:
1. Add the import near the other component imports:
```tsx
import ShopByFit from "@/components/ShopByFit";
```
2. The New Arrivals `<section>` closes at line 334 and is wrapped in `{!PURCHASE_LOCKED && ( ... )}`. Immediately after that closing `)}` (line 335) and before the CAMPAIGN BANNER section (line 340), insert:
```tsx
{!PURCHASE_LOCKED && <ShopByFit />}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ShopByFit.tsx src/components/MainHome.tsx
git commit -m "feat: homepage Shop by Fit block (Men's / Women's / Shop All)"
```

---

### Task 14: Persistent free-ship + sale top bar

**Files:**
- Modify: `src/components/AnnouncementBar.tsx`

- [ ] **Step 1: Source the threshold from the SSOT and add honest sale framing**

In `src/components/AnnouncementBar.tsx`, add the import:
```ts
import { FREE_SHIPPING_THRESHOLD_CENTS, dollars } from "@/lib/shipping";
```
Replace the non-locked branch content (the `FREE SHIPPING ON ORDERS OVER $75 // JOIN THE STRENGTH TEAM` block) with a version that reads the SSOT threshold and references the real launch markdown (no fabricated percentage):
```tsx
<>
  FREE US SHIPPING OVER {dollars(FREE_SHIPPING_THRESHOLD_CENTS)}
  <span className="text-white/30 mx-2">//</span>
  LAUNCH DROP PRICING IS LIVE
</>
```
Keep the `PURCHASE_LOCKED` branch exactly as-is (it already respects the coming-soon gate). The copy uses ASCII only, no em dash, no exclamation point.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AnnouncementBar.tsx
git commit -m "feat: top bar shows free-ship from SSOT + honest launch-drop framing"
```

---

### Task 15: Fit through checkout -> Stripe metadata

**Files:**
- Modify: `src/app/api/checkout/route.ts` (clean baseline from Task 0)

- [ ] **Step 1: Add `fit` to `CheckoutItem`**

In `src/app/api/checkout/route.ts`, import the type and extend `CheckoutItem` (lines 38-52):
```ts
import { type Sleeve, type Fit } from '@/data/products';
```
(merge `Fit` into the existing products import if one exists). Add to `CheckoutItem`:
```ts
  // Garment fit for fulfillment. Never affects price. Missing => 'mens'.
  fit?: Fit;
```

- [ ] **Step 2: Stamp `fit` into the Stripe line-item metadata**

In the `metadata` object (lines 151-159), add a `fit` entry:
```ts
metadata: {
  collection: product.name,
  base_slug: baseSlug,
  color: item.color,
  size: item.size,
  sleeve: sleeveLabel || 'n/a',
  fit: item.fit ?? 'mens',
  garment_color: garmentColor,
  emblem_color: emblemColor || 'n/a',
  variant_image: variantImage,
},
```
> If the clean baseline still contains a `style:` line here, it was box WIP and is stashed - do NOT re-add `style`. Add only `fit`.

- [ ] **Step 3: Append fit to the human description for womens lines**

Change the `description` (line 149) to surface women's fit on the receipt:
```ts
description: `${item.color} / ${item.size}${sleeveLabel ? ` / ${sleeveLabel}` : ''}${item.fit === 'womens' ? " / Women's Fit" : ''}`,
```
(Pricing is untouched - `getAuthoritativeUnitPrice` remains the sole authority; `fit` never feeds price.)

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/checkout/route.ts
git commit -m "feat: checkout stamps fit into Stripe line metadata + receipt description"
```

---

### Task 16: Fit read back in the webhook

**Files:**
- Modify: `src/app/api/webhooks/stripe/route.ts` (clean baseline from Task 0)

- [ ] **Step 1: Read `metadata.fit` in `extractOrderDetails`**

In the line-items map (lines 113-152), after the `sleeveMeta` / `emblemMeta` reads, add:
```ts
const fitMeta = metadata.fit === 'womens' ? 'womens' : 'mens';
```
and add `fit: fitMeta as 'mens' | 'womens',` to the returned item object (next to `sleeve`, `garmentColor`, etc.).
> If a `styleMeta`/`style` line exists here at baseline it is stashed box WIP; do NOT re-add it. Add only `fit`.

- [ ] **Step 2: Pass `fit` into the FulfillmentOrder items mapping**

In the `items: order.lineItems.map(...)` block (lines 388-397), add `fit: i.fit,`:
```ts
items: order.lineItems.map((i) => ({
  collection: i.collection,
  sleeve: i.sleeve,
  garmentColor: i.garmentColor,
  emblemColor: i.emblemColor,
  fit: i.fit,
  size: i.size,
  quantity: i.quantity,
  imageUrl: i.variantImagePath ? `${SITE_URL}${i.variantImagePath}` : '',
})),
```
> Do NOT re-add `style:` if it is not in the clean baseline (stashed WIP).

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: an error in `src/lib/fulfillment-email.ts` only if `FulfillmentItem` lacks `fit` - resolved in Task 17. If the webhook itself errors on the `fit` field shape, re-check Step 1/2. Other files must be clean.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/webhooks/stripe/route.ts
git commit -m "feat: webhook reads fit from metadata into the fulfillment order"
```

---

### Task 17: Fit on Frank's work order (with TDD)

**Files:**
- Modify: `src/lib/fulfillment-email.ts` (clean baseline from Task 0)
- Test: `src/lib/fulfillment-email.test.ts`

- [ ] **Step 1: Write the failing test**

First identify the exported function that renders the work-order HTML (grep in the file for `export function` / `export const` returning the HTML string - e.g. `buildFulfillmentEmail` / `renderFulfillmentEmail`). Create `src/lib/fulfillment-email.test.ts` using that exported name (replace `buildFulfillmentEmail` below if the real name differs):
```ts
import { describe, it, expect } from "vitest";
import { buildFulfillmentEmail, type FulfillmentItem } from "./fulfillment-email";

const baseItem: Omit<FulfillmentItem, "fit"> = {
  collection: "AO Warpaint",
  sleeve: "short",
  garmentColor: "Black",
  emblemColor: "White",
  size: "M",
  quantity: 1,
  imageUrl: "",
};

// Minimal order shape; adjust the wrapper fields to match the real signature.
function render(items: FulfillmentItem[]): string {
  return buildFulfillmentEmail({
    orderNumber: "TEST-1",
    customerName: "Test Buyer",
    customerEmail: "t@example.com",
    items,
  } as Parameters<typeof buildFulfillmentEmail>[0]);
}

describe("fulfillment email FIT row", () => {
  it("renders WOMEN'S FIT and a women's-cut instruction for a womens line", () => {
    const html = render([{ ...baseItem, fit: "womens" }]);
    expect(html).toContain("WOMEN'S FIT");
    expect(html.toLowerCase()).toContain("women's-cut");
  });

  it("renders MEN'S FIT for a mens line", () => {
    const html = render([{ ...baseItem, fit: "mens" }]);
    expect(html).toContain("MEN'S FIT");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/fulfillment-email.test.ts`
Expected: FAIL - `FulfillmentItem` has no `fit`; no FIT row is rendered.

- [ ] **Step 3: Add `fit` to `FulfillmentItem`**

In `src/lib/fulfillment-email.ts`, add to the `FulfillmentItem` interface (lines 19-30):
```ts
  // Garment fit. 'womens' = pull the women's-cut equivalent blank. Missing => 'mens'.
  fit?: 'mens' | 'womens';
```

- [ ] **Step 4: Render a prominent FIT spec row**

In the per-item spec rows (lines 114-122), add a FIT row. Women's must be visually unmissable. Insert after the `Size` row, before `Quantity`:
```ts
${specRow('Fit', item.fit === 'womens'
  ? '<span style="display:inline-block;padding:2px 8px;background:#000;color:#fff;font-weight:800;letter-spacing:0.04em">WOMEN&#39;S FIT</span>'
  : "MEN&#39;S FIT")}
```
(The womens value is boxed/bold; the mens value is plain text. `&#39;` is the HTML apostrophe entity - keeps ASCII-only source and renders the curl-free straight quote.)

- [ ] **Step 5: Update the blank-reference logic for women's-cut**

In `blankForItem` (lines 83-89), add a women's-cut instruction. Change it to:
```ts
const blankForItem = (item: FulfillmentItem): string => {
  const long = isLongSleeve(item.sleeve);
  if (item.style === 'box') {
    return long ? BOX_BLANKS.long : BOX_BLANKS.short;
  }
  const base = long ? 'BC 3501 (retail fit)' : 'BC 3001 (retail fit)';
  if (item.fit === 'womens') {
    return `Women's-cut equivalent of ${base}`;
  }
  return base;
};
```
> If `item.style` does not exist on `FulfillmentItem` at the clean baseline (box WIP stashed), drop the `if (item.style === 'box')` branch - keep only the base + women's-cut logic. Do NOT re-introduce the box branch.

- [ ] **Step 6: Update Section 3 (Blank Reference) copy**

In the Section 3 copy block (lines 196-200), add a sentence on women's fit after the Standard tees line (ASCII only, no exclamation point):
```ts
<p style="..."><strong>Women's fit lines</strong> print on the women's-cut equivalent of the same Bella+Canvas blank (the FIT row on each item says WOMEN'S FIT). Match the size run to the women's-cut garment.</p>
```
> If the box WIP `Oversized Box tees` paragraph is NOT in the clean baseline, do not add it - it is stashed.

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run src/lib/fulfillment-email.test.ts`
Expected: both PASS. (If the test wrapper's order shape mismatched the real signature, adjust the `render()` helper's fields to match - the assertions on FIT row content stay.)

- [ ] **Step 8: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors anywhere (Task 16's pending dependency is now satisfied).

- [ ] **Step 9: Commit**

```bash
git add src/lib/fulfillment-email.ts src/lib/fulfillment-email.test.ts
git commit -m "feat: work order shows bold FIT row + women's-cut blank instruction"
```

---

### Task 18: Full verification + WIP-intact check

**Files:** none edited - verification only.

- [ ] **Step 1: Run the whole test suite**

Run: `npm test`
Expected: all tests across `products.test.ts`, `shipping.test.ts`, `cartReducer.test.ts`, `fulfillment-email.test.ts` PASS.

- [ ] **Step 2: Full production build**

Run: `npm run build`
Expected: build succeeds; `/men`, `/women`, and all `/products/*` routes compile. Resolve any type or build error before proceeding.

- [ ] **Step 3: Confirm the box WIP is still safely stashed and untouched**

Run: `git stash list`
Expected: the `box-tee-wip` stash from Task 0 is still present (one entry).

Run: `git status --short`
Expected: clean working tree for tracked source (all feature work is committed); only the unrelated untracked items from Task 0 remain. No box-WIP file is staged or committed in this branch's history.

Run: `git log --oneline feat/mens-womens-split-conversion --not main` (or `git log --oneline -18`)
Expected: the Task 1-17 feature commits, none mentioning box / oversized.

- [ ] **Step 4: Manual smoke checklist (hand to Pete; do not deploy)**

Run `npm run dev` and verify locally:
- Home: New Arrivals unchanged above; new "Shop by Fit" three-tile block below.
- `/men`: 3 cards (Warpaint, Unbreakable, Cornerstone) on male shots, each with compare-at + SAVE.
- `/women`: 4 cards incl. the Crop, on female shots.
- Click a `/women` card -> PDP opens with the "Her" toggle pre-selected; Add to Bag.
- Cart: the line shows "Women's Fit"; the free-ship progress bar reads "You are $X away from free shipping" then "You have unlocked free shipping" at $75.
- Top bar: "FREE US SHIPPING OVER $75 // LAUNCH DROP PRICING IS LIVE".
- (Optional, test-mode) complete a women's purchase and inspect the work-order email for the bold WOMEN'S FIT row and the women's-cut blank line.

- [ ] **Step 5: No commit.** Report completion to Pete. Deployment (push -> Netlify production) is a separate, Pete-gated step.

---

## Self-review (completed during authoring)

**Spec coverage:** Unit 1 -> Task 2; Unit 2 -> Task 5; Unit 3 -> Task 6; Unit 4 -> Task 10; Unit 5 -> Tasks 8/9/10; Unit 6 -> Task 12; Unit 7 -> Task 13; Unit 8 -> Task 4; Unit 9 -> Task 14; Unit 10 -> Tasks 3/7/8/11; Unit 11 -> Task 6; Unit 12 -> Task 15; Unit 13 -> Task 16; Unit 14 -> Task 17. All 14 units covered.

**Honesty guardrails:** compare-at is display-only (Task 3 explicitly tests `getAuthoritativeUnitPrice` is unchanged; PriceTag never feeds checkout). Threshold SSOT (Task 4) prevents drift. No fabricated reviews/timers/scarcity anywhere. ASCII-only copy throughout; no exclamation points in ops/fulfillment voice.

**WIP preservation:** Task 0 stashes the box WIP so every feature commit is clean and the WIP is recoverable; Tasks 6/10/15/16/17 each carry an explicit "do not re-add stashed `style`/box code" guard; Task 18 verifies the stash and history.

**Type consistency:** `Fit = 'mens' | 'womens'` defined once (Task 2) and imported everywhere. `getCompareAtPrice(slug, sleeveHint?)`, `getDisplayCompareAtPrice(product)`, `getSavings(price, compareAt?)` used with consistent signatures across Tasks 3/7/8/11. `removeItem(...ustomer, fit?)` / `updateQuantity(..., fit, quantity)` signatures defined in Task 5 and matched in Task 6.

**Known soft spots flagged for the implementer (bounded, not placeholders):** the exact price-display JSX inside each showcase (Task 11 Step 1) and the exact checkout-payload object in CartDrawer (Task 6 Step 6) are located by search because the showcase internals beyond the captured sections were not read line-by-line; the precise replacement code is fully specified in every case. The fulfillment email's exported render-function name (Task 17 Step 1) is confirmed by grep before the test is written.
