"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertTriangle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const TOPICS = [
  { value: "general", label: "General enquiry" },
  { value: "managed", label: "Managed Transportation" },
  { value: "multimodal", label: "Multi-modal capacity" },
  { value: "lastmile", label: "Last-mile delivery" },
  { value: "supply-chain", label: "Supply Chain" },
  { value: "customs", label: "Customs & Trade" },
  { value: "platform", label: "Platform / API" },
  { value: "carrier", label: "Become a carrier" },
  { value: "partner", label: "Partnerships" },
  { value: "press", label: "Press" },
  { value: "careers", label: "Careers" },
  { value: "tracking", label: "Track a shipment" },
];

export function ContactForm({ topic = "general" }: { topic?: string }) {
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
        body: JSON.stringify({ ...payload, type: "contact", source: "contact-page" }),
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
        <h3 className="mt-4 font-display text-2xl font-bold">Message received.</h3>
        <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog">
          A Kapture team member will reach out shortly. For urgent shipments use the
          quote desk for fastest routing.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-6">
          Send another
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
      <div className="grid gap-5 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="label">What's this about?</span>
          <select className="field" name="topic" defaultValue={topic}>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="label">Full name *</span>
          <input className="field" type="text" name="name" required />
        </label>
        <label>
          <span className="label">Work email *</span>
          <input className="field" type="email" name="email" required />
        </label>
        <label>
          <span className="label">Company</span>
          <input className="field" type="text" name="company" />
        </label>
        <label>
          <span className="label">Phone</span>
          <input className="field" type="tel" name="phone" />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="label">Message *</span>
        <textarea
          className="field"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you're moving, what's broken, or what you want built."
        />
      </label>

      <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-kapture-mist">
          By submitting you agree to be contacted by Kapture.
        </p>
        <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
          {status === "submitting" ? "Sending…" : "Send message"}
          <Send size={14} />
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
