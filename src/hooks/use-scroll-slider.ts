"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  animate,
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
import { useClickSound } from "@/hooks/use-click-sound";
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

  const frameIndexRef = useRef(0);
  const isSnappingRef = useRef(false);
  const isReadyRef = useRef(false);
  const scrollRangeRef = useRef(0);
  const baseScaleRef = useRef(1);

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
        playClick();
        frameIndexRef.current = frameIndex;
      }
    },
    [frameCount, maxOffset, minimapX, playClick, scale, trackX],
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

  const snapToIndex = useCallback(
    (index: number) => {
      const clampedIndex = clamp(index, 0, frameCount - 1);
      const targetScroll = clampedIndex * SCROLL_PER_FRAME;

      isSnappingRef.current = true;

      animate(readScrollOffset(), targetScroll, {
        ...springScrollSnap,
        onUpdate: (value) => {
          const synced = syncScrollPosition(value);
          updateFromScroll(synced);
        },
        onComplete: () => {
          isSnappingRef.current = false;
        },
      });
    },
    [frameCount, syncScrollPosition, updateFromScroll],
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
    frameIndexRef.current = 0;
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
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScrollWithSnap);
      window.removeEventListener("resize", syncBaseScale);
      if (snapTimer) clearTimeout(snapTimer);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, [
    clampScrollOffset,
    frameCount,
    scale,
    snapToIndex,
    syncScrollPosition,
    updateFromScroll,
  ]);

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

  useMotionValueEvent(trackX, "change", (value) => {
    const progress = clamp(-value / maxOffset, 0, 1);
    minimapX.set(progress * MINIMAP_RANGE);
  });

  return {
    springTrackX: clampedTrackX,
    springScaleValue,
    activeIndex: frameIndexRef,
    snapToIndex,
    playClick,
    scrollRange: (frameCount - 1) * SCROLL_PER_FRAME,
    frameCount,
  };
}
