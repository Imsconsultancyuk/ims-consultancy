import { Reveal } from "./Reveal";

export interface HeroFigure {
  label: string;
  value: string;
  /** Marks the row the leak line points at: an amber tick, one per panel. */
  marked?: boolean;
}

/**
 * Real figures on the right of an inner hero (desktop only). Every value must
 * come from lib data, never typed in by hand, so the panel cannot drift from
 * the page it summarises. Sits in a `lg:grid` beside the hero copy.
 */
export function HeroFigures({
  label,
  figures,
  note,
}: {
  label: string;
  figures: HeroFigure[];
  note?: string;
}): React.JSX.Element {
  return (
    <aside aria-label={label} className="hidden lg:block">
      <Reveal delay={240}>
        <dl className="border-t border-paper-ink/25">
          {figures.map((f) => (
            <div key={f.label} className="relative border-b border-paper-ink/12 py-4 pl-5">
              {f.marked ? (
                <span aria-hidden className="absolute inset-y-3 left-0 w-[3px] bg-accent-500" />
              ) : null}
              <dt className="text-[0.8125rem] leading-snug text-mauve-200">{f.label}</dt>
              <dd className="mt-1 font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.01em] text-paper-ink">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
        {note ? <p className="mt-4 pl-5 text-[0.8125rem] leading-[1.6] text-mauve-300">{note}</p> : null}
      </Reveal>
    </aside>
  );
}
