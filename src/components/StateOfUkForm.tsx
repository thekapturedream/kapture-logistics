"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, Download } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const ROLES = [
  "Founder / MD / CEO",
  "Marketing lead",
  "Operations lead",
  "Sales lead",
  "Investor / analyst",
  "Press / media",
  "Other",
];

export function StateOfUkForm() {
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
          type: "newsletter",
          source: "state-of-uk-logistics-2026",
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
          The report is on its way.
        </h3>
        <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
          Check your inbox in the next few minutes — the State of UK Logistics
          Websites 2026 download link will land there. We'll also drop you a
          quarterly note with the rolling Q1, Q2, Q3, Q4 updates.
        </p>
        <p className="mt-4 text-xs uppercase tracking-wider text-kapture-mist">
          If it doesn't arrive in 5 minutes, check spam or email studio@thekapture.com
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
      <p className="label">Where to send the report</p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name *" name="name" required />
        <Field label="Work email *" name="email" type="email" required />
        <Field label="Company *" name="company" required />
        <label>
          <span className="label">Your role</span>
          <select className="field" name="topic" defaultValue={ROLES[0]}>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-kapture-mist">
          We'll email the report + a short quarterly digest. Unsubscribe anytime.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-yellow text-base font-bold disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send me the report"}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="label">{label}</span>
      <input className="field" type={type} name={name} required={required} />
    </label>
  );
}

export { Download };
