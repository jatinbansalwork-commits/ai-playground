"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** False when the user prefers reduced motion. */
export function useMediaAutoplay(): boolean {
  const reducedMotion = useReducedMotion();
  return !reducedMotion;
}
