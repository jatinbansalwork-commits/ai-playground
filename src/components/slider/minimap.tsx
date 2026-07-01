"use client";

import { ScrollResetLink } from "@/components/scroll-reset-link";
import { motion, useTransform } from "framer-motion";
import { FOCUS_RING } from "@/lib/a11y";
import {
  MINIMAP_LINE_COUNT,
  MINIMAP_LINE_GAP,
  MINIMAP_LINE_HEIGHT,
  MINIMAP_LINE_WIDTH,
  MINIMAP_TRACKER_WIDTH,
  SITE_NAME,
} from "@/lib/constants";
import { minimapLineToFrameIndex } from "@/lib/minimap-frame-index";
import { springScrollSnap } from "@/lib/spring";
import { useSliderContext } from "@/context/slider-context";

const LINE_STEP = 10;

function lineOpacity(trackerX: number, index: number) {
  const threshold = index * LINE_STEP - 30;
  const distance = trackerX - threshold + 2;
  return distance >= 0 && distance < 34 ? 0 : 1;
}

interface MinimapProps {
  href?: string;
  className?: string;
  linkClassName?: string;
  variant?: "index" | "craft";
  frameCount?: number;
  onSelectFrame?: (frameIndex: number) => void;
}

export function Minimap({
  href,
  className = "pointer-events-none fixed top-16 left-1/2 z-30 -translate-x-1/2",
  linkClassName,
  variant = "index",
  frameCount,
  onSelectFrame,
}: MinimapProps) {
  const isInteractive = Boolean(frameCount && frameCount > 0 && onSelectFrame);

  const track = (
    <MinimapTrack
      variant={variant}
      frameCount={frameCount}
      onSelectFrame={onSelectFrame}
      style={
        {
          "--line-width": `${MINIMAP_LINE_WIDTH}px`,
          "--line-gap": `${MINIMAP_LINE_GAP}px`,
          "--line-height": `${MINIMAP_LINE_HEIGHT}px`,
          "--tracker-width": `${MINIMAP_TRACKER_WIDTH}px`,
        } as React.CSSProperties
      }
    />
  );

  if (href) {
    return (
      <ScrollResetLink
        href={href}
        scroll={true}
        aria-label={`Back to ${SITE_NAME}`}
        className={
          linkClassName ??
          "group mx-auto block w-fit opacity-70 transition-opacity hover:opacity-100"
        }
      >
        {track}
      </ScrollResetLink>
    );
  }

  return (
    <nav
      aria-label="Index slides"
      data-index
      className={isInteractive ? className.replace("pointer-events-none", "pointer-events-auto") : className}
    >
      {track}
    </nav>
  );
}

function MinimapTrack({
  style,
  variant,
  frameCount,
  onSelectFrame,
}: {
  style?: React.CSSProperties;
  variant: "index" | "craft";
  frameCount?: number;
  onSelectFrame?: (frameIndex: number) => void;
}) {
  const { minimapX } = useSliderContext();
  const lineClass =
    variant === "craft" ? "bg-[#707070]" : "bg-neutral-400";
  const trackerClass =
    variant === "craft"
      ? "border border-[#FFEF00] bg-[#FFEF00]"
      : "border border-[#6B36FF] bg-[#6B36FF]";

  return (
    <div aria-hidden style={style}>
      <div
        className="relative flex items-end"
        style={{ gap: MINIMAP_LINE_GAP }}
      >
        {Array.from({ length: MINIMAP_LINE_COUNT }).map((_, index) => (
          <MinimapLine
            key={index}
            index={index}
            lineClass={lineClass}
            frameCount={frameCount}
            onSelectFrame={onSelectFrame}
          />
        ))}

        <motion.div
          aria-label="Scroll position"
          className={`absolute top-0 box-border h-[var(--line-height)] w-[var(--tracker-width)] ${trackerClass}`}
          style={{ x: minimapX }}
          transition={springScrollSnap}
        />
      </div>
    </div>
  );
}

function MinimapLine({
  index,
  lineClass,
  frameCount,
  onSelectFrame,
}: {
  index: number;
  lineClass: string;
  frameCount?: number;
  onSelectFrame?: (frameIndex: number) => void;
}) {
  const { minimapX } = useSliderContext();

  const opacity = useTransform(minimapX, (value) => lineOpacity(value, index));
  const isInteractive = Boolean(frameCount && frameCount > 0 && onSelectFrame);

  if (isInteractive && onSelectFrame && frameCount) {
    const frameIndex = minimapLineToFrameIndex(index, frameCount);

    return (
      <motion.button
        type="button"
        aria-label={`Go to slide ${frameIndex + 1}`}
        className={`minimap-line w-[var(--line-width)] border-0 p-0 ${lineClass} ${FOCUS_RING}`}
        style={{
          height: MINIMAP_LINE_HEIGHT,
          opacity,
          cursor: "pointer",
        }}
        data-index={index}
        onClick={() => onSelectFrame(frameIndex)}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className={`minimap-line w-[var(--line-width)] ${lineClass}`}
      style={{
        height: MINIMAP_LINE_HEIGHT,
        opacity,
      }}
      data-index={index}
    />
  );
}
