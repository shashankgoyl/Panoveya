import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { photographerCta, primaryCta } from "@/content/navigation";

export function FinalCta({
  title = "Your Space Deserves to Be Experienced.",
  description = "Tell us about your business and we'll recommend the right tour for your space — no obligation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-midnight-900 bg-orbit-grid px-6 py-14 text-center text-white sm:px-12 lg:py-20">
          <LogoMark className="mx-auto size-12 text-white" />
          <h2 id="final-cta-heading" className="mx-auto mt-6 max-w-3xl text-3xl font-semibold sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">{description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href={photographerCta.href} size="lg" variant="ghostLight">
              Join the Photographer Network
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
