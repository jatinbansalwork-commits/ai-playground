"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FRAME_STRIDE,
  FRAMES,
  MINIMAP_RANGE,
  SCALE_BASE_MIN,
  SCALE_MIN,
  SCALE_SCROLL_FACTOR,
  SCALE_VIEWPORT_HEIGHT,
  SCALE_VIEWPORT_WIDTH,
  SCROLL_PER_FRAME,
} from "@/lib/constants";
import { springScale, springScrollSnap } from "@/lib/spring";
import {
  trackIndexFrameNavigate,
  trackIndexFrameView,
  type IndexNavigateMethod,
} from "@/lib/analytics";

const SNAP_DURATION_MS = 720;
import { useClickSound } from "@/hooks/use-click-sound";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";
import { useSliderContext } from "@/context/slider-context";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function readScrollOffset() {
  return Math.max(
    document.documentElement.scrollLeft,
    document.body.scrollLeft,
    document.documentElement.scrollTop,
    document.body.scrollTop,
  );
}

function computeBaseScale() {
  return clamp(
    Math.min(
      window.innerWidth / SCALE_VIEWPORT_WIDTH,
      window.innerHeight / SCALE_VIEWPORT_HEIGHT,
    ),
    SCALE_BASE_MIN,
    1,
  );
}

function computeScaleFromScroll(scrollOffset: number, baseScale: number) {
  if (scrollOffset <= 0) return baseScale;
  return clamp(
    baseScale - scrollOffset * SCALE_SCROLL_FACTOR,
    SCALE_MIN,
    baseScale,
  );
}

function resetScrollPosition() {
  window.scrollTo(0, 0);
  document.documentElement.scrollLeft = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollLeft = 0;
  document.body.scrollTop = 0;
}

export function useScrollSlider() {
  const { trackX, minimapX, scale } = useSliderContext();
  const frameCount = FRAMES.length;
  const maxOffset = (frameCount - 1) * FRAME_STRIDE;

  const playClick = useClickSound();
  const reducedMotion = useReducedMotion();
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const frameIndexRef = useRef(-1);
  const navigateMethodRef = useRef<IndexNavigateMethod>("scroll");
  const isSnappingRef = useRef(false);
  const isReadyRef = useRef(false);
  const scrollRangeRef = useRef(0);
  const baseScaleRef = useRef(1);
  const snapFrameRef = useRef<number | null>(null);

  const springScaleValue = useSpring(scale, springScale);
  const springTrackX = useSpring(trackX, springScrollSnap);
  const clampedTrackX = useTransform(springTrackX, (value) =>
    clamp(value, -maxOffset, 0),
  );

  const clampScrollOffset = useCallback((value: number) => {
    return clamp(value, 0, scrollRangeRef.current);
  }, []);

  const updateFromScroll = useCallback(
    (scrollOffset: number) => {
      const scrollRange = scrollRangeRef.current;
      if (scrollRange <= 0) return;

      const clamped = clamp(scrollOffset, 0, scrollRange);
      const progress = clamped / scrollRange;
      const offset = clamp(progress * maxOffset, 0, maxOffset);
      const frameIndex = Math.round(progress * (frameCount - 1));

      trackX.set(-offset);
      minimapX.set(progress * MINIMAP_RANGE);
      scale.set(computeScaleFromScroll(clamped, baseScaleRef.current));

      if (frameIndex !== frameIndexRef.current) {
        if (!reducedMotion) playClick();

        const fromIndex = frameIndexRef.current;
        const nextFrame = FRAMES[frameIndex];
        if (nextFrame) {
          trackIndexFrameView({
            frame_id: nextFrame.id,
            frame_label: nextFrame.label,
            index: frameIndex,
          });

          if (fromIndex >= 0) {
            const fromFrame = FRAMES[fromIndex];
            if (fromFrame) {
              trackIndexFrameNavigate({
                from: fromFrame.id,
                to: nextFrame.id,
                method: navigateMethodRef.current,
              });
            }
          }
        }

        navigateMethodRef.current = "scroll";
        frameIndexRef.current = frameIndex;
        setActiveFrameIndex(frameIndex);
      }
    },
    [frameCount, maxOffset, minimapX, playClick, reducedMotion, scale, trackX],
  );

  const syncScrollPosition = useCallback((value: number) => {
    const clamped = clampScrollOffset(value);

    if (
      document.documentElement.scrollLeft !== clamped ||
      document.documentElement.scrollTop !== clamped ||
      document.body.scrollLeft !== clamped ||
      document.body.scrollTop !== clamped
    ) {
      document.documentElement.scrollLeft = clamped;
      document.documentElement.scrollTop = clamped;
      document.body.scrollLeft = clamped;
      document.body.scrollTop = clamped;
    }

    return clamped;
  }, [clampScrollOffset]);

  const cancelSnapAnimation = useCallback(() => {
    if (snapFrameRef.current !== null) {
      cancelAnimationFrame(snapFrameRef.current);
      snapFrameRef.current = null;
    }
  }, []);

  const snapToIndex = useCallback(
    (index: number, method: IndexNavigateMethod = "scroll") => {
      navigateMethodRef.current = method;
      const clampedIndex = clamp(index, 0, frameCount - 1);
      const targetScroll = clampedIndex * SCROLL_PER_FRAME;
      const start = readScrollOffset();

      cancelSnapAnimation();
      isSnappingRef.current = true;

      if (reducedMotion || start === targetScroll) {
        const synced = syncScrollPosition(targetScroll);
        updateFromScroll(synced);
        isSnappingRef.current = false;
        return;
      }

      const delta = targetScroll - start;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / SNAP_DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        const value = start + delta * eased;
        const synced = syncScrollPosition(value);
        updateFromScroll(synced);

        if (progress < 1) {
          snapFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        syncScrollPosition(targetScroll);
        updateFromScroll(targetScroll);
        isSnappingRef.current = false;
        snapFrameRef.current = null;
      };

      snapFrameRef.current = requestAnimationFrame(tick);
    },
    [
      cancelSnapAnimation,
      frameCount,
      reducedMotion,
      syncScrollPosition,
      updateFromScroll,
    ],
  );

  useLayoutEffect(() => {
    const scrollRange = (frameCount - 1) * SCROLL_PER_FRAME;
    scrollRangeRef.current = scrollRange;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    resetScrollPosition();
    baseScaleRef.current = computeBaseScale();
    trackX.jump(0);
    springTrackX.jump(0);
    minimapX.jump(0);
    scale.jump(baseScaleRef.current);
    springScaleValue.jump(baseScaleRef.current);
    frameIndexRef.current = -1;
  }, [frameCount, minimapX, scale, springScaleValue, springTrackX, trackX]);

  useEffect(() => {
    const scrollRange = (frameCount - 1) * SCROLL_PER_FRAME;
    scrollRangeRef.current = scrollRange;

    const syncBaseScale = () => {
      baseScaleRef.current = computeBaseScale();
      scale.jump(
        computeScaleFromScroll(
          clampScrollOffset(readScrollOffset()),
          baseScaleRef.current,
        ),
      );
    };

    syncScrollPosition(0);
    syncBaseScale();
    updateFromScroll(0);

    const readyTimer = window.setTimeout(() => {
      isReadyRef.current = true;
    }, 50);

    let snapTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (!isReadyRef.current) return;

      const raw = readScrollOffset();
      const synced = syncScrollPosition(raw);

      if (isSnappingRef.current) return;
      updateFromScroll(synced);
    };

    const onScrollWithSnap = () => {
      onScroll();

      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const index = clamp(
          Math.round(clampScrollOffset(readScrollOffset()) / SCROLL_PER_FRAME),
          0,
          frameCount - 1,
        );
        snapToIndex(index);
      }, 120);
    };

    window.addEventListener("scroll", onScrollWithSnap, { passive: true });
    window.addEventListener("resize", syncBaseScale);

    return () => {
      isReadyRef.current = false;
      cancelSnapAnimation();
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScrollWithSnap);
      window.removeEventListener("resize", syncBaseScale);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, [
    cancelSnapAnimation,
    clampScrollOffset,
    frameCount,
    scale,
    snapToIndex,
    syncScrollPosition,
    updateFromScroll,
  ]);

  useEffect(() => {
    return () => {
      cancelSnapAnimation();
      resetDocumentScroll();
    };
  }, [cancelSnapAnimation]);

  useEffect(() => {
    let snapTimer: ReturnType<typeof setTimeout> | null = null;

    const snapAfterIdle = () => {
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (isSnappingRef.current) return;
        const index = clamp(
          Math.round(clampScrollOffset(readScrollOffset()) / SCROLL_PER_FRAME),
          0,
          frameCount - 1,
        );
        snapToIndex(index);
      }, 120);
    };

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (delta === 0) return;

      const scrollRange = scrollRangeRef.current;
      const current = clampScrollOffset(readScrollOffset());
      const next = clamp(current + delta, 0, scrollRange);

      event.preventDefault();
      const synced = syncScrollPosition(next);
      updateFromScroll(synced);
      snapAfterIdle();
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, [clampScrollOffset, frameCount, snapToIndex, syncScrollPosition, updateFromScroll]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          nextIndex = frameIndexRef.current + 1;
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          nextIndex = frameIndexRef.current - 1;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = frameCount - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      snapToIndex(nextIndex, "keyboard");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [frameCount, snapToIndex]);

  useMotionValueEvent(trackX, "change", (value) => {
    const progress = clamp(-value / maxOffset, 0, 1);
    minimapX.set(progress * MINIMAP_RANGE);
  });

  return {
    springTrackX: clampedTrackX,
    springScaleValue,
    activeFrameIndex,
    snapToIndex,
    playClick,
    scrollRange: (frameCount - 1) * SCROLL_PER_FRAME,
    frameCount,
  };
}
