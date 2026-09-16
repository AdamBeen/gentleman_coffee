import { CtaBanner } from "@/components/home/CtaBanner";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { EstablishmentsSection } from "@/components/home/EstablishmentsSection";
import { Hero } from "@/components/home/Hero";
import { LocalSection } from "@/components/home/LocalSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <ServicesSection />
      <EstablishmentsSection />
      <LocalSection />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
