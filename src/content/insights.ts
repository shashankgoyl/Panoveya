import type { ArticleSlug } from "./route-slugs";

/**
 * Insight articles. Each block renders as semantic HTML.
 * Add a new article by appending an object; the index page, sitemap and llms.txt update automatically.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string };

export type Article = {
  slug: ArticleSlug;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  readingMinutes: number;
  topic: string;
  /** A short direct answer shown at the top — useful for readers and answer engines. */
  keyTakeaway: string;
  body: ArticleBlock[];
  related: { label: string; href: string }[];
};

export const articles: Article[] = [
  {
    slug: "what-is-a-360-virtual-tour",
    title: "What is a 360° virtual tour? A plain-English guide for Indian businesses",
    description:
      "How 360° virtual tours work, what they cost to produce, where they can be published and when they're worth it for hotels, restaurants, venues and property.",
    published: "2026-10-21",
    readingMinutes: 6,
    topic: "Basics",
    keyTakeaway:
      "A 360° virtual tour is a set of connected panoramic photos that lets people look around a real space and move between areas in a web browser. It helps customers understand a place before visiting; it doesn't replace good service, accurate listings or a strong offer.",
    body: [
      { type: "h2", text: "The short definition" },
      {
        type: "p",
        text: "A 360° virtual tour is made of panoramic photographs that each capture the full sphere of view — left, right, up and down — from one position. These panoramas are linked so a viewer can click to move from, say, a hotel lobby to a room, then out to the pool. The tour runs in an ordinary web browser on phones and computers.",
      },
      {
        type: "p",
        text: "On a phone, viewers swipe to look around and, on many devices, can move the phone itself to change the view. On a computer, they drag with the mouse. Some tours also support VR headsets, but a headset is never required.",
      },
      { type: "h2", text: "What a tour can include" },
      {
        type: "ul",
        items: [
          "Navigation points that move the viewer between areas",
          "Hotspots with text, photos, menus, capacities or prices",
          "Your logo and scene names, such as “Deluxe room” or “Rooftop terrace”",
          "Buttons that link to an enquiry form, WhatsApp chat or booking page",
          "An opening view chosen to make a strong first impression",
        ],
      },
      { type: "h2", text: "How a 360° tour is produced" },
      {
        type: "ol",
        items: [
          "Planning: agreeing which areas to capture and where each panorama will be taken.",
          "Preparation: the business tidies and lights the space, and schedules a time without customers.",
          "Capture: a photographer uses a 360° camera or a camera with a panoramic head, usually taking several exposures per position to handle bright windows and dark corners.",
          "Processing: exposures are merged, stitched, colour-corrected and checked for stitching errors. People or sensitive details can be blurred.",
          "Assembly: panoramas are linked, labelled and branded, and hotspots are added.",
          "Publishing: the tour is hosted and shared via a link and embed code, and selected panoramas can be published to Google Maps through Google's tools.",
        ],
      },
      { type: "h2", text: "Where tours can be published" },
      {
        type: "p",
        text: "Most businesses use a tour in two places. The first is their own website, where the tour can carry full branding and calls to action. The second is Google Maps, where 360° imagery appears alongside the business listing. Google controls what it publishes and how, and Google Maps imagery cannot include your own hotspots or buttons. The same capture can often serve both if it is planned that way.",
      },
      { type: "h2", text: "What affects the cost" },
      {
        type: "ul",
        items: [
          "Size of the space and the number of capture points",
          "Travel to the location",
          "Amount of editing, retouching and privacy blurring",
          "Number of hotspots and information panels",
          "Hosting platform and duration",
        ],
      },
      { type: "h2", text: "When a tour is — and isn't — worth it" },
      {
        type: "p",
        text: "Tours are most useful when the physical space is part of what customers are buying: a hotel room, a wedding venue, a restaurant's ambience, a home, a showroom or a campus. They are particularly helpful when decision-makers are in another city or abroad.",
      },
      {
        type: "p",
        text: "A tour is less useful if the space is purely functional and customers never visit, or if the space is about to be renovated. In that case, wait until the space reflects what customers will actually experience.",
      },
      {
        type: "note",
        text: "Be cautious of anyone guaranteeing higher bookings or search rankings from a virtual tour. A tour helps customers see your space clearly; results depend on many other factors.",
      },
    ],
    related: [
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      { label: "Google Maps vs website tours", href: "/insights/google-maps-vs-website-virtual-tours" },
      { label: "Prepare your venue for a 360° shoot", href: "/insights/prepare-your-space-for-a-360-photoshoot" },
    ],
  },
  {
    slug: "google-maps-vs-website-virtual-tours",
    title: "Google Maps 360° imagery vs a website virtual tour: what's the difference?",
    description:
      "Compare 360° imagery on Google Maps with a branded virtual tour on your website — hosting, branding, hotspots, control — and learn when to use each.",
    published: "2026-10-21",
    readingMinutes: 5,
    topic: "Comparisons",
    keyTakeaway:
      "Google Maps 360° imagery helps people discover and recognise your business inside Google's interface. A website virtual tour gives you control over branding, hotspots and calls to action. They complement each other, and one well-planned shoot can supply both.",
    body: [
      { type: "h2", text: "Two places, two jobs" },
      {
        type: "p",
        text: "People searching on Google Maps are often deciding between several nearby options. Being able to look inside can help them recognise your entrance and get a feel for the space. People on your website are usually further along: they want details, comparisons and a way to enquire. These different moments call for different tools.",
      },
      { type: "h2", text: "Side-by-side comparison" },
      {
        type: "ul",
        items: [
          "Hosting — Google Maps: hosted by Google. Website tour: hosted on a tour platform or your own infrastructure, as agreed.",
          "Branding — Google Maps: none. Website tour: your logo, colours and scene names.",
          "Hotspots and links — Google Maps: not supported. Website tour: information panels, menus, capacities and enquiry buttons.",
          "Control — Google Maps: Google reviews imagery and decides what appears. Website tour: you decide what's shown and can update panels.",
          "Discovery — Google Maps: shown to people already searching for places. Website tour: seen by people who visit your site or receive your link.",
        ],
      },
      { type: "h2", text: "How publishing to Google Maps works today" },
      {
        type: "p",
        text: "Google retired its standalone Street View app in 2023. Today, 360° photos are added through Google's own tools, such as the Google Maps app for individual images and Street View Studio for larger uploads. Google sets technical requirements (such as a 2:1 equirectangular format and minimum resolution) and content policies, and these can change. Any provider who promises guaranteed publication, placement or ranking is promising something only Google controls.",
      },
      { type: "h2", text: "Which should you choose?" },
      {
        type: "ul",
        items: [
          "A café or shop focused on walk-ins may start with Google Maps imagery.",
          "A hotel, venue or developer that sells on detail will benefit from a branded website tour.",
          "Most growing businesses use both, planning one shoot so the same panoramas serve each purpose.",
        ],
      },
      {
        type: "note",
        text: "PanoVeya is an independent studio and is not affiliated with, endorsed by or certified by Google.",
      },
    ],
    related: [
      { label: "Google Maps virtual tours", href: "/services/google-maps-virtual-tours" },
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      { label: "What is a 360° virtual tour?", href: "/insights/what-is-a-360-virtual-tour" },
    ],
  },
  {
    slug: "prepare-your-space-for-a-360-photoshoot",
    title: "How to prepare your space for a 360° photoshoot: a practical checklist",
    description:
      "A room-by-room checklist for hotels, restaurants, venues and shops preparing for 360° virtual tour photography — lighting, clutter, privacy and timing.",
    published: "2026-10-21",
    readingMinutes: 5,
    topic: "Guides",
    keyTakeaway:
      "A 360° camera sees everything, in every direction. Most of the quality of a virtual tour comes from preparation: clear surfaces, consistent lighting, an empty space and a plan for which areas matter most.",
    body: [
      { type: "h2", text: "Why preparation matters more for 360°" },
      {
        type: "p",
        text: "In ordinary photography, a photographer chooses what to leave out of the frame. In 360° photography there is no “out of frame”: the camera captures the ceiling, the floor and whatever is behind it. A stack of boxes in a corner or a cleaning trolley in a corridor will appear in the tour.",
      },
      { type: "h2", text: "One week before" },
      {
        type: "ul",
        items: [
          "List the areas customers most want to see and agree the capture plan.",
          "Book the shoot for a time when the space is empty — before opening, between events or during a holiday.",
          "Fix visible maintenance issues: burnt-out bulbs, stained upholstery, peeling paint.",
          "Inform staff, and arrange access to locked rooms, rooftops or back-of-house areas you want included.",
        ],
      },
      { type: "h2", text: "On the day" },
      {
        type: "ul",
        items: [
          "Switch on all lights, including lamps and feature lighting. Replace mismatched bulbs where possible.",
          "Open curtains and blinds unless the view is unattractive.",
          "Clear counters, tables and floors of personal items, cables, bins and signage you don't want shown.",
          "Set tables, beds and displays exactly as you would for a guest or customer.",
          "Hide or remove screens displaying private information.",
          "Keep people, pets and vehicles out of the shot, or let the photographer know which areas are busy.",
        ],
      },
      { type: "h2", text: "Industry-specific tips" },
      {
        type: "ul",
        items: [
          "Hotels: prepare at least one room of every category to arrival standard, and capture the view from windows and balconies.",
          "Restaurants: use your evening ambience lighting rather than cleaning lights, and set signature tables.",
          "Wedding venues: if possible, capture halls both empty and dressed, and have capacity figures ready.",
          "Property: declutter, remove personal photos and note the facing direction of each room.",
          "Retail: restock and face up shelves, and decide which product zones deserve hotspots.",
        ],
      },
      { type: "h2", text: "Privacy and consent" },
      {
        type: "p",
        text: "Capture when spaces are empty wherever possible. If people appear in the final panoramas, faces should be blurred unless they have given consent. Avoid capturing documents, screens or number plates that reveal personal information.",
      },
      {
        type: "note",
        text: "PanoVeya shares a tailored version of this checklist with every client before their shoot.",
      },
    ],
    related: [
      { label: "Get a free quote", href: "/contact#enquiry" },
      { label: "Hotels & resorts", href: "/industries/hotels-resorts" },
      { label: "Wedding & event venues", href: "/industries/wedding-venues" },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
