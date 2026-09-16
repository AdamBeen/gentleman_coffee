"use client";

/*
 * global-error : navigation pleine page volontaire — ce composant
 * s'affiche hors du contexte du routeur (Link / router.push non fiables).
 */
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-location-assign-relative-destination */

/**
 * Dernier filet : erreur survenue dans le layout racine lui-même.
 * Remplace intégralement le document (doit redéclarer <html>/<body>)
 * — aucun écran d'erreur technique navigateur/Next.js n'est visible.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("[global-error]", error);

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#120D0A",
          color: "#F3E9D7",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#E0C995",
            }}
          >
            Une erreur est survenue
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 500, margin: "1rem 0" }}>
            Le service a rencontré un imprévu
          </h1>
          <p style={{ fontSize: "0.9rem", color: "rgba(243,233,215,0.7)" }}>
            Merci de réessayer dans quelques instants.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                backgroundColor: "#C6A15B",
                color: "#120D0A",
                border: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Réessayer
            </button>
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                // Navigation pleine page volontaire (voir note en tête)
                window.location.assign("/");
              }}
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "1px solid rgba(224,201,149,0.4)",
                color: "#F3E9D7",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              Retour à l’accueil
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
