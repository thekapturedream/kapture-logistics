"use client";

const LOGOS = [
  "Kapture Studio",
  "Powerlist.Africa",
  "Kurongeka",
  "Lumumba Files",
  "Enserve",
  "Midrand Group",
  "Harare Holdings",
  "Lusaka Trade",
  "Beitbridge Co.",
  "SADC Freight",
];

export function LogoMarquee() {
  const reel = [...LOGOS, ...LOGOS];
  return (
    <section className="border-b border-kapture-fog/60 bg-white py-10 dark:border-kapture-ash dark:bg-kapture-black">
      <div className="container-kapture">
        <p className="text-center text-[11px] uppercase tracking-wider text-kapture-mist">
          Operators moving with Kapture Logistics
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-kapture-black" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-kapture-black" />
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {reel.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-xl font-semibold tracking-tight text-kapture-mist hover:text-kapture-black dark:hover:text-kapture-white"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
