"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  RetailIllustration,
  ManufacturingIllustration,
  MiningIllustration,
  HealthcareIllustration,
  AgricultureIllustration,
  TechIllustration,
} from "./illustrations";

const INDUSTRIES = [
  {
    id: "retail",
    title: "Retail & E-commerce",
    body: "Peak-season-ready fulfilment, returns, and last-mile that protect your margin.",
    illustration: RetailIllustration,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    body: "Just-in-sequence inbound, plant-to-port flows, and finished-goods distribution.",
    illustration: ManufacturingIllustration,
  },
  {
    id: "mining",
    title: "Mining & Energy",
    body: "Project cargo, abnormal loads, and corridor expertise from pit to port.",
    illustration: MiningIllustration,
  },
  {
    id: "healthcare",
    title: "Healthcare & Pharma",
    body: "Cold-chain compliant, GDP-aligned, audit-ready transport for sensitive cargo.",
    illustration: HealthcareIllustration,
  },
  {
    id: "agri",
    title: "Agriculture",
    body: "Refrigerated and bulk movements that keep produce, grain, and inputs flowing.",
    illustration: AgricultureIllustration,
  },
  {
    id: "tech",
    title: "Tech & Hardware",
    body: "High-value, time-critical movements with white-glove handling and SLA tracking.",
    illustration: TechIllustration,
  },
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, idx) => {
            const Illustration = ind.illustration;
            return (
              <motion.div
                key={ind.id}
                id={ind.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group relative overflow-hidden rounded-3xl border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-kapture-lift dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <Illustration
                  className="h-32 w-full transition-transform duration-500 group-hover:scale-105"
                  tone="light"
                />

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  {ind.body}
                </p>

                <Link
                  href={`/contact?topic=${ind.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-kapture-black transition-all group-hover:gap-2.5 dark:text-kapture-white"
                >
                  Talk to a specialist
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
