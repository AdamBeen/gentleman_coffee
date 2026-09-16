import { machineFamilies } from "@/config/content";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Catégories — liste éditoriale numérotée (pas de grille de cartes
 * identiques) : grandes lignes typographiques, filets fins, flèche
 * au survol. Liens vers les ancres de la page /machines.
 */
export function CategoriesSection() {
  return (
    <section className="bg-soft py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Nos solutions"
          title={
            <>
              Quatre familles de solutions,{" "}
              <span className="text-caramel italic">un seul interlocuteur</span>
            </>
          }
          description="Chaque établissement a ses usages et ses horaires. Nous partons de votre organisation, pas d'un catalogue."
        />

        <ul className="mt-14 border-t border-roasted/15">
          {machineFamilies.map((family, i) => (
            <BlurFade key={family.slug}>
              <li className="border-b border-roasted/15">
                <a
                  href={`/machines#${family.slug}`}
                  className="group grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-5 gap-y-2 py-7 transition-colors duration-300 hover:bg-coffee/[0.04] sm:grid-cols-[4rem_minmax(0,17rem)_1fr_auto] sm:gap-x-10 lg:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-lg font-medium text-gold/80 sm:text-xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-display text-2xl leading-snug font-medium text-espresso transition-colors duration-300 group-hover:text-caramel sm:text-[1.7rem]">
                    {family.name}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="col-start-3 row-start-1 flex size-11 items-center justify-center self-center rounded-full border border-roasted/20 text-espresso transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso sm:col-start-4 sm:row-span-2 sm:self-center"
                  >
                    <svg
                      className="size-4 -rotate-45 transition-transform duration-200 group-hover:translate-x-0.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>

                  <p className="col-span-2 col-start-2 max-w-xl text-sm leading-relaxed text-roasted/75 sm:col-span-1 sm:col-start-3 sm:row-start-2">
                    {family.short}
                  </p>
                </a>
              </li>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  );
}
