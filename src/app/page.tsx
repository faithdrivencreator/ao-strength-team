import type { Metadata } from "next";
import MainHome from "@/components/MainHome";
import StoreHome from "@/components/StoreHome";
import { getAllPosts } from "@/lib/blog";

// Long revalidate keeps `/` served from the static cache. Blog data is
// hardcoded TypeScript so it only changes on deploy. The proxy handles the
// coming-soon gate via rewrite, so this route stays fully prerenderable.
export const revalidate = 3600;

// While purchases are locked (a pre-launch window) the original brand home with
// the countdown and notify modal still renders; otherwise the storefront home.
const PURCHASE_LOCKED = process.env.NEXT_PUBLIC_PURCHASE_LOCKED === "true";

export const metadata: Metadata = {
  title: { absolute: "Christian Gym Shirts and Faith Workout Apparel | Alpha Omega Strength Team" },
  description:
    "Christian gym shirts and workout tees with the scripture printed on them. The Launch Collection is live: short and long sleeve, men's and women's fit. 10% of every order goes to the charity you choose.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [{ url: "/images/og/home.jpg", width: 1200, height: 630 }] },
};

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 3);
  return PURCHASE_LOCKED ? <MainHome latestPosts={latestPosts} /> : <StoreHome latestPosts={latestPosts} />;
}
