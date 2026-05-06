import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  type: z.enum(["quote", "contact", "newsletter", "partner"]).default("contact"),
  // Personal details
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().max(180),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  // Freight quote fields (logistics demo flow)
  origin: z.string().max(160).optional().or(z.literal("")),
  destination: z.string().max(160).optional().or(z.literal("")),
  cargo_type: z.string().max(80).optional().or(z.literal("")),
  weight_kg: z.coerce.number().positive().max(10_000_000).optional().or(z.literal("")),
  mode: z.string().max(40).optional().or(z.literal("")),
  pickup_date: z.string().max(40).optional().or(z.literal("")),
  // Kapture onboarding fields (template buy/customize/custom flow)
  intent: z.string().max(40).optional().or(z.literal("")),
  domain: z.string().max(180).optional().or(z.literal("")),
  industry: z.string().max(80).optional().or(z.literal("")),
  timeline: z.string().max(80).optional().or(z.literal("")),
  // General
  topic: z.string().max(80).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  source: z.string().max(80).optional().or(z.literal("")),
});

type Lead = Record<string, unknown>;

function blankToNull<T extends Record<string, unknown>>(obj: T) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = v === "" ? null : v;
  }
  return out;
}

/* ────────────────────────────────────────────────────────────────────── */
/* Email delivery — Resend HTTP API                                        */
/*                                                                         */
/* Free tier: 3,000 emails/month. Default `onboarding@resend.dev` sender   */
/* works without domain verification — perfect for shipping today.         */
/* Set RESEND_FROM_EMAIL once you verify thekapture.com.                   */
/* ────────────────────────────────────────────────────────────────────── */

const FIELD_LABELS: Record<string, string> = {
  type:         "Lead type",
  name:         "Name",
  email:        "Email",
  phone:        "Phone",
  company:      "Company",
  origin:       "Pickup",
  destination:  "Drop-off",
  cargo_type:   "Cargo type",
  weight_kg:    "Weight (kg)",
  mode:         "Mode",
  pickup_date:  "Pickup date",
  intent:       "Intent",
  domain:       "Domain",
  industry:     "Industry",
  timeline:     "Timeline",
  topic:        "Topic",
  service:      "Service",
  message:      "Message",
  source:       "Source",
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(lead: Lead, subject: string) {
  const rows = Object.entries(lead)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] ?? k;
      const value = String(v);
      const isMessage = k === "message";
      return `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eaeaea;color:#9A9A9A;font-size:11px;letter-spacing:0.5px;text-transform:uppercase;font-weight:600;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eaeaea;color:#0A0A0A;font-size:14px;line-height:1.55;${isMessage ? "white-space:pre-wrap;" : ""}">${escapeHtml(value)}</td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:32px 16px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0A0A0A;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
    <div style="background:#0A0A0A;color:#ffffff;padding:24px 28px;">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#FFD400;">New lead · Kapture Logistics</div>
      <div style="margin-top:6px;font-size:20px;font-weight:700;">${escapeHtml(subject)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <div style="padding:18px 28px;background:#f5f5f5;color:#9A9A9A;font-size:11px;text-align:center;text-transform:uppercase;letter-spacing:0.5px;">
      Captured ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} · Reply directly to respond
    </div>
  </div>
</body>
</html>`;
}

async function sendLeadEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY not set — email skipped. Hit /api/test-email for diagnostics.");
    return { ok: false, reason: "no-api-key" as const };
  }

  const to = process.env.KAPTURE_LEAD_NOTIFY_EMAIL || "studio@thekapture.com";
  const from = process.env.RESEND_FROM_EMAIL || "Kapture Logistics <onboarding@resend.dev>";
  const replyTo = typeof lead.email === "string" ? lead.email : undefined;

  const leadType = typeof lead.type === "string" ? lead.type : "lead";
  const leadName = typeof lead.name === "string" && lead.name ? lead.name : "anonymous";
  const subject = `New ${leadType} from ${leadName}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[Kapture] ${subject}`,
        html: buildEmailHtml(lead, subject),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      // Capture full Resend response body for debugging in Vercel logs
      const errBody = await res.text().catch(() => "(no body)");
      console.error(
        `[lead] Resend rejected send. status=${res.status} from=${from} to=${to} body=${errBody}`,
      );
      return { ok: false, reason: "send-failed" as const, status: res.status, errBody };
    }
    const okBody = await res.json().catch(() => ({}));
    console.log(`[lead] Resend accepted email. id=${(okBody as { id?: string }).id ?? "?"} to=${to}`);
    return { ok: true as const };
  } catch (err) {
    console.error("[lead] resend send exception:", err);
    return { ok: false, reason: "exception" as const };
  }
}

/* ────────────────────────────────────────────────────────────────────── */
/* Optional fan-out hooks                                                  */
/* ────────────────────────────────────────────────────────────────────── */

async function notifyWebhook(lead: Lead) {
  const url = process.env.KAPTURE_LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site: "kapture-logistics",
        receivedAt: new Date().toISOString(),
        lead,
      }),
    });
  } catch (err) {
    console.error("[lead] webhook notify failed:", err);
  }
}

/** Whitelist of columns that exist in the public.leads Supabase table. */
const SUPABASE_COLUMNS = [
  "type", "name", "email", "phone", "company",
  "origin", "destination", "cargo_type", "weight_kg",
  "mode", "pickup_date", "topic", "service",
  "message", "source",
] as const;

function pickSupabaseColumns(lead: Lead): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of SUPABASE_COLUMNS) {
    if (k in lead) out[k] = lead[k];
  }
  return out;
}

/* ────────────────────────────────────────────────────────────────────── */
/* Route handlers                                                          */
/* ────────────────────────────────────────────────────────────────────── */

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const lead = blankToNull(parsed.data);

  // Email + webhook in parallel — neither blocks the user response on
  // failure. Email is the primary delivery; everything else is fan-out.
  const [emailResult] = await Promise.all([
    sendLeadEmail(lead),
    notifyWebhook(lead),
  ]);

  // Best-effort Supabase persistence — never fails the user request.
  // If columns drift (e.g. new template fields), they're filtered out by
  // pickSupabaseColumns rather than crashing the insert.
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const payload = pickSupabaseColumns(lead);
    const { error } = await supabase.from("leads").insert(payload);
    if (error) {
      console.error("[lead] supabase insert failed:", error);
    }
  }

  return NextResponse.json({ ok: true, emailed: emailResult.ok });
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "lead" });
}
