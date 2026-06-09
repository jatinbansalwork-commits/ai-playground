"use client";

import { useEffect, useRef, useState } from "react";
import type { ExperimentMedia } from "@/lib/experiment-media";
import { isRemoteCdnUrl } from "@/lib/asset-cdn";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ExperimentsPreviewMediaProps {
  media: ExperimentMedia;
  title: string;
}

const LAZY_ROOT_MARGIN = "240px";

/**
 * Defers remote CDN byte fetch until the card nears the viewport.
 * Videos use `preload="metadata"` for dimensions only, plus GPU compositing hints.
 */
export function ExperimentsPreviewMedia({
  media,
  title,
}: ExperimentsPreviewMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRemote = isRemoteCdnUrl(media.src);
  const reducedMotion = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(!isRemote);

  useEffect(() => {
    if (!isRemote) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: LAZY_ROOT_MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isRemote, media.src]);

  if (media.type === "video") {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 bg-[#262626]"
        aria-hidden={!shouldLoad}
      >
        {shouldLoad ? (
          <video
            src={media.src}
            poster={media.poster}
            className="absolute inset-0 h-full w-full object-cover will-change-transform transform-gpu"
            style={{ contentVisibility: "auto" }}
            autoPlay={!reducedMotion}
            muted
            loop={!reducedMotion}
            playsInline
            preload="metadata"
            aria-label={media.alt ?? title}
          />
        ) : media.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.poster}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
            loading="lazy"
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-[#262626]"
      aria-hidden={!shouldLoad}
    >
      {shouldLoad ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt={media.alt ?? title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          fetchPriority={isRemote ? "low" : "auto"}
        />
      ) : null}
    </div>
  );
}
