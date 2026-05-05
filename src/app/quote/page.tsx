import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Get a Quote — Ship in 30 seconds",
  description:
    "Tell us where it needs to go. We design the lane, price it, and move the goods — usually within the hour.",
};

const PROMISES = [
  "Costed plan in your inbox within 60 minutes (business hours)",
  "Pre-vetted carriers, real SLAs, written commitments",
  "Customs and trade-corridor handled in-house",
  "One Kapture strategist owns your shipment end-to-end",
];

type Props = {
  searchParams: {
    mode?: string;
    origin?: string;
    destination?: string;
    cargo?: string;
    service?: string;
  };
};

export default function QuotePage({ searchParams }: Props) {
  return (
    <>
      <PageHeader
        eyebrow="Get a Quote"
        title="Punch in your endpoints. We'll handle the world in between."
        lede="Tell us the lane and the cargo. A Kapture strategist comes back with a costed plan and lane options — usually within the hour. After you submit, lock a 15-minute discovery call to fast-track the move."
      />

      <section className="container-kapture py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <QuoteForm defaults={searchParams} />
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div>
                <p className="chip">
                  <span className="divider-dot" />
                  What happens next
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  The Kapture promise.
                </h3>
                <ul className="mt-6 space-y-3">
                  {PROMISES.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-kapture-yellow" />
                      <span className="text-kapture-smoke dark:text-kapture-fog">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-kapture-black p-6 text-kapture-white dark:bg-kapture-ink">
                <p className="text-xs uppercase tracking-wider text-kapture-fog">
                  Already shipping with us?
                </p>
                <h4 className="mt-2 font-display text-xl font-bold">
                  Track a live shipment
                </h4>
                <p className="mt-2 text-sm text-kapture-fog">
                  Existing customers can ping the control tower for live status, ETA refresh, or
                  exception escalation.
                </p>
                <a href="/contact?topic=tracking" className="btn-yellow mt-5">
                  Open control tower
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
