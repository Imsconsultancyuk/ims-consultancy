"use client";

import { useState, type FormEvent } from "react";

type Intent =
  | "ai-automation"
  | "seo"
  | "custom-software"
  | "strategic-advisory"
  | "other";

const INTENT_OPTIONS: Array<{ value: Intent; label: string }> = [
  { value: "ai-automation", label: "AI Automation" },
  { value: "seo", label: "SEO and Organic Growth" },
  { value: "custom-software", label: "Custom Software" },
  { value: "strategic-advisory", label: "Strategic Advisory" },
  { value: "other", label: "Something else" },
];

/**
 * Lightweight contact form. Validates inline. The submit endpoint is wired
 * to a mailto handoff for now; a Resend backend is plumbed in a later
 * phase. The user gets clear visible feedback either way.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [intent, setIntent] = useState<Intent>("ai-automation");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please add your name.");
      setStatus("err");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg("That does not look like an email. Try again.");
      setStatus("err");
      return;
    }
    if (message.trim().length < 12) {
      setErrorMsg("Add a sentence or two about what you need.");
      setStatus("err");
      return;
    }

    const intentLabel =
      INTENT_OPTIONS.find((o) => o.value === intent)?.label ?? intent;
    const subject = `New IMS enquiry · ${intentLabel}`;
    const body = [
      `From: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Interest: ${intentLabel}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const href = `mailto:info@intelmadesimple.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("ok");
    setErrorMsg("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur sm:p-8"
      noValidate
    >
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
        Tell us what you need
      </p>
      <h3 className="mt-3 font-serif text-[1.5rem] font-medium leading-tight text-paper-ink">
        Send a short brief.
      </h3>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-mauve-200">
            Name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setStatus("idle");
            }}
            required
            autoComplete="name"
            className="rounded-md border border-mauve-300/20 bg-deep/40 px-4 py-3 text-[0.9375rem] text-paper-ink placeholder:text-mauve-300/60 backdrop-blur transition-colors focus:border-mauve-200/50 focus:outline-none"
            placeholder="Your name"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-mauve-200">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus("idle");
            }}
            required
            autoComplete="email"
            className="rounded-md border border-mauve-300/20 bg-deep/40 px-4 py-3 text-[0.9375rem] text-paper-ink placeholder:text-mauve-300/60 backdrop-blur transition-colors focus:border-mauve-200/50 focus:outline-none"
            placeholder="you@yourbusiness.com"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-mauve-200">
            Company
          </span>
          <input
            type="text"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setStatus("idle");
            }}
            autoComplete="organization"
            className="rounded-md border border-mauve-300/20 bg-deep/40 px-4 py-3 text-[0.9375rem] text-paper-ink placeholder:text-mauve-300/60 backdrop-blur transition-colors focus:border-mauve-200/50 focus:outline-none"
            placeholder="Optional"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-mauve-200">
            Interest
          </span>
          <select
            value={intent}
            onChange={(e) => {
              setIntent(e.target.value as Intent);
              setStatus("idle");
            }}
            className="rounded-md border border-mauve-300/20 bg-deep/40 px-4 py-3 text-[0.9375rem] text-paper-ink backdrop-blur transition-colors focus:border-mauve-200/50 focus:outline-none"
          >
            {INTENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-deep">
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 flex flex-col gap-2">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-mauve-200">
          What is on your plate
        </span>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setStatus("idle");
          }}
          required
          rows={5}
          className="rounded-md border border-mauve-300/20 bg-deep/40 px-4 py-3 text-[0.9375rem] text-paper-ink placeholder:text-mauve-300/60 backdrop-blur transition-colors focus:border-mauve-200/50 focus:outline-none"
          placeholder="A few sentences on the work, the constraint, and the timeline if you have one."
        />
      </label>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          data-cursor="cta"
          className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-7 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
        >
          Send the brief
        </button>
        <p
          aria-live="polite"
          className={`text-[12px] tracking-[0.04em] ${
            status === "ok"
              ? "text-mauve-200"
              : status === "err"
                ? "text-[color:#d4998c]"
                : "text-mauve-300"
          }`}
        >
          {status === "ok"
            ? "Opening your email client to send."
            : status === "err"
              ? errorMsg
              : "Every note is read personally."}
        </p>
      </div>
    </form>
  );
}
