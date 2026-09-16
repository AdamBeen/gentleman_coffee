import type { Metadata } from "next";
import { CtaBanner } from "@/components/home/CtaBanner";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "À propos · Gentelman Coffee, distributeurs automatiques à Bordeaux",
  description:
    "Gentelman Coffee est une entreprise locale spécialisée dans les solutions automatiques de café, boissons et snacking pour les professionnels, à Bordeaux et en Gironde.",
  alternates: { canonical: "/a-propos" },
};

/**
 * Page À propos — zones de contenu CONFIGURABLES.
 * TODO: remplir chaque bloc avec les informations réelles fournies
 * par le client (histoire, fondateur, mission, engagements…).
 * Aucune histoire de marque n'a été inventée.
 */
export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(140,90,50,0.4),transparent_55%)]"
        />
        <div className="container-site relative pt-36 pb-16 lg:pb-24">
          <Reveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
              À propos
            </p>
            <h1 className="max-w-2xl font-display text-4xl leading-tight font-medium sm:text-5xl">
              {siteConfig.businessName}, l’art d’équiper votre établissement
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
              Une entreprise locale, accessible et à l’écoute, spécialisée
              dans les solutions automatiques de café, boissons et snacking.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Zone : Mission */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Notre mission"
            title="Simplifier l'accès à un bon café, partout où l'on travaille"
            description="Nous équipons les entreprises, commerces et établissements de la région avec des solutions automatiques fiables, et nous en assurons le suivi dans la durée. Notre conviction : un bon café, accessible à tout moment, change la journée d'un lieu."
          />
        </div>
      </section>

      {/* Zone : Histoire — CONFIGURABLE */}
      {/* TODO: ajouter ici l'histoire de l'entreprise lorsque le client la fournira.
      <section className="bg-cream py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Notre histoire" title="…" description="…" />
        </div>
      </section>
      */}

      {/* Zone : Fondateur — CONFIGURABLE */}
      {/* TODO: ajouter une présentation du fondateur / de l'équipe (photo, parcours, citation). */}

      {/* Zone : Zone géographique */}
      <section className="bg-coffee py-20 text-cream lg:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            tone="light"
            eyebrow="Zone géographique"
            title="Ancrés à Bordeaux, présents en Gironde"
            description="Nous travaillons au plus près de nos clients : la proximité est au cœur de notre façon de servir. Nous étudions chaque demande de la métropole bordelaise et du département."
          />
          <Reveal delay={0.15}>
            <ul className="flex flex-wrap gap-2.5">
              {siteConfig.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-gold/30 bg-espresso/40 px-5 py-2 text-sm text-champagne"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-cream/55">
              TODO : préciser avec le client les communes exactes desservies
              et les éventuelles conditions d’intervention hors zone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Zone : Engagements — CONFIGURABLE */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            align="center"
            eyebrow="Nos engagements"
            title="Ce sur quoi nous nous engageons, simplement"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                title: "Local",
                text: "Une entreprise de la région, proche de ses clients.",
              },
              {
                title: "Accessible",
                text: "Un interlocuteur direct, simple à joindre, qui connaît votre dossier.",
              },
              {
                title: "Rigoureux",
                text: "Des machines entretenues et un suivi organisé dans la durée.",
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.1}
                className="rounded-2xl border border-roasted/10 bg-soft p-8 text-center"
              >
                <h3 className="font-display text-xl font-semibold text-espresso">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-roasted/75">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
