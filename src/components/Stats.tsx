"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "14+", label: "African corridors live" },
  { value: "320", label: "Vetted carriers" },
  { value: "99.2%", label: "On-time pickup rate" },
  { value: "48h", label: "Median customs clearance" },
];

export function Stats() {
  return (
    <section className="border-y border-kapture-fog/60 bg-white dark:border-kapture-ash dark:bg-kapture-black">
      <div className="container-kapture grid grid-cols-2 gap-y-8 py-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="border-l border-kapture-fog/60 pl-6 dark:border-kapture-ash"
          >
            <p className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-kapture-mist">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
