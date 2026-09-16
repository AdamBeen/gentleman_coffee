import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

/** En-tête de section : eyebrow doré, titre Cormorant, description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleColor = tone === "light" ? "text-cream" : "text-espresso";
  const descColor = tone === "light" ? "text-cream/70" : "text-roasted/80";

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-caramel">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-3xl leading-tight font-medium sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-base leading-relaxed ${descColor}`}>{description}</p>
      ) : null}
    </Reveal>
  );
}
