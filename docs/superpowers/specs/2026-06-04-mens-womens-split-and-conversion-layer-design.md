# Men's / Women's Split + Brand-Safe Conversion Layer - Design

Date: 2026-06-04
Status: Approved for planning (pending Pete's spec review)
Author: Claude (with Pete Fluriach)

## 1. Goal

Give AO Strength Team a HolStrength-style storefront structure (Men's / Women's
category worlds) and fold in the honest, brand-safe pieces of HolStrength's
conversion playbook. Two outcomes:

1. Shoppers enter a Men's or Women's world. The three unisex collections appear
   in both, defaulting to the male or female on-model image accordingly. The
   women's world also carries the women-only Crop Top.
2. A women's order is fulfilled as a women's-cut garment: each line item carries
   a `fit` attribute that flows through cart -> checkout -> webhook -> the print
   partner work order, which shows a bold "FIT: WOMEN'S / MEN'S" row so Frank at
   Prodigy pulls the correct blank.
3. Layer in honest conversion mechanics: a persistent free-shipping + sale top
   bar, truthful compare-at pricing on the items that genuinely dropped on
   June 2, "SAVE" / "% OFF" flags, and a free-shipping progress bar in the cart.

## 2. Locked decisions

- **Entry model:** dedicated `/men` and `/women` routes + `MEN` and `WOMEN` in
  the top nav + a 3-card "Shop by Fit" block on the homepage (kept *below* the
  existing New Arrivals section, which stays).
- **Home cards:** three tiles - Men's, Women's, Shop All.
- **Women's fit:** flagged for Frank in the work order email. No blank SKU is
  printed; the email instructs the women's-cut equivalent. Frank maps it.
- **Sizes:** S-3XL for both men and women (women's = the cut/blank, not new size
  labels). Crop Top keeps its own S-2XL run.
- **Conversion scope:** full layer (top bar + compare-at + SAVE flags + cart
  free-ship progress bar).
- **Compare-at anchor:** the real June 2 pre-drop prices.
  - Standard collections (Warpaint, Unbreakable, Cornerstone): SS `$29.99`
    (was `$34.99`), LS `$34.99` (was `$39.99`).
  - Cornerstone Crop: `$25.99` (was `$34.99`).

## 3. Honesty / brand guardrails (non-negotiable)

- Compare-at prices MUST be the genuine former prices above. Never invent an
  anchor that was never charged. The `Product.compareAtPrice` field already
  documents this rule in `src/data/products.ts`.
- No fabricated review counts, no fake countdown timers, no false "only N left"
  scarcity. Real promo deadlines (e.g. an actual code expiry) are acceptable
  honest urgency; manufactured ones are not.
- All copy follows AO brand rules: ASCII hyphen only (no em/en dashes), no
  italic in brand prose, no false return/exchange/shipping claims.
- The free-ship threshold shown to customers MUST equal the real threshold in
  `src/app/api/checkout/route.ts` (currently `$75`, `FREE_SHIPPING_THRESHOLD_CENTS = 7500`).
  Single source of truth - see Unit 8.

## 4. Pre-existing WIP that must NOT be disturbed

The following files currently hold uncommitted "Oversized Box" tee WIP
(`src/data/box-tee.ts` is untracked). This feature layers on top of them:

- `src/app/api/checkout/route.ts` (+style metadata)
- `src/app/api/webhooks/stripe/route.ts`
- `src/components/CartDrawer.tsx`
- `src/components/CornerstoneShowcase.tsx`, `WarpaintShowcase.tsx`
- `src/contexts/CartContext.tsx`
- `src/lib/fulfillment-email.ts`

Rules: preserve every existing `style` / box code path untouched; add `fit`
alongside `style`, never in place of it. Commit this feature's changes
surgically (never `git add -A`); leave the box WIP uncommitted exactly as found.

## 5. Architecture - units of work

Each unit has one purpose, a defined interface, and is independently testable.

### Unit 1 - `fit` data type (foundation)
- Add `export type Fit = "mens" | "womens";` to a shared location
  (`src/data/products.ts` is the natural home, next to `Sleeve`).
- This is the single definition imported everywhere else. No behavior; pure type.

### Unit 2 - Cart carries `fit`
File: `src/contexts/CartContext.tsx`
- Add `fit?: Fit` to `CartItem` (optional; absent => treat as `"mens"` for
  display/fulfillment defaults, matching the unisex baseline).
- Add `fit` to the line-identity key in `ADD_ITEM`, `REMOVE_ITEM`,
  `UPDATE_QUANTITY` so a Men's M and a Women's M are distinct lines and never
  collapse. Update the `removeItem` / `updateQuantity` signatures + context
  value accordingly.
- Interface change ripples to any caller of `removeItem` / `updateQuantity`
  (CartDrawer) - update those call sites (Unit 3).
- Test: add same color/size/sleeve with differing `fit` => two lines; quantities
  update independently; localStorage round-trips `fit`.

### Unit 3 - CartDrawer shows fit
File: `src/components/CartDrawer.tsx`
- Render a small "Women's fit" / "Men's fit" label on each line (only when it
  adds signal; a men's-only cart need not shout "Men's fit" on every row -
  decide in build, but women's lines MUST be labeled).
- Pass `fit` through to `removeItem` / `updateQuantity` (new arg from Unit 2).
- Preserve existing `style` (box) rendering.

### Unit 4 - Showcases stamp `fit` + honor entry context
Files: `WarpaintShowcase.tsx`, `UnbreakableShowcase.tsx`, `CornerstoneShowcase.tsx`,
`CropTopShowcase.tsx`
- The existing `heroGender: "him" | "her"` toggle becomes the live **fit**
  selector, not just an image swap. Map `him -> mens`, `her -> womens`.
- `handleAddToBag` includes `fit` in the `addItem(...)` payload.
- Entry context default: the showcase accepts an optional `defaultFit` prop (or
  reads a context/query param - see Unit 5). `/women` entry => default `her` /
  `womens`; `/men` => `him` / `mens`. Absent context keeps today's default
  (`him`).
- Crop Top: always `womens`; no toggle (it is women-only by definition).
- Box style path is unchanged; `fit` is independent of `style`.
- Test: toggling Her then Add to Bag yields a cart line with `fit: "womens"`.

### Unit 5 - `/men` and `/women` routes + entry context
New: `src/app/men/page.tsx`, `src/app/women/page.tsx` (+ any shared client
component, e.g. `GenderLanding.tsx`).
- Category landing pages styled in AO's dark editorial system, reusing
  `ProductCard` and the existing `/images/models/<collection>/<man|woman>-front|back.webp`.
- `/men`: Warpaint, Unbreakable, Cornerstone - each card defaults to the **man**
  shot. `/women`: same three defaulting to the **woman** shot, **plus** the Crop
  Top card.
- Each card links to the product page carrying the fit context so the showcase
  opens pre-set (Unit 4). Mechanism options (pick in plan): query param
  `?fit=womens` read by the showcase, or a dedicated product route variant.
  Query param is the lightest and is the recommended approach.
- These are static/prerenderable like `/shop` (`revalidate` consistent with the
  existing shop route).
- Test: `/women` renders 4 cards incl. Crop with female shots; `/men` renders 3
  with male shots; clicking through pre-sets the showcase fit.

### Unit 6 - Top nav adds MEN / WOMEN
File: `src/components/Header.tsx`
- `NAV_ITEMS` becomes `["MEN", "WOMEN", "SHOP", "JOURNAL", "ABOUT", "TITHE", "CONTACT"]`
  (SHOP stays as Shop All). Existing link logic (`/${item.toLowerCase()}`) maps
  `MEN -> /men`, `WOMEN -> /women` for free. Verify mobile menu spacing with the
  two added items.

### Unit 7 - Homepage "Shop by Fit" block
File: `src/components/MainHome.tsx` (new section component, e.g.
`ShopByFit.tsx`, rendered after the New Arrivals section).
- Three editorial tiles: Men's (man shot), Women's (woman shot), Shop All
  (group/lifestyle shot, e.g. `couple-walkout.webp`), each with a "SHOP NOW"
  button linking to `/men`, `/women`, `/shop`.
- AO dark style, framer-motion reveals consistent with surrounding sections.
- New Arrivals section is untouched and stays above this block.

### Unit 8 - Shipping threshold single source of truth
New: a tiny shared module (e.g. `src/lib/shipping.ts`) exporting
`FREE_SHIPPING_THRESHOLD_CENTS = 7500` and helpers (`dollars`, `remainingToFreeShip`).
- Refactor `src/app/api/checkout/route.ts` to import the threshold instead of a
  local literal (no behavior change there).
- Consumed by the top bar (Unit 9) and cart progress bar (Unit 10) so the
  customer-facing number can never drift from what checkout enforces.

### Unit 9 - Persistent free-ship + sale top bar
File: existing `src/components/AnnouncementBar.tsx` (extend, don't duplicate).
- Content: free US shipping over `$75` + the current honest sale framing
  (e.g. "Faith-forged gear - now on the launch drop"). No fake percentages;
  reference the real markdown only.
- Persistent across pages; dismissible is optional. Must respect the
  coming-soon / purchase-locked gates already in the app.

### Unit 10 - Honest compare-at pricing + SAVE flags
Files: `src/data/products.ts` (data), `ProductCard.tsx`,
`CollectionCards.tsx`, and the showcase price displays.
- Data: add a per-sleeve compare map mirroring `SLEEVE_PRICES`:
  `SLEEVE_COMPARE_PRICES = { 'ao-warpaint': { short: 34.99, long: 39.99 }, ...same for unbreakable, cornerstone }`.
  Set `compareAtPrice: 34.99` on the Crop Top product (`ao-croptop`).
- Add a display helper `getCompareAtPrice(product, sleeve)` and extend
  `getDisplayPrice` (or add `getDisplayPriceWithCompare`) to return the current
  price + optional struck compare price. **Display only** - never feeds checkout.
  Checkout pricing stays driven by `getAuthoritativeUnitPrice` / `SLEEVE_PRICES`,
  unchanged.
- UI: show current price with the struck `was` price beside it, plus a
  `SAVE $X` (or `% OFF`) flag where a real markdown exists, on:
  - `ProductCard` (shop, /men, /women)
  - `CollectionCards` (homepage New Arrivals)
  - the showcase price block (PDP)
- Guard: a flag renders only when `compareAtPrice > price`. No anchor => no flag.
- Test: Warpaint SS card shows `$29.99` + `~~$34.99~~` + `SAVE $5`; an item with
  no compare-at shows a clean single price and no flag; checkout still charges
  the authoritative price.

### Unit 11 - Cart free-ship progress bar
File: `src/components/CartDrawer.tsx`
- Using the cart subtotal and the shared threshold (Unit 8), render a progress
  bar + honest copy: under threshold => "You are $X away from free shipping";
  at/over => "You have unlocked free shipping". No em dashes, no exclamation
  points consistent with AO ops voice.
- Test: subtotal `$60` shows "$15 away"; `$80` shows unlocked.

### Unit 12 - Fit through checkout -> Stripe metadata
File: `src/app/api/checkout/route.ts`
- Add `fit?: Fit` to `CheckoutItem`. Stamp `fit: item.fit ?? 'mens'` into the
  Stripe line-item `product_data.metadata` (alongside the existing `style`).
- Optionally append fit to the human `description` for the receipt
  (e.g. ".../ Women's Fit"). Does not affect price validation (fit never changes
  price). Box `style` path untouched.

### Unit 13 - Fit read back in webhook
File: `src/app/api/webhooks/stripe/route.ts`
- In `extractOrderDetails`, read `metadata.fit` (default `'mens'`) onto each
  line item, mirroring how `style` is read.
- Pass `fit` into the `FulfillmentOrder.items` mapping.

### Unit 14 - Fit on Frank's work order
File: `src/lib/fulfillment-email.ts`
- Add `fit?: Fit` to `FulfillmentItem`.
- Render a prominent **FIT** spec row per item: `WOMEN'S FIT` or `MEN'S FIT`.
  Women's rows should be visually unmissable (bold / boxed) since it changes the
  blank Frank pulls.
- Update Section 3 (Blank Reference) copy: standard men's lines = the existing
  BC 3001 / 3501 retail fit; **women's fit lines = Frank's women's-cut
  equivalent of the same blank** (no SKU printed). Keep box-blank rules intact.
- Maintain file rules: ASCII hyphen only, no exclamation points.
- Test: a women's line renders a clear WOMEN'S FIT row and the women's-cut
  instruction; a men's line renders MEN'S FIT and the standard blank.

## 6. Data flow (fit)

```
/women entry  ->  showcase defaultFit = womens  ->  Her toggle (live fit)
   ->  addItem({ ..., fit: "womens" })  (CartContext, fit in line key)
   ->  CartDrawer line labeled "Women's fit"
   ->  POST /api/checkout  (CheckoutItem.fit)  ->  Stripe line metadata.fit
   ->  webhook extractOrderDetails reads metadata.fit
   ->  fulfillment-email FIT row: "WOMEN'S FIT" + women's-cut blank instruction
   ->  Frank pulls the women's-cut garment
```

## 7. Out of scope (explicit)

- Real customer reviews / star widgets (no honest data yet) - scaffold later.
- Rewards program, wishlist/"save for later", Bundles, Recently-Viewed - future.
- Youth / Streetwear / Lifting categories (AO has no such SKUs).
- Any change to what a customer is actually charged.
- Touching, finishing, or committing the Oversized Box WIP.

## 8. Testing strategy

- Unit-level: cart reducer fit-keying; price/compare display helpers; webhook
  metadata read; fulfillment HTML contains the correct FIT row.
- Pipeline: a scripted women's add-to-bag asserts `fit: "womens"` survives to the
  Stripe payload (mock) and to the rendered fulfillment HTML.
- `node --check` on any touched JS; `tsc`/build passes.
- Manual smoke after deploy: `/men`, `/women`, homepage block, a women's
  test-mode purchase, and inspect the work-order email for the FIT row.
- Verify the box-tee WIP diff is still present and unchanged at the end.

## 9. Risks

- **Cart key change** must update every `removeItem`/`updateQuantity` call site
  or items become unremovable. Grep for all callers.
- **Compare-at must stay display-only.** A leak into checkout would mischarge.
  Keep `getAuthoritativeUnitPrice` the sole pricing authority.
- **WIP collision.** These are the exact files holding the box WIP; edits must be
  additive and committed surgically.
- **Threshold drift.** Top bar / progress bar must read the shared constant, not
  a copy.
