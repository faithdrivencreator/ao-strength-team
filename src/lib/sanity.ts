import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/**
 * If the Sanity project ID hasn't been configured yet (pre-launch / preview deploys),
 * return a stub client that resolves all queries to null/empty arrays. The site keeps
 * building and the blog page renders empty until Pete drops the credentials in.
 */
function createStubClient(): SanityClient {
  const stub = {
    fetch: async () => null,
    config: () => ({}),
  };
  return stub as unknown as SanityClient;
}

export const sanityClient: SanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_TOKEN,
      perspective: "published",
    })
  : createStubClient();

const builder = projectId
  ? imageUrlBuilder(sanityClient)
  : null;

/** Build a Sanity image URL with transformations. Usage: urlFor(image).width(800).url() */
export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Fallback during pre-launch builds with no project configured. Cast through unknown
    // because the real ImageUrlBuilder has a much larger surface area than we use.
    const stub = {
      width: () => stub,
      height: () => stub,
      url: () => "",
    };
    return stub as unknown as ReturnType<ReturnType<typeof imageUrlBuilder>["image"]>;
  }
  return builder.image(source);
}
