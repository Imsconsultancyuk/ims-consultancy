// Shared "jump to the live demo zone" behaviour for every CTA that points
// there (IMS-021 hero, IMS-023 tool cards). Moves focus to the target after
// scrolling so keyboard/screen-reader users land there too, not just the
// visual viewport (IMS-021 AC: "CTA scroll works with keyboard focus moved
// to target").
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }
  target.focus({ preventScroll: true });
}
