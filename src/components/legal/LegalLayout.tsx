import type { ReactNode } from "react";

/** Mise en page commune des pages légales. */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-soft py-28 lg:py-36">
      <div className="container-site max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-caramel uppercase">
          Informations légales
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight font-medium text-espresso sm:text-4xl">
          {title}
        </h1>
        {updated ? (
          <p className="mt-2 text-xs text-roasted/55">Dernière mise à jour : {updated}</p>
        ) : null}
        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-roasted/85 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-espresso [&_li]:ml-5 [&_li]:list-disc [&_p+a]:mt-3">
          {children}
        </div>
      </div>
    </section>
  );
}
