import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { KaptureSun } from "./KaptureSun";
import { SITE } from "@/lib/utils";

const COLS = [
  {
    title: "Move",
    links: [
      { label: "Get a Quote", href: "/quote" },
      { label: "Track Shipment", href: "/contact?topic=tracking" },
      { label: "Become a Carrier", href: "/contact?topic=carrier" },
      { label: "Customs Help", href: "/services#customs" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Managed Transport", href: "/services#managed" },
      { label: "Multi-modal", href: "/services#multimodal" },
      { label: "Last-mile", href: "/services#lastmile" },
      { label: "Supply Chain", href: "/services#supply-chain" },
      { label: "Customs & Trade", href: "/services#customs" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Retail & E-commerce", href: "/solutions#retail" },
      { label: "Manufacturing", href: "/solutions#manufacturing" },
      { label: "Mining & Energy", href: "/solutions#mining" },
      { label: "Healthcare", href: "/solutions#healthcare" },
      { label: "Agriculture", href: "/solutions#agri" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Kapture", href: "/about" },
      { label: "Insights", href: "/state-of-uk-logistics-2026" },
      { label: "Careers", href: "/contact?topic=careers" },
      { label: "Press", href: "/contact?topic=press" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 border-t border-kapture-fog/60 bg-kapture-paper dark:border-kapture-ash dark:bg-kapture-ink">
      <div className="container-kapture py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 font-display text-lg lowercase tracking-wide">
              <KaptureSun size={28} className="text-kapture-black dark:text-kapture-white" />
              <span className="flex items-center gap-2">
                <span className="font-semibold">kapture</span>
                <span className="text-kapture-mist">·</span>
                <span className="font-medium">logistics</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
              A Kapture company. We unify managed transportation, multi-modal capacity, and
              last-mile delivery into one shared operating layer — built for ambitious operators
              moving across Africa and the world.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-kapture-smoke hover:text-kapture-black dark:text-kapture-fog dark:hover:text-kapture-white"
              >
                <Mail size={14} />
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-kapture-smoke hover:text-kapture-black dark:text-kapture-fog dark:hover:text-kapture-white"
              >
                <Phone size={14} />
                {SITE.phone}
              </a>
              <div className="flex items-center gap-3 text-kapture-smoke dark:text-kapture-fog">
                <MapPin size={14} />
                {SITE.cities.join(" · ")}
              </div>
            </div>

            <div className="mt-8">
              <Link href="/quote" className="btn-primary">
                Ship your website
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-8 md:grid-cols-4">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="label">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-kapture-smoke hover:text-kapture-black dark:text-kapture-fog dark:hover:text-kapture-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-kapture-fog/60 pt-8 text-xs text-kapture-mist dark:border-kapture-ash sm:flex-row sm:items-center">
          <div>
            © {year} {SITE.name}. A {SITE.parent} company.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact?topic=privacy" className="hover:text-kapture-black dark:hover:text-kapture-white">
              Privacy
            </Link>
            <Link href="/contact?topic=terms" className="hover:text-kapture-black dark:hover:text-kapture-white">
              Terms
            </Link>
            <a
              href={SITE.parentUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-kapture-black dark:hover:text-kapture-white"
            >
              Visit Kapture
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
