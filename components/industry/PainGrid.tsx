import type { Accent, Pain } from "@/lib/industries/types";

interface PainGridProps {
  pains: [Pain, Pain, Pain];
  accent: Accent;
}

export function PainGrid({ pains, accent }: PainGridProps) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
      {pains.map((pain) => (
        <div key={pain.title} className="flex flex-col gap-3 bg-paper p-6">
          <h3 className="font-industry-display text-lg font-medium text-ink">
            {pain.title}
          </h3>
          <p
            className="num text-2xl font-semibold"
            style={{ color: `var(--color-signal-${accent})` }}
          >
            {pain.cost}
          </p>
          <p className="text-sm text-ink-soft">{pain.line}</p>
        </div>
      ))}
    </div>
  );
}
