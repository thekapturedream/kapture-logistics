"use client";

import * as React from "react";
import { SITE } from "@/lib/utils";

/**
 * Calendly inline embed. Loads the Calendly widget script lazily, exactly
 * once, and renders the inline-widget container. Falls back to a plain
 * "open Calendly in new tab" link if the URL is missing.
 *
 * Used in the success state after a freight quote submission — turning every
 * quote request into a booked discovery call with the Kapture team.
 */
export function CalendlyEmbed({ url }: { url?: string }) {
  const calendlyUrl = url || SITE.calendlyUrl;
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="calendly.com/assets/external/widget.js"]',
    );
    if (existing) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  if (!calendlyUrl) {
    return (
      <div className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal">
        <p className="text-sm text-kapture-smoke dark:text-kapture-fog">
          Booking widget not configured. <a href={`mailto:${SITE.email}`} className="font-semibold text-kapture-black underline dark:text-kapture-white">Email us</a> to schedule.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border dark:border-kapture-ash">
      <div
        className="calendly-inline-widget min-h-[640px] w-full"
        data-url={calendlyUrl}
        style={{ minHeight: 640 }}
      />
      {!loaded && (
        <div className="px-6 py-4 text-xs text-kapture-mist">
          Loading Calendly… If it doesn't appear,{" "}
          <a href={calendlyUrl} target="_blank" rel="noreferrer" className="underline">
            open in a new tab
          </a>.
        </div>
      )}
    </div>
  );
}
