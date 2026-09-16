"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * BlurFade — adapté de Motion Primitives (motion-primitives.com, MIT).
 * Apparition floue + translation au passage dans le viewport, une seule fois.
 * Désactivé proprement si prefers-reduced-motion.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.55,
  yOffset = 14,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: yOffset, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
