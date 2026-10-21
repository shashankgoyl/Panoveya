import type { ServiceSlug } from "./route-slugs";

/**
 * Services offered by PanoVeya.
 *
 * `status` must stay honest:
 *  - "available": offered from launch.
 *  - "on-request": offered case by case after a site and equipment assessment.
 *  - "planned": on the product roadmap; not yet offered.
 */
export type ServiceStatus = "available" | "on-request" | "planned";

export type ServiceIcon =
  | "map"
  | "globe"
  | "camera"
  | "building"
  | "pointer"
  | "box"
  | "sparkles"
  | "bot";

export type ServiceSummary = {
  id: string;
  title: string;
  summary: string;
  status: ServiceStatus;
  icon: ServiceIcon;
  /** Landing page that covers this service in depth. */
  href: string;
};

export const serviceStatusLabel: Record<ServiceStatus, string> = {
  available: "Available now",
  "on-request": "Scoped on request",
  planned: "On our roadmap",
};

export const serviceSummaries: ServiceSummary[] = [
  {
    id: "google-maps",
    title: "Google Maps & Street View–compatible tours",
    summary:
      "360° photography captured to the specifications Google publishes, ready for you to add to Google Maps and your Business Profile. Publication is reviewed and controlled by Google.",
    status: "available",
    icon: "map",
    href: "/services/google-maps-virtual-tours",
  },
  {
    id: "website-tours",
    title: "Branded website virtual tours",
    summary:
      "An interactive tour styled to your brand, embedded on your own website with your logo, room labels and calls to action.",
    status: "available",
    icon: "globe",
    href: "/services/360-virtual-tours",
  },
  {
    id: "photography",
    title: "Professional 360° photography",
    summary:
      "High-resolution equirectangular panoramas of your space, processed for colour, exposure and clean stitching.",
    status: "available",
    icon: "camera",
    href: "/services/360-virtual-tours",
  },
  {
    id: "multi-room",
    title: "Multi-room hotel & resort walkthroughs",
    summary:
      "Connected scenes that let guests move from lobby to room categories, dining, pool and event spaces in one continuous tour.",
    status: "available",
    icon: "building",
    href: "/industries/hotels-resorts",
  },
  {
    id: "hotspots",
    title: "Interactive hotspots & information panels",
    summary:
      "Clickable points inside the tour that reveal room details, menus, capacities, amenities or links to enquire.",
    status: "available",
    icon: "pointer",
    href: "/services/360-virtual-tours",
  },
  {
    id: "digital-twins",
    title: "3D digital twins & floor-plan experiences",
    summary:
      "Measured 3D models and floor-plan views for properties and large venues. Scoped per project after a site and equipment assessment.",
    status: "on-request",
    icon: "box",
    href: "/services/3d-virtual-tours",
  },
  {
    id: "venue-showcase",
    title: "Venue & property showcase experiences",
    summary:
      "Tours designed around how buyers and event planners decide: layouts, capacities, approach routes and key features.",
    status: "available",
    icon: "sparkles",
    href: "/industries/wedding-venues",
  },
  {
    id: "ai-booking",
    title: "AI-guided tours & booking integrations",
    summary:
      "Guided narration, question answering and direct links into booking systems. In development — not yet available.",
    status: "planned",
    icon: "bot",
    href: "/about#roadmap",
  },
];

/* ------------------------------------------------------------------ */
/* Service landing pages                                               */
/* ------------------------------------------------------------------ */

export type ServicePage = {
  slug: ServiceSlug;
  title: string;
  /** Short name used in breadcrumbs and links. */
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  status: ServiceStatus;
  /** A concise, factual definition — useful to readers and answer engines. */
  definition: { question: string; answer: string };
  whatYouGet: { title: string; body: string }[];
  process: string[];
  idealFor: { label: string; href: string }[];
  considerations: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "360-virtual-tours",
    title: "360° Virtual Tours for Websites",
    shortTitle: "360° Virtual Tours",
    metaTitle: "360° Virtual Tours for Businesses in India",
    metaDescription:
      "Branded, interactive 360° virtual tours for hotels, restaurants, venues, property and retail. Professional capture, hotspots and website embedding by PanoVeya.",
    eyebrow: "Core service",
    headline: "Interactive 360° virtual tours that live on your website",
    intro:
      "A 360° virtual tour lets people look around your space in every direction and move between rooms from their phone or computer. PanoVeya plans the route through your space, captures it with professional 360° equipment, and assembles a branded tour you can embed on your website and share in your marketing.",
    status: "available",
    definition: {
      question: "What is a 360° virtual tour?",
      answer:
        "A 360° virtual tour is a set of connected panoramic photographs, each covering the full sphere around one position. Viewers drag, swipe or tilt their device to look around, and click navigation points to move to the next position. Tours can include labels, information panels and links, and run in a normal web browser without an app.",
    },
    whatYouGet: [
      {
        title: "Capture plan",
        body: "We agree which areas matter most to your customers and where each panorama will be taken, so the tour follows a natural path.",
      },
      {
        title: "Professional 360° photography",
        body: "Bracketed exposures for bright windows and dim interiors, processed for accurate colour and clean stitching.",
      },
      {
        title: "Connected, branded tour",
        body: "Scenes linked with navigation points, your logo, room names and an optional opening view chosen to make a strong first impression.",
      },
      {
        title: "Hotspots and information panels",
        body: "Optional clickable points with descriptions, capacities, menus, photos or links to your enquiry page.",
      },
      {
        title: "Embedding and sharing",
        body: "An embed code for your website and a shareable link for WhatsApp, social media, email and QR codes.",
      },
      {
        title: "Hosting options",
        body: "Hosting arrangements are agreed in your quote, so you know where the tour lives and for how long.",
      },
    ],
    process: [
      "Tell us about your space and what customers usually ask before they visit.",
      "We recommend the number of capture points and features, and send a quote.",
      "A trained photographer captures your space at an agreed time.",
      "We process, connect and brand the tour, then share it for your review.",
      "You receive the embed code and share link for the agreed package.",
    ],
    idealFor: [
      { label: "Hotels & resorts", href: "/industries/hotels-resorts" },
      { label: "Restaurants & cafés", href: "/industries/restaurants-cafes" },
      { label: "Wedding & event venues", href: "/industries/wedding-venues" },
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Retail & showrooms", href: "/industries/retail-showrooms" },
      { label: "Education & institutions", href: "/industries/education-institutions" },
    ],
    considerations: [
      {
        title: "Preparation matters",
        body: "Tidy, well-lit spaces photograph best. 360° cameras see every direction, so there is nowhere to hide clutter. We share a preparation checklist before the shoot.",
      },
      {
        title: "Number of capture points",
        body: "Larger or more complex spaces need more positions for smooth navigation. This is the main factor in project scope.",
      },
      {
        title: "Privacy",
        body: "We schedule shoots to avoid guests and customers where possible, and blur faces or sensitive details that appear in the final imagery.",
      },
    ],
    faqs: [
      {
        question: "Does a website virtual tour need an app or headset?",
        answer:
          "No. Tours run in modern mobile and desktop browsers. On phones, viewers can swipe or, where supported, move their device to look around.",
      },
      {
        question: "Can I update the tour later?",
        answer:
          "Information panels and links can usually be edited after delivery. Reshooting is needed if the physical space changes significantly, such as after a renovation.",
      },
      {
        question: "Will a virtual tour increase my bookings?",
        answer:
          "We don't promise specific results. A tour gives customers a clearer view of your space before they visit, which many businesses use to support enquiries and bookings alongside their other marketing.",
      },
    ],
    related: [
      { label: "Google Maps virtual tours", href: "/services/google-maps-virtual-tours" },
      { label: "3D virtual tours & digital twins", href: "/services/3d-virtual-tours" },
      { label: "What is a 360° virtual tour?", href: "/insights/what-is-a-360-virtual-tour" },
    ],
  },
  {
    slug: "google-maps-virtual-tours",
    title: "Google Maps & Street View–Compatible Virtual Tours",
    shortTitle: "Google Maps Virtual Tours",
    metaTitle: "Google Maps & Street View–Compatible 360° Tours",
    metaDescription:
      "360° photography of your business captured to Google's published specifications, ready to add to Google Maps and your Business Profile. Honest guidance from PanoVeya.",
    eyebrow: "Visibility service",
    headline: "Let people look inside your business straight from Google Maps",
    intro:
      "Many customers first meet your business on Google Maps. PanoVeya captures 360° imagery of your interior and entrance to the specifications Google publishes for user-contributed 360° photos, and helps you publish it through Google's own tools. We are an independent studio and are not affiliated with or endorsed by Google.",
    status: "available",
    definition: {
      question: "How is a Google Maps tour different from a website virtual tour?",
      answer:
        "Imagery on Google Maps is hosted and displayed by Google inside its own interface, alongside your Business Profile. A website virtual tour is hosted on your own site and can carry your branding, hotspots and calls to action. Many businesses use both: Google Maps for discovery, and a branded tour on their website for detailed exploration.",
    },
    whatYouGet: [
      {
        title: "Capture to Google's specifications",
        body: "Full-sphere 360° images in the format and resolution Google lists for 360° photo contributions.",
      },
      {
        title: "Entrance and interior coverage",
        body: "Positions chosen so customers can recognise your entrance and understand the inside of your space.",
      },
      {
        title: "Publishing support",
        body: "Guidance or hands-on help publishing through Google's tools, such as the Google Maps app or Street View Studio, using your access.",
      },
      {
        title: "Reusable imagery",
        body: "The same panoramas can also be used in a branded website tour, so you are not paying for capture twice.",
      },
    ],
    process: [
      "Confirm your Google Business Profile details and who manages access.",
      "Plan entrance, interior and key-feature capture points.",
      "Capture and process the 360° imagery.",
      "Publish through Google's tools, or hand over files with clear instructions.",
    ],
    idealFor: [
      { label: "Restaurants & cafés", href: "/industries/restaurants-cafes" },
      { label: "Hotels & resorts", href: "/industries/hotels-resorts" },
      { label: "Retail & showrooms", href: "/industries/retail-showrooms" },
      { label: "Education & institutions", href: "/industries/education-institutions" },
    ],
    considerations: [
      {
        title: "Google decides what is published",
        body: "Google reviews contributed imagery and controls whether, where and how long it appears. We cannot guarantee publication, placement or any effect on search rankings.",
      },
      {
        title: "Policies change",
        body: "Google's tools and contribution policies change over time. We follow the current guidance at the time of your project and will tell you if something has changed.",
      },
      {
        title: "Limited customisation",
        body: "Google Maps imagery cannot include your own branding, hotspots or booking buttons. For those, add a website tour.",
      },
    ],
    faqs: [
      {
        question: "Are you Google-certified or a Google partner?",
        answer:
          "No. PanoVeya is an independent business. We are not affiliated with, endorsed by or certified by Google.",
      },
      {
        question: "Will 360° photos improve my Google ranking?",
        answer:
          "We can't promise that. Google does not publish a ranking benefit for 360° imagery. Its value is helping customers see your space before they visit.",
      },
      {
        question: "Can the same shoot be used on my website?",
        answer:
          "Yes. If planned in advance, the same panoramas can be assembled into a branded website tour as part of a combined package.",
      },
    ],
    related: [
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      {
        label: "Google Maps vs website virtual tours",
        href: "/insights/google-maps-vs-website-virtual-tours",
      },
      { label: "Restaurants & cafés", href: "/industries/restaurants-cafes" },
    ],
  },
  {
    slug: "3d-virtual-tours",
    title: "3D Virtual Tours, Digital Twins & Floor Plans",
    shortTitle: "3D Virtual Tours",
    metaTitle: "3D Virtual Tours, Digital Twins & Floor Plans",
    metaDescription:
      "Understand when a 3D digital twin or floor-plan experience is worth it for property, venues and large spaces. Scoped on request by PanoVeya.",
    eyebrow: "Advanced capture — scoped on request",
    headline: "3D digital twins and floor-plan experiences for complex spaces",
    intro:
      "Some projects need more than panoramas: buyers want to understand how rooms connect, and event planners need to picture layouts. A 3D digital twin is a measured model of a space that can be explored from a dollhouse or floor-plan view. PanoVeya scopes these projects individually because the right approach depends on the size of the space, the equipment and platform involved, and how you plan to use the result.",
    status: "on-request",
    definition: {
      question: "What is a 3D digital twin of a building?",
      answer:
        "A 3D digital twin is a spatial model of a real space built from depth-sensing or photogrammetry capture. Unlike a set of 360° photos, it records the geometry of rooms, so viewers can see an overview of the whole floor, move freely between points and, depending on the platform, view approximate measurements.",
    },
    whatYouGet: [
      {
        title: "Requirements assessment",
        body: "We look at your space and goals and recommend whether 3D capture, 360° panoramas or a combination is the better fit.",
      },
      {
        title: "Transparent platform choices",
        body: "3D tours usually run on a specialist hosting platform. We explain the options, ongoing costs and who owns the account before you commit.",
      },
      {
        title: "Floor-plan style navigation",
        body: "Where the chosen approach supports it, viewers can jump between areas from an overview or plan view.",
      },
    ],
    process: [
      "Share drawings, photos or a walkthrough video of the space.",
      "We assess feasibility and recommend an approach.",
      "You receive a scoped quote covering capture, processing and hosting.",
      "Capture and delivery follow the agreed scope.",
    ],
    idealFor: [
      { label: "Real estate & developers", href: "/industries/real-estate" },
      { label: "Wedding & event venues", href: "/industries/wedding-venues" },
      { label: "Hotels & resorts", href: "/industries/hotels-resorts" },
    ],
    considerations: [
      {
        title: "Not every space needs 3D",
        body: "For many cafés, shops and single venues, connected 360° panoramas give customers what they need at lower cost. We'll say so if that's the case.",
      },
      {
        title: "Measurements are approximate",
        body: "3D tours are for visualisation and are not a substitute for a professional survey or approved architectural drawings.",
      },
      {
        title: "Ongoing hosting",
        body: "Many 3D platforms charge recurring hosting fees. These are included in your quote so there are no surprises.",
      },
    ],
    faqs: [
      {
        question: "Is a 3D tour better than a 360° tour?",
        answer:
          "It depends on the goal. 3D adds spatial overview and measurement features, which suits property and large venues. 360° tours are simpler, faster and often sufficient for hospitality and retail.",
      },
      {
        question: "Can you create floor plans?",
        answer:
          "Floor-plan style views are possible with some 3D capture approaches. We confirm what's feasible for your space during scoping.",
      },
    ],
    related: [
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      { label: "Real estate virtual tours", href: "/industries/real-estate" },
      { label: "Wedding venue tours", href: "/industries/wedding-venues" },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}
