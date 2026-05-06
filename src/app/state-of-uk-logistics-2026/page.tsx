import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Cpu, FileText, Zap, type LucideIcon } from "lucide-react";
import { StateOfUkForm } from "@/components/StateOfUkForm";
import { CountUp } from "@/components/CountUp";
import { ScoreDistribution } from "@/components/ScoreDistribution";
import { AiAdoptionChart } from "@/components/AiAdoptionChart";
import { LiveTicker } from "@/components/LiveTicker";

export const metadata: Metadata = {
  title: "State of UK Logistics Websites 2026 — Free Report",
  description:
    "200 UK logistics brands audited. AI is the line between survivors and casualties. Free 64-page report from Kapture Studio.",
  openGraph: {
    title: "State of UK Logistics Websites 2026",
    description:
      "AI is the new dividing line in UK logistics. The data on 200 brands.",
    type: "article",
  },
};

export default function StateOfUKLogisticsPage() {
  return (
    <>
      {/* HERO — magazine cover energy */}
      <section className="relative isolate overflow-hidden bg-kapture-black text-kapture-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,212,0,0.12),rgba(0,0,0,0.95))]"
        />

        <div className="container-kapture relative pb-24 pt-24 md:pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-kapture-yellow/40 bg-kapture-yellow/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-kapture-yellow">
              The Annual Report · Issue 01 · 2026
            </div>
            <LiveTicker />
          </div>

          <h1 className="mt-12 max-w-5xl font-display text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-balance">
            Most UK logistics websites
            <br className="hidden md:block" />
            won't survive
            <span className="relative inline-block pb-1">
              {" "}AI.
              <span className="absolute -bottom-0 left-2 h-1.5 w-[calc(100%-0.5rem)] -skew-x-6 bg-kapture-yellow" aria-hidden />
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-balance text-base text-white/75 md:text-lg">
            We audited 200 UK logistics brands across nine dimensions. The data
            shows a binary split — companies that integrated AI are pulling
            away from the rest at a rate the laggards can't close.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#download" className="btn-yellow whitespace-nowrap">
              Get report
              <ArrowUpRight size={16} />
            </a>
            <Link
              href="/request-audit"
              className="btn-kapture whitespace-nowrap border border-kapture-ash bg-transparent text-kapture-white hover:bg-white hover:text-kapture-black"
            >
              Request audit
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* MASTHEAD STATS — animated counters, big numbers, no body copy */}
      <section className="border-y border-kapture-ash bg-kapture-black text-kapture-white">
        <div className="container-kapture grid grid-cols-2 gap-y-12 py-16 md:grid-cols-4 md:py-20">
          <Stat label="Brands audited" value={<CountUp to={200} />} />
          <Stat label="Failing mobile speed" value={<CountUp to={63} suffix="%" />} />
          <Stat label="Invisible to AI search" value={<CountUp to={82} suffix="%" />} />
          <Stat
            label="Tender win-rate gap"
            value={
              <>
                <CountUp to={2.3} decimals={1} />
                <span className="text-kapture-yellow">×</span>
              </>
            }
          />
        </div>
      </section>

      {/* THE FINDING — single big idea, lots of breathing room */}
      <section className="container-kapture py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="chip">
            <span className="divider-dot" />
            The finding
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-balance">
            AI isn't a feature anymore. It's the line between
            survival and irrelevance.
          </h2>
          <p className="lede mt-6">
            The top quartile of UK logistics websites have integrated AI for
            search, customer service, route optimisation, content generation,
            and lead qualification. The bottom three quartiles haven't even
            started. The gap is visible in revenue, in tender win rates, in
            digital presence, and in the inbound pipeline that decides next
            year's headcount.
          </p>
        </div>
      </section>

      {/* SCORE DISTRIBUTION — single beautiful chart */}
      <section className="bg-kapture-paper py-24 md:py-32 dark:bg-kapture-ink">
        <div className="container-kapture">
          <div className="mb-12 max-w-2xl">
            <p className="chip">
              <span className="divider-dot" />
              The grade curve
            </p>
            <h2 className="h-section mt-4 text-balance">
              75% of UK logistics websites score below B.
            </h2>
          </div>
          <ScoreDistribution />
        </div>
      </section>

      {/* AI vs TRADITIONAL — the central data viz */}
      <section className="container-kapture py-24 md:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="chip">
            <span className="divider-dot" />
            The dividing line
          </p>
          <h2 className="h-section mt-4 text-balance">
            What AI integration actually does to the bottom line.
          </h2>
        </div>
        <AiAdoptionChart />
      </section>

      {/* THREE PULL-QUOTES — looks like a magazine spread */}
      <section className="bg-kapture-black py-24 text-kapture-white md:py-32">
        <div className="container-kapture grid gap-12 lg:grid-cols-3 lg:gap-8">
          <PullQuote
            n="01"
            stat="63%"
            label="fail mobile speed"
            body="Median mobile load time is 4.4s. Google's Core Web Vitals threshold is 2.5s. Most UK logistics sites are losing search position before the page even paints."
          />
          <PullQuote
            n="02"
            stat="82%"
            label="invisible to AI search"
            body="ChatGPT, Perplexity, and Google's AI Overview answer logistics queries by citing structured-data sources. Almost no UK site ships the schema markup that gets cited."
          />
          <PullQuote
            n="03"
            stat="2.3×"
            label="tender win-rate gap"
            body="AI-integrated brands win 72% of tenders they pitch for. Traditional brands win 31%. The website is the first thing buyers evaluate — it's setting the meeting before it starts."
          />
        </div>
      </section>

      {/* THE KAPTURE FIX — light positioning, not pushy */}
      <section className="container-kapture py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="chip">
              <span className="divider-dot" />
              How Kapture fits
            </p>
            <h2 className="h-section mt-4 text-balance">
              We build the digital layer the survivors use.
            </h2>
            <p className="lede mt-5">
              AI-native website. Lead capture wired to a real database.
              Calendly bookings into your Google Calendar. Resend email
              pipeline. SEO + AI search schema baked in.
            </p>
            <p className="lede mt-3">
              Live in 24 hours. Owned by you, not rented. The same operating
              layer the top 5% have, deployed for the rest.
            </p>
            <Link
              href="/quote"
              className="btn-yellow mt-8 whitespace-nowrap"
            >
              Ship my new website
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid gap-3 lg:col-span-7 sm:grid-cols-2">
            <ToolCard
              icon={Cpu}
              title="AI-ready by default"
              body="Schema markup, structured data, FAQ blocks. ChatGPT and Perplexity cite it without you doing anything else."
            />
            <ToolCard
              icon={Zap}
              title="2.1s mobile load"
              body="Vercel edge network, Next.js 14, Tailwind. The median speed of the top 5% — every Kapture site ships there."
            />
            <ToolCard
              icon={FileText}
              title="Quote calc + database"
              body="Live freight calculator wired to Supabase. Every form submission lands in your inbox and your CRM."
            />
            <ToolCard
              icon={ArrowUpRight}
              title="Owned, not rented"
              body="GitHub repo handed over. Vercel project transferred. No platform lock-in, no monthly subscription. Yours."
            />
          </div>
        </div>
      </section>

      {/* DOWNLOAD FORM — header above, form full-width below, no sidebar */}
      <section
        id="download"
        className="scroll-mt-20 bg-kapture-paper py-24 md:py-32 dark:bg-kapture-ink"
      >
        <div className="container-kapture">
          <div className="mx-auto max-w-2xl text-center">
            <p className="chip mx-auto">
              <span className="divider-dot" />
              Free · PDF · attached on submit
            </p>
            <h2 className="h-section mt-4 text-balance">
              The full data, free.
            </h2>
            <p className="lede mt-5">
              Methodology, the AI thesis, the named top and bottom quartiles,
              sector breakdowns, the survivor's tech stack — lands in your
              inbox the moment you submit.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <StateOfUkForm />
          </div>

          <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "64 pages, full data, named brands",
              "The AI tools the top 5% are using",
              "Sector breakdowns + UK regional heatmap",
              "Quarterly updates by email",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-xl border bg-white p-4 text-sm dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <Zap size={14} className="mt-0.5 shrink-0 text-kapture-yellow" />
                <span className="text-kapture-smoke dark:text-kapture-fog">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLOSING */}
      <section className="container-kapture py-24 md:py-32">
        <div className="relative overflow-hidden rounded-3xl bg-kapture-black px-8 py-16 text-kapture-white md:px-16 md:py-20">
          <p className="chip border-kapture-ash text-kapture-fog">
            <span className="divider-dot" />
            Already below the line?
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-balance">
            Get your own audit.
          </h2>
          <p className="lede mt-4 max-w-xl text-kapture-fog">
            Kapture audits your site against the same nine dimensions used in
            the report. Public dashboard delivered in 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request-audit" className="btn-yellow whitespace-nowrap">
              Request audit
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/quote"
              className="btn-kapture whitespace-nowrap border border-kapture-ash bg-transparent text-kapture-white hover:bg-white hover:text-kapture-black"
            >
              Ship a new site
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Local components                                                         */
/* ──────────────────────────────────────────────────────────────────────── */

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="border-l border-kapture-ash pl-6">
      <p className="font-display text-5xl font-bold leading-none tracking-tight md:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-kapture-fog">
        {label}
      </p>
    </div>
  );
}

function PullQuote({
  n,
  stat,
  label,
  body,
}: {
  n: string;
  stat: string;
  label: string;
  body: string;
}) {
  return (
    <div className="border-t border-kapture-yellow/40 pt-6">
      <p className="font-mono text-xs text-kapture-yellow">{n}</p>
      <p className="mt-4 font-display text-5xl font-bold leading-none tracking-tight md:text-6xl">
        {stat}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-kapture-fog">
        {label}
      </p>
      <p className="mt-5 text-sm leading-relaxed text-kapture-fog md:text-base">
        {body}
      </p>
    </div>
  );
}

function ToolCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-7 dark:border-kapture-ash dark:bg-kapture-coal">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <p className="mt-5 font-display text-lg font-bold tracking-tight">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
        {body}
      </p>
    </div>
  );
}
