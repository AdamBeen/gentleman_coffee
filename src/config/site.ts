/**
 * ============================================================
 *  GENTELMAN COFFEE — CONFIGURATION CENTRALE DU SITE
 * ============================================================
 * Toutes les informations client (contact, légal, localisation)
 * sont centralisées ici. AUCUNE donnée n'est inventée :
 * les valeurs inconnues sont vides ("") ou marquées TODO.
 *
 * ⚠️ À compléter avec le client avant la mise en production.
 * ============================================================
 */

export const siteConfig = {
  /** Nom commercial affiché sur le site */
  businessName: "Gentelman Coffee",

  /** Raison sociale exacte (TODO : demander au client — SARL, SAS… ?) */
  legalName: "",

  /** Accroche courte utilisée en footer / metadata */
  tagline:
    "Distributeurs automatiques de café, boissons et snacking à Bordeaux & Gironde",

  /** Description SEO par défaut (factuelle, sans promesse inventée) */
  description:
    "Gentelman Coffee équipe entreprises, commerces et établissements avec des solutions automatiques de café, boissons et snacking adaptées à leurs besoins. Bordeaux & Gironde.",

  /** URL de production (TODO : renseigner après déploiement Vercel) */
  siteUrl: "",

  // ------------------------------------------------------------
  // CONTACT — TODO : toutes ces valeurs doivent être fournies
  // ------------------------------------------------------------
  phone: "", // TODO: numéro de téléphone
  email: "", // TODO: adresse e-mail professionnelle
  address: "", // TODO: adresse postale (rue et numéro)
  postalCode: "", // TODO: code postal
  city: "Bordeaux", // Ville d'activité annoncée — à confirmer avec le client

  // ------------------------------------------------------------
  // LOCALISATION CARTE (OpenStreetMap)
  // Laisser null pour afficher le placeholder premium.
  // TODO: fournir latitude / longitude (format décimal, ex. 44.8378 / -0.5792)
  // ------------------------------------------------------------
  latitude: null as number | null,
  longitude: null as number | null,

  // ------------------------------------------------------------
  // HORAIRES — TODO: fournir les horaires réels
  // ------------------------------------------------------------
  openingHours: [] as { days: string; hours: string }[],

  // ------------------------------------------------------------
  // ZONES DE SERVICE — Bordeaux & Gironde annoncés dans le brief.
  // TODO: affiner avec le client (communes desservies).
  // ------------------------------------------------------------
  serviceAreas: ["Bordeaux", "Gironde"] as string[],

  // ------------------------------------------------------------
  // RÉSEAUX SOCIAUX — TODO: fournir les liens réels
  // ------------------------------------------------------------
  socialLinks: {
    linkedin: "", // TODO
    facebook: "", // TODO
    instagram: "", // TODO
  },

  // ------------------------------------------------------------
  // MENTIONS LÉGALES — TODO: toutes ces valeurs sont obligatoires
  // pour une page mentions légales conforme.
  // ------------------------------------------------------------
  legal: {
    legalForm: "", // TODO: forme juridique (SARL, SAS…)
    siret: "", // TODO: numéro SIRET
    vatNumber: "", // TODO: n° TVA intracommunautaire si applicable
    registeredOffice: "", // TODO: siège social (si différent de l'adresse)
    publicationDirector: "", // TODO: directeur de la publication
    host: "", // TODO: hébergeur (Vercel Inc. + adresse) après déploiement
  },
};

/** URL canonique de secours si siteUrl n'est pas encore configurée. */
export function getSiteUrl(): string {
  return siteConfig.siteUrl || "https://gentelman-coffee.vercel.app";
}

/** Vrai si les coordonnées de contact sont renseignées. */
export function hasContactInfo(): boolean {
  return Boolean(siteConfig.phone || siteConfig.email);
}

/** Options du formulaire de contact — types d'établissement. */
export const establishmentTypes = [
  "Entreprise / Bureau",
  "Hôtel",
  "Commerce",
  "Salle de sport",
  "Garage",
  "Établissement scolaire",
  "Clinique / Santé",
  "Espace d'accueil",
  "Autre",
] as const;

/** Options du formulaire de contact — types de solution. */
export const solutionTypes = [
  "Café",
  "Snacking",
  "Boissons",
  "Solution combinée",
  "Je ne sais pas encore",
] as const;
