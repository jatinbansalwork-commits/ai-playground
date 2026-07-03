"use client";

import { useWireframe } from "@/context/wireframe-context";
import { ARTICLE_CURSOR_HAND_PRIMARY_COLOR } from "@/lib/article-cursor-hand";
import { CRAFT_MONOGRAM_PRIMARY_COLOR } from "@/lib/craft-monogram";

interface SectionFrameImageProps {
  src: string;
  wireframeSrc?: string;
}

export function SectionFrameImage({ src, wireframeSrc }: SectionFrameImageProps) {
  const { wireframe } = useWireframe();
  const useNativeWireframe = wireframe && Boolean(wireframeSrc);
  const imageSrc = useNativeWireframe ? wireframeSrc! : src;

  const isCursorHandMonogram = src.includes("article-cursor-hand");
  const isCraftMonogram = src.includes("craft-monogram");
  const monogramPrimary = isCursorHandMonogram
    ? ARTICLE_CURSOR_HAND_PRIMARY_COLOR
    : isCraftMonogram
      ? CRAFT_MONOGRAM_PRIMARY_COLOR
      : undefined;

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden"
      style={
        monogramPrimary
          ? ({ "--index-monogram-primary": monogramPrimary } as React.CSSProperties)
          : undefined
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        aria-hidden
        draggable={false}
        className={[
          "pointer-events-none h-[min(320px,45vh)] w-auto select-none [image-rendering:pixelated]",
          useNativeWireframe
            ? "index-slide-monogram--native-wireframe"
            : "index-slide-monogram",
        ].join(" ")}
      />
    </div>
  );
}
