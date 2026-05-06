"use client";

import { motion } from "framer-motion";

/**
 * Side-by-side comparison: AI-integrated logistics brands vs traditional.
 * Visual evidence of the central thesis — AI is the survival line.
 */

const METRICS = [
  { label: "Win-rate on tenders",   ai: 72, traditional: 31, unit: "%" },
  { label: "Year-on-year revenue",  ai: 18, traditional: 4,  unit: "% growth" },
  { label: "Inbound leads / month", ai: 84, traditional: 12, unit: " avg" },
  { label: "Operating margin",      ai: 14, traditional: 6,  unit: "%" },
];

export function AiAdoptionChart() {
  return (
    <div className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal md:p-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-kapture-mist">
            The dividing line
          </p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight">
            AI-integrated vs traditional
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider">
          <span className="inline-flex items-center gap-2 text-kapture-yellow">
            <span className="inline-block h-2 w-2 rounded-full bg-kapture-yellow" />
            AI
          </span>
          <span className="inline-flex items-center gap-2 text-kapture-mist">
            <span className="inline-block h-2 w-2 rounded-full bg-kapture-mist" />
            Traditional
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {METRICS.map((m, i) => {
          const max = Math.max(m.ai, m.traditional);
          return (
            <div key={m.label}>
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">{m.label}</p>
                <p className="font-mono text-xs text-kapture-mist">
                  {m.ai}{m.unit} <span className="text-kapture-fog">vs</span> {m.traditional}{m.unit}
                </p>
              </div>

              <div className="mt-2 grid gap-1.5">
                <div className="relative h-4 overflow-hidden rounded-full bg-kapture-paper dark:bg-kapture-ash">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.ai / max) * 100}%` }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-kapture-yellow"
                  />
                </div>
                <div className="relative h-4 overflow-hidden rounded-full bg-kapture-paper dark:bg-kapture-ash">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.traditional / max) * 100}%` }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.1, delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-kapture-mist/60"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 border-t border-kapture-fog/60 pt-5 text-xs text-kapture-mist dark:border-kapture-ash">
        Source · Kapture Studio audit of 200 UK logistics websites, 2026.
      </p>
    </div>
  );
}
