"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Role, RoleField } from "@/lib/roles";

/**
 * Universal Kapture Logistics application form.
 *
 * Accepts a `role` prop. If null, treats the submission as a speculative
 * application. Renders the universal candidate fields (personal details,
 * right-to-work, work history, references, declarations) plus the
 * role-specific fields defined in roles.ts.
 *
 * Submits to /api/lead with type === "careers".
 */

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  role: Role | null;
};

const RTW_OPTIONS = [
  "British / Irish citizen",
  "Indefinite Leave to Remain (Settled status)",
  "Pre-Settled status (EU)",
  "Skilled Worker visa — current sponsor",
  "Skilled Worker visa — needs sponsorship from Kapture",
  "Other visa with right to work",
  "Visa application in progress",
  "No current right to work in the UK",
];

const NOTICE_OPTIONS = [
  "Available immediately",
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months or more",
];

const FOUND_VIA_OPTIONS = [
  "Indeed",
  "LinkedIn",
  "Total Jobs",
  "CV Library",
  "Reed",
  "Glassdoor",
  "Referral from a current Kapture employee",
  "Direct from kapture.com",
  "Recruitment agency",
  "Social media",
  "Other",
];

export function CareersApplicationForm({ role }: Props) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const isSpeculative = role === null;
  const roleSlug = role?.slug ?? "general";
  const roleTitle = role?.title ?? "Speculative application";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    // FormData.entries() collapses repeated keys (multiselect checkboxes
    // share a name) — we need to gather them as an array first.
    const raw: Record<string, string[]> = {};
    fd.forEach((value, key) => {
      const v = typeof value === "string" ? value : "";
      (raw[key] ||= []).push(v);
    });
    const payload: Record<string, string> = {};
    for (const [k, arr] of Object.entries(raw)) {
      payload[k] = arr.length === 1 ? arr[0] : arr.filter(Boolean).join(", ");
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          type: "careers",
          source: `careers/${roleSlug}`,
          // Stamp the role title onto the email subject for fast triage
          service: roleTitle,
          topic: role?.department ?? "Speculative",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Could not submit. Please try again.");
      }
      setStatus("success");
      formRef.current?.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        className="rounded-2xl border border-kapture-yellow bg-kapture-yellow/10 p-7 md:p-10"
      >
        <CheckCircle2 className="text-kapture-amber" size={32} />
        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Application received.
        </h3>
        <p className="mt-3 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
          {isSpeculative
            ? "Thanks for sending us your details. If we have a role that matches your background in the next 90 days, you'll hear from us directly."
            : `Thanks for applying for the ${roleTitle} role. Our People team will review your application and come back to you within 5 working days. Keep an eye on the email you submitted.`}
        </p>
        <p className="mt-5 font-mono text-xs uppercase tracking-wider text-kapture-mist">
          Confirmation reference will arrive in your inbox shortly.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
          <Link href="/careers" className="btn-secondary">
            Back to all roles
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border bg-white p-6 shadow-kapture-soft dark:border-kapture-ash dark:bg-kapture-coal md:p-10"
    >
      {/* ─── Section 1 — Personal details ─────────────────────────── */}
      <SectionHeader n="01" title="About you" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="First name *" name="first_name" autoComplete="given-name" required />
        <Field label="Last name *" name="last_name" autoComplete="family-name" required />
        <Field label="Email address *" name="email" type="email" autoComplete="email" required />
        <Field label="Mobile number *" name="phone" type="tel" autoComplete="tel" required />
        <Field label="Town / City of residence *" name="city" required placeholder="e.g. Daventry" />
        <Field label="Postcode *" name="postcode" autoComplete="postal-code" required placeholder="NN11 4NB" />
      </div>

      {/* ─── Section 2 — Right to work ────────────────────────────── */}
      <SectionHeader n="02" title="Right to work" />
      <div className="grid gap-5 md:grid-cols-2">
        <Select
          label="Right to work in the UK *"
          name="rtw_status"
          required
          options={RTW_OPTIONS}
        />
        <Field
          label="National Insurance number"
          name="ni_number"
          placeholder="QQ 12 34 56 C"
          help="Optional — only required at offer stage."
        />
        <Field
          label="Date of birth *"
          name="date_of_birth"
          type="date"
          required
          help="To confirm right to work and minimum age requirements."
        />
        <Select
          label="Notice period *"
          name="notice_period"
          required
          options={NOTICE_OPTIONS}
        />
      </div>

      {/* ─── Section 3 — Address history ──────────────────────────── */}
      <SectionHeader
        n="03"
        title="Address history"
        subtitle="UK logistics roles require a continuous 5-year address history. List all addresses including dates."
      />
      <Textarea
        label="Last 5 years of addresses *"
        name="address_history"
        rows={5}
        required
        placeholder={
          "12 High Street, Daventry, NN11 4NB — Mar 2023 to present\n45 Main Road, Northampton, NN1 5FF — Jun 2020 to Mar 2023\n..."
        }
      />

      {/* ─── Section 4 — Work history ─────────────────────────────── */}
      <SectionHeader
        n="04"
        title="Work history"
        subtitle="Most recent first. Include any gaps and the reason."
      />
      <div className="grid gap-5">
        <Field
          label="Current or most recent employer *"
          name="current_employer"
          required
          placeholder="Company name"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Job title *"
            name="current_title"
            required
            placeholder="e.g. Class 1 Driver"
          />
          <Field
            label="Dates (from – to) *"
            name="current_dates"
            required
            placeholder="Mar 2023 – present"
          />
        </div>
        <Textarea
          label="Previous employers (last 5 years) *"
          name="previous_employers"
          rows={5}
          required
          placeholder={
            "Company — Job title — Dates — Reason for leaving\nDPD UK — Class 1 Driver — Jun 2020 to Feb 2023 — Better shift pattern\n..."
          }
        />
        <Textarea
          label="Any gaps in employment in the last 5 years"
          name="employment_gaps"
          rows={3}
          placeholder="If yes, please give dates and the reason — or write 'None'."
        />
      </div>

      {/* ─── Section 5 — Role-specific fields ─────────────────────── */}
      {role && role.extraFields.length > 0 && (
        <>
          <SectionHeader
            n="05"
            title={`About the ${role.title.split(" — ")[0]} role`}
            subtitle="A few questions specific to this role. The more accurate the answer, the faster we can match you."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {role.extraFields.map((f) => (
              <DynamicField key={f.name} field={f} />
            ))}
          </div>
        </>
      )}

      {/* ─── Section 6 — References ──────────────────────────────── */}
      <SectionHeader
        n={role && role.extraFields.length > 0 ? "06" : "05"}
        title="References"
        subtitle="Two professional references covering the last 3 years. We won't contact them without your consent."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Reference 1 — Name *" name="ref1_name" required />
        <Field label="Reference 1 — Company *" name="ref1_company" required />
        <Field label="Reference 1 — Job title *" name="ref1_title" required />
        <Field label="Reference 1 — Email *" name="ref1_email" type="email" required />
        <Field label="Reference 2 — Name *" name="ref2_name" required />
        <Field label="Reference 2 — Company *" name="ref2_company" required />
        <Field label="Reference 2 — Job title *" name="ref2_title" required />
        <Field label="Reference 2 — Email *" name="ref2_email" type="email" required />
      </div>

      {/* ─── Section 7 — CV + final ──────────────────────────────── */}
      <SectionHeader
        n={role && role.extraFields.length > 0 ? "07" : "06"}
        title="CV & final details"
      />
      <div className="grid gap-5">
        <Field
          label="Link to your CV *"
          name="cv_link"
          required
          placeholder="Dropbox / Google Drive / OneDrive / LinkedIn URL"
          help="Set sharing to anyone-with-the-link can view. We'll request the file directly if email is preferable."
        />
        <Select
          label="How did you hear about us?"
          name="found_via"
          options={FOUND_VIA_OPTIONS}
        />
        <Field
          label="If referred by a current Kapture employee, who?"
          name="referrer_name"
          placeholder="Their full name"
        />
        <Textarea
          label="Anything else we should know? (optional)"
          name="message"
          rows={4}
          placeholder="Anything that doesn't fit above — accessibility needs, availability constraints, things you're proud of."
        />

        {/* Declarations */}
        <fieldset className="mt-2 rounded-2xl border border-kapture-fog/60 bg-kapture-paper/40 p-5 dark:border-kapture-ash dark:bg-kapture-ink/50">
          <legend className="px-2 font-mono text-xs uppercase tracking-wider text-kapture-mist">
            Declarations
          </legend>
          <Checkbox
            name="declare_truthful"
            required
            label="I confirm the information given is true and complete to the best of my knowledge. I understand any false statement may disqualify my application or lead to dismissal if employed."
          />
          <Checkbox
            name="declare_dvla_check"
            label="I consent to Kapture Logistics carrying out a DVLA driving licence check (drivers only)."
          />
          <Checkbox
            name="declare_dbs"
            label="I consent to Kapture Logistics carrying out a basic DBS check where the role requires it."
          />
          <Checkbox
            name="declare_data"
            required
            label="I have read the Kapture privacy notice and consent to my data being used for recruitment purposes."
          />
        </fieldset>
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-kapture-mist">
          By submitting, you agree to be contacted by Kapture Logistics about
          this and similar roles. See our{" "}
          <Link href="/privacy" className="underline hover:text-kapture-black dark:hover:text-kapture-white">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary whitespace-nowrap text-base font-bold disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit application"}
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

/* ──────────────────────────────────────────────────────────────────────
 * Field primitives — kept in this file so the form stays self-contained
 * ─────────────────────────────────────────────────────────────────────*/

function SectionHeader({
  n,
  title,
  subtitle,
}: {
  n: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mt-10 mb-6 first:mt-0">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-kapture-yellow">{n}</span>
        <h3 className="font-display text-xl font-bold tracking-tight text-kapture-black dark:text-kapture-white md:text-2xl">
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog">
          {subtitle}
        </p>
      )}
    </div>
  );
}

type FieldBase = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  help?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  help,
  autoComplete,
}: FieldBase & { type?: string; autoComplete?: string }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        className="field"
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {help && <span className="mt-1.5 block text-xs text-kapture-mist">{help}</span>}
    </label>
  );
}

function Textarea({
  label,
  name,
  rows = 4,
  required,
  placeholder,
  help,
}: FieldBase & { rows?: number }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <textarea
        className="field"
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
      />
      {help && <span className="mt-1.5 block text-xs text-kapture-mist">{help}</span>}
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
  help,
}: FieldBase & { options: string[] }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <select
        className="field"
        name={name}
        required={required}
        defaultValue=""
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {help && <span className="mt-1.5 block text-xs text-kapture-mist">{help}</span>}
    </label>
  );
}

function Checkbox({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-kapture-smoke first:mt-0 dark:text-kapture-fog">
      <input
        type="checkbox"
        name={name}
        required={required}
        value="yes"
        className="mt-1 h-4 w-4 rounded border-kapture-mist text-kapture-yellow focus:ring-kapture-yellow"
      />
      <span>{label}</span>
    </label>
  );
}

/**
 * Renders a role-specific field driven by RoleField metadata in roles.ts.
 * Multiselect renders as a checkbox grid (cleanest UX for 4–10 options).
 */
function DynamicField({ field }: { field: RoleField }) {
  const { name, label, type, required, placeholder, help, options } = field;

  if (type === "select" && options) {
    return (
      <Select
        label={label + (required ? " *" : "")}
        name={name}
        options={options}
        required={required}
        help={help}
      />
    );
  }

  if (type === "multiselect" && options) {
    return (
      <fieldset className="md:col-span-2">
        <legend className="label">{label}{required ? " *" : ""}</legend>
        <div className="mt-2 grid gap-2 rounded-2xl border bg-white p-4 dark:border-kapture-ash dark:bg-kapture-coal sm:grid-cols-2">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-start gap-2 text-sm text-kapture-smoke dark:text-kapture-fog"
            >
              <input
                type="checkbox"
                name={name}
                value={opt}
                className="mt-1 h-4 w-4 rounded border-kapture-mist text-kapture-yellow focus:ring-kapture-yellow"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {help && <p className="mt-2 text-xs text-kapture-mist">{help}</p>}
      </fieldset>
    );
  }

  if (type === "textarea") {
    return (
      <div className="md:col-span-2">
        <Textarea
          label={label + (required ? " *" : "")}
          name={name}
          required={required}
          placeholder={placeholder}
          help={help}
          rows={4}
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return <Checkbox name={name} label={label} required={required} />;
  }

  // Default — text / email / tel / number / date
  return (
    <Field
      label={label + (required ? " *" : "")}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      help={help}
    />
  );
}
