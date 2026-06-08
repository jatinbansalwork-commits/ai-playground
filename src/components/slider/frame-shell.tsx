"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FRAME_HEIGHT,
  FRAME_STRIDE,
  FRAME_WIDTH,
} from "@/lib/constants";
import { ClipReveal } from "@/components/slider/clip-reveal";
import type { Frame, SectionFrame } from "@/types";

interface FrameShellProps {
  frame: Frame;
  index: number;
  children: React.ReactNode;
  onInteract: () => void;
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function sectionLinkProps(frame: SectionFrame, onInteract: () => void) {
  const openInNewTab = frame.openInNewTab || isExternalHref(frame.href);

  return {
    className: "absolute inset-0 z-10",
    "aria-label": frame.label,
    onMouseDown: onInteract,
    ...(openInNewTab
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {}),
  };
}

export function FrameShell({
  frame,
  index,
  children,
  onInteract,
}: FrameShellProps) {
  const isSlide = frame.variant === "slide";

  return (
    <motion.article
      tabIndex={0}
      data-variant={frame.variant}
      className="frame-panel outline-none select-none not-data-[variant=main]:opacity-0 not-data-[variant=main]:animate-[frame-fade_0.35s_ease-in-out_0.8s_forwards]"
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        position: "absolute",
        left: FRAME_STRIDE * index,
        top: 0,
      }}
    >
      {isSlide && (
        <span
          aria-hidden
          className="frame-label pointer-events-none absolute -top-7 left-0 text-sm text-neutral-500"
        >
          <ClipReveal>{frame.label}</ClipReveal>
        </span>
      )}

      <div
        data-sheet
        className="relative h-full w-full overflow-hidden bg-white"
        onMouseDown={onInteract}
      >
        {isSlide ? (
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            {children}
          </div>
        ) : (
          children
        )}
      </div>

      {frame.type === "section" &&
        !frame.videoThumbnail &&
        (isExternalHref(frame.href) ? (
          <a href={frame.href} {...sectionLinkProps(frame, onInteract)}>
            <span className="sr-only">{frame.label}</span>
          </a>
        ) : (
          <Link href={frame.href} {...sectionLinkProps(frame, onInteract)}>
            <span className="sr-only">{frame.label}</span>
          </Link>
        ))}
    </motion.article>
  );
}
