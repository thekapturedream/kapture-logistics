"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { KaptureSun } from "./KaptureSun";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/state-of-uk-logistics-2026" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const isHome = pathname === "/";
  // Transparent + light foreground only when over the dark video hero.
  // Every other page (or once scrolled past the hero on /) → solid + dark fg.
  const overHero = isHome && !scrolled;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = overHero
    ? "border-transparent bg-transparent"
    : "border-kapture-fog/60 bg-white/85 backdrop-blur-md dark:border-kapture-ash dark:bg-kapture-black/85";

  const linkClass = overHero
    ? "text-white/85 hover:bg-white/10 hover:text-white"
    : "text-kapture-smoke hover:bg-kapture-paper hover:text-kapture-black dark:text-kapture-fog dark:hover:bg-kapture-ink dark:hover:text-kapture-white";

  const brandText = overHero ? "text-white" : "text-kapture-black dark:text-kapture-white";
  const sunBody = overHero ? "text-white" : "text-kapture-black dark:text-kapture-white";

  const iconBtn = overHero
    ? "border-white/20 text-white hover:bg-white hover:text-kapture-black"
    : "border-kapture-fog text-kapture-black hover:bg-kapture-black hover:text-kapture-white dark:border-kapture-ash dark:text-kapture-white dark:hover:bg-kapture-white dark:hover:text-kapture-black";

  // Ship Now is white over the hero (high contrast vs. dark video). Once
  // scrolled past, it flips to a high-contrast solid that survives the white
  // nav background in light mode and the black nav background in dark mode —
  // a flat white button on white would otherwise vanish.
  const cta = overHero
    ? "bg-white text-kapture-black hover:bg-kapture-paper"
    : "bg-kapture-black text-kapture-white hover:bg-transparent hover:text-kapture-black hover:ring-2 hover:ring-inset hover:ring-kapture-black dark:bg-white dark:text-kapture-black dark:hover:bg-transparent dark:hover:text-white dark:hover:ring-white";

  return (
    <header className={cn("fixed top-0 z-50 w-full border-b transition-all", headerBg)}>
      <div className="container-kapture flex h-16 items-center justify-between">
        <Link
          href="/"
          className={cn("flex items-center gap-3 font-display text-base lowercase tracking-wide transition-colors", brandText)}
          aria-label="Kapture Logistics — Home"
        >
          <KaptureSun size={26} className={cn("transition-colors", sunBody)} />
          <span className="flex items-center gap-2">
            <span className="font-semibold">kapture</span>
            <span className={cn("transition-colors", overHero ? "text-white/40" : "text-kapture-mist")}>·</span>
            <span className="font-medium">logistics</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("rounded-kapture px-3 py-2 text-sm font-medium transition-colors", linkClass)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggleInline overHero={overHero} />
          <Link
            href="/contact"
            className={cn(
              // Navbar-only override: 40px height, narrower padding, smaller text.
              // The min-h-0 cancels the global .btn-kapture 50px floor.
              "hidden md:inline-flex btn-kapture !min-h-0 h-10 px-4 text-xs transition-colors",
              cta,
            )}
          >
            Contact
            <ArrowUpRight size={14} />
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
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full justify-center"
            >
              Contact
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * Theme toggle that adapts to whether the navbar is currently over the
 * dark hero (light foreground) or sitting on a normal page (themed).
 */
function ThemeToggleInline({ overHero: _overHero }: { overHero: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  // Always Kapture yellow with black icon — the only persistently yellow chip
  // in the navbar so it always reads as "the action you can take here."
  // Hover darkens to amber. Same treatment over the hero video, over light
  // mode, and over dark mode — the toggle stands out everywhere.
  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-kapture-yellow text-kapture-black shadow-kapture-yellow transition-all hover:bg-kapture-amber"
    >
      {mounted ? (
        isDark ? <Sun size={14} /> : <Moon size={14} />
      ) : (
        <span className="block h-3 w-3 rounded-full bg-kapture-black/20" />
      )}
    </button>
  );
}
