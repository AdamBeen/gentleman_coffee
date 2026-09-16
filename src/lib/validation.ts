/**
 * Validation partagée entre le client et le serveur pour le
 * formulaire de contact. Source unique de vérité.
 */

export type ContactFormData = {
  company: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  establishmentType: string;
  users: string;
  solutionType: string;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0][\d\s().-]{7,19}$/;

export function validateContactForm(data: unknown): {
  valid: boolean;
  errors: FieldErrors;
  data: ContactFormData;
} {
  const errors: FieldErrors = {};
  const raw = (data ?? {}) as Partial<ContactFormData>;

  const company = String(raw.company ?? "").trim();
  const fullName = String(raw.fullName ?? "").trim();
  const phone = String(raw.phone ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const city = String(raw.city ?? "").trim();
  const establishmentType = String(raw.establishmentType ?? "").trim();
  const users = String(raw.users ?? "").trim();
  const solutionType = String(raw.solutionType ?? "").trim();
  const message = String(raw.message ?? "").trim();
  const consent = raw.consent === true;

  if (!company) errors.company = "Merci d'indiquer le nom de votre entreprise.";
  if (!fullName) errors.fullName = "Merci d'indiquer votre nom et prénom.";
  const digits = phone.replace(/[\s().-]/g, "");
  if (!phone) {
    errors.phone = "Merci d'indiquer un numéro de téléphone.";
  } else if (digits.length < 8 || digits.length > 15 || !PHONE_RE.test(digits)) {
    errors.phone = "Numéro de téléphone invalide.";
  }
  if (!email) {
    errors.email = "Merci d'indiquer une adresse e-mail.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Adresse e-mail invalide.";
  }
  if (!users) errors.users = "Merci d'indiquer une estimation, même approximative.";
  if (!solutionType) errors.solutionType = "Merci de choisir un type de solution.";
  if (message.length > 2000) {
    errors.message = "Le message ne peut pas dépasser 2000 caractères.";
  }
  if (!consent) {
    errors.consent =
      "Votre consentement est nécessaire pour traiter votre demande.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      company,
      fullName,
      phone,
      email,
      city,
      establishmentType,
      users,
      solutionType,
      message,
      consent,
    },
  };
}
