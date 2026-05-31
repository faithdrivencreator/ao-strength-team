import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrushstrokeShowcase from "@/components/BrushstrokeShowcase";

export const metadata: Metadata = {
  title: "AO Brushstroke Collection | Alpha Omega Strength Team",
  description:
    "The Brushstroke Collection - Alpha and Omega marked in raw, hand-painted strokes. Short and long sleeve, warm stone series. Built to train in, built to believe in.",
  openGraph: {
    title: "AO Brushstroke Collection | Alpha Omega Strength Team",
    description:
      "Alpha and Omega marked in raw, hand-painted strokes. Warm Stone Series. Short and long sleeve.",
    images: [
      {
        url: "/images/products/brushstroke/long-sleeve/military-green-white.webp",
        width: 600,
        height: 600,
      },
    ],
  },
};

export default function AoBrushstrokePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <BrushstrokeShowcase />
      </main>
      <Footer />
    </>
  );
}
