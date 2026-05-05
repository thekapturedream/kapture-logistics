import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { KaptureSun } from "./KaptureSun";

export function CTA() {
  return (
    <section className="bg-kapture-paper dark:bg-kapture-ink">
      <div className="container-kapture py-24 md:py-32">
        <div className="relative overflow-hidden rounded-3xl bg-kapture-black px-8 py-16 text-kapture-white md:px-16 md:py-20">
          <KaptureSun
            size={32}
            className="absolute right-6 top-6 text-kapture-yellow"
            spin
          />

          <div className="relative max-w-2xl">
            <p className="chip border-kapture-ash text-kapture-fog">
              <span className="divider-dot" />
              Ready when you are
            </p>
            <h2 className="mt-5 font-display text-hero-lg text-balance">
              Punch in your endpoints.
            </h2>
            <p className="mt-5 text-base text-kapture-fog md:text-lg">
              We'll handle the world in between. Costed plan in your inbox within the hour.
            </p>

            <div className="mt-8">
              <Link href="/quote" className="btn-yellow">
                Get a quote
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
