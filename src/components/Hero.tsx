"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Globe, Calendar } from "lucide-react";
import { SITE } from "@/lib/utils";

const INDUSTRY_PRESETS = [
  "Logistics & Freight",
  "Retail & E-commerce",
  "Manufacturing",
  "Mining & Energy",
  "Healthcare",
  "Agriculture",
  "Tech & SaaS",
  "Financial Services",
  "Hospitality",
  "Other",
];

const TIMELINE_OPTIONS = [
  "ASAP — within 24 hours",
  "This week",
  "This month",
  "Next quarter",
  "Just exploring",
];

export function Hero() {
  const router = useRouter();
  const [business, setBusiness] = React.useState("");
  const [industry, setIndustry] = React.useState("Logistics & Freight");
  const [timeline, setTimeline] = React.useState("ASAP — within 24 hours");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      business,
      industry,
      timeline,
      intent: "template",
    });
    router.push(`/quote?${params.toString()}`);
  }

  return (
    <section className="relative isolate -mt-16 overflow-hidden bg-kapture-black">
      {/* Solid black underlay — guarantees pure black until video has frames */}
      <div className="absolute inset-0 -z-30 bg-kapture-black" aria-hidden="true" />

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%201%201%27%3E%3Crect%20width%3D%271%27%20height%3D%271%27%20fill%3D%27%230A0A0A%27%2F%3E%3C%2Fsvg%3E"
        className="absolute inset-0 -z-20 h-full w-full bg-kapture-black object-cover"
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dim overlays for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),rgba(0,0,0,0.85))]"
      />

      <div className="container-kapture relative pb-24 pt-24 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-kapture-yellow/40 bg-kapture-yellow/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-kapture-yellow backdrop-blur"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-kapture-yellow" />
            A Kapture Studio template · Yours in 24 hours
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-hero-xl text-balance text-white"
          >
            Make this website{" "}
            <span className="relative inline-block">
              yours
              <span className="absolute -bottom-1 left-0 h-2 w-full -skew-x-6 bg-kapture-yellow" aria-hidden />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance text-base text-white/80 md:text-lg"
          >
            A fully built, end-to-end logistics platform — design system, lead capture,
            customer database, admin panel. Punch in your endpoints. We'll handle the world
            in between.
          </motion.p>
        </div>

        {/* Kapture client onboarding form — looks like a freight calculator, captures buyers */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/95 p-3 shadow-2xl backdrop-blur-md dark:bg-kapture-ink/95 md:p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-3 pt-1">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-kapture-mist">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-kapture-yellow" />
              Get pricing
            </span>
            <span className="text-[11px] uppercase tracking-wider text-kapture-mist">
              {SITE.template.priceFromLabel} · {SITE.template.delivery}
            </span>
          </div>

          <div className="grid gap-2 md:grid-cols-[1fr,1fr,auto,auto]">
            <label className="relative">
              <span className="sr-only">Business name</span>
              <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
              <input
                type="text"
                required
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="Your business name"
                className="field h-14 pl-12 text-base"
              />
            </label>

            <label className="relative">
              <span className="sr-only">Industry</span>
              <Globe size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="field h-14 appearance-none pl-12 pr-8 text-base"
              >
                {INDUSTRY_PRESETS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </label>

            <label className="relative md:w-56">
              <span className="sr-only">Launch timeline</span>
              <Calendar size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="field h-14 appearance-none pl-12 pr-8 text-base"
              >
                {TIMELINE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>

            <button type="submit" className="btn-yellow h-14 px-7 text-base font-bold">
              See pricing
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-2 pb-1 pt-3">
            <span className="text-[11px] uppercase tracking-wider text-kapture-mist">
              Or build me a custom one
            </span>
            <button
              type="button"
              onClick={() => router.push("/quote?intent=custom")}
              className="rounded-full border px-3 py-1 text-[11px] font-medium text-kapture-smoke transition-colors hover:border-kapture-black hover:text-kapture-black dark:border-kapture-ash dark:text-kapture-fog dark:hover:border-kapture-white dark:hover:text-kapture-white"
            >
              Custom build · {SITE.template.customBuildPriceLabel}
            </button>
            <button
              type="button"
              onClick={() => router.push("/services")}
              className="rounded-full border px-3 py-1 text-[11px] font-medium text-kapture-smoke transition-colors hover:border-kapture-black hover:text-kapture-black dark:border-kapture-ash dark:text-kapture-fog dark:hover:border-kapture-white dark:hover:text-kapture-white"
            >
              Browse the demo
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kapture-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-kapture-yellow" />
            </span>
            12 templates shipped this month
          </span>
          <span className="hidden md:inline">·</span>
          <span>Hosted on Vercel</span>
          <span className="hidden md:inline">·</span>
          <span>Supabase wired</span>
          <span className="hidden md:inline">·</span>
          <span>30-day Kapture support</span>
        </motion.div>
      </div>
    </section>
  );
}
