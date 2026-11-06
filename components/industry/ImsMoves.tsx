import { Reveal } from "@/app/_components/Reveal";
import type { SectorDepartments } from "@/lib/industries/departments";
import type { Accent, Industry } from "@/lib/industries/types";

interface ImsMovesProps {
  industry: Industry;
  departments: SectorDepartments;
  accent: Accent;
}

interface Move {
  verb: string;
  title: string;
  body: string;
}

// Five moves, each drawn from fields the sector already carries, so the copy
// cannot drift from the tools, package and department data it summarises.
function movesFor(industry: Industry, departments: SectorDepartments): Move[] {
  return [
    {
      verb: "Audit",
      title: "Read the records",
      body: `We read ${departments.source} and mark every leak by department.`,
    },
    {
      verb: "Plan",
      title: "Rank by money",
      body: "The four departments are ranked by what each one is costing, then fixed in that order.",
    },
    {
      verb: "Produce",
      title: "Build the three tools",
      body: industry.tools.map((t) => t.name).join(", ") + ", configured to your firm.",
    },
    {
      verb: "Engage",
      title: "Put it in front of people",
      body: industry.tools[0].actions[0],
    },
    {
      verb: "Deploy",
      title: "Switch it on",
      body: `${industry.package.timeline}. ${industry.package.includes[industry.package.includes.length - 1]}.`,
    },
  ];
}

export function ImsMoves({ industry, departments, accent }: ImsMovesProps) {
  const signal = `var(--color-signal-${accent})`;
  const moves = movesFor(industry, departments);

  return (
    <div>
      <p className="max-w-3xl text-base text-paper-ink-soft">
        Five moves, in order. Each one is small enough to finish in a week and leaves you
        something you can use.
      </p>

      <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-5">
        {moves.map((move, i) => (
          <li key={move.verb}>
            <Reveal delay={i * 90} className="h-full">
              <div className="relative flex h-full flex-col gap-3 rounded-[14px] border border-white/15 p-5">
                <span
                  className="num text-xs font-semibold uppercase tracking-wide"
                  style={{ color: signal }}
                >
                  {String(i + 1).padStart(2, "0")} · {move.verb}
                </span>
                <h3 className="font-industry-display text-lg font-medium text-paper-ink">
                  {move.title}
                </h3>
                <p className="text-sm text-paper-ink-soft">{move.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
