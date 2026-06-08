"use client";

import { FRAMES } from "@/lib/constants";
import { FOCUS_RING, TARGET_HIT_AREA } from "@/lib/a11y";

interface IndexSlideNavProps {
  activeIndex: number;
  frameCount: number;
  onSelect: (index: number) => void;
}

export function IndexSlideNav({
  activeIndex,
  frameCount,
  onSelect,
}: IndexSlideNavProps) {
  const activeFrame = FRAMES[activeIndex];
  const activeLabel = activeFrame?.label ?? `Slide ${activeIndex + 1}`;

  return (
    <nav
      aria-label="Slide navigation"
      className="pointer-events-auto fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-sm text-white backdrop-blur-sm"
    >
      <button
        type="button"
        className={`rounded-md px-3 text-neutral-200 enabled:hover:text-white disabled:opacity-40 ${TARGET_HIT_AREA} ${FOCUS_RING}`}
        onClick={() => onSelect(activeIndex - 1)}
        disabled={activeIndex <= 0}
        aria-label="Previous slide"
      >
        Prev
      </button>

      <p className="min-w-[9rem] text-center text-neutral-300" aria-live="polite">
        <span className="sr-only">Current slide: </span>
        {activeLabel}{" "}
        <span className="text-neutral-400">
          ({activeIndex + 1} / {frameCount})
        </span>
      </p>

      <button
        type="button"
        className={`rounded-md px-3 text-neutral-200 enabled:hover:text-white disabled:opacity-40 ${TARGET_HIT_AREA} ${FOCUS_RING}`}
        onClick={() => onSelect(activeIndex + 1)}
        disabled={activeIndex >= frameCount - 1}
        aria-label="Next slide"
      >
        Next
      </button>
    </nav>
  );
}
