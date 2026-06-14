"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { resolveAssetUrl } from "@/lib/asset-cdn";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import type { ProjectRowItem } from "@/lib/projects-list-data";
import { springBentoHover } from "@/lib/spring";

const CURSOR_GAP_PX = 24;
const VIEWPORT_PAD_PX = 16;
const LERP = 0.14;
const SHELL_PAD_PX = 2;

type PreviewSide = "left" | "right";

const PREVIEW_SIZE_SCALE = 1.43;

function getPreviewSize() {
  const base = window.innerWidth >= 768 ? 320 : 288;
  return Math.round(base * PREVIEW_SIZE_SCALE);
}

function getPreviewMediaSize() {
  return getPreviewSize() - SHELL_PAD_PX * 2;
}

function pickRandomSide(): PreviewSide {
  return Math.random() < 0.5 ? "left" : "right";
}

function resolvePreviewSide(
  clientX: number,
  width: number,
  preferred: PreviewSide,
): PreviewSide {
  const rightLeft = clientX + CURSOR_GAP_PX;
  const leftLeft = clientX - width - CURSOR_GAP_PX;
  const fitsRight = rightLeft + width <= window.innerWidth - VIEWPORT_PAD_PX;
  const fitsLeft = leftLeft >= VIEWPORT_PAD_PX;

  if (preferred === "right") {
    if (fitsRight) return "right";
    if (fitsLeft) return "left";
    return "right";
  }

  if (fitsLeft) return "left";
  if (fitsRight) return "right";
  return "left";
}

function targetPosition(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
  side: PreviewSide,
) {
  const left =
    side === "right"
      ? clientX + CURSOR_GAP_PX
      : clientX - width - CURSOR_GAP_PX;

  const top = Math.max(
    VIEWPORT_PAD_PX,
    Math.min(clientY - height / 2, window.innerHeight - height - VIEWPORT_PAD_PX),
  );

  const clampedLeft = Math.max(
    VIEWPORT_PAD_PX,
    Math.min(left, window.innerWidth - width - VIEWPORT_PAD_PX),
  );

  return { x: clampedLeft, y: top };
}

interface ProjectsHoverPreviewProps {
  project: ProjectRowItem | null;
}

export function ProjectsHoverPreview({ project }: ProjectsHoverPreviewProps) {
  const reduceMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [scaledIn, setScaledIn] = useState(false);

  const sideRef = useRef<PreviewSide>("right");
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  const src = project?.hoverThumbnail ?? null;

  const applyPosition = (x: number, y: number) => {
    const node = previewRef.current;
    if (!node) return;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const syncTarget = (clientX: number, clientY: number) => {
    const size = getPreviewSize();
    const side = resolvePreviewSide(clientX, size, sideRef.current);
    sideRef.current = side;
    targetRef.current = targetPosition(clientX, clientY, size, size, side);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
      if (src) {
        syncTarget(event.clientX, event.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [src]);

  useEffect(() => {
    if (!src) {
      setVisible(false);
      setScaledIn(false);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const { x, y } = mousePosRef.current;
    sideRef.current = pickRandomSide();
    syncTarget(x, y);
    currentRef.current = { ...targetRef.current };
    applyPosition(currentRef.current.x, currentRef.current.y);
    setVisible(true);
    setScaledIn(false);

    const scaleFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setScaledIn(true));
    });

    const tick = () => {
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * LERP;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * LERP;
      applyPosition(currentRef.current.x, currentRef.current.y);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(scaleFrame);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [src]);

  if (!project || !src) return null;

  const resolved = resolveAssetUrl(src);
  const isDataUri = resolved.startsWith("data:");
  const imageSize = getPreviewMediaSize();
  const enterTransition = reduceMotion
    ? { duration: 0 }
    : springBentoHover;

  return (
    <div
      ref={previewRef}
      className={`projects-hover-preview${visible ? " projects-hover-preview--visible" : ""}`}
      aria-hidden
    >
      <motion.div
        className={`projects-hover-preview-bento h-full w-full overflow-hidden p-0.5 ${EXPERIMENTS_CARD.shell} border-white/[0.08]`}
        initial={false}
        animate={{
          scale: scaledIn ? 1 : 0.9,
          opacity: scaledIn ? 1 : 0,
        }}
        transition={enterTransition}
      >
        <div
          className={`relative isolate aspect-square w-full overflow-hidden ${EXPERIMENTS_CARD.preview}`}
        >
          {isDataUri ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolved}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              draggable={false}
            />
          ) : (
            <Image
              src={resolved}
              alt=""
              width={imageSize}
              height={imageSize}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="lazy"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
