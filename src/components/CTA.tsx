import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { KaptureSun } from "./KaptureSun";

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
            Ready when you are
          </p>
          <h2 className="mt-5 font-display text-hero-lg text-balance">
            Ship your website. We'll handle the rest of the world.
          </h2>
          <p className="lede mt-5 text-kapture-fog">
            Punch in your endpoints. We design the lane, price it, and move the goods.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="btn-yellow"
            >
              Get a quote in 30 seconds
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/contact?topic=enterprise"
              className="btn-kapture border border-kapture-ash bg-transparent text-kapture-white hover:bg-kapture-white hover:text-kapture-black"
            >
              Talk to enterprise
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
