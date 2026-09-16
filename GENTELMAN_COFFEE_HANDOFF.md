# GENTELMAN COFFEE — Handoff du site vitrine

Site vitrine premium de **Gentelman Coffee**, entreprise bordelaise B2B
spécialisée dans les machines et distributeurs automatiques (café, boissons,
snacks, solutions combinées).

Version : déployable sur Vercel dès aujourd'hui, sous réserve de compléter
les informations client listées plus bas.

---

## 1. Stack

| Élément | Choix |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Langage | TypeScript strict |
| UI | React 19 + Tailwind CSS v4 (design tokens CSS dans `globals.css`) |
| Motion | `motion` (révélations au scroll sobres, `prefers-reduced-motion` respecté) |
| Polices | Cormorant Garamond (titres) + Manrope (texte) via `next/font` |
| Carte | OpenStreetMap (iframe, sans clé API) |
| E-mail | Resend **ou** Brevo (API REST, appelée côté serveur uniquement — Brevo : plan gratuit 300 emails/jour) |

Aucune autre dépendance n'a été ajoutée volontairement.

## 2. Architecture

```
src/
├── app/
│   ├── layout.tsx              # Layout racine : navbar, footer, JSON-LD, skip-link
│   ├── page.tsx                # Accueil
│   ├── globals.css             # Design tokens (palette café) + styles de base
│   ├── icon.svg                # Favicon (tasse stylisée, or sur espresso)
│   ├── opengraph-image.tsx     # Image Open Graph générée aux couleurs de la marque
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   ├── machines/page.tsx       # Nos machines (4 familles)
│   ├── services/page.tsx       # Nos services (parcours en timeline)
│   ├── a-propos/page.tsx       # À propos (zones de contenu configurables)
│   ├── contact/page.tsx        # Contact (formulaire + carte)
│   ├── mentions-legales/page.tsx
│   ├── politique-de-confidentialite/page.tsx
│   └── api/contact/route.ts    # POST : validation serveur + envoi Resend
├── components/
│   ├── layout/                 # Navbar (responsive + menu mobile), Footer, Logo
│   ├── home/                   # Hero, Categories, Services, Etablissements,
│   │                           # LocalSection, Process, CtaBanner
│   ├── contact/                # ContactForm (client), ContactInfo, MapSection
│   ├── ui/                     # Button, Reveal, SectionHeading,
│   │                           # MachineIllustration, OrganicBackground
│   └── seo/                    # LocalBusinessJsonLd
├── config/
│   ├── site.ts                 # ⚙️ CONFIGURATION CENTRALE (contact, légal, carte)
│   └── content.ts              # Contenus éditoriaux (machines, services, process)
└── lib/
    └── validation.ts           # Schéma de validation partagé client/serveur
```

## 3. Routes

| Route | Type | Description |
|---|---|---|
| `/` | Statique | Accueil : hero, catégories, services, établissements, Bordeaux, processus, CTA |
| `/machines` | Statique | 4 familles (ancres : `#machines-a-cafe`, `#snacking`, `#boissons-fraiches`, `#solutions-combinees`) |
| `/services` | Statique | Parcours service en timeline (conseil → accompagnement) |
| `/a-propos` | Statique | Positionnement local + zones configurables |
| `/contact` | Statique | Formulaire + coordonnées + carte OSM |
| `/mentions-legales` | Statique (noindex) | Mentions légales (TODO à compléter) |
| `/politique-de-confidentialite` | Statique (noindex) | RGPD |
| `/api/contact` | Dynamique | POST formulaire (validation serveur + Resend) |
| `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/opengraph-image` | Statiques | SEO |

## 4. Variables d'environnement

Créer un fichier `.env.local` (jamais committé) à partir des clés ci-dessous.
Elles sont **côté serveur uniquement** — aucune clé n'est exposée au client.

```bash
# Fournisseur e-mail : configurer UN SEUL des deux.

# Option A — Resend (plan gratuit 100 emails/jour) — https://resend.com/api-keys
RESEND_API_KEY=

# Option B — Brevo, ex-Sendinblue (plan gratuit 300 emails/jour, société française)
# https://app.brevo.com/settings/keys/api
BREVO_API_KEY=

# Expéditeur validé chez le fournisseur, ex. contact@votredomaine.fr
CONTACT_FROM=

# Destinataire des demandes, ex. contact@gentelmancoffee.fr
CONTACT_TO=

# URL de production (canonicals, sitemap, robots)
NEXT_PUBLIC_SITE_URL=
```

Comportement du formulaire :
- Si aucune clé fournisseur n'est configurée (ou `CONTACT_FROM` /
  `CONTACT_TO` absentes), la requête est validée puis **journalisée côté
  serveur** (utile pour la recette) et renvoie `success`.
- Resend est prioritaire si les deux clés sont présentes.
- Dès qu'un fournisseur + `CONTACT_FROM` + `CONTACT_TO` sont définis sur
  Vercel, l'envoi réel s'effectue sans modification de code.

## 5. Configuration client — `src/config/site.ts`

**Toutes les données inconnues y sont laissées vides avec un TODO explicite.
Rien n'a été inventé.** À compléter avant la mise en production :

- [ ] `legalName` — dénomination sociale exacte
- [ ] `phone`, `email` — coordonnées affichées (contact + footer)
- [ ] `address`, `postalCode` — adresse postale
- [ ] `latitude`, `longitude` — active la carte OpenStreetMap (placeholder sinon)
- [ ] `openingHours` — horaires affichés sur /contact
- [ ] `serviceAreas` — communes réellement desservies
- [ ] `socialLinks` — réseaux sociaux
- [ ] `legal.*` — forme juridique, SIRET, TVA, directeur de publication, hébergeur
- [ ] `siteUrl` — URL finale de production

Contenus éditoriaux à enrichir dans `src/config/content.ts` :
- [ ] Vraies photographies produits (remplacer `MachineIllustration`)
- [ ] Références/marques de machines réelles
- [ ] Histoire / fondateur / engagements (zones déjà prévues sur `/a-propos`)

## 6. Instructions Vercel

1. Pousser le dépôt sur GitHub/GitLab/Bitbucket.
2. Sur [vercel.com](https://vercel.com) : **Add New → Project** → importer le dépôt.
3. Framework détecté automatiquement (Next.js) — ne rien changer au build
   (`npm run build`).
4. Ajouter les variables d'environnement (section 4) dans
   **Settings → Environment Variables**.
5. Déployer, puis renseigner `NEXT_PUBLIC_SITE_URL` avec l'URL finale et
   redéployer (canonicals + sitemap corrects).
6. Configurer le domaine client dans **Settings → Domains**.

## 7. Checklist avant présentation client

- [x] `npm run lint` — 0 erreur
- [x] `npx tsc --noEmit` — 0 erreur
- [x] `npm run build` — succès, 14 pages générées
- [x] Toutes les routes répondent 200 (testées en production locale)
- [x] Formulaire : validation client + serveur, états loading / succès / erreur
- [ ] Renseigner `src/config/site.ts` avec les vraies informations client
- [ ] Remplacer les illustrations SVG par de vraies photographies
- [ ] Vérifier le rendu mobile (375 px), tablette, desktop
- [ ] Tester le formulaire de bout en bout avec Resend configuré
- [ ] Vérifier la carte après ajout des coordonnées GPS

## 7. Notes techniques

- **Design tokens** : palette complète (espresso → champagne) dans
  `@theme` de `globals.css` ; classes utilitaires `container-site`, `gold-rule`.
- **Motion** : seul composant client animé = `Reveal` (fade + translate au
  scroll, une seule fois, désactivé si `prefers-reduced-motion`).
- **Performance** : pages quasi entièrement en Server Components ; seuls la
  Navbar, le formulaire et les reveals sont des Client Components.
- **Accessibilité** : skip-link, focus visible, labels réels, `aria-invalid`,
  contrastes vérifiés, HTML sémantique.
- **JSON-LD LocalBusiness** : `src/components/seo/LocalBusinessJsonLd.tsx` —
  se remplit automatiquement depuis `siteConfig` (ne publie que les champs
  renseignés).
