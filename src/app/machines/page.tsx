import type { Metadata } from "next";
import { CtaBanner } from "@/components/home/CtaBanner";
import { machineFamilies } from "@/config/content";
import { MachineIllustration } from "@/components/ui/MachineIllustration";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Nos machines · Distributeurs automatiques café, snacks & boissons",
  description:
    "Machines à café, distributeurs de snacks, distributeurs de boissons fraîches et solutions combinées pour entreprises et établissements à Bordeaux et en Gironde.",
  alternates: { canonical: "/machines" },
};

/**
 * Page Machines — présentation éditoriale des quatre familles.
 * TODO: remplacer les illustrations par de vraies photographies
 * produits et ajouter les références concrètes lorsque le client
 * les fournira (voir src/config/content.ts).
 */
export default function MachinesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(140,90,50,0.35),transparent_60%)]"
        />
        <div className="container-site relative pt-36 pb-16 sm:pt-44 lg:pb-24">
          <Reveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
              Nos machines
            </p>
            <h1 className="max-w-2xl font-display text-4xl leading-tight font-medium sm:text-5xl">
              Des solutions automatiques pour chaque besoin
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
              Quatre familles de matériel, un seul interlocuteur : nous vous
              aidons à choisir la solution la mieux adaptée à votre
              établissement, à votre espace et à vos usages.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Familles de machines */}
      <div className="container-site flex flex-col gap-24 py-20 lg:gap-32 lg:py-28">
        {machineFamilies.map((family, i) => (
          <section
            key={family.slug}
            id={family.slug}
            aria-labelledby={`${family.slug}-title`}
            className="scroll-mt-28"
          >
            <div
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Visuel */}
              <Reveal className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <div
                    aria-hidden="true"
                    className="absolute inset-4 rounded-3xl bg-gradient-to-b from-roasted/15 to-transparent blur-xl"
                  />
                  <MachineIllustration
                    variant={family.variant}
                    className="relative mx-auto h-auto w-52 sm:w-60"
                  />
                </div>
              </Reveal>

              {/* Texte */}
              <div className="flex flex-col items-start gap-5">
                <SectionHeading
                  title={<span id={`${family.slug}-title`}>{family.name}</span>}
                  description={family.description}
                />
                <Reveal delay={0.1}>
                  <ul className="flex flex-col gap-2.5">
                    {family.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm leading-relaxed text-roasted/85"
                      >
                        <svg
                          className="mt-1 h-4 w-4 shrink-0 text-gold"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 8.5 6.5 12 13 4.5" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2}>
                  <Button href="/contact">Demander une étude</Button>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBanner />
    </>
  );
}
