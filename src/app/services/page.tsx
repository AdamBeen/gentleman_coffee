import type { Metadata } from "next";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/config/content";

export const metadata: Metadata = {
  title: "Nos services · Installation, entretien et suivi de vos machines",
  description:
    "Conseil, installation, mise en service, réassort, entretien, maintenance et accompagnement : Gentelman Coffee assure le service complet autour de vos distributeurs automatiques à Bordeaux et en Gironde.",
  alternates: { canonical: "/services" },
};

/**
 * Page Services — parcours visuel autour de la machine.
 * Aucune promesse commerciale non confirmée (délais, garanties…)
 * n'est affichée : tout est descriptif.
 */
export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(198,161,91,0.18),transparent_55%)]"
        />
        <div className="container-site relative pt-36 pb-16 lg:pb-24">
          <Reveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
              Nos services
            </p>
            <h1 className="max-w-2xl font-display text-4xl leading-tight font-medium sm:text-5xl">
              Un service complet, de l’installation au suivi
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
              Une machine n’est utile que si elle fonctionne, si elle est
              approvisionnée et si quelqu’un répond quand il faut. C’est
              exactement notre rôle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Parcours visuel — timeline verticale */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Ce que nous faisons pour vous"
            title="Sept engagements de service, un seul interlocuteur"
            description="Chaque étape est assurée par Gentelman Coffee, sans sous-traitance d'interface : vous savez toujours qui appeler."
          />

          <ol className="relative mt-16 flex flex-col gap-0 border-l border-gold/30 pl-8 lg:pl-12">
            {services.map((service, i) => (
              <Reveal as="li" key={service.title} delay={i * 0.08} className="relative pb-12 last:pb-0">
                {/* Point doré sur la timeline */}
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[2.55rem] flex h-4 w-4 items-center justify-center rounded-full border border-gold bg-soft lg:-left-[3.55rem]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-espresso">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-roasted/80">
                  {service.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Accompagnement — bloc éditorial */}
      <section className="bg-coffee py-20 text-cream lg:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            tone="light"
            eyebrow="Accompagnement"
            title="Un contact local, dans la durée"
            description="Nous restons présents après l'installation : suivi régulier des machines, écoute de vos retours et ajustement de l'offre selon l'usage réel de vos équipes et visiteurs."
          />
          <Reveal delay={0.15} className="rounded-2xl border border-gold/25 bg-espresso/50 p-8 lg:p-10">
            <p className="font-display text-xl leading-relaxed font-medium text-champagne">
              « Notre approche est simple : être joignable, réactif et
              attentionné, comme un voisin. »
            </p>
            <p className="mt-4 text-sm text-cream/60">
              L’esprit Gentelman Coffee, à Bordeaux &amp; Gironde.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
