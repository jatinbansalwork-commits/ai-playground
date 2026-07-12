"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FIELD_NOTES_HANDWRITING } from "@/lib/field-notes-handwriting-paths";

/** Coral marker ink — matches Rauno Field Notes slides. */
const FIELD_NOTES_INK = "#f4635a";

interface SectionFrameFieldNotesTitleProps {
  text: string;
  isActive: boolean;
}

export function SectionFrameFieldNotesTitle({
  text,
  isActive,
}: SectionFrameFieldNotesTitleProps) {
  const reducedMotion = useReducedMotion();
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    if (!isActive || reducedMotion) return;
    setPlayKey((key) => key + 1);
  }, [isActive, reducedMotion]);

  const { viewBox, paths, fontSize, letterSpacing } = FIELD_NOTES_HANDWRITING;
  const pathClass = reducedMotion
    ? "field-notes-handwriting__path field-notes-handwriting__path--static"
    : "field-notes-handwriting__path field-notes-handwriting__path--draw";

  return (
    <div className="flex h-full w-full items-center justify-center overflow-visible px-2">
      <p className="sr-only">{text}</p>
      <div
        aria-hidden
        className="field-notes-handwriting"
        style={
          {
            "--field-notes-ink": FIELD_NOTES_INK,
            "--duration": "1s",
          } as React.CSSProperties
        }
      >
        <svg
          key={playKey}
          viewBox={viewBox}
          fill="none"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
          className="field-notes-handwriting__svg"
        >
          <text
            fontWeight={600}
            fontSize={fontSize}
            fill="transparent"
            y={fontSize * 0.85}
            letterSpacing={`${letterSpacing}px`}
          >
            {text}
          </text>
          {paths.map((path, index) => (
            <path
              key={`${playKey}-${index}`}
              className={pathClass}
              d={path.d}
              pathLength={1}
              style={
                {
                  "--stroke-order": path.strokeOrder,
                } as React.CSSProperties
              }
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
