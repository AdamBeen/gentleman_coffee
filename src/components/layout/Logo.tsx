import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Monogramme + wordmark Gentelman Coffee. */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const wordColor = tone === "light" ? "text-cream" : "text-espresso";
  const subColor = tone === "light" ? "text-champagne" : "text-caramel";

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label={`${siteConfig.businessName} · retour à l'accueil`}
    >
      <svg viewBox="0 0 44 44" className="h-10 w-10 shrink-0" aria-hidden="true" focusable="false">
        <circle cx="22" cy="22" r="20.5" fill="none" stroke="#C6A15B" strokeWidth="1.5" />
        {/* Tasse */}
        <path
          d="M13 18 h14 v8 a7 7 0 0 1 -14 0 Z"
          fill="none"
          stroke="#E0C995"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Anse */}
        <path
          d="M27 19.5 a4 4 0 0 1 0 7"
          fill="none"
          stroke="#E0C995"
          strokeWidth="1.5"
        />
        {/* Vapeur */}
        <path
          d="M17.5 14.5 q1.5 -2 0 -4 M22 14.5 q1.5 -2 0 -4"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Soucoupe */}
        <path d="M15 34 h14" stroke="#C6A15B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-semibold tracking-wide ${wordColor}`}>
          Gentelman
        </span>
        <span
          className={`text-[0.65rem] font-semibold uppercase tracking-[0.42em] ${subColor} transition-colors group-hover:text-gold`}
        >
          Coffee
        </span>
      </span>
    </Link>
  );
}
