"use client";

import { motion } from "framer-motion";
import { springContainer } from "@/lib/spring";

interface PromptForkBranchSvgProps {
  visible: boolean;
  reducedMotion: boolean;
}

export function PromptForkBranchSvg({
  visible,
  reducedMotion,
}: PromptForkBranchSvgProps) {
  if (!visible) return null;

  const pathTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeInOut" as const };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={springContainer}
      className="pointer-events-none absolute inset-x-0 top-full z-10 mx-auto h-24 max-w-6xl px-4 md:px-8"
      aria-hidden
    >
      <svg
        viewBox="0 0 800 96"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        <motion.path
          d="M 400 0 L 400 32"
          stroke="rgba(107, 54, 255, 0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={pathTransition}
        />
        <motion.path
          d="M 400 32 L 133 96"
          stroke="rgba(107, 54, 255, 0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...pathTransition, delay: reducedMotion ? 0 : 0.15 }}
        />
        <motion.path
          d="M 400 32 L 400 96"
          stroke="rgba(107, 54, 255, 0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...pathTransition, delay: reducedMotion ? 0 : 0.2 }}
        />
        <motion.path
          d="M 400 32 L 667 96"
          stroke="rgba(107, 54, 255, 0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...pathTransition, delay: reducedMotion ? 0 : 0.25 }}
        />
      </svg>
    </motion.div>
  );
}
