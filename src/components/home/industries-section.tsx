import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/content/industries";

export function IndustriesSection() {
  return (
    <section id="industries" aria-labelledby="industries-heading" className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          id="industries-heading"
          eyebrow="Industries"
          title="Built for spaces people choose with their eyes"
          description="Every industry has different questions before a visit. We plan each tour around what your customers actually want to see."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-mist-50 ring-1 ring-midnight-900/6">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-midnight-950/70 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                    Illustrative image
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-ink-900">{industry.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                    {industry.cardDescription}
                  </p>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-700 after:absolute after:inset-0 hover:text-mint-800"
                  >
                    {industry.cardCta}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
