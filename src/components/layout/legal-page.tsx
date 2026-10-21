import type { ReactNode } from "react";
import { PageHero } from "./page-hero";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
        title={title}
        intro={<span className="text-base">Last updated: {updated}</span>}
      />
      <section className="bg-mist-50 py-14 lg:py-20">
        <div className="container-page max-w-3xl">
          <div className="prose-pv rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-midnight-900/6 sm:p-10">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
