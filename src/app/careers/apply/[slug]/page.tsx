import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Banknote, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CareersApplicationForm } from "@/components/CareersApplicationForm";
import { getRole, getAllSlugs } from "@/lib/roles";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  // "general" handles speculative applications and is not in roles.ts.
  return [...getAllSlugs(), "general"].map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (params.slug === "general") {
    return {
      title: "Speculative application — Careers",
      description: "Send a speculative application to Kapture Logistics.",
    };
  }
  const role = getRole(params.slug);
  if (!role) return { title: "Apply" };
  return {
    title: `Apply — ${role.title}`,
    description: `Apply for the ${role.title} role at Kapture Logistics, ${role.location}.`,
  };
}

export default function ApplyPage({ params }: Props) {
  const isGeneral = params.slug === "general";
  const found = isGeneral ? null : getRole(params.slug);
  if (!isGeneral && !found) notFound();
  // After the guard, narrow `role` to a non-null Role for the typed branches.
  const role = found;

  const headerEyebrow = isGeneral
    ? "Speculative application"
    : `${role!.department} · Apply now`;
  const headerTitle = isGeneral
    ? "Send us a speculative application."
    : `Apply for ${role!.title}.`;
  const headerLede = isGeneral
    ? "Tell us about you and where you're based. If we have a role that matches in the next 90 days, you'll hear from us directly."
    : "Standard 6-minute application. Your details go straight to the hiring team.";

  return (
    <>
      <PageHeader
        eyebrow={headerEyebrow}
        title={headerTitle}
        lede={headerLede}
      >
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          <Link
            href={isGeneral ? "/careers" : `/careers/${role!.slug}`}
            className="btn-secondary text-[18px]"
          >
            <ArrowLeft size={18} />
            {isGeneral ? "Back to all roles" : "Back to role detail"}
          </Link>
        </div>
      </PageHeader>

      {/* Role at-a-glance — only when applying to a specific role. */}
      {role && (
        <section className="border-b border-kapture-fog/60 bg-kapture-paper py-8 dark:border-kapture-ash dark:bg-kapture-ink">
          <div className="container-kapture">
            <div className="grid gap-5 md:grid-cols-3">
              <Stat icon={MapPin} label="Location" value={role.location} />
              <Stat icon={Clock} label="Shift" value={role.shift} />
              <Stat icon={Banknote} label="Package" value={role.salary} />
            </div>
          </div>
        </section>
      )}

      <section className="container-kapture py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sidebar — process explainer */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-kapture-mist">
                  What happens next?
                </p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight">
                  Our hiring process is short and respectful.
                </h3>
                <ol className="mt-5 space-y-4 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  <Step n="1" title="Application">
                    You submit this form. We acknowledge by email same day.
                  </Step>
                  <Step n="2" title="Screen">
                    People team reviews within 5 working days. If it's a fit
                    we book a 20-minute screening call.
                  </Step>
                  <Step n="3" title="Hiring manager">
                    Drivers and warehouse roles do a site visit and a
                    practical. Office and leadership roles do a 1-hour
                    competency interview.
                  </Step>
                  <Step n="4" title="Offer">
                    Verbal offer within 48 hours of the final interview.
                    Written offer next working day.
                  </Step>
                </ol>
              </div>

              <div className="rounded-2xl border border-kapture-yellow/40 bg-kapture-yellow/10 p-5 dark:bg-kapture-yellow/5">
                <p className="font-mono text-xs uppercase tracking-wider text-kapture-amber">
                  Need help applying?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  We make reasonable adjustments at every stage. Email{" "}
                  <a
                    href="mailto:studio@thekapture.com"
                    className="font-semibold underline"
                  >
                    studio@thekapture.com
                  </a>{" "}
                  and we'll work with you.
                </p>
              </div>
            </div>
          </aside>

          {/* The form */}
          <div className="lg:col-span-8">
            <CareersApplicationForm role={role ?? null} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

type StatProps = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
