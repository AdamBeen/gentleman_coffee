import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

/** Page 404 entièrement à la marque (aucun écran navigateur). */
export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-espresso text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/backgrounds/haikei-blob-scene.svg')] bg-cover bg-center opacity-60"
      />
      <div aria-hidden="true" className="paper-grain absolute inset-0 opacity-30" />

      <div className="container-site relative flex flex-col items-center gap-7 py-32 text-center">
        <p
          aria-hidden="true"
          className="font-display text-[clamp(5rem,16vw,10rem)] leading-none font-medium text-gold/25 select-none"
        >
          404
        </p>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-champagne uppercase">
            Page introuvable
          </p>
          <h1 className="max-w-xl font-display text-3xl leading-tight font-medium text-balance sm:text-4xl">
            Cette page n’existe pas{" "}
            <span className="text-caramel italic">ou plus</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-cream/65">
            Le lien est peut-être obsolète. Retournez à l’accueil ou parlons
            directement de votre projet.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-sm font-semibold text-espresso transition-colors hover:bg-champagne"
            >
              Retour à l’accueil
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full px-6 text-sm font-semibold text-cream shadow-[inset_0_0_0_1px_rgba(224,201,149,0.4)] transition-colors hover:bg-cream/5"
            >
              Nous contacter
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs tracking-[0.2em] text-cream/35 uppercase">
          {siteConfig.businessName} · Bordeaux &amp; Gironde
        </p>
      </div>
    </section>
  );
}
