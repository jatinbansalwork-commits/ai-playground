"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { useWireframe } from "@/context/wireframe-context";
import { INDEX_SLIDE_MONOGRAM } from "@/lib/index-typography";

interface SectionFrameMonogramProps {
  text: string;
  fontSize: number;
  /** Slow left-to-right reveal when text overflows the frame mask. */
  pan?: boolean;
  /** Pan loop duration in seconds. */
  panDuration?: number;
}

export function SectionFrameMonogram({
  text,
  fontSize,
  pan = false,
  panDuration = 14,
}: SectionFrameMonogramProps) {
  const { wireframe } = useWireframe();
  const maskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [panRange, setPanRange] = useState(0);
  const [maskWidth, setMaskWidth] = useState(0);

  useLayoutEffect(() => {
    if (!pan) {
      setPanRange(0);
      setMaskWidth(0);
      return;
    }

    const measure = () => {
      const mask = maskRef.current;
      const label = textRef.current;
      if (!mask || !label) return;

      const overflow = label.offsetWidth - mask.clientWidth;
      setPanRange(Math.max(0, overflow));
      setMaskWidth(mask.clientWidth);
    };

    measure();

    const mask = maskRef.current;
    if (!mask) return;

    const observer = new ResizeObserver(measure);
    observer.observe(mask);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [pan, text, fontSize, wireframe]);

  const shouldPan = pan && panRange > 0;
  const panCycleDuration =
    shouldPan && maskWidth > 0
      ? panDuration * (panRange / maskWidth)
      : panDuration;

  return (
    <div
      ref={maskRef}
      className="relative h-full w-full overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2">
        <motion.h3
          ref={textRef}
          className={INDEX_SLIDE_MONOGRAM}
          style={{ fontSize }}
          initial={false}
          animate={shouldPan ? { x: [0, -panRange, 0] } : { x: 0 }}
          transition={
            shouldPan
              ? {
                  duration: panCycleDuration,
                  ease: [0.37, 0, 0.63, 1],
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }
              : undefined
          }
        >
          {text}
        </motion.h3>
      </div>
    </div>
  );
}
