"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MeIntroConfig } from "@/lib/me-intro";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hidden) {
      video.pause();
      return;
    }

    void video.play().catch(() => undefined);
  }, [hidden]);

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
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={springBentoHover}
        >
          <span className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5 text-white"
              aria-hidden
            >
              <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.5-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
          <span className="text-xs font-medium tracking-normal text-white/90">
            {config.hoverTooltip}
          </span>
        </motion.div>
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
