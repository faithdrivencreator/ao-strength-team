import type { Metadata } from "next";
import WarpaintShowcase from "@/components/WarpaintShowcase";

export const metadata: Metadata = {
  title: "AO Warpaint Collection | Alpha Omega Strength Team",
  description:
    "The Warpaint Collection - Alpha and Omega marked in raw, hand-painted strokes. Short and long sleeve, warm stone series. Built to train in, built to believe in.",
  openGraph: {
    title: "AO Warpaint Collection | Alpha Omega Strength Team",
    description:
      "Alpha and Omega marked in raw, hand-painted strokes. Warm Stone Series. Short and long sleeve.",
    images: [
      {
        url: "/images/products/warpaint/long-sleeve/military-green-white.webp",
        width: 600,
        height: 600,
      },
    ],
  },
};

export default function AoWarpaintPage() {
  return <WarpaintShowcase />;
}
