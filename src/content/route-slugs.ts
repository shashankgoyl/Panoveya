/**
 * Valid slugs for dynamic routes. Kept free of image imports so the request
 * proxy can use it cheaply to return real 404s for unknown URLs.
 *
 * When you add a service page, industry or article, add its slug here too —
 * TypeScript will flag any content entry whose slug is missing.
 */
export const serviceSlugs = [
  "360-virtual-tours",
  "google-maps-virtual-tours",
  "3d-virtual-tours",
] as const;

export const industrySlugs = [
  "hotels-resorts",
  "restaurants-cafes",
  "wedding-venues",
  "real-estate",
  "retail-showrooms",
  "education-institutions",
] as const;

export const articleSlugs = [
  "what-is-a-360-virtual-tour",
  "google-maps-vs-website-virtual-tours",
  "prepare-your-space-for-a-360-photoshoot",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
export type IndustrySlug = (typeof industrySlugs)[number];
export type ArticleSlug = (typeof articleSlugs)[number];
