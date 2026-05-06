type GtagItem = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_variant?: string;
  item_category?: string;
};

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

function track(eventName: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackViewItem(product: {
  slug: string;
  name: string;
  price: number;
  category?: string;
}) {
  track("view_item", {
    currency: "USD",
    value: product.price,
    items: [
      {
        item_id: product.slug,
        item_name: product.name,
        price: product.price,
        quantity: 1,
        item_category: product.category,
      },
    ],
  });
}

export function trackAddToCart(item: {
  productSlug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}) {
  track("add_to_cart", {
    currency: "USD",
    value: item.price * item.quantity,
    items: [
      {
        item_id: item.productSlug,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_variant: `${item.color} / ${item.size}`,
      },
    ],
  });
}

export function trackBeginCheckout(items: GtagItem[], value: number) {
  track("begin_checkout", {
    currency: "USD",
    value,
    items,
  });
}

export function trackPurchase(params: {
  transactionId: string;
  value: number;
  items: GtagItem[];
  coupon?: string;
}) {
  track("purchase", {
    transaction_id: params.transactionId,
    currency: "USD",
    value: params.value,
    coupon: params.coupon,
    items: params.items,
  });
}
