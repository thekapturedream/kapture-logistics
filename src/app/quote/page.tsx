import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { ScrollToFormButton } from "@/components/ScrollToFormButton";
import {
  Check,
  Layers,
  Database,
  Palette,
  Smartphone,
  Search,
  ShieldCheck,
  Cloud,
  HeadphonesIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ship your website today with Kapture",
  description:
    "Heads up — what you're looking at is a Kapture website template, ready to be branded for your business. Tell us about you, then book a 15-minute meeting to ship it.",
};

const STEPS = [
  "Fill in the form below — your contact details and what you want.",
  "Pick a 15-minute meeting slot. Free, no commitment.",
  "We confirm scope and pricing on the call.",
  "Your branded site goes live — usually within 24 hours.",
];

const FEATURES = [
  {
    icon: Layers,
    title: "Full multi-page logistics website",
    body: "Home, services, solutions, about, contact, quote — all wired. Including the freight quote calculator you just used.",
  },
  {
    icon: Palette,
    title: "Branded for your business",
    body: "Your colours, fonts, copy, photography. We build the design system around your identity, not against it.",
  },
  {
    icon: Database,
    title: "Lead capture wired to a real database",
    body: "Every form on the site stores leads in Supabase. Quote requests, contact submissions, newsletter signups — all in one place.",
  },
  {
    icon: Cloud,
    title: "Hosted on Vercel, zero ops",
    body: "Global CDN, auto-deploys on every code change, free SSL, custom domain ready. We handle the deploy, you just publish.",
  },
  {
    icon: Smartphone,
    title: "Light + dark mode, mobile-first",
    body: "Looks great on phone, tablet, desktop. Light mode by default, dark mode one tap away. Built mobile-first, not retrofitted.",
  },
  {
    icon: Search,
    title: "SEO and AI-search ready",
    body: "Open Graph cards, structured metadata, sitemap, semantic HTML. Designed to be cited by AI search and ranked by Google.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility-ready",
    body: "Keyboard navigation, screen-reader labels, contrast-checked colours. WCAG-aware out of the box.",
  },
  {
    icon: HeadphonesIcon,
    title: "30-day Kapture support",
    body: "After launch, your dedicated Kapture operator is on call for 30 days for tweaks, training, and small additions.",
  },
];

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="A heads-up before you continue"
        title="Ship your website today with Kapture."
        lede="What you're looking at is a Kapture website template — fully built, ready to be branded for your business. Fill in the short form below, then pick a 15-minute meeting slot. We talk, agree the brief, and your site goes live."
      >
        <ScrollToFormButton />
      </PageHeader>

      {/* How it works — plain English, four steps */}
      <section className="border-b border-kapture-fog/60 dark:border-kapture-ash">
        <div className="container-kapture py-12 md:py-16">
          <p className="chip">
            <span className="divider-dot" />
            Here's the plan
          </p>
          <ol className="mt-6 grid gap-3 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <li
                key={i}
                className="rounded-2xl border bg-white p-5 dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <span className="font-mono text-xs text-kapture-mist">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-kapture-black dark:text-kapture-white">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Form + features sidebar */}
      <section id="onboarding-form" className="scroll-mt-20 container-kapture py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="chip">
                  <span className="divider-dot" />
                  What you get
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  Everything on this site, branded for you.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  Not a Wordpress theme. Not a Figma mock-up. A working software product, ready to
                  run your business.
                </p>
              </div>

              <ul className="space-y-3">
                {FEATURES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li
                      key={f.title}
                      className="flex items-start gap-3 rounded-xl border bg-white p-4 dark:border-kapture-ash dark:bg-kapture-coal"
                    >
                      <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                        <Icon size={14} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{f.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                          {f.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-2xl bg-kapture-black p-6 text-kapture-white dark:bg-kapture-ink">
                <p className="text-xs uppercase tracking-wider text-kapture-fog">
                  After your meeting
                </p>
                <ul className="mt-3 space-y-2 text-sm text-kapture-fog">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 shrink-0 text-kapture-yellow" />
                    Scope, timeline, and pricing locked
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 shrink-0 text-kapture-yellow" />
                    Site live within 24 hours of go-ahead
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-1 shrink-0 text-kapture-yellow" />
                    GitHub repo and Vercel project handed over
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
