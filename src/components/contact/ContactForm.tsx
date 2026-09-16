"use client";

import { useState } from "react";
import { establishmentTypes, solutionTypes } from "@/config/site";
import { validateContactForm, type FieldErrors } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

function fieldClass(hasError: string | boolean | undefined) {
  return hasError ? "field field-error" : "field";
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      company: String(formData.get("company") ?? ""),
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      establishmentType: String(formData.get("establishmentType") ?? ""),
      users: String(formData.get("users") ?? ""),
      solutionType: String(formData.get("solutionType") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
    };

    // Validation côté client (même schéma que le serveur)
    const result = validateContactForm(payload);
    if (!result.valid) {
      setErrors(result.errors);
      setServerMessage("");
      setStatus("error");
      return;
    }

    setErrors({});
    setServerMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        status?: string;
        message?: string;
        errors?: FieldErrors;
      };

      if (res.ok && json.status === "success") {
        setStatus("success");
        setServerMessage(json.message ?? "");
        form.reset();
        setMessageLength(0);
      } else {
        if (json.errors) setErrors(json.errors);
        setServerMessage(
          json.message ??
            "Une erreur est survenue. Merci de réessayer dans quelques instants."
        );
        setStatus("error");
      }
    } catch {
      setServerMessage(
        "Impossible d'envoyer votre demande. Vérifiez votre connexion puis réessayez."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
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
          {serverMessage ||
            "Nous revenons vers vous rapidement avec une proposition adaptée à votre établissement."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-caramel underline-offset-4 hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === "error" && !hasErrors(errors) && serverMessage ? (
        <div
          role="alert"
          className="rounded-lg border border-[#b4432f]/40 bg-[#b4432f]/5 px-4 py-3 text-sm text-[#8a3324]"
        >
          {serverMessage}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Entreprise" name="company" required error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            placeholder="Nom de votre entreprise"
            className={fieldClass(errors.company)}
            aria-invalid={Boolean(errors.company)}
          />
        </Field>

        <Field label="Nom et prénom" name="fullName" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="Votre nom"
            className={fieldClass(errors.fullName)}
            aria-invalid={Boolean(errors.fullName)}
          />
        </Field>

        <Field label="Téléphone" name="phone" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="06 12 34 56 78"
            className={fieldClass(errors.phone)}
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>

        <Field label="E-mail" name="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="vous@entreprise.fr"
            className={fieldClass(errors.email)}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label="Ville" name="city" error={errors.city}>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Bordeaux"
            className={fieldClass(errors.city)}
          />
        </Field>

        <Field
          label="Type d'établissement"
          name="establishmentType"
          error={errors.establishmentType}
        >
          <select
            id="establishmentType"
            name="establishmentType"
            defaultValue=""
            className={fieldClass(Boolean(errors.establishmentType))}
          >
            <option value="" disabled>
              Sélectionner…
            </option>
            {establishmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Nombre approximatif d'utilisateurs"
          name="users"
          required
          error={errors.users}
        >
          <input
            id="users"
            name="users"
            type="text"
            inputMode="numeric"
            required
            placeholder="Ex. 30 personnes"
            className={fieldClass(errors.users)}
            aria-invalid={Boolean(errors.users)}
          />
        </Field>

        <Field label="Type de solution" name="solutionType" required error={errors.solutionType}>
          <select
            id="solutionType"
            name="solutionType"
            required
            defaultValue=""
            className={fieldClass(Boolean(errors.solutionType))}
            aria-invalid={Boolean(errors.solutionType)}
          >
            <option value="" disabled>
              Sélectionner…
            </option>
            {solutionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Message"
        name="message"
        error={errors.message}
        hint={`${messageLength}/2000`}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          placeholder="Décrivez votre projet : type d'établissement, emplacement envisagé, besoins spécifiques…"
          className={`${fieldClass(Boolean(errors.message))} resize-y`}
          onChange={(e) => setMessageLength(e.target.value.length)}
        />
      </Field>

      {/* Consentement obligatoire */}
      <div className="flex flex-col gap-1.5">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-roasted/85">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[#8C5A32]"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            J’accepte que les informations transmises soient utilisées pour
            traiter ma demande, conformément à la{" "}
            <a
              href="/politique-de-confidentialite"
              className="font-semibold text-caramel underline-offset-2 hover:underline"
            >
              politique de confidentialité
            </a>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="text-xs text-[#b4432f]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
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
        ) : (
          "Recevoir une étude personnalisée"
        )}
      </button>
    </form>
  );
}

function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

function Field({
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
      {error ? (
        <p role="alert" className="text-xs text-[#b4432f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
