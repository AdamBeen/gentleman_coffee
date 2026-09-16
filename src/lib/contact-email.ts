import { siteConfig } from "@/config/site";
import type { ContactFormData } from "@/lib/validation";

/**
 * Envoi de l'e-mail de contact via un fournisseur transactionnel.
 * Réservé au serveur — les clés API ne quittent jamais le serveur.
 *
 * Fournisseurs (le premier configuré gagne) :
 *   - Resend (RESEND_API_KEY) — https://resend.com
 *   - Brevo (BREVO_API_KEY) — ex-Sendinblue, plan gratuit 300 emails/jour
 */

export type EmailDispatch =
  | { outcome: "sent" }
  | { ok: false; provider: string }
  | { ok: true; provider: "none" };

export type EmailDelivery = {
  provider: "resend" | "brevo" | "none";
  ok: boolean;
};

export function buildEmailBody(data: ContactFormData): string {
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

/** Envoie l'e-mail via le fournisseur configuré, s'il y en a un. */
export async function deliverContactEmail(
  data: ContactFormData
): Promise<EmailDelivery> {
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || siteConfig.email;
  const subject = `Nouvelle demande d'étude : ${data.company}`;
  const text = buildEmailBody(data);

  if (!from || !to) {
    console.warn(
      "[contact] Envoi non configuré (clé fournisseur / CONTACT_FROM / CONTACT_TO manquants). Demande enregistrée côté serveur uniquement."
    );
    return { provider: "none", ok: true };
  }

  if (process.env.RESEND_API_KEY) {
    const ok = await sendViaResend({
      apiKey: process.env.RESEND_API_KEY,
      from,
      to,
      replyTo: data.email,
      subject,
      text,
    });
    return { provider: "resend", ok };
  }

  if (process.env.BREVO_API_KEY) {
    const ok = await sendViaBrevo({
      apiKey: process.env.BREVO_API_KEY,
      from,
      to,
      replyTo: data.email,
      subject: `Nouvelle demande d'étude : ${data.company}`,
      text,
    });
    return { provider: "brevo", ok };
  }

  console.warn(
    "[contact] Envoi non configuré (clé fournisseur / CONTACT_FROM / CONTACT_TO manquants). Demande enregistrée côté serveur uniquement."
  );
  return { provider: "none", ok: true };
}

async function sendViaResend(options: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: options.from,
      to: [options.to],
      reply_to: options.replyTo,
      subject: options.subject,
      text: options.text,
    }),
  });
  return res.ok;
}

async function sendViaBrevo(options: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": options.apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: options.from, name: siteConfig.businessName },
      to: [{ email: options.to }],
      replyTo: { email: options.replyTo },
      subject: options.subject,
      textContent: options.text,
    }),
  });
  return res.ok;
}
