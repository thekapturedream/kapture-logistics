"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, CalendarClock } from "lucide-react";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const INTENTS = [
  { id: "buy",       label: "Buy this template as-is",        body: "Branded for me, deployed to my domain, repo handed over." },
  { id: "customize", label: "Customize this template",         body: "Different copy, different industry, different colours." },
  { id: "custom",    label: "Build something custom",          body: "Bespoke site designed from scratch around my business." },
];

export function QuoteForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [intent, setIntent] = React.useState<string>("buy");
  const formRef = React.useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type: "quote", source: "kapture-template-onboarding" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Could not submit. Please try again.");
      }

      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // SUCCESS — Calendly booking for the 15-minute discovery call.
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="rounded-2xl border border-kapture-yellow bg-kapture-yellow/10 p-7 md:p-8">
          <CheckCircle2 className="text-kapture-amber" size={28} />
          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
            Got it. Now lock the call.
          </h3>
          <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
            Pick a 15-minute slot below. We'll walk through what you want, agree the scope and
            timeline, and confirm pricing on the call. Free, no commitment.
          </p>
        </div>

        <div className="flex items-center gap-3 px-1">
          <CalendarClock size={18} className="text-kapture-yellow" />
          <p className="text-sm font-semibold uppercase tracking-wider text-kapture-mist">
            Free · 15 minutes · With Kapture
          </p>
        </div>

        <CalendlyEmbed />
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border bg-white p-6 shadow-kapture-soft dark:border-kapture-ash dark:bg-kapture-coal md:p-8"
    >
      {/* Step 1 — Intent */}
      <p className="label">1. What do you want?</p>
      <div className="grid gap-3 md:grid-cols-3">
        {INTENTS.map((opt) => {
          const active = intent === opt.id;
          return (
            <button
              type="button"
              key={opt.id}
              onClick={() => setIntent(opt.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all",
                active
                  ? "border-kapture-black bg-kapture-black text-kapture-white dark:border-kapture-white dark:bg-kapture-white dark:text-kapture-black"
                  : "hover:border-kapture-black dark:hover:border-kapture-white",
              )}
            >
              <p className="text-sm font-bold leading-tight">{opt.label}</p>
              <p
                className={cn(
                  "mt-1 text-xs leading-relaxed",
                  active
                    ? "text-white/75 dark:text-kapture-black/75"
                    : "text-kapture-smoke dark:text-kapture-fog",
                )}
              >
                {opt.body}
              </p>
            </button>
          );
        })}
      </div>
      <input type="hidden" name="intent" value={intent} />

      {/* Step 2 — About you */}
      <p className="label mt-8">2. About you</p>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name *"      name="name"     required />
        <Field label="Work email *"     name="email"    type="email" required />
        <Field label="Business name *"  name="company"  required />
        <Field label="Phone (with country code)" name="phone" type="tel" />
      </div>

      {/* Step 3 — About the build */}
      <p className="label mt-8">3. About your business</p>
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Domain (where you want it deployed)"
          name="domain"
          placeholder="yourbusiness.com"
        />
        <label>
          <span className="label">Industry</span>
          <select className="field" name="industry" defaultValue="Logistics & Freight">
            <option>Logistics & Freight</option>
            <option>Retail & E-commerce</option>
            <option>Manufacturing</option>
            <option>Mining & Energy</option>
            <option>Healthcare</option>
            <option>Agriculture</option>
            <option>Tech & SaaS</option>
            <option>Financial Services</option>
            <option>Hospitality</option>
            <option>Government / Public</option>
            <option>Other</option>
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="label">When do you need it live?</span>
          <select className="field" name="timeline" defaultValue="Within a week">
            <option>ASAP — within 24 hours</option>
            <option>Within a week</option>
            <option>Within a month</option>
            <option>Next quarter</option>
            <option>Just exploring</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="label">Anything else? (brand colours, integrations, must-haves)</span>
        <textarea
          name="message"
          rows={4}
          className="field"
          placeholder="e.g. swap the freight calculator for a booking widget, integrate HubSpot, brand colours are #..."
        />
      </label>

      <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-kapture-mist">
          By submitting you agree to be contacted by Kapture.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary text-base disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send & book my meeting"}
          <ArrowRight size={16} />
        </button>
      </div>

      {status === "error" && errorMsg && (
        <div className="mt-4 flex items-start gap-2 rounded-kapture border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <AlertTriangle size={16} className="mt-0.5" />
          {errorMsg}
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label>
      <span className="label">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="field"
      />
    </label>
  );
}
