import { faqs } from "@/content/faqs";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { serviceStatusLabel, serviceSummaries, servicePages } from "@/content/services";
import { absoluteUrl, siteConfig } from "@/content/site";

/**
 * /llms.txt — an optional, plain-text summary of the site for AI tools.
 * It's a supplementary resource (llmstxt.org proposal) and carries no ranking guarantee.
 * Generated from the same content files as the website, so it stays consistent.
 */
export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Tagline: ${siteConfig.tagline}`,
    `Mission: ${siteConfig.mission}`,
    `Country: ${siteConfig.country}`,
    "",
    "Notes: PanoVeya is independent and not affiliated with Google. Portfolio items on the website are labelled concept demos until client projects are published. No guaranteed results are offered.",
    "",
    "## Services",
    ...serviceSummaries.map((s) => `- ${s.title} (${serviceStatusLabel[s.status]}): ${s.summary}`),
    "",
    "## Service pages",
    ...servicePages.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.metaDescription}`),
    "",
    "## Industries",
    ...industries.map((i) => `- [${i.name}](${absoluteUrl(`/industries/${i.slug}`)}): ${i.metaDescription}`),
    "",
    "## Insights",
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/insights/${a.slug}`)}): ${a.keyTakeaway}`),
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## Key pages",
    `- [Get a free quote](${absoluteUrl("/contact")})`,
    `- [Photographer network](${absoluteUrl("/photographer-network")})`,
    `- [About](${absoluteUrl("/about")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
