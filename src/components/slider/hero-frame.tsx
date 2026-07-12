"use client";

import { HERO_COPY, HERO_LINES } from "@/lib/constants";
import { INDEX_SLIDE_HERO } from "@/lib/index-typography";
import { ClipReveal } from "@/components/slider/clip-reveal";
import { FrameShell } from "@/components/slider/frame-shell";
import { HeroPhysicsPills } from "@/components/slider/hero-physics-pills";
import type { HeroFrame } from "@/types";

interface HeroFramePanelProps {
  frame: HeroFrame;
  index: number;
  onInteract: () => void;
}

export function HeroFramePanel({
  frame,
  index,
  onInteract,
}: HeroFramePanelProps) {
  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      <div className="relative h-full w-full overflow-hidden text-black">
        <HeroPhysicsPills
          className="z-[1]"
          onInteract={onInteract}
        />

        <div className="index-slide-hero-copy pointer-events-none relative z-10 pt-16 sm:pt-20 md:pt-24">
          <h1 className={INDEX_SLIDE_HERO}>
            {HERO_LINES.map((line, lineIndex) => (
              <span
                key={line}
                className={`index-slide-hero-line block${
                  lineIndex > 0 ? " index-slide-hero-subline" : ""
                }`}
              >
                <ClipReveal delay={lineIndex * 0.1}>{line}</ClipReveal>
              </span>
            ))}
          </h1>
          <h2 className="sr-only">{HERO_COPY}</h2>
        </div>
      </div>
    </FrameShell>
  );
}
