import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the full title as-is instead of applying the "| PanoVeya" template. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Builds per-page metadata with canonical URL, Open Graph and Twitter card data. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders. Only factual, verifiable properties are included. */
/* ------------------------------------------------------------------ */

const orgId = () => `${siteConfig.url}/#organization`;

export function organizationJsonLd() {
  const sameAs = siteConfig.social.map((s) => s.href).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    areaServed: { "@type": "Country", name: siteConfig.country },
    knowsAbout: [
      "360° virtual tours",
      "360° photography",
      "Google Maps 360° imagery",
      "Virtual tours for hotels",
      "Virtual tours for wedding venues",
      "Real estate virtual tours",
      "3D digital twins",
    ],
    ...(sameAs.length ? { sameAs } : {}),
    ...(siteConfig.contact.email || siteConfig.contact.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            areaServed: "IN",
            ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
            ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
          },
        }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: { "@id": orgId() },
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  audience?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType,
    provider: { "@id": orgId() },
    areaServed: { "@type": "Country", name: siteConfig.country },
    ...(input.audience?.length
      ? {
          audience: input.audience.map((a) => ({ "@type": "BusinessAudience", audienceType: a })),
        }
      : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.published,
    dateModified: input.updated ?? input.published,
    author: { "@id": orgId() },
    publisher: { "@id": orgId() },
    image: absoluteUrl("/opengraph-image"),
  };
}
