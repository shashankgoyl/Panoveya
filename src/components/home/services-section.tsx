import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceStatusLabel, serviceSummaries, type ServiceStatus } from "@/content/services";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "./service-icon";

const statusTone: Record<ServiceStatus, "mint" | "amber" | "slate"> = {
  available: "mint",
  "on-request": "amber",
  planned: "slate",
};

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-mist-50 py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="Everything you need to open your space online"
            description="Start with what customers need most. Each card shows whether a service is available now, scoped on request, or on our roadmap."
          />
          <ul aria-label="Service status legend" className="flex flex-wrap gap-2">
            {(Object.keys(serviceStatusLabel) as ServiceStatus[]).map((s) => (
              <li key={s}>
                <Badge tone={statusTone[s]}>{serviceStatusLabel[s]}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceSummaries.map((s) => {
            const planned = s.status === "planned";
            return (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className={cn(
                    "group flex h-full flex-col rounded-[var(--radius-card)] p-6 ring-1 transition duration-300",
                    planned
                      ? "bg-transparent ring-ink-500/20 ring-inset hover:bg-white"
                      : "bg-white shadow-[var(--shadow-soft)] ring-midnight-900/6 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(4_10_23/0.3)]",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl",
                        planned ? "bg-mist-100 text-ink-500" : "bg-midnight-900 text-mint-300",
                      )}
                    >
                      <ServiceIcon name={s.icon} className="size-5" />
                    </span>
                    <Badge tone={statusTone[s.status]}>{serviceStatusLabel[s.status]}</Badge>
                  </div>
                  <h3 className="mt-5 text-lg leading-snug font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-mint-700">
                    {planned ? "See our roadmap" : "Learn more"}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
