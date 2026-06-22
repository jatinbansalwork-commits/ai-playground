"use client";

import { useEffect, useRef } from "react";
import type { ExperimentMedia } from "@/lib/experiment-media";

interface IdeasDetailMediaProps {
  media: ExperimentMedia;
  title: string;
  active: boolean;
}

/** Full preview media for the Ideas detail overlay — autoplays while open. */
export function IdeasDetailMedia({ media, title, active }: IdeasDetailMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.muted = true;
    void video.play().catch(() => undefined);
  }, [active, media.src]);

  if (media.type === "video") {
    return (
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        className="ideas-detail__media"
        muted
        loop
        playsInline
        preload="auto"
        aria-label={media.alt ?? title}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.src}
      alt={media.alt ?? title}
      className="ideas-detail__media"
      decoding="async"
    />
  );
}
