import type { StaticImageData } from "next/image";
import banquetDoors from "@/assets/images/banquet-hall-doors.jpg";
import cafeSeating from "@/assets/images/cafe-seating.jpg";
import eventStage from "@/assets/images/event-hall-stage.jpg";
import garden from "@/assets/images/garden-courtyard.jpg";
import loft from "@/assets/images/heritage-loft.jpg";
import waterfront from "@/assets/images/waterfront-architecture.jpg";

/**
 * Portfolio entries.
 *
 * `kind` controls the badge shown on each card:
 *  - "concept-demo": illustrative samples (current entries). Always labelled.
 *  - "client-project": genuine, delivered client work. Only use with the client's permission.
 *
 * To add a real project: import an image, add an entry with kind "client-project",
 * fill `client`/`location`, and optionally `tourUrl` (link to the live tour).
 * Items with `panoramaId` open the matching scene in the on-page 360° viewer.
 */
export type PortfolioKind = "concept-demo" | "client-project";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  kind: PortfolioKind;
  summary: string;
  image: StaticImageData;
  imageAlt: string;
  client?: string;
  location?: string;
  /** Scene id from content/panoramas.ts to open in the on-page viewer. */
  panoramaId?: string;
  /** External URL of a hosted tour for client projects. */
  tourUrl?: string;
  credit?: { label: string; href: string };
};

export const portfolioKindLabel: Record<PortfolioKind, string> = {
  "concept-demo": "Concept Demo",
  "client-project": "Client Project",
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "demo-banquet",
    title: "Heritage banquet hall",
    category: "Wedding & event venue",
    kind: "concept-demo",
    summary: "How a venue tour can show entrances, galleries and the main floor for function planning.",
    image: banquetDoors,
    imageAlt: "Pink-walled banquet hall with white columns, carved panels and wooden doors",
    panoramaId: "banquet-hall",
    credit: { label: "Poly Haven (CC0)", href: "https://polyhaven.com/a/vestibule" },
  },
  {
    id: "demo-cafe",
    title: "Neighbourhood café",
    category: "Restaurant & café",
    kind: "concept-demo",
    summary: "Lounge seating, mezzanine and ambience — what diners check before choosing a table.",
    image: cafeSeating,
    imageAlt: "Café seating with green tablecloths, a sofa with bright cushions and a birdcage lamp",
    panoramaId: "cafe",
    credit: { label: "Poly Haven (CC0)", href: "https://polyhaven.com/a/comfy_cafe" },
  },
  {
    id: "demo-event-hall",
    title: "Function & conference hall",
    category: "Events & education",
    kind: "concept-demo",
    summary: "A stage-facing hall where hotspots can list capacity, AV and layout options.",
    image: eventStage,
    imageAlt: "Empty hall with a stage, teal curtains and a patterned floor",
    panoramaId: "event-hall",
    credit: { label: "Poly Haven (CC0)", href: "https://polyhaven.com/a/dancing_hall" },
  },
  {
    id: "demo-garden",
    title: "Resort garden courtyard",
    category: "Hotel & resort",
    kind: "concept-demo",
    summary: "Outdoor areas guests care about — gardens, ponds and pavilions — shown in full context.",
    image: garden,
    imageAlt: "Garden with a lily pond, rockery, bamboo and a pagoda-style pavilion",
    panoramaId: "garden-courtyard",
    credit: { label: "Poly Haven (CC0)", href: "https://polyhaven.com/a/chinese_garden" },
  },
  {
    id: "demo-heritage-room",
    title: "Heritage residence room",
    category: "Real estate & boutique stays",
    kind: "concept-demo",
    summary: "Character rooms where light, finishes and proportions matter to buyers and guests.",
    image: loft,
    imageAlt: "Room with a green wall, leather wingback chair, antique desk and tall window",
    panoramaId: "heritage-loft",
    credit: { label: "Poly Haven (CC0)", href: "https://polyhaven.com/a/photo_studio_loft_hall" },
  },
  {
    id: "demo-waterfront",
    title: "Waterfront commercial building",
    category: "Commercial & institutional",
    kind: "concept-demo",
    summary: "Exterior scenes that help visitors recognise the approach to a building.",
    image: waterfront,
    imageAlt: "Contemporary concrete and glass building across a river from a paved plaza",
    panoramaId: "waterfront-plaza",
    credit: { label: "Poly Haven (CC0)", href: "https://polyhaven.com/a/modern_buildings_2" },
  },
];
