import { cn } from "@/lib/utils";

/**
 * Bande défilante en CSS pur : vitesse constante et lente définie
 * par la durée d'un cycle (translateX de -50 % sur contenu doublé),
 * pause au survol, arrêt complet si prefers-reduced-motion.
 * Aucun JavaScript — le mouvement ne peut pas s'emballer.
 */
export function Marquee({
  children,
  className,
  duration = 45,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Durée d'un cycle complet en secondes (plus long = plus lent). */
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden whitespace-nowrap">
      <div
        className={cn("marquee-track flex w-max items-center", className)}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        data-reverse={reverse || undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
