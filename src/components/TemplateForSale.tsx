"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Clock, Code2, Database, Sparkles } from "lucide-react";
import { SITE } from "@/lib/utils";

const STEPS = [
  { hour: "T+0",     icon: Sparkles, title: "You buy it",         body: "Lock the brief, pay one fee. Onboarding starts in the same hour." },
  { hour: "T+6",     icon: Code2,    title: "We brand it",        body: "Your colours, fonts, copy, photography. Wired into the system." },
  { hour: "T+18",    icon: Database, title: "We deploy it",       body: "Vercel goes live, Supabase tables seeded, lead capture firing." },
  { hour: "T+24",    icon: Clock,    title: "It's yours",         body: "Live URL, GitHub repo handed over, 30-day Kapture support active." },
];

export function TemplateForSale() {
  return (
    <section id="buy" className="relative overflow-hidden bg-kapture-black py-24 text-kapture-white md:py-32">
      <div className="container-kapture">
        <div className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="chip border-kapture-ash text-kapture-fog">
              <span className="divider-dot" />
              The play
            </p>
            <h2 className="h-section mt-4 text-balance text-kapture-white">
              You're looking at the product. Buy it. Make it yours.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-kapture-fog md:text-lg">
              This site is a Kapture Studio template — not a mock-up, not a Figma render, but a
              fully built, deployable, end-to-end logistics platform. One fee, your branding, live
              in 24 hours. Everything you scroll past is yours.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-kapture-yellow bg-kapture-yellow p-1">
              <div className="rounded-xl bg-kapture-black p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-kapture-yellow">
                  Template price
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-6xl font-bold tracking-tight">{SITE.template.price}</span>
                  <span className="text-sm text-kapture-fog">{SITE.template.onceOff}</span>
                </div>
                <p className="mt-4 text-sm text-kapture-fog">
                  Billed once via Kapture Studio. Includes branding, deployment, repo handover.
                </p>
                <Link
                  href="/quote?intent=template"
                  className="btn-yellow mt-6 w-full justify-center text-base"
                >
                  Make this site yours
                  <ArrowUpRight size={18} />
                </Link>
                <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-kapture-mist">
                  Custom build {SITE.template.customBuildPriceLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="chip border-kapture-ash text-kapture-fog">
              <span className="divider-dot" />
              What's included
            </p>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance">
              Everything you need to operate. Nothing you don't.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-kapture-fog">
              Not a theme. Not a Wordpress plugin. A working software product, built by Kapture
              Studio, ready to run your business from day one.
            </p>
          </div>

          <ul className="grid gap-3 lg:col-span-7 sm:grid-cols-2">
            {SITE.template.included.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex items-start gap-3 rounded-xl border border-kapture-ash bg-kapture-coal p-4"
              >
                <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kapture-yellow text-kapture-black">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-sm leading-relaxed text-kapture-fog">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* 24-hour timeline */}
        <div className="mt-20">
          <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="chip border-kapture-ash text-kapture-fog">
                <span className="divider-dot" />
                The 24-hour clock
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance">
                Buy it now, live by tomorrow.
              </h3>
            </div>
            <Link href="/quote?intent=template" className="btn-yellow">
              Start the clock <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-kapture-ash bg-kapture-ash md:grid-cols-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.hour}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-kapture-black p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-kapture-yellow">{s.hour}</span>
                    <Icon size={18} className="text-kapture-yellow" />
                  </div>
                  <h4 className="mt-5 font-display text-lg font-bold">{s.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-kapture-fog">{s.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
