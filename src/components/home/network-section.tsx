import { ArrowRight, Camera, MapPin, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { networkPoints } from "@/content/home";
import { photographerCta } from "@/content/navigation";

const icons = [MapPin, Camera, Wrench];

export function NetworkSection() {
  return (
    <section
      id="network"
      aria-labelledby="network-heading"
      className="relative overflow-hidden bg-midnight-950 bg-orbit-grid py-20 text-white lg:py-28"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-mint-300 uppercase">
            <span aria-hidden className="h-px w-6 bg-mint-300" />
            For photographers
          </p>
          <h2 id="network-heading" className="text-3xl leading-[1.1] font-semibold sm:text-5xl">
            Turn Your 360° Skills Into Opportunities.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            PanoVeya is building a nationwide network of trained 360° photographers. Register your
            interest with your location and equipment, and we&apos;ll consider you for future
            assignments as we grow into new cities and towns.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={photographerCta.href} size="lg">
              {photographerCta.label}
              <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href="/photographer-network" size="lg" variant="ghostLight">
              How the network works
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
          <ul className="space-y-5">
            {networkPoints.map((point, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={point} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint-400/15 text-mint-300 ring-1 ring-mint-400/25">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="pt-2 text-slate-200">{point}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
            This is an expression-of-interest process, not a live job marketplace. Joining doesn&apos;t
            guarantee work or automatic assignment.
          </p>
        </div>
      </div>
    </section>
  );
}
