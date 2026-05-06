import type { Metadata } from "next";
import { Cpu, Globe2, Layers, Search, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RequestAuditForm } from "@/components/RequestAuditForm";

export const metadata: Metadata = {
  title: "Request a free audit — Kapture Studio",
  description:
    "Get your logistics website scored against the nine dimensions used in the State of UK Logistics Websites 2026 report. Public dashboard delivered in 48 hours.",
};

const DIMENSIONS = [
  { icon: Globe2,      label: "Domain Health",    body: "Speed, SSL, mobile fitness, technical SEO." },
  { icon: Search,      label: "AI search",         body: "Schema, citations, ChatGPT/Perplexity visibility." },
  { icon: Layers,      label: "Conversion flow",   body: "Quote forms, lead capture, time-to-contact." },
  { icon: Cpu,         label: "Tech stack",        body: "Hosting, CMS, security, AI integrations." },
  { icon: ShieldCheck, label: "Trust signals",     body: "Reviews, accreditations, named clients, press." },
];

export default function RequestAuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free · 48-hour delivery"
        title="Request your audit."
        lede="One Kapture analyst runs the full nine-dimension audit on your site, the same framework used in the State of UK Logistics Websites 2026 report. You get a public dashboard URL with your scores and the prioritised fixes."
      />

      {/* Form first — full width, no sidebar */}
      <section className="container-kapture py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <RequestAuditForm />
        </div>
      </section>

      {/* Context drops below */}
      <section className="bg-kapture-paper py-20 md:py-24 dark:bg-kapture-ink">
        <div className="container-kapture">
          <div className="mx-auto mb-12 max-w-2xl">
            <p className="chip"><span className="divider-dot" />What we audit</p>
            <h2 className="h-section mt-4 text-balance">
              Five of the nine dimensions.
            </h2>
            <p className="lede mt-3">
              The full audit covers nine. These five are where most UK logistics
              brands lose ground first.
            </p>
          </div>

          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSIONS.map((d) => {
              const Icon = d.icon;
              return (
                <li
                  key={d.label}
                  className="flex items-start gap-3 rounded-xl border bg-white p-5 dark:border-kapture-ash dark:bg-kapture-coal"
                >
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                    <Icon size={16} strokeWidth={1.75} />
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

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-kapture-black p-6 text-kapture-white dark:bg-kapture-coal md:p-8">
            <p className="text-xs uppercase tracking-wider text-kapture-fog">
              After the audit
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              <li className="flex items-start gap-2 text-sm text-kapture-fog">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-kapture-yellow" />
                Public dashboard URL within 48 hours
              </li>
              <li className="flex items-start gap-2 text-sm text-kapture-fog">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-kapture-yellow" />
                Optional 15-minute walk-through with an analyst
              </li>
              <li className="flex items-start gap-2 text-sm text-kapture-fog">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-kapture-yellow" />
                Prioritised plan ranked by impact and effort
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
