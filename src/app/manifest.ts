import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

/**
 * Web App Manifest — exposed at /manifest.webmanifest.
 *
 * Makes the site installable on mobile (Add to Home Screen on iOS,
 * Install App on Android Chrome). PWA install is a positive signal in
 * Lighthouse and a small ranking nudge in Google's mobile-first index.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Kapture",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#FFD400",
    lang: SITE.locale,
    orientation: "portrait",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
    categories: ["business", "productivity", "logistics", "transportation"],
  };
}
