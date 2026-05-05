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

function tileClass(tone: Tone) {
  if (tone === "dark") {
    return "border-kapture-ash bg-kapture-black text-kapture-white hover:bg-kapture-coal";
  }
  if (tone === "yellow") {
    return "border-kapture-yellow bg-kapture-yellow text-kapture-black hover:bg-kapture-amber";
  }
  return "border-kapture-fog/60 bg-white text-kapture-black hover:border-kapture-black dark:border-kapture-ash dark:bg-kapture-coal dark:text-kapture-white dark:hover:border-kapture-white";
}

function iconClass(tone: Tone) {
  if (tone === "dark") return "bg-kapture-coal text-kapture-yellow";
  if (tone === "yellow") return "bg-kapture-black text-kapture-yellow";
  return "bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white";
}

function bodyClass(tone: Tone) {
  if (tone === "dark") return "text-kapture-fog";
  if (tone === "yellow") return "text-kapture-black/75";
  return "text-kapture-smoke dark:text-kapture-fog";
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
                  "group flex aspect-[4/5] flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-kapture-lift",
                  tileClass(s.tone),
                )}
              >
                <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full", iconClass(s.tone))}>
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", bodyClass(s.tone))}>{s.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all group-hover:gap-2.5">
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
