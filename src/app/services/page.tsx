import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/home/final-cta";
import { ServiceIcon } from "@/components/home/service-icon";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { servicePages, serviceStatusLabel, serviceSummaries } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "360° Virtual Tour Services",
  description:
    "PanoVeya's virtual tour services: Google Maps–ready 360° imagery, branded website tours, 360° photography, hotspots, multi-room walkthroughs and 3D digital twins.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        eyebrow="Services"
        title="Virtual tour services for businesses in India"
        intro="From Google Maps–ready 360° photos to branded, interactive website tours. Each service is labelled honestly: available now, scoped on request, or on our roadmap."
      />

      <section className="bg-mist-50 py-16 lg:py-24" aria-labelledby="core-services">
        <div className="container-page">
          <SectionHeading id="core-services" eyebrow="In depth" title="Explore our core services" />
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] bg-midnight-900 p-7 text-white ring-1 ring-white/10 transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
                >
                  <Badge tone={s.status === "available" ? "mint" : "amber"} className="self-start">
                    {serviceStatusLabel[s.status]}
                  </Badge>
                  <h2 className="mt-5 text-2xl font-semibold">{s.shortTitle}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{s.metaDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-300">
                    Read more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-20 text-2xl font-semibold text-ink-900">All services at a glance</h2>
          <ul className="mt-6 divide-y divide-midnight-900/8 rounded-[var(--radius-card)] bg-white ring-1 ring-midnight-900/6">
            {serviceSummaries.map((s) => (
              <li key={s.id} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-midnight-900 text-mint-300">
                  <ServiceIcon name={s.icon} className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-ink-900">{s.title}</h3>
                    <Badge
                      tone={s.status === "available" ? "mint" : s.status === "on-request" ? "amber" : "slate"}
                    >
                      {serviceStatusLabel[s.status]}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.summary}</p>
                </div>
                <Link href={s.href} className="shrink-0 text-sm font-semibold text-mint-700 hover:text-mint-800">
                  {s.status === "planned" ? "Roadmap" : "Details"} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
