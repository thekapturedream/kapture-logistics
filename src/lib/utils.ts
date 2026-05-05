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
  email: "studio@thekapture.com",
  phone: "+44 7352 144677",
  cities: ["London", "Harare", "Johannesburg", "Dubai", "Lusaka"],
  tagline: "Freight & Logistics Solutions Powered by Kapture",
  description:
    "Navigate disruption with confidence. Kapture Logistics unifies managed transportation, multi-modal capacity, and last-mile delivery in one shared operating layer.",
  // Calendly URL for the discovery-call booking step shown after a quote submission.
  // Update once the real event type is created — fallback opens the email composer.
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/kapture/discovery",
};
