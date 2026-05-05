"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, PackageSearch, Truck, Plane, Ship, Navigation } from "lucide-react";
import { KaptureSun } from "./KaptureSun";
import { cn } from "@/lib/utils";

type Mode = "road" | "air" | "sea" | "express";

const MODES: { id: Mode; label: string; icon: React.ReactNode }[] = [
  { id: "road", label: "Road", icon: <Truck size={14} /> },
  { id: "air", label: "Air", icon: <Plane size={14} /> },
  { id: "sea", label: "Sea", icon: <Ship size={14} /> },
  { id: "express", label: "Express", icon: <Navigation size={14} /> },
];

const POPULAR_LANES = [
  "Harare → Johannesburg",
  "Lusaka → Dar es Salaam",
  "Beitbridge → Durban",
  "Lagos → Accra",
  "Nairobi → Kigali",
];

export function Hero() {
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>("road");
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [cargo, setCargo] = React.useState("Pallet");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      mode,
      origin,
      destination,
      cargo,
    });
    router.push(`/quote?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg" />

      <div className="container-kapture grid items-center gap-14 pb-24 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-10">
        {/* LEFT — headline-as-CTA + form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip"
          >
            <span className="divider-dot" />
            Freight & Logistics, Powered by Kapture
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-hero-xl text-balance text-kapture-black dark:text-kapture-white"
          >
            Move anything, <span className="relative inline-block">anywhere<span className="absolute -bottom-1 left-0 h-2 w-full -skew-x-6 bg-kapture-yellow" aria-hidden /></span>
            <br className="hidden md:block" />
            with Kapture.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lede mt-6 max-w-xl"
          >
            Navigate disruption with confidence. One operating layer for managed transportation,
            multi-modal capacity, and last-mile delivery — across Africa and beyond.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 rounded-2xl border bg-white p-3 shadow-kapture-soft dark:border-kapture-ash dark:bg-kapture-ink"
          >
            <div className="flex flex-wrap items-center gap-1 px-2 pb-3 pt-1">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                    mode === m.id
                      ? "bg-kapture-black text-kapture-white dark:bg-kapture-white dark:text-kapture-black"
                      : "text-kapture-smoke hover:bg-kapture-paper dark:text-kapture-fog dark:hover:bg-kapture-coal",
                  )}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>

            <div className="grid gap-2 md:grid-cols-[1fr,1fr,auto,auto]">
              <label className="relative">
                <span className="sr-only">Pickup location</span>
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
                <input
                  type="text"
                  required
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Pickup location"
                  className="field h-12 pl-11"
                />
              </label>

              <label className="relative">
                <span className="sr-only">Drop-off location</span>
                <Navigation size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Drop-off location"
                  className="field h-12 pl-11"
                />
              </label>

              <label className="relative md:w-44">
                <span className="sr-only">Cargo type</span>
                <PackageSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist pointer-events-none" />
                <select
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="field h-12 appearance-none pl-11 pr-8"
                >
                  <option>Pallet</option>
                  <option>Container (20ft)</option>
                  <option>Container (40ft)</option>
                  <option>Bulk</option>
                  <option>Refrigerated</option>
                  <option>Oversize</option>
                  <option>Documents</option>
                </select>
              </label>

              <button type="submit" className="btn-primary h-12 px-6">
                See Prices
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 px-2 pb-1 pt-3">
              <span className="text-[11px] uppercase tracking-wider text-kapture-mist">
                Popular lanes
              </span>
              {POPULAR_LANES.map((lane) => {
                const [o, d] = lane.split("→").map((s) => s.trim());
                return (
                  <button
                    key={lane}
                    type="button"
                    onClick={() => {
                      setOrigin(o);
                      setDestination(d);
                    }}
                    className="rounded-full border px-3 py-1 text-[11px] font-medium text-kapture-smoke transition-colors hover:border-kapture-black hover:text-kapture-black dark:border-kapture-ash dark:text-kapture-fog dark:hover:border-kapture-white dark:hover:text-kapture-white"
                  >
                    {lane}
                  </button>
                );
              })}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-kapture-mist"
          >
            <span>Trusted across 14 corridors</span>
            <span>·</span>
            <span>99.2% on-time</span>
            <span>·</span>
            <span>Real-time visibility</span>
            <span>·</span>
            <span>SADC & EAC native</span>
          </motion.div>
        </div>

        {/* RIGHT — visual sun + stats */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 rounded-3xl bg-kapture-black dark:bg-kapture-ink" />
            <div className="absolute inset-px rounded-[calc(theme(borderRadius.3xl)-1px)] bg-gradient-to-br from-kapture-ink via-kapture-black to-kapture-coal" />
            <div className="relative flex h-full flex-col justify-between p-8 text-kapture-white">
              <div className="flex items-start justify-between">
                <div className="chip border-kapture-ash text-kapture-fog">
                  <span className="divider-dot" />
                  Live
                </div>
                <KaptureSun size={56} className="text-kapture-yellow" spin />
              </div>

              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-kapture-mist">Active shipments</p>
                <p className="font-display text-5xl font-bold tracking-tight">2,148</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <Stat label="On-time" value="99.2%" />
                  <Stat label="Lanes" value="14" />
                  <Stat label="Carriers" value="320+" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-kapture-mist">{label}</p>
      <p className="font-display text-lg font-semibold">{value}</p>
    </div>
  );
}
