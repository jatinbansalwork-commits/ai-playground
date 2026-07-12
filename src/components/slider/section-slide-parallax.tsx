"use client";

import { motion, useMotionValueEvent, useSpring } from "framer-motion";
import { useSliderContext } from "@/context/slider-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  FRAME_STRIDE,
  PARALLAX_MAX_DEFAULT,
  PARALLAX_STEP_DIVISOR_DESKTOP,
  PARALLAX_STEP_DIVISOR_TOUCH,
} from "@/lib/constants";
import { springParallax } from "@/lib/spring";

function parallaxStepForViewport(): number {
  if (typeof window === "undefined") {
    return FRAME_STRIDE / PARALLAX_STEP_DIVISOR_DESKTOP;
  }

  const touch =
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(hover: none)").matches;

  return (
    FRAME_STRIDE /
    (touch ? PARALLAX_STEP_DIVISOR_TOUCH : PARALLAX_STEP_DIVISOR_DESKTOP)
  );
}

interface SectionSlideParallaxProps {
  frameIndex: number;
  maxParallax?: number;
  children: React.ReactNode;
}

export function SectionSlideParallax({
  frameIndex,
  maxParallax = PARALLAX_MAX_DEFAULT,
  children,
}: SectionSlideParallaxProps) {
  const { scrollOffset } = useSliderContext();
  const reducedMotion = useReducedMotion();
  const contentX = useSpring(0, springParallax);

  useMotionValueEvent(scrollOffset, "change", (offset) => {
    if (reducedMotion) {
      contentX.jump(0);
      return;
    }

    const boundary = parallaxStepForViewport() * frameIndex;

    if (offset <= boundary) {
      contentX.set(0);
      return;
    }

    const excess = Math.min(offset - boundary, maxParallax);
    contentX.set(-excess);
  });

  if (reducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="flex h-full w-full items-center justify-center overflow-hidden"
      style={{ x: contentX }}
    >
      {children}
    </motion.div>
  );
}
