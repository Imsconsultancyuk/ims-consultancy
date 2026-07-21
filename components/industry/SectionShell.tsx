import type { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  eyebrow?: string;
  heading: string;
  tone?: "paper" | "ink";
  className?: string;
  children: ReactNode;
}

export function SectionShell({
  id,
  eyebrow,
  heading,
  tone = "paper",
  className,
  children,
}: SectionShellProps) {
  const toneClasses =
    tone === "ink" ? "bg-ink text-paper-ink" : "bg-paper text-ink";
  const eyebrowClasses =
    tone === "ink" ? "text-paper-ink-soft" : "text-ink-soft";

  return (
    <section
      id={id}
      className={`${toneClasses} py-16 md:py-24${className ? ` ${className}` : ""}`}
      style={{ scrollMarginTop: "var(--industry-nav-offset, 5rem)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {eyebrow ? (
          <p className={`${eyebrowClasses} mb-3 text-sm font-medium uppercase tracking-wide`}>
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-industry-display text-3xl font-semibold md:text-4xl">
          {heading}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
