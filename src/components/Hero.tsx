"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, PackageSearch, Truck, Plane, Ship, Navigation } from "lucide-react";
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
];

export function Hero() {
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>("road");
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [cargo, setCargo] = React.useState("Pallet");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ mode, origin, destination, cargo });
    router.push(`/quote?${params.toString()}`);
  }

  return (
    <section className="relative isolate -mt-16 overflow-hidden bg-kapture-black">
      {/* Solid black underlay — guarantees pure black until video has frames */}
      <div className="absolute inset-0 -z-30 bg-kapture-black" aria-hidden="true" />

      {/* Video background — opacity 70% (blends with black underlay) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%201%201%27%3E%3Crect%20width%3D%271%27%20height%3D%271%27%20fill%3D%27%230A0A0A%27%2F%3E%3C%2Fsvg%3E"
        className="absolute inset-0 -z-20 h-full w-full bg-kapture-black object-cover opacity-70"
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Subtle dim — keeps headline legible at top, form area legible at bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black/45"
      />

      <div className="container-kapture relative pb-24 pt-24 md:pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-kapture-yellow" />
            Freight & Logistics, Powered by Kapture
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-hero-xl text-balance text-white"
          >
            Move anything,{" "}
            <span className="relative inline-block">
              anywhere
              <span className="absolute -bottom-1 left-0 h-2 w-full -skew-x-6 bg-kapture-yellow" aria-hidden />
            </span>
            .
          </motion.h1>
        </div>

        {/* Freight calculator — looks like a real logistics quote desk.
            Submission flows to /quote, where it captures full freight details
            and converts the lead through a Kapture appointment-booking step. */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/95 p-3 shadow-2xl backdrop-blur-md dark:bg-kapture-ink/95 md:p-4"
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
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Pickup location"
                className="field h-14 pl-12 text-base"
              />
            </label>

            <label className="relative">
              <span className="sr-only">Drop-off location</span>
              <Navigation size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Drop-off location"
                className="field h-14 pl-12 text-base"
              />
            </label>

            <label className="relative md:w-48">
              <span className="sr-only">Cargo type</span>
              <PackageSearch size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-kapture-mist" />
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="field h-14 appearance-none pl-12 pr-8 text-base"
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

            <button type="submit" className="btn-primary h-14 px-7 text-base">
              See Prices
              <ArrowRight size={18} />
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kapture-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-kapture-yellow" />
            </span>
            2,148 active shipments
          </span>
          <span className="hidden md:inline">·</span>
          <span>99.2% on-time</span>
          <span className="hidden md:inline">·</span>
          <span>320+ vetted carriers</span>
          <span className="hidden md:inline">·</span>
          <span>14 corridors</span>
        </motion.div>
      </div>
    </section>
  );
}
