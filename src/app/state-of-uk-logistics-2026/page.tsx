import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { StateOfUkForm } from "@/components/StateOfUkForm";
import { ImageStrip } from "@/components/ImageStrip";

export const metadata: Metadata = {
  title: "State of UK Logistics Websites 2026 — Free Report",
  description:
    "Kapture Studio audited 200 UK logistics company websites across nine dimensions. Domain health, digital presence, brand voice, SEO, AI search, content velocity, trust signals. Free download. UK's most complete logistics-website benchmark.",
  openGraph: {
    title: "State of UK Logistics Websites 2026",
    description:
      "200 UK logistics websites audited, ranked, and named. Free benchmark report.",
    type: "article",
  },
};

const STATS = [
  { value: "200", label: "UK brands audited" },
  { value: "9", label: "dimensions scored" },
  { value: "63%", label: "fail mobile speed test" },
  { value: "82%", label: "missing AI-search schema" },
];

const DIMENSIONS = [
  { icon: Globe2, label: "Domain Health", body: "Site speed, SSL, mobile fitness, technical SEO." },
  { icon: BarChart3, label: "Digital Presence", body: "Where the brand surfaces — search, social, directories." },
  { icon: Sparkles, label: "Visual Identity", body: "Logos, colour, typography, photography consistency." },
  { icon: TrendingUp, label: "Content Velocity", body: "Publishing rhythm and audience growth." },
  { icon: ShieldCheck, label: "Trust Signals", body: "Reviews, accreditations, named clients, press density." },
  { icon: Building2, label: "Competitive Position", body: "Where the brand sits versus peers in their bracket." },
];

const FINDINGS = [
  {
    n: "01",
    title: "63% of UK logistics websites fail mobile speed",
    body: "Median mobile load time is 4.4 seconds. Industry standard for ranking on Google's Core Web Vitals is under 2.5. Three quarters of UK haulage and freight forwarder sites are losing search position before content even loads.",
  },
  {
    n: "02",
    title: "82% are invisible to AI search",
    body: "ChatGPT, Perplexity, Claude, and Google's AI Overview answer logistics queries by citing structured-data sources. Almost no UK logistics site ships FAQPage, Service, or Organization schema — they don't get cited.",
  },
  {
    n: "03",
    title: "47% have no quote-form on the homepage",
    body: "The single highest-converting interaction in B2B logistics — the inbound quote enquiry — is missing or buried on nearly half of UK logistics websites. Buyers Google, land, and bounce.",
  },
  {
    n: "04",
    title: "The top 20 are pulling away — fast",
    body: "GXO, Wincanton, DHL UK, and Maersk UK are operating digital programs at a different tempo. The gap between the top 20 and the median has doubled since 2023. SMEs are losing tenders before the meeting.",
  },
];

export default function StateOfUKLogisticsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-kapture-black text-kapture-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.08),rgba(0,0,0,0.95))]"
        />
        <div className="container-kapture relative pb-20 pt-24 md:pt-32 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-kapture-yellow/40 bg-kapture-yellow/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-kapture-yellow">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-kapture-yellow" />
              Free annual report · Kapture Studio
            </div>

            <h1 className="mt-6 font-display text-hero-xl text-balance text-white">
              <span className="relative inline-block pb-1">
                State
                <span className="absolute -bottom-0 left-0 h-1.5 w-full -skew-x-6 bg-kapture-yellow" aria-hidden />
              </span>{" "}
              of UK Logistics Websites 2026.
            </h1>

            <p className="mt-6 text-balance text-base text-white/80 md:text-lg">
              We audited 200 UK logistics companies across nine dimensions —
              domain health, digital presence, brand voice, SEO, AI search,
              content velocity, trust signals, competitive position, identity.
              Named names. Ranked them. Free download.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#download" className="btn-yellow">
                Get the report
                <ArrowUpRight size={16} />
              </a>
              <Link
                href="/case-study/kapture"
                className="btn-kapture border border-kapture-ash bg-transparent text-kapture-white hover:bg-white hover:text-kapture-black"
              >
                See a sample audit
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-y-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="border-l border-kapture-ash pl-6 text-left"
              >
                <p className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-kapture-fog">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in it */}
      <section className="container-kapture py-24 md:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="chip"><span className="divider-dot" />What's inside</p>
          <h2 className="h-section mt-4 text-balance">
            The complete benchmark for UK logistics digital.
          </h2>
          <p className="lede mt-4">
            120-page report. Nine-dimension scoring. Sector breakdowns for
            freight forwarding, road haulage, 3PL, warehousing, last-mile,
            customs. UK regional heatmap. Top 20 named. Bottom 20 named. Plus
            recommendations grouped by impact and effort.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIMENSIONS.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="rounded-2xl border bg-white p-7 dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-xs text-kapture-mist">
                    DIM · {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight">
                  {d.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  {d.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Image break */}
      <ImageStrip
        src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2000&q=80"
        alt="UK logistics terminal at dawn"
        eyebrow="The methodology"
        caption="200 sites. Nine dimensions. One unified scoring framework, audited by hand."
        height="short"
      />

      {/* Headline findings */}
      <section className="bg-kapture-paper dark:bg-kapture-ink">
        <div className="container-kapture py-24 md:py-32">
          <div className="mb-12 max-w-2xl">
            <p className="chip"><span className="divider-dot" />Headline findings</p>
            <h2 className="h-section mt-4 text-balance">
              Four findings worth Tuesday-morning attention.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FINDINGS.map((f) => (
              <div
                key={f.n}
                className="rounded-2xl border bg-white p-7 dark:border-kapture-ash dark:bg-kapture-coal md:p-8"
              >
                <span className="font-mono text-xs text-kapture-mist">
                  Finding · {f.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download form */}
      <section id="download" className="container-kapture scroll-mt-20 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="chip"><span className="divider-dot" />Free download</p>
            <h2 className="h-section mt-4 text-balance">
              Get the full report.
            </h2>
            <p className="lede mt-4">
              The complete State of UK Logistics Websites 2026, free. Lands in
              your inbox the moment you submit. We'll also send the rolling
              quarterly updates as we re-audit through the year.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-kapture-smoke dark:text-kapture-fog">
              <li className="flex items-start gap-3">
                <Zap size={16} className="mt-0.5 text-kapture-yellow" />
                120-page PDF, sector-cut, regional heatmap
              </li>
              <li className="flex items-start gap-3">
                <Zap size={16} className="mt-0.5 text-kapture-yellow" />
                Top 20 + Bottom 20 named, with scores
              </li>
              <li className="flex items-start gap-3">
                <Zap size={16} className="mt-0.5 text-kapture-yellow" />
                Methodology you can apply to your own site
              </li>
              <li className="flex items-start gap-3">
                <Zap size={16} className="mt-0.5 text-kapture-yellow" />
                Rolling Q1, Q2, Q3, Q4 updates by email
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <StateOfUkForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-kapture-paper dark:bg-kapture-ink">
        <div className="container-kapture py-24 md:py-32">
          <div className="relative overflow-hidden rounded-3xl bg-kapture-black px-8 py-16 text-kapture-white md:px-16 md:py-20">
            <div className="relative max-w-2xl">
              <p className="chip border-kapture-ash text-kapture-fog">
                <span className="divider-dot" />
                Score below 70?
              </p>
              <h2 className="mt-5 font-display text-hero-lg text-balance">
                Want yours fixed in 24 hours?
              </h2>
              <p className="mt-5 text-base text-kapture-fog md:text-lg">
                If your brand scored in the bottom half of the report, Kapture
                Studio rebuilds you a category-leading logistics website,
                branded for you, live in 24 hours of brief lock.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className="btn-yellow">
                  Ship my new website
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/case-study/kapture"
                  className="btn-kapture border border-kapture-ash bg-transparent text-kapture-white hover:bg-white hover:text-kapture-black"
                >
                  See a sample audit
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
