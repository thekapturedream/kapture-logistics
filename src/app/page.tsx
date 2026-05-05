import { Hero } from "@/components/Hero";
import { CityMarquee } from "@/components/CityMarquee";
import { ValueProp } from "@/components/ValueProp";
import { Stats } from "@/components/Stats";
import { BentoServices } from "@/components/BentoServices";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CityMarquee />
      <ValueProp />
      <BentoServices />
      <Stats />
      <SolutionsGrid />
      <HowItWorks />
      <CTA />
    </>
  );
}
