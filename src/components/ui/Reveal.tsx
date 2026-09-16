"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Délai avant l'animation, en secondes. */
  delay?: number;
  /** Décalage vertical initial en px. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
};

/**
 * Révélation douce au scroll (fade + translation).
 * Désactivée automatiquement si prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </MotionTag>
  );
}
