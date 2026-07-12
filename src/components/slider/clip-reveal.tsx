"use client";

import { motion, type Transition } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { springClipReveal } from "@/lib/spring";

interface ClipRevealProps {
  children: React.ReactNode;
  /** Extra stagger after the shared entrance beat (seconds). */
  delay?: number;
  /** Delay before this reveal starts — slide labels use 0.2s; hero copy uses `HERO_CLIP_BASE_DELAY_S`. */
  baseDelay?: number;
  /** Override the default clip-reveal spring — hero uses a snappier curve. */
  spring?: Transition;
  /** Starting offset below the clip mask — hero uses a shorter travel. */
  revealOffset?: string | number;
}

export function ClipReveal({
  children,
  delay = 0,
  baseDelay = 0.2,
  spring = springClipReveal,
  revealOffset = "100%",
}: ClipRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div className="overflow-hidden pb-[0.14em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={reducedMotion ? false : { y: revealOffset }}
        animate={{ y: 0 }}
        transition={{
          y: reducedMotion
            ? { duration: 0 }
            : { ...spring, delay: baseDelay + delay },
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
