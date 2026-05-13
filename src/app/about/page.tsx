import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Alpha Omega Strength Team",
  description:
    "Alpha Omega Strength Team is performance apparel for the disciplined. Built on faith, forged in training, made for those who finish what they start.",
  openGraph: {
    title: "About | Alpha Omega Strength Team",
    description:
      "Performance apparel for the disciplined. Built on faith, forged in training, made for those who finish what they start.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
