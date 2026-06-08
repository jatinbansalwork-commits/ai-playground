"use client";

import { motion } from "framer-motion";
import { MeIntroVideo } from "@/components/me/me-intro-video";
import { springSlider } from "@/lib/spring";
import { FrameShell } from "@/components/slider/frame-shell";
import { SectionFrameLottie } from "@/components/slider/section-frame-lottie";
import { SectionFrameMonogram } from "@/components/slider/section-frame-monogram";
import type { SectionFrame } from "@/types";

interface SectionFramePanelProps {
  frame: SectionFrame;
  index: number;
  onInteract: () => void;
}

function getMonogramFontSize(label: string): number {
  if (label.length <= 1) return 720;
  if (label.length <= 3) return 320;
  if (label.length <= 8) return 180;
  return 140;
}

export function SectionFramePanel({
  frame,
  index,
  onInteract,
}: SectionFramePanelProps) {
  const monogram = frame.monogram ?? "";
  const fontSize =
    getMonogramFontSize(monogram) * (frame.monogramScale ?? 1) +
    (frame.monogramFontOffset ?? 0);

  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      {frame.videoThumbnail ? (
        <MeIntroVideo variant="frame" />
      ) : frame.lottie ? (
        <SectionFrameLottie
          src={frame.lottie}
          fillAccent={frame.lottieFillAccent}
          strokeWidthScale={0.2}
          className="pointer-events-none h-[min(480px,70vh)] w-[min(480px,70vh)]"
        />
      ) : frame.monogramPan ? (
        <SectionFrameMonogram
          text={monogram}
          fontSize={fontSize}
          pan={frame.monogramPan}
          panDuration={frame.monogramPanDuration}
        />
      ) : (
        <div className="section-monogram-mask flex h-full w-full items-center justify-center overflow-hidden">
          <motion.h3
            aria-hidden
            data-text={monogram}
            className="section-monogram pointer-events-none max-w-full leading-none font-normal tracking-tighter whitespace-nowrap text-black"
            style={{ fontSize }}
            whileHover={{ x: 8, opacity: 0.85 }}
            transition={springSlider}
          >
            {monogram}
          </motion.h3>
        </div>
      )}
    </FrameShell>
  );
}
