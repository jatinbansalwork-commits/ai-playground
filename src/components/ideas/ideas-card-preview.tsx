"use client";

import { useEffect, useRef, useState } from "react";
import type { ExperimentMedia } from "@/lib/experiment-media";
import { isRemoteCdnUrl } from "@/lib/asset-cdn";
import { useMediaAutoplay } from "@/hooks/use-media-autoplay";

const PLAYBACK_ROOT_MARGIN = "50px";

interface IdeasCardPreviewProps {
  media: ExperimentMedia;
  title: string;
}

/** Media fills a fixed preview frame (object-fit: cover). */
export function IdeasCardPreview({ media, title }: IdeasCardPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRemote = isRemoteCdnUrl(media.src);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMediaReady, setIsMediaReady] = useState(false);
  const autoplay = useMediaAutoplay();

  useEffect(() => {
    setIsMediaReady(false);
  }, [media.src]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || media.type !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: PLAYBACK_ROOT_MARGIN, threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [media.type, media.src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || media.type !== "video") return;

    if (isIntersecting && autoplay) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isIntersecting, autoplay, media.type]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) return;
      videoRef.current?.pause();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const mediaClassName = [
    "ideas-card__media",
    isMediaReady ? "ideas-card__media--ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className="ideas-card__preview-inner">
      {media.type === "video" ? (
        <>
          {media.poster && !isMediaReady ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.poster}
              alt=""
              aria-hidden
              className="ideas-card__media ideas-card__media--ready ideas-card__poster"
              decoding="async"
            />
          ) : null}
          <video
            ref={videoRef}
            src={media.src}
            poster={media.poster}
            className={mediaClassName}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            aria-label={media.alt ?? title}
            onLoadedData={() => setIsMediaReady(true)}
          />
        </>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt=""
          aria-hidden
          className={mediaClassName}
          loading={isRemote ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isRemote ? "high" : "auto"}
          onLoad={() => setIsMediaReady(true)}
        />
      )}
    </div>
  );
}
