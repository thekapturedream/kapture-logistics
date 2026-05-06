"use client";

import { motion } from "framer-motion";

/**
 * Horizontal bar chart showing the distribution of UK logistics website
 * scores across the five Kapture grades. Visual data lives in the page,
 * matches the report's actual data buckets.
 */

const BUCKETS = [
  { grade: "A · 85+",   percent: 8,  count: 16,  tone: "bg-score-excellent" },
  { grade: "B · 70-84", percent: 17, count: 34,  tone: "bg-score-good" },
  { grade: "C · 55-69", percent: 26, count: 52,  tone: "bg-score-average" },
  { grade: "D · 40-54", percent: 31, count: 62,  tone: "bg-score-weak" },
  { grade: "F · <40",   percent: 18, count: 36,  tone: "bg-score-poor" },
];

export function ScoreDistribution() {
  const max = Math.max(...BUCKETS.map((b) => b.percent));
  return (
    <div className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal md:p-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-kapture-mist">
            Distribution · 200 brands
          </p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight">
            How UK logistics scored
          </p>
        </div>
        <p className="font-display text-3xl font-bold text-score-weak md:text-4xl">
          75%
          <span className="ml-2 text-xs font-normal uppercase tracking-wider text-kapture-mist">
            below B
          </span>
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {BUCKETS.map((b, i) => (
          <div key={b.grade} className="flex items-center gap-4">
            <p className="w-24 shrink-0 font-mono text-xs text-kapture-smoke dark:text-kapture-fog">
              {b.grade}
            </p>
            <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-kapture-paper dark:bg-kapture-ash">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(b.percent / max) * 100}%` }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`h-full ${b.tone}`}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[11px] font-semibold text-kapture-black mix-blend-difference">
                {b.percent}%
              </span>
            </div>
            <p className="w-12 shrink-0 text-right font-mono text-xs text-kapture-mist">
              {b.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
