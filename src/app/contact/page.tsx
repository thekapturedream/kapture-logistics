import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact — Talk to Kapture Logistics",
  description:
    "Reach the Kapture Logistics team. Quotes, partnerships, careers, customs, and tracking — one inbox, one team.",
};

type Props = { searchParams: { topic?: string } };

export default function ContactPage({ searchParams }: Props) {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="One team, one inbox, one number to call."
        lede="Quotes, partnerships, customs, careers, or live shipments — Kapture Logistics responds inside the hour during business hours, faster on urgent lanes."
      />

      <section className="container-kapture py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm topic={searchParams.topic} />
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal">
                <p className="chip">
                  <span className="divider-dot" />
                  Reach Kapture
                </p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="mt-0.5 text-kapture-yellow" />
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-kapture-smoke hover:text-kapture-black dark:text-kapture-fog dark:hover:text-kapture-white"
                    >
                      {SITE.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="mt-0.5 text-kapture-yellow" />
                    <a
                      href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                      className="text-kapture-smoke hover:text-kapture-black dark:text-kapture-fog dark:hover:text-kapture-white"
                    >
                      {SITE.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 text-kapture-yellow" />
                    <span className="text-kapture-smoke dark:text-kapture-fog">
                      Midrand · Harare · Lusaka · Ndola
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-kapture-black p-6 text-kapture-white dark:bg-kapture-ink">
                <p className="text-xs uppercase tracking-wider text-kapture-fog">
                  Need a number, fast?
                </p>
                <h4 className="mt-2 font-display text-xl font-bold">
                  Skip the form, get prices.
                </h4>
                <p className="mt-2 text-sm text-kapture-fog">
                  The quote desk is faster for live cargo. Punch in your endpoints, get a costed
                  plan back inside the hour.
                </p>
                <a href="/quote" className="btn-yellow mt-5">
                  Open quote desk
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
