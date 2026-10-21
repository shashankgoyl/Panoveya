/**
 * Package tiers. Prices are intentionally not published until approved.
 * To publish a price later, set `priceLabel` (e.g. "From ₹XX,XXX") — the UI will show it.
 */
export type PricingTier = {
  id: string;
  name: string;
  audience: string;
  description: string;
  includes: string[];
  priceLabel: string | null;
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "Small cafés, shops and compact spaces",
    description: "A focused tour for single-room or small-format businesses that want to be seen.",
    includes: [
      "A small number of capture points",
      "Google Maps–ready 360° imagery",
      "Shareable tour link",
      "Basic branding",
    ],
    priceLabel: null,
  },
  {
    id: "professional",
    name: "Professional",
    audience: "Restaurants, boutique hotels and venues",
    description: "A connected, branded experience across several areas of your business.",
    includes: [
      "Multi-area tour with navigation",
      "Branded website embed",
      "Interactive hotspots and information panels",
      "Google Maps–ready imagery",
    ],
    priceLabel: null,
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Resorts, multi-location businesses and complex properties",
    description: "Large sites, multiple branches or advanced capture, scoped around your rollout.",
    includes: [
      "Large-site or multi-branch capture",
      "Consistent standards across locations",
      "3D / floor-plan options on request",
      "Dedicated project coordination",
    ],
    priceLabel: null,
  },
];

export const pricingFactors = [
  "Venue size and number of capture points",
  "Travel to your location",
  "Editing, retouching and privacy blurring",
  "Hosting duration and platform",
  "Publishing to Google Maps and your website",
];
