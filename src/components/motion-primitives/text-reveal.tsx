"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * TextReveal — adapté de Motion Primitives (motion-primitives.com, MIT).
 * Révélation mot à mot : chaque mot monte depuis un masque, une seule fois.
 * Respecte prefers-reduced-motion via la classe motion-reduce.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
  };

  const wordVariants: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={container}
      className={cn("inline", className)}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}
