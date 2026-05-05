import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Solutions — Industries we move",
  description:
    "Industry-tuned logistics: retail, manufacturing, mining, healthcare, agriculture, and tech. Lanes, capacity, and SLAs shaped to your sector.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Tuned for the way your industry actually moves."
        lede="Retail's peak isn't manufacturing's peak. Mining's lanes aren't pharma's lanes. Kapture Logistics tunes the operating layer to the gravity of your sector."
      />
      <SolutionsGrid />
      <CTA />
    </>
  );
}
