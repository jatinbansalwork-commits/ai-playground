"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { INDEX_SLIDE_MONOGRAM } from "@/lib/index-typography";

interface SectionFrameTypingMonogramProps {
  text: string;
  fontSize: number;
  charDelayMs?: number;
}

export function SectionFrameTypingMonogram({
  text,
  fontSize,
  charDelayMs = 85,
}: SectionFrameTypingMonogramProps) {
  const mounted = useIsMounted();
  const reducedMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(
    reducedMotion ? text.length : 0,
  );

  useEffect(() => {
    if (!mounted || reducedMotion) {
      setVisibleCount(text.length);
      return;
    }

    setVisibleCount(0);

    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);
      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, charDelayMs);

    return () => window.clearInterval(intervalId);
  }, [mounted, reducedMotion, text, charDelayMs]);

  const visibleText = text.slice(0, visibleCount);
  const isComplete = visibleCount >= text.length;

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden"
      aria-hidden
    >
      <h3 className={INDEX_SLIDE_MONOGRAM} style={{ fontSize }}>
        {visibleText}
        {!reducedMotion ? (
          <motion.span
            aria-hidden
            className="ml-[0.02em] inline-block w-[0.06em] bg-black"
            style={{ height: "0.85em", verticalAlign: "-0.05em" }}
            animate={{ opacity: isComplete ? [1, 0, 1] : 1 }}
            transition={
              isComplete
                ? { duration: 0.9, repeat: Infinity, ease: "linear" }
                : undefined
            }
          />
        ) : null}
      </h3>
    </div>
  );
}
