"use client";

import { useState } from "react";
import { establishmentTypes, solutionTypes } from "@/config/site";
import { Select } from "@/components/ui/select";
import { useContactForm } from "@/components/contact/useContactForm";
import { SuccessPanel } from "@/components/contact/SuccessPanel";
import { SubmitButton } from "@/components/contact/SubmitButton";
import { Field, FieldError, fieldClass } from "@/components/contact/Field";

/**
 * Formulaire de contact — orchestrateur. La logique d'état et
 * d'envoi vit dans useContactForm, l'affichage dans les
 * sous-composants (Field, Select, SuccessPanel, SubmitButton).
 */
export function ContactForm() {
  const form = useContactForm();
  const [messageLength, setMessageLength] = useState(0);

  if (form.status === "success") {
    return <SuccessPanel message={form.serverMessage} onReset={form.reset} />;
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="flex flex-col gap-5">
      {form.status === "error" && !hasErrors(form.errors) && form.serverMessage ? (
        <ServerAlert message={form.serverMessage} />
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Entreprise" name="company" required error={form.errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            placeholder="Nom de votre entreprise"
            className={fieldClass(form.errors.company)}
            aria-invalid={Boolean(form.errors.company)}
          />
        </Field>

        <Field label="Nom et prénom" name="fullName" required error={form.errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="Votre nom"
            className={fieldClass(form.errors.fullName)}
            aria-invalid={Boolean(form.errors.fullName)}
          />
        </Field>

        <Field label="Téléphone" name="phone" required error={form.errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="06 12 34 56 78"
            className={fieldClass(form.errors.phone)}
            aria-invalid={Boolean(form.errors.phone)}
          />
        </Field>

        <Field label="E-mail" name="email" required error={form.errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="vous@entreprise.fr"
            className={fieldClass(form.errors.email)}
            aria-invalid={Boolean(form.errors.email)}
          />
        </Field>

        <Field label="Ville" name="city" error={form.errors.city}>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Bordeaux"
            className={fieldClass(form.errors.city)}
          />
        </Field>

        <Select
          name="establishmentType"
          label="Type d'établissement"
          options={establishmentTypes}
          value={form.establishmentType}
          onChange={form.setEstablishmentType}
          placeholder="Sélectionner…"
          error={form.errors.establishmentType}
          required
        />

        <Field
          label="Nombre approximatif d'utilisateurs"
          name="users"
          required
          error={form.errors.users}
        >
          <input
            id="users"
            name="users"
            type="text"
            inputMode="numeric"
            required
            placeholder="Ex. 30 personnes"
            className={fieldClass(form.errors.users)}
            aria-invalid={Boolean(form.errors.users)}
          />
        </Field>

        <Select
          name="solutionType"
          label="Type de solution"
          options={solutionTypes}
          value={form.solutionType}
          onChange={form.setSolutionType}
          placeholder="Sélectionner…"
          error={form.errors.solutionType}
          required
        />
      </div>

      <Field
        label="Message"
        name="message"
        error={form.errors.message}
        hint={`${messageLength}/2000`}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          placeholder="Décrivez votre projet : type d'établissement, emplacement envisagé, besoins spécifiques…"
          className={`${fieldClass(Boolean(form.errors.message))} resize-y`}
          onChange={(e) => setMessageLength(e.target.value.length)}
        />
      </Field>

      <ConsentCheckbox error={form.errors.consent} />

      <SubmitButton loading={form.status === "loading"} />
    </form>
  );
}

function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.keys(errors).length > 0;
}

function ConsentCheckbox({ error }: { error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-roasted/85">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#8C5A32]"
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
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}

function ServerAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-[#b4432f]/40 bg-[#b4432f]/5 px-4 py-3 text-sm text-[#8a3324]"
    >
      {message}
    </div>
  );
}
