import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validation";
import { deliverContactEmail } from "@/lib/contact-email";

export const runtime = "nodejs";

/**
 * POST /api/contact
 *
 * Validation serveur puis envoi de l'e-mail via un fournisseur
 * transactionnel détecté par variable d'environnement (Resend ou
 * Brevo — clés côté serveur uniquement, jamais exposées au client).
 * Sans configuration d'envoi, la demande est acceptée et journalisée
 * côté serveur (utile en recette, avant la mise en production).
 */
export async function POST(request: Request) {
  const body = await readJsonBody(request);
  if (body === null) return invalidRequestResponse();

  const { valid, errors, data } = validateContactForm(body);
  if (!valid) {
    return NextResponse.json(
      { status: "error", errors, message: "Certains champs sont invalides." },
      { status: 422 }
    );
  }

  const delivery = await deliverContactEmail(data).catch((error: unknown) => {
    console.error("[contact] Erreur réseau lors de l'envoi :", error);
    return { provider: "network" as const, ok: false };
  });
  if (!delivery.ok) {
    console.error(`[contact] Échec de l'envoi (${delivery.provider}).`);
    return deliveryErrorResponse();
  }

  return NextResponse.json({
    status: "success",
    message:
      "Votre demande a bien été envoyée. Nous revenons vers vous rapidement.",
  });
}

/** Toute autre méthode reçoit une réponse JSON explicite (jamais une
 * page d'erreur technique). */
export async function GET() {
  return methodNotAllowedResponse();
}

export async function PUT() {
  return methodNotAllowedResponse();
}

export async function DELETE() {
  return methodNotAllowedResponse();
}

function methodNotAllowedResponse() {
  return NextResponse.json(
    { status: "error", message: "Méthode non autorisée." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

async function readJsonBody(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function invalidRequestResponse() {
  return NextResponse.json(
    { status: "error", message: "Requête invalide." },
    { status: 400 }
  );
}

function deliveryErrorResponse() {
  return NextResponse.json(
    {
      status: "error",
      message:
        "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement.",
    },
    { status: 502 }
  );
}
