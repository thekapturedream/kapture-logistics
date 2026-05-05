import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Kapture Logistics",
  parent: "Kapture",
  studio: "Kapture Studio",
  parentUrl: process.env.NEXT_PUBLIC_PARENT_BRAND_URL || "https://thekapture.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kapture-logistics.vercel.app",
  email: "studio@thekapture.com",
  phone: "+44 7352 144677",
  cities: ["London", "Harare", "Johannesburg", "Dubai", "Lusaka"],
  tagline: "Make this website yours.",
  description:
    "A fully built, end-to-end logistics platform — design system, lead capture, customer database, admin panel — yours in 24 hours by Kapture Studio.",

  // ── Template-for-sale economics ──
  // This site is itself a Kapture Studio product. Update these as pricing evolves.
  template: {
    price: "£2,500",
    priceFromLabel: "from £2,500",
    customBuildPriceLabel: "from £8,500",
    deliveryHours: 24,
    delivery: "Live in 24 hours",
    onceOff: "one-off · setup included",
    included: [
      "Full Next.js + Tailwind code repository (yours to keep)",
      "Hosted on Vercel — zero ops, global CDN, auto-deploys",
      "Supabase database wired for leads, customers, audits",
      "Branded design system in your colours and fonts",
      "Multi-page logistics site with quote calculator",
      "Light + dark mode, mobile-first, accessibility-ready",
      "30-day post-launch support window with Kapture Studio",
    ],
  },
};
