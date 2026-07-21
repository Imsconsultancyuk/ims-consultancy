import type { Metadata } from "next";

import { DevDemoHarness } from "./DevDemoHarness";

// Scratch page for IMS-045 manual QA only (keyboard pass, contrast, touch
// targets, reduced-motion) — no industry page exists yet to test the demo/
// components against (IMS-050 page assembly hasn't started). Modeled
// directly on the /dev/tokens precedent (IMS-002 AC: "scratch page ... for
// visual check, delete before launch"). Not in Doc 1 Section 2's file map —
// flagged as a deviation per hard rule 6. Delete before launch (IMS-064 AC).
export const metadata: Metadata = {
  title: "Demo components (dev)",
  robots: { index: false, follow: false },
};

export default function DevDemoPage() {
  return <DevDemoHarness />;
}
