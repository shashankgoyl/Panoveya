import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleAlert, HelpCircle } from "lucide-react";
import { FaqList } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { PageHero, RelatedLinks } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getServicePage, servicePages, serviceStatusLabel } from "@/content/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path },
        ]}
        eyebrow={service.eyebrow}
        title={service.headline}
        intro={service.intro}
        aside={
          <div className="rounded-[var(--radius-card)] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <Badge tone={service.status === "available" ? "mint" : "amber"}>
              {serviceStatusLabel[service.status]}
            </Badge>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Every project is quoted individually based on your space, location and the features you
              need.
            </p>
            <ButtonLink href="/contact#enquiry" className="mt-5 w-full">
              Get a Free Quote <ArrowRight aria-hidden />
            </ButtonLink>
          </div>
        }
      />

      <div className="bg-mist-50 py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article className="min-w-0 space-y-16">
            <section aria-labelledby="definition" className="rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-midnight-900/6">
              <h2 id="definition" className="flex items-start gap-3 text-2xl font-semibold text-ink-900">
                <HelpCircle aria-hidden className="mt-1 size-6 shrink-0 text-mint-600" />
                {service.definition.question}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-700">{service.definition.answer}</p>
            </section>

            <section aria-labelledby="what-you-get">
              <h2 id="what-you-get" className="text-3xl font-semibold text-ink-900">
                What&apos;s included
              </h2>
              <p className="mt-3 text-ink-500">Exact deliverables depend on your package and are confirmed in your quote.</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.whatYouGet.map((item) => (
                  <li key={item.title} className="rounded-2xl bg-white p-6 ring-1 ring-midnight-900/6">
                    <CheckCircle2 aria-hidden className="size-5 text-mint-600" />
                    <h3 className="mt-3 font-semibold text-ink-900">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="process">
              <h2 id="process" className="text-3xl font-semibold text-ink-900">
                How the project runs
              </h2>
              <ol className="mt-8 space-y-4">
                {service.process.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-midnight-900 font-display text-sm font-semibold text-mint-300">
                      {i + 1}
                    </span>
                    <p className="pt-1.5 text-ink-700">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="ideal-for">
              <h2 id="ideal-for" className="text-3xl font-semibold text-ink-900">
                Ideal for
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {service.idealFor.map((i) => (
                  <li key={i.href}>
                    <Link
                      href={i.href}
                      className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900 ring-1 ring-midnight-900/10 hover:ring-mint-600"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="considerations">
              <h2 id="considerations" className="text-3xl font-semibold text-ink-900">
                Good to know
              </h2>
              <ul className="mt-8 space-y-4">
                {service.considerations.map((c) => (
                  <li key={c.title} className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-midnight-900/6">
                    <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-600" />
                    <div>
                      <h3 className="font-semibold text-ink-900">{c.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{c.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="service-faq">
              <h2 id="service-faq" className="mb-6 text-3xl font-semibold text-ink-900">
                Frequently asked questions
              </h2>
              <FaqList items={service.faqs} />
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <RelatedLinks title="Related reading" links={service.related} />
            <RelatedLinks
              title="Other services"
              links={servicePages
                .filter((s) => s.slug !== service.slug)
                .map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` }))}
            />
          </aside>
        </div>
      </div>
      <FinalCta />
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.metaDescription,
          path,
          serviceType: service.shortTitle,
          audience: service.idealFor.map((i) => i.label),
        })}
      />
    </>
  );
}
