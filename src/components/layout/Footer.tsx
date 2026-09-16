import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { siteConfig } from "@/config/site";

const columns = [
  {
    title: "Solutions",
    links: [
      { href: "/machines", label: "Machines à café" },
      { href: "/machines", label: "Distributeurs snacks" },
      { href: "/machines", label: "Distributeurs boissons" },
      { href: "/machines", label: "Solutions combinées" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { href: "/services", label: "Nos services" },
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
      { href: "/contact", label: "Demander une étude" },
    ],
  },
  {
    title: "Informations",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
    ],
  },
];

export function Footer() {
  const hasPhone = Boolean(siteConfig.phone);
  const hasEmail = Boolean(siteConfig.email);

  return (
    <footer className="bg-espresso text-cream/75">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5 lg:py-20">
        {/* Marque */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">
            {siteConfig.tagline ||
              "Solutions automatiques de café, boissons et snacking pour entreprises, commerces et établissements, à Bordeaux & Gironde."}
          </p>
          {(hasPhone || hasEmail) && (
            <address className="flex flex-col gap-1.5 text-sm not-italic">
              {hasPhone && (
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.phone}
                </a>
              )}
              {hasEmail && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              )}
            </address>
          )}
        </div>

        {/* Colonnes de navigation */}
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={`${col.title}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Wordmark géant en contour, débordant du bas (pattern Watermelon footer-15) */}
      <div aria-hidden="true" className="overflow-hidden">
        <p className="wordmark-outline -mb-[0.24em] text-center font-display text-[clamp(2.9rem,13.5vw,13rem)] leading-[0.85] font-semibold tracking-[0.02em] whitespace-nowrap select-none">
          GENTELMAN
        </p>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            {siteConfig.legalName || siteConfig.businessName}. Tous droits réservés.
          </p>
          <p>Bordeaux &amp; Gironde</p>
        </div>
      </div>
    </footer>
  );
}
