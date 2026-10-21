import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/home";

export function ProcessSection() {
  return (
    <section id="how-it-works" aria-labelledby="process-heading" className="bg-mist-50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="From first message to finished tour in four steps"
          description="Final deliverables — number of scenes, hotspots, hosting and publishing — depend on the package you choose, and are confirmed in writing before we begin."
          align="center"
        />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-mint-500/0 via-mint-500/50 to-mint-500/0 lg:block"
          />
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-midnight-900/6"
            >
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-midnight-900 font-display text-xl font-semibold text-mint-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
