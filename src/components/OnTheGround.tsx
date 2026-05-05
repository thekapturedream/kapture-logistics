"use client";

import { motion } from "framer-motion";

/**
 * Image showcase strip — black-and-white logistics photography on Unsplash.
 * Each tile renders inside a dark fallback so a network failure never
 * leaves a broken-image icon. CSS grayscale + contrast enforces B&W
 * regardless of the source photo's colour grading.
 */
const TILES = [
  {
    src: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1200&q=80",
    alt: "Container terminal at dawn",
    corridor: "Walvis Bay",
    label: "Ocean gateway",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    alt: "Long-haul truck on open road",
    corridor: "Beitbridge → Durban",
    label: "Road corridor",
  },
  {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    alt: "Warehouse interior with stacked pallets",
    corridor: "Midrand",
    label: "Bonded facility",
  },
  {
    src: "https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1200&q=80",
    alt: "Cargo plane on the tarmac",
    corridor: "Nairobi",
    label: "Air freight",
  },
];

export function OnTheGround() {
  return (
    <section className="bg-kapture-paper dark:bg-kapture-ink">
      <div className="container-kapture py-24 md:py-32">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="chip">
              <span className="divider-dot" />
              On the ground
            </p>
            <h2 className="h-section mt-4 text-balance">
              Where Kapture moves cargo today.
            </h2>
            <p className="lede mt-4">
              Live operations across road, rail, ocean, and air. One operating layer, every
              corridor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile, idx) => (
            <motion.figure
              key={tile.corridor}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-kapture-coal"
            >
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="h-full w-full object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />

              {/* Dim gradient for caption legibility */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-kapture-white">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-kapture-yellow">
                  {tile.label}
                </p>
                <p className="mt-1 font-display text-lg font-bold tracking-tight">
                  {tile.corridor}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
