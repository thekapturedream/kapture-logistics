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

  // Over the video hero (top of home), text is white. Once scrolled, normal palette.
  const linkBase = scrolled
    ? "text-kapture-smoke hover:bg-kapture-paper hover:text-kapture-black dark:text-kapture-fog dark:hover:bg-kapture-ink dark:hover:text-kapture-white"
    : "text-white/80 hover:bg-white/10 hover:text-white";

  const brandText = scrolled ? "" : "text-white";
  const sunColor = scrolled ? "text-kapture-black dark:text-kapture-yellow" : "text-kapture-yellow";
  const iconBtn = scrolled
    ? "border-kapture-fog text-kapture-black hover:bg-kapture-black hover:text-kapture-white dark:border-kapture-ash dark:text-kapture-white dark:hover:bg-kapture-white dark:hover:text-kapture-black"
    : "border-white/20 text-white hover:bg-white hover:text-kapture-black";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-transparent backdrop-blur transition-all",
        scrolled &&
          "border-kapture-fog/60 bg-white/80 dark:border-kapture-ash dark:bg-kapture-black/80",
      )}
    >
      <div className="container-kapture flex h-16 items-center justify-between">
        <Link
          href="/"
          className={cn("flex items-center gap-2 font-display text-base font-bold tracking-tight transition-colors", brandText)}
          aria-label="Kapture Logistics — Home"
        >
          <KaptureSun size={26} className={cn("transition-colors", sunColor)} />
          <span>
            Kapture<span className={cn("transition-colors", scrolled ? "text-kapture-mist" : "text-white/50")}>·</span>
            <span className="font-semibold">Logistics</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("rounded-kapture px-3 py-2 text-sm font-medium transition-colors", linkBase)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/quote"
            className={cn(
              "hidden md:inline-flex btn-kapture transition-colors",
              scrolled
                ? "bg-kapture-black text-kapture-white hover:bg-transparent hover:text-kapture-black hover:ring-2 hover:ring-inset hover:ring-kapture-black dark:bg-kapture-white dark:text-kapture-black dark:hover:bg-transparent dark:hover:text-kapture-white dark:hover:ring-kapture-white"
                : "bg-kapture-yellow text-kapture-black hover:bg-kapture-amber",
            )}
          >
            Ship Now
            <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            className={cn("md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors", iconBtn)}
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
