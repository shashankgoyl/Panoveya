/**
 * Central site settings for PanoVeya.
 *
 * Every piece of company information shown on the website (contact details,
 * social profiles, brand copy) is read from this file. Update it here once and
 * it changes everywhere: header, footer, contact page, structured data and llms.txt.
 *
 * IMPORTANT: Values set to `null` are deliberate placeholders. The website shows
 * a "not yet published" placeholder instead of inventing details. Replace them
 * with genuine, verified business information before launch.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  // Vercel exposes the production domain at build time for previews/production.
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;
  return "http://localhost:3000";
}

export type SocialLink = {
  /** Display label, e.g. "Instagram" */
  label: string;
  /** Full profile URL. Leave `null` until the account genuinely exists. */
  href: string | null;
};

export const siteConfig = {
  name: "PanoVeya",
  legalName: null as string | null, // e.g. "PanoVeya Technologies Pvt. Ltd." once registered
  tagline: "Experience Every Space Before You Arrive.",
  mission:
    "Help people experience physical places digitally and help businesses turn online visitors into real customers.",
  description:
    "PanoVeya is an Indian startup creating immersive 360° virtual tours for hotels, restaurants, wedding venues, real estate, retail and institutions, and building a nationwide network of professional 360° photographers.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  country: "India",
  /** Year the business started trading — used in the copyright line. */
  foundingYear: 2026,

  contact: {
    /** Public enquiry email. Placeholder until a real inbox exists. */
    email: null as string | null,
    /** Public phone number with country code, e.g. "+91 98xxxxxxx". */
    phone: null as string | null,
    /** WhatsApp number in international format without "+", e.g. "9198xxxxxxxx". */
    whatsapp: null as string | null,
    /** Registered or office address. Leave null unless verified. */
    address: null as string | null,
    /** Short statement about service coverage shown on contact pages. */
    serviceArea:
      "Based in India. We are building a photographer network to serve businesses across Indian cities and towns.",
    /** Typical response time statement. Keep it honest. */
    responseTime: "We aim to reply to new enquiries within two working days.",
  },

  social: [
    { label: "Instagram", href: null },
    { label: "LinkedIn", href: null },
    { label: "YouTube", href: null },
    { label: "X (Twitter)", href: null },
  ] satisfies SocialLink[] as SocialLink[],

  /** Optional handle for Twitter/X card metadata, e.g. "@panoveya". */
  twitterHandle: null as string | null,
} as const;

export const hasContactEmail = () => Boolean(siteConfig.contact.email);
export const activeSocialLinks = () =>
  siteConfig.social.filter((s): s is { label: string; href: string } => Boolean(s.href));

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
