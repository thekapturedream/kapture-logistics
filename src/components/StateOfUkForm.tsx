"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Download } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The report PDF lives in /public so it's served straight from the site
 * root. Update this constant if the filename ever changes — the API
 * route's email-attachment lookup also reads from the same path.
 */
const REPORT_URL = "/state-of-uk-logistics-2026.pdf";
const REPORT_FILENAME = "Kapture-State-of-UK-Logistics-2026.pdf";

/**
 * Trigger an immediate browser download by synthesising an <a download>
 * click. Modern browsers honour this when called inside a user-initiated
 * event handler (which onSubmit is), so no popup blocker fires. Same-
 * origin assets are downloaded; cross-origin links would just navigate.
 */
function triggerPdfDownload() {
  if (typeof document === "undefined") return;
  const a = document.createElement("a");
  a.href = REPORT_URL;
  a.download = REPORT_FILENAME;
  a.rel = "noopener";
  // Keep the element off-screen and unfocusable so it never flickers.
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

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

      // Fire the download alongside the API success — keeps the existing
      // email + Resend + HubSpot fan-out path running while giving the
      // visitor an immediate file in their browser.
      triggerPdfDownload();

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
          Your download has started.
        </h3>
        <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
          The State of UK Logistics Websites 2026 PDF is downloading to your
          device now. We've also emailed you a copy and added you to the
          quarterly digest covering the rolling Q1, Q2, Q3, Q4 updates.
        </p>
        {/* Manual fallback — Safari and a small set of mobile browsers
            occasionally suppress the programmatic .click() download. The
            visible button + native href guarantees the user can always
            retrieve the file with one tap. */}
        <a
          href={REPORT_URL}
          download={REPORT_FILENAME}
          className="btn-yellow mt-6 whitespace-nowrap text-sm font-bold"
        >
          <Download size={16} />
          Download again
        </a>
        <p className="mt-4 text-xs uppercase tracking-wider text-kapture-mist">
          If the email doesn't arrive in 5 minutes, check spam or email studio@thekapture.com
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
          PDF downloads on submit. We'll also email you the report + the quarterly digest. Unsubscribe anytime.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-yellow whitespace-nowrap text-base font-bold disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Download report"}
          <Download size={16} />
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

