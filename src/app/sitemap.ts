import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { servicePages } from "@/content/services";
import { absoluteUrl } from "@/content/site";

/** Generated from the content files, so new services, industries and articles appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/industries", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/photographer-network", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/insights", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return [
    ...staticPages.map((p) => ({
      url: absoluteUrl(p.path),
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...servicePages.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...industries.map((i) => ({
      url: absoluteUrl(`/industries/${i.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/insights/${a.slug}`),
      lastModified: a.updated ?? a.published,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
