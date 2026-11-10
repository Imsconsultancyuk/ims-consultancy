// Home page additions that the compiled /assets/main-*.js does not know about:
// the hero copy entrance and scroll drift, and the "Something else" firm tile.
//
// The compiled bundle binds every ".tile" to its own industry lookup, so the
// extra tile uses its own class and drives the same SVG, text and calculator
// from here. GSAP comes from the bundle as window.gsap; without it the hero
// copy is simply already in place.
(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };

  function whenGsap(cb) {
    var tries = 0;
    (function poll() {
      if (window.gsap) return cb(window.gsap);
      if (++tries < 40) setTimeout(poll, 50);
      else root.classList.add("hx-done");
    })();
  }

  // Hero. The CSS holds the start state only under html.hx-pre, and its own
  // 1200ms animation forces the end state if this never runs.
  function hero(gsap) {
    var sec = $("#hero");
    if (!sec) return;
    var copy = $(".copy", sec);
    var words = $$(".hw > span", sec);
    var stamp = $(".nrnf-stamp", sec);
    var build = $(".nrnf-build", sec);
    var bits = [$(".kicker", sec), build, $(".lead", sec), $(".actions", sec)];

    // Arrived late (slow network): the safety animation has already shown the
    // copy, so do not hide it again just to replay the entrance.
    var late = performance.now() > 1100;
    root.classList.add(late ? "hx-done" : "hx-run");
    var tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: function () { root.classList.add("hx-done"); },
    });
    if (!late) tl.fromTo(bits[0], { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.1)
      .fromTo(words, { yPercent: 112 }, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 0.18)
      .fromTo(stamp, { scale: 1.35, rotation: -9, autoAlpha: 0 }, { scale: 1, rotation: -2, autoAlpha: 1, duration: 0.7, ease: "back.out(2.2)" }, 0.62)
      .fromTo(stamp, { "--nrnf-rule": 0 }, { "--nrnf-rule": 1, duration: 0.8, ease: "power2.inOut" }, 0.95)
      .fromTo(bits.slice(1), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.09 }, 0.8);

    // Scroll away: the copy drifts up a little faster than the page. Transform only.
    if (window.ScrollTrigger && copy) {
      gsap.to(copy, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: sec, start: "top top", end: "bottom top", scrub: true },
      });
    }

    // The stamp presses again whenever the hero comes back into view.
    if ("IntersectionObserver" in window && stamp) {
      var seen = false;
      new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) { seen = true; return; }
        if (!seen) return;
        seen = false;
        gsap.fromTo(stamp, { scale: 1.12, rotation: -5 }, { scale: 1, rotation: -2, duration: 0.6, ease: "back.out(2.6)", overwrite: "auto" });
      }, { threshold: 0.6 }).observe(stamp);
    }
  }

  if (reduced) root.classList.add("hx-done");
  else whenGsap(hero);

  // #privacy: the three steps rise in order, then the stickers press down.
  // Visible markup until the section is on screen; nothing is hidden ahead of time.
  function privacy(gsap) {
    var steps = $$("#privacy .tok li");
    var stickers = $$("#privacy .tok-aligned .aw-st");
    if (!steps.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(steps, { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.12, clearProps: "opacity,visibility,transform" })
        .from(stickers, { scale: 1.25, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: "back.out(2.4)", clearProps: "opacity,visibility,transform" }, 0.35);
    }, { threshold: 0.35 });
    io.observe($("#privacy .tok"));
  }
  if (!reduced) whenGsap(privacy);

  // The bundle measures the section-crossing trails (and the rider chip that
  // follows them) only on ScrollTrigger refresh. Copy that changes height after
  // load, a firm tile or the "Something else" panel, leaves them stale, so
  // re-measure whenever the page height actually changes.
  if ("ResizeObserver" in window) {
    var lastH = 0;
    var settle;
    new ResizeObserver(function () {
      var h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      clearTimeout(settle);
      settle = setTimeout(function () {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 150);
    }).observe(document.body);
  }

  // "Something else" firm tile.
  var btn = $("#ind-other-btn");
  var panel = $("#ind-other");
  if (!btn || !panel) return;
  btn.hidden = false;

  var STAGES = ["Enquiry", "Quote", "Work done", "Invoice", "Renewal"];
  var STAGE_IDS = ["enquiry", "quote", "work", "invoice", "renewal"];
  var STAGE_Y = [50, 120, 190, 260, 330];
  // Where firms outside the ten sectors most often leak, in order of how often we see it.
  var GENERAL_ORDER = [0, 3, 4, 2, 1];
  // General benchmark across UK professional firms: enquiries a month, % lost, average job.
  var BENCH = { vol: 30, share: 30, val: 2000 };

  var nameIn = $("#ind-other-name");
  var cta = $("#ind-other-cta");
  var tiles = $$("#industries .tile");
  var stageText = $$("#industries .stage");
  var points = $$("#industries .leakpt");
  var leakText = $("#leak-text");
  var calcFor = $("#calc-for");
  var calcForm = $("#calc-form");
  var note = $("#res-note");
  var who = $(".st-who");
  var active = false;
  var benching = false;

  function picked() {
    var r = $('input[name="ind-other-stage"]:checked', panel);
    return r ? STAGE_IDS.indexOf(r.value) : -1;
  }
  function firmName() {
    return (nameIn.value || "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
  }
  function leaks() {
    var first = picked();
    var order = first < 0 ? GENERAL_ORDER : [first].concat(GENERAL_ORDER.filter(function (i) { return i !== first; }));
    return order.slice(0, 3).sort(function (a, b) { return a - b; });
  }

  function paint(animate) {
    var name = firmName();
    var label = name || "your kind of firm";
    var set = leaks();
    var gsap = window.gsap;
    var dur = animate && !reduced && gsap ? 0.6 : 0;

    stageText.forEach(function (t, i) { t.classList.toggle("is-leak", set.indexOf(i) > -1); });
    points.forEach(function (pt, i) {
      if (!gsap) return;
      gsap.to(pt, { y: STAGE_Y[set[i]], duration: dur, ease: "expo.out", overwrite: "auto" });
      var ring = $(".ring", pt);
      if (dur && ring) {
        gsap.fromTo(ring, { attr: { r: 5 }, opacity: 0.9 }, { attr: { r: 20 }, opacity: 0, duration: 0.9, delay: 0.35, ease: "expo.out", overwrite: "auto" });
      }
    });
    if (leakText) {
      leakText.textContent = "Typical leak points for " + label + ": " + set.map(function (i) { return STAGES[i]; }).join(", ") + ". General benchmark, example data.";
    }
    if (calcFor) calcFor.textContent = label;
    if (note) note.textContent = "General benchmark for " + label + ". Put your own numbers in.";
    if (who) who.textContent = name || "Your firm";

    var q = "intent=leak-scan&from=home-picker&sector=other";
    if (name) q += "&firm_name=" + encodeURIComponent(name);
    if (picked() > -1) q += "&process=" + STAGE_IDS[picked()];
    cta.href = "/contact?" + q;
    cta.textContent = name ? "Book a free Leak Scan for " + name : "Book a free Leak Scan for my firm";

    window.dispatchEvent(new CustomEvent("ims:industry", { detail: { key: "other", name: label, leaks: set } }));
  }

  function open() {
    tiles.forEach(function (t) { t.setAttribute("aria-pressed", "false"); });
    btn.setAttribute("aria-pressed", "true");
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    if (!active) {
      active = true;
      // Load the benchmark into the calculator and let the bundle's own submit
      // handler work it out, so every figure down the page stays in step.
      $("#in-vol").value = BENCH.vol;
      $("#in-share").value = BENCH.share;
      $("#in-val").value = BENCH.val;
      benching = true;
      if (calcForm && calcForm.requestSubmit) calcForm.requestSubmit();
    }
    paint(true);
    if (window.gsap && !reduced) {
      window.gsap.fromTo(panel, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" });
    }
    nameIn.focus({ preventScroll: true });
  }

  function close() {
    active = false;
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  }

  btn.addEventListener("click", function () {
    if (btn.getAttribute("aria-pressed") === "true") return;
    open();
  });
  // A sector tile takes over: the bundle repaints everything, we just step aside.
  tiles.forEach(function (t) { t.addEventListener("click", close); });

  var typing;
  nameIn.addEventListener("input", function () {
    clearTimeout(typing);
    typing = setTimeout(function () { paint(false); }, 120);
  });
  panel.addEventListener("change", function (e) {
    if (e.target && e.target.name === "ind-other-stage") paint(true);
  });
  // Our benchmark submit: the bundle writes its own note and statement, put ours back.
  // A visitor's own numbers keep the bundle's wording.
  if (calcForm) {
    calcForm.addEventListener("submit", function () {
      if (!benching) return;
      benching = false;
      setTimeout(function () { paint(false); }, 0);
    });
  }
})();

// Home "Book a free Leak Scan" form. The compiled bundle's handler for #book-form
// never reached a server, so every email typed here was dropped. This capture-phase
// listener runs first, stops that handler, files the email with Netlify Forms
// ("quick-chat"), asks /api/contact-alert to email Adam, and shows the booking link.
(function () {
  "use strict";
  var BOOKING = "https://cal.com/ims-consultancy/leak-scan";
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function track(name) {
    try { if (window.plausible) window.plausible(name, { props: { page: "home" } }); } catch (e) {}
  }

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.id !== "book-form") return;
    e.preventDefault();
    e.stopImmediatePropagation();

    var input = form.querySelector("input[type=email]");
    var msg = document.getElementById("book-msg");
    var btn = form.querySelector("button[type=submit]");
    var email = input ? input.value.trim() : "";

    function say(text, link) {
      if (!msg) return;
      msg.textContent = text;
      if (link) {
        msg.appendChild(document.createTextNode(" "));
        var a = document.createElement("a");
        a.href = BOOKING;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = "Pick a time for your Leak Scan";
        a.addEventListener("click", function () { track("Booking Click"); });
        msg.appendChild(a);
      }
    }

    if (!EMAIL.test(email)) {
      say("Please enter a work email so we can send your Leak Scan details.");
      if (input) input.focus();
      return;
    }

    if (btn) btn.disabled = true;
    say("Sending…");

    var body = new URLSearchParams({
      "form-name": "quick-chat",
      "bot-field": "",
      name: "(home page email)",
      contact: email,
      source: "home-final-cta",
    });

    fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("form " + res.status);
        track("Lead Submit");
        say("Thanks, we have your email.", true);
        if (input) input.value = "";
        fetch("/api/contact-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "(home page email)",
            email: email,
            firm: "Not given",
            intent: "leak-scan",
            from: "home-final-cta",
            "bot-field": "",
          }),
        }).catch(function () {});
      })
      .catch(function () {
        say("That did not send. Please email info@intelmadesimple.com or use the contact page.");
      })
      .then(function () { if (btn) btn.disabled = false; });
  }, true);
})();
