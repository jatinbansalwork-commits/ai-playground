"use client";

import { motion, useMotionValueEvent, useSpring } from "framer-motion";
import { useLayoutEffect } from "react";
import { useSliderContext } from "@/context/slider-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  PARALLAX_MAX_DEFAULT,
  SCROLL_PER_FRAME,
  SCROLL_PER_FRAME_TOUCH,
} from "@/lib/constants";
import { springParallax } from "@/lib/spring";

function scrollPerFrameForViewport(): number {
  if (typeof window === "undefined") {
    return SCROLL_PER_FRAME;
  }

  const touch =
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(hover: none)").matches;

  return touch ? SCROLL_PER_FRAME_TOUCH : SCROLL_PER_FRAME;
}

function parallaxOffsetForFrame(
  scrollOffset: number,
  frameIndex: number,
  maxParallax: number,
): number {
  const slideStart = scrollPerFrameForViewport() * frameIndex;
  const localOffset = Math.max(0, scrollOffset - slideStart);
  return -Math.min(localOffset, maxParallax);
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

  const syncParallax = (offset: number) => {
    if (reducedMotion) {
      contentX.jump(0);
      return;
    }

    contentX.set(parallaxOffsetForFrame(offset, frameIndex, maxParallax));
  };

  useLayoutEffect(() => {
    syncParallax(scrollOffset.get());
  }, [frameIndex, maxParallax, reducedMotion, scrollOffset, contentX]);

  useMotionValueEvent(scrollOffset, "change", syncParallax);

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
