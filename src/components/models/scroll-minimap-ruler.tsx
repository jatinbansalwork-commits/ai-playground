"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  CASE_STUDY_CONTENT_TOP_PADDING_PX,
  CASE_STUDY_FOOTER_BOTTOM_PADDING_PX,
} from "@/lib/case-study-a11y";
import { springScrollLine } from "@/lib/spring";

/** 1 = major tick (40px), 0 = minor tick (24px) */
const RULER_TICKS_LAYOUT = [
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 1,
] as const;

const TICK_COUNT = RULER_TICKS_LAYOUT.length;
const BRAND_ACCENT = "var(--brand-accent)";

/** Vertical band where the beam travels — aligned to case study body insets. */
const CASE_STUDY_TRACK_TOP = `${CASE_STUDY_CONTENT_TOP_PADDING_PX}px`;
const CASE_STUDY_TRACK_BOTTOM = `${CASE_STUDY_FOOTER_BOTTOM_PADDING_PX}px`;
const DEFAULT_TRACK_TOP = "5.5rem";
const DEFAULT_TRACK_BOTTOM = "2.5rem";

function getWindowScrollProgress(): number {
  const totalScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  if (totalScroll <= 0) return 0;

  return Math.min(1, Math.max(0, window.scrollY / totalScroll));
}

function getElementScrollProgress(element: HTMLElement): number {
  const totalScroll = element.scrollHeight - element.clientHeight;

  if (totalScroll <= 0) return 0;

  return Math.min(1, Math.max(0, element.scrollTop / totalScroll));
}

interface ScrollMinimapRulerProps {
  /** Scroll container — case study shells use overflow on `<main>`, not `window`. */
  scrollRootRef?: RefObject<HTMLElement | null>;
}

export function ScrollMinimapRuler({ scrollRootRef }: ScrollMinimapRulerProps) {
  const reducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackTop = scrollRootRef ? CASE_STUDY_TRACK_TOP : DEFAULT_TRACK_TOP;
  const trackBottom = scrollRootRef ? CASE_STUDY_TRACK_BOTTOM : DEFAULT_TRACK_BOTTOM;
  const progressMotion = useMotionValue(0);
  const smoothProgress = useSpring(
    progressMotion,
    reducedMotion ? { stiffness: 1000, damping: 100 } : springScrollLine,
  );

  const beamTop = useTransform(smoothProgress, (progress) => `${progress * 100}%`);

  useEffect(() => {
    const root = scrollRootRef?.current ?? null;

    const update = () => {
      const activeRoot = scrollRootRef?.current;
      const nextProgress = activeRoot
        ? getElementScrollProgress(activeRoot)
        : getWindowScrollProgress();

      progressMotion.set(nextProgress);
      setScrollProgress(nextProgress);
    };

    update();

    if (root) {
      root.addEventListener("scroll", update, { passive: true });

      const resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(root);

      return () => {
        root.removeEventListener("scroll", update);
        resizeObserver.disconnect();
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progressMotion, scrollRootRef]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 z-50 max-md:hidden pl-6 md:pl-8"
      style={{ top: trackTop, bottom: trackBottom }}
    >
      <div className="relative h-full">
        <div className="absolute inset-0 flex flex-col justify-between">
          {RULER_TICKS_LAYOUT.map((isMajor, idx) => {
            const tickProgress = idx / (TICK_COUNT - 1);
            const isActive = scrollProgress >= tickProgress;

            return (
              <div
                key={idx}
                className={`h-px origin-left transition-colors duration-150 ${
                  isMajor ? "w-10" : "w-6"
                } ${isActive ? "bg-neutral-200" : "bg-neutral-600/40"}`}
              />
            );
          })}
        </div>

        <motion.div
          className="pointer-events-none absolute left-0 flex w-[calc(100vw-1rem)] -translate-y-1/2 items-center"
          style={{ top: beamTop }}
        >
          <svg
            width="10"
            height="8"
            viewBox="0 0 7 6"
            fill="none"
            aria-hidden
            className="-ml-3 shrink-0 -rotate-90 drop-shadow-[0_0_4px_rgba(107,54,255,0.45)]"
          >
            <path
              d="M3.54688 6L0.515786 0.75L6.57796 0.75L3.54688 6Z"
              fill="#6B36FF"
            />
          </svg>

          <div className="h-px min-h-px flex-1 bg-[#6B36FF]/80" />

          <span
            className="absolute top-1/2 right-[332px] flex h-6 -translate-y-1/2 items-center rounded px-3 text-[11px] font-medium tracking-wide whitespace-nowrap text-white"
            style={{ backgroundColor: BRAND_ACCENT }}
          >
            You are here
          </span>
        </motion.div>
      </div>
    </div>
  );
}
