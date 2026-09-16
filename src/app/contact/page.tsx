import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapSection } from "@/components/contact/MapSection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact · Demander une étude personnalisée",
  description:
    "Parlons de votre projet : quelques informations suffisent pour vous orienter vers une solution de distributeurs automatiques adaptée à votre établissement à Bordeaux et en Gironde.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,161,91,0.2),transparent_55%)]"
        />
        <div className="container-site relative pt-36 pb-14 lg:pb-20">
          <Reveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
              Contact
            </p>
            <h1 className="font-display text-4xl leading-tight font-medium sm:text-5xl">
              Parlons de votre projet
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
              Quelques informations suffisent pour nous permettre de vous
              orienter vers une solution adaptée.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Formulaire + coordonnées */}
      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal className="rounded-2xl border border-roasted/10 bg-white/70 p-6 shadow-[0_16px_48px_rgba(18,13,10,0.06)] sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">
              Demander une étude personnalisée
            </h2>
            <p className="mt-2 mb-8 text-sm leading-relaxed text-roasted/70">
              Les champs marqués d’un astérisque sont obligatoires. Vos
              informations ne servent qu’à traiter votre demande.
            </p>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15} className="lg:pt-2">
            <ContactInfo />
          </Reveal>
        </div>
      </section>

      <MapSection />
    </>
  );
}
