import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import cafeImage from "@/assets/images/cafe-seating.jpg";
import { SectionHeading } from "@/components/ui/section-heading";
import { benefits } from "@/content/home";

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-heading" className="bg-white py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-midnight-900/8">
            <Image
              src={cafeImage}
              alt="Café interior with green tablecloths, a beige sofa with yellow and red cushions, and framed art"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 max-w-[17rem] rounded-2xl bg-midnight-900 p-5 text-white shadow-xl ring-1 ring-white/10 sm:left-auto sm:-right-4">
            <p className="text-xs font-semibold tracking-wider text-mint-300 uppercase">Why it matters</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              A photo shows one angle. A tour shows how the whole space fits together.
            </p>
          </div>
        </div>
        <div>
          <SectionHeading
            id="benefits-heading"
            eyebrow="Benefits"
            title="Give customers the confidence to visit"
            description="A virtual tour doesn't replace a great product or service — it helps people understand your space before they commit their time."
          />
          <ul className="mt-8 space-y-5">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-mint-600" />
                <div>
                  <h3 className="font-semibold text-ink-900">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-xl bg-mist-100 p-4 text-xs leading-relaxed text-ink-500">
            We don&apos;t promise specific increases in bookings, revenue, rankings or conversions.
            Results depend on your offer, pricing, reviews and wider marketing.
          </p>
        </div>
      </div>
    </section>
  );
}
