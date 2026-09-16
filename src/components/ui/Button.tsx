import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost-light";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 min-h-12";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-espresso hover:bg-champagne focus-visible:bg-champagne",
  secondary:
    "border border-gold/60 text-gold hover:border-gold hover:bg-gold/10",
  "ghost-light":
    "border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/5",
};

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

/** Bouton / CTA du site. Rendu en Link (navigation interne ou ancre). */
export function Button({ href, variant = "primary", children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
