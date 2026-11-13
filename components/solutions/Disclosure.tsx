"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

import { useReducedMotion } from "./useReducedMotion";

interface DisclosureProps {
  open: boolean;
  children: ReactNode;
  id: string;
  labelledBy: string;
}

// Height tween for a button-controlled region. Closed content stays in the DOM
// (inert, zero height) so the copy is still in the HTML for crawlers.
export function Disclosure({ open, children, id, labelledBy }: DisclosureProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const first = useRef(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (first.current) {
      first.current = false;
      node.style.height = open ? "auto" : "0px";
      return;
    }
    gsap.killTweensOf(node);
    if (reduced) {
      node.style.height = open ? "auto" : "0px";
      return;
    }
    if (open) {
      gsap.fromTo(
        node,
        { height: node.offsetHeight },
        { height: "auto", duration: 0.4, ease: "power3.out", clearProps: "none" },
      );
    } else {
      gsap.to(node, { height: 0, duration: 0.25, ease: "power3.out" });
    }
  }, [open, reduced]);

  return (
    <div
      ref={ref}
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!open}
      className="overflow-hidden"
      style={{ height: open ? "auto" : 0 }}
    >
      {children}
    </div>
  );
}
