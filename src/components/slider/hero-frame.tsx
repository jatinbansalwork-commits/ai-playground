"use client";

import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { HERO_COPY, HERO_LINES } from "@/lib/constants";
import { INDEX_SLIDE_HERO, INDEX_SLIDE_HERO_SIZE_PX } from "@/lib/index-typography";
import { springCircle, springContainer } from "@/lib/spring";
import { ClipReveal } from "@/components/slider/clip-reveal";
import { FrameShell } from "@/components/slider/frame-shell";
import type { HeroFrame } from "@/types";

interface HeroFramePanelProps {
  frame: HeroFrame;
  index: number;
  onInteract: () => void;
}

export function HeroFramePanel({
  frame,
  index,
  onInteract,
}: HeroFramePanelProps) {
  const mounted = useIsMounted();

  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      <motion.div
        initial={mounted ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={springContainer}
        className="relative flex h-full items-center p-16 text-black"
      >
        <motion.div
          aria-hidden
          initial={mounted ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{ ...springCircle, delay: 0.4 }}
          className="absolute top-0 right-0 aspect-square h-full rounded-full bg-[#6B36FF] hero-circle pointer-events-none"
        />

        <div className="relative z-10 max-w-[85%]">
          <h1
            className={INDEX_SLIDE_HERO}
            style={{ fontSize: INDEX_SLIDE_HERO_SIZE_PX }}
          >
            {HERO_LINES.map((line, lineIndex) => (
              <span key={line} className="block whitespace-nowrap">
                <ClipReveal delay={lineIndex * 0.1}>{line}</ClipReveal>
              </span>
            ))}
          </h1>
          <h2 className="sr-only">{HERO_COPY}</h2>
        </div>
      </motion.div>
    </FrameShell>
  );
}
