"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  ContainerShipIllustration,
  CargoPlaneIllustration,
  TruckIllustration,
  WarehouseIllustration,
  ContainerStackIllustration,
  CustomsIllustration,
  DashboardIllustration,
} from "./illustrations";

type Tone = "light" | "dark" | "yellow";

const SERVICES: {
  id: string;
  title: string;
  body: string;
  illustration: React.ComponentType<{ className?: string; tone?: Tone }>;
  href: string;
  span: string;
  tone: Tone;
}[] = [
  {
    id: "managed",
    title: "Managed Transportation",
    body: "One control tower for every load. Pricing, routing, carrier mix, exceptions — handled.",
    illustration: DashboardIllustration,
    href: "/services#managed",
    span: "md:col-span-2 md:row-span-2",
    tone: "dark",
  },
  {
    id: "multimodal",
    title: "Multi-modal",
    body: "Road, rail, air, sea — surge capacity across modes.",
    illustration: TruckIllustration,
    href: "/services#multimodal",
    span: "",
    tone: "light",
  },
  {
    id: "lastmile",
    title: "Last-mile",
    body: "From port to porch. Same-day metro, scheduled rural drops.",
    illustration: ContainerStackIllustration,
    href: "/services#lastmile",
    span: "",
    tone: "yellow",
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    body: "Bonded warehousing, pick-and-pack, returns, inventory visibility.",
    illustration: WarehouseIllustration,
    href: "/services#supply-chain",
    span: "md:col-span-2",
    tone: "light",
  },
  {
    id: "customs",
    title: "Customs & Trade",
    body: "Borders simplified. Clearance, classification, duty optimisation.",
    illustration: CustomsIllustration,
    href: "/services#customs",
    span: "",
    tone: "light",
  },
  {
    id: "ocean",
    title: "Ocean Freight",
    body: "FCL, LCL, project cargo — direct rates from major Asian and European gateways.",
    illustration: ContainerShipIllustration,
    href: "/services#ocean",
    span: "md:col-span-2",
    tone: "dark",
  },
  {
    id: "air",
    title: "Air Freight",
    body: "Time-critical movements. Charter, express, consolidated.",
    illustration: CargoPlaneIllustration,
    href: "/services#air",
    span: "",
    tone: "light",
  },
];

function cardClass(tone: Tone) {
  if (tone === "dark") {
    return "group relative overflow-hidden rounded-3xl border border-kapture-ash bg-kapture-black p-8 text-kapture-white transition-all duration-300 hover:-translate-y-1";
  }
  if (tone === "yellow") {
    return "group relative overflow-hidden rounded-3xl bg-kapture-yellow p-8 text-kapture-black transition-all duration-300 hover:-translate-y-1 hover:shadow-kapture-lift";
  }
  return "group relative overflow-hidden rounded-3xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-kapture-lift dark:border-kapture-ash dark:bg-kapture-coal";
}

export function BentoServices() {
  return (
    <section className="container-kapture py-24 md:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="chip"><span className="divider-dot" />Services</p>
          <h2 className="h-section mt-4 text-balance">
            Every mode, lane, and milestone.
          </h2>
        </div>
        <Link href="/services" className="btn-secondary">
          Browse all services
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {SERVICES.map((s, idx) => {
          const Illustration = s.illustration;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className={`${cardClass(s.tone)} ${s.span}`}
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <Illustration className="h-32 w-full transition-transform duration-500 group-hover:scale-105" tone={s.tone} />

                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      s.tone === "yellow"
                        ? "text-kapture-black/80"
                        : s.tone === "dark"
                          ? "text-kapture-fog"
                          : "text-kapture-smoke dark:text-kapture-fog"
                    }`}
                  >
                    {s.body}
                  </p>

                  <Link
                    href={s.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                  >
                    Learn more
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
