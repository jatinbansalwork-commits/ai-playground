"use client";

import { useEffect, useState } from "react";

/** 1 = major tick (40px), 0 = minor tick (24px) */
const RULER_TICKS_LAYOUT = [
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 1,
] as const;

const TICK_GAP_PX = 8;
const TICK_HEIGHT_PX = 1;
const TICK_STEP_PX = TICK_HEIGHT_PX + TICK_GAP_PX;

function getScrollProgress(): number {
  const totalScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  if (totalScroll <= 0) return 0;

  return Math.min(1, Math.max(0, window.scrollY / totalScroll));
}

export function ScrollMinimapRuler() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const rulerHeightPx = RULER_TICKS_LAYOUT.length * TICK_STEP_PX;
  const pointerYOffset = scrollProgress * rulerHeightPx;

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(getScrollProgress());
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-0 z-50 flex -translate-y-1/2 select-none pl-6 md:pl-8 max-md:hidden"
      style={{ height: `${rulerHeightPx}px` }}
    >
      <div
        className="flex flex-col"
        style={{ gap: `${TICK_GAP_PX}px` }}
      >
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
