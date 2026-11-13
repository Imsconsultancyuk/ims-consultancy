"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    imsFooterFx?: () => () => void;
  }
}

// The drawing and the GSAP timeline live in /flagship/footer-fx.js, shared with
// the static flagship pages, so both footers always match.
export function FooterFx() {
  useEffect(() => {
    let destroy: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      if (!cancelled && window.imsFooterFx) destroy = window.imsFooterFx();
    };
    if (window.imsFooterFx) {
      start();
    } else {
      const s = document.createElement("script");
      s.src = "/flagship/footer-fx.js";
      s.async = true;
      s.onload = start;
      document.head.appendChild(s);
    }
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);
  return null;
}
