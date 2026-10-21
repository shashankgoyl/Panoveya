import type { Metadata } from "next";
import { Compass, Eye, Handshake, Layers } from "lucide-react";
import { FinalCta } from "@/components/home/final-cta";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { panoramaScenes } from "@/content/panoramas";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About PanoVeya",
  description:
    "PanoVeya is an Indian startup creating 360° virtual tours for businesses and building a nationwide network of 360° photographers. Our mission, principles and roadmap.",
  path: "/about",
});

const principles = [
  {
    icon: Eye,
    title: "Show spaces honestly",
    body: "Tours should help customers see what they'll actually experience. We don't over-edit spaces or promise results we can't control.",
  },
  {
    icon: Handshake,
    title: "Clear scopes and quotes",
    body: "You'll know what's included, where your tour is hosted and what any renewals cost before work begins.",
  },
  {
    icon: Layers,
    title: "Built to last",
    body: "We plan captures so the same imagery can serve your website, Google Maps and future formats.",
  },
  {
    icon: Compass,
    title: "Local, nationwide",
    body: "A growing network of trained photographers lets us reach businesses beyond the largest metros.",
  },
];

const roadmap = [
  {
    phase: "Now",
    status: "Live",
    title: "Virtual tour studio",
    items: [
      "360° photography and branded website tours",
      "Google Maps–ready imagery",
      "Hotspots and multi-room walkthroughs",
      "Photographer network registrations",
    ],
  },
  {
    phase: "Next",
    status: "Planned",
    title: "Network & hosting platform",
    items: [
      "Photographer onboarding and quality standards",
      "Client project tracking",
      "Hosted tours managed by PanoVeya",
    ],
  },
  {
    phase: "Later",
    status: "Exploring",
    title: "Intelligent experiences",
    items: [
      "AI-guided tours that answer visitor questions",
      "Booking and enquiry integrations",
      "Analytics on how visitors explore spaces",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        eyebrow="About us"
        title="Helping people experience places before they arrive"
        intro={siteConfig.mission}
      />

      <section className="bg-mist-50 py-16 lg:py-24" aria-labelledby="story">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading
            id="story"
            eyebrow="What we do"
            title="Two businesses, one brand"
            description={
              <div className="space-y-4">
                <p>
                  {siteConfig.name} is an Indian startup with two complementary goals. First, we create
                  immersive 360° virtual tours for hotels, restaurants, wedding venues, property,
                  showrooms and institutions, so customers can explore a space before they visit.
                </p>
                <p>
                  Second, we&apos;re building a nationwide network of trained 360° photographers, so
                  businesses in every region can get consistent, professional capture without relying on
                  a single city-based team.
                </p>
                <p>
                  We&apos;re at the beginning of that journey. Our portfolio currently shows concept demos
                  rather than client work, and we&apos;ll add real projects — with permission — as
                  they&apos;re delivered.
                </p>
              </div>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-midnight-900/6">
                <p.icon aria-hidden className="size-6 text-mint-600" />
                <h3 className="mt-4 font-semibold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="roadmap" className="bg-midnight-900 py-16 text-white lg:py-24" aria-labelledby="roadmap-heading">
        <div className="container-page">
          <SectionHeading
            id="roadmap-heading"
            tone="dark"
            eyebrow="Roadmap"
            title="Where PanoVeya is heading"
            description="Only the first column is available today. Later phases are plans, not commitments, and may change based on what our clients need."
          />
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {roadmap.map((r) => (
              <li key={r.phase} className="rounded-[var(--radius-card)] bg-white/5 p-7 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-slate-400">{r.phase}</span>
                  <Badge tone={r.status === "Live" ? "mint" : "glass"}>{r.status}</Badge>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{r.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {r.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-mint-400" />
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16" aria-labelledby="credits">
        <div className="container-page max-w-3xl">
          <h2 id="credits" className="text-2xl font-semibold text-ink-900">
            Image credits
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">
            Sample panoramas and the stills derived from them are CC0 (public domain) assets from Poly
            Haven, used as concept demos. They are not PanoVeya client projects.
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {panoramaScenes.map((s) => (
              <li key={s.id}>
                <a
                  href={s.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint-700 underline underline-offset-2"
                >
                  {s.credit.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
