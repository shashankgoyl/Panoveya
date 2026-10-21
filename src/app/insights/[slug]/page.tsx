import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Info } from "lucide-react";
import { FinalCta } from "@/components/home/final-cta";
import { PageHero, RelatedLinks } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { articles, getArticle, type ArticleBlock } from "@/content/insights";
import { siteConfig } from "@/content/site";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated ?? article.published,
  });
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case "note":
      return (
        <aside className="flex gap-3 rounded-xl bg-mist-100 p-4 text-sm text-ink-700 not-italic">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-mint-700" />
          <span>{block.text}</span>
        </aside>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const path = `/insights/${article.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path },
        ]}
        eyebrow={article.topic}
        title={article.title}
        intro={article.description}
      >
        <p className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <span>
            By {siteConfig.name} ·<time dateTime={article.published}>{formatDate(article.published)}</time>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-4" /> {article.readingMinutes} min read
          </span>
        </p>
      </PageHero>

      <div className="bg-mist-50 py-16 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,46rem)_18rem] lg:justify-between">
          <article className="min-w-0">
            <div className="rounded-[var(--radius-card)] border-l-4 border-mint-500 bg-white p-6 ring-1 ring-midnight-900/6">
              <p className="text-xs font-semibold tracking-wider text-mint-700 uppercase">Key takeaway</p>
              <p className="mt-2 leading-relaxed text-ink-900">{article.keyTakeaway}</p>
            </div>
            <div className="prose-pv mt-10">
              {article.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <RelatedLinks title="Related" links={article.related} />
            <RelatedLinks
              title="More insights"
              links={articles
                .filter((a) => a.slug !== article.slug)
                .map((a) => ({ label: a.title, href: `/insights/${a.slug}` }))}
            />
          </aside>
        </div>
      </div>
      <FinalCta
        title="Ready to show customers your space?"
        description="Tell us about your business and we'll recommend the right virtual tour — no obligation."
      />
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          path,
          published: article.published,
          updated: article.updated,
        })}
      />
    </>
  );
}
