import { services } from "@/config/content";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Section services — liste éditoriale en deux colonnes sur filets
 * horizontaux (pas de cartes uniformes).
 */
export function ServicesSection() {
  return (
    <section className="bg-coffee py-20 text-cream lg:py-28">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading
            tone="light"
            eyebrow="Notre service"
            title={
              <>
                Bien plus qu’une machine :{" "}
                <span className="text-caramel italic">un service suivi</span>
              </>
            }
            description="De l'installation au réassort, nous nous occupons de tout le cycle de vie de vos distributeurs. Vous n'avez rien à gérer."
          />

          <ul className="border-t border-cream/10">
            {services.map((service, i) => (
              <BlurFade key={service.title} delay={0.05 * i}>
                <li className="grid grid-cols-[7rem_1fr] items-baseline gap-x-8 border-b border-cream/10 py-5">
                  <h3 className="font-display text-lg font-medium text-champagne">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cream/65">
                    {service.description}
                  </p>
                </li>
              </BlurFade>
            ))}
          </ul>
        </div>

        <BlurFade delay={0.2}>
          <div className="mt-14 flex justify-center">
            <a
              href="/services"
              className="group inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-champagne transition-colors hover:text-gold"
            >
              Découvrir nos services
              <span
                aria-hidden="true"
                className="inline-block h-px w-10 bg-gold transition-all duration-300 group-hover:w-16"
              />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
