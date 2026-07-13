"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  FIELD_NOTES_HANDWRITING_PAGE,
  FIELD_NOTES_HANDWRITING_SLIDE,
} from "@/lib/field-notes-handwriting-paths";

/** Marker ink for handwritten titles — coral marker stroke. */
export const FIELD_NOTES_INK = "#f4635a";

type FieldNotesHandwritingVariant = "slide" | "page";

interface FieldNotesHandwritingProps {
  variant?: FieldNotesHandwritingVariant;
  text: string;
  animate?: boolean;
  isActive?: boolean;
  className?: string;
}

const HANDWRITING_BY_VARIANT = {
  slide: FIELD_NOTES_HANDWRITING_SLIDE,
  page: FIELD_NOTES_HANDWRITING_PAGE,
} as const;

export function FieldNotesHandwriting({
  variant = "slide",
  text,
  animate = false,
  isActive = true,
  className = "",
}: FieldNotesHandwritingProps) {
  const reducedMotion = useReducedMotion();
  const [playKey, setPlayKey] = useState(0);
  const shouldAnimate = animate && isActive && !reducedMotion;

  useEffect(() => {
    if (!shouldAnimate) return;
    setPlayKey((key) => key + 1);
  }, [shouldAnimate, isActive]);

  const { viewBox, paths, fontSize, letterSpacing } = HANDWRITING_BY_VARIANT[variant];
  const pathClass = shouldAnimate
    ? "field-notes-handwriting__path field-notes-handwriting__path--draw"
    : "field-notes-handwriting__path field-notes-handwriting__path--static";

  return (
    <div
      className={[
        "field-notes-handwriting",
        variant === "page" ? "field-notes-handwriting--page" : "field-notes-handwriting--slide",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--field-notes-ink": FIELD_NOTES_INK,
          "--duration": variant === "page" ? "1.2s" : "1s",
        } as React.CSSProperties
      }
    >
      <p className="sr-only">{text}</p>
      <svg
        key={playKey}
        aria-hidden
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
  );
}
