import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Compass, Move3d } from "lucide-react";
import heroImage from "@/assets/images/hero-banquet-hall.jpg";
import { ButtonLink } from "@/components/ui/button";
import { heroBenefits } from "@/content/home";
import { primaryCta } from "@/content/navigation";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-midnight-950 bg-orbit-grid text-white"
    >
      <div className="container-page grid items-center gap-12 pt-14 pb-20 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:pt-20 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-xs font-semibold tracking-wide text-mint-200 ring-1 ring-white/10">
            <Compass aria-hidden className="size-3.5" />
            Immersive 360° virtual tours · Made in India
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4.1rem]"
          >
            Let Your Customers{" "}
            <span className="bg-gradient-to-r from-mint-300 to-mint-500 bg-clip-text text-transparent">
              Step Inside
            </span>{" "}
            Before They Arrive.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Turn your physical space into an immersive digital experience. PanoVeya helps hotels,
            restaurants, venues and businesses showcase their spaces through interactive 360° virtual
            tours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href="/#services" size="lg" variant="ghostLight">
              Explore Our Services
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroBenefits.map((b) => (
              <li key={b.title} className="flex gap-3 sm:flex-col sm:gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint-400/15 text-mint-300 ring-1 ring-mint-400/30">
                  <Check aria-hidden className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{b.title}</span>
                  <span className="mt-0.5 block text-sm text-slate-400">{b.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-0 rounded-[2rem] bg-gradient-to-tr from-mint-500/20 via-transparent to-midnight-600/40 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 shadow-[var(--shadow-glow)]">
            <div className="relative aspect-[4/3] sm:aspect-[16/11]">
              <Image
                src={heroImage}
                alt="Grand banquet hall with white columns, gilded capitals, a balcony and herringbone parquet floor"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/85 via-transparent to-midnight-950/30" />

              {/* Viewer-style chrome, clearly labelled as a still preview. */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-midnight-950/70 px-3 py-1 text-xs font-semibold ring-1 ring-white/15 backdrop-blur">
                  Still preview
                </span>
                <span className="rounded-full bg-midnight-950/70 px-3 py-1 text-xs font-semibold text-mint-200 ring-1 ring-white/15 backdrop-blur">
                  Concept demo
                </span>
              </div>
              <div
                aria-hidden
                className="absolute top-[38%] left-[58%] hidden size-7 rounded-full border-[3px] border-white bg-mint-400 shadow-lg sm:block"
              >
                <span className="absolute -inset-1 rounded-full border-2 border-mint-300 motion-safe:animate-pulse-ring" />
              </div>
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-display text-lg font-semibold">Heritage banquet hall</p>
                  <p className="text-sm text-slate-300">Sample scene · wedding & event venue</p>
                </div>
                <Link
                  href="/#experience"
                  className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-midnight-950 transition hover:bg-mint-200"
                >
                  <Move3d aria-hidden className="size-4" />
                  Try the live 360° demo
                </Link>
              </div>
            </div>
          </div>
          <figcaption className="sr-only">
            A still image from a sample 360° scene. The interactive version is available in the demo
            section below.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
