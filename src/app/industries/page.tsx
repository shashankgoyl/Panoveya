import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/home/final-cta";
import { PageHero } from "@/components/layout/page-hero";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Virtual Tours by Industry",
  description:
    "360° virtual tours for hotels and resorts, restaurants and cafés, wedding venues, real estate, retail showrooms and educational institutions in India.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
        eyebrow="Industries"
        title="Virtual tours planned around your customers"
        intro="Each industry has different questions before a visit. Choose yours to see what we capture, how tours are used and how to prepare."
      />
      <section className="bg-mist-50 py-16 lg:py-24">
        <div className="container-page">
          <ul className="grid gap-6 md:grid-cols-2">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group grid h-full overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-midnight-900/6 transition hover:shadow-[var(--shadow-soft)] sm:grid-cols-[13rem_1fr]"
                >
                  <div className="relative aspect-[16/9] sm:aspect-auto">
                    <Image
                      src={industry.image}
                      alt={industry.imageAlt}
                      fill
                      sizes="(min-width: 640px) 13rem, 100vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-ink-900">{industry.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{industry.cardDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-700">
                      {industry.cardCta}
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
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
