import type { Metadata } from "next";
import { BenefitsSection } from "@/components/home/benefits-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { IndustriesSection } from "@/components/home/industries-section";
import { NetworkSection } from "@/components/home/network-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { PricingSection } from "@/components/home/pricing-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { faqs } from "@/content/faqs";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — 360° Virtual Tours for Hotels, Venues & Businesses in India`,
  description:
    "PanoVeya creates immersive 360° virtual tours for hotels, restaurants, wedding venues, real estate, retail and institutions in India. Get a free quote.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <ServicesSection />
      <IndustriesSection />
      <ProcessSection />
      <BenefitsSection />
      <NetworkSection />
      <PricingSection />
      <PortfolioSection />
      <FaqSection items={faqs} />
      <FinalCta />
    </>
  );
}
