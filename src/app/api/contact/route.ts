import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateContactForm } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/contact
 *
 * Validation serveur puis envoi de l'e-mail via l'API REST de Resend.
 * Variables d'environnement requises (côté serveur uniquement, jamais
 * exposées au client) :
 *   - RESEND_API_KEY    : clé API Resend
 *   - CONTACT_FROM      : expéditeur (ex. "Gentelman Coffee <onboarding@resend.dev>")
 *   - CONTACT_TO        : destinataire (défaut : siteConfig.email si renseigné)
 *
 * Si RESEND_API_KEY n'est pas configurée, la requête est acceptée et
 * journalisée côté serveur (utile pour la recette). TODO: brancher
 * l'envoi réel dès que les variables sont définies sur Vercel.
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || siteConfig.email;

  if (!apiKey || !from || !to) {
    // Configuration d'envoi absente : on journalise sans exposer de donnée sensible.
    console.warn(
      "[contact] Envoi non configuré (RESEND_API_KEY / CONTACT_FROM / CONTACT_TO manquants). Demande enregistrée côté serveur uniquement."
    );
    return NextResponse.json({
      status: "success",
      message:
        "Votre demande a bien été enregistrée. Nous revenons vers vous rapidement.",
    });
  }

  const text = [
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Nouvelle demande d'étude : ${data.company}`,
        text,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Échec de l'envoi Resend:", res.status);
      return NextResponse.json(
        {
          status: "error",
          message:
            "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement.",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[contact] Erreur réseau lors de l'envoi:", error);
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
    message: "Votre demande a bien été envoyée. Nous revenons vers vous rapidement.",
  });
}
