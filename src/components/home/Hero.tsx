"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { MachineIllustration } from "@/components/ui/MachineIllustration";
import { TextReveal } from "@/components/motion-primitives/text-reveal";

/**
 * Hero éditorial — structure adaptée du bloc « hero-22 » de Watermelon UI
 * (typographie display avec emphase serif italique, variants spring
 * échelonnés, rangée de points forts), réécrit pour l'identité
 * Gentelman Coffee : fond organique Haikei, palette espresso/laiton,
 * illustration produit sous arche.
 */
const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const copyVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const chipRowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const solutions = [
  "Machines à café",
  "Snacking",
  "Boissons fraîches",
  "Solutions combinées",
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : { initial: "hidden", animate: "visible" } as const;

  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      {/* Fond organique — template Haikei « Blob Scene » adapté à la palette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/backgrounds/haikei-blob-scene.svg')] bg-cover bg-center"
      />
      <div aria-hidden="true" className="paper-grain absolute inset-0 opacity-40" />

      <motion.div
        className="container-site relative flex min-h-svh flex-col justify-center pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20"
        {...motionProps}
        variants={sectionVariants}
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Colonne éditoriale */}
          <div>
            <motion.p
              variants={copyVariants}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[0.24em] text-champagne uppercase"
            >
              <span className="gold-rule" aria-hidden="true" />
              Distributeurs automatiques • Bordeaux &amp; Gironde
            </motion.p>

            <h1 className="mt-6 font-display text-[clamp(2.9rem,7vw,5.2rem)] leading-[1.04] font-medium tracking-[-0.02em] text-balance text-cream">
              <TextReveal text="Le bon café." className="block" />
              <TextReveal text="Au bon endroit." className="block" delay={0.12} />
              <span className="block text-caramel italic">
                <TextReveal text="À tout moment." delay={0.24} />
              </span>
            </h1>

            <motion.p
              variants={copyVariants}
              className="mt-7 max-w-lg text-base leading-relaxed font-medium text-cream/75 text-pretty sm:text-lg"
            >
              Gentelman Coffee équipe entreprises, commerces et établissements
              avec des solutions automatiques de café, boissons et snacking
              adaptées à leurs besoins.
            </motion.p>

            <motion.div
              variants={copyVariants}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gold px-7 text-sm font-semibold text-espresso shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_32px_-12px_rgba(198,161,91,0.55)] transition-[background-color,transform] duration-200 hover:bg-champagne active:scale-[0.97]"
              >
                Demander une étude
                <svg
                  className="h-4 w-4 -rotate-45 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
              </a>
              <a
                href="/machines"
                className="inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-cream shadow-[inset_0_0_0_1px_rgba(224,201,149,0.35)] transition-colors duration-200 hover:bg-cream/10 hover:shadow-[inset_0_0_0_1px_rgba(224,201,149,0.55)]"
              >
                Découvrir nos machines
              </a>
            </motion.div>
          </div>

          {/* Emplacement photographie produit — arche */}
          <motion.div
            variants={imageVariants}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none lg:justify-self-end"
          >
            <div className="arch-frame relative overflow-hidden rounded-t-full border border-gold/25 bg-gradient-to-b from-roasted/60 via-coffee to-espresso px-8 pt-12 pb-10 shadow-[0_48px_90px_-30px_rgba(0,0,0,0.8)]">
              <MachineIllustration
                variant="cafe"
                className="mx-auto h-auto w-44 sm:w-52 lg:w-60"
              />
            </div>
            <p className="mt-5 text-center text-xs tracking-[0.24em] text-cream/40 uppercase">
              Café · Snacking · Boissons
            </p>
          </motion.div>
        </div>

        {/* Points de repère — chips discrètes */}
        <motion.ul
          variants={chipRowVariants}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream/10 pt-6"
        >
          {solutions.map((label) => (
            <motion.li key={label} variants={chipVariants} className="flex items-center gap-2.5">
              <span className="inline-block size-1.5 rounded-full bg-gold/80" aria-hidden="true" />
              <span className="text-sm font-medium text-cream/70">{label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
