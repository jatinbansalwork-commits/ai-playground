"use client";

import { useWireframe } from "@/context/wireframe-context";

interface SectionFrameIdeasMonogramProps {
  src: string;
}

const IDEAS_MONOGRAM_WIREFRAME = "/assets/index/ideas-monogram-wireframe.png";

const ROBOT_IMAGE_CLASS =
  "ideas-robot__image pointer-events-none block h-[min(320px,45vh)] w-auto select-none [image-rendering:pixelated]";

export function SectionFrameIdeasMonogram({ src }: SectionFrameIdeasMonogramProps) {
  const { wireframe } = useWireframe();
  const imageSrc = wireframe ? IDEAS_MONOGRAM_WIREFRAME : src;

  return (
    <div className="ideas-robot flex h-full w-full items-center justify-center overflow-hidden">
      <div className="ideas-robot__float relative transition-transform duration-200 group-hover:-translate-y-2 group-hover:scale-[1.08]">
        <div className="ideas-robot__body relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            aria-hidden
            draggable={false}
            className={[
              ROBOT_IMAGE_CLASS,
              wireframe ? "ideas-robot__image--wireframe" : "index-slide-monogram",
            ].join(" ")}
          />

          {!wireframe ? (
            <>
              <span aria-hidden className="ideas-robot__eyelid ideas-robot__eyelid--left" />
              <span aria-hidden className="ideas-robot__eyelid ideas-robot__eyelid--right" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
