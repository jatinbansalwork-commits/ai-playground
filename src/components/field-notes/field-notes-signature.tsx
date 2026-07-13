"use client";

import { useEffect, useRef, useState } from "react";
import { FIELD_NOTES_INK } from "@/components/field-notes/field-notes-handwriting";
import { FIELD_NOTES_HANDWRITING_SIGNATURE } from "@/lib/field-notes-handwriting-paths";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Hand-drawn smiley — Just Another Hand has no ☺ glyph.
 * Coordinates sit in the same font-space as generated "jb" paths.
 */
const SMILEY = {
  cx: 430,
  cy: 280,
  r: 86,
  eyeR: 10,
  eyeY: 254,
  eyeDx: 30,
  smile: "M398 310 Q430 344 462 310",
} as const;

const VIEW_PAD = 48;

/** End-of-note sign-off: coral "jb" + smiley, draws when scrolled into view. */
export function FieldNotesSignature() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = inView && !reducedMotion;
  const pathClass = shouldAnimate
    ? "field-notes-handwriting__path field-notes-handwriting__path--draw"
    : inView || reducedMotion
      ? "field-notes-handwriting__path field-notes-handwriting__path--static"
      : "field-notes-handwriting__path";
  const eyeClass = shouldAnimate
    ? "field-notes-signature__eye field-notes-signature__eye--draw"
    : inView || reducedMotion
      ? "field-notes-signature__eye field-notes-signature__eye--static"
      : "field-notes-signature__eye";

  const { viewBox, paths, fontSize, letterSpacing, text } =
    FIELD_NOTES_HANDWRITING_SIGNATURE;

  const [vbX, vbY, vbW, vbH] = viewBox.split(" ").map(Number) as [
    number,
    number,
    number,
    number,
  ];

  // Tight box around "jb" + smiley so the mark centres in the SVG (no empty right gutter).
  const contentLeft = vbX;
  const contentRight = Math.max(vbX + vbW, SMILEY.cx + SMILEY.r);
  const contentTop = Math.min(vbY, SMILEY.cy - SMILEY.r);
  const contentBottom = Math.max(vbY + vbH, SMILEY.cy + SMILEY.r);
  const tightViewBox = [
    contentLeft - VIEW_PAD,
    contentTop - VIEW_PAD,
    contentRight - contentLeft + VIEW_PAD * 2,
    contentBottom - contentTop + VIEW_PAD * 2,
  ].join(" ");

  const baseStrokeOrder = paths.length;

  return (
    <div
      ref={rootRef}
      className="field-notes-handwriting field-notes-signature"
      style={
        {
          "--field-notes-ink": FIELD_NOTES_INK,
          "--duration": "0.9s",
        } as React.CSSProperties
      }
    >
      <p className="sr-only">{text}</p>
      <svg
        key={shouldAnimate ? "draw" : "idle"}
        aria-hidden
        viewBox={tightViewBox}
        fill="none"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        className="field-notes-handwriting__svg field-notes-signature__svg"
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
            key={`jb-${index}`}
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
        <circle
          className={pathClass}
          cx={SMILEY.cx}
          cy={SMILEY.cy}
          r={SMILEY.r}
          pathLength={1}
          style={{ "--stroke-order": baseStrokeOrder } as React.CSSProperties}
        />
        <circle
          className={eyeClass}
          cx={SMILEY.cx - SMILEY.eyeDx}
          cy={SMILEY.eyeY}
          r={SMILEY.eyeR}
          style={
            { "--stroke-order": baseStrokeOrder + 1 } as React.CSSProperties
          }
        />
        <circle
          className={eyeClass}
          cx={SMILEY.cx + SMILEY.eyeDx}
          cy={SMILEY.eyeY}
          r={SMILEY.eyeR}
          style={
            { "--stroke-order": baseStrokeOrder + 2 } as React.CSSProperties
          }
        />
        <path
          className={pathClass}
          d={SMILEY.smile}
          pathLength={1}
          style={
            { "--stroke-order": baseStrokeOrder + 3 } as React.CSSProperties
          }
        />
      </svg>
    </div>
  );
}
