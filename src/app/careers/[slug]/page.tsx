import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  ArrowLeft,
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { CareersApplicationForm } from "@/components/CareersApplicationForm";
import type { Role } from "@/lib/roles";
import { ROLES, getAllSlugs, getRole } from "@/lib/roles";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const role = getRole(params.slug);
  if (!role) {
    return {
      title: "Role not found",
    };
  }
  return {
    title: `${role.title} — Apply now`,
    description: role.summary,
  };
}

export default function RolePage({ params }: Props) {
  const found = getRole(params.slug);
  if (!found) notFound();
  // notFound() throws (returns `never`) but TS narrowing across function
  // boundaries on app-router pages is fragile, so assert once explicitly.
  const role: Role = found as Role;

  const otherRoles = ROLES.filter(
    (r) => r.slug !== role.slug && r.department === role.department,
  ).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`${role.department} · ${role.status}`}
        title={role.title}
        lede={role.summary}
      >
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          <Link href="#apply" className="btn-primary text-[18px]">
            Apply for this role
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/careers" className="btn-secondary text-[18px]">
            <ArrowLeft size={18} />
            All role templates
          </Link>
        </div>
      </PageHeader>

      {/* ─── At-a-glance ──────────────────────────────────────────────── */}
      <section className="border-b border-kapture-fog/60 bg-kapture-paper py-10 dark:border-kapture-ash dark:bg-kapture-ink">
        <div className="container-kapture">
          <div className="grid gap-6 md:grid-cols-4">
            <Stat icon={MapPin} label="Location" value={role.location} />
            <Stat icon={Clock} label="Shift pattern" value={role.shift} />
            <Stat icon={Banknote} label="Package" value={role.salary} />
            <Stat icon={Briefcase} label="Type" value={role.type} />
          </div>
        </div>
      </section>

      {/* ─── 01 — Application form (the page's primary surface) ─────── */}
      <section id="apply" className="container-kapture scroll-mt-20 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left rail — process explainer */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <p className="chip">
                <span className="divider-dot" />
                Step 01 · Apply
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                Application form for {role.title.split(" — ")[0].split(" (")[0]}.
              </h2>
              <p className="text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog md:text-base">
                Conditional logic is wired for the {role.family} role family.
                Drivers see DVLA, CPC and tacho fields. Warehouse sees FLT and
                shift preference. Office sees TMS and references — the form
                rewrites itself.
              </p>
              <ol className="space-y-4 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                <Step n="1" title="Apply">
                  Candidate fills in this form. Submission lands in the
                  recruiting inbox same day.
                </Step>
                <Step n="2" title="Screen">
                  People team reviews within 5 working days.
                </Step>
                <Step n="3" title="Interview">
                  Drivers and warehouse roles do a site visit and a practical.
                  Office and leadership do a 1-hour competency interview.
                </Step>
                <Step n="4" title="Offer">
                  Verbal offer within 48 hours of the final interview.
                </Step>
              </ol>
              <div className="rounded-2xl border border-kapture-yellow/40 bg-kapture-yellow/10 p-5 dark:bg-kapture-yellow/5">
                <p className="font-mono text-xs uppercase tracking-wider text-kapture-amber">
                  Need adjustments?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  Email{" "}
                  <a href="mailto:studio@thekapture.com" className="font-semibold underline">
                    studio@thekapture.com
                  </a>{" "}
                  and we'll work with you at every stage.
                </p>
              </div>
            </div>
          </aside>

          {/* The form — visible the moment the candidate lands on the page */}
          <div className="lg:col-span-8">
            <CareersApplicationForm role={role} />
          </div>
        </div>
      </section>

      {/* ─── 02 — Role detail (supporting reference, below the form) ─── */}
      <section className="bg-kapture-paper dark:bg-kapture-ink">
        <div className="container-kapture py-20 md:py-28">
          <p className="chip">
            <span className="divider-dot" />
            Step 02 · About this role
          </p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            What the role involves and what the package looks like.
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="lede">{role.intro}</p>
            </div>

            <div className="lg:col-span-7 space-y-12">
              <BulletBlock
                icon={Sparkles}
                title="What you'll do."
                items={role.responsibilities}
              />

              <BulletBlock
                icon={CheckCircle2}
                title="What we need from you."
                items={role.requirements}
              />

              {role.desirable && role.desirable.length > 0 && (
                <BulletBlock
                  icon={Sparkles}
                  title="Nice to have."
                  items={role.desirable}
                  muted
                />
              )}

              <BulletBlock
                icon={Heart}
                title="What you get back."
                items={role.benefits}
              />
            </div>
          </div>

          <div className="mt-14 rounded-2xl border border-kapture-yellow/40 bg-kapture-yellow/10 p-6 dark:bg-kapture-yellow/5 md:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-kapture-amber">
              Equal opportunities
            </p>
            <p className="mt-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
              Kapture Logistics is an equal opportunities employer. We welcome
              applications from every background and we make reasonable
              adjustments at every stage of the process.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-3 gap-y-4">
            <Link href="#apply" className="btn-primary text-[18px]">
              Back to the application form
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Related roles ──────────────────────────────────────────────── */}
      {otherRoles.length > 0 && (
        <section className="container-kapture py-20">
          <p className="chip">
            <span className="divider-dot" />
            Other roles in {role.department}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {otherRoles.map((r) => (
              <Link
                key={r.slug}
                href={`/careers/${r.slug}`}
                className="group rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-kapture-black dark:border-kapture-ash dark:bg-kapture-coal dark:hover:border-kapture-white"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-kapture-mist">
                  {r.location.split(",")[0]}
                </p>
                <h4 className="mt-3 font-display text-base font-bold tracking-tight">
                  {r.title}
                </h4>
                <p className="mt-2 text-xs text-kapture-smoke dark:text-kapture-fog">
                  {r.salary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-kapture-black dark:text-kapture-white">
                  View role <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Local presentational helpers
 * ─────────────────────────────────────────────────────────────────────*/

type StatProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function Stat({ icon: Icon, label, value }: StatProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 text-kapture-mist" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-kapture-mist">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-kapture-black dark:text-kapture-white">
          {value}
        </p>
      </div>
    </div>
  );
}

type BulletBlockProps = {
  icon: LucideIcon;
  title: string;
  items: string[];
  muted?: boolean;
};

function BulletBlock({ icon: Icon, title, items, muted }: BulletBlockProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          className={`rounded-full inline-flex p-2.5 ${
            muted
              ? "bg-kapture-paper text-kapture-mist dark:bg-kapture-ink"
              : "bg-kapture-black text-kapture-white dark:bg-kapture-white dark:text-kapture-black"
          }`}
        >
          <Icon size={14} />
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h3>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog md:text-base"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kapture-yellow" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kapture-black font-mono text-xs font-bold text-kapture-yellow dark:bg-kapture-white dark:text-kapture-black">
        {n}
      </span>
      <div>
        <p className="font-semibold text-kapture-black dark:text-kapture-white">{title}</p>
        <p className="mt-1">{children}</p>
      </div>
    </li>
  );
}
