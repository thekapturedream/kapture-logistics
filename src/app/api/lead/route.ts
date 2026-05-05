import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  type: z.enum(["quote", "contact", "newsletter", "partner"]).default("contact"),
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().max(180),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  origin: z.string().max(160).optional().or(z.literal("")),
  destination: z.string().max(160).optional().or(z.literal("")),
  cargo_type: z.string().max(80).optional().or(z.literal("")),
  weight_kg: z.coerce.number().positive().max(10_000_000).optional().or(z.literal("")),
  mode: z.string().max(40).optional().or(z.literal("")),
  pickup_date: z.string().max(40).optional().or(z.literal("")),
  topic: z.string().max(80).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  source: z.string().max(80).optional().or(z.literal("")),
});

function blankToNull<T extends Record<string, unknown>>(obj: T) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = v === "" ? null : v;
  }
  return out;
}

async function notifyWebhook(lead: Record<string, unknown>) {
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

  // Always notify webhook (Make.com / Zapier route) regardless of Supabase state
  await notifyWebhook(lead);

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Soft success — site still works without Supabase configured.
    // Useful for previews and local dev. Lead is captured via webhook only.
    console.warn("[lead] Supabase not configured — lead forwarded to webhook only.");
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("leads").insert(lead);
  if (error) {
    console.error("[lead] supabase insert failed:", error);
    return NextResponse.json({ error: "Could not save lead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "lead" });
}
