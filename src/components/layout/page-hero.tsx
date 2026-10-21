import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-slate-200">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="hover:text-white">
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5 text-slate-600" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: ReactNode;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-midnight-950 bg-orbit-grid text-white">
      <div className="container-page grid gap-10 pt-10 pb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:pt-14 lg:pb-20">
        <div>
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow && (
            <div className="mt-8 text-xs font-semibold tracking-[0.18em] text-mint-300 uppercase">
              {eyebrow}
            </div>
          )}
          <h1 className="mt-4 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside && <div>{aside}</div>}
      </div>
    </section>
  );
}

export function RelatedLinks({ title = "Related", links }: { title?: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-midnight-900/6">
      <h2 className="text-sm font-semibold tracking-wider text-ink-500 uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-1.5 font-medium text-ink-900 hover:text-mint-700">
              {l.label}
              <ChevronRight aria-hidden className="size-4 text-mint-600 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
