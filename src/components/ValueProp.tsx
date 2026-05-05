"use client";

import { motion } from "framer-motion";
import { Compass, Layers, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Compass,
    title: "One operating layer",
    body: "Managed transport, multi-modal capacity, last-mile — wired into the same control tower, the same accountability.",
  },
  {
    icon: Layers,
    title: "Africa-native, world-fluent",
    body: "Native muscle on SADC and EAC corridors. Direct routes into and out of every major global gateway.",
  },
  {
    icon: ShieldCheck,
    title: "Operators, not observers",
    body: "We run lanes, not slide decks. One Kapture team owns your shipment end to end. One number to call.",
  },
];

export function ValueProp() {
  return (
    <section className="container-kapture py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="chip mx-auto"><span className="divider-dot" />Why Kapture</p>
        <h2 className="mt-6 font-display text-section text-balance md:text-[clamp(2.25rem,4vw,3.5rem)]">
          Navigate disruption with confidence.
        </h2>
        <p className="lede mt-6 mx-auto max-w-2xl">
          Kapture Logistics unifies managed transportation, multi-modal capacity, and last-mile
          delivery in one shared operating layer — built for ambitious operators moving across
          Africa and the world.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border bg-white p-7 dark:border-kapture-ash dark:bg-kapture-coal"
            >
              <div className="inline-flex rounded-full bg-kapture-paper p-3 text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                {p.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
