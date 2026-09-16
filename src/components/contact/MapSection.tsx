import { siteConfig } from "@/config/site";

/**
 * Carte OpenStreetMap — intégration sans clé API via iframe.
 * Les coordonnées proviennent de src/config/site.ts.
 * Si aucune adresse n'est fournie, un placeholder premium
 * explique que la localisation sera configurée (rien n'est inventé).
 */
export function MapSection() {
  const { latitude, longitude } = siteConfig;
  const hasCoords = latitude !== null && longitude !== null;

  return (
    <section aria-label="Localisation" className="py-20 lg:py-24">
      <div className="container-site">
        <div className="overflow-hidden rounded-2xl border border-roasted/15 shadow-[0_24px_60px_rgba(18,13,10,0.12)]">
          {/* Barre premium au-dessus de la carte */}
          <div className="flex items-center justify-between gap-4 bg-espresso px-6 py-4 text-cream sm:px-8">
            <p className="text-sm font-medium">
              Notre zone d’intervention : Bordeaux &amp; Gironde
            </p>
            <span className="gold-rule hidden sm:inline-block" aria-hidden="true" />
          </div>

          {hasCoords ? (
            <iframe
              title={`Carte de localisation de ${siteConfig.businessName}`}
              src={buildOsmEmbedUrl(latitude, longitude)}
              className="h-[420px] w-full border-0 lg:h-[540px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-[420px] flex-col items-center justify-center gap-4 bg-gradient-to-b from-coffee to-espresso px-8 text-center lg:h-[540px]">
              <svg
                className="h-12 w-12 text-gold/70"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M24 42c0 0-14-11.5-14-22a14 14 0 0 1 28 0c0 10.5-14 22-14 22Z" />
                <circle cx="24" cy="20" r="5" />
              </svg>
              <p className="font-display text-xl font-medium text-cream">
                Localisation à configurer
              </p>
              <p className="max-w-md text-sm leading-relaxed text-cream/60">
                La carte s’affichera dès que l’adresse sera renseignée dans le
                fichier de configuration{" "}
                <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">
                  src/config/site.ts
                </code>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function buildOsmEmbedUrl(lat: number, lng: number): string {
  const delta = 0.008;
  const bbox = [lng - delta, lat - delta / 1.6, lng + delta, lat + delta / 1.6]
    .map((v) => v.toFixed(5))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${lat}%2C${lng}`;
}
