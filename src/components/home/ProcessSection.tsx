import { processSteps } from "@/config/content";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Processus — grands numéros serif sur filet horizontal, rythme
 * éditorial plutôt que cartes uniformes.
 */
export function ProcessSection() {
  return (
    <section className="bg-soft py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Notre méthode"
          title={
            <>
              Quatre étapes,{" "}
              <span className="text-caramel italic">sans friction</span>
            </>
          }
          description="De la première discussion au suivi quotidien, vous savez toujours où vous en êtes."
        />

        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <BlurFade key={step.number} delay={0.08 * i}>
              <li className="relative border-t border-roasted/20 pt-6">
                <span
                  aria-hidden="true"
                  className="absolute -top-8 right-0 font-display text-[5.5rem] leading-none font-medium text-roasted/[0.07] select-none sm:-top-9 lg:-top-9"
                >
                  {step.number}
                </span>
                <p className="font-mono text-xs tracking-[0.25em] text-caramel uppercase">
                  {step.number}
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-espresso">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-roasted/75">
                  {step.description}
                </p>
              </li>
            </BlurFade>
          ))}
        </ol>
      </div>
    </section>
  );
}
