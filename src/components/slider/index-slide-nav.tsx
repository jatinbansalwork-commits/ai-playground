import { useCallback, useRef } from "react";
import { FRAMES, INDEX_FLOATING_BOTTOM } from "@/lib/constants";
import { FOCUS_RING, TARGET_HIT_AREA } from "@/lib/a11y";

interface IndexSlideNavProps {
  activeIndex: number;
  frameCount: number;
  onSelect: (index: number) => void;
}

function NavButton({
  label,
  ariaLabel,
  disabled,
  onActivate,
}: {
  label: string;
  ariaLabel: string;
  disabled: boolean;
  onActivate: () => void;
}) {
  const activatedRef = useRef(false);

  const activate = useCallback(() => {
    if (disabled || activatedRef.current) return;
    activatedRef.current = true;
    onActivate();
    window.setTimeout(() => {
      activatedRef.current = false;
    }, 400);
  }, [disabled, onActivate]);

  return (
    <button
      type="button"
      className={`touch-manipulation rounded-md px-3 text-neutral-200 enabled:hover:text-white disabled:opacity-40 ${TARGET_HIT_AREA} ${FOCUS_RING}`}
      disabled={disabled}
      aria-label={ariaLabel}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        if (event.pointerType === "mouse" && event.button !== 0) return;
        activate();
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (event.detail === 0) return;
        activate();
      }}
    >
      {label}
    </button>
  );
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
      className={`pointer-events-auto fixed ${INDEX_FLOATING_BOTTOM} left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-sm text-white backdrop-blur-sm`}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
    >
      <NavButton
        label="Prev"
        ariaLabel="Previous slide"
        disabled={activeIndex <= 0}
        onActivate={() => onSelect(activeIndex - 1)}
      />

      <p className="min-w-[9rem] text-center text-neutral-300" aria-live="polite">
        <span className="sr-only">Current slide: </span>
        {activeLabel}{" "}
        <span className="text-neutral-400">
          ({activeIndex + 1} / {frameCount})
        </span>
      </p>

      <NavButton
        label="Next"
        ariaLabel="Next slide"
        disabled={activeIndex >= frameCount - 1}
        onActivate={() => onSelect(activeIndex + 1)}
      />
    </nav>
  );
}
