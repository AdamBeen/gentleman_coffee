"use client";

import { useState } from "react";
import { validateContactForm, type ContactFormData, type FieldErrors } from "@/lib/validation";

export type FormStatus = "idle" | "loading" | "success" | "error";

type ApiResponse = {
  status?: string;
  message?: string;
  errors?: FieldErrors;
};

/**
 * État et soumission du formulaire de contact : validation client
 * (même schéma que le serveur), appel API, gestion des états
 * idle / loading / succès / erreur.
 */
export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [establishmentType, setEstablishmentType] = useState("");
  const [solutionType, setSolutionType] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const payload = readPayload(form, establishmentType, solutionType);

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
      // La réponse peut ne pas être du JSON (proxy, erreur infra) :
      // on dégrade proprement vers un message compréhensible.
      const json = await res.json().catch(() => null as ApiResponse | null);

      if (res.ok && json?.status === "success") {
        setStatus("success");
        setServerMessage(json.message ?? "");
        form.reset();
        setEstablishmentType("");
        setSolutionType("");
        return;
      }

      if (json?.errors) setErrors(json.errors);
      setServerMessage(
        json?.message ??
          "Une erreur est survenue. Merci de réessayer dans quelques instants."
      );
      setStatus("error");
    } catch {
      setServerMessage(
        "Impossible d'envoyer votre demande. Vérifiez votre connexion puis réessayez."
      );
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setErrors({});
    setServerMessage("");
  }

  return {
    status,
    errors,
    serverMessage,
    establishmentType,
    setEstablishmentType,
    solutionType,
    setSolutionType,
    handleSubmit,
    reset,
  };
}

function readPayload(
  form: HTMLFormElement,
  establishmentType: string,
  solutionType: string
): ContactFormData {
  const formData = new FormData(form);
  return {
    company: String(formData.get("company") ?? ""),
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    city: String(formData.get("city") ?? ""),
    establishmentType,
    users: String(formData.get("users") ?? ""),
    solutionType,
    message: String(formData.get("message") ?? ""),
    consent: formData.get("consent") === "on",
  };
}
