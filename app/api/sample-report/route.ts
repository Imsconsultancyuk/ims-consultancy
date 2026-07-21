import { z } from "zod";

// IMS-026: validates + logs sample-report requests. Does NOT send an email —
// the industry PDFs are a post-launch asset (Doc 1 IMS-026, confirmed by the
// EPIC F launch-gate note "No TODOs left except the flagged sample-report
// PDFs"). TODO(post-launch): once PDFs exist, replace the console.log below
// with a real Resend send using RESEND_API_KEY.

const RequestSchema = z.object({
  email: z.string().email(),
  industry: z.string().min(1),
  company_website: z.string().max(0).optional().default(""), // honeypot — must stay empty
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

// In-memory — resets per server instance. Acceptable for a "basic" limiter
// per the ticket; not a guarantee across serverless cold starts/instances.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}

export async function POST(request: Request): Promise<Response> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return Response.json({ success: false, error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot lands here (max(0) fails) — report success anyway so
    // bots get no signal that they were caught.
    const honeypotTripped =
      typeof body === "object" &&
      body !== null &&
      "company_website" in body &&
      typeof (body as Record<string, unknown>).company_website === "string" &&
      (body as Record<string, unknown>).company_website !== "";

    if (honeypotTripped) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  console.log("[sample-report] requested", {
    email: parsed.data.email,
    industry: parsed.data.industry,
    at: new Date().toISOString(),
  });

  return Response.json({ success: true });
}
