"use client";

import type { ExperimentMedia } from "@/lib/experiment-media";
import { useMediaAutoplay } from "@/hooks/use-media-autoplay";
import { useTrackMediaPlay } from "@/hooks/use-track-media-play";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PLAYBACK_ROOT_MARGIN = "320px";
const LAZY_ROOT_MARGIN = "480px";
const CRAFT_IMAGE_SIZES = "(min-width: 640px) 50vw, 100vw";

interface CraftCardPreviewProps {
  media: ExperimentMedia;
  title: string;
  slug: string;
  priority?: boolean;
  onMeasure?: (width: number, height: number) => void;
}

function reportMeasure(
  onMeasure: CraftCardPreviewProps["onMeasure"],
  width: number,
  height: number,
) {
  if (width > 0 && height > 0) {
    onMeasure?.(width, height);
  }
}

/** Preview slot sizes to the media's intrinsic aspect ratio. */
export function CraftCardPreview({
  media,
  title,
  slug,
  priority = false,
  onMeasure,
}: CraftCardPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const autoplay = useMediaAutoplay();
  const trackPlay = useTrackMediaPlay(slug);

  useEffect(() => {
    if (priority) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: LAZY_ROOT_MARGIN, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!priority || media.type !== "video") return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: PLAYBACK_ROOT_MARGIN, threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [media.type, priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || media.type !== "video" || !shouldLoad) return;

    if (isIntersecting && autoplay) {
      void video.play().then(() => {
        trackPlay(media.src);
      }).catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isIntersecting, autoplay, media.type, media.src, shouldLoad, trackPlay]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) return;
      videoRef.current?.pause();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className="ideas-card__preview-inner craft-card__preview-placeholder"
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className="ideas-card__preview-inner h-full w-full">
      {media.type === "video" ? (
        <>
          {media.poster ? (
            <Image
              src={media.poster}
              alt=""
              aria-hidden
              fill
              sizes={CRAFT_IMAGE_SIZES}
              className="ideas-card__media craft-card__media craft-card__poster object-cover"
              priority={priority}
            />
          ) : null}
          <video
            ref={videoRef}
            src={media.src}
            poster={media.poster}
            className="ideas-card__media craft-card__media craft-card__media--ready"
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
            aria-hidden
            aria-label={media.alt ?? title}
            onLoadedData={(event) => {
              const video = event.currentTarget;
              reportMeasure(onMeasure, video.videoWidth, video.videoHeight);
            }}
          />
        </>
      ) : media.type === "image" ? (
        <Image
          src={media.src}
          alt=""
          aria-hidden
          fill
          sizes={CRAFT_IMAGE_SIZES}
          className="ideas-card__media craft-card__media craft-card__media--ready object-contain"
          priority={priority}
          onLoad={(event) => {
            const image = event.currentTarget;
            reportMeasure(onMeasure, image.naturalWidth, image.naturalHeight);
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt=""
          aria-hidden
          className="ideas-card__media craft-card__media craft-card__media--ready"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={(event) => {
            const image = event.currentTarget;
            reportMeasure(onMeasure, image.naturalWidth, image.naturalHeight);
          }}
        />
      )}
    </div>
  );
}
