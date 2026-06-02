import type { Metadata } from "next";
import CharitiesClient from "./CharitiesClient";

export const metadata: Metadata = {
  title: "Charities | Alpha Omega Strength Team",
  description:
    "10% of every Alpha Omega Strength Team order goes to one of four ECFA-accredited Christian charities you choose at checkout. Strength with a purpose.",
  openGraph: {
    title: "Charities | Alpha Omega Strength Team",
    description:
      "10% of every Alpha Omega Strength Team order goes to one of four ECFA-accredited Christian charities you choose at checkout. Strength with a purpose.",
  },
};

export default function CharitiesPage() {
  return <CharitiesClient />;
}
