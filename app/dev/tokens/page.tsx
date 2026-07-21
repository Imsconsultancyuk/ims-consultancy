import type { Metadata } from "next";

// Scratch page for IMS-002 visual verification only. Delete before launch
// (IMS-064 AC). Not linked from anywhere; noindexed as a safeguard.
export const metadata: Metadata = {
  title: "Design tokens (dev)",
  robots: { index: false, follow: false },
};

const SIGNALS = [
  "amber",
  "emerald",
  "indigo",
  "violet",
  "sky",
  "rose",
  "teal",
  "orange",
  "cyan",
  "fuchsia",
] as const;

export default function DevTokensPage() {
  return (
    <main className="min-h-screen bg-paper p-12 text-ink">
      <h1 className="font-industry-display text-4xl font-semibold">
        Industry Pages — design tokens
      </h1>

      <section className="mt-10">
        <h2 className="font-industry-display text-xl font-medium">Palette</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="w-40">
            <div className="h-16 rounded-lg border border-line bg-paper" />
            <p className="mt-2 text-sm">paper (reused)</p>
          </div>
          <div className="w-40">
            <div className="h-16 rounded-lg bg-ink" />
            <p className="mt-2 text-sm text-ink">ink (reused)</p>
          </div>
          <div className="w-40">
            <div className="h-16 rounded-lg border border-line" />
            <p className="mt-2 text-sm">line</p>
          </div>
          <div className="w-40">
            <div className="h-16 rounded-lg bg-positive" />
            <p className="mt-2 text-sm">positive</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-industry-display text-xl font-medium">
          Signal accents
        </h2>
        <div className="mt-4 grid grid-cols-5 gap-4">
          {SIGNALS.map((signal) => (
            <div key={signal} className="w-full">
              <div
                className="h-16 rounded-lg"
                style={{ backgroundColor: `var(--color-signal-${signal})` }}
              />
              <p className="mt-2 text-sm">{signal}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-industry-display text-xl font-medium">Type</h2>
        <p className="font-industry-display mt-4 text-3xl font-semibold">
          Space Grotesk display — 600
        </p>
        <p className="mt-2 font-sans text-base">Inter body — 400</p>
        <p className="num mt-2 text-2xl">£43,400.00 1234567890</p>
      </section>
    </main>
  );
}
