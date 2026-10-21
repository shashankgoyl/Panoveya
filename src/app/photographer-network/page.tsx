import type { Metadata } from "next";
import { Award, ClipboardCheck, MapPinned, Route, ShieldCheck, UserPlus } from "lucide-react";
import { FaqList } from "@/components/home/faq-section";
import { PhotographerApplicationForm } from "@/components/forms/photographer-application-form";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Join the 360° Photographer Network",
  description:
    "360° and virtual tour photographers in India: register your interest in the PanoVeya network with your location, experience and equipment.",
  path: "/photographer-network",
});

const steps = [
  {
    icon: UserPlus,
    title: "Register your interest",
    body: "Tell us where you're based, your experience level, the equipment you own and when you're available.",
  },
  {
    icon: ClipboardCheck,
    title: "We review applications",
    body: "We look at experience, equipment and coverage needs as we expand into new areas. This may include a short call or a sample request.",
  },
  {
    icon: MapPinned,
    title: "Considered for assignments",
    body: "When a suitable project comes up near you, we may contact you with the brief, timeline and fee for that specific assignment.",
  },
];

const lookingFor = [
  { icon: Award, text: "Experience with 360° capture, real estate, interior or architectural photography" },
  { icon: Route, text: "Willingness to follow a capture plan and consistent quality standards" },
  { icon: ShieldCheck, text: "Respect for client privacy, punctuality and professional conduct on site" },
];

const faqs = [
  {
    question: "Is this a job offer?",
    answer:
      "No. This is an expression-of-interest process. Registering doesn't guarantee assignments, a minimum volume of work, or automatic allocation of projects.",
  },
  {
    question: "Do I need my own 360° camera?",
    answer:
      "Tell us about the equipment you have. Many assignments need a 360° camera or a camera with a panoramic head and a sturdy tripod; requirements vary by project.",
  },
  {
    question: "Which locations are you looking for?",
    answer:
      "We welcome applications from anywhere in India. Demand will vary by city and town as the network grows.",
  },
  {
    question: "How will I be paid?",
    answer:
      "Fees and terms are agreed per assignment before any work begins. There is no fee to apply.",
  },
];

export default function PhotographerNetworkPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Photographer Network", path: "/photographer-network" },
        ]}
        eyebrow="Photographer network"
        title="Turn Your 360° Skills Into Opportunities."
        intro="PanoVeya is building a nationwide network of trained 360° photographers to serve hotels, restaurants, venues and property across India. Register your interest and be considered for future assignments in your area."
      >
        <ButtonLink href="#apply" size="lg">
          Apply to Join the Network
        </ButtonLink>
      </PageHero>

      <section className="bg-mist-50 py-16 lg:py-24" aria-labelledby="how-network-works">
        <div className="container-page">
          <SectionHeading
            id="how-network-works"
            eyebrow="How it works"
            title="A simple, transparent process"
            description="At this stage the network is a registration of interest — not a live job marketplace."
          />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-midnight-900/6">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-midnight-900 text-mint-300">
                    <s.icon aria-hidden className="size-5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink-500">Step {i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink-900">What we look for</h2>
              <ul className="mt-6 space-y-4">
                {lookingFor.map((l) => (
                  <li key={l.text} className="flex gap-3 text-ink-700">
                    <l.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-mint-600" />
                    {l.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-ink-900">Photographer FAQs</h2>
              <FaqList items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-heading" className="bg-white py-16 lg:py-24">
        <div className="container-page max-w-4xl">
          <div className="rounded-[1.5rem] bg-mist-50 p-6 ring-1 ring-midnight-900/6 sm:p-10">
            <h2 id="apply-heading" className="text-3xl font-semibold text-ink-900">
              Photographer application
            </h2>
            <p className="mt-2 mb-8 text-ink-500">
              It takes about three minutes. We&apos;ll only use your details to assess and contact you
              about the network.
            </p>
            <PhotographerApplicationForm
              fallback={{ email: contact.email, whatsapp: contact.whatsapp, phone: contact.phone }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
