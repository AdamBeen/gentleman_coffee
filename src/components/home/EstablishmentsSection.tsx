import { establishments } from "@/config/content";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { Marquee } from "@/components/motion-primitives/marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * « Une solution adaptée à votre établissement » — bandeau défilant
 * (Marquee, adapté de Motion Primitives) + liste éditoriale en deux
 * colonnes. Le défilement est décoratif : aria-hidden, pause au
 * survol, figé si prefers-reduced-motion.
 */
export function EstablishmentsSection() {
  return (
    <section className="overflow-hidden bg-espresso py-20 text-cream lg:py-28">
      <div className="container-site">
        <SectionHeading
          align="center"
          tone="light"
          eyebrow="Établissements"
          title={
            <>
              Une solution adaptée à{" "}
              <span className="text-caramel italic">votre établissement</span>
            </>
          }
          description="Chaque lieu a ses horaires, ses passages, ses habitudes. La machine et l'assortiment suivent vos usages, pas l'inverse."
        />
      </div>

      {/* Bandeau défilant décoratif */}
      <div className="mt-14 border-y border-gold/20 py-5" aria-hidden="true">
        <Marquee duration={45}>
          {establishments.map((establishment) => (
            <span
              key={establishment.name}
              className="flex items-center gap-8 pr-8 font-display text-2xl font-medium text-champagne/80 sm:text-3xl"
            >
              {establishment.name}
              <span className="inline-block size-1.5 rounded-full bg-gold/70" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-site mt-16">
        <dl className="mx-auto grid max-w-5xl grid-cols-1 gap-x-14 sm:grid-cols-2">
          {establishments.map((establishment, i) => (
            <BlurFade key={establishment.name} delay={0.04 * i}>
              <div className="flex flex-col gap-1.5 border-b border-cream/10 py-5">
                <dt className="font-display text-xl font-medium text-cream">
                  {establishment.name}
                </dt>
                <dd className="text-sm leading-relaxed text-cream/60">
                  {establishment.description}
                </dd>
              </div>
            </BlurFade>
          ))}
        </dl>
      </div>
    </section>
  );
}
