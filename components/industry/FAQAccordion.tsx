import type { Faq } from "@/lib/industries/types";

interface FAQAccordionProps {
  faqs: [Faq, Faq, Faq, Faq, Faq];
}

// Native <details>/<summary> — no JS state. `open` on the first item is a
// plain static prop (becomes the HTML `open` attribute), not React state, so
// keyboard/screen-reader behaviour is entirely the browser's native
// disclosure semantics (IMS-027 AC). Content renders q/a exactly as given so
// the JSON-LD emitted in IMS-052 can reuse these same strings unchanged.
export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {faqs.map((faq, index) => (
        <details key={faq.q} open={index === 0} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-industry-display text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
            {faq.q}
            <span
              aria-hidden="true"
              className="shrink-0 text-xl leading-none text-ink-soft transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-ink-soft">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
