import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";
import { ROLES } from "@/lib/roles";

/**
 * sitemap.xml — generated at build time from this manifest.
 *
 * Next.js exposes the sitemap at `/sitemap.xml` automatically. Submit to:
 *   - Google Search Console
 *   - Bing Webmaster Tools
 *
 * Priority is a relative signal (0.0–1.0) used by some crawlers to decide
 * which URLs to fetch first when crawl budget is tight. ChangeFreq is a
 * hint (Google ignores it, but Bing and others use it).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  /** Top-level marketing pages — high priority, change rarely. */
  const STATIC_PAGES: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/",                            priority: 1.0,  changeFreq: "weekly" },
    { path: "/services",                    priority: 0.9,  changeFreq: "monthly" },
    { path: "/solutions",                   priority: 0.9,  changeFreq: "monthly" },
    { path: "/about",                       priority: 0.7,  changeFreq: "monthly" },
    { path: "/quote",                       priority: 0.9,  changeFreq: "monthly" },
    { path: "/contact",                     priority: 0.8,  changeFreq: "monthly" },
    { path: "/careers",                     priority: 0.8,  changeFreq: "weekly" },
    { path: "/state-of-uk-logistics-2026",  priority: 0.9,  changeFreq: "monthly" },
    { path: "/request-audit",               priority: 0.9,  changeFreq: "monthly" },
    { path: "/privacy",                     priority: 0.3,  changeFreq: "yearly" },
    { path: "/terms",                       priority: 0.3,  changeFreq: "yearly" },
    { path: "/cookies",                     priority: 0.3,  changeFreq: "yearly" },
    { path: "/refunds",                     priority: 0.3,  changeFreq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }));

  /** Per-role careers pages — high priority for Google Jobs ranking. */
  const careerEntries: MetadataRoute.Sitemap = ROLES.flatMap((r) => [
    {
      url: `${base}/careers/${r.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${base}/careers/apply/${r.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ]);

  /** Speculative-application page. */
  const speculative: MetadataRoute.Sitemap = [
    {
      url: `${base}/careers/apply/general`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticEntries, ...careerEntries, ...speculative];
}
