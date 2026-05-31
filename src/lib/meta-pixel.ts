// Meta (Facebook) Pixel client event helpers - AO Strength Team
//
// Mirrors the GA4 ecommerce events in src/lib/gtag.ts at the same call sites.
// Everything is a no-op when the Pixel base snippet has not loaded (i.e. when
// NEXT_PUBLIC_META_PIXEL_ID is not set), so the storefront stays clean and
// silent until Pete supplies the ID in Netlify. No console noise, no network.

type FbqOptions = { eventID?: string };

declare global {
  interface Window {
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>,
      options?: FbqOptions,
    ) => void;
    _fbq?: unknown;
  }
}

// Low-level tracker. Calls window.fbq when present, otherwise does nothing.
// An optional eventId is passed as fbq eventID so a client event can be
// deduplicated against its matching server-side CAPI event.
export function metaTrack(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (eventId) {
    window.fbq("track", event, params ?? {}, { eventID: eventId });
  } else {
    window.fbq("track", event, params ?? {});
  }
}

// ViewContent - mirrors GA4 view_item
export function metaViewContent(product: { slug: string; price: number }) {
  metaTrack("ViewContent", {
    content_ids: [product.slug],
    content_type: "product",
    value: product.price,
    currency: "USD",
  });
}

// AddToCart - mirrors GA4 add_to_cart
export function metaAddToCart(item: {
  productSlug: string;
  price: number;
  quantity: number;
}) {
  metaTrack("AddToCart", {
    content_ids: [item.productSlug],
    content_type: "product",
    value: item.price * item.quantity,
    currency: "USD",
  });
}

// InitiateCheckout - mirrors GA4 begin_checkout
export function metaInitiateCheckout(params: {
  contentIds: string[];
  value: number;
  numItems: number;
}) {
  metaTrack("InitiateCheckout", {
    content_ids: params.contentIds,
    content_type: "product",
    value: params.value,
    num_items: params.numItems,
    currency: "USD",
  });
}

// Purchase - mirrors GA4 purchase. The eventId (Stripe session id) is passed
// as fbq eventID so this client event dedupes against the server CAPI event.
export function metaPurchase(params: {
  eventId: string;
  value: number;
  contentIds: string[];
}) {
  metaTrack(
    "Purchase",
    {
      content_ids: params.contentIds,
      content_type: "product",
      value: params.value,
      currency: "USD",
    },
    params.eventId,
  );
}
