/** Bouton de soumission avec état de chargement intégré. */
export function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <Spinner /> : "Recevoir une étude personnalisée"}
    </button>
  );
}

function Spinner() {
  return (
    <>
      <svg
        className="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-25"
        />
        <path
          d="M12 3a9 9 0 0 1 9 9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      Envoi en cours…
    </>
  );
}
