"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Factory,
  Pickaxe,
  Stethoscope,
  Wheat,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

const INDUSTRIES = [
  {
    id: "retail",
    title: "Retail & E-commerce",
    body: "Peak-season-ready fulfilment, returns, and last-mile that protect your margin.",
    icon: ShoppingBag,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    body: "Just-in-sequence inbound, plant-to-port flows, and finished-goods distribution.",
    icon: Factory,
  },
  {
    id: "mining",
    title: "Mining & Energy",
    body: "Project cargo, abnormal loads, and corridor expertise from pit to port.",
    icon: Pickaxe,
  },
  {
    id: "healthcare",
    title: "Healthcare & Pharma",
    body: "Cold-chain compliant, GDP-aligned, audit-ready transport for sensitive cargo.",
    icon: Stethoscope,
  },
  {
    id: "agri",
    title: "Agriculture",
    body: "Refrigerated and bulk movements that keep produce, grain, and inputs flowing.",
    icon: Wheat,
  },
  {
    id: "tech",
    title: "Tech & Hardware",
    body: "High-value, time-critical movements with white-glove handling and SLA tracking.",
    icon: Cpu,
  },
];

export function SolutionsGrid() {
  return (
    <section id="industries" className="bg-kapture-paper dark:bg-kapture-ink">
      <div className="container-kapture py-24 md:py-32">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="chip">
              <span className="divider-dot" />
              Built for your industry
            </p>
            <h2 className="h-section mt-4 max-w-2xl text-balance">
              Solutions shaped to the way you actually move things.
            </h2>
            <p className="lede mt-4 max-w-xl">
              Every industry has its own gravity. We tune lanes, capacity, and SLAs to yours.
            </p>
          </div>
          <Link href="/solutions" className="btn-secondary">
            See industry solutions
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                id={ind.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group relative overflow-hidden rounded-2xl border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-kapture-lift dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-full bg-kapture-paper p-2.5 text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-kapture-mist">
                    Industry · {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                  {ind.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  {ind.body}
                </p>

                <Link
                  href={`/contact?topic=${ind.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-kapture-black hover:gap-3 dark:text-kapture-white"
                >
                  Talk to a {ind.title.split(" ")[0]} lead
                  <ArrowUpRight size={14} />
                </Link>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-kapture-yellow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
