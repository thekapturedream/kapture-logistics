"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { KaptureSun } from "./KaptureSun";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent backdrop-blur transition-all",
        scrolled &&
          "border-kapture-fog/60 bg-white/80 dark:border-kapture-ash dark:bg-kapture-black/80",
      )}
    >
      <div className="container-kapture flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base font-bold tracking-tight"
          aria-label="Kapture Logistics — Home"
        >
          <KaptureSun size={26} className="text-kapture-black dark:text-kapture-yellow" />
          <span>
            Kapture<span className="text-kapture-mist">·</span>
            <span className="font-semibold">Logistics</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-kapture px-3 py-2 text-sm font-medium text-kapture-smoke transition-colors hover:bg-kapture-paper hover:text-kapture-black dark:text-kapture-fog dark:hover:bg-kapture-ink dark:hover:text-kapture-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/quote" className="btn-primary hidden md:inline-flex">
            Ship Now
            <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-kapture-fog dark:border-kapture-ash"
            onClick={() => setOpen((s) => !s)}
            aria-label="Open menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-kapture-fog/60 bg-white dark:border-kapture-ash dark:bg-kapture-black md:hidden">
          <div className="container-kapture flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-kapture px-3 py-3 text-sm font-medium text-kapture-smoke hover:bg-kapture-paper dark:text-kapture-fog dark:hover:bg-kapture-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full justify-center"
            >
              Ship Now
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
