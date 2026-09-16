import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BlurFade } from "@/components/motion-primitives/blur-fade";

/**
 * Bannière CTA — séparateur organique Haikei « Waves » en haut,
 * fond blob-scene Haikei, typographie display avec emphase italique.
 */
export function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      {/* Séparateur organique (template Haikei « Waves », palette maison) */}
      {/* Séparateur organique (template Haikei « Waves », palette maison) */}
      <Image
        src="/backgrounds/haikei-waves.svg"
        alt=""
        width={1440}
        height={600}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full object-fill sm:h-32"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/backgrounds/haikei-blob-scene.svg')] bg-cover bg-center opacity-90"
      />
      <div aria-hidden="true" className="paper-grain absolute inset-0 opacity-30" />

      <div className="container-site relative flex flex-col items-center gap-6 py-32 text-center lg:py-40">
        <BlurFade>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
            <span className="gold-rule" aria-hidden="true" />
            Passons à l’action
            <span className="gold-rule rotate-180" aria-hidden="true" />
          </p>
        </BlurFade>

        <BlurFade delay={0.1}>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.1] font-medium text-balance text-cream sm:text-5xl lg:text-6xl">
            Votre établissement mérite{" "}
            <span className="text-caramel italic">un bon café</span>, à tout moment.
          </h2>
        </BlurFade>

        <BlurFade delay={0.2}>
          <p className="max-w-xl text-base leading-relaxed text-cream/70">
            Décrivez-nous votre projet en quelques lignes : nous revenons vers
            vous avec une solution concrète, adaptée à vos usages.
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <Button href="/contact" className="mt-3">
            Demander une étude
          </Button>
        </BlurFade>
      </div>
    </section>
  );
}
