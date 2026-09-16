import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateContactForm } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/contact
 *
 * Validation serveur puis envoi de l'e-mail via un fournisseur
 * transactionnel. Le fournisseur est détecté par variable
 * d'environnement (clés côté serveur uniquement, jamais exposées) :
 *
 *   - RESEND_API_KEY  : Resend (https://resend.com)
 *   - BREVO_API_KEY   : Brevo, ex-Sendinblue (https://brevo.com),
 *                       plan gratuit 300 emails/jour
 *
 * Communes aux deux :
 *   - CONTACT_FROM : adresse expéditrice validée chez le fournisseur
 *   - CONTACT_TO   : destinataire (défaut : siteConfig.email si renseigné)
 *
 * Si aucune configuration n'est présente, la requête est acceptée et
 * journalisée côté serveur (utile en recette, avant la mise en
 * production).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Requête invalide." },
      { status: 400 }
    );
  }

  const { valid, errors, data } = validateContactForm(body);
  if (!valid) {
    return NextResponse.json(
      { status: "error", errors, message: "Certains champs sont invalides." },
      { status: 422 }
    );
  }

  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || siteConfig.email;
  const subject = `Nouvelle demande d'étude : ${data.company}`;
  const text = buildEmailBody(data);

  try {
    if (process.env.RESEND_API_KEY && from && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        console.error("[contact] Échec de l'envoi Resend :", res.status);
        return sendErrorResponse();
      }
    } else if (process.env.BREVO_API_KEY && from && to) {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { email: from, name: siteConfig.businessName },
          to: [{ email: to }],
          replyTo: { email: data.email },
          subject,
          textContent: text,
        }),
      });
      if (!res.ok) {
        console.error("[contact] Échec de l'envoi Brevo :", res.status);
        return sendErrorResponse();
      }
    } else {
      // Aucun fournisseur configuré : journalisation sans donnée sensible.
      console.warn(
        "[contact] Envoi non configuré (clé fournisseur / CONTACT_FROM / CONTACT_TO manquants). Demande enregistrée côté serveur uniquement."
      );
      return NextResponse.json({
        status: "success",
        message:
          "Votre demande a bien été enregistrée. Nous revenons vers vous rapidement.",
      });
    }
  } catch (error) {
    console.error("[contact] Erreur réseau lors de l'envoi :", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          "Une erreur est survenue. Merci de réessayer dans quelques instants.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: "success",
    message:
      "Votre demande a bien été envoyée. Nous revenons vers vous rapidement.",
  });
}

function buildEmailBody(data: ReturnType<typeof validateContactForm>["data"]) {
  return [
    `Entreprise : ${data.company}`,
    `Nom : ${data.fullName}`,
    `Téléphone : ${data.phone}`,
    `E-mail : ${data.email}`,
    `Ville : ${data.city || "(non renseignée)"}`,
    `Type d'établissement : ${data.establishmentType || "(non renseigné)"}`,
    `Utilisateurs estimés : ${data.users}`,
    `Solution souhaitée : ${data.solutionType}`,
    "",
    "Message :",
    data.message || "(aucun message)",
  ].join("\n");
}

function sendErrorResponse() {
  return NextResponse.json(
    {
      status: "error",
      message:
        "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement.",
    },
    { status: 502 }
  );
}
