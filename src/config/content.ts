/**
 * Contenu éditorial du site — familles de machines, services,
 * établissements, processus. Centralisé pour être facilement
 * modifiable et réutilisable entre les pages.
 *
 * TODO: remplacer les illustrations par de vraies photographies
 * produits et enrichir les descriptions avec le client.
 */

import type { MachineVariant } from "@/components/ui/MachineIllustration";

export type MachineFamily = {
  slug: string;
  name: string;
  short: string;
  description: string;
  benefits: string[];
  variant: MachineVariant;
};

export const machineFamilies: MachineFamily[] = [
  {
    slug: "machines-a-cafe",
    name: "Machines à café",
    short: "Café de qualité, servi automatiquement, à tout moment de la journée.",
    description:
      "Des solutions de café automatiques pour offrir à vos équipes et à vos visiteurs un café de qualité, disponible en permanence et sans contrainte d'organisation. Expresso, café long, boissons chaudes : la solution s'adapte à vos volumes et à votre espace.",
    benefits: [
      "Café de qualité, disponible en continu",
      "Aucune gestion quotidienne pour vos équipes",
      "Adapté aux petits comme aux grands effectifs",
      "Entretien et réassort pris en charge",
    ],
    variant: "cafe",
  },
  {
    slug: "snacking",
    name: "Distributeurs snacks",
    short: "Snacks et biscuits accessibles à tout moment sur votre site.",
    description:
      "Offrez une pause gourmande à vos équipes et visiteurs avec des distributeurs de snacks et biscuits. Une solution pratique qui s'installe dans un espace réduit et s'approvisionne selon vos besoins.",
    benefits: [
      "Large choix de snacks et biscuits",
      "Installation compacte, facile à intégrer",
      "Réassort régulier organisé avec vous",
      "Solution sans contrainte de personnel",
    ],
    variant: "snack",
  },
  {
    slug: "boissons-fraiches",
    name: "Boissons fraîches",
    short: "Boissons fraîches et canettes, disponibles en libre-service.",
    description:
      "Des distributeurs de boissons fraîches pour proposer eau, sodas et jus de fruits en libre-service. Idéal pour les zones de repos, les salles de pause ou les espaces d'accueil à forte fréquentation.",
    benefits: [
      "Boissons fraîches en libre-service",
      "Adapté aux zones de fort passage",
      "Température et variété maîtrisées",
      "Suivi et réassort inclus dans le service",
    ],
    variant: "boissons",
  },
  {
    slug: "solutions-combinees",
    name: "Solutions combinées",
    short: "Café, boissons et snacking réunis dans une seule machine.",
    description:
      "Une solution tout-en-un qui réunit café, boissons et snacking dans un seul distributeur. La réponse idéale lorsque l'espace est compté ou pour centraliser l'offre dans un point unique de votre établissement.",
    benefits: [
      "Trois univers en une seule machine",
      "Optimisation de l'espace disponible",
      "Un seul interlocuteur, un seul suivi",
      "Adaptée aux attentes variées des visiteurs",
    ],
    variant: "combine",
  },
];

export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Conseil",
    description:
      "Analyse de votre espace, de vos usages et de vos effectifs pour vous orienter vers la solution la plus adaptée.",
  },
  {
    title: "Installation",
    description:
      "Mise en place du distributeur dans votre établissement, aux emplacements définis ensemble.",
  },
  {
    title: "Mise en service",
    description:
      "Paramétrage, tests et vérification du bon fonctionnement avant la première utilisation.",
  },
  {
    title: "Approvisionnement",
    description:
      "Réassort organisé des produits pour que la machine reste toujours disponible.",
  },
  {
    title: "Entretien",
    description:
      "Nettoyage et entretien régulier des machines pour préserver la qualité des boissons et produits.",
  },
  {
    title: "Maintenance",
    description:
      "Suivi des machines et intervention en cas de dysfonctionnement, avec un contact local unique.",
  },
];

export const establishments = [
  {
    name: "Entreprise",
    description:
      "Offrez à vos équipes un café de qualité et un snacking pratique, sans charge de gestion supplémentaire.",
  },
  {
    name: "Hôtel",
    description:
      "Une solution de boissons chaudes et fraîches disponible pour vos clients, jour et nuit.",
  },
  {
    name: "Commerce",
    description:
      "Un point de café ou de snacking pour vos clients et vos équipes, adapté à votre espace.",
  },
  {
    name: "Salle de sport",
    description:
      "Boissons fraîches et snacks accessibles avant, pendant et après l'effort.",
  },
  {
    name: "Garage",
    description:
      "Un distributeur pour accueillir vos clients pendant l'attente et équiper votre atelier.",
  },
  {
    name: "Établissement scolaire",
    description:
      "Des solutions de boissons et snacking adaptées aux espaces de vie des élèves et du personnel.",
  },
  {
    name: "Clinique",
    description:
      "Café et boissons disponibles pour les visiteurs, les patients et le personnel, à tout moment.",
  },
  {
    name: "Espace d'accueil",
    description:
      "Un accueil chaleureux avec un café de qualité proposé à vos visiteurs en attente.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Étude",
    description:
      "Nous échangeons sur votre établissement, vos usages et vos contraintes pour comprendre votre besoin réel.",
  },
  {
    number: "02",
    title: "Choix de la solution",
    description:
      "Nous vous proposons la combinaison de machines et de services la plus adaptée à votre situation.",
  },
  {
    number: "03",
    title: "Installation",
    description:
      "Nous installons et mettons en service le matériel dans votre établissement, sans disruption.",
  },
  {
    number: "04",
    title: "Suivi",
    description:
      "Approvisionnement, entretien et maintenance : nous restons à vos côtés dans la durée.",
  },
];
