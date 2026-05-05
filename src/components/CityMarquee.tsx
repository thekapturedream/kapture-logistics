"use client";

const CITIES = [
  "Shanghai",
  "Singapore",
  "Rotterdam",
  "Dubai",
  "Hamburg",
  "Los Angeles",
  "New York",
  "Tokyo",
  "Hong Kong",
  "Antwerp",
  "Busan",
  "Mombasa",
  "Durban",
  "Lagos",
  "Cape Town",
  "Dar es Salaam",
  "London",
  "Mumbai",
  "Istanbul",
  "Santos",
  "Tema",
  "Abidjan",
  "Maputo",
  "Beira",
  "Walvis Bay",
  "Doha",
  "Houston",
  "Felixstowe",
  "Algeciras",
  "Karachi",
];

export function CityMarquee() {
  const reel = [...CITIES, ...CITIES];
  return (
    <section className="border-y border-kapture-fog/60 bg-white py-10 dark:border-kapture-ash dark:bg-kapture-black">
      <div className="container-kapture">
        <p className="text-center text-[11px] uppercase tracking-wider text-kapture-mist">
          Cargo flowing through · Live network
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent dark:from-kapture-black" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent dark:from-kapture-black" />
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {reel.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-kapture-mist transition-colors hover:text-kapture-black dark:hover:text-kapture-white"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-kapture-yellow" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
