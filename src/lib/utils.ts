import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusion de classes Tailwind sans conflit — pattern partagé par
 * Watermelon UI et Motion Primitives. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
