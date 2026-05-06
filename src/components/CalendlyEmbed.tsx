"use client";

import * as React from "react";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/utils";

/**
 * Calendly inline embed.
 *
 * Calendly handles the calendar integration end — when a visitor picks a
 * slot, Calendly checks the connected Google Calendar for availability
 * and writes the new booking back to it.
 *
 * Two key behaviours that make the embedded experience feel native:
 *   1. Optional `prefill` populates Calendly's form via URL params
 *      (name, email, company, notes) so the visitor doesn't retype.
 *   2. We listen for Calendly's `event_scheduled` postMessage and
 *      replace the iframe with our own confirmation card — Calendly's
 *      post-booking screen leaves an awkward void inside the embed
 *      otherwise.
 */

type Prefill = {
  name?: string;
  email?: string;
  company?: string;
  notes?: string;
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

type CalendlyEvent = {
  event?: string;
  payload?: {
    event?: { uri?: string; start_time?: string; end_time?: string };
    invitee?: { uri?: string; name?: string; email?: string };
  };
};

function isCalendlyMessage(e: MessageEvent): e is MessageEvent<CalendlyEvent> {
  return (
    typeof e.data === "object" &&
    e.data !== null &&
    typeof (e.data as { event?: unknown }).event === "string" &&
    (e.data as { event: string }).event.startsWith("calendly.")
  );
}

export function CalendlyEmbed({ url, prefill }: Props) {
  const baseUrl = url || SITE.calendlyUrl;
  const embedUrl = baseUrl ? buildEmbedUrl(baseUrl, prefill) : "";
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [scheduled, setScheduled] = React.useState<{
    when?: string;
  } | null>(null);

  // Inject Calendly's widget script + stylesheet exactly once per page.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="calendly.com/assets/external/widget.js"]',
    );
    if (existing) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  // Listen for Calendly's `event_scheduled` postMessage. When the visitor
  // completes a booking, swap the iframe out for a clean confirmation card.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    function onMessage(e: MessageEvent) {
      if (!isCalendlyMessage(e)) return;
      if (e.data.event === "calendly.event_scheduled") {
        const when = e.data.payload?.event?.start_time;
        setScheduled({ when });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // No URL configured — fall back to email contact.
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

  // Booked — replace Calendly's awkward post-booking screen with our own.
  if (scheduled) {
    const formatted = scheduled.when
      ? new Date(scheduled.when).toLocaleString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        })
      : null;
    return (
      <div className="rounded-2xl border border-kapture-yellow bg-kapture-yellow/10 p-7 md:p-8">
        <CheckCircle2 className="text-kapture-amber" size={28} />
        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
          You're booked.
        </h3>
        {formatted ? (
          <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
            See you {formatted}. A confirmation email and calendar invite are on the way.
          </p>
        ) : (
          <p className="mt-2 text-sm text-kapture-smoke dark:text-kapture-fog md:text-base">
            A confirmation email and calendar invite are on the way.
          </p>
        )}
        <a
          href="/"
          className="btn-secondary mt-6 inline-flex"
        >
          Back to home
          <ArrowUpRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border dark:border-kapture-ash">
      {/* Calendly's documented inline-widget container. The script reads
          data-url and mounts an iframe that auto-resizes via postMessage. */}
      <div
        className="calendly-inline-widget w-full"
        data-url={embedUrl}
        style={{ minWidth: 320, height: 720 }}
      />
      {!scriptLoaded && (
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
