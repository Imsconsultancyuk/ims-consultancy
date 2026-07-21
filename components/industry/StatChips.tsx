import type { Stat } from "@/lib/industries/types";

interface StatChipsProps {
  stats: [Stat, Stat, Stat];
}

export function StatChips({ stats }: StatChipsProps) {
  return (
    <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          data-stat-chip
          className="border-l-2 border-line pl-4"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <dd className="num text-3xl font-semibold text-ink md:text-4xl">
            {stat.value}
          </dd>
          <dt className="mt-1 text-sm text-ink-soft">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
