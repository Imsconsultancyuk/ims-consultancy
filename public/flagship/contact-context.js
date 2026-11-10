// Contact page context. Reads what the visitor's CTA put in the query string,
// shows it back to them, and sends it with the enquiry.
//
// The form itself is driven by the compiled /assets/contact-*.js, which is
// immutable and posts only name, email, firm and message to Netlify Forms. So
// rather than replace it, this widens that one POST with the rest of the form,
// and once Netlify has the enquiry, asks /api/contact-alert to email Adam a
// summary with the booking link in it.
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var params = new URLSearchParams(location.search);
  var STAGES = { enquiry: "Enquiry", quote: "Quote", work: "Work done", invoice: "Invoice", renewal: "Renewal" };
  var INTENTS = {
    "leak-scan": "a free Leak Scan",
    "stage-build": "a stage build",
    "full-system": "the full system",
    care: "Care",
    "white-label": "white-label",
    other: "something else",
  };
  var SECTORS = {
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
    other: "Something else",
  };
  var FROM = {
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
  };
  var MESSAGES = {
    "leak-scan": "Where do you think money slips away?",
    "stage-build": "Which stage leaks most, do you think?",
    "full-system": "What runs on spreadsheets and memory today?",
    care: "What do you want watched after year one?",
    "white-label": "Who are your clients, and what would you resell?",
    other: "What can we help with?",
  };

  var clean = function (v, max) { return (v || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max || 120); };
  var digits = function (v) { return /^\d{1,9}$/.test(v || "") ? v : ""; };
  var gbp = function (v) { return "£" + Number(v).toLocaleString("en-GB"); };
  var field = function (name) { return form.elements.namedItem(name); };
  var set = function (name, value) { var el = field(name); if (el && value) el.value = value; };

  var intent = INTENTS[params.get("intent")] ? params.get("intent") : "";
  var sector = SECTORS[params.get("sector")] ? params.get("sector") : "";
  var stages = (params.get("stages") || "").split(",").filter(function (s) { return STAGES[s]; });
  var process = STAGES[params.get("process")] ? params.get("process") : "";
  var from = clean(params.get("from"), 60).replace(/[^a-z0-9-]/g, "");
  var nums = {
    job: digits(params.get("job")),
    leak: digits(params.get("leak")),
    recovered: digits(params.get("recovered")),
    fee: digits(params.get("fee")),
    build: digits(params.get("build")),
  };
  var code = params.get("code") === "NEWPARTNER26" ? "NEWPARTNER26" : "";
  var firmName = clean(params.get("firm_name"));

  set("plan", clean(params.get("plan"), 40).replace(/[^a-z0-9-]/g, ""));
  set("code", code);
  set("stages", stages.join(","));
  set("sector", sector);
  set("process", process);
  set("from", from);
  Object.keys(nums).forEach(function (k) { set(k, nums[k]); });

  var intentSelect = document.getElementById("c-intent");
  if (intentSelect && intent) intentSelect.value = intent;

  var firmSelect = document.getElementById("c-firm");
  var otherWrap = document.getElementById("c-firm-other");
  var otherInput = document.getElementById("c-firm-name");
  var syncOther = function () {
    if (!firmSelect || !otherWrap) return;
    otherWrap.hidden = firmSelect.value !== "Something else";
    if (otherInput) otherInput.disabled = otherWrap.hidden;
  };
  if (firmSelect && sector) firmSelect.value = SECTORS[sector];
  if (otherInput && firmName) otherInput.value = firmName;
  if (firmSelect) firmSelect.addEventListener("change", syncOther);
  syncOther();

  var msg = document.getElementById("c-msg-in");
  var msgLabel = document.querySelector('label[for="c-msg-in"]');
  var prompt = MESSAGES[intent];
  if (msgLabel && prompt && msgLabel.firstChild) msgLabel.firstChild.nodeValue = prompt + " ";
  if (msg && !msg.value && process) {
    msg.value = "The " + STAGES[process] + " stage is where I think we lose most.";
  }

  // What the visitor sees back: where they came from and the numbers they set.
  var panel = document.getElementById("c-ctx");
  var fromLine = document.getElementById("c-ctx-from");
  var list = document.getElementById("c-ctx-nums");
  var rows = [];
  // Third item marks a words row (set smaller than a figure); fourth is a note under the value.
  if (firmName) rows.push(["Your firm", firmName, true]);
  if (stages.length) rows.push([stages.length === 1 ? "Stage" : "Stages", stages.map(function (s) { return STAGES[s]; }).join(", "), true]);
  if (process) rows.push(["Stage to look at first", STAGES[process], true]);
  if (nums.job) rows.push(["Average job", gbp(nums.job)]);
  if (nums.leak) rows.push(["Leaking a month", gbp(nums.leak)]);
  if (nums.recovered) rows.push(["We win back a month", gbp(nums.recovered)]);
  if (nums.fee) rows.push(["Our fee a month", gbp(nums.fee)]);
  if (nums.build) rows.push(["Build", gbp(nums.build), false, code ? "with " + code : ""]);
  if (!nums.build && code) rows.push(["Code", code, true]);

  var origin = FROM[from] || (from.indexOf("tools-") === 0 ? "One of our sector toolkits" : "");
  if (panel && fromLine && list && (origin || rows.length)) {
    fromLine.textContent = (origin || "A link to us") + (intent ? ", asking about " + INTENTS[intent] + "." : ".");
    rows.forEach(function (r) {
      var row = document.createElement("div");
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = r[0];
      dd.textContent = r[1];
      if (r[2]) dd.className = "is-text";
      if (r[3]) {
        var note = document.createElement("small");
        note.textContent = r[3];
        dd.appendChild(note);
      }
      row.appendChild(dt);
      row.appendChild(dd);
      list.appendChild(row);
    });
    if (!rows.length) list.hidden = true;
    panel.hidden = false;
    panel.classList.add("is-in");
  }

  // The bundle's success line says "we have your details" and stops. Give the
  // visitor the next step while they are still looking at the page.
  var BOOKING = "https://cal.com/ims-consultancy/leak-scan";
  function showBooking() {
    var msg = document.getElementById("c-msg");
    if (!msg || document.getElementById("c-book")) return;
    var wrap = document.createElement("p");
    wrap.id = "c-book";
    wrap.style.marginTop = "14px";
    var a = document.createElement("a");
    a.className = "btn btn-p";
    a.href = BOOKING;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Pick a time for your Leak Scan";
    a.addEventListener("click", function () {
      try { if (window.plausible) window.plausible("Booking Click", { props: { page: "contact" } }); } catch (e) {}
    });
    wrap.appendChild(a);
    msg.insertAdjacentElement("afterend", wrap);
    try { if (window.plausible) window.plausible("Lead Submit", { props: { page: "contact" } }); } catch (e) {}
  }

  // Widen the compiled form's single POST to Netlify Forms, then raise the alert.
  var nativeFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : input && input.url;
    var body = init && init.body;
    if (url !== "/__forms.html" || typeof body !== "string") return nativeFetch(input, init);
    var sent = new URLSearchParams(body);
    if (sent.get("form-name") !== "contact") return nativeFetch(input, init);

    var data = new FormData(form);
    data.forEach(function (value, key) {
      if (!sent.has(key) && typeof value === "string" && value !== "") sent.set(key, value);
    });
    var next = Object.assign({}, init, { body: sent.toString() });
    return nativeFetch(input, next).then(function (res) {
      if (res.ok) {
        showBooking();
        var alert = {};
        sent.forEach(function (value, key) { if (key !== "form-name") alert[key] = value; });
        nativeFetch("/api/contact-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alert),
          keepalive: true,
        }).catch(function () {});
      }
      return res;
    });
  };
})();
