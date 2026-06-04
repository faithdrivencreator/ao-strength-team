import type { Metadata } from "next";
import CropTopShowcase from "@/components/CropTopShowcase";

export const metadata: Metadata = {
  title: "AO Cornerstone Crop | Alpha Omega Strength Team",
  description:
    "AO Cornerstone Crop - a flowy cropped tee carrying the boxed ALPHA, cross, OMEGA emblem on the chest and a cross at the nape. Modest crop, women's sizing S to 2XL, built to train in, built to believe in.",
  openGraph: {
    title: "AO Cornerstone Crop | Alpha Omega Strength Team",
    description:
      "The boxed Alpha and Omega mark, cross at center, on a flowy cropped tee. Women's sizing S to 2XL.",
    images: [
      {
        url: "/images/products/croptop/black-white-front.webp",
        width: 600,
        height: 600,
      },
    ],
  },
};

export default async function AoCropTopPage({
  searchParams,
}: {
  searchParams: Promise<{ fit?: string }>;
}) {
  const { fit } = await searchParams;
  const defaultFit = fit === "womens" ? "womens" : fit === "mens" ? "mens" : undefined;
  return <CropTopShowcase defaultFit={defaultFit} />;
}
