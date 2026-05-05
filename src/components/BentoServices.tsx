"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck,
  Layers,
  Plane,
  Ship,
  PackageCheck,
  Globe2,
  Radar,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    id: "managed",
    title: "Managed Transportation",
    sub: "One control tower for every load.",
    body:
      "We design, run, and optimise your end-to-end transportation programme — pricing, routing, carrier mix, and exceptions — so your team ships outcomes, not paperwork.",
    icon: Layers,
    cta: { label: "Talk to a strategist", href: "/contact?topic=managed" },
    span: "md:col-span-2 md:row-span-2",
    tone: "dark" as const,
  },
  {
    id: "multimodal",
    title: "Multi-modal Capacity",
    sub: "Road · Rail · Air · Sea.",
    body:
      "Surge capacity across modes, pre-vetted carriers, and instant rate cards on the lanes that matter most.",
    icon: Truck,
    cta: { label: "Get capacity", href: "/services#multimodal" },
    span: "",
    tone: "light" as const,
  },
  {
    id: "lastmile",
    title: "Last-mile Delivery",
    sub: "From port to porch.",
    body:
      "Same-day, next-day, and scheduled — across cities, peri-urban, and rural drops, with proof at every touch.",
    icon: PackageCheck,
    cta: { label: "Last-mile coverage", href: "/services#lastmile" },
    span: "",
    tone: "yellow" as const,
  },
  {
    id: "supply-chain",
    title: "Supply Chain Solutions",
    sub: "Warehouse, fulfilment, control.",
    body:
      "Bonded warehousing, pick-and-pack, returns, and full inventory visibility wired into your stack.",
    icon: Globe2,
    cta: { label: "Tour our facilities", href: "/services#supply-chain" },
    span: "md:col-span-2",
    tone: "light" as const,
  },
  {
    id: "customs",
    title: "Customs & Trade",
    sub: "Borders, simplified.",
    body:
      "Clearance, classification, duty optimisation, and SADC trade-corridor expertise built in.",
    icon: Plane,
    cta: { label: "Clear your goods", href: "/services#customs" },
    span: "",
    tone: "light" as const,
  },
  {
    id: "platform",
    title: "Kapture Platform",
    sub: "Visibility you can ship websites with.",
    body:
      "Real-time tracking, SLAs, exception alerts, and APIs that connect to anything you already use.",
    icon: Radar,
    cta: { label: "See the platform", href: "/services#platform" },
    span: "md:col-span-2",
    tone: "dark" as const,
  },
  {
    id: "ocean",
    title: "Ocean Freight",
    sub: "FCL, LCL, project cargo.",
    body:
      "Direct rates, consolidated boxes, and project freight from major Asian and European gateways.",
    icon: Ship,
    cta: { label: "Quote a container", href: "/quote?cargo=Container%20(40ft)" },
    span: "",
    tone: "light" as const,
  },
];

export function BentoServices() {
  return (
    <section className="container-kapture py-24 md:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="chip">
            <span className="divider-dot" />
            What we move
          </p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            One operating layer. Every mode, lane, and milestone.
          </h2>
        </div>
        <Link href="/services" className="btn-secondary">
          Browse all services
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {SERVICES.map((s, idx) => {
          const Icon = s.icon;
          const cardClass =
            s.tone === "dark"
              ? "bento-card-dark"
              : s.tone === "yellow"
                ? "bento-card-yellow"
                : "bento-card";

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className={`group ${cardClass} ${s.span}`}
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={
                        s.tone === "dark"
                          ? "rounded-full bg-kapture-coal p-2.5 text-kapture-yellow"
                          : s.tone === "yellow"
                            ? "rounded-full bg-kapture-black p-2.5 text-kapture-yellow"
                            : "rounded-full bg-kapture-paper p-2.5 text-kapture-black dark:bg-kapture-coal dark:text-kapture-white"
                      }
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-wider ${
                        s.tone === "yellow" ? "text-kapture-black/70" : "text-kapture-mist"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      s.tone === "yellow"
                        ? "text-kapture-black/80"
                        : "text-kapture-yellow"
                    }`}
                  >
                    {s.sub}
                  </p>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      s.tone === "yellow"
                        ? "text-kapture-black/80"
                        : s.tone === "dark"
                          ? "text-kapture-fog"
                          : "text-kapture-smoke dark:text-kapture-fog"
                    }`}
                  >
                    {s.body}
                  </p>
                </div>
                <Link
                  href={s.cta.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-all ${
                    s.tone === "yellow"
                      ? "text-kapture-black hover:gap-3"
                      : "hover:gap-3"
                  }`}
                >
                  {s.cta.label}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
