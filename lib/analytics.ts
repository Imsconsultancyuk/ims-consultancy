// Analytics stub for the Industry Pages feature (IMS-004). No provider
// exists in this repo (see docs/industry-pages-audit.md §5) — track() logs
// to the dev console and no-ops in production until a provider is wired.

export type AnalyticsEvent =
  | "demo_armed"
  | "demo_file_dropped"
  | "demo_completed"
  | "tool_card_view"
  | "tool_quick_select"
  | "privacy_toggle_used"
  | "package_cta_clicked"
  | "book_call_clicked"
  | "sample_report_requested";

export interface AnalyticsProps {
  industry: string;
  tool?: string;
  [key: string]: string | number | boolean | undefined;
}

export function track(event: AnalyticsEvent, props: AnalyticsProps): void {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[analytics] ${event}`, props);
  }

  if (typeof window === "undefined") return;

  const plausible = (
    window as typeof window & {
      plausible?: (name: string, options?: { props: AnalyticsProps }) => void;
    }
  ).plausible;
  if (typeof plausible === "function") {
    plausible(event, { props });
  }
}
