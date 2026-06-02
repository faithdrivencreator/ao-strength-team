import type { Metadata } from "next";
import TitheClient from "./TitheClient";

export const metadata: Metadata = {
  title: "The Tithe | Alpha Omega Strength Team",
  description:
    "10% of every Alpha Omega Strength Team order goes to one of four ECFA-accredited Christian charities you choose at checkout. Strength with a purpose.",
  openGraph: {
    title: "The Tithe | Alpha Omega Strength Team",
    description:
      "10% of every Alpha Omega Strength Team order goes to one of four ECFA-accredited Christian charities you choose at checkout. Strength with a purpose.",
  },
};

export default function TithePage() {
  return <TitheClient />;
}
