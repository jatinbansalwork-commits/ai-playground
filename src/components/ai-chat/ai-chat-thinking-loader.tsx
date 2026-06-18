"use client";

import { motion } from "framer-motion";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { springSnappy } from "@/lib/spring";

interface AiChatThinkingLoaderProps {
  reducedMotion: boolean;
}

const DOT_COUNT = 3;

export function AiChatThinkingLoader({
  reducedMotion,
}: AiChatThinkingLoaderProps) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Hang on — Joey, Chandler, and Ross are thinking"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
      transition={springSnappy}
      className={`mr-auto flex items-center gap-2 px-4 py-3 ${EXPERIMENTS_CARD.shell}`}
    >
      <div className="flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: DOT_COUNT }, (_, index) => (
          <motion.span
            key={index}
            className="size-2 rounded-full bg-[#6B36FF]"
            animate={
              reducedMotion
                ? { opacity: 0.85 }
                : {
                    opacity: [0.35, 1, 0.35],
                    y: [0, -4, 0],
                    scale: [1, 1.08, 1],
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.14,
                  }
            }
          />
        ))}
      </div>
      <span className="sr-only">Thinking</span>
    </motion.div>
  );
}
