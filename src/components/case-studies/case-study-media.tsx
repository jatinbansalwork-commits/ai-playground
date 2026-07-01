"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CASE_STUDY_CAPTION,
  CASE_STUDY_PARAGRAPH_DENSE,
} from "@/components/case-studies/case-study-editorial";
import { isRemoteCdnUrl, resolveAssetUrl } from "@/lib/asset-cdn";
import { useMediaAutoplay } from "@/hooks/use-media-autoplay";
import { useTrackMediaPlay } from "@/hooks/use-track-media-play";

interface CaseStudyMediaProps {
  label?: ReactNode;
  /** Loading placeholder shape only — loaded media always uses intrinsic dimensions. */
  aspect?: "video" | "square" | "portrait" | "natural";
  className?: string;
  src?: string;
  poster?: string;
  alt?: string;
  /** Load immediately — use for above-the-fold hero illustrations. */
  priority?: boolean;
  /**
   * Clip empty pixels from the top of a loaded image (fraction of intrinsic height, 0–1).
   * Pair with `intrinsicAspect` (width ÷ height) so the frame keeps the cropped proportions.
   */
  trimTop?: number;
  intrinsicAspect?: number;
  /** Omit the default frame border (and background shell). */
  borderless?: boolean;
  /** Override the default shell background (`#1a1a1a`). */
  shellBackground?: string;
  /** Optional body copy rendered below the caption. */
  paragraph?: ReactNode;
  /** Extra classes for the figcaption when `label` is set. */
  captionClassName?: string;
}

const ASPECT_CLASS = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  natural: "aspect-video",
} as const;

const VIDEO_EXT = /\.(mp4|webm|mov)(\?|#|$)/i;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i;

function labelToAlt(label: ReactNode | undefined): string | undefined {
  if (typeof label === "string" && label.trim().length > 0) return label.trim();
  return undefined;
}

function isVideoSrc(src: string, aspect: CaseStudyMediaProps["aspect"]): boolean {
  if (VIDEO_EXT.test(src)) return true;
  if (IMAGE_EXT.test(src)) return false;
  return aspect === "video";
}

export function CaseStudyMedia({
  label,
  aspect = "natural",
  className = "",
  src,
  poster,
  alt,
  trimTop,
  intrinsicAspect,
  borderless = false,
  shellBackground,
  paragraph,
  captionClassName,
  priority = false,
}: CaseStudyMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplay = useMediaAutoplay();
  const trackPlay = useTrackMediaPlay();
  const resolvedSrc = src ? resolveAssetUrl(src) : undefined;
  const resolvedPoster = poster ? resolveAssetUrl(poster) : undefined;
  const isRemote = resolvedSrc ? isRemoteCdnUrl(resolvedSrc) : false;
  const [shouldLoad, setShouldLoad] = useState(priority || !isRemote);

  useEffect(() => {
    if (priority || !isRemote || !resolvedSrc) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isRemote, priority, resolvedSrc]);

  const shellBase = borderless
    ? "relative w-full overflow-hidden rounded-lg"
    : "relative w-full overflow-hidden rounded-lg border border-white/10";
  const shellBackgroundColor = borderless
    ? undefined
    : (shellBackground ?? "#1a1a1a");
  const isVideo = Boolean(resolvedSrc && isVideoSrc(resolvedSrc, aspect));
  const hasTrimConfig =
    Boolean(trimTop && intrinsicAspect) &&
    !isVideo &&
    trimTop! > 0 &&
    trimTop! < 1;
  const usesTrim = hasTrimConfig && Boolean(shouldLoad && resolvedSrc);
  const usesIntrinsicSize = Boolean(shouldLoad && resolvedSrc) && !hasTrimConfig;
  const shellClass = `${shellBase} ${
    usesIntrinsicSize || hasTrimConfig ? "" : ASPECT_CLASS[aspect]
  }`;
  const mediaClass = usesTrim
    ? "absolute left-0 w-full h-auto"
    : "block h-auto w-full";
  const trimTopOffset = hasTrimConfig
    ? `${-(trimTop! / (1 - trimTop!)) * 100}%`
    : undefined;
  const trimShellStyle = hasTrimConfig
    ? { aspectRatio: intrinsicAspect! / (1 - trimTop!) }
    : undefined;
  const shellStyle = {
    ...trimShellStyle,
    ...(shellBackgroundColor ? { backgroundColor: shellBackgroundColor } : {}),
  };
  const trimMediaStyle = usesTrim ? { top: trimTopOffset } : undefined;
  const effectiveAlt = alt ?? labelToAlt(label);

  return (
    <figure className={`space-y-3 ${className}`}>
      <div ref={containerRef} className={shellClass} style={shellStyle}>
        {isVideo ? (
          shouldLoad ? (
            <video
              src={resolvedSrc}
              poster={resolvedPoster}
              className={mediaClass}
              autoPlay={autoplay}
              muted
              loop={autoplay}
              playsInline
              preload="metadata"
              aria-label={effectiveAlt ?? "Case study media"}
              onPlay={() => {
                if (resolvedSrc) trackPlay(resolvedSrc);
              }}
            />
          ) : resolvedPoster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedPoster}
              alt=""
              aria-hidden
              className={mediaClass}
              decoding="async"
              loading="lazy"
            />
          ) : null
        ) : resolvedSrc && shouldLoad ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolvedSrc}
            alt={effectiveAlt ?? ""}
            className={mediaClass}
            style={trimMediaStyle}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
          />
        ) : (
          <div
            className="absolute inset-0"
            role="img"
            aria-label="Case study media placeholder"
          />
        )}
      </div>
      {label ? (
        <figcaption className={`${CASE_STUDY_CAPTION} ${captionClassName ?? ""}`.trim()}>
          {label}
        </figcaption>
      ) : null}
      {paragraph ? (
        <p className={`${CASE_STUDY_PARAGRAPH_DENSE} mt-2`}>{paragraph}</p>
      ) : null}
    </figure>
  );
}
