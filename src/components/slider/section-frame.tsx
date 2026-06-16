"use client";

import { motion } from "framer-motion";
import { MeIntroVideo } from "@/components/me/me-intro-video";
import { springSlider } from "@/lib/spring";
import { FrameShell } from "@/components/slider/frame-shell";
import { SectionFrameLottie } from "@/components/slider/section-frame-lottie";
import { SectionFrameImage } from "@/components/slider/section-frame-image";
import { SectionFrameMonogram } from "@/components/slider/section-frame-monogram";
import { SectionFrameTypingMonogram } from "@/components/slider/section-frame-typing-monogram";
import {
  getIndexMonogramFontSize,
  INDEX_SLIDE_MONOGRAM,
  INDEX_SLIDE_MONOGRAM_FONT_OFFSET,
  INDEX_SLIDE_MONOGRAM_SCALE,
} from "@/lib/index-typography";
import type { SectionFrame } from "@/types";

interface SectionFramePanelProps {
  frame: SectionFrame;
  index: number;
  onInteract: () => void;
}

export function SectionFramePanel({
  frame,
  index,
  onInteract,
}: SectionFramePanelProps) {
  const monogram = frame.monogram ?? "";
  const fontSize =
    getIndexMonogramFontSize(monogram) *
      (frame.monogramScale ?? INDEX_SLIDE_MONOGRAM_SCALE) +
    (frame.monogramFontOffset ?? INDEX_SLIDE_MONOGRAM_FONT_OFFSET);

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
      ) : frame.monogramImage ? (
        <SectionFrameImage src={frame.monogramImage} />
      ) : frame.monogramTyping ? (
        <SectionFrameTypingMonogram text={monogram} fontSize={fontSize} />
      ) : frame.monogramPan ? (
        <SectionFrameMonogram
          text={monogram}
          fontSize={fontSize}
          pan={frame.monogramPan}
          panDuration={frame.monogramPanDuration}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <motion.h3
            aria-hidden
            className={`pointer-events-none max-w-full ${INDEX_SLIDE_MONOGRAM}`}
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
