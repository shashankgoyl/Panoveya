import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { articles } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights: Virtual Tour Guides for Businesses",
  description:
    "Practical guides on 360° virtual tours, Google Maps imagery and preparing your venue for a shoot — written for hotels, restaurants, venues and property in India.",
  path: "/insights",
});

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ]}
        eyebrow="Insights"
        title="Plain-English guides to virtual tours"
        intro="Straightforward answers to the questions businesses ask before investing in a virtual tour. No hype, no guaranteed results."
      />
      <section className="bg-mist-50 py-16 lg:py-24">
        <div className="container-page">
          <ul className="grid gap-6 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-midnight-900/6 transition hover:shadow-[var(--shadow-soft)]">
                  <div className="flex items-center gap-3 text-xs text-ink-500">
                    <span className="rounded-full bg-mint-200/60 px-2.5 py-1 font-semibold text-mint-800">
                      {a.topic}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock aria-hidden className="size-3.5" />
                      {a.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl leading-snug font-semibold text-ink-900">
                    <Link href={`/insights/${a.slug}`} className="after:absolute after:inset-0">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{a.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <time dateTime={a.published} className="text-ink-500">
                      {formatDate(a.published)}
                    </time>
                    <span className="inline-flex items-center gap-1 font-semibold text-mint-700">
                      Read <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
