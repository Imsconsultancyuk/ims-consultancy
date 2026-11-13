// Footer background for the flagship pages and the Next pages (one source).
//
// Two layers of drawn motion, no particles:
//  1. Contour lines: ten sine rows that drift sideways at different speeds and
//     directions, like a ledger ruled in waves.
//  2. The brand loop: the logo's figure of eight, drawn large, with two bright
//     runs that travel round it and cross at the middle.
// The graphics are decorative (aria-hidden, no pointer events) and sit behind
// the footer content. They are transform and dash-offset only. Motion stops
// when the footer is off screen and speeds up while the pointer is over it.
// Reduced motion gets the same drawing, held still. No JS leaves the footer
// exactly as it was.
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var STYLE_ID = "ffx-style";
  var PERIOD = 480; // one wave, in viewBox units
  var W = 2400;
  var H = 600;
  var ROWS = [
    { y: 70, a: 22, dur: 150, dir: 1, o: 0.1 },
    { y: 120, a: 34, dur: 110, dir: -1, o: 0.14 },
    { y: 178, a: 26, dur: 170, dir: 1, o: 0.12 },
    { y: 236, a: 44, dur: 130, dir: -1, o: 0.18 },
    { y: 292, a: 30, dur: 190, dir: 1, o: 0.14 },
    { y: 350, a: 52, dur: 120, dir: -1, o: 0.2 },
    { y: 410, a: 36, dur: 160, dir: 1, o: 0.16 },
    { y: 468, a: 58, dur: 100, dir: -1, o: 0.24 },
    { y: 522, a: 40, dur: 140, dir: 1, o: 0.2 },
    { y: 574, a: 48, dur: 118, dir: -1, o: 0.26 },
  ];

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function wavePath(y, a) {
    // Quadratic start then smooth continuation: a sine-like row, one PERIOD per two segments.
    var d = "M" + -PERIOD + " " + y + " q" + PERIOD / 4 + " " + -a + " " + PERIOD / 2 + " 0";
    var count = Math.ceil((W + PERIOD * 3) / (PERIOD / 2));
    for (var i = 0; i < count; i++) d += " t" + PERIOD / 2 + " 0";
    return d;
  }

  var LOOP =
    "M400 170 C540 30 790 30 790 170 C790 310 540 310 400 170 C260 30 10 30 10 170 C10 310 260 310 400 170 Z";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent =
      ".foot,.fx-foot{--ffx-line:var(--mauve,var(--color-mauve-500));--ffx-glint:var(--ffx-line);isolation:isolate;overflow:hidden}" +
      ".foot>:not(.ffx),.fx-foot>:not(.ffx){position:relative;z-index:1}" +
      ".ffx{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}" +
      ".ffx-waves{position:absolute;inset:0;width:100%;height:100%;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 38%);mask-image:linear-gradient(to bottom,transparent 0,#000 38%)}" +
      ".ffx-loop{position:absolute;right:max(2vw,16px);bottom:-24px;width:min(62%,820px);height:auto;opacity:.9}" +
      ".ffx path{fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}" +
      ".ffx-w{stroke:var(--ffx-line);stroke-width:1.1}" +
      ".ffx-base{stroke:var(--ffx-line);stroke-width:1.2;stroke-opacity:.2}" +
      ".ffx-run{stroke:var(--ffx-glint);stroke-width:2.6;stroke-opacity:.8}" +
      // On a phone the footer is a tall single column: keep the waves to a band at the foot and the loop above the link lists.
      "@media (max-width:820px){.ffx-waves{top:auto;bottom:0;height:440px}.ffx-loop{width:86%;right:7%;bottom:auto;top:132px;opacity:.38}}";
    document.head.appendChild(s);
  }

  function loadGsap(cb) {
    if (window.gsap) return cb(window.gsap);
    var bundled = document.querySelector('link[href*="/assets/deco-"]');
    var tries = 0;
    (function poll() {
      if (window.gsap) return cb(window.gsap);
      if (bundled && ++tries < 40) return setTimeout(poll, 50);
      var s = document.createElement("script");
      s.src = "/flagship/vendor/gsap.min.js";
      s.onload = function () {
        cb(window.gsap);
      };
      document.head.appendChild(s);
    })();
  }

  function init() {
    var foot = document.querySelector("footer.foot, footer.fx-foot");
    if (!foot || foot.querySelector(".ffx")) return function () {};
    injectStyle();

    var layer = document.createElement("div");
    layer.className = "ffx";
    layer.setAttribute("aria-hidden", "true");

    var waves = el("svg", { class: "ffx-waves", viewBox: "0 0 " + W + " " + H, preserveAspectRatio: "none", focusable: "false" }, layer);
    var rows = ROWS.map(function (r, i) {
      var g = el("g", { transform: "translate(" + ((i * 137) % PERIOD) + " 0)" }, waves);
      var p = el("path", { class: "ffx-w", d: wavePath(r.y, r.a), "stroke-opacity": String(r.o) }, g);
      return { g: g, p: p, r: r, x0: (i * 137) % PERIOD };
    });

    var loop = el("svg", { class: "ffx-loop", viewBox: "0 20 800 300", focusable: "false" }, layer);
    el("path", { class: "ffx-base", d: LOOP }, loop);
    var runA = el("path", { class: "ffx-run", d: LOOP, pathLength: "1", "stroke-dasharray": "0.12 0.88" }, loop);
    var runB = el("path", { class: "ffx-run", d: LOOP, pathLength: "1", "stroke-dasharray": "0.12 0.88", "stroke-dashoffset": "-0.5" }, loop);

    foot.insertBefore(layer, foot.firstChild);

    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var tl = null;
    var io = null;
    var dead = false;
    var enter = null;
    var leave = null;

    if (!reduced) {
      loadGsap(function (gsap) {
        if (dead || !gsap) return;
        tl = gsap.timeline({ paused: true });
        rows.forEach(function (row) {
          var to = row.x0 + row.r.dir * PERIOD;
          tl.fromTo(row.g, { x: row.x0 }, { x: to, duration: row.r.dur / 7, ease: "none", repeat: -1 }, 0);
        });
        // GSAP rounds a tweened strokeDashoffset to whole px, which freezes a pathLength=1 dash.
        // Tween a plain number and write the attribute ourselves.
        var lap = { t: 0 };
        tl.fromTo(
          lap,
          { t: 0 },
          {
            t: 1,
            duration: 16,
            ease: "none",
            repeat: -1,
            onUpdate: function () {
              runA.setAttribute("stroke-dashoffset", String(-lap.t));
              runB.setAttribute("stroke-dashoffset", String(-0.5 - lap.t));
            },
          },
          0
        );
        // The loop breathes a little so it reads as drawn, not stamped.
        tl.fromTo(loop, { scale: 0.985, transformOrigin: "50% 50%" }, { scale: 1.015, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0);

        io = new IntersectionObserver(
          function (entries) {
            if (!tl) return;
            if (entries[0].isIntersecting) tl.play();
            else tl.pause();
          },
          { rootMargin: "80px" }
        );
        io.observe(foot);

        enter = function () {
          gsap.to(tl, { timeScale: 2.6, duration: 0.8, ease: "power2.out", overwrite: true });
        };
        leave = function () {
          gsap.to(tl, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
        };
        foot.addEventListener("pointerenter", enter);
        foot.addEventListener("pointerleave", leave);
      });
    }

    return function destroy() {
      dead = true;
      if (io) io.disconnect();
      if (tl) tl.kill();
      if (enter) foot.removeEventListener("pointerenter", enter);
      if (leave) foot.removeEventListener("pointerleave", leave);
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    };
  }

  window.imsFooterFx = init;
  var me = document.currentScript;
  if (me && me.hasAttribute("data-auto")) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();
