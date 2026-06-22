"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MeIntroConfig } from "@/lib/me-intro";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { useMediaAutoplay } from "@/hooks/use-media-autoplay";
import { springBentoHover } from "@/lib/spring";

interface MeIntroPreviewProps {
  config: MeIntroConfig;
  variant?: "frame" | "page";
  hidden?: boolean;
  decorative?: boolean;
  onOpen?: () => void;
}

export function MeIntroPreview({
  config,
  variant = "frame",
  hidden = false,
  decorative = false,
  onOpen,
}: MeIntroPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const autoplay = useMediaAutoplay();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hidden || !autoplay) {
      video.pause();
      return;
    }

    void video.play().catch(() => undefined);
  }, [hidden, autoplay]);

  const shellClass =
    variant === "page"
      ? "w-full max-w-md"
      : "w-full max-w-[min(72%,340px)]";

  function handleClick() {
    videoRef.current?.pause();
    onOpen?.();
  }

  const shellProps = {
    className: `${shellClass} relative shrink-0 p-2 text-left ${EXPERIMENTS_CARD.shell} ${
      hidden ? "invisible" : ""
    } ${decorative ? "pointer-events-none cursor-default" : "cursor-pointer"}`,
    animate: { scale: hovered && !hidden && !decorative ? 1.02 : 1 },
    transition: springBentoHover,
    style: { zIndex: hovered ? 10 : 1 },
    onMouseEnter: decorative ? undefined : () => setHovered(true),
    onMouseLeave: decorative ? undefined : () => setHovered(false),
  };

  const previewBody = (
      <div
        className={`relative aspect-square w-full overflow-hidden ${EXPERIMENTS_CARD.preview}`}
      >
        <video
          ref={videoRef}
          src={config.previewSrc}
          poster={config.poster}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={autoplay}
          muted
          loop={autoplay}
          playsInline
          preload="auto"
          aria-hidden
        />

      </div>
  );

  if (decorative) {
    return (
      <motion.div aria-hidden {...shellProps}>
        {previewBody}
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={`${config.alt}. ${config.hoverTooltip}`}
      onClick={handleClick}
      {...shellProps}
    >
      {previewBody}
    </motion.button>
  );
}
