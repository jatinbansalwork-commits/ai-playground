"use client";

import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_COPY, HERO_LINES, FRAME_HEIGHT, FRAME_WIDTH } from "@/lib/constants";
import { INDEX_SLIDE_HERO, INDEX_SLIDE_HERO_SIZE_PX } from "@/lib/index-typography";
import { springCircle, springContainer } from "@/lib/spring";
import { ClipReveal } from "@/components/slider/clip-reveal";
import { FrameShell } from "@/components/slider/frame-shell";
import type { HeroFrame } from "@/types";

const HERO_CIRCLE_TRAVEL_PX = FRAME_WIDTH - FRAME_HEIGHT;

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
        initial={mounted ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={springContainer}
        className="relative flex h-full items-center py-16 text-black"
      >
        <motion.div
          aria-hidden
          initial={mounted ? { scale: 0, y: "-50%" } : false}
          animate={
            mounted
              ? {
                  scale: 1,
                  y: "-50%",
                  x: reducedMotion ? 0 : [0, HERO_CIRCLE_TRAVEL_PX, 0],
                }
              : false
          }
          transition={{
            scale: { ...springCircle, delay: 0.4 },
            x: {
              duration: 7,
              ease: [0.42, 0, 0.58, 1],
              repeat: reducedMotion ? 0 : Infinity,
              delay: 1.1,
            },
          }}
          className="absolute left-0 top-1/2 aspect-square h-full rounded-full bg-[#6B36FF] hero-circle pointer-events-none"
        />

        <div className="relative z-10 max-w-[85%] pl-16">
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
