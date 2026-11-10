import { z } from "zod";
import { BOOKING_URL, STAGES } from "@/lib/pricing/recovery";

// Lead alert for the flagship contact form. Netlify Forms stays the record of
// every enquiry; this route only emails Adam a readable summary with the
// booking link as plain text, so he can send it straight back.

const short = z.string().trim().max(120).optional().default("");
const amount = z.string().trim().regex(/^\d{0,9}$/).optional().default("");

const AlertSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  firm: z.string().trim().min(1).max(120),
  message: z.string().trim().max(4000).optional().default(""),
  intent: short,
  plan: short,
  code: short,
  stages: short,
  sector: short,
  firm_name: short,
  process: short,
  from: short,
  job: amount,
  leak: amount,
  recovered: amount,
  fee: amount,
  build: amount,
  "bot-field": z.string().max(0).optional().default(""),
});

type Alert = z.infer<typeof AlertSchema>;

const INTENT_LABELS: Record<string, string> = {
  "leak-scan": "Free Leak Scan",
  "stage-build": "Stage build",
  "full-system": "Full system",
  care: "Care",
  "white-label": "White-label",
  audit: "AI Readiness Audit",
  team: "Team Enablement",
  "enquiry-desk": "Enquiry Desk",
  other: "Something else",
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  const limited = recent.length >= RATE_LIMIT_MAX;
  if (!limited) recent.push(now);
  requestLog.set(key, recent);
  return limited;
}

function pounds(raw: string): string {
  return raw === "" ? "" : `£${Number(raw).toLocaleString("en-GB")}`;
}

function stageNames(raw: string): string {
  const ids = raw.split(",").map((s) => s.trim());
  return STAGES.filter((s) => ids.includes(s.id)).map((s) => s.name).join(", ");
}

function alertText(a: Alert): string {
  const rows: [string, string][] = [
    ["Name", a.name],
    ["Email", a.email],
    ["Kind of firm", a.firm_name ? `${a.firm} (${a.firm_name})` : a.firm],
    ["Wants", INTENT_LABELS[a.intent] ?? a.intent],
    ["Plan", a.plan],
    ["Code", a.code],
    ["Sector page", a.sector],
    ["Process picked", a.process],
    ["Stages", stageNames(a.stages)],
    ["Average job", pounds(a.job)],
    ["Leaking a month", pounds(a.leak)],
    ["Recovered a month", pounds(a.recovered)],
    ["Our fee a month", pounds(a.fee)],
    ["Build", pounds(a.build)],
    ["Came from", a.from],
  ];
  const lines = rows.filter(([, v]) => v !== "").map(([k, v]) => `${k}: ${v}`);
  return [
    `New enquiry from ${a.name}.`,
    "",
    ...lines,
    "",
    "Message:",
    a.message || "(none)",
    "",
    `Booking link to send them: ${BOOKING_URL}`,
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");
}

const ALLOWED_ORIGIN = /^https:\/\/((www\.)?intelmadesimple\.com|[a-z0-9-]+--[a-z0-9-]+\.netlify\.app|[a-z0-9-]+\.netlify\.app)$|^http:\/\/localhost:\d+$/;

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return origin !== null && ALLOWED_ORIGIN.test(origin);
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = AlertSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot gets the same answer as success, so bots learn nothing.
    const bot = typeof body === "object" && body !== null && (body as Record<string, unknown>)["bot-field"];
    return bot
      ? Response.json({ ok: true })
      : Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!key || !to) {
    console.error("[contact-alert] RESEND_API_KEY or ADMIN_NOTIFY_EMAIL missing; enquiry is still in Netlify Forms");
    return Response.json({ ok: false, error: "Alert not configured" }, { status: 503 });
  }

  const a = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Intel Made Simple <alerts@intelmadesimple.com>",
      to: [to],
      reply_to: a.email,
      subject: `New enquiry: ${a.name}, ${a.firm_name || a.firm}${a.intent ? ` (${INTENT_LABELS[a.intent] ?? a.intent})` : ""}`,
      text: alertText(a),
    }),
  });

  if (!res.ok) {
    console.error("[contact-alert] Resend refused the alert", res.status);
    return Response.json({ ok: false, error: "Alert failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
