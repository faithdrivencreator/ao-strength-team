import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CornerstoneShowcase from "@/components/CornerstoneShowcase";

export const metadata: Metadata = {
  title: "AO Cornerstone | Alpha Omega Strength Team",
  description:
    "AO Cornerstone - a clean boxed ALPHA and OMEGA mark with the cross at center, Warm Stone Series. Heavyweight cotton in short and long sleeve, built to train in, built to believe in.",
  openGraph: {
    title: "AO Cornerstone | Alpha Omega Strength Team",
    description:
      "A clean boxed Alpha and Omega mark, cross at center. Warm Stone Series. Short and long sleeve.",
    images: [
      {
        url: "/images/products/cornerstone/long-sleeve/black-white.webp",
        width: 600,
        height: 600,
      },
    ],
  },
};

export default function AoCornerstonePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <CornerstoneShowcase />
      </main>
      <Footer />
    </>
  );
}
