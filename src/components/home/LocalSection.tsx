import { siteConfig } from "@/config/site";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Section proximité Bordeaux / Gironde — composition éditoriale :
 * grand « G » serif en filigrane, zone de service en liste typographique.
 * TODO: personnaliser avec la zone réelle confirmée par le client.
 */
export function LocalSection() {
  const areas =
    siteConfig.serviceAreas.length > 0
      ? siteConfig.serviceAreas
      : ["Bordeaux", "Gironde"];

  return (
    <section className="relative overflow-hidden bg-roasted py-20 text-cream lg:py-28">
      {/* Filigrane serif géant */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 font-display text-[22rem] leading-none font-medium text-champagne/[0.05] select-none"
      >
        G
      </span>

      <div className="container-site grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <SectionHeading
          tone="light"
          eyebrow="Ancrage local"
          title={
            <>
              Une entreprise de Bordeaux,{" "}
              <span className="text-caramel italic">proche de vos équipes</span>
            </>
          }
          description="Gentelman Coffee intervient localement auprès des entreprises, commerces et établissements. Être proche de nos clients, c'est pouvoir réagir vite, entretenir dans la durée et rester joignable simplement."
        />

        <BlurFade delay={0.15} className="lg:pt-10">
          <div className="border-t border-gold/30 pt-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
              Zone de service
            </p>
            <p className="mt-5 font-display text-3xl leading-snug font-medium text-cream sm:text-4xl">
              {areas.join(" · ")}
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
              Votre établissement se situe ailleurs en Gironde&nbsp;? Parlons-en&nbsp;:
              nous étudions chaque demande au cas par cas.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
