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

      {/* Form first — full width, no sidebar */}
      <section className="container-kapture py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <ContactForm topic={searchParams.topic} />
        </div>
      </section>

      {/* Reach the team — context drops below */}
      <section className="bg-kapture-paper py-20 md:py-24 dark:bg-kapture-ink">
        <div className="container-kapture">
          <div className="mx-auto mb-12 max-w-2xl">
            <p className="chip"><span className="divider-dot" />Reach the team</p>
            <h2 className="h-section mt-4 text-balance">
              Email, phone, or in person.
            </h2>
          </div>

          <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
            <li className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                <Mail size={16} />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-kapture-mist">Email</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block break-all text-sm font-bold text-kapture-black hover:text-kapture-amber dark:text-kapture-white"
              >
                {SITE.email}
              </a>
            </li>

            <li className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                <Phone size={16} />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-kapture-mist">Phone</p>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="mt-1 block text-sm font-bold text-kapture-black hover:text-kapture-amber dark:text-kapture-white"
              >
                {SITE.phone}
              </a>
            </li>

            <li className="rounded-2xl border bg-white p-6 dark:border-kapture-ash dark:bg-kapture-coal">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-kapture-paper text-kapture-black dark:bg-kapture-ash dark:text-kapture-white">
                <MapPin size={16} />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-kapture-mist">Studios</p>
              <p className="mt-1 text-sm font-bold text-kapture-black dark:text-kapture-white">
                {SITE.cities.join(" · ")}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
