import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { OpenSceneButton } from "@/components/panorama/open-scene-button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { panoramaScenes } from "@/content/panoramas";
import { portfolioItems, portfolioKindLabel } from "@/content/portfolio";

export function PortfolioSection() {
  const sceneIds = new Set(panoramaScenes.map((s) => s.id));
  const hasClientWork = portfolioItems.some((p) => p.kind === "client-project");

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="portfolio-heading"
            eyebrow="Portfolio & demos"
            title="Concept demos of the experiences we create"
            description={
              hasClientWork
                ? "A selection of delivered projects alongside concept demos."
                : "We're a new studio, so these are illustrative examples made from openly licensed 360° imagery — not client projects. Real projects will appear here as they're delivered, with permission."
            }
          />
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <li key={item.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-mist-50 ring-1 ring-midnight-900/6">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                  <Badge
                    tone={item.kind === "client-project" ? "mint" : "glass"}
                    className="absolute top-3 left-3"
                  >
                    {portfolioKindLabel[item.kind]}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-wider text-mint-700 uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink-900">{item.title}</h3>
                  {(item.client || item.location) && (
                    <p className="mt-1 text-sm text-ink-500">
                      {[item.client, item.location].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{item.summary}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    {item.panoramaId && sceneIds.has(item.panoramaId) ? (
                      <OpenSceneButton sceneId={item.panoramaId} label="View in 360°" />
                    ) : item.tourUrl ? (
                      <a
                        href={item.tourUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-mint-700"
                      >
                        Open tour <ExternalLink aria-hidden className="size-4" />
                      </a>
                    ) : (
                      <span />
                    )}
                    {item.credit && (
                      <a
                        href={item.credit.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ink-500 underline underline-offset-2 hover:text-ink-700"
                      >
                        Image: {item.credit.label}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
