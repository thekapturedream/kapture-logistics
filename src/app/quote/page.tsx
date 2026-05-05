import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Make this website yours — Kapture Studio onboarding",
  description: `Buy this template for ${SITE.template.priceFromLabel} or commission a custom build. Live in ${SITE.template.deliveryHours} hours, branded for you, by ${SITE.studio}.`,
};

const PROMISES = [
  `Full Next.js + Tailwind code repository — yours to keep`,
  `Branded for your business inside ${SITE.template.deliveryHours} hours of brief lock`,
  `Vercel hosting + Supabase database + Make.com webhooks pre-wired`,
  `Light + dark mode, mobile-first, accessibility-ready out of the box`,
  `30-day post-launch support window with ${SITE.studio}`,
];

type Props = {
  searchParams: {
    business?: string;
    industry?: string;
    timeline?: string;
    intent?: string;
  };
};

export default function QuotePage({ searchParams }: Props) {
  const isCustom = searchParams.intent === "custom";
  return (
    <>
      <PageHeader
        eyebrow={isCustom ? "Custom build · Kapture Studio" : "Buy this template · Kapture Studio"}
        title={isCustom ? "Brief a custom build." : "Make this website yours."}
        lede={
          isCustom
            ? `Tell us what you want built. We come back with scope, timeline, and pricing within the business hour. Custom engagements ${SITE.template.customBuildPriceLabel}.`
            : `Tell us about your business. We come back with template pricing, branding plan, and a 24-hour deploy schedule. Template ${SITE.template.priceFromLabel}.`
        }
      />

      <section className="container-kapture py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <QuoteForm defaults={searchParams} />
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div>
                <p className="chip">
                  <span className="divider-dot" />
                  What you walk away with
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  Built. Branded. Live.
                </h3>
                <ul className="mt-6 space-y-3">
                  {PROMISES.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-kapture-yellow" />
                      <span className="text-kapture-smoke dark:text-kapture-fog">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-kapture-black p-6 text-kapture-white dark:bg-kapture-ink">
                <p className="text-xs uppercase tracking-wider text-kapture-fog">
                  This template
                </p>
                <p className="mt-2 font-display text-4xl font-bold tracking-tight">
                  {SITE.template.price}
                </p>
                <p className="mt-1 text-sm text-kapture-fog">
                  {SITE.template.onceOff}
                </p>
                <p className="mt-4 text-sm text-kapture-fog">
                  Includes branding, deployment, repo handover, and 30-day support. Custom builds {SITE.template.customBuildPriceLabel}.
                </p>
              </div>

              <div className="text-xs uppercase tracking-wider text-kapture-mist">
                Designed and built by {SITE.studio} · {SITE.email} · {SITE.phone}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
