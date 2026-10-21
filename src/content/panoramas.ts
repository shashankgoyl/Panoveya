import type { StaticImageData } from "next/image";
import banquetBalcony from "@/assets/images/banquet-hall-balcony.jpg";
import cafeCorner from "@/assets/images/cafe-corner.jpg";
import eventStage from "@/assets/images/event-hall-stage.jpg";
import garden from "@/assets/images/garden-courtyard.jpg";
import loft from "@/assets/images/heritage-loft.jpg";
import waterfront from "@/assets/images/waterfront-architecture.jpg";

/**
 * 360° scenes available to the interactive viewer.
 *
 * Each `src` MUST be a genuine equirectangular (2:1) panorama in /public/panoramas.
 * Ordinary photos will look distorted and must never be listed here.
 *
 * The sample scenes below are CC0 panoramas from Poly Haven (polyhaven.com),
 * tonemapped for the web. They are concept demos, not PanoVeya client work.
 * Replace or extend them with your own captures — if the list is empty,
 * the site shows a configuration fallback instead of a viewer.
 */
export type PanoramaHotspot = {
  id: string;
  /** Horizontal angle in degrees: 0 = centre of the image, positive = right. */
  yaw: number;
  /** Vertical angle in degrees: 0 = horizon, positive = up. */
  pitch: number;
  title: string;
  body: string;
};

export type PanoramaScene = {
  id: string;
  label: string;
  /** Short context shown under the viewer. */
  description: string;
  src: string;
  /** Rectilinear still used as the poster before the viewer loads. */
  poster: StaticImageData;
  posterAlt: string;
  defaultYaw: number;
  defaultPitch?: number;
  hotspots: PanoramaHotspot[];
  credit: { label: string; href: string };
};

export const panoramaScenes: PanoramaScene[] = [
  {
    id: "cafe",
    label: "Café",
    description: "A neighbourhood café with lounge seating, a mezzanine and a staircase between floors.",
    src: "/panoramas/cafe.jpg",
    poster: cafeCorner,
    posterAlt: "Café corner with a table for two and framed botanical prints",
    defaultYaw: 43,
    hotspots: [
      {
        id: "cafe-seating",
        yaw: -133,
        pitch: -12,
        title: "Lounge seating",
        body: "Hotspots can describe seating options, capacity or reservation details.",
      },
      {
        id: "cafe-mezzanine",
        yaw: 0,
        pitch: 12,
        title: "Mezzanine level",
        body: "Navigation points can take visitors upstairs to the next scene.",
      },
    ],
    credit: { label: "Comfy Café — Poly Haven (CC0)", href: "https://polyhaven.com/a/comfy_cafe" },
  },
  {
    id: "banquet-hall",
    label: "Banquet hall",
    description: "A heritage banquet hall with columns, a balcony and parquet floors — typical of wedding venues.",
    src: "/panoramas/banquet-hall.jpg",
    poster: banquetBalcony,
    posterAlt: "Ornate banquet hall with columns and a balcony",
    defaultYaw: 100,
    defaultPitch: 4,
    hotspots: [
      {
        id: "banquet-balcony",
        yaw: 100,
        pitch: 30,
        title: "Gallery balcony",
        body: "Venues can add capacities, dimensions or photo-spot notes here.",
      },
      {
        id: "banquet-doors",
        yaw: -72,
        pitch: -2,
        title: "Main entrance",
        body: "Show couples how guests arrive and where the stage would face.",
      },
    ],
    credit: { label: "Vestibule — Poly Haven (CC0)", href: "https://polyhaven.com/a/vestibule" },
  },
  {
    id: "event-hall",
    label: "Event hall",
    description: "A large hall with a stage — useful for conferences, functions and campus auditoriums.",
    src: "/panoramas/event-hall.jpg",
    poster: eventStage,
    posterAlt: "Large hall with a stage and patterned floor",
    defaultYaw: 130,
    hotspots: [
      {
        id: "event-stage",
        yaw: 130,
        pitch: 2,
        title: "Stage",
        body: "Information panels can list AV equipment, stage size and seating layouts.",
      },
    ],
    credit: { label: "Dancing Hall — Poly Haven (CC0)", href: "https://polyhaven.com/a/dancing_hall" },
  },
  {
    id: "heritage-loft",
    label: "Heritage room",
    description: "A sunlit period room — the kind of character space buyers and guests want to see in context.",
    src: "/panoramas/heritage-loft.jpg",
    poster: loft,
    posterAlt: "Heritage room with a green wall, armchair and writing desk",
    defaultYaw: -90,
    hotspots: [
      {
        id: "loft-desk",
        yaw: -78,
        pitch: -10,
        title: "Writing corner",
        body: "Property tours can flag features, finishes or facing direction.",
      },
    ],
    credit: {
      label: "Photo Studio Loft Hall — Poly Haven (CC0)",
      href: "https://polyhaven.com/a/photo_studio_loft_hall",
    },
  },
  {
    id: "garden-courtyard",
    label: "Garden courtyard",
    description: "A landscaped courtyard with a pond and pavilion — outdoor areas matter to resort guests.",
    src: "/panoramas/garden-courtyard.jpg",
    poster: garden,
    posterAlt: "Garden courtyard with a pond and pavilion",
    defaultYaw: -47,
    hotspots: [
      {
        id: "garden-pavilion",
        yaw: -50,
        pitch: 10,
        title: "Pavilion",
        body: "Resorts can highlight outdoor dining, event lawns or guided walks.",
      },
    ],
    credit: { label: "Chinese Garden — Poly Haven (CC0)", href: "https://polyhaven.com/a/chinese_garden" },
  },
  {
    id: "waterfront-plaza",
    label: "Waterfront plaza",
    description: "Modern architecture beside a river — exterior context for commercial and institutional buildings.",
    src: "/panoramas/waterfront-plaza.jpg",
    poster: waterfront,
    posterAlt: "Modern glass building beside a river",
    defaultYaw: 0,
    hotspots: [
      {
        id: "waterfront-river",
        yaw: 0,
        pitch: -4,
        title: "Riverfront view",
        body: "Exterior scenes help visitors recognise the approach and entrance.",
      },
    ],
    credit: {
      label: "Modern Buildings 2 — Poly Haven (CC0)",
      href: "https://polyhaven.com/a/modern_buildings_2",
    },
  },
];
