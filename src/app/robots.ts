import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of search results.
  const isPreview = process.env.VERCEL_ENV === "preview";
  return {
    rules: isPreview
      ? [{ userAgent: "*", disallow: "/" }]
      : [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
