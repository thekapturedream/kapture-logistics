import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About — A Kapture company",
  description:
    "Kapture Logistics is the freight and supply-chain arm of Kapture, the digital agency turning bold ideas into operating businesses.",
};

const PRINCIPLES = [
  {
    title: "Operate, don't observe.",
    body: "We run lanes, not slide decks. Our team sits inside the flow — pickup, border, drop — so the answer is always one call away.",
  },
  {
    title: "One thread, end-to-end.",
    body: "From first quote to final POD, one team owns the shipment. No handoffs. No finger-pointing. One number to call.",
  },
  {
    title: "Software that earns its keep.",
    body: "The Kapture platform exists to remove human friction, not add screens. If a feature does not move a load faster, it does not ship.",
  },
  {
    title: "Africa-native, world-fluent.",
    body: "We grew up on SADC corridors, but we move into and out of every major global gateway. Local muscle, global reach.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A Kapture company, built for operators with bold cargo."
        lede="Kapture Logistics is the freight and supply-chain arm of Kapture — the agency turning bold ideas into operating businesses across Africa and beyond."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact?topic=partner" className="btn-primary">
            Partner with us
            <ArrowUpRight size={16} />
          </Link>
          <Link href={SITE.parentUrl} target="_blank" rel="noreferrer" className="btn-secondary">
            Visit Kapture
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </PageHeader>

      <section className="container-kapture py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="chip">
              <span className="divider-dot" />
              The Kapture story
            </p>
            <h2 className="h-section mt-4 text-balance">
              We started where the freight market was loudest, and least listened to.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="lede">
              Kapture began as a digital studio for ambitious operators — founders, governments,
              and enterprises with bold ideas and short timelines. Logistics was the first hard
              problem our clients kept hitting: lanes that broke, partners that ghosted, software
              that lied.
            </p>
            <p className="lede mt-4">
              Kapture Logistics is what we built in response. A managed transportation business
              wrapped around a software platform, run by a team that has shipped across every major
              SADC corridor and every gateway that matters.
            </p>
            <p className="lede mt-4">
              Today, Kapture Logistics moves cargo for retailers, manufacturers, miners, and
              healthcare brands across the continent — and for international shippers moving into
              Africa for the first time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-kapture-paper dark:bg-kapture-ink">
        <div className="container-kapture py-24 md:py-32">
          <p className="chip">
            <span className="divider-dot" />
            How we operate
          </p>
          <h2 className="h-section mt-4 max-w-2xl text-balance">
            Four principles that decide every load.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="rounded-2xl border bg-white p-8 dark:border-kapture-ash dark:bg-kapture-coal"
              >
                <span className="font-mono text-xs text-kapture-mist">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kapture-smoke dark:text-kapture-fog">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
