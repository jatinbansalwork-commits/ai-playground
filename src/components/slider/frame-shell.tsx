"use client";

import { motion } from "framer-motion";
import { ScrollResetLink } from "@/components/scroll-reset-link";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";
import {
  FRAME_HEIGHT,
  FRAME_STRIDE,
  FRAME_WIDTH,
} from "@/lib/constants";
import { ClipReveal } from "@/components/slider/clip-reveal";
import { INDEX_SLIDE_LABEL } from "@/lib/index-typography";
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
    onClick: openInNewTab ? undefined : () => resetDocumentScroll(),
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
      className="frame-panel outline-none select-none"
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        position: "absolute",
        left: FRAME_STRIDE * index,
        top: 0,
      }}
    >
      {frame.type === "section" && isSlide && !frame.hideSlideLabel && (
        <span
          aria-hidden
          className={`frame-label pointer-events-none absolute -top-7 left-0 ${INDEX_SLIDE_LABEL}`}
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
        frame.href &&
        !frame.videoThumbnail &&
        (isExternalHref(frame.href) ? (
          <a href={frame.href} {...sectionLinkProps(frame, onInteract)}>
            <span className="sr-only">{frame.label}</span>
          </a>
        ) : (
          <ScrollResetLink
            href={frame.href}
            scroll={true}
            {...sectionLinkProps(frame, onInteract)}
          >
            <span className="sr-only">{frame.label}</span>
          </ScrollResetLink>
        ))}
    </motion.article>
  );
}
