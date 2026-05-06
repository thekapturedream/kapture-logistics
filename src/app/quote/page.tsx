import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
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
  alternates: { canonical: "/quote" },

};

const STEPS = [
  "Fill in the form — your contact details and what you want.",
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
    body: "Global CDN, auto-deploys on every code change, free SSL, custom domain ready.",
  },
  {
    icon: Smartphone,
    title: "Light + dark mode, mobile-first",
    body: "Looks great on phone, tablet, desktop. Light mode by default, dark mode one tap away.",
  },
  {
    icon: Search,
    title: "SEO and AI-search ready",
    body: "Open Graph cards, structured metadata, sitemap, semantic HTML. Designed to be cited by AI search.",
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
      {/* Header + form in one section. No break. */}
      <section className="relative bg-white dark:bg-kapture-black">
        <div className="grid-bg" />
        <div className="container-kapture relative pb-16 pt-20 md:pb-20 md:pt-28">
          <p className="chip">
            <span className="divider-dot" />
            A heads-up before you continue
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-hero-lg text-balance text-kapture-black dark:text-kapture-white">
            Ship your website today with Kapture.
          </h1>
          <p className="lede mt-6 max-w-2xl">
            What you're looking at is a Kapture website template — fully built,
            ready to be branded for your business. Fill in the short form below,
            then pick a 15-minute meeting slot. We talk, agree the brief, and
            your site goes live.
          </p>

          <div className="mt-10 max-w-3xl">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Context drops below — the four-step plan */}
      <section className="border-y border-kapture-fog/60 bg-kapture-paper py-20 md:py-24 dark:border-kapture-ash dark:bg-kapture-ink">
        <div className="container-kapture">
          <div className="mx-auto mb-12 max-w-2xl">
            <p className="chip"><span className="divider-dot" />Here's the plan</p>
            <h2 className="h-section mt-4 text-balance">
              Form → meeting → live site.
            </h2>
          </div>
          <ol className="mx-auto grid max-w-5xl gap-3 md:grid-cols-4">
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

      {/* What you get — features in a clean grid below */}
      <section className="container-kapture py-20 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl">
          <p className="chip"><span className="divider-dot" />What you get</p>
          <h2 className="h-section mt-4 text-balance">
            Everything on this site, branded for you.
          </h2>
          <p className="lede mt-3">
            Not a Wordpress theme. Not a Figma mock-up. A working software
            product, ready to run your business.
          </p>
        </div>

        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <li
                key={f.title}
                className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <p className="mt-5 text-sm font-bold">{f.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  {f.body}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-kapture-black p-6 text-kapture-white dark:bg-kapture-coal md:p-8">
          <p className="text-xs uppercase tracking-wider text-kapture-fog">
            After your meeting
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            <li className="flex items-start gap-2 text-sm text-kapture-fog">
              <Check size={14} className="mt-1 shrink-0 text-kapture-yellow" />
              Scope, timeline, and pricing locked
            </li>
            <li className="flex items-start gap-2 text-sm text-kapture-fog">
              <Check size={14} className="mt-1 shrink-0 text-kapture-yellow" />
              Site live within 24 hours of go-ahead
            </li>
            <li className="flex items-start gap-2 text-sm text-kapture-fog">
              <Check size={14} className="mt-1 shrink-0 text-kapture-yellow" />
              GitHub repo and Vercel project handed over
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
