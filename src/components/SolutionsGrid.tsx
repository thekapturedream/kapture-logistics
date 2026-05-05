"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag, Factory, Pickaxe, HeartPulse, Wheat, Cpu } from "lucide-react";

const INDUSTRIES = [
  { id: "retail",        icon: ShoppingBag, title: "Retail & E-commerce", body: "Peak-ready fulfilment, returns, and last-mile that protects margin." },
  { id: "manufacturing", icon: Factory,     title: "Manufacturing",       body: "Just-in-sequence inbound, plant-to-port, finished goods distribution." },
  { id: "mining",        icon: Pickaxe,    title: "Mining & Energy",     body: "Project cargo, abnormal loads, corridor expertise pit to port." },
  { id: "healthcare",    icon: HeartPulse, title: "Healthcare & Pharma", body: "Cold-chain compliant, GDP-aligned, audit-ready transport." },
  { id: "agri",          icon: Wheat,       title: "Agriculture",         body: "Refrigerated and bulk movements that keep produce flowing." },
  { id: "tech",          icon: Cpu,         title: "Tech & Hardware",     body: "High-value, time-critical, white-glove handling with SLA tracking." },
];

export function SolutionsGrid() {
  return (
    <section id="industries" className="bg-kapture-paper dark:bg-kapture-ink">
      <div className="container-kapture py-24 md:py-32">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="chip"><span className="divider-dot" />Industries we move</p>
            <h2 className="h-section mt-4 text-balance">
              Tuned for the way your sector actually moves.
            </h2>
          </div>
          <Link href="/solutions" className="btn-secondary">
            See industry solutions
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                id={ind.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <Link
                  href={`/contact?topic=${ind.id}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-kapture-fog/60 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-kapture-black hover:shadow-kapture-lift dark:border-kapture-ash dark:bg-kapture-coal dark:hover:border-kapture-white"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>

                  <div className="mt-8">
                    <h3 className="font-display text-xl font-bold tracking-tight">{ind.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                      {ind.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-kapture-black transition-all group-hover:gap-2.5 dark:text-kapture-white">
                      Talk to a specialist
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
