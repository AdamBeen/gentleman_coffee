import { siteConfig } from "@/config/site";

/**
 * Coordonnées affichées à côté du formulaire.
 * Toutes les valeurs proviennent de src/config/site.ts —
 * les champs non renseignés affichent un TODO explicite,
 * aucune donnée n'est inventée.
 */
export function ContactInfo() {
  const { phone, email, address, postalCode, city, openingHours } = siteConfig;

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Téléphone",
      value: phone ? (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="transition-colors hover:text-gold"
        >
          {phone}
        </a>
      ) : (
        <span className="text-cream/40">TODO : numéro à renseigner</span>
      ),
    },
    {
      label: "E-mail",
      value: email ? (
        <a href={`mailto:${email}`} className="transition-colors hover:text-gold">
          {email}
        </a>
      ) : (
        <span className="text-cream/45">TODO : adresse e-mail à renseigner</span>
      ),
    },
    {
      label: "Adresse",
      value:
        address || postalCode || city ? (
          <span>
            {address}
            {address && (postalCode || city) ? ", " : ""}
            {postalCode} {city}
          </span>
        ) : (
          <span className="text-cream/45">TODO : adresse à renseigner</span>
        ),
    },
    {
      label: "Horaires",
      value:
        openingHours.length > 0 ? (
          <ul className="flex flex-col gap-0.5">
            {openingHours.map((h) => (
              <li key={h.days}>
                {h.days} : {h.hours}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-cream/45">TODO : horaires à renseigner</span>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-gold/25 bg-espresso p-8 text-cream lg:p-10">
      <h2 className="font-display text-2xl font-medium text-champagne">
        Nous contacter directement
      </h2>
      <dl className="flex flex-col divide-y divide-cream/10">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <dt className="text-xs font-semibold tracking-[0.18em] text-champagne uppercase">
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed text-cream/80">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="text-xs leading-relaxed text-cream/45">
        Ces informations sont gérées dans le fichier{" "}
        <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">
          src/config/site.ts
        </code>
        .
      </p>
    </div>
  );
}
