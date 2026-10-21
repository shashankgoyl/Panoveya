import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingFactors, pricingTiers } from "@/content/pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-mist-50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          id="pricing-heading"
          eyebrow="Packages"
          title="A package for every size of space"
          description="Every space is different, so we quote each project individually. Tell us about yours and we'll recommend the right package."
          align="center"
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <li
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-[1.5rem] p-8 ring-1",
                tier.highlighted
                  ? "bg-midnight-900 text-white ring-mint-400/40 shadow-[var(--shadow-glow)]"
                  : "bg-white text-ink-900 ring-midnight-900/8 shadow-[var(--shadow-soft)]",
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-mint-400 px-3 py-1 text-xs font-semibold text-midnight-950">
                  Suits most venues
                </span>
              )}
              <h3 className="text-2xl font-semibold">{tier.name}</h3>
              <p className={cn("mt-1 text-sm font-medium", tier.highlighted ? "text-mint-300" : "text-mint-700")}>
                {tier.audience}
              </p>
              <p className={cn("mt-4 text-sm leading-relaxed", tier.highlighted ? "text-slate-300" : "text-ink-500")}>
                {tier.description}
              </p>
              <p className="mt-6 font-display text-2xl font-semibold">
                {tier.priceLabel ?? "Price on request"}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      aria-hidden
                      className={cn("mt-0.5 size-4 shrink-0", tier.highlighted ? "text-mint-300" : "text-mint-600")}
                    />
                    <span className={tier.highlighted ? "text-slate-200" : "text-ink-700"}>{item}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/contact?package=${tier.id}#enquiry`}
                variant={tier.highlighted ? "primary" : "dark"}
                className="mt-8 w-full"
                aria-label={`Request a quote for the ${tier.name} package`}
              >
                Request a Quote
              </ButtonLink>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 ring-1 ring-midnight-900/6">
          <h3 className="text-sm font-semibold text-ink-900">What affects your quote</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {pricingFactors.map((f) => (
              <li key={f} className="rounded-full bg-mist-100 px-3 py-1.5 text-xs font-medium text-ink-700">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
