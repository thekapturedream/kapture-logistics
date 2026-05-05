import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Kapture Logistics",
  parent: "Kapture",
  parentUrl: process.env.NEXT_PUBLIC_PARENT_BRAND_URL || "https://thekapture.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kapture-logistics.vercel.app",
  email: "hello@thekapture.com",
  phone: "+263 78 000 0000",
  tagline: "Freight & Logistics Solutions Powered by Kapture",
  description:
    "Navigate disruption with confidence. Kapture Logistics unifies managed transportation, multi-modal capacity, and last-mile delivery in one shared operating layer.",
};
