import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin, Clock, Banknote, Mail, Filter, FileCheck, Layers } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ImageStrip } from "@/components/ImageStrip";
import { CTA } from "@/components/CTA";
import { ROLES, DEPARTMENT_ORDER, rolesByDepartment, type Role } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Careers — Recruit your team effortlessly",
  description:
    "Custom UK logistics application forms — driver, warehouse, transport office, commercial, leadership and compliance. Conditional logic baked in. Submissions wired to your inbox.",
};

/**
 * Feature pitch — what the careers funnel does for the operator deploying
 * the Kapture Logistics template, not what the template-as-employer offers.
 * This page sits one step closer to the template-buyer than the rest of
 * the site, alongside /quote.
 */
const FEATURES = [
  {
    icon: Filter,
    title: "Conditional by role family.",
    body: "Drivers see DVLA, CPC and tacho questions. Warehouse sees FLT and shift preference. Office sees TMS and references. The form rewrites itself.",
  },
  {
    icon: Mail,
    title: "Wired to your inbox.",
    body: "Every application lands in your Resend or SMTP inbox tagged [Careers] with the candidate, role, and full structured payload. No dashboards to log into.",
  },
  {
    icon: FileCheck,
    title: "UK-compliant by default.",
    body: "Right-to-work, 5-year address history for drivers and compliance, DVLA + DBS consents, declarations — modelled on the standard UK 3PL onboarding pack.",
  },
  {
    icon: Layers,
    title: "17 roles ready to deploy.",
    body: "From HGV Class 1 to Transport Manager CPC to Platform Engineer. Edit one file, all forms inherit the change. Add new roles in minutes.",
  },
];

export default function CareersPage() {
  const grouped = rolesByDepartment();
  const totalRoles = ROLES.length;

  return (
    <>
      <PageHeader
        eyebrow={`Careers system · ${totalRoles} role templates ready`}
        title="Recruit your team effortlessly."
        lede="Custom application forms for every UK logistics role — driver, warehouse, transport office, commercial, compliance and leadership. Conditional logic built in. Submissions wired to your inbox. Click any role to preview the form your candidates will see."
      >
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          <Link href="#open-roles" className="btn-primary text-[18px]">
            Browse role templates
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/careers/apply/general" className="btn-secondary text-[18px]">
            See the universal form
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </PageHeader>

      <ImageStrip
        src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=80"
        alt="Kapture Logistics fleet on the move"
        eyebrow="Built for the UK 3PL standard"
        caption="Right-to-work, DVLA, DBS, CPC, FORS — all the UK paperwork, baked in."
        height="short"
      />

      {/* ─── What's inside ─────────────────────────────────────────────── */}
      <section className="container-kapture py-24">
        <p className="chip">
          <span className="divider-dot" />
          What's inside
        </p>
        <h2 className="h-section mt-4 max-w-2xl text-balance">
          Four pieces that make the difference between a careers page and a hiring engine.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border bg-white p-7 dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <div className="rounded-full inline-flex bg-kapture-paper p-3 text-kapture-black dark:bg-kapture-ink dark:text-kapture-white">
                  <Icon size={18} />
                </div>
                <p className="mt-5 font-mono text-xs text-kapture-mist">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Open roles by department ───────────────────────────────────── */}
      <section id="open-roles" className="bg-kapture-paper dark:bg-kapture-ink">
        <div className="container-kapture py-24 md:py-32">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="chip">
                <span className="divider-dot" />
                Role templates
              </p>
              <h2 className="h-section mt-4 max-w-2xl text-balance">
                {ROLES.length} roles, six departments, every UK 3PL chair.
              </h2>
            </div>
            <p className="max-w-md text-sm text-kapture-smoke dark:text-kapture-fog">
              Click any role to see the application form your candidates will
              fill in. Submissions land in your inbox tagged by department —
              ready to triage in 30 seconds.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {DEPARTMENT_ORDER.map((dept) => {
              const roles = grouped[dept];
              if (!roles || roles.length === 0) return null;
              return (
                <div key={dept}>
                  <div className="flex items-baseline justify-between border-b border-kapture-fog/60 pb-4 dark:border-kapture-ash">
                    <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                      {dept}
                    </h3>
                    <span className="font-mono text-xs text-kapture-mist">
                      {String(roles.length).padStart(2, "0")} {roles.length === 1 ? "role" : "roles"}
                    </span>
                  </div>
                  <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                      <RoleCard key={role.slug} role={role} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Speculative apply ──────────────────────────────────────────── */}
      <section className="container-kapture py-24">
        <div className="rounded-3xl border bg-white p-8 dark:border-kapture-ash dark:bg-kapture-coal md:p-12">
          <p className="chip">
            <span className="divider-dot" />
            Need a role we haven't built?
          </p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            One universal form, ready for any logistics role.
          </h2>
          <p className="lede mt-4 max-w-xl">
            The speculative form runs the universal sections only — about-you,
            right-to-work, work history, references, CV. Use it as the catch-all
            for roles your team hasn't templatised yet.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-4">
            <Link href="/careers/apply/general" className="btn-primary text-[18px]">
              Preview universal form
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact?topic=careers" className="btn-secondary text-[18px]">
              Talk to Kapture
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* Role card — used inside each department block                          */
/* ────────────────────────────────────────────────────────────────────── */

function RoleCard({ role }: { role: Role }) {
  const statusTone =
    role.status === "Hiring now"
      ? "bg-kapture-yellow text-kapture-black"
      : role.status === "Always open"
      ? "bg-kapture-paper text-kapture-smoke dark:bg-kapture-ink dark:text-kapture-fog"
      : "bg-kapture-fog/40 text-kapture-mist";

  return (
    <Link
      href={`/careers/${role.slug}`}
      className="group flex h-full flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-kapture-black hover:shadow-kapture-soft dark:border-kapture-ash dark:bg-kapture-coal dark:hover:border-kapture-white"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-full inline-flex bg-kapture-paper p-2.5 text-kapture-black dark:bg-kapture-ink dark:text-kapture-white">
          <Briefcase size={16} />
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusTone}`}
        >
          {role.status}
        </span>
      </div>

      <h4 className="mt-5 font-display text-lg font-bold tracking-tight text-balance">
        {role.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
        {role.summary}
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-2 text-xs text-kapture-smoke dark:text-kapture-fog">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-kapture-mist" />
          <span className="truncate">{role.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-kapture-mist" />
          <span className="truncate">{role.shift}</span>
        </div>
        <div className="flex items-center gap-2">
          <Banknote size={12} className="text-kapture-mist" />
          <span className="truncate">{role.salary}</span>
        </div>
      </dl>

      <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-kapture-black transition-colors group-hover:text-kapture-amber dark:text-kapture-white">
        View role
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
