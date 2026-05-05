"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Truck,
  PackageCheck,
  Globe2,
  FileCheck2,
  Ship,
  Plane,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "yellow";

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  tone: Tone;
};

const SERVICES: Service[] = [
  { id: "managed",      icon: Layers,       title: "Managed Transport", body: "One control tower. Pricing, routing, exceptions — handled.",         href: "/services#managed",      tone: "dark"   },
  { id: "multimodal",   icon: Truck,        title: "Multi-modal",       body: "Road, rail, air, sea — surge capacity across modes.",                href: "/services#multimodal",   tone: "light"  },
  { id: "lastmile",     icon: PackageCheck, title: "Last-mile",         body: "From port to porch. Same-day metro, scheduled rural.",               href: "/services#lastmile",     tone: "yellow" },
  { id: "supply-chain", icon: Globe2,       title: "Supply Chain",      body: "Bonded warehousing, pick-pack-ship, returns, visibility.",           href: "/services#supply-chain", tone: "light"  },
  { id: "ocean",        icon: Ship,         title: "Ocean Freight",     body: "FCL, LCL, project cargo from Asia and Europe into Africa.",          href: "/services#ocean",        tone: "light"  },
  { id: "air",          icon: Plane,        title: "Air Freight",       body: "Time-critical movements. Charter, express, consolidated.",           href: "/services#air",          tone: "light"  },
  { id: "customs",      icon: FileCheck2,   title: "Customs & Trade",   body: "Borders simplified. Clearance, classification, duty optimisation.",  href: "/services#customs",      tone: "light"  },
  { id: "platform",     icon: Radar,        title: "Kapture Platform",  body: "Real-time tracking, SLAs, exception alerts, APIs.",                  href: "/services#platform",     tone: "dark"   },
];

/**
 * One source of truth for tile colour — every visual class for a tone lives
 * here so the same logic flows across BentoServices, SolutionsGrid, and any
 * future tone-aware components without drift.
 */
function tileTokens(tone: Tone) {
  switch (tone) {
    case "dark":
      return {
        card:  "border-kapture-ash bg-kapture-black text-kapture-white hover:bg-kapture-coal",
        icon:  "bg-kapture-coal text-kapture-yellow",
        body:  "text-kapture-fog",
        cta:   "text-kapture-yellow",
      };
    case "yellow":
      return {
        card:  "border-kapture-yellow bg-kapture-yellow text-kapture-black hover:bg-kapture-amber",
        icon:  "bg-kapture-black text-kapture-yellow",
        body:  "text-kapture-black/75",
        cta:   "text-kapture-black",
      };
    default: // light tone — adapts to colour mode
      return {
        card:  "border-kapture-fog/60 bg-white text-kapture-black hover:border-kapture-black dark:border-kapture-ash dark:bg-kapture-coal dark:text-kapture-white dark:hover:border-kapture-white",
        icon:  "bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white",
        body:  "text-kapture-smoke dark:text-kapture-fog",
        cta:   "text-kapture-black/80 dark:text-kapture-yellow",
      };
  }
}

export function BentoServices() {
  return (
    <section className="container-kapture py-24 md:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="chip"><span className="divider-dot" />Services</p>
          <h2 className="h-section mt-4 text-balance">
            Every mode, lane, and milestone.
          </h2>
        </div>
        <Link href="/services" className="btn-secondary">
          Browse all services
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, idx) => {
          const Icon = s.icon;
          const t = tileTokens(s.tone);
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
            >
              <Link
                href={s.href}
                className={cn(
                  "group flex h-full flex-col gap-6 rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-kapture-lift",
                  t.card,
                )}
              >
                <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full", t.icon)}>
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                <div className="mt-2 flex flex-col gap-3">
                  <h3 className="font-display text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className={cn("text-sm leading-relaxed", t.body)}>{s.body}</p>
                  <span className={cn("mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all group-hover:gap-2.5", t.cta)}>
                    Learn more
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
