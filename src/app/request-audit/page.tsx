import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Cpu, Globe2, Layers, Search, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RequestAuditForm } from "@/components/RequestAuditForm";

export const metadata: Metadata = {
  title: "Request a free audit — Kapture Studio",
  description:
    "Get your logistics website scored against the nine dimensions used in the State of UK Logistics Websites 2026 report. Public dashboard delivered in 48 hours.",
};

const DIMENSIONS = [
  { icon: Globe2,      label: "Domain Health",       body: "Speed, SSL, mobile fitness, technical SEO." },
  { icon: Search,      label: "AI search",            body: "Schema, citations, ChatGPT/Perplexity visibility." },
  { icon: Layers,      label: "Conversion flow",      body: "Quote forms, lead capture, time-to-contact." },
  { icon: Cpu,         label: "Tech stack",           body: "Hosting, CMS, security, AI integrations." },
  { icon: ShieldCheck, label: "Trust signals",        body: "Reviews, accreditations, named clients, press." },
];

export default function RequestAuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free · 48-hour delivery"
        title="Request your audit."
        lede="One Kapture analyst runs the full nine-dimension audit on your site, the same framework used in the State of UK Logistics Websites 2026 report. You get a public dashboard URL with your scores and the prioritised fixes."
      >
        <Link href="/state-of-uk-logistics-2026" className="btn-secondary whitespace-nowrap">
          See sample dashboard
          <ArrowUpRight size={16} />
        </Link>
      </PageHeader>

      <section className="container-kapture py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RequestAuditForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="chip"><span className="divider-dot" />What we audit</p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  Five of the nine dimensions.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  The full audit covers nine. These five are where most UK
                  logistics brands lose ground first.
                </p>
              </div>

              <ul className="space-y-3">
                {DIMENSIONS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <li
                      key={d.label}
                      className="flex items-start gap-3 rounded-xl border bg-white p-4 dark:border-kapture-ash dark:bg-kapture-coal"
                    >
                      <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                        <Icon size={14} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{d.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                          {d.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-2xl bg-kapture-black p-6 text-kapture-white dark:bg-kapture-ink">
                <p className="text-xs uppercase tracking-wider text-kapture-fog">
                  After the audit
                </p>
                <ul className="mt-3 space-y-2 text-sm text-kapture-fog">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-kapture-yellow" />
                    Public dashboard URL within 48 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-kapture-yellow" />
                    Optional 15-minute walk-through with a Kapture analyst
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-kapture-yellow" />
                    Prioritised plan ranked by impact and effort
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
