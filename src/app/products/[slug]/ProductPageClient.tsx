"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

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
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const selectedVariant = product.variants[selectedColorIndex];
  const isSoldOut = product.status === "sold-out";

  function handleAddToCart() {
    if (isSoldOut || !selectedSize) return;

    addItem({
      productSlug: product.slug,
      name: product.name,
      price: product.price,
      color: selectedVariant.color,
      size: selectedSize,
      quantity,
      image: product.images[0],
    });

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
                      className={`relative w-20 h-26 flex-shrink-0 overflow-hidden border transition-colors duration-150 ${
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
              <p className="font-sans font-normal text-[20px] text-white/70 mt-3">
                ${product.price.toFixed(2)}
              </p>

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

              {/* Add to Cart */}
              <div className="mt-10">
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
              </div>

              {/* Description expandable */}
              <div className="mt-10 border-t border-white/10 pt-6">
                <button
                  onClick={() => setDescriptionOpen((o) => !o)}
                  className="flex items-center justify-between w-full"
                >
                  <span className="font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase">
                    // DESCRIPTION+
                  </span>
                  <span className="font-mono text-[14px] text-white/40">
                    {descriptionOpen ? "-" : "+"}
                  </span>
                </button>
                {descriptionOpen && (
                  <div className="mt-4">
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
                )}
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
