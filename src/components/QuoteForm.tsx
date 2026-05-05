"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  defaults?: {
    business?: string;
    industry?: string;
    timeline?: string;
    intent?: string;
  };
};

const INTENTS = [
  { id: "template", label: "Buy this template",  body: "Branded for me, deployed to my domain, repo handed over." },
  { id: "custom",   label: "Custom build",       body: "Bespoke site, designed from scratch, longer engagement." },
];

const INDUSTRIES = [
  "Logistics & Freight",
  "Retail & E-commerce",
  "Manufacturing",
  "Mining & Energy",
  "Healthcare",
  "Agriculture",
  "Tech & SaaS",
  "Financial Services",
  "Hospitality",
  "Government / Public",
  "Other",
];

const TIMELINES = [
  "ASAP — within 24 hours",
  "This week",
  "This month",
  "Next quarter",
  "Just exploring",
];

const BUDGETS = [
  "£2,500 — template only",
  "£2,500–£8,500 — template + customisation",
  "£8,500+ — custom build",
  "Not sure yet, advise me",
];

export function QuoteForm({ defaults }: Props) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [intent, setIntent] = React.useState(defaults?.intent === "custom" ? "custom" : "template");
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
        body: JSON.stringify({ ...payload, type: "quote", source: "kapture-onboarding" }),
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

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-kapture-yellow bg-kapture-yellow/10 p-8"
      >
        <CheckCircle2 className="text-kapture-amber" size={28} />
        <h3 className="mt-4 font-display text-2xl font-bold">
          Brief received. Kapture is on it.
        </h3>
        <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog">
          A Kapture Studio operator will reach out within the business hour with pricing, scope,
          and the next steps to get your site live in 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-6"
        >
          Submit another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border bg-white p-6 shadow-kapture-soft dark:border-kapture-ash dark:bg-kapture-coal md:p-8"
    >
      {/* Intent toggle */}
      <p className="label">What do you want?</p>
      <div className="grid gap-3 md:grid-cols-2">
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
              <p className="text-sm font-bold">{opt.label}</p>
              <p className={cn("mt-1 text-xs leading-relaxed", active ? "text-white/75 dark:text-kapture-black/75" : "text-kapture-smoke dark:text-kapture-fog")}>
                {opt.body}
              </p>
            </button>
          );
        })}
      </div>
      <input type="hidden" name="intent" value={intent} />

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Business name *" name="business" required defaultValue={defaults?.business} />
        <Field label="Your name *" name="name" required />
        <Field label="Work email *" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />

        <label>
          <span className="label">Industry</span>
          <select className="field" name="industry" defaultValue={defaults?.industry || INDUSTRIES[0]}>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </select>
        </label>

        <label>
          <span className="label">Launch timeline</span>
          <select className="field" name="timeline" defaultValue={defaults?.timeline || TIMELINES[0]}>
            {TIMELINES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>

        <label className="md:col-span-2">
          <span className="label">Budget signal</span>
          <select className="field" name="budget" defaultValue={BUDGETS[0]}>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="label">Anything else? (domains, integrations, deadlines)</span>
        <textarea
          name="message"
          rows={4}
          className="field"
          placeholder="e.g. point at this domain, integrate with HubSpot, replace the freight calculator with X"
        />
      </label>

      <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-kapture-mist">
          By submitting you agree to be contacted by Kapture Studio.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-yellow text-base font-bold disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : intent === "template" ? "See template pricing" : "Brief Kapture for a custom build"}
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
