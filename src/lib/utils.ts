import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Kapture Logistics",
  legalName: "Kapture Studio Ltd.",
  parent: "Kapture",
  parentUrl: process.env.NEXT_PUBLIC_PARENT_BRAND_URL || "https://thekapture.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://logistics.thekapture.com",
  email: "studio@thekapture.com",
  phone: "+44 7352 144677",
  cities: ["London", "Harare", "Johannesburg", "Dubai", "Lusaka"],
  /** UK English locale used for `<html lang>`, OG locale, hreflang, schema. */
  locale: "en-GB",
  /** Year the parent brand was founded — surfaces on Organization schema. */
  foundingYear: "2018",
  tagline: "Freight & Logistics Solutions Powered by Kapture",
  description:
    "Kapture Logistics is a deployable freight and supply-chain system — managed transportation, multi-modal capacity, last-mile delivery and customs in one operating layer. Designed and engineered by Kapture for UK and African corridors.",
  /** Default OG image — must exist in /public. 1200×630 recommended. */
  ogImage: "/og-image.png",
  /** Social handles used for OG/Twitter card metadata. */
  social: {
    twitter: "@thekapture",
    linkedin: "https://www.linkedin.com/company/thekapture/",
    youtube: "https://www.youtube.com/@thekapture",
  },
  /** Registered office address — surfaces on LocalBusiness schema. */
  address: {
    street: "5 Merchant Square",
    locality: "London",
    region: "England",
    postalCode: "W2 1AY",
    country: "United Kingdom",
    countryCode: "GB",
  },
  // Calendly URL for the discovery-call booking step shown after a quote submission.
  // Update once the real event type is created — fallback opens the email composer.
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/kapture/discovery",
};
