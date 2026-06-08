"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useWireframe } from "@/context/wireframe-context";

interface SectionFrameLottieProps {
  src: string;
  className?: string;
  /** Remap near-black fills to this hex (normal mode only). */
  fillAccent?: string;
  /** Multiply stroke widths — 0.2 = 80% thinner lines. */
  strokeWidthScale?: number;
}

type LottieColorProperty = {
  a?: number;
  k?: number[];
  ix?: number;
};

type LottieOpacityProperty = {
  a?: number;
  k?: number;
  ix?: number;
};

type LottieProperty = {
  a?: number;
  k?: number | LottieKeyframe[];
  ix?: number;
};

type LottieKeyframe = {
  s?: number | number[];
  [key: string]: unknown;
};

type LottieShape = {
  ty?: string;
  c?: LottieColorProperty;
  o?: LottieOpacityProperty;
  w?: LottieProperty;
  it?: LottieShape[];
};

type LottieLayer = {
  shapes?: LottieShape[];
};

type LottieAnimation = {
  layers?: LottieLayer[];
};

const WHITE = [1, 1, 1, 1] as const;

function hexToLottieRgba(hex: string): [number, number, number, number] {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  return [r, g, b, 1];
}

function isNearBlack([r, g, b]: number[]): boolean {
  return r < 0.15 && g < 0.15 && b < 0.15;
}

function isNearWhite([r, g, b]: number[]): boolean {
  return r > 0.85 && g > 0.85 && b > 0.85;
}

function scaleLottieProperty(
  prop: LottieProperty,
  scale: number,
): LottieProperty {
  if (prop.a === 0 && typeof prop.k === "number") {
    return { ...prop, k: prop.k * scale };
  }

  if (Array.isArray(prop.k)) {
    return {
      ...prop,
      k: prop.k.map((keyframe) => {
        if (typeof keyframe.s === "number") {
          return { ...keyframe, s: keyframe.s * scale };
        }

        if (Array.isArray(keyframe.s)) {
          return {
            ...keyframe,
            s: keyframe.s.map((value) => value * scale),
          };
        }

        return keyframe;
      }),
    };
  }

  return prop;
}

function scaleLottieShapes(shapes: LottieShape[] | undefined, scale: number) {
  if (!shapes) return;

  for (const shape of shapes) {
    if (shape.ty === "st" && shape.w) {
      shape.w = scaleLottieProperty(shape.w, scale);
    }

    if (shape.it) {
      scaleLottieShapes(shape.it, scale);
    }
  }
}

function scaleLottieStrokeWidths(
  data: LottieAnimation,
  scale: number,
): LottieAnimation {
  const clone = structuredClone(data);

  for (const layer of clone.layers ?? []) {
    scaleLottieShapes(layer.shapes, scale);
  }

  return clone;
}

/** Normal mode: recolor near-black shape fills (not strokes). */
function applyLottieFillAccent(
  data: LottieAnimation,
  hex: string,
): LottieAnimation {
  const accent = hexToLottieRgba(hex);
  const clone = structuredClone(data);

  function walkShapes(shapes: LottieShape[] | undefined) {
    if (!shapes) return;

    for (const shape of shapes) {
      if (
        shape.ty === "fl" &&
        shape.c?.a === 0 &&
        Array.isArray(shape.c.k)
      ) {
        const [r, g, b, a = 1] = shape.c.k;

        if (isNearBlack([r, g, b])) {
          shape.c.k = [accent[0], accent[1], accent[2], a];
        }
      }

      if (shape.it) {
        walkShapes(shape.it);
      }
    }
  }

  for (const layer of clone.layers ?? []) {
    walkShapes(layer.shapes);
  }

  return clone;
}

/** Wireframe: black → white; remove existing white fills. */
function applyWireframeLottieColors(data: LottieAnimation): LottieAnimation {
  const clone = structuredClone(data);

  function walkShapes(shapes: LottieShape[] | undefined) {
    if (!shapes) return;

    for (const shape of shapes) {
      if (shape.c?.a === 0 && Array.isArray(shape.c.k)) {
        const [r, g, b, a = 1] = shape.c.k;

        if (isNearWhite([r, g, b])) {
          if (shape.ty === "fl") {
            shape.o = { a: 0, k: 0, ix: 5 };
          }
        } else if (isNearBlack([r, g, b])) {
          shape.c.k = [WHITE[0], WHITE[1], WHITE[2], a];
        }
      }

      if (shape.it) {
        walkShapes(shape.it);
      }
    }
  }

  for (const layer of clone.layers ?? []) {
    walkShapes(layer.shapes);
  }

  return clone;
}

function prepareLottieData(
  data: LottieAnimation,
  strokeWidthScale: number,
  wireframe: boolean,
  fillAccent?: string,
): LottieAnimation {
  let prepared =
    strokeWidthScale === 1
      ? structuredClone(data)
      : scaleLottieStrokeWidths(data, strokeWidthScale);

  if (wireframe) {
    prepared = applyWireframeLottieColors(prepared);
  } else if (fillAccent) {
    prepared = applyLottieFillAccent(prepared, fillAccent);
  }

  return prepared;
}

export function SectionFrameLottie({
  src,
  className,
  fillAccent,
  strokeWidthScale = 1,
}: SectionFrameLottieProps) {
  const { wireframe } = useWireframe();
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => response.json())
      .then((data: LottieAnimation) => {
        if (cancelled) return;
        setAnimationData(
          prepareLottieData(data, strokeWidthScale, wireframe, fillAccent),
        );
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [src, strokeWidthScale, wireframe, fillAccent]);

  if (!animationData) {
    return <div className={className} aria-hidden />;
  }

  return (
    <Lottie
      key={wireframe ? "wireframe" : "default"}
      animationData={animationData}
      loop
      autoplay
      className={className}
      aria-hidden
    />
  );
}
