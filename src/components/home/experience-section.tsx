import { MousePointer2, Navigation, Smartphone } from "lucide-react";
import { PanoramaExperience } from "@/components/panorama/panorama-experience";
import { PanoramaFallback } from "@/components/panorama/panorama-fallback";
import { SectionHeading } from "@/components/ui/section-heading";
import { panoramaScenes } from "@/content/panoramas";

const steps = [
  {
    icon: MousePointer2,
    title: "Look in every direction",
    body: "Drag on desktop or swipe on mobile to see the whole space — ceiling to floor.",
  },
  {
    icon: Navigation,
    title: "Move between areas",
    body: "In a full tour, navigation points take visitors from room to room along a natural route.",
  },
  {
    icon: Smartphone,
    title: "Open details and enquire",
    body: "Hotspots reveal capacities, menus or room details, and buttons lead to your enquiry page.",
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-midnight-900 py-20 text-white lg:py-28"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeading
            id="experience-heading"
            tone="dark"
            eyebrow="Interactive preview"
            title="See how a visitor explores a space"
            description={
              <>
                These are genuine 360° panoramas you can explore right here. They&apos;re sample scenes
                (CC0 imagery from Poly Haven), not PanoVeya client projects — they show how your own
                space could be experienced online.
              </>
            }
          />
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/8">
                <s.icon aria-hidden className="size-5 text-mint-300" />
                <p className="mt-3 text-sm font-semibold">
                  <span className="text-mint-300">{i + 1}.</span> {s.title}
                </p>
                <p className="mt-1 text-sm text-slate-400">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12">
          {panoramaScenes.length > 0 ? (
            <PanoramaExperience scenes={panoramaScenes} />
          ) : (
            <PanoramaFallback />
          )}
        </div>
      </div>
    </section>
  );
}
