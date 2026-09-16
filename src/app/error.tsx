"use client";

import Link from "next/link";

/**
 * Écran d'erreur runtime entièrement à la marque (aucun écran
 * navigateur). Limité au segment concerné ; « Réessayer » relance
 * le rendu sans recharger tout le site.
 */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-espresso text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/backgrounds/haikei-blob-scene.svg')] bg-cover bg-center opacity-60"
      />
      <div aria-hidden="true" className="paper-grain absolute inset-0 opacity-30" />

      <div className="container-site relative flex flex-col items-center gap-6 py-32 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
          Une erreur est survenue
        </p>
        <h1 className="max-w-xl font-display text-4xl leading-tight font-medium text-balance sm:text-5xl">
          Le service a rencontré{" "}
          <span className="text-caramel italic">un imprévu</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-cream/70">
          Merci de réessayer dans quelques instants. Si le problème persiste,
          contactez-nous directement.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-sm font-semibold text-espresso transition-colors hover:bg-champagne"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-full px-6 text-sm font-semibold text-cream shadow-[inset_0_0_0_1px_rgba(224,201,149,0.4)] transition-colors hover:bg-cream/5"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
