// Content for the three new service pages. Prices come from lib/pricing/offers.ts
// so a price is changed in one place. Statistics are third-party survey figures
// from commercial publishers, named in `sources`, and are used as context only.

import { LADDER, type Rung } from "@/lib/pricing/offers";

export interface ServiceStep {
  name: string;
  when: string;
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceStat {
  value: string;
  label: string;
  source: string;
}

export interface ServiceContent {
  slug: string;
  /** Matches the LADDER slug so price and CTA stay in sync. */
  rungSlug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  headline: string;
  lead: string;
  forWho: string[];
  problem: string;
  stat?: ServiceStat;
  steps: ServiceStep[];
  deliverables: string[];
  notDoing: string[];
  status?: string;
  faqs: ServiceFaq[];
  related: { href: string; label: string }[];
  /** Optional extra block rendered after the steps. */
  secondary?: { id: string; kicker: string; title: string; price: string; body: string; points: string[]; cta: string };
}

export function rungFor(slug: string): Rung {
  const r = LADDER.find((x) => x.slug === slug);
  if (!r) throw new Error(`Unknown rung: ${slug}`);
  return r;
}

export const SERVICE_PAGES: ServiceContent[] = [
  {
    slug: "ai-readiness-audit",
    rungSlug: "ai-readiness-audit",
    name: "AI Readiness Audit",
    metaTitle: "AI Readiness Audit for Small UK Firms",
    metaDescription:
      "A fixed-fee AI readiness audit for small UK firms, from £1,500. We read twelve months of records and return a ranked, costed list of where AI pays.",
    kicker: "Service · Start here",
    headline: "Know where AI pays in your firm, before you buy anything.",
    lead:
      "Most owners are being pitched products by people who have never watched their business run. The audit does the reverse. We sit with you first, watch the work, read the records, and give you a written answer you can take to anyone, including a rival supplier.",
    forWho: [
      "Owners of firms of about 5 to 50 people who know AI matters and have no plan",
      "Anyone holding a quote for an AI tool they cannot judge",
      "Firms that tried a tool, saw little change and are not sure why",
    ],
    problem:
      "The usual order is wrong. A tool arrives, then a business is found to fit it. An audit turns it round: the work comes first, the tool last, and sometimes the answer is that nothing should be bought.",
    stat: {
      value: "39%",
      label: "of UK small businesses said they see no clear use for AI",
      source: "Simply Business 2026 SME Insights, 1,842 firms (commercial survey)",
    },
    steps: [
      {
        name: "Sit with the owner",
        when: "Days 1 to 2",
        body: "A long conversation about how money comes in, where it slows and what keeps you up. No slides.",
      },
      {
        name: "Watch the work",
        when: "Days 3 to 5",
        body: "We follow an enquiry, an invoice and a renewal through the people who handle them, and note every hand-off.",
      },
      {
        name: "Read the records",
        when: "Days 5 to 8",
        body: "Twelve months of enquiries, invoices and renewals, read for gaps. Anything we cannot see, we say we cannot see.",
      },
      {
        name: "Write it plainly",
        when: "Days 8 to 10",
        body: "A ranked list of fixes with a cost and a payback each, and a short list of what to leave alone. Then a walkthrough with you.",
      },
    ],
    deliverables: [
      "A written report in plain English, not a deck",
      "Fixes ranked by payback, each with a cost range",
      "A leave-alone list: things AI would not improve in your firm",
      "A thirty-minute walkthrough and a written answer to your questions",
    ],
    notDoing: [
      "We do not build anything as part of the audit, so we have no reason to inflate the findings",
      "It is not a security or legal review. Where a finding needs a specialist, we say so",
      "It does not promise a result. It prices the options so you can choose",
    ],
    faqs: [
      {
        q: "How much does an AI readiness audit cost?",
        a: "From £1,500, confirmed as a fixed price once we have scoped your firm. Published UK price guides put small-firm audits at roughly £1,500 to £6,000 and large-consultancy audits at £50,000 and above. We price at the small-firm end because the work is done by the people you meet.",
      },
      {
        q: "How long does it take?",
        a: "One to two weeks from the first conversation to the written report, depending on how quickly we can get at your records.",
      },
      {
        q: "Will you try to sell me a build afterwards?",
        a: "We will say what we could build if the list says it is worth it, and we will say who else could. The report is yours either way and works with any supplier.",
      },
      {
        q: "Is our data safe?",
        a: "We ask for the minimum records the audit needs, read them under a written confidentiality agreement and delete our copies when the report is delivered. Say if there is anything you would rather we did not see.",
      },
    ],
    related: [
      { href: "/pricing#ai-readiness-audit", label: "Audit price and what it includes" },
      { href: "/services/team-enablement", label: "Team Enablement and AI Use Policy" },
      { href: "/case-studies", label: "Five documented revenue-leak cases" },
    ],
    secondary: {
      id: "second-opinion",
      kicker: "Smaller door in",
      title: "AI Second Opinion",
      price: "From £400",
      body:
        "You hold a quote, a proposal or a tool someone wants you to buy. We read it, check it against how your firm actually works, and tell you what we would do.",
      points: [
        "Written within five working days",
        "Three questions to put to the seller, in writing",
        "A plain verdict: buy, change it, or walk away, and why",
        "We build nothing at this rung, so no reason to talk you into more",
      ],
      cta: "Ask for a second opinion",
    },
  },
  {
    slug: "enquiry-desk",
    rungSlug: "enquiry-desk",
    name: "Enquiry Desk",
    metaTitle: "Enquiry Desk for Small UK Firms",
    metaDescription:
      "Calls, forms and messages answered the same day in your voice and logged with a follow-up date, with a person called in for anything that matters.",
    kicker: "Service · Front door",
    headline: "Every enquiry answered, logged and followed up.",
    lead:
      "A firm can do everything right and still lose the work that never reached it: the call at lunchtime, the form on a Sunday, the message nobody answered. The Enquiry Desk catches those, answers them in your voice and hands the ones that matter to a named person.",
    forWho: [
      "Clinics, practices, trades and small professional firms that miss calls at busy times",
      "Firms where enquiries arrive by phone, form and message and live in three places",
      "Owners who answer enquiries themselves and cannot keep up",
    ],
    problem:
      "A missed enquiry is revenue that was one reply away. Most firms cannot say how many they miss, because a missed call leaves no record. The desk logs each one, so the number stops being a guess.",
    stat: {
      value: "37%",
      label: "of UK adults said they would wait 60 seconds or less before trying a competitor",
      source: "YouGov, for an answering-service provider (commercial survey)",
    },
    steps: [
      {
        name: "Map the front door",
        when: "Week 1",
        body: "Where enquiries arrive, who answers, and what a good answer sounds like in your firm.",
      },
      {
        name: "Set the rules",
        when: "Week 1 to 2",
        body: "Your voice, your opening hours, what we answer, and the point at which we hand over to a person.",
      },
      {
        name: "Go live in shadow",
        when: "Week 2",
        body: "The desk drafts, a person approves. You see every reply before it goes for the first days.",
      },
      {
        name: "Go live",
        when: "Week 3",
        body: "Enquiries answered the same day and logged. A weekly list shows the ones that went quiet.",
      },
    ],
    deliverables: [
      "Calls, forms and messages answered the same day, in your voice",
      "Every enquiry logged with a follow-up date",
      "A weekly list of enquiries that went quiet",
      "A named person called in for anything above the threshold you set",
    ],
    notDoing: [
      "It is not an emergency line, and we do not take responsibility for a business-critical phone line",
      "It does not give advice, quote prices you have not approved or make commitments for you",
      "Call and message costs from the telephony provider are passed through at cost",
    ],
    status:
      "New service. We are taking a small number of firms for the first deployments, so setup is scoped with you rather than taken off a shelf. Price and timing are confirmed in writing before you pay.",
    faqs: [
      {
        q: "How much does it cost?",
        a: "From £1,200 to set up, then from £300 a month, confirmed in writing for your firm before you pay. Telephony and message costs from the provider are passed through at cost and shown on each statement.",
      },
      {
        q: "Does it sound like a robot?",
        a: "In shadow mode you hear every reply before it goes, and you set the wording. If a reply is not good enough, it does not go out.",
      },
      {
        q: "What happens with an urgent or complex enquiry?",
        a: "Above the threshold you set, the desk stops and calls a named person. It does not guess.",
      },
      {
        q: "Can we leave?",
        a: "The terms, including how to stop, are written down and agreed before you pay anything.",
      },
    ],
    related: [
      { href: "/pricing#enquiry-desk", label: "Enquiry Desk price and what it includes" },
      { href: "/services/ai-readiness-audit", label: "AI Readiness Audit" },
      { href: "/industries", label: "Sectors we work in" },
    ],
  },
  {
    slug: "team-enablement",
    rungSlug: "team-enablement",
    name: "Team Enablement and AI Use Policy",
    metaTitle: "Team Enablement and AI Use Policy",
    metaDescription:
      "A half-day that teaches your team to use AI on their real work, plus a plain-English AI use policy saying what goes in, what stays out and who signs off.",
    kicker: "Service · People",
    headline: "Your team is already using AI. Make it safe and make it useful.",
    lead:
      "In most small firms someone is already pasting client text into a chatbot, and nobody has said whether that is allowed. We spend a half-day with your team on their own tasks, and you leave with a short policy that says what is allowed.",
    forWho: [
      "Firms where staff use AI quietly and the owner is unsure what is going in",
      "Owners who want the benefit without a data incident",
      "Teams of up to 12 who would rather learn on their own work than sit through a demo",
    ],
    problem:
      "Fear of getting it wrong stops sensible use, and no rules lets careless use through. A short, specific policy and a team that has practised on real tasks fixes both.",
    stat: {
      value: "44%",
      label: "of UK small businesses cited privacy and security as a barrier to using AI",
      source: "Simply Business 2026 SME Insights, 1,842 firms (commercial survey)",
    },
    steps: [
      {
        name: "Learn how you work",
        when: "Before the day",
        body: "A short call with the owner and a quick read of the tasks the team does most.",
      },
      {
        name: "The half-day",
        when: "One morning or afternoon",
        body: "Hands-on work on your own tasks. Drafting, summarising, checking and where not to use AI at all.",
      },
      {
        name: "Draft the policy",
        when: "Within a week",
        body: "A plain-English AI use policy: what may go in, what must stay out, who approves, what to do if something goes wrong.",
      },
      {
        name: "Leave it working",
        when: "Handed over",
        body: "A one-page card for each role and a policy your adviser can review and adopt.",
      },
    ],
    deliverables: [
      "A half-day for up to 12 people, built on your real tasks",
      "An AI use policy in plain English (pack from £600)",
      "A one-page card for each role",
      "A short list of tools worth trying and tools to avoid for your data",
    ],
    notDoing: [
      "The policy is a working document, not legal advice. Have your solicitor or adviser review it",
      "We do not claim grant or funding cover for training",
      "We do not install or sell software as part of the session",
    ],
    faqs: [
      {
        q: "How much does it cost?",
        a: "From £950 for a half-day for up to 12 people, and from £600 for the policy pack. From £1,550 together.",
      },
      {
        q: "Is the policy legal advice?",
        a: "No. It is a plain-English working policy based on how your firm works. We recommend your solicitor reviews it, and we say where a point needs a specialist.",
      },
      {
        q: "Where does the session happen?",
        a: "We agree the place and format when we scope it. In person works best for a team of up to 12.",
      },
      {
        q: "What if our team has very different skill levels?",
        a: "The work is on your own tasks, so each person starts where they are.",
      },
    ],
    related: [
      { href: "/pricing#team-enablement", label: "Team Enablement price and what it includes" },
      { href: "/services/ai-readiness-audit", label: "AI Readiness Audit" },
      { href: "/ai-policy", label: "Our own AI policy" },
    ],
  },
];

export function getServicePage(slug: string): ServiceContent | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function requireServicePage(slug: string): ServiceContent {
  const s = getServicePage(slug);
  if (!s) throw new Error(`Missing service content: ${slug}`);
  return s;
}
