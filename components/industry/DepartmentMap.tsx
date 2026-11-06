import { Reveal } from "@/app/_components/Reveal";
import { STAGE_LABELS, type SectorDepartments } from "@/lib/industries/departments";
import type { Accent, Pain, Tool } from "@/lib/industries/types";

interface DepartmentMapProps {
  departments: SectorDepartments;
  pains: [Pain, Pain, Pain];
  tools: [Tool, Tool, Tool];
  accent: Accent;
}

export function DepartmentMap({ departments, pains, tools, accent }: DepartmentMapProps) {
  const signal = `var(--color-signal-${accent})`;

  return (
    <div>
      <p className="max-w-3xl text-base text-ink-soft">
        Revenue does not leak from one place. It leaks at a different point in every
        department, and each one has a record that shows it. The audit reads{" "}
        {departments.source}, then follows a client from first enquiry to the next renewal.
      </p>

      {/* Lifecycle rail: one line, four nodes. Sits above the cards on md+ so the
          eye reads left to right before it reads any detail. */}
      <div aria-hidden="true" className="relative mt-10 hidden md:block">
        <div className="absolute left-[12.5%] right-[12.5%] top-[11px] h-px bg-line" />
        <div
          className="dept-rail-fill absolute left-[12.5%] right-[12.5%] top-[11px] h-px origin-left"
          style={{ backgroundColor: signal }}
        />
        <ol className="relative grid grid-cols-4">
          {departments.stages.map((stage, i) => (
            <li key={stage.key} className="flex flex-col items-center gap-2">
              <span
                className="num flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 bg-paper text-[11px] font-semibold text-ink"
                style={{ borderColor: signal }}
              >
                {i + 1}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                {STAGE_LABELS[stage.key]}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {departments.stages.map((stage, i) => {
          const pain = stage.pain === undefined ? null : pains[stage.pain];
          return (
            <li key={stage.key}>
              <Reveal delay={i * 80} className="h-full">
                <article className="flex h-full flex-col gap-4 rounded-[14px] border border-line bg-paper p-5">
                  <header>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-soft md:hidden">
                      {i + 1}. {STAGE_LABELS[stage.key]}
                    </p>
                    <h3 className="font-industry-display text-lg font-medium text-ink">
                      {stage.department}
                    </h3>
                  </header>

                  <p className="text-sm text-ink">{stage.problem}</p>

                  {pain ? (
                    <p
                      className="num inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold"
                      style={{ borderColor: signal, color: signal }}
                    >
                      {pain.cost}
                    </p>
                  ) : (
                    <p className="inline-flex w-fit items-center rounded-full border border-dashed border-line px-3 py-1 text-xs font-medium text-ink-soft">
                      Costed in the audit
                    </p>
                  )}

                  <dl className="mt-auto flex flex-col gap-3 border-t border-line pt-4 text-sm">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                        What the audit reads
                      </dt>
                      <dd className="mt-1 text-ink-soft">{stage.signal}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                        What your team gets
                      </dt>
                      <dd className="mt-1 text-ink">{stage.fix}</dd>
                    </div>
                  </dl>

                  {stage.tools.length > 0 ? (
                    <p className="flex flex-wrap gap-2">
                      {stage.tools.map((t) => (
                        <a
                          key={tools[t].id}
                          href="#tools"
                          className="inline-flex min-h-[44px] items-center rounded-full border border-line px-3 text-xs text-ink-soft transition-colors hover:text-ink motion-reduce:transition-none"
                        >
                          {tools[t].name}
                        </a>
                      ))}
                    </p>
                  ) : (
                    <p className="text-xs text-ink-soft">Covered in the audit and plan.</p>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
