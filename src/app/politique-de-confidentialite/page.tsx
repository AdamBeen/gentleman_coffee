import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité du site de ${siteConfig.businessName}.`,
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false },
};

/** Politique de confidentialité — conforme au formulaire de contact
 * (consentement obligatoire) et au traitement via Resend. */
export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <section>
        <h2>Données collectées</h2>
        <p>
          Via le formulaire de contact, nous collectons uniquement les
          informations que vous transmettez volontairement : entreprise, nom
          et prénom, téléphone, e-mail, ville, type d’établissement, nombre
          d’utilisateurs estimé, type de solution souhaitée et votre message.
        </p>
      </section>

      <section>
        <h2>Finalité du traitement</h2>
        <p>
          Ces données servent exclusivement à répondre à votre demande
          (réalisation d’une étude personnalisée et échanges commerciaux
          liés). Elles ne sont ni vendues, ni cédées à des tiers à des fins
          publicitaires.
        </p>
      </section>

      <section>
        <h2>Sous-traitant technique</h2>
        <p>
          L’envoi des demandes est assuré par le service d’e-mail Resend
          (Resend Inc.). Resend agit en qualité de sous-traitant et ne traite
          vos données que pour la transmission du message.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>
          Les informations transmises sont conservées le temps nécessaire au
          traitement de votre demande, puis archivées ou supprimées selon les
          obligations légales applicables. TODO : préciser la durée exacte
          retenue par l’entreprise.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de
          rectification, d’effacement et d’opposition concernant vos données.
          Pour l’exercer, contactez-nous
          {siteConfig.email ? (
            <>
              {" à "}
              <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
                {siteConfig.email}
              </a>
            </>
          ) : (
            " à l'adresse e-mail indiquée sur la page contact (à renseigner dans src/config/site.ts)"
          )}
          .
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Ce site n’utilise pas de cookie publicitaire ni de traceur tiers. Seuls
          des cookies strictement nécessaires au fonctionnement peuvent être
          déposés.
        </p>
      </section>
    </LegalLayout>
  );
}
