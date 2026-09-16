"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Marquee — adapté de Motion Primitives (motion-primitives.com, MIT).
 * Défilement continu avec inertie liée à la vitesse de scroll,
 * pause au survol, arrêt complet si prefers-reduced-motion.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  baseVelocity = 20,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2.5], {
    clamp: false,
  });

  const direction = useRef(1);
  const hovered = useRef(false);
  const reduceMotion = useReducedMotion();

  useAnimationFrame((_time, delta) => {
    if (reduceMotion) return;
    if (pauseOnHover && hovered.current) return;

    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += direction.current * moveBy * velocityFactor.get();

    if (reverse) direction.current = -1;

    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div
      className="relative overflow-hidden whitespace-nowrap"
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
      }}
    >
      <motion.div className={cn("flex w-max items-center", className)} style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
