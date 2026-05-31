import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnbreakableShowcase from "@/components/UnbreakableShowcase";

export const metadata: Metadata = {
  title: "AO Unbreakable | Alpha Omega Strength Team",
  description:
    "Unbreakable. Forged for the ones who don't bend. Heavyweight cotton tee, warm stone series. Built to train in, built to believe in.",
  openGraph: {
    title: "AO Unbreakable | Alpha Omega Strength Team",
    description:
      "Forged for the ones who don't bend. Warm Stone Series. Short sleeve, with Long Sleeve coming soon.",
    images: [
      {
        url: "/images/products/unbreakable/short-sleeve/military-green-white.webp",
        width: 600,
        height: 600,
      },
    ],
  },
};

export default function AoUnbreakablePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <UnbreakableShowcase />
      </main>
      <Footer />
    </>
  );
}
