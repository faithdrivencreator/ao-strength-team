import MainHome from "@/components/MainHome";
import { getAllPosts } from "@/lib/blog";

// Long revalidate keeps `/` served from the static cache. Blog data is
// hardcoded TypeScript so it only changes on deploy. The proxy handles the
// coming-soon gate via rewrite, so this route stays fully prerenderable.
export const revalidate = 3600;

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 3);
  return <MainHome latestPosts={latestPosts} />;
}
