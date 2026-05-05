"use client";

import { motion } from "framer-motion";
import { ClipboardList, Compass, Truck, BarChart4 } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Tell us the lane",
    body: "Origin, destination, cargo, timing. Thirty seconds at the hero or a deeper brief at the quote desk.",
    icon: ClipboardList,
  },
  {
    n: "02",
    title: "We design the route",
    body: "Mode mix, carrier selection, customs path. Priced and committed within hours, not days.",
    icon: Compass,
  },
  {
    n: "03",
    title: "We move the goods",
    body: "Live visibility, exception alerts, proof at every milestone — pickup, border, drop.",
    icon: Truck,
  },
  {
    n: "04",
    title: "You see the data",
    body: "Cost, performance, sustainability. Quarterly reviews wired into your KPIs.",
    icon: BarChart4,
  },
];

export function HowItWorks() {
  return (
    <section className="container-kapture py-24 md:py-32">
      <div className="mb-12 max-w-3xl">
        <p className="chip">
          <span className="divider-dot" />
          How Kapture moves
        </p>
        <h2 className="h-section mt-4 text-balance">
          From quote to delivery, on one operating thread.
        </h2>
        <p className="lede mt-4">
          A single team owns your shipment end-to-end. No handoffs, no finger-pointing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-kapture-fog dark:border-kapture-ash dark:bg-kapture-ash md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="bg-white p-8 dark:bg-kapture-coal"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-kapture-mist">{s.n}</span>
                <Icon size={18} className="text-kapture-yellow" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                {s.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
