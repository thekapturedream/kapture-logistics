"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, CalendarClock } from "lucide-react";
import { CalendlyEmbed } from "./CalendlyEmbed";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  defaults?: {
    mode?: string;
    origin?: string;
    destination?: string;
    cargo?: string;
    service?: string;
  };
};

export function QuoteForm({ defaults }: Props) {
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
        body: JSON.stringify({ ...payload, type: "quote", source: "quote-page" }),
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

  // SUCCESS STATE — every freight quote submission converts into a booked
  // discovery call with the Kapture team.
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
            Quote request received.
          </h3>
          <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
            A Kapture logistics specialist is on it. To fast-track pricing and lane options, lock
            a 15-minute discovery call below — we'll walk through your shipment on the call and
            send a costed plan inside the same hour.
          </p>
        </div>

        <div className="flex items-center gap-3 px-1">
          <CalendarClock size={18} className="text-kapture-yellow" />
          <p className="text-sm font-semibold uppercase tracking-wider text-kapture-mist">
            Pick a slot · Free · 15 minutes
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
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Pickup location" name="origin" required defaultValue={defaults?.origin} />
        <Field label="Drop-off location" name="destination" required defaultValue={defaults?.destination} />

        <label>
          <span className="label">Mode</span>
          <select className="field" name="mode" defaultValue={defaults?.mode || "road"}>
            <option value="road">Road</option>
            <option value="air">Air</option>
            <option value="sea">Sea</option>
            <option value="express">Express</option>
            <option value="multi">Multi-modal</option>
          </select>
        </label>

        <label>
          <span className="label">Cargo type</span>
          <select className="field" name="cargo_type" defaultValue={defaults?.cargo || "Pallet"}>
            <option>Pallet</option>
            <option>Container (20ft)</option>
            <option>Container (40ft)</option>
            <option>Bulk</option>
            <option>Refrigerated</option>
            <option>Oversize</option>
            <option>Documents</option>
          </select>
        </label>

        <Field label="Estimated weight (kg)" name="weight_kg" type="number" placeholder="e.g. 1200" />
        <Field label="Pickup date" name="pickup_date" type="date" />
      </div>

      <label className="mt-5 block">
        <span className="label">Tell us more (optional)</span>
        <textarea
          name="message"
          rows={4}
          className="field"
          placeholder="Special handling, deadlines, customs notes, anything else useful."
        />
      </label>

      {defaults?.service && (
        <input type="hidden" name="service" value={defaults.service} />
      )}

      <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-kapture-mist">
          By submitting you agree to be contacted by Kapture. We never share your data.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Get my prices"}
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
      <span className="label">
        {label}
        {required && <span className="ml-1 text-kapture-yellow">*</span>}
      </span>
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
