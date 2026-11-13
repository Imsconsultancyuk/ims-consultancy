// Contact funnel. Six steps, a progress bar, and a mascot scene that reacts to
// the answers. Replaces the compiled contact form (its own form, arrival and
// message code finds no markup here and stays inert; chrome and theme still run).
//
// Lead path is unchanged in shape: POST /__forms.html (Netlify Forms), then
// POST /api/contact-alert (Resend email to Adam).
import { g as gsap } from "/assets/chrome-DYUT0XN5.js";
import { C as CAR, M as MAN, S as SUN } from "/assets/doorman-svg-BeudZtFc.js";

const form = document.getElementById("funnel-form");
const funnel = document.getElementById("funnel");
if (form && funnel) boot();

function boot() {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (id) => document.getElementById(id);
  const steps = Array.from(form.querySelectorAll(".fn-step"));
  const TOTAL = steps.length;
  const scene = $("fn-scene");
  const bubble = $("fn-bubble");
  const carBox = $("fn-car");
  const manBox = $("fn-man");
  const BOOKING = "https://cal.com/ims-consultancy/leak-scan";

  const BUBBLES = [
    "Hello. Who am I speaking to?",
    "Tell me about the firm.",
    "What can we do for you?",
    "Where do you live online?",
    "Budget and timing. No wrong answer.",
    "When shall Adam call?",
  ];
  const STAGES = { enquiry: "Enquiry", quote: "Quote", work: "Work done", invoice: "Invoice", renewal: "Renewal" };
  const INTENTS = {
    "leak-scan": "a free Leak Scan",
    "stage-build": "a stage build",
    "full-system": "the full system",
    care: "Care",
    "white-label": "white-label",
    other: "something else",
  };
  const SECTORS = {
    "law-firms": "Law firm",
    "accountancy-firms": "Accountancy firm",
    "ifas-wealth-managers": "Wealth manager or IFA",
    "mortgage-brokers": "Mortgage or finance broker",
    "commercial-insurance-brokers": "Commercial insurance broker",
    "commercial-property": "Commercial property firm",
    "executive-search-recruitment": "Executive search or recruitment firm",
    "ma-advisory-business-brokers": "M&A advisory or business broker",
    "private-healthcare-groups": "Private healthcare group",
    "b2b-saas": "B2B SaaS company",
    "sole-trader": "Sole trader or small business",
    other: "Something else",
  };
  const FROM = {
    "pricing-calculator": "The recovery calculator on our pricing page",
    "pricing-tiers": "Our pricing page",
    "pricing-ladder": "Our pricing page",
    "pricing-addons": "White-label, on our pricing page",
    "pricing-footer-cta": "Our pricing page",
    "pricing-hero": "Our pricing page",
    "home-hero": "Our home page",
    "home-calculator": "The leak calculator on our home page",
    "home-picker": "Pick your kind of firm, on our home page",
    "home-pricing": "Pricing, on our home page",
    "leak-scan": "A Leak Scan link",
    nav: "Our navigation",
  };
  const MESSAGES = {
    "leak-scan": "Where do you think money slips away?",
    "stage-build": "Which stage leaks most, do you think?",
    "full-system": "What runs on spreadsheets and memory today?",
    care: "What do you want watched after year one?",
    "white-label": "Who are your clients, and what would you resell?",
    other: "What can we help with?",
  };

  const clean = (v, max) => (v || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max || 120);
  const digits = (v) => (/^\d{1,9}$/.test(v || "") ? v : "");
  const gbp = (v) => "£" + Number(v).toLocaleString("en-GB");
  const field = (name) => form.elements.namedItem(name);
  const setField = (name, value) => {
    const el = field(name);
    if (el && value) el.value = value;
  };
  const plausible = (name) => {
    try {
      if (window.plausible) window.plausible(name, { props: { page: "contact" } });
    } catch {
      // Analytics blocked: nothing to do.
    }
  };

  /* ---------- context from the CTA that sent them here ---------- */
  const params = new URLSearchParams(location.search);
  const intent = INTENTS[params.get("intent")] ? params.get("intent") : "";
  const sector = SECTORS[params.get("sector")] ? params.get("sector") : "";
  const stages = (params.get("stages") || "").split(",").filter((s) => STAGES[s]);
  const processKey = STAGES[params.get("process")] ? params.get("process") : "";
  const from = clean(params.get("from"), 60).replace(/[^a-z0-9-]/g, "");
  const nums = {
    job: digits(params.get("job")),
    leak: digits(params.get("leak")),
    recovered: digits(params.get("recovered")),
    fee: digits(params.get("fee")),
    build: digits(params.get("build")),
  };
  const code = params.get("code") === "NEWPARTNER26" ? "NEWPARTNER26" : "";
  const firmName = clean(params.get("firm_name"));

  setField("plan", clean(params.get("plan"), 40).replace(/[^a-z0-9-]/g, ""));
  setField("code", code);
  setField("stages", stages.join(","));
  setField("sector", sector);
  setField("process", processKey);
  setField("from", from);
  Object.keys(nums).forEach((k) => setField(k, nums[k]));

  const firmSelect = $("c-firm");
  const otherWrap = $("c-firm-other");
  const otherInput = $("c-firm-name");
  const syncOther = () => {
    otherWrap.hidden = firmSelect.value !== "Something else";
    otherInput.disabled = otherWrap.hidden;
  };
  if (sector) firmSelect.value = SECTORS[sector];
  if (firmName) {
    otherInput.value = firmName;
    if (!sector) firmSelect.value = "Something else";
  }
  firmSelect.addEventListener("change", syncOther);
  syncOther();

  if (intent) {
    const radio = form.querySelector(`input[name="intent"][value="${intent}"]`);
    if (radio) radio.checked = true;
  }

  const msgBox = $("c-msg-in");
  const msgLabel = form.querySelector('label[for="c-msg-in"]');
  if (MESSAGES[intent] && msgLabel && msgLabel.firstChild) msgLabel.firstChild.nodeValue = MESSAGES[intent] + " ";
  if (!msgBox.value && processKey) msgBox.value = "The " + STAGES[processKey] + " stage is where I think we lose most.";

  const panel = $("c-ctx");
  const rows = [];
  if (firmName) rows.push(["Your firm", firmName, true]);
  if (stages.length) rows.push([stages.length === 1 ? "Stage" : "Stages", stages.map((s) => STAGES[s]).join(", "), true]);
  if (processKey) rows.push(["Stage to look at first", STAGES[processKey], true]);
  if (nums.job) rows.push(["Average job", gbp(nums.job)]);
  if (nums.leak) rows.push(["Leaking a month", gbp(nums.leak)]);
  if (nums.recovered) rows.push(["We win back a month", gbp(nums.recovered)]);
  if (nums.fee) rows.push(["Our fee a month", gbp(nums.fee)]);
  if (nums.build) rows.push(["Build", gbp(nums.build), false, code ? "with " + code : ""]);
  if (!nums.build && code) rows.push(["Code", code, true]);
  const origin = FROM[from] || (from.indexOf("tools-") === 0 || from.indexOf("solutions-") === 0 ? "One of our business solutions" : "");

  // Where they came from when no CTA said so: the referrer, or a direct visit.
  const PAGES = [
    [/^\/$/, "home", "Our home page"],
    [/^\/pricing/, "pricing", "Our pricing page"],
    [/^\/solutions|^\/tools/, "solutions", "Our business solutions page"],
    [/^\/faq/, "faq", "Our FAQ"],
    [/^\/services/, "services", "Our services pages"],
    [/^\/industries\/([a-z0-9-]+)/, "industry", "One of our industry pages"],
    [/^\/case-stud/, "case-studies", "Our case studies"],
    [/^\/process/, "process", "How we work"],
    [/^\/about/, "about", "Our about page"],
    [/^\/insights|^\/guides/, "insights", "Our insights"],
    [/^\/reviews/, "reviews", "Our reviews page"],
  ];
  const sourceFromReferrer = () => {
    let ref = null;
    try {
      ref = document.referrer ? new URL(document.referrer) : null;
    } catch {
      ref = null;
    }
    if (!ref) return { label: "You came straight to this page.", key: "direct" };
    if (ref.origin === location.origin) {
      const path = ref.pathname.replace(/\.html$/, "") || "/";
      if (path.indexOf("/contact") === 0) return { label: "", key: "" };
      const hit = PAGES.find(([re]) => re.test(path));
      return hit ? { label: hit[2] + ".", key: "page-" + hit[1] } : { label: "Another page on our site.", key: "page-other" };
    }
    const host = ref.hostname.replace(/^www\./, "");
    return { label: "A link from " + host + ".", key: "ext-" + host.replace(/[^a-z0-9]+/g, "-").slice(0, 40) };
  };

  const known = origin ? { label: origin + (intent ? ", asking about " + INTENTS[intent] + "." : "."), key: from } : null;
  const source = known || sourceFromReferrer();
  if (!known && source.key) setField("from", source.key);
  const tracker = $("fn-from");
  if (tracker && source.label) {
    $("fn-from-v").textContent = source.label;
    tracker.hidden = false;
    tracker.classList.add("is-in");
  }

  if (panel && rows.length) {
    $("c-ctx-title").textContent = "What we carried over";
    $("c-ctx-from").textContent = source.label;
    const list = $("c-ctx-nums");
    rows.forEach(([k, v, isText, note]) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = k;
      dd.textContent = v;
      if (isText) dd.className = "is-text";
      if (note) {
        const small = document.createElement("small");
        small.textContent = note;
        dd.appendChild(small);
      }
      row.append(dt, dd);
      list.appendChild(row);
    });
    if (!rows.length) list.hidden = true;
    panel.hidden = false;
    panel.classList.add("is-in");
  }

  /* ---------- call step: next UK weekdays and time slots ---------- */
  const daysBox = $("fn-days");
  const timesBox = $("fn-times");
  const asap = $("c-asap");
  const whenWrap = $("fn-when");
  const dayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/London" });
  const longFmt = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/London" });
  const slots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

  const chip = (name, value, title, sub) => {
    const label = document.createElement("label");
    label.className = "fn-opt";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    const t = document.createElement("span");
    t.className = "fn-opt-t";
    t.textContent = title;
    label.append(input, t);
    if (sub) {
      const s = document.createElement("span");
      s.className = "fn-opt-s";
      s.textContent = sub;
      label.appendChild(s);
    }
    return label;
  };
  const dayOptions = [];
  const cursor = new Date();
  while (dayOptions.length < 8) {
    cursor.setDate(cursor.getDate() + 1);
    const wd = cursor.getDay();
    if (wd === 0 || wd === 6) continue;
    const iso = cursor.toISOString().slice(0, 10);
    const parts = dayFmt.format(cursor).split(" ");
    dayOptions.push({ iso, long: longFmt.format(cursor) });
    daysBox.appendChild(chip("call_day", iso, parts[0].replace(",", ""), parts.slice(1).join(" ")));
  }
  slots.forEach((s) => timesBox.appendChild(chip("call_time", s, s)));

  const syncAsap = () => {
    whenWrap.dataset.off = asap.checked ? "true" : "false";
    whenWrap.querySelectorAll("input").forEach((i) => {
      i.disabled = asap.checked;
      if (asap.checked) i.checked = false;
    });
    $("c-call-err").textContent = "";
  };
  asap.addEventListener("change", syncAsap);

  const nosite = $("c-nosite");
  const site = $("c-site");
  nosite.addEventListener("change", () => {
    site.disabled = nosite.checked;
    if (nosite.checked) {
      site.value = "";
      $("c-site-err").textContent = "";
    }
  });

  /* ---------- scene ---------- */
  $("fn-sun").innerHTML = SUN;
  carBox.innerHTML = CAR;
  manBox.outerHTML = MAN.replace('class="cg-man"', 'class="cg-man a-man" id="fn-man"');
  const man = $("fn-man");
  const car = carBox;
  const carSvg = car.querySelector("svg");
  const driver = car.querySelector(".driver");
  const wheels = car.querySelectorAll(".wheel");
  const armR = man.querySelector(".arm-r");
  const legL = man.querySelector(".leg-l");
  const legR = man.querySelector(".leg-r");

  let internal = false;
  try {
    internal = (document.referrer && new URL(document.referrer).origin === location.origin) || sessionStorage.getItem("ims-curtain") !== null || root.classList.contains("arrive") || new URLSearchParams(location.search).has("from");
  } catch {
    internal = root.classList.contains("arrive") || new URLSearchParams(location.search).has("from");
  }
  // The compiled bundle used to fill the page-turn curtain and clear its flag.
  const curtain = document.querySelector(".curtain");
  if (curtain) curtain.innerHTML = SUN;
  try {
    sessionStorage.removeItem("ims-curtain");
  } catch {
    // Storage blocked: nothing to clear.
  }
  requestAnimationFrame(() => root.classList.remove("arrive"));

  const carRight = () => car.offsetLeft + car.offsetWidth;
  const manHome = () => carRight() + 24;
  const placeMan = (x) => gsap.set(man, { x });
  const sceneW = () => scene.clientWidth;
  const sceneH = () => scene.clientHeight;

  const speak = (text) => {
    if (reduced) {
      bubble.textContent = text;
      return;
    }
    gsap.killTweensOf(bubble);
    gsap.timeline()
      .to(bubble, { autoAlpha: 0, y: 4, duration: 0.12, ease: "power1.in" })
      .add(() => {
        bubble.textContent = text;
        anchorBubble();
      })
      .to(bubble, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" });
  };
  const anchorBubble = () => {
    const x = gsap.getProperty(man, "x") - 10;
    gsap.set(bubble, { x: Math.max(8, Math.min(x, sceneW() - bubble.offsetWidth - 8)) });
  };
  const wave = () => {
    if (reduced || !armR) return;
    gsap.timeline()
      .to(armR, { rotation: -150, svgOrigin: "41 40", duration: 0.25, ease: "power2.out" })
      .to(armR, { rotation: -120, svgOrigin: "41 40", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" })
      .to(armR, { rotation: 0, svgOrigin: "41 40", duration: 0.25, ease: "power2.in" });
  };
  const walk = (target, dur, ease = "power1.inOut") => {
    const tl = gsap.timeline();
    tl.to(man, { x: target, duration: dur, ease }, 0);
    if (legL && legR) {
      tl.to(legL, { rotation: 18, svgOrigin: "26 62", duration: dur / 6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.to(legR, { rotation: -18, svgOrigin: "34 62", duration: dur / 6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.set([legL, legR], { rotation: 0 }, dur);
    }
    return tl;
  };

  const setDusk = (v) => {
    if (reduced) scene.style.setProperty("--dusk", v);
    else gsap.to(scene, { "--dusk": v, duration: 0.8, ease: "power1.out", overwrite: "auto" });
  };

  function arrive() {
    gsap.set(wheels[0], { svgOrigin: "30 46" });
    gsap.set(wheels[1], { svgOrigin: "100 46" });
    if (reduced) {
      gsap.set(driver, { autoAlpha: 0 });
      gsap.set(man, { autoAlpha: 1 });
      placeMan(manHome());
      anchorBubble();
      speak(BUBBLES[0]);
      gsap.set(bubble, { autoAlpha: 1 });
      return;
    }
    if (!internal) {
      // Direct visit: already out of the car, waiting beside it.
      gsap.set(driver, { autoAlpha: 0 });
      gsap.set(man, { autoAlpha: 1 });
      placeMan(manHome());
      anchorBubble();
      gsap.timeline({ delay: 0.5 })
        .add(wave)
        .add(() => speak(BUBBLES[0]), 0.35);
      return;
    }
    // From inside the site: drive in, step out.
    const start = -(car.offsetLeft + car.offsetWidth + 40);
    gsap.set(car, { x: start });
    gsap.set(man, { autoAlpha: 0, x: car.offsetLeft + 40, y: -10 });
    gsap.timeline({ delay: 0.3 })
      .to(car, { x: 0, duration: 1.2, ease: "power3.out" }, 0)
      .fromTo(wheels, { rotation: 0 }, { rotation: 900, duration: 1.2, ease: "power3.out" }, 0)
      .to(car, { rotation: -1.5, transformOrigin: "20% 100%", duration: 0.12, ease: "power1.out", yoyo: true, repeat: 1 }, 1.12)
      .set(driver, { autoAlpha: 0 }, 1.5)
      .set(man, { autoAlpha: 1 }, 1.5)
      .to(man, { x: manHome(), duration: 0.42, ease: "power1.inOut" }, 1.5)
      .to(man, { y: -22, duration: 0.2, ease: "power2.out" }, 1.5)
      .to(man, { y: 0, duration: 0.22, ease: "power2.in" }, 1.7)
      .add(anchorBubble, 2)
      .add(wave, 2)
      .add(() => speak(BUBBLES[0]), 2.1);
  }

  /* ---------- steps ---------- */
  let index = 0;
  const count = $("fn-count");
  const bar = $("fn-bar");
  const segs = Array.from(bar.children);
  const back = $("fn-back");
  const next = $("fn-next");
  const out = $("c-msg");
  let busy = false;

  // The amber coin rides the leading edge of the filled progress, echoing the leak line on the other pages.
  const coin = document.createElement("span");
  coin.className = "fn-coin";
  coin.setAttribute("aria-hidden", "true");
  bar.parentElement.appendChild(coin);
  function moveCoin(animate) {
    const seg = segs[index];
    const x = seg.offsetLeft + seg.offsetWidth - 7;
    const y = seg.offsetTop + seg.offsetHeight / 2 - 7;
    if (reduced || !animate) gsap.set(coin, { x, y });
    else gsap.to(coin, { x, y, duration: 0.35, ease: "power2.out", overwrite: "auto" });
  }

  function paintProgress(animate) {
    segs.forEach((seg, i) => {
      const f = i <= index ? 1 : 0;
      if (reduced || !animate) seg.style.setProperty("--f", f);
      else gsap.to(seg, { "--f": f, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    });
    const title = steps[index].dataset.title;
    count.innerHTML = "";
    count.append("Step " + (index + 1) + " of " + TOTAL);
    const span = document.createElement("span");
    span.textContent = " · " + title;
    count.appendChild(span);
    bar.setAttribute("aria-valuenow", String(index + 1));
    bar.setAttribute("aria-valuetext", "Step " + (index + 1) + " of " + TOTAL + ", " + title);
    back.hidden = index === 0;
    next.textContent = index === TOTAL - 1 ? "Send my details" : "Continue";
    moveCoin(animate);
  }

  function show(to, dir) {
    const from = steps[index];
    const target = steps[to];
    index = to;
    paintProgress(true);
    setDusk((to / (TOTAL - 1)) * 0.55);
    out.textContent = "";
    const enter = () => {
      from.hidden = true;
      target.hidden = false;
      if (reduced) {
        target.querySelector("legend").focus({ preventScroll: true });
        return;
      }
      gsap.fromTo(target, { autoAlpha: 0, x: 28 * dir }, { autoAlpha: 1, x: 0, duration: 0.38, ease: "power2.out", clearProps: "transform,opacity,visibility" });
      target.querySelector("legend").focus({ preventScroll: true });
    };
    if (reduced) enter();
    else gsap.to(from, { autoAlpha: 0, x: -20 * dir, duration: 0.18, ease: "power1.in", onComplete: () => { gsap.set(from, { clearProps: "all" }); enter(); } });
    speak(BUBBLES[to]);
    if (to === 0) wave();
  }

  /* ---------- validation ---------- */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE = /^[+(]?\d[\d\s()-]{6,19}$/;
  const SITE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;
  const err = (id, text, input) => {
    $(id).textContent = text;
    if (input) input.setAttribute("aria-invalid", text ? "true" : "false");
    return !text;
  };
  const picked = (name) => form.querySelector(`input[name="${name}"]:checked`);
  const markGroup = (name, bad) => {
    form.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
      const grp = r.closest(".fn-group");
      if (grp) grp.setAttribute("aria-invalid", bad ? "true" : "false");
    });
  };

  const checks = [
    () => {
      const name = $("c-name");
      const phone = $("c-phone");
      const email = $("c-email");
      const a = err("c-name-err", name.value.trim().length < 2 ? "Tell us your name." : "", name);
      const b = err("c-phone-err", !PHONE.test(phone.value.trim()) ? "Enter a phone number Adam can call." : "", phone);
      const c = err("c-email-err", !EMAIL.test(email.value.trim()) ? "Enter an email address we can reply to." : "", email);
      if (!a) name.focus();
      else if (!b) phone.focus();
      else if (!c) email.focus();
      return a && b && c;
    },
    () => {
      const ok1 = err("c-firm-err", !firmSelect.value ? "Choose the kind of firm." : "", firmSelect);
      const ok2 = !!picked("company_size");
      err("c-size-err", ok2 ? "" : "Pick a size, so we use the right benchmarks.");
      markGroup("company_size", !ok2);
      if (!ok1) firmSelect.focus();
      return ok1 && ok2;
    },
    () => {
      const ok = !!picked("intent");
      err("c-intent-err", ok ? "" : "Pick the closest match. You can add detail on the next step.");
      markGroup("intent", !ok);
      return ok;
    },
    () => {
      if (nosite.checked || !site.value.trim()) return err("c-site-err", "", site);
      const ok = SITE.test(site.value.trim());
      if (!ok) site.focus();
      return err("c-site-err", ok ? "" : "That does not look like a web address. Try yourfirm.co.uk.", site);
    },
    () => {
      const a = !!picked("budget");
      const b = !!picked("urgency");
      err("c-budget-err", a ? "" : "Pick a range, or Not sure yet.");
      err("c-urgency-err", b ? "" : "Pick how soon.");
      markGroup("budget", !a);
      markGroup("urgency", !b);
      return a && b;
    },
    () => {
      if (asap.checked) return err("c-call-err", "");
      const ok = !!picked("call_day") && !!picked("call_time");
      err("c-call-err", ok ? "" : "Pick a day and a time, or choose As soon as possible.");
      return ok;
    },
  ];

  /* ---------- events ---------- */
  back.addEventListener("click", () => {
    if (index > 0 && !busy) show(index - 1, -1);
  });
  form.addEventListener("change", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (t.type === "radio") {
      markGroup(t.name, false);
      const holder = { company_size: "c-size-err", intent: "c-intent-err", budget: "c-budget-err", urgency: "c-urgency-err", call_day: "c-call-err", call_time: "c-call-err" }[t.name];
      if (holder) $(holder).textContent = "";
      if (t.name === "intent" && !busy) setTimeout(() => { if (index === 2 && checks[2]()) show(3, 1); }, reduced ? 0 : 280);
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (busy) return;
    if (!checks[index]()) return;
    if (index < TOTAL - 1) show(index + 1, 1);
    else send();
  });

  /* ---------- send ---------- */
  function callWhen() {
    if (asap.checked) return "As soon as possible";
    const day = dayOptions.find((d) => d.iso === (picked("call_day") || {}).value);
    const time = (picked("call_time") || {}).value;
    return day && time ? day.long + " at " + time + " UK time" : "";
  }

  /* Chat links are built here, after a finished and bot-checked enquiry, never in the HTML. */
  const openedAt = Date.now();
  const MIN_FILL_MS = 10000;
  const CHAT = { tg: "intelmadesimple", wa: ["44", "7722", "905497"] };
  const refCode = () => {
    const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    const buf = new Uint8Array(5);
    crypto.getRandomValues(buf);
    return "IMS-" + Array.from(buf, (n) => alphabet[n % alphabet.length]).join("");
  };
  function showChat(fullName, ref) {
    const first = String(fullName || "").trim().split(/\s+/)[0] || "there";
    const text = "Hi Adam, it's " + first + ". I just sent the form on your site. Ref " + ref + ".";
    const row = $("fn-chat-row");
    [
      ["Telegram", "https://t.me/" + CHAT.tg + "?text=" + encodeURIComponent(text), "Chat Click Telegram"],
      ["WhatsApp", "https://wa.me/" + CHAT.wa.join("") + "?text=" + encodeURIComponent(text), "Chat Click WhatsApp"],
    ].forEach(([label, href, event]) => {
      const a = document.createElement("a");
      a.className = "btn btn-s";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer nofollow";
      a.textContent = label;
      a.addEventListener("click", () => plausible(event));
      row.appendChild(a);
    });
    $("fn-chat").hidden = false;
  }

  async function send() {
    const trap = field("bot-field");
    if (trap && trap.value) {
      // A bot filled the trap: look like success, send nothing, reveal nothing.
      busy = true;
      finale(String((field("name") || {}).value || ""), callWhen(), new FormData(form));
      return;
    }
    const human = Date.now() - openedAt >= MIN_FILL_MS;
    const ref = refCode();
    setField("ref", ref);
    busy = true;
    next.disabled = true;
    back.disabled = true;
    const label = next.textContent;
    next.textContent = "Sending…";
    out.textContent = "";
    out.classList.remove("is-err");
    const data = new FormData(form);
    data.set("form-name", "contact");
    data.set("call_when", callWhen());
    const body = new URLSearchParams();
    data.forEach((value, key) => {
      if (typeof value === "string" && (value !== "" || key === "bot-field")) body.set(key, value);
    });
    try {
      const res = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      // Netlify Forms only exists on Netlify: a local dev server answers 404 or 405.
      const devHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || /\.(localhost|test)$/.test(location.hostname);
      if (!res.ok && !(devHost && (res.status === 404 || res.status === 405))) throw new Error("form " + res.status);
      if (!res.ok) console.warn("Netlify Forms is absent on this dev host (" + res.status + "); playing the finale without storing the lead.");
    } catch {
      busy = false;
      next.disabled = false;
      back.disabled = false;
      next.textContent = label;
      out.classList.add("is-err");
      out.textContent = "That did not send. Check your connection and try again, or email info@intelmadesimple.com.";
      return;
    }
    const alertBody = {};
    body.forEach((value, key) => {
      if (key !== "form-name") alertBody[key] = value;
    });
    fetch("/api/contact-alert", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(alertBody), keepalive: true }).catch(() => {});
    plausible("Lead Submit");
    if (human) showChat(data.get("name"), ref);
    finale(data.get("name"), callWhen(), data);
  }

  function finale(fullName, when, data) {
    const first = String(fullName || "").trim().split(/\s+/)[0] || "there";
    const fullClean = String(fullName || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const soon = asap.checked || !when;
    // The sky carries a short, friendly note; the card beside it keeps the form-style recap.
    // The number and the time are picked out in the sun's amber so they are the two things the eye lands on.
    const mark = (text) => {
      const b = document.createElement("b");
      b.className = "fn-tk";
      b.textContent = text;
      return b;
    };
    const note = ["Got it. Adam will call you"];
    if (phone) note.push(" on ", mark(phone));
    note.push(soon ? " as soon as he can." : [document.createElement("br"), mark(when.replace(" UK time", "")), " (UK time)."]);
    $("fn-ty").textContent = "Thanks, " + first + ".";
    $("fn-tw").replaceChildren(...note.flat());
    const whenText = soon ? "As soon as possible" : when;
    $("fn-r-name").textContent = fullClean;
    $("fn-r-phone").textContent = phone;
    $("fn-r-when").textContent = whenText;
    $("fn-tc").textContent = "Speak soon, Adam";
    $("fn-done-h").textContent = "Sent, " + first + ".";
    $("fn-done-p").textContent = asap.checked || !when
      ? "Adam will contact you as soon as possible. Want a time that suits you better? Lock one on his calendar."
      : "Adam will confirm " + when + " by email or text. Want a time that suits you better? Lock one on his calendar.";
    const cal = $("fn-cal");
    cal.href = BOOKING;
    cal.addEventListener("click", () => plausible("Booking Click"));
    funnel.dataset.state = "done";

    form.hidden = true;
    form.closest(".fn-panel").querySelector(".fn-progress").hidden = true;
    const done = $("fn-done");
    done.hidden = false;
    const thanks = $("fn-thanks");

    // The form is gone and the page has shrunk: bring the scene back under the header so the drive-off and the thank-you are seen.
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav")) || 64;
    const sceneTop = scene.getBoundingClientRect().top + window.scrollY - navH - 8;
    if (Math.abs(window.scrollY - sceneTop) > 4 && scene.getBoundingClientRect().top < navH) {
      window.scrollTo({ top: Math.max(0, sceneTop), behavior: reduced ? "auto" : "smooth" });
    }

    const reveal = () => {
      thanks.hidden = false;
      $("fn-done-h").focus({ preventScroll: true });
    };
    if (reduced) {
      gsap.set(driver, { autoAlpha: 1 });
      gsap.set(man, { autoAlpha: 0 });
      gsap.set(car, { x: sceneW() });
      scene.style.setProperty("--dusk", 1);
      gsap.set(bubble, { autoAlpha: 0 });
      reveal();
      return;
    }
    bubble.textContent = "Right, off I go.";
    anchorBubble();
    const sun = $("fn-sun");
    const exit = sceneW() + 220;
    const tl = gsap.timeline();
    tl.to(bubble, { autoAlpha: 1, y: 0, duration: 0.2 }, 0)
      .add(setDuskFinal, 0)
      .add(walk(car.offsetLeft + 52, 0.9), 0.5)
      .to(bubble, { autoAlpha: 0, duration: 0.15 }, 0.5)
      .set(man, { autoAlpha: 0 }, 1.4)
      .set(driver, { autoAlpha: 1 }, 1.4)
      .to(car, { y: -2, duration: 0.07, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.45)
      .to(car, { x: exit, duration: 2.6, ease: "power2.in" }, 1.9)
      .to(wheels, { rotation: "+=1400", duration: 2.6, ease: "power2.in" }, 1.9)
      .to(sun, { y: (matchMedia("(max-width: 960px)").matches ? 420 : sceneH()) * 0.5, duration: 3.4, ease: "power1.inOut" }, 0.6)
      .add(reveal, 1.9)
      .fromTo([$("fn-ty"), $("fn-tw"), $("fn-tc")], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power2.out" }, 1.95);
  }
  function setDuskFinal() {
    gsap.to(scene, { "--dusk": 1, duration: 3, ease: "power1.inOut" });
  }

  /* ---------- go ---------- */
  steps.forEach((s, i) => {
    s.hidden = i !== 0;
  });
  paintProgress(false);
  scene.style.setProperty("--dusk", 0);
  syncAsap();
  // Wait a frame so offsets are laid out before the scene is placed.
  requestAnimationFrame(() => requestAnimationFrame(arrive));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveCoin(false));
  window.addEventListener("resize", () => {
    moveCoin(false);
    if (funnel.dataset.state !== "done" && !reduced) {
      gsap.set(man, { x: manHome() });
      anchorBubble();
    }
  });
}
