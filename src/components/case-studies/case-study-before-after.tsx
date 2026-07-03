"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { CASE_STUDY_LABEL } from "@/components/case-studies/case-study-editorial";
import { resolveAssetUrl } from "@/lib/asset-cdn";

const ASPECT_CLASS = {
  video: "aspect-video",
  square: "aspect-square",
  natural: "aspect-video",
} as const;

interface CaseStudyBeforeAfterProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspect?: keyof typeof ASPECT_CLASS;
  className?: string;
  initialPosition?: number;
  /** Shell corner radius utility — defaults to `rounded-lg`. */
  rounded?: string;
}

export function CaseStudyBeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  aspect = "natural",
  className = "",
  initialPosition = 50,
  rounded = "rounded-lg",
}: CaseStudyBeforeAfterProps) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const resolvedBefore = beforeSrc ? resolveAssetUrl(beforeSrc) : undefined;
  const resolvedAfter = afterSrc ? resolveAssetUrl(afterSrc) : undefined;

  const updatePosition = useCallback((clientX: number) => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const nudgePosition = (delta: number) => {
    setPosition((current) => Math.min(100, Math.max(0, current + delta)));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updatePosition(event.clientX);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudgePosition(-2);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nudgePosition(2);
    }
  };

  return (
    <figure className={`space-y-3 ${className}`.trim()}>
      <div
        ref={containerRef}
        className={`case-study-before-after relative w-full overflow-hidden ${rounded} border border-white/10 bg-[#1a1a1a] ${ASPECT_CLASS[aspect]} touch-none select-none`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-label={`${beforeLabel} and ${afterLabel} comparison`}
      >
        <div className="absolute inset-0">
          {resolvedBefore ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedBefore}
              alt={beforeAlt}
              className="block h-full w-full object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="h-full w-full" role="img" aria-label="Before image placeholder" />
          )}
        </div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {resolvedAfter ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedAfter}
              alt={afterAlt}
              className="block h-full w-full object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="h-full w-full" role="img" aria-label="After image placeholder" />
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_16px_rgb(0_0_0/0.5)]"
          style={{ left: `${position}%` }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#6B36FF] text-white shadow-lg"
          style={{ left: `${position}%` }}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M7 4L3 9L7 14M11 4L15 9L11 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="sr-only">
          Drag horizontally or use arrow keys to compare. Reveal position{" "}
          {Math.round(position)} percent.
        </span>
      </div>

      <div className="flex justify-between gap-4 pb-6">
        <p className={CASE_STUDY_LABEL}>{beforeLabel}</p>
        <p className={CASE_STUDY_LABEL}>{afterLabel}</p>
      </div>
    </figure>
  );
}
