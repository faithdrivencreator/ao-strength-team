"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import NotifyDropModal from "@/components/NotifyDropModal";
import type { Product } from "@/data/products";
import { trackAddToCart, trackViewItem } from "@/lib/gtag";

const PURCHASE_LOCKED = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const { addItem, openCart } = useCart();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openPanel, setOpenPanel] = useState<string | null>("description");
  const [notifyOpen, setNotifyOpen] = useState(false);

  function togglePanel(id: string) {
    setOpenPanel((current) => (current === id ? null : id));
  }

  const selectedVariant = product.variants[selectedColorIndex];
  const isSoldOut = product.status === "sold-out";

  useEffect(() => {
    trackViewItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
    });
  }, [product.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAddToCart() {
    if (isSoldOut || !selectedSize) return;

    const cartItem = {
      productSlug: product.slug,
      name: product.name,
      price: product.price,
      color: selectedVariant.color,
      size: selectedSize,
      quantity,
      image: product.images[0],
    };

    addItem(cartItem);
    trackAddToCart(cartItem);
    openCart();
  }

  return (
    <div>
      {/* Product detail section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left: Image gallery (60%) */}
            <div className="w-full lg:w-[60%]">
              {/* Main image */}
              <div className="relative aspect-[3/4] overflow-hidden border border-white/10">
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  width={900}
                  height={1200}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      aria-label={`View image ${i + 1} of ${product.images.length}`}
                      className={`relative w-20 h-[107px] flex-shrink-0 overflow-hidden border transition-colors duration-150 ${
                        selectedImageIndex === i
                          ? "border-white"
                          : "border-white/10"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        width={80}
                        height={107}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product info (40%) */}
            <div className="w-full lg:w-[40%]">
              {/* Product name */}
              <h1 className="font-sans font-black text-[28px] md:text-[32px] uppercase tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <p className="font-sans font-normal text-[20px] text-white/70">
                  ${product.price.toFixed(2)}
                </p>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <p className="font-sans font-normal text-[16px] text-white/35 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </p>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60 border border-white/20 px-2 py-1">
                      Save ${(product.compareAtPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Color swatches */}
              <div className="mt-8">
                <p className="font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase mb-3">
                  // COLOR
                </p>
                <div className="flex gap-2">
                  {product.variants.map((variant, i) => (
                    <button
                      key={variant.color}
                      onClick={() => {
                        setSelectedColorIndex(i);
                        setSelectedSize(null);
                      }}
                      title={variant.color}
                      className={`w-6 h-6 rounded-full border transition-all duration-150 ${
                        selectedColorIndex === i
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black border-white/40"
                          : "border-white/20"
                      }`}
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  ))}
                </div>
                <p className="font-mono text-[11px] tracking-[0.1em] text-white/40 mt-2">
                  {selectedVariant.color}
                </p>
              </div>

              {/* Size selector */}
              <div className="mt-8">
                <p className="font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase mb-3">
                  // SIZE
                </p>
                <div className="flex gap-2">
                  {selectedVariant.sizes.map((size) => {
                    const unavailable = !selectedVariant.inStock;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          if (!unavailable) setSelectedSize(size);
                        }}
                        disabled={unavailable}
                        className={`w-10 h-10 flex items-center justify-center font-mono text-[12px] tracking-wide border transition-colors duration-150 ${
                          unavailable
                            ? "border-white/10 text-white/30 line-through cursor-not-allowed opacity-30"
                            : selectedSize === size
                              ? "bg-white text-black border-white"
                              : "border-white/20 text-white hover:border-white/40"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <p className="font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase mb-3">
                  // QUANTITY
                </p>
                <div className="flex items-center border border-white/20 w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-150"
                  >
                    -
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center font-mono text-[13px] border-x border-white/20">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-150"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA — Add to Cart, or Notify-Me when purchase is locked */}
              <div className="mt-10">
                {PURCHASE_LOCKED ? (
                  <button
                    onClick={() => setNotifyOpen(true)}
                    className="w-full h-12 font-sans font-bold text-[14px] uppercase tracking-wide transition-colors duration-150 bg-white text-black hover:bg-white/90"
                  >
                    Notify Me On Drop Day
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isSoldOut || !selectedSize}
                    className={`w-full h-12 font-sans font-bold text-[14px] uppercase tracking-wide transition-colors duration-150 ${
                      isSoldOut
                        ? "bg-white/10 text-white/30 cursor-not-allowed"
                        : !selectedSize
                          ? "bg-white/20 text-white/50 cursor-not-allowed"
                          : "bg-white text-black hover:bg-white/90"
                    }`}
                  >
                    {isSoldOut ? "SOLD OUT" : !selectedSize ? "SELECT A SIZE" : "ADD TO CART"}
                  </button>
                )}
                {PURCHASE_LOCKED && (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45 text-center">
                    // Official drop · {process.env.NEXT_PUBLIC_LAUNCH_DATE_LABEL || "May 25"}
                  </p>
                )}
              </div>

              {PURCHASE_LOCKED && (
                <NotifyDropModal
                  productSlug={product.slug}
                  productName={product.name}
                  open={notifyOpen}
                  onClose={() => setNotifyOpen(false)}
                />
              )}

              {/* Trust badges */}
              <ul
                aria-label="Order benefits"
                className="mt-6 grid grid-cols-1 md:grid-cols-3 border border-white/10"
              >
                <li className="px-4 py-4 md:border-r md:border-white/10 border-b md:border-b-0 border-white/10 last:border-b-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-white/65 leading-snug">
                    // 60-DAY RETURNS
                  </p>
                </li>
                <li className="px-4 py-4 md:border-r md:border-white/10 border-b md:border-b-0 border-white/10 last:border-b-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-white/65 leading-snug">
                    // FREE EXCHANGES
                  </p>
                </li>
                <li className="px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-white/65 leading-snug">
                    // SHIPS IN 2&ndash;3 DAYS
                  </p>
                </li>
              </ul>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                Free US shipping on orders $75+
              </p>

              {/* FAQ accordion — Description, Sizing, Shipping, Returns, Care */}
              <div className="mt-10 border-t border-white/10">
                {[
                  {
                    id: "description",
                    label: "DESCRIPTION",
                    body: (
                      <div>
                        <p className="font-sans text-[13px] font-light text-white/70 leading-relaxed">
                          {product.description}
                        </p>
                        <blockquote className="mt-4 pl-4 border-l border-white/20">
                          <p className="font-sans text-[13px] italic text-white/50 leading-relaxed">
                            &ldquo;{product.scripture}&rdquo;
                          </p>
                          <cite className="block font-mono text-[11px] tracking-[0.1em] text-white/30 mt-1 not-italic">
                            {product.scriptureRef}
                          </cite>
                        </blockquote>
                      </div>
                    ),
                  },
                  {
                    id: "sizing",
                    label: "SIZING & FIT",
                    body: (
                      <div className="space-y-3 font-sans text-[13px] font-light text-white/70 leading-relaxed">
                        <p>
                          Runs true to size. Most of the team wears their normal
                          size. If you prefer a relaxed fit, size up one. Between
                          sizes? Size up.
                        </p>
                        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/40">
                          // Chest (in): S 38&ndash;40 · M 41&ndash;43 · L 44&ndash;46 · XL 47&ndash;49 · 2XL 50&ndash;52 · 3XL 53&ndash;55
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: "shipping",
                    label: "SHIPPING",
                    body: (
                      <ul className="space-y-2 font-sans text-[13px] font-light text-white/70 leading-relaxed list-disc pl-5">
                        <li>Free US shipping on orders $75+.</li>
                        <li>Standard US orders ship in 2&ndash;3 business days via USPS.</li>
                        <li>Tracking emailed the moment your order leaves the facility.</li>
                        <li>International shipping rates calculated at checkout.</li>
                      </ul>
                    ),
                  },
                  {
                    id: "returns",
                    label: "RETURNS & EXCHANGES",
                    body: (
                      <ul className="space-y-2 font-sans text-[13px] font-light text-white/70 leading-relaxed list-disc pl-5">
                        <li>60-day returns on unworn, unwashed items with tags attached.</li>
                        <li>Free exchanges for size or color &mdash; we cover the return shipping.</li>
                        <li>Refunds processed within 5 business days of receipt.</li>
                        <li>Email returns@aostrengthteam.store to start.</li>
                      </ul>
                    ),
                  },
                  {
                    id: "care",
                    label: "CARE",
                    body: (
                      <ul className="space-y-2 font-sans text-[13px] font-light text-white/70 leading-relaxed list-disc pl-5">
                        <li>Machine wash cold with like colors, inside out.</li>
                        <li>Tumble dry low or hang dry to preserve fit and print.</li>
                        <li>Do not bleach. Do not iron print.</li>
                        <li>Built to last &mdash; care for it, train hard, repeat.</li>
                      </ul>
                    ),
                  },
                ].map((panel) => {
                  const isOpen = openPanel === panel.id;
                  return (
                    <div key={panel.id} className="border-b border-white/10">
                      <button
                        onClick={() => togglePanel(panel.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${panel.id}`}
                        className="flex items-center justify-between w-full py-5 text-left"
                      >
                        <span className="font-mono text-[11px] tracking-[0.1em] text-white/80 uppercase">
                          // {panel.label}
                        </span>
                        <span className="font-mono text-[16px] text-white/40 leading-none">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div id={`faq-${panel.id}`} className="pb-6 pr-2">
                          {panel.body}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="py-12 lg:py-20 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase mb-4">
            // RELATED
          </p>
          <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight mb-10">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
