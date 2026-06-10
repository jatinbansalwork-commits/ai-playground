"use client";

import { useEffect, useState, type RefObject } from "react";

/** 1 = major tick (40px), 0 = minor tick (24px) */
const RULER_TICKS_LAYOUT = [
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 1,
] as const;

const TICK_GAP_PX = 8;
const TICK_HEIGHT_PX = 1;
const TICK_STEP_PX = TICK_HEIGHT_PX + TICK_GAP_PX;

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
  /** Scroll container — case study / subpage shells use overflow on `<main>`, not `window`. */
  scrollRootRef?: RefObject<HTMLElement | null>;
}

export function ScrollMinimapRuler({ scrollRootRef }: ScrollMinimapRulerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const rulerHeightPx = RULER_TICKS_LAYOUT.length * TICK_STEP_PX;
  const pointerYOffset = scrollProgress * rulerHeightPx;

  useEffect(() => {
    const root = scrollRootRef?.current ?? null;

    const update = () => {
      const activeRoot = scrollRootRef?.current;
      if (activeRoot) {
        setScrollProgress(getElementScrollProgress(activeRoot));
        return;
      }
      setScrollProgress(getWindowScrollProgress());
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
  }, [scrollRootRef]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-0 z-50 flex -translate-y-1/2 select-none pl-6 md:pl-8 max-md:hidden"
      style={{ height: `${rulerHeightPx}px` }}
    >
      <div className="flex flex-col" style={{ gap: `${TICK_GAP_PX}px` }}>
        {RULER_TICKS_LAYOUT.map((isMajor, idx) => {
          const currentTickY = idx * TICK_STEP_PX;
          const isActive = pointerYOffset >= currentTickY;

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
    </div>
  );
}
