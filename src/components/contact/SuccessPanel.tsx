/** Panneau de confirmation affiché après un envoi réussi. */
export function SuccessPanel({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-2xl border border-gold/40 bg-soft p-10 text-center"
    >
      <svg
        className="h-12 w-12 text-gold"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="21" />
        <path d="M15 24.5 21.5 31 33 18" />
      </svg>
      <h3 className="font-display text-2xl font-semibold text-espresso">
        Merci, votre demande est bien envoyée
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-roasted/75">
        {message ||
          "Nous revenons vers vous rapidement avec une proposition adaptée à votre établissement."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-sm font-semibold text-caramel underline-offset-4 hover:underline"
      >
        Envoyer une autre demande
      </button>
    </div>
  );
}
