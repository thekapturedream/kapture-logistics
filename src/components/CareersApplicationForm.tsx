"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Role, RoleField } from "@/lib/roles";

/**
 * Universal Kapture Logistics application form.
 *
 * The form is composed from a small set of universal sections plus
 * role-specific fields defined in roles.ts. Conditional behaviour is
 * driven by Role.family — see `profileFor()` below — so that a Class 1
 * driver, a software engineer, and a credit controller all see a form
 * tailored to their reality without separate components.
 *
 * Key conditionals:
 *   - CV requirement (drivers / warehouse = optional · everyone else = required)
 *   - Number of references (1 for drivers · 2 standard · 3 for leadership)
 *   - Address history depth (5 years for drivers/leadership/compliance · 3 otherwise)
 *   - DVLA consent block (drivers + transport manager only)
 *   - DBS consent block (every safety- or data-sensitive role)
 *   - Notice period default options
 *
 * Submits to /api/lead with type === "careers". The API route already
 * accepts an open passthrough for any role-specific extras.
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

const NOTICE_OPTIONS_OFFICE = [
  "Available immediately",
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months or more",
];

const NOTICE_OPTIONS_DRIVER = [
  "Available immediately",
  "Within 7 days",
  "1 week",
  "2 weeks",
  "1 month",
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

/* ──────────────────────────────────────────────────────────────────────
 * Conditional profile — drives which sections render and how strict they
 * are. Keeping this in one place means we never duplicate visibility
 * logic across the form body.
 * ─────────────────────────────────────────────────────────────────────*/

type Profile = {
  /** Whether the candidate must supply a CV link to submit. */
  cvRequired: boolean;
  /** Help text under the CV field. */
  cvHelp: string;
  /** How many references we ask for. */
  referenceCount: 1 | 2 | 3;
  /** Whether the 5-year address history block is shown and required. */
  showFullAddressHistory: boolean;
  /** Address history label — varies with depth. */
  addressHistoryLabel: string;
  /** Whether the DVLA driving licence consent is shown. */
  showDvlaConsent: boolean;
  /** Whether the DBS basic check consent is shown. */
  showDbsConsent: boolean;
  /** Notice period option list. */
  noticeOptions: string[];
  /** Whether the National Insurance number field is shown. */
  showNiField: boolean;
  /** Whether to show a one-line note explaining why we ask for what we ask. */
  trustLine: string;
};

function profileFor(role: Role | null): Profile {
  const family = role?.family ?? "support";

  switch (family) {
    case "driver":
      return {
        cvRequired: false,
        cvHelp:
          "CV is optional for driver roles — the work history above is enough. Add a Dropbox or Google Drive link if you have a CV.",
        referenceCount: 1,
        showFullAddressHistory: true,
        addressHistoryLabel: "Last 5 years of UK addresses *",
        showDvlaConsent: true,
        showDbsConsent: true,
        noticeOptions: NOTICE_OPTIONS_DRIVER,
        showNiField: true,
        trustLine:
          "We need a 5-year address history because the Traffic Commissioner requires it for driver vetting. We won't run any check until you accept our offer.",
      };

    case "warehouse":
      return {
        cvRequired: false,
        cvHelp:
          "CV is optional for warehouse roles. Work history above is enough. If you have a CV, paste a Dropbox or Google Drive link.",
        referenceCount: 2,
        showFullAddressHistory: false,
        addressHistoryLabel: "Current address *",
        showDvlaConsent: false,
        showDbsConsent: true,
        noticeOptions: NOTICE_OPTIONS_OFFICE,
        showNiField: false,
        trustLine:
          "We don't need bank or ID details at this stage — only enough to pre-screen you.",
      };

    case "compliance":
      return {
        cvRequired: true,
        cvHelp:
          "CV required. Include CPC certificate references and any FORS / earned-recognition outcomes you've owned.",
        referenceCount: 3,
        showFullAddressHistory: true,
        addressHistoryLabel: "Last 5 years of UK addresses *",
        showDvlaConsent: true,
        showDbsConsent: true,
        noticeOptions: NOTICE_OPTIONS_OFFICE,
        showNiField: true,
        trustLine:
          "Compliance roles require a 5-year address history under the Traffic Commissioner's good-repute test.",
      };

    case "leadership":
      return {
        cvRequired: true,
        cvHelp:
          "CV required. Please attach a link with your full leadership track record and P&L history.",
        referenceCount: 3,
        showFullAddressHistory: true,
        addressHistoryLabel: "Last 5 years of UK addresses *",
        showDvlaConsent: false,
        showDbsConsent: true,
        noticeOptions: NOTICE_OPTIONS_OFFICE,
        showNiField: false,
        trustLine:
          "Leadership roles run a 5-year address history and a basic DBS at offer stage.",
      };

    case "tech":
      return {
        cvRequired: true,
        cvHelp:
          "CV / GitHub / portfolio link required. We read code samples seriously.",
        referenceCount: 2,
        showFullAddressHistory: false,
        addressHistoryLabel: "Current address *",
        showDvlaConsent: false,
        showDbsConsent: true,
        noticeOptions: NOTICE_OPTIONS_OFFICE,
        showNiField: false,
        trustLine:
          "Platform roles get a basic DBS at offer stage because the platform handles customer freight data.",
      };

    case "commercial":
      return {
        cvRequired: true,
        cvHelp: "CV required — include closed-revenue history where possible.",
        referenceCount: 2,
        showFullAddressHistory: false,
        addressHistoryLabel: "Current address *",
        showDvlaConsent: false,
        showDbsConsent: false,
        noticeOptions: NOTICE_OPTIONS_OFFICE,
        showNiField: false,
        trustLine: "We won't contact your current employer until you ask us to.",
      };

    case "office":
    case "support":
    default:
      return {
        cvRequired: true,
        cvHelp: "CV required. Dropbox / Google Drive / OneDrive / LinkedIn link.",
        referenceCount: 2,
        showFullAddressHistory: false,
        addressHistoryLabel: "Current address *",
        showDvlaConsent: false,
        showDbsConsent: false,
        noticeOptions: NOTICE_OPTIONS_OFFICE,
        showNiField: false,
        trustLine:
          "We won't contact references or current employers until you give us the green light.",
      };
  }
}

/* ──────────────────────────────────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────────────────────────────────*/

export function CareersApplicationForm({ role }: Props) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const profile = profileFor(role);
  const isSpeculative = role === null;
  const roleSlug = role?.slug ?? "general";
  const roleTitle = role?.title ?? "Speculative application";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    // FormData.entries() collapses repeated keys (multiselect checkboxes
    // share a name) — gather them as arrays first, then join.
    const fd = new FormData(e.currentTarget);
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
          // Stamp role title onto subject + department onto topic for triage
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

  // Build sections in order — auto-number them so we never have a 04 → 06
  // gap when a section is conditionally hidden.
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  const hasExtraFields = role !== null && role.extraFields.length > 0;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border bg-white p-6 shadow-kapture-soft dark:border-kapture-ash dark:bg-kapture-coal md:p-10"
    >
      {/* ─── Trust strip ───────────────────────────────────────────── */}
      <div className="rounded-2xl border border-kapture-yellow/30 bg-kapture-yellow/10 p-4 dark:bg-kapture-yellow/5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-kapture-amber">
          Why we ask
        </p>
        <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
          {profile.trustLine}
        </p>
      </div>

      {/* ─── 01 — About you ────────────────────────────────────────── */}
      <SectionHeader n={next()} title="About you" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="First name *" name="first_name" autoComplete="given-name" required />
        <Field label="Last name *" name="last_name" autoComplete="family-name" required />
        <Field label="Email address *" name="email" type="email" autoComplete="email" required />
        <Field label="Mobile number *" name="phone" type="tel" autoComplete="tel" required />
        <Field label="Town / City of residence *" name="city" required placeholder="e.g. Daventry" />
        <Field label="Postcode *" name="postcode" autoComplete="postal-code" required placeholder="NN11 4NB" />
      </div>

      {/* ─── 02 — Right to work ───────────────────────────────────── */}
      <SectionHeader n={next()} title="Right to work" />
      <div className="grid gap-5 md:grid-cols-2">
        <Select
          label="Right to work in the UK *"
          name="rtw_status"
          required
          options={RTW_OPTIONS}
        />
        <Field
          label="Date of birth *"
          name="date_of_birth"
          type="date"
          required
          help="Confirms minimum age and right-to-work eligibility."
        />
        {profile.showNiField && (
          <Field
            label="National Insurance number"
            name="ni_number"
            placeholder="QQ 12 34 56 C"
            help="Optional now — only required at offer stage."
          />
        )}
        <Select
          label="Notice period *"
          name="notice_period"
          required
          options={profile.noticeOptions}
        />
      </div>

      {/* ─── 03 — Address history ─────────────────────────────────── */}
      {profile.showFullAddressHistory ? (
        <>
          <SectionHeader
            n={next()}
            title="Address history"
            subtitle="UK driving and compliance roles require a continuous 5-year address history. List all addresses with dates."
          />
          <Textarea
            label={profile.addressHistoryLabel}
            name="address_history"
            rows={5}
            required
            placeholder={
              "12 High Street, Daventry, NN11 4NB — Mar 2023 to present\n45 Main Road, Northampton, NN1 5FF — Jun 2020 to Mar 2023\n..."
            }
          />
        </>
      ) : (
        <>
          <SectionHeader n={next()} title="Current address" />
          <Textarea
            label={profile.addressHistoryLabel}
            name="address_history"
            rows={3}
            required
            placeholder="Street, town, postcode."
          />
        </>
      )}

      {/* ─── 04 — Work history ────────────────────────────────────── */}
      <SectionHeader
        n={next()}
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
            placeholder={
              role?.family === "driver"
                ? "e.g. Class 1 Driver"
                : role?.family === "warehouse"
                ? "e.g. Warehouse Operative"
                : "Your current job title"
            }
          />
          <Field
            label="Dates (from – to) *"
            name="current_dates"
            required
            placeholder="Mar 2023 – present"
          />
        </div>
        <Textarea
          label={
            profile.showFullAddressHistory
              ? "Previous employers (last 5 years) *"
              : "Previous employers (last 3 years) *"
          }
          name="previous_employers"
          rows={5}
          required
          placeholder={
            "Company — Job title — Dates — Reason for leaving\nDPD UK — Class 1 Driver — Jun 2020 to Feb 2023 — Better shift pattern\n..."
          }
        />
        <Textarea
          label="Any gaps in employment over that period"
          name="employment_gaps"
          rows={3}
          placeholder="If yes, please give dates and the reason — or write 'None'."
        />
      </div>

      {/* ─── 05 — Role-specific fields ────────────────────────────── */}
      {hasExtraFields && (
        <>
          <SectionHeader
            n={next()}
            title={`About the ${role!.title.split(" — ")[0].split(" (")[0]} role`}
            subtitle="A few questions specific to this role. The more accurate the answer, the faster we can match you."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {role!.extraFields.map((f) => (
              <DynamicField key={f.name} field={f} />
            ))}
          </div>
        </>
      )}

      {/* ─── 06 — References ──────────────────────────────────────── */}
      <SectionHeader
        n={next()}
        title="References"
        subtitle={
          profile.referenceCount === 1
            ? "One professional reference covering your most recent driving role. We won't contact them without your consent."
            : profile.referenceCount === 3
            ? "Three professional references covering the last 5 years. We won't contact them without your consent."
            : "Two professional references covering the last 3 years. We won't contact them without your consent."
        }
      />
      <div className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: profile.referenceCount }, (_, i) => i + 1).map(
          (refN) => (
            <React.Fragment key={refN}>
              <Field label={`Reference ${refN} — Name *`} name={`ref${refN}_name`} required />
              <Field label={`Reference ${refN} — Company *`} name={`ref${refN}_company`} required />
              <Field label={`Reference ${refN} — Job title *`} name={`ref${refN}_title`} required />
              <Field label={`Reference ${refN} — Email *`} name={`ref${refN}_email`} type="email" required />
            </React.Fragment>
          ),
        )}
      </div>

      {/* ─── 07 — CV + final ──────────────────────────────────────── */}
      <SectionHeader n={next()} title="CV & final details" />
      <div className="grid gap-5">
        <Field
          label={profile.cvRequired ? "Link to your CV *" : "Link to your CV"}
          name="cv_link"
          required={profile.cvRequired}
          placeholder="Dropbox / Google Drive / OneDrive / LinkedIn URL"
          help={profile.cvHelp}
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

        {/* Declarations — conditionally include DVLA + DBS lines. */}
        <fieldset className="mt-2 rounded-2xl border border-kapture-fog/60 bg-kapture-paper/40 p-5 dark:border-kapture-ash dark:bg-kapture-ink/50">
          <legend className="px-2 font-mono text-xs uppercase tracking-wider text-kapture-mist">
            Declarations
          </legend>
          <Checkbox
            name="declare_truthful"
            required
            label="I confirm the information given is true and complete to the best of my knowledge. I understand any false statement may disqualify my application or lead to dismissal if employed."
          />
          {profile.showDvlaConsent && (
            <Checkbox
              name="declare_dvla_check"
              label="I consent to Kapture Logistics carrying out a DVLA driving licence check at offer stage."
            />
          )}
          {profile.showDbsConsent && (
            <Checkbox
              name="declare_dbs"
              label="I consent to Kapture Logistics carrying out a basic DBS check at offer stage where the role requires it."
            />
          )}
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
 * Field primitives
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
    <div className="mt-10 mb-6">
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
 * Renders a role-specific field defined in roles.ts. Multiselect is a
 * checkbox grid (cleanest UX for 4–10 options); textarea spans both
 * columns. Other types map to the standard primitives above.
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
        <legend className="label">
          {label}
          {required ? " *" : ""}
        </legend>
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

  // text / email / tel / number / date
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
