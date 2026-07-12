"use client";

import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_COPY, HERO_LINES } from "@/lib/constants";
import { INDEX_SLIDE_HERO } from "@/lib/index-typography";
import { springContainer } from "@/lib/spring";
import { ClipReveal } from "@/components/slider/clip-reveal";
import { FrameShell } from "@/components/slider/frame-shell";
import { HeroPhysicsPills } from "@/components/slider/hero-physics-pills";
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
  const reducedMotion = useReducedMotion();

  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      <motion.div
        initial={mounted && !reducedMotion ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={reducedMotion ? { duration: 0 } : springContainer}
        className="relative h-full w-full overflow-hidden text-black"
      >
        <HeroPhysicsPills
          className="z-[1]"
          onInteract={onInteract}
        />

        <div className="index-slide-hero-copy pointer-events-none relative z-10 pt-16 sm:pt-20 md:pt-24">
          <h1 className={INDEX_SLIDE_HERO}>
            {HERO_LINES.map((line, lineIndex) => (
              <span
                key={line}
                className={`index-slide-hero-line block${
                  lineIndex > 0 ? " index-slide-hero-subline" : ""
                }`}
              >
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
