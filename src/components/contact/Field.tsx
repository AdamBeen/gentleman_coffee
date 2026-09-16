/** Champ de formulaire : label, contrôle, aide et erreur. */
export function Field({
  label,
  name,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-espresso">
        {label}
        {required ? (
          <span className="ml-1 text-caramel" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? <p className="text-right text-xs text-roasted/50">{hint}</p> : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}

export function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-xs text-[#b4432f]">
      {children}
    </p>
  );
}

export function fieldClass(hasError: string | boolean | undefined) {
  return hasError ? "field field-error" : "field";
}
