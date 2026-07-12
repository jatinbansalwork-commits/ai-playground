"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { springClipReveal } from "@/lib/spring";

interface ClipRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function ClipReveal({
  children,
  delay = 0,
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
            : { ...springClipReveal, delay: delay + 0.2 },
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
