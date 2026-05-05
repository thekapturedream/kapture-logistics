import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Stats } from "@/components/Stats";
import { BentoServices } from "@/components/BentoServices";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Stats />
      <BentoServices />
      <SolutionsGrid />
      <HowItWorks />
      <CTA />
    </>
  );
}
