import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin, Clock, Banknote, Heart, Shield, Wrench, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ImageStrip } from "@/components/ImageStrip";
import { CTA } from "@/components/CTA";
import { ROLES, DEPARTMENT_ORDER, rolesByDepartment, type Role } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Careers — Drive, plan, build the Kapture operating layer",
  description:
    "HGV drivers, warehouse operatives, transport planners, account managers, engineers and leadership — open roles across the Kapture Logistics network.",
};

const PRINCIPLES = [
  {
    icon: Heart,
    title: "People first, always.",
    body: "We don't shout. We don't politic. We pay properly, plan properly, and trust people to do the job they were hired for.",
  },
  {
    icon: Shield,
    title: "Compliance is the floor, not the ceiling.",
    body: "Our drivers, sites and books are audit-ready every day — and we back the people who keep them that way.",
  },
  {
    icon: Wrench,
    title: "Modern tools, no excuses.",
    body: "Late-model fleet, real telematics, a platform that works on the cab and the floor. If a tool is wrong, we fix it — fast.",
  },
  {
    icon: Users,
    title: "Promote from within.",
    body: "Operative to team lead. Team lead to ops. Planner to TM. The ladder is real and the rungs are funded.",
  },
];

export default function CareersPage() {
  const grouped = rolesByDepartment();
  const liveRoles = ROLES.filter((r) => r.status === "Hiring now").length;

  return (
    <>
      <PageHeader
        eyebrow={`Careers · ${liveRoles} roles open right now`}
        title="Drive, plan, and build the Kapture operating layer."
        lede="From the cab to the control tower to the codebase — we hire operators with bold cargo. Real fleet, real platform, real progression."
      >
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          <Link href="#open-roles" className="btn-primary text-[18px]">
            See open roles
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/careers/apply/general" className="btn-secondary text-[18px]">
            Send a speculative CV
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </PageHeader>

      <ImageStrip
        src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=80"
        alt="Kapture Logistics fleet on the move"
        eyebrow="Where you'll work"
        caption="Modern fleet. Modern platform. Modern people standards."
        height="short"
      />

      {/* ─── How we operate ─────────────────────────────────────────────── */}
      <section className="container-kapture py-24">
        <p className="chip">
          <span className="divider-dot" />
          How we operate
        </p>
        <h2 className="h-section mt-4 max-w-2xl text-balance">
          Four principles that decide every hire.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => {
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
                Open roles
              </p>
              <h2 className="h-section mt-4 max-w-2xl text-balance">
                {ROLES.length} roles. Every department. UK-wide.
              </h2>
            </div>
            <p className="max-w-md text-sm text-kapture-smoke dark:text-kapture-fog">
              Standard application form per role. We screen within 5 working
              days. If you're a fit, you'll meet a hiring manager — not a
              robot.
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
            Don't see your role?
          </p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            Send a speculative application.
          </h2>
          <p className="lede mt-4 max-w-xl">
            Tell us what you do and where you're based. We'll keep you on the
            shortlist for the next role that matches.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-4">
            <Link href="/careers/apply/general" className="btn-primary text-[18px]">
              Apply speculatively
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact?topic=careers" className="btn-secondary text-[18px]">
              Talk to People
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
