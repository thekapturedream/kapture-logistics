import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers, Truck, PackageCheck, Globe2, Plane, Radar, Ship } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Services — Freight, Multi-modal, Last-mile, Customs",
  description:
    "Managed transportation, multi-modal capacity, supply chain, customs, and last-mile delivery — built into one Kapture operating layer.",
};

const SERVICES = [
  {
    id: "managed",
    icon: Layers,
    eyebrow: "Managed Transportation",
    title: "Run your transport like a category leader.",
    body: "We design, run, and continuously optimise your full transport programme. Pricing strategy, carrier mix, lane engineering, and exception management — wired to your KPIs.",
    bullets: ["Lane engineering & rate strategy", "Carrier vetting & SLA management", "Control-tower exception handling", "Quarterly business reviews"],
  },
  {
    id: "multimodal",
    icon: Truck,
    eyebrow: "Multi-modal Capacity",
    title: "Road, rail, air, sea — one number to call.",
    body: "Surge capacity across modes. Pre-vetted carriers, instant rate cards, and switching logic when one mode breaks.",
    bullets: ["Road FTL & LTL across SADC", "Air freight to/from major hubs", "Ocean FCL/LCL & project cargo", "Rail integration on key corridors"],
  },
  {
    id: "lastmile",
    icon: PackageCheck,
    eyebrow: "Last-mile Delivery",
    title: "From port to porch, with proof.",
    body: "Same-day, next-day, and scheduled delivery across cities, peri-urban, and rural drops — with proof of delivery at every touch.",
    bullets: ["Same-day metro coverage", "Scheduled rural drops", "Photo & signature POD", "Returns & failed-delivery flows"],
  },
  {
    id: "supply-chain",
    icon: Globe2,
    eyebrow: "Supply Chain Solutions",
    title: "Warehouse, fulfil, and visualise — all under one roof.",
    body: "Bonded and general warehousing, pick-and-pack fulfilment, returns, and full inventory visibility wired into your stack.",
    bullets: ["Bonded warehousing", "Pick, pack & ship", "Returns management", "WMS / OMS integrations"],
  },
  {
    id: "customs",
    icon: Plane,
    eyebrow: "Customs & Trade",
    title: "Borders, simplified.",
    body: "Clearance, classification, duty optimisation, and trade-corridor expertise — built for SADC, EAC, and beyond.",
    bullets: ["Clearance at all major posts", "HS classification & duty optimisation", "Trade agreement utilisation", "Bonded movements & transit"],
  },
  {
    id: "platform",
    icon: Radar,
    eyebrow: "Kapture Platform",
    title: "Visibility you can ship websites with.",
    body: "Real-time tracking, SLA monitoring, exception alerts, and APIs that connect to anything you already use.",
    bullets: ["Real-time GPS tracking", "SLA & exception monitoring", "REST & webhook APIs", "Branded customer portals"],
  },
  {
    id: "ocean",
    icon: Ship,
    eyebrow: "Ocean Freight",
    title: "Container freight, without the runaround.",
    body: "Direct rates, consolidated boxes, and project freight from major Asian and European gateways into Africa.",
    bullets: ["FCL 20ft / 40ft", "LCL consolidation", "Project & break-bulk", "Door-to-door coverage"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Freight & logistics services, designed to be deployed."
        lede="Pick a service or stack them. Every Kapture engagement is wired into the same platform, the same control tower, the same accountability."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/quote" className="btn-primary">
            Get a quote
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            Talk to a strategist
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </PageHeader>

      <div className="container-kapture py-24">
        <div className="space-y-24">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="grid scroll-mt-24 gap-10 border-b border-kapture-fog/60 pb-24 last:border-0 last:pb-0 dark:border-kapture-ash lg:grid-cols-12"
              >
                <div className="lg:col-span-5">
                  <div className="rounded-full inline-flex bg-kapture-paper p-3 text-kapture-black dark:bg-kapture-coal dark:text-kapture-white">
                    <Icon size={20} />
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-kapture-mist">
                    {s.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                    {s.title}
                  </h2>
                </div>

                <div className="lg:col-span-7">
                  <p className="lede">{s.body}</p>
                  <ul className="mt-8 grid gap-3 md:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 rounded-xl border bg-white p-4 text-sm dark:border-kapture-ash dark:bg-kapture-coal"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-kapture-yellow" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/quote?service=${s.id}`} className="btn-primary">
                      Get a {s.eyebrow.split(" ")[0].toLowerCase()} quote
                      <ArrowUpRight size={14} />
                    </Link>
                    <Link href={`/contact?topic=${s.id}`} className="btn-secondary">
                      Speak to a specialist
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CTA />
    </>
  );
}
