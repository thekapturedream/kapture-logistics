import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { KaptureSun } from "./KaptureSun";
import { SITE } from "@/lib/utils";

export function CTA() {
  return (
    <section className="container-kapture py-24 md:py-32">
      <div className="relative overflow-hidden rounded-3xl bg-kapture-black px-8 py-16 text-kapture-white md:px-16 md:py-24">
        <KaptureSun
          size={420}
          className="absolute -right-24 -top-24 text-kapture-yellow opacity-15"
          spin
        />

        <div className="relative max-w-2xl">
          <p className="chip border-kapture-ash text-kapture-fog">
            <span className="divider-dot" />
            Final move
          </p>
          <h2 className="mt-5 font-display text-hero-lg text-balance">
            Make this website yours.
          </h2>
          <p className="mt-5 text-base text-kapture-fog md:text-lg">
            Punch in your endpoints. We'll handle the world in between. {SITE.template.priceFromLabel},
            live in {SITE.template.deliveryHours} hours, branded for you, by Kapture Studio.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote?intent=template" className="btn-yellow">
              Make it yours — {SITE.template.price}
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/quote?intent=custom"
              className="btn-kapture border border-kapture-ash bg-transparent text-kapture-white hover:bg-kapture-white hover:text-kapture-black"
            >
              Custom build · {SITE.template.customBuildPriceLabel}
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <p className="mt-6 text-xs uppercase tracking-wider text-kapture-mist">
            Designed and built by {SITE.studio} · {SITE.email}
          </p>
        </div>
      </div>
    </section>
  );
}
