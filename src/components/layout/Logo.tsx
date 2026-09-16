import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Logo Gentelman Coffee — registre B2B premium.
 * Marque abstraite au trait (grain de café stylisé, sans tasse ni
 * vapeur) + wordmark typographique. Fonctionne en favicon, navbar
 * et footer, monochrome or sur fond sombre.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const wordColor = tone === "light" ? "text-cream" : "text-espresso";
  const subColor = tone === "light" ? "text-champagne" : "text-caramel";

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3.5"
      aria-label={`${siteConfig.businessName} · retour à l'accueil`}
    >
      {/* Marque : grain de café abstrait, trait fin */}
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-[1.04]"
        aria-hidden="true"
        focusable="false"
      >
        <ellipse
          cx="20"
          cy="20"
          rx="9.5"
          ry="15"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1.4"
        />
        <path
          d="M20 6.5 C 15.5 13, 24.5 18.5, 20 20 C 15.5 21.5, 25.5 27, 20 33.5"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-semibold tracking-[0.14em] uppercase ${wordColor}`}
        >
          Gentelman
        </span>
        <span
          className={`mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.52em] ${subColor} transition-colors group-hover:text-gold`}
        >
          Coffee
        </span>
      </span>
    </Link>
  );
}
