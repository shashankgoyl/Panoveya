import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Faq } from "@/content/faqs";

/**
 * FAQ list using native <details>/<summary>: keyboard accessible, works without
 * JavaScript, and the answers stay in the server-rendered HTML for crawlers.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-midnight-900/8 rounded-[var(--radius-card)] bg-white ring-1 ring-midnight-900/6">
      {items.map((faq) => (
        <details key={faq.question} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-ink-900">
            <h3 className="text-base">{faq.question}</h3>
            <Plus
              aria-hidden
              className="size-5 shrink-0 text-mint-700 transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="pb-6 text-sm leading-relaxed text-ink-500">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ items }: { items: Faq[] }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-mist-50 py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Questions businesses ask us"
          description="Straight answers about how virtual tours work, what's included and how we work with you."
        />
        <FaqList items={items} />
      </div>
    </section>
  );
}
