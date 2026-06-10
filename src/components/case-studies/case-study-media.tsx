"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CASE_STUDY_CAPTION } from "@/components/case-studies/case-study-editorial";
import { isRemoteCdnUrl, resolveAssetUrl } from "@/lib/asset-cdn";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CaseStudyMediaProps {
  label?: ReactNode;
  /** Loading placeholder shape only — loaded media always uses intrinsic dimensions. */
  aspect?: "video" | "square" | "portrait" | "natural";
  className?: string;
  src?: string;
  poster?: string;
  alt?: string;
  /**
   * Clip empty pixels from the top of a loaded image (fraction of intrinsic height, 0–1).
   * Pair with `intrinsicAspect` (width ÷ height) so the frame keeps the cropped proportions.
   */
  trimTop?: number;
  intrinsicAspect?: number;
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
}: CaseStudyMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const resolvedSrc = src ? resolveAssetUrl(src) : undefined;
  const resolvedPoster = poster ? resolveAssetUrl(poster) : undefined;
  const isRemote = resolvedSrc ? isRemoteCdnUrl(resolvedSrc) : false;
  const [shouldLoad, setShouldLoad] = useState(!isRemote);

  useEffect(() => {
    if (!isRemote || !resolvedSrc) return;

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
  }, [isRemote, resolvedSrc]);

  const shellBase =
    "relative w-full overflow-hidden rounded-lg border border-white/10 bg-[#1a1a1a]";
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
  const trimMediaStyle = usesTrim ? { top: trimTopOffset } : undefined;
  const effectiveAlt = alt ?? labelToAlt(label);

  return (
    <figure className={`space-y-3 ${className}`}>
      <div ref={containerRef} className={shellClass} style={trimShellStyle}>
        {isVideo ? (
          shouldLoad ? (
            <video
              src={resolvedSrc}
              poster={resolvedPoster}
              className={mediaClass}
              autoPlay={!reducedMotion}
              muted
              loop={!reducedMotion}
              playsInline
              preload="metadata"
              aria-label={effectiveAlt ?? "Case study media"}
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
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0" aria-hidden />
        )}
      </div>
      {label ? (
        <figcaption className={CASE_STUDY_CAPTION}>{label}</figcaption>
      ) : null}
    </figure>
  );
}
