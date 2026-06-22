"use client";

import { useWireframe } from "@/context/wireframe-context";

interface SectionFrameImageProps {
  src: string;
  wireframeSrc?: string;
}

export function SectionFrameImage({ src, wireframeSrc }: SectionFrameImageProps) {
  const { wireframe } = useWireframe();
  const useNativeWireframe = wireframe && Boolean(wireframeSrc);
  const imageSrc = useNativeWireframe ? wireframeSrc! : src;

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
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
