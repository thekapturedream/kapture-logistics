"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const SECTORS = [
  "Freight forwarding",
  "Road haulage / HGV",
  "3PL / contract logistics",
  "Warehousing",
  "Last-mile / courier",
  "Customs & trade",
  "Cold chain / pharma",
  "Project cargo",
  "Air freight",
  "Ocean freight",
  "Other",
];

const URGENCY = [
  "ASAP — within 7 days",
  "This month",
  "Next quarter",
  "Just exploring",
];

export function RequestAuditForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
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
        body: JSON.stringify({
          ...payload,
          type: "quote",
          source: "request-audit",
        }),
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
        className="rounded-2xl border border-kapture-yellow bg-kapture-yellow/10 p-7 md:p-8"
      >
        <CheckCircle2 className="text-kapture-amber" size={28} />
        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
          Audit request received.
        </h3>
        <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
          A Kapture analyst will run your full nine-dimension audit and email
          your public dashboard URL within 48 hours. We'll also send a
          15-minute call link if you want to walk through the findings live.
        </p>
        <p className="mt-4 text-xs uppercase tracking-wider text-kapture-mist">
          Confirmation email on its way to your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border bg-white p-6 shadow-kapture-soft dark:border-kapture-ash dark:bg-kapture-coal md:p-8"
    >
      <p className="label">1. Your business</p>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company name *" name="company" required />
        <Field label="Website *" name="domain" placeholder="yourbusiness.co.uk" required />
        <label>
          <span className="label">Sector *</span>
          <select className="field" name="industry" defaultValue={SECTORS[0]} required>
            {SECTORS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <Field label="Headquarters city" name="origin" placeholder="London, Manchester, Felixstowe…" />
      </div>

      <p className="label mt-8">2. About you</p>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name *" name="name" required />
        <Field label="Work email *" name="email" type="email" required />
        <Field label="Role" name="service" placeholder="Founder, MD, Marketing lead…" />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <p className="label mt-8">3. The brief</p>
      <div className="grid gap-5">
        <label>
          <span className="label">When do you need this?</span>
          <select className="field" name="timeline" defaultValue={URGENCY[1]}>
            {URGENCY.map((u) => <option key={u}>{u}</option>)}
          </select>
        </label>
        <label>
          <span className="label">Three competitors we should benchmark you against</span>
          <input className="field" type="text" name="topic" placeholder="brand-a.com, brand-b.com, brand-c.com" />
        </label>
        <label>
          <span className="label">What are you trying to find out? (optional)</span>
          <textarea
            name="message"
            rows={4}
            className="field"
            placeholder="e.g. why our tender win-rate is dropping, why mobile bounces are high, where we sit on AI search…"
          />
        </label>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-kapture-mist">
          Free audit. By submitting you agree to be contacted by Kapture Studio.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-yellow whitespace-nowrap text-base font-bold disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit request"}
          <ArrowRight size={16} />
        </button>
      </div>

      {status === "error" && errorMsg && (
        <div className="mt-4 flex items-start gap-2 rounded-kapture border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <AlertTriangle size={16} className="mt-0.5" /> {errorMsg}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="label">{label}</span>
      <input className="field" type={type} name={name} required={required} placeholder={placeholder} />
    </label>
  );
}
