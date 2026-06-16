"use client";

interface SectionFrameImageProps {
  src: string;
}

export function SectionFrameImage({ src }: SectionFrameImageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none h-[min(320px,45vh)] w-auto select-none [image-rendering:pixelated]"
      />
    </div>
  );
}
