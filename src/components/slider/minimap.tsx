"use client";

import { ScrollResetLink } from "@/components/scroll-reset-link";
import { motion, useTransform } from "framer-motion";
import {
  MINIMAP_LINE_COUNT,
  MINIMAP_LINE_GAP,
  MINIMAP_LINE_HEIGHT,
  MINIMAP_LINE_WIDTH,
  MINIMAP_TRACKER_WIDTH,
  SITE_NAME,
} from "@/lib/constants";
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
}

export function Minimap({
  href,
  className = "pointer-events-none fixed top-16 left-1/2 z-30 -translate-x-1/2",
  linkClassName,
  variant = "index",
}: MinimapProps) {
  const track = (
    <MinimapTrack
      variant={variant}
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
    <div aria-hidden data-index className={className}>
      {track}
    </div>
  );
}

function MinimapTrack({
  style,
  variant,
}: {
  style?: React.CSSProperties;
  variant: "index" | "craft";
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
          <MinimapLine key={index} index={index} lineClass={lineClass} />
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
}: {
  index: number;
  lineClass: string;
}) {
  const { minimapX } = useSliderContext();

  const opacity = useTransform(minimapX, (value) => lineOpacity(value, index));

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
