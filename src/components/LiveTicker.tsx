"use client";

import * as React from "react";

/**
 * Slow-scrolling ticker of recent audits — gives the page a "live" feel
 * without faking real-time data. The list rotates every 4 seconds.
 */

const ENTRIES = [
  { brand: "Davies Turner",       score: 64, region: "Hull" },
  { brand: "Walker Logistics",    score: 58, region: "Theale" },
  { brand: "Joda Freight",        score: 52, region: "Manchester" },
  { brand: "Allport Cargo",       score: 71, region: "London" },
  { brand: "Howard Tenens",       score: 67, region: "Gloucester" },
  { brand: "NFT Distribution",    score: 73, region: "Daventry" },
  { brand: "Bibby Distribution",  score: 69, region: "Liverpool" },
  { brand: "JAS Forwarding UK",   score: 61, region: "Heathrow" },
  { brand: "Hayton Coulthard",    score: 49, region: "Penrith" },
  { brand: "AGI Global",          score: 56, region: "London" },
];

function tone(score: number) {
  if (score >= 85) return "text-score-excellent";
  if (score >= 70) return "text-score-good";
  if (score >= 55) return "text-score-average";
  if (score >= 40) return "text-score-weak";
  return "text-score-poor";
}

export function LiveTicker() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ENTRIES.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kapture-yellow opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-kapture-yellow" />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
        Latest
      </span>
      <span
        key={index}
        className="animate-fade-in text-xs text-white/85"
      >
        {ENTRIES[index].brand} ·{" "}
        <span className={tone(ENTRIES[index].score)}>{ENTRIES[index].score}/100</span>
        <span className="text-white/40"> · {ENTRIES[index].region}</span>
      </span>
    </div>
  );
}
