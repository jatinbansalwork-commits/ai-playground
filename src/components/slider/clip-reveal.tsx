"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { springClipReveal } from "@/lib/spring";

interface ClipRevealProps {
  children: React.ReactNode;
  /** Extra stagger after the shared entrance beat (seconds). */
  delay?: number;
  /** Delay before this reveal starts — hero uses 0 so copy lands with pills. */
  baseDelay?: number;
}

export function ClipReveal({
  children,
  delay = 0,
  baseDelay = 0.2,
}: ClipRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div className="overflow-hidden pb-[0.14em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={reducedMotion ? false : { y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          y: reducedMotion
            ? { duration: 0 }
            : { ...springClipReveal, delay: baseDelay + delay },
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
