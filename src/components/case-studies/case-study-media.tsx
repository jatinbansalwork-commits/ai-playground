"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CASE_STUDY_CAPTION } from "@/components/case-studies/case-study-editorial";
import { isRemoteCdnUrl, resolveAssetUrl } from "@/lib/asset-cdn";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CaseStudyMediaProps {
  label?: ReactNode;
  aspect?: "video" | "square" | "portrait";
  className?: string;
  src?: string;
  poster?: string;
  alt?: string;
}

const ASPECT_CLASS = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
} as const;

const VIDEO_EXT = /\.(mp4|webm|mov)(\?|#|$)/i;

function isVideoSrc(src: string): boolean {
  return VIDEO_EXT.test(src);
}

export function CaseStudyMedia({
  label,
  aspect = "video",
  className = "",
  src,
  poster,
  alt,
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

  const shellClass = `relative w-full overflow-hidden rounded-lg border border-white/10 bg-[#1a1a1a] ${ASPECT_CLASS[aspect]}`;
  const videoClass = "absolute inset-0 h-full w-full object-contain";

  return (
    <figure className={`space-y-3 ${className}`}>
      <div ref={containerRef} className={shellClass}>
        {resolvedSrc && isVideoSrc(resolvedSrc) ? (
          shouldLoad ? (
            <video
              src={resolvedSrc}
              poster={resolvedPoster}
              className={videoClass}
              autoPlay={!reducedMotion}
              muted
              loop={!reducedMotion}
              playsInline
              preload="none"
              aria-label={alt ?? "Case study media"}
            />
          ) : resolvedPoster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedPoster}
              alt=""
              aria-hidden
              className={videoClass}
              decoding="async"
              loading="lazy"
            />
          ) : null
        ) : resolvedSrc && shouldLoad ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolvedSrc}
            alt={alt ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
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
