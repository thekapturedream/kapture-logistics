"use client";

import * as React from "react";
import { SITE } from "@/lib/utils";

/**
 * Calendly inline embed.
 *
 * The booking widget is wired to whatever Calendly event type lives at
 * NEXT_PUBLIC_CALENDLY_URL. Calendly itself owns the calendar integration
 * — when the visitor picks a slot, Calendly checks Kapture's connected
 * Google Calendar for availability and writes the new booking back to it.
 *
 * Optional `prefill` lets the booking screen open with the visitor's
 * name, email, company, and notes pre-populated from the form they just
 * submitted — no double data entry.
 */

type Prefill = {
  name?: string;
  email?: string;
  company?: string;
  notes?: string;
  /** Custom answer slots — Calendly maps these to a1, a2, a3 in your event type. */
  a1?: string;
  a2?: string;
  a3?: string;
};

type Props = {
  url?: string;
  prefill?: Prefill;
};

function buildEmbedUrl(base: string, prefill?: Prefill): string {
  const params = new URLSearchParams();
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);
  if (prefill?.company) params.set("a1", prefill.company);
  if (prefill?.notes) params.set("a2", prefill.notes);
  if (prefill?.a1) params.set("a1", prefill.a1);
  if (prefill?.a2) params.set("a2", prefill.a2);
  if (prefill?.a3) params.set("a3", prefill.a3);
  // Cleaner embed UX
  params.set("hide_event_type_details", "1");
  params.set("hide_gdpr_banner", "1");
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${params.toString()}`;
}

export function CalendlyEmbed({ url, prefill }: Props) {
  const baseUrl = url || SITE.calendlyUrl;
  const embedUrl = baseUrl ? buildEmbedUrl(baseUrl, prefill) : "";
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

  if (!baseUrl) {
    return (
      <div className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal">
        <p className="text-sm text-kapture-smoke dark:text-kapture-fog">
          Booking widget not configured.{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-kapture-black underline dark:text-kapture-white"
          >
            Email us
          </a>{" "}
          to schedule.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border dark:border-kapture-ash">
      <div
        className="calendly-inline-widget min-h-[640px] w-full"
        data-url={embedUrl}
        style={{ minHeight: 640 }}
      />
      {!loaded && (
        <div className="px-6 py-4 text-xs text-kapture-mist">
          Loading Calendly… If it doesn't appear,{" "}
          <a href={embedUrl} target="_blank" rel="noreferrer" className="underline">
            open in a new tab
          </a>
          .
        </div>
      )}
    </div>
  );
}
