"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { LogoLoop, type LogoItem } from "@/components/react-bits/LogoLoop";
import { ALIGNED } from "@/lib/trust/aligned";

const SPEED = 34;

const ITEMS: LogoItem[] = ALIGNED.map((f) => ({
  node: (
    <span className="fx-aw-st">
      <b>{f.short}</b>
      <span>{f.area}</span>
    </span>
  ),
  href: f.href,
  title: f.name,
  ariaLabel: `${f.short} ${f.area}, opens in a new tab`,
}));

// Top-of-footer strip for the Next routes; the flagship pages run the same
// list through public/flagship/aligned-bar.js. LogoLoop's own intro hides
// items until JS runs, so it is off and the entrance below starts from
// visible markup once the strip is on screen.
export function AlignedStrip(): React.JSX.Element {
  const [held, setHeld] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(root.querySelector(".fx-aw-k"), { "--aw-rule": 0 }, { "--aw-rule": 1, duration: 0.9 }, 0)
          .from(
            root.querySelectorAll(".fx-aw-st"),
            { y: 14, autoAlpha: 0, duration: 0.8, stagger: 0.04, clearProps: "opacity,visibility,transform" },
            0.1,
          );
      },
      { threshold: 0.4 },
    );
    io.observe(root);

    const pop = (e: PointerEvent, on: boolean): void => {
      const target = e.target instanceof Element ? e.target.closest(".fx-aw-st") : null;
      if (!target || (e.relatedTarget instanceof Node && target.contains(e.relatedTarget))) return;
      gsap.to(target, on
        ? { y: -3, scale: 1.05, duration: 0.3, ease: "back.out(3)", overwrite: "auto" }
        : { y: 0, scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };
    const over = (e: PointerEvent): void => pop(e, true);
    const out = (e: PointerEvent): void => pop(e, false);
    root.addEventListener("pointerover", over);
    root.addEventListener("pointerout", out);
    return () => {
      io.disconnect();
      root.removeEventListener("pointerover", over);
      root.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <div className="fx-aw" ref={rootRef}>
      <div className="fx-aw-in">
        <p className="fx-aw-k">Aligned with</p>
        <LogoLoop
          logos={ITEMS}
          speed={held ? 0 : SPEED}
          gap={8}
          logoHeight={13}
          pauseOnHover
          fadeOut
          fadeOutWidth={0.08}
          intro={false}
          ariaLabel="Frameworks we are aligned with"
          className="fx-aw-vp"
        />
        <button className="fx-aw-pause" type="button" aria-pressed={held} onClick={() => setHeld((h) => !h)}>
          {held ? "Play" : "Pause"}
        </button>
        <Link className="fx-aw-note" href="/ai-policy">
          Alignment, not certification
        </Link>
      </div>
    </div>
  );
}
