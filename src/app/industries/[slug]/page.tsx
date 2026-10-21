import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Camera, Lightbulb, MessageSquareQuote } from "lucide-react";
import { FaqList } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { PageHero, RelatedLinks } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { getIndustry, industries } from "@/content/industries";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const path = `/industries/${industry.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path },
        ]}
        eyebrow={`Virtual tours for ${industry.name.toLowerCase()}`}
        title={industry.headline}
        intro={industry.intro}
        aside={
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] ring-1 ring-white/15">
            <Image
              src={industry.image}
              alt={industry.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-midnight-950/70 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/15 backdrop-blur">
              Illustrative image · not a client project
            </figcaption>
          </figure>
        }
      >
        <ButtonLink href="/contact#enquiry" size="lg">
          Get a Free Quote <ArrowRight aria-hidden />
        </ButtonLink>
      </PageHero>

      <div className="bg-mist-50 py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article className="min-w-0 space-y-16">
            <section aria-labelledby="questions" className="grid gap-8 md:grid-cols-2">
              <div className="rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-midnight-900/6">
                <h2 id="questions" className="flex items-center gap-3 text-xl font-semibold text-ink-900">
                  <MessageSquareQuote aria-hidden className="size-5 text-mint-600" />
                  What your customers want to know
                </h2>
                <ul className="mt-5 space-y-3 text-sm text-ink-700">
                  {industry.customerQuestions.map((q) => (
                    <li key={q} className="border-l-2 border-mint-500 pl-3">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[var(--radius-card)] bg-midnight-900 p-7 text-white ring-1 ring-white/10">
                <h2 className="flex items-center gap-3 text-xl font-semibold">
                  <Camera aria-hidden className="size-5 text-mint-300" />
                  What we typically capture
                </h2>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
                  {industry.whatToCapture.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-mint-400" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="use-cases">
              <h2 id="use-cases" className="text-3xl font-semibold text-ink-900">
                How {industry.name.toLowerCase()} use virtual tours
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {industry.useCases.map((u) => (
                  <li key={u.title} className="rounded-2xl bg-white p-6 ring-1 ring-midnight-900/6">
                    <h3 className="font-semibold text-ink-900">{u.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{u.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="services-fit">
              <h2 id="services-fit" className="text-3xl font-semibold text-ink-900">
                Recommended services
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {industry.recommendedServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900 ring-1 ring-midnight-900/10 hover:ring-mint-600"
                    >
                      {s.label} <ArrowRight aria-hidden className="size-3.5 text-mint-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="tips" className="rounded-[var(--radius-card)] bg-mint-200/30 p-7 ring-1 ring-mint-600/20">
              <h2 id="tips" className="flex items-center gap-3 text-xl font-semibold text-ink-900">
                <Lightbulb aria-hidden className="size-5 text-mint-700" />
                Preparing for your shoot
              </h2>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-ink-700 marker:text-mint-600">
                {industry.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <Link
                href="/insights/prepare-your-space-for-a-360-photoshoot"
                className="mt-5 inline-flex text-sm font-semibold text-mint-700 underline underline-offset-4"
              >
                Read the full preparation checklist
              </Link>
            </section>

            <section aria-labelledby="industry-faq">
              <h2 id="industry-faq" className="mb-6 text-3xl font-semibold text-ink-900">
                Questions from {industry.name.toLowerCase()}
              </h2>
              <FaqList items={industry.faqs} />
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <RelatedLinks
              title="Other industries"
              links={industries
                .filter((i) => i.slug !== industry.slug)
                .map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))}
            />
            <RelatedLinks
              title="Learn more"
              links={[
                { label: "What is a 360° virtual tour?", href: "/insights/what-is-a-360-virtual-tour" },
                { label: "See the interactive demo", href: "/#experience" },
                { label: "Packages & pricing", href: "/#pricing" },
              ]}
            />
          </aside>
        </div>
      </div>
      <FinalCta />
      <JsonLd
        data={serviceJsonLd({
          name: `360° virtual tours for ${industry.name.toLowerCase()}`,
          description: industry.metaDescription,
          path,
          serviceType: "360° virtual tour",
          audience: [industry.name],
        })}
      />
    </>
  );
}
