"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Eye, X } from "lucide-react";
import { SITE } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Persistent strip at the very top of the page that frames everything below it
 * as a Kapture Studio template demo. Dismissible — preference saved to
 * sessionStorage so it stays gone for the rest of the session.
 */
export function TemplateBanner() {
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const dismissed = window.sessionStorage.getItem("kapture-banner-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    setVisible(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("kapture-banner-dismissed", "1");
    }
  }

  if (!mounted || !visible) return null;

  return (
    <div className={cn("relative z-[60] w-full bg-kapture-yellow text-kapture-black")}>
      <div className="container-kapture flex items-center justify-between gap-3 py-2 text-xs font-medium md:text-sm">
        <div className="flex items-center gap-2 truncate">
          <Eye size={14} className="shrink-0" />
          <span className="truncate">
            <span className="font-bold">You're looking at a {SITE.studio} template.</span>
            <span className="hidden sm:inline"> Yours from {SITE.template.priceFromLabel}, live in {SITE.template.deliveryHours} hours.</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/quote?intent=template"
            className="hidden sm:inline-flex items-center gap-1 rounded-full bg-kapture-black px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-kapture-yellow transition-all hover:bg-kapture-coal"
          >
            Make it yours
            <ArrowUpRight size={11} />
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss banner"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-kapture-black/10"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
