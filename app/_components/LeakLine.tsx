/**
 * The leak line from the home hero, carried onto inner pages: a hairline that
 * hangs from the header and ends in the amber coin, directly above the eyebrow.
 * Purely decorative (aria-hidden). Place as the first child of the hero's
 * `relative` container. Styles live in globals.css under `.ims-leak`.
 */
export function LeakLine({ inset = 0 }: { inset?: number }) {
  return (
    <span
      className="ims-leak"
      aria-hidden="true"
      style={inset ? { left: inset } : undefined}
    >
      <i className="ims-leak-coin" />
    </span>
  );
}

/**
 * Ruled sheet on the right of an inner hero (desktop only), so a hero aligned
 * to the container edge does not leave its right half bare. Styles: `.ims-ledger`.
 */
export function HeroLedger({ inset = 0, height }: { inset?: number; height?: number }) {
  return (
    <span
      className="ims-ledger"
      aria-hidden="true"
      style={inset || height ? { ...(inset ? { right: inset } : null), ...(height ? { bottom: "auto", height } : null) } : undefined}
    />
  );
}
