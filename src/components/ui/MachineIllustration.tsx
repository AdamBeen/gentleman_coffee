/**
 * Illustrations vectorielles des familles de machines.
 * Dessin au trait élégant (laiton sur fond sombre) — servent
 * d'emplacement premium en attendant les vraies photographies.
 * TODO: remplacer par des photographies produits réelles.
 */
export type MachineVariant = "cafe" | "snack" | "boissons" | "combine";

const titles: Record<MachineVariant, string> = {
  cafe: "Machine à café professionnelle",
  snack: "Distributeur de snacks",
  boissons: "Distributeur de boissons fraîches",
  combine: "Solution combinée café & snacking",
};

export function MachineIllustration({
  variant,
  className = "",
}: {
  variant: MachineVariant;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 420"
      role="img"
      aria-label={titles[variant]}
      focusable="false"
    >
      <defs>
        <linearGradient id={`gc-body-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3A2418" />
          <stop offset="100%" stopColor="#21150F" />
        </linearGradient>
      </defs>

      {/* Corps du distributeur */}
      <rect x="60" y="24" width="200" height="372" rx="14" fill={`url(#gc-body-${variant})`} stroke="#C6A15B" strokeWidth="1.5" />
      {/* Pieds */}
      <rect x="76" y="396" width="26" height="10" rx="3" fill="#C6A15B" fillOpacity="0.6" />
      <rect x="218" y="396" width="26" height="10" rx="3" fill="#C6A15B" fillOpacity="0.6" />

      {variant === "cafe" && (
        <>
          {/* Écran / panneau */}
          <rect x="84" y="52" width="152" height="70" rx="8" fill="none" stroke="#E0C995" strokeWidth="1.2" />
          <circle cx="160" cy="87" r="22" fill="none" stroke="#C6A15B" strokeWidth="1.2" />
          <path d="M148 96 q12 8 24 0" fill="none" stroke="#C6A15B" strokeWidth="1.2" />
          {/* Bec verseur */}
          <rect x="140" y="140" width="40" height="14" rx="4" fill="#C6A15B" fillOpacity="0.55" />
          {/* Gobelet */}
          <path d="M146 176 h28 l-5 34 h-18 Z" fill="none" stroke="#E0C995" strokeWidth="1.2" />
          {/* Vapeur */}
          <path d="M154 166 q3 -8 -2 -14 M166 166 q3 -8 -2 -14" fill="none" stroke="#E0C995" strokeOpacity="0.7" strokeWidth="1.2" />
          {/* Zone de retrait */}
          <rect x="96" y="230" width="128" height="64" rx="8" fill="none" stroke="#C6A15B" strokeOpacity="0.6" strokeWidth="1.2" />
          <rect x="84" y="318" width="152" height="56" rx="8" fill="#C6A15B" fillOpacity="0.12" stroke="#C6A15B" strokeOpacity="0.6" strokeWidth="1.2" />
        </>
      )}

      {variant === "snack" && (
        <>
          {/* Vitrine à spirales */}
          <rect x="84" y="52" width="152" height="200" rx="8" fill="none" stroke="#E0C995" strokeWidth="1.2" />
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={94 + col * 48}
                y={64 + row * 62}
                width="38"
                height="50"
                rx="5"
                fill="none"
                stroke="#C6A15B"
                strokeOpacity="0.7"
                strokeWidth="1.1"
              />
            ))
          )}
          {/* Zone de retrait */}
          <rect x="84" y="272" width="152" height="56" rx="8" fill="#C6A15B" fillOpacity="0.12" stroke="#C6A15B" strokeOpacity="0.6" strokeWidth="1.2" />
          <rect x="84" y="344" width="152" height="30" rx="6" fill="none" stroke="#C6A15B" strokeOpacity="0.5" strokeWidth="1.1" />
        </>
      )}

      {variant === "boissons" && (
        <>
          {/* Vitrine bouteilles / canettes */}
          <rect x="84" y="52" width="152" height="170" rx="8" fill="none" stroke="#E0C995" strokeWidth="1.2" />
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={92 + col * 36}
                y={64 + row * 52}
                width="26"
                height="42"
                rx="4"
                fill="none"
                stroke="#C6A15B"
                strokeOpacity="0.7"
                strokeWidth="1.1"
              />
            ))
          )}
          {/* Zone de retrait */}
          <rect x="84" y="240" width="152" height="64" rx="8" fill="#C6A15B" fillOpacity="0.12" stroke="#C6A15B" strokeOpacity="0.6" strokeWidth="1.2" />
          <rect x="84" y="322" width="152" height="52" rx="8" fill="none" stroke="#C6A15B" strokeOpacity="0.5" strokeWidth="1.1" />
        </>
      )}

      {variant === "combine" && (
        <>
          {/* Partie café (haut) */}
          <rect x="84" y="52" width="152" height="96" rx="8" fill="none" stroke="#E0C995" strokeWidth="1.2" />
          <circle cx="160" cy="100" r="20" fill="none" stroke="#C6A15B" strokeWidth="1.2" />
          <path d="M150 108 q10 7 20 0" fill="none" stroke="#C6A15B" strokeWidth="1.2" />
          {/* Séparateur */}
          <line x1="84" y1="164" x2="236" y2="164" stroke="#C6A15B" strokeOpacity="0.5" strokeWidth="1" />
          {/* Partie snacks (bas) */}
          <rect x="84" y="180" width="152" height="118" rx="8" fill="none" stroke="#E0C995" strokeWidth="1.2" />
          {[0, 1].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={94 + col * 48}
                y={192 + row * 52}
                width="38"
                height="42"
                rx="5"
                fill="none"
                stroke="#C6A15B"
                strokeOpacity="0.7"
                strokeWidth="1.1"
              />
            ))
          )}
          <rect x="84" y="322" width="152" height="52" rx="8" fill="#C6A15B" fillOpacity="0.12" stroke="#C6A15B" strokeOpacity="0.6" strokeWidth="1.2" />
        </>
      )}
    </svg>
  );
}
