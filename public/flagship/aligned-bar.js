// "Aligned with" strip at the top of the flagship footers.
//
// The markup is a plain wrapped list of links, so it reads fine with no JS.
// With GSAP it becomes a slow belt: the list is cloned (clones hidden from
// assistive tech and the tab order), it eases to a stop on hover or focus,
// and a visible Pause button holds it still. Reduced motion keeps the list
// static. Pages without the compiled deco bundle (contact) get the
// self-hosted GSAP from /flagship/vendor/.
(function () {
  "use strict";

  var bar = document.querySelector("[data-aw]");
  if (!bar) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SPEED = 34; // px per second
  var vp = bar.querySelector(".aw-vp");
  var list = bar.querySelector(".aw-list");
  var pauseBtn = bar.querySelector(".aw-pause");
  if (!vp || !list || !pauseBtn) return;

  function loadGsap(cb) {
    if (window.gsap) return cb(window.gsap);
    var bundled = document.querySelector('link[href*="/assets/deco-"]');
    var tries = 0;
    (function poll() {
      if (window.gsap) return cb(window.gsap);
      if (bundled && ++tries < 40) return setTimeout(poll, 50);
      var s = document.createElement("script");
      s.src = "/flagship/vendor/gsap.min.js";
      s.onload = function () { if (window.gsap) cb(window.gsap); };
      document.head.appendChild(s);
    })();
  }

  function run(gsap) {
    var belt = document.createElement("div");
    belt.className = "aw-belt";
    list.parentNode.insertBefore(belt, list);
    belt.appendChild(list);
    bar.classList.add("aw-on");
    pauseBtn.hidden = false;

    var tween = null;
    var held = false;   // Pause button
    var resting = false; // hover or focus inside

    function clones() {
      Array.prototype.slice.call(belt.querySelectorAll(".aw-clone")).forEach(function (c) { c.remove(); });
    }
    function build() {
      if (tween) tween.kill();
      clones();
      gsap.set(belt, { x: 0 });
      var w = list.getBoundingClientRect().width;
      if (!w) return;
      var copies = Math.ceil(vp.clientWidth / w) + 1;
      for (var i = 0; i < copies; i++) {
        var c = list.cloneNode(true);
        c.classList.add("aw-clone");
        c.setAttribute("aria-hidden", "true");
        c.removeAttribute("aria-labelledby");
        Array.prototype.slice.call(c.querySelectorAll("a")).forEach(function (a) { a.tabIndex = -1; });
        belt.appendChild(c);
      }
      tween = gsap.fromTo(belt, { x: 0 }, { x: -w, duration: w / SPEED, ease: "none", repeat: -1 });
      tween.timeScale(held || resting ? 0 : 1);
    }
    function settle() {
      if (tween) gsap.to(tween, { timeScale: held || resting ? 0 : 1, duration: 0.6, ease: "power2.out", overwrite: true });
    }

    build();
    var resized;
    addEventListener("resize", function () {
      clearTimeout(resized);
      resized = setTimeout(build, 200);
    });

    vp.addEventListener("pointerenter", function () { resting = true; settle(); });
    vp.addEventListener("pointerleave", function () { resting = vp.contains(document.activeElement); settle(); });
    vp.addEventListener("focusin", function () { resting = true; settle(); });
    vp.addEventListener("focusout", function (e) {
      if (!vp.contains(e.relatedTarget)) { resting = false; settle(); }
    });
    // A focused sticker that has drifted out of view comes back into the window.
    list.addEventListener("focusin", function () { if (tween) { tween.progress(0); } });

    pauseBtn.addEventListener("click", function () {
      held = !held;
      pauseBtn.setAttribute("aria-pressed", String(held));
      pauseBtn.textContent = held ? "Play" : "Pause";
      settle();
    });

    // Hover pop on each sticker, clones included.
    belt.addEventListener("pointerover", function (e) {
      var st = e.target.closest && e.target.closest(".aw-st");
      if (st && !st.contains(e.relatedTarget)) gsap.to(st, { y: -3, scale: 1.05, duration: 0.3, ease: "back.out(3)", overwrite: "auto" });
    });
    belt.addEventListener("pointerout", function (e) {
      var st = e.target.closest && e.target.closest(".aw-st");
      if (st && !st.contains(e.relatedTarget)) gsap.to(st, { y: 0, scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });

    // Entrance when the footer scrolls in: the label rule draws, stickers rise.
    // Starts from visible markup and only runs once the strip is on screen.
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(bar.querySelector(".aw-k"), { "--aw-rule": 0 }, { "--aw-rule": 1, duration: 0.9 }, 0)
        .from(belt.querySelectorAll(".aw-st"), {
          y: 14, autoAlpha: 0, duration: 0.8, stagger: 0.04, clearProps: "opacity,visibility",
        }, 0.1);
    }, { threshold: 0.4 });
    io.observe(bar);
  }

  loadGsap(run);
})();
