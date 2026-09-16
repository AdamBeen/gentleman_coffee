import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site de ${siteConfig.businessName}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

const todo = "TODO : à renseigner dans src/config/site.ts.";

/** Page mentions légales — toutes les valeurs légales proviennent
 * de src/config/site.ts et restent à fournir par le client. */
export default function MentionsLegalesPage() {
  const { legal, legalName, businessName } = siteConfig;

  return (
    <LegalLayout title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <ul className="list-none">
          <li>
            Dénomination : <strong>{legalName || businessName}</strong>
          </li>
          <li>Forme juridique : {legal.legalForm || todo}</li>
          <li>Siège social : {legal.registeredOffice || todo}</li>
          <li>SIRET : {legal.siret || todo}</li>
          <li>TVA intracommunautaire : {legal.vatNumber || todo}</li>
          <li>
            Directeur de la publication : {legal.publicationDirector || todo}
          </li>
        </ul>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          {siteConfig.email ? (
            <>
              E-mail :{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
            </>
          ) : (
            "E-mail : à renseigner dans src/config/site.ts."
          )}
          {siteConfig.phone
            ? `, téléphone : ${siteConfig.phone}`
            : ", téléphone : à renseigner."}
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          {legal.host ||
            "Hébergeur : à renseigner après le déploiement (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis, à confirmer)."}
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus du site (textes, visuels, logo, structure)
          est protégé par le droit de la propriété intellectuelle. Toute
          reproduction, même partielle, sans autorisation préalable écrite est
          interdite.
        </p>
      </section>
    </LegalLayout>
  );
}
