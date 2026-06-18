"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { ExperimentMedia } from "@/lib/experiment-media";
import { isRemoteCdnUrl } from "@/lib/asset-cdn";
import { ROUTES } from "@/lib/constants";
import { useMediaAutoplay } from "@/hooks/use-media-autoplay";
import { useTrackMediaPlay } from "@/hooks/use-track-media-play";

interface ExperimentsPreviewMediaProps {
  media: ExperimentMedia;
  title: string;
  slug?: string;
}

const LAZY_ROOT_MARGIN = "240px";
const PLAYBACK_ROOT_MARGIN = "50px";
const MOUSE_IDLE_MS = 2000;

interface ExperimentsPreviewVideoProps {
  media: ExperimentMedia;
  title: string;
  slug?: string;
  shouldLoad: boolean;
}

/**
 * /craft bento previews — play only when on-route, in view, and mouse is active.
 * Pauses after 2s of pointer idle or when the card leaves the viewport.
 */
function ExperimentsPreviewVideo({
  media,
  title,
  slug,
  shouldLoad,
}: ExperimentsPreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const autoplay = useMediaAutoplay();
  const trackPlay = useTrackMediaPlay(slug);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: PLAYBACK_ROOT_MARGIN, threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad, media.src]);

  useEffect(() => {
    if (!isIntersecting || pathname !== ROUTES.craft) {
      setIsMouseActive(false);
      return;
    }

    const handleMouseMove = () => {
      setIsMouseActive(true);

      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

      idleTimeoutRef.current = setTimeout(() => {
        setIsMouseActive(false);
      }, MOUSE_IDLE_MS);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [isIntersecting, pathname]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isTargetPage = pathname === ROUTES.craft;
    const shouldPlay =
      isTargetPage && isIntersecting && isMouseActive && autoplay;

    if (shouldPlay) {
      void video.play().then(() => {
        trackPlay(media.src);
      }).catch(() => undefined);
    } else {
      video.pause();
    }
  }, [pathname, isIntersecting, isMouseActive, autoplay, media.src, trackPlay]);

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
    return media.poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.poster}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        loading="lazy"
      />
    ) : null;
  }

  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform transform-gpu"
      style={{ contentVisibility: "auto" }}
      muted
      loop={autoplay}
      playsInline
      preload="metadata"
      aria-label={media.alt ?? title}
    />
  );
}

/**
 * Defers remote CDN byte fetch until the card nears the viewport.
 * Videos use `preload="metadata"` for dimensions only, plus GPU compositing hints.
 */
export function ExperimentsPreviewMedia({
  media,
  title,
  slug,
}: ExperimentsPreviewMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRemote = isRemoteCdnUrl(media.src);
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
        <ExperimentsPreviewVideo
          media={media}
          title={title}
          slug={slug}
          shouldLoad={shouldLoad}
        />
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
