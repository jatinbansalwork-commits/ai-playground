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
import {
  saveIndexActiveFrame,
  readIndexActiveFrame,
  resumeIndexActiveFramePersistence,
} from "@/lib/index-frame-memory";
import { useSliderContext } from "@/context/slider-context";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function readDocumentScrollOffset() {
  return Math.max(
    document.documentElement.scrollLeft,
    document.body.scrollLeft,
    document.documentElement.scrollTop,
    document.body.scrollTop,
  );
}

/** Ghost-spacer document scroll is unreliable on touch and WebKit — mirror only on desktop hover. */
function shouldMirrorDocumentScroll(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(hover: none)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return true;
}

function syncDocumentScrollOffset(value: number) {
  if (!shouldMirrorDocumentScroll()) return;

  const scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    if (scrollingElement.scrollLeft !== value || scrollingElement.scrollTop !== value) {
      scrollingElement.scrollLeft = value;
      scrollingElement.scrollTop = value;
    }
  }

  if (
    document.documentElement.scrollLeft !== value ||
    document.documentElement.scrollTop !== value ||
    document.body.scrollLeft !== value ||
    document.body.scrollTop !== value
  ) {
    document.documentElement.scrollLeft = value;
    document.documentElement.scrollTop = value;
    document.body.scrollLeft = value;
    document.body.scrollTop = value;
  }
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

function canElementConsumeWheel(
  element: Element,
  deltaX: number,
  deltaY: number,
): boolean {
  const style = window.getComputedStyle(element);
  const canScrollX =
    (style.overflowX === "auto" || style.overflowX === "scroll") &&
    element.scrollWidth > element.clientWidth + 1;
  const canScrollY =
    (style.overflowY === "auto" || style.overflowY === "scroll") &&
    element.scrollHeight > element.clientHeight + 1;

  if (Math.abs(deltaX) >= Math.abs(deltaY) && canScrollX) {
    const maxLeft = element.scrollWidth - element.clientWidth;
    if (deltaX > 0 && element.scrollLeft < maxLeft - 1) return true;
    if (deltaX < 0 && element.scrollLeft > 0) return true;
  }

  if (Math.abs(deltaY) >= Math.abs(deltaX) && canScrollY) {
    const maxTop = element.scrollHeight - element.clientHeight;
    if (deltaY > 0 && element.scrollTop < maxTop - 1) return true;
    if (deltaY < 0 && element.scrollTop > 0) return true;
  }

  return false;
}

function eventTargetHasScrollableAncestor(
  target: EventTarget | null,
  deltaX: number,
  deltaY: number,
): boolean {
  if (!(target instanceof Element)) return false;

  let node: Element | null = target;
  while (node && node !== document.documentElement) {
    if (canElementConsumeWheel(node, deltaX, deltaY)) return true;
    node = node.parentElement;
  }

  return false;
}

const SLIDER_POINTER_IGNORE_SELECTOR =
  'a[href], button, [role="button"], input, textarea, select, label, summary, [contenteditable="true"], [role="dialog"]';

const SLIDER_DRAG_AXIS_LOCK_PX = 6;
const SLIDER_DRAG_AXIS_LOCK_COARSE_PX = 6;

function getSliderDragAxisLockPx(): number {
  if (typeof window === "undefined") return SLIDER_DRAG_AXIS_LOCK_PX;
  return window.matchMedia("(pointer: coarse)").matches
    ? SLIDER_DRAG_AXIS_LOCK_COARSE_PX
    : SLIDER_DRAG_AXIS_LOCK_PX;
}

function isInNestedScrollContainer(element: Element): boolean {
  let node: Element | null = element;
  while (node && node !== document.documentElement && node !== document.body) {
    if (node.matches('main[data-sheet="index"]')) {
      node = node.parentElement;
      continue;
    }

    const style = window.getComputedStyle(node);
    const scrollableY =
      (style.overflowY === "auto" || style.overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight + 1;
    const scrollableX =
      (style.overflowX === "auto" || style.overflowX === "scroll") &&
      node.scrollWidth > node.clientWidth + 1;

    if (scrollableY || scrollableX) return true;
    node = node.parentElement;
  }

  return false;
}

function shouldIgnoreSliderPointer(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;
  if (!target.closest('main[data-sheet="index"]')) return true;
  if (target.closest(SLIDER_POINTER_IGNORE_SELECTOR)) return true;
  if (isInNestedScrollContainer(target)) return true;
  return false;
}

function getRestoredFrameIndex(frameCount: number): number {
  const saved = readIndexActiveFrame();
  if (saved === null) return 0;
  return clamp(saved, 0, frameCount - 1);
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
  /** Authoritative slider offset — never read ghost-spacer scroll as source of truth. */
  const sliderScrollOffsetRef = useRef(0);
  const isPointerDraggingRef = useRef(false);

  const getScrollOffset = useCallback(() => sliderScrollOffsetRef.current, []);

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

      if (reducedMotion) {
        trackX.jump(-offset);
        springTrackX.jump(-offset);
        minimapX.jump(progress * MINIMAP_RANGE);
        const nextScale = computeScaleFromScroll(clamped, baseScaleRef.current);
        scale.jump(nextScale);
        springScaleValue.jump(nextScale);
      } else {
        trackX.set(-offset);
        minimapX.set(progress * MINIMAP_RANGE);
        scale.set(computeScaleFromScroll(clamped, baseScaleRef.current));
      }

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
        saveIndexActiveFrame(frameIndex);
      }
    },
    [frameCount, maxOffset, minimapX, playClick, reducedMotion, scale, springScaleValue, springTrackX, trackX],
  );

  const syncScrollPosition = useCallback((value: number) => {
    const clamped = clampScrollOffset(value);
    sliderScrollOffsetRef.current = clamped;
    syncDocumentScrollOffset(clamped);
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
      const start = getScrollOffset();

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
      getScrollOffset,
    ],
  );

  useLayoutEffect(() => {
    const scrollRange = (frameCount - 1) * SCROLL_PER_FRAME;
    scrollRangeRef.current = scrollRange;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const initialIndex = getRestoredFrameIndex(frameCount);
    const initialScroll = initialIndex * SCROLL_PER_FRAME;
    const initialProgress =
      scrollRange > 0 ? initialScroll / scrollRange : 0;
    const initialOffset = initialProgress * maxOffset;

    window.scrollTo(0, initialScroll);
    sliderScrollOffsetRef.current = initialScroll;
    syncDocumentScrollOffset(initialScroll);

    baseScaleRef.current = computeBaseScale();
    trackX.jump(-initialOffset);
    springTrackX.jump(-initialOffset);
    minimapX.jump(initialProgress * MINIMAP_RANGE);
    scale.jump(computeScaleFromScroll(initialScroll, baseScaleRef.current));
    springScaleValue.jump(
      computeScaleFromScroll(initialScroll, baseScaleRef.current),
    );
    frameIndexRef.current = initialIndex;
    setActiveFrameIndex(initialIndex);
    resumeIndexActiveFramePersistence();
  }, [frameCount, maxOffset, minimapX, scale, springScaleValue, springTrackX, trackX]);

  useEffect(() => {
    const scrollRange = (frameCount - 1) * SCROLL_PER_FRAME;
    scrollRangeRef.current = scrollRange;

    const syncBaseScale = () => {
      baseScaleRef.current = computeBaseScale();
      scale.jump(
        computeScaleFromScroll(
          clampScrollOffset(getScrollOffset()),
          baseScaleRef.current,
        ),
      );
    };

    const initialIndex = getRestoredFrameIndex(frameCount);
    const initialScroll = initialIndex * SCROLL_PER_FRAME;

    syncScrollPosition(initialScroll);
    syncBaseScale();
    updateFromScroll(initialScroll);

    const readyTimer = window.setTimeout(() => {
      isReadyRef.current = true;
    }, 50);

    /** Realign document scroll to our offset — never adopt ghost-spacer drift (iOS, Android, WebKit). */
    const onScroll = () => {
      if (!isReadyRef.current || isSnappingRef.current || isPointerDraggingRef.current) {
        return;
      }

      const authoritative = getScrollOffset();
      const documentOffset = readDocumentScrollOffset();

      if (Math.abs(documentOffset - authoritative) > 2) {
        syncDocumentScrollOffset(authoritative);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncBaseScale);

    return () => {
      isReadyRef.current = false;
      cancelSnapAnimation();
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncBaseScale);
    };
  }, [
    cancelSnapAnimation,
    clampScrollOffset,
    frameCount,
    getScrollOffset,
    scale,
    syncScrollPosition,
    updateFromScroll,
  ]);

  useEffect(() => {
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let wheelFrameLock = false;

    const snapAfterIdle = () => {
      if (reducedMotion) {
        if (snapTimer) clearTimeout(snapTimer);
        const index = clamp(
          Math.round(clampScrollOffset(getScrollOffset()) / SCROLL_PER_FRAME),
          0,
          frameCount - 1,
        );
        snapToIndex(index);
        return;
      }

      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (isSnappingRef.current) return;
        const index = clamp(
          Math.round(clampScrollOffset(getScrollOffset()) / SCROLL_PER_FRAME),
          0,
          frameCount - 1,
        );
        snapToIndex(index);
      }, 120);
    };

    const onWheel = (event: WheelEvent) => {
      if (eventTargetHasScrollableAncestor(event.target, event.deltaX, event.deltaY)) {
        return;
      }

      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (delta === 0) return;

      event.preventDefault();

      if (reducedMotion) {
        if (wheelFrameLock) return;
        wheelFrameLock = true;
        window.setTimeout(() => {
          wheelFrameLock = false;
        }, 280);

        const direction = delta > 0 ? 1 : -1;
        snapToIndex(frameIndexRef.current + direction, "scroll");
        return;
      }

      const scrollRange = scrollRangeRef.current;
      const current = clampScrollOffset(getScrollOffset());
      const next = clamp(current + delta, 0, scrollRange);

      const synced = syncScrollPosition(next);
      updateFromScroll(synced);
      snapAfterIdle();
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, [
    clampScrollOffset,
    frameCount,
    getScrollOffset,
    reducedMotion,
    snapToIndex,
    syncScrollPosition,
    updateFromScroll,
  ]);

  useEffect(() => {
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let activePointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let dragAxis: "x" | "y" | null = null;
    let suppressClick = false;

    const snapAfterIdle = () => {
      if (reducedMotion) {
        if (snapTimer) clearTimeout(snapTimer);
        const index = clamp(
          Math.round(clampScrollOffset(getScrollOffset()) / SCROLL_PER_FRAME),
          0,
          frameCount - 1,
        );
        snapToIndex(index);
        return;
      }

      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (isSnappingRef.current) return;
        const index = clamp(
          Math.round(clampScrollOffset(getScrollOffset()) / SCROLL_PER_FRAME),
          0,
          frameCount - 1,
        );
        snapToIndex(index);
      }, 120);
    };

    const clearPointerDrag = () => {
      activePointerId = null;
      dragAxis = null;
      isPointerDraggingRef.current = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      if (!isReadyRef.current) return;
      if (shouldIgnoreSliderPointer(event.target)) return;
      if (activePointerId !== null) return;

      cancelSnapAnimation();
      isSnappingRef.current = false;
      activePointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startScroll = getScrollOffset();
      dragAxis = null;
      suppressClick = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;

      const axisLockPx = getSliderDragAxisLockPx();
      const deltaX = startX - event.clientX;
      const deltaY = startY - event.clientY;

      if (!dragAxis) {
        if (
          Math.abs(deltaX) < axisLockPx &&
          Math.abs(deltaY) < axisLockPx
        ) {
          return;
        }

        dragAxis = Math.abs(deltaX) >= Math.abs(deltaY) ? "x" : "y";
        suppressClick = true;
        isPointerDraggingRef.current = true;
      }

      const delta = dragAxis === "x" ? deltaX : deltaY;
      const scrollRange = scrollRangeRef.current;
      const next = clamp(startScroll + delta, 0, scrollRange);

      event.preventDefault();
      const synced = syncScrollPosition(next);
      updateFromScroll(synced);
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;

      const axisLockPx = getSliderDragAxisLockPx();
      const totalDelta = Math.max(
        Math.abs(startX - event.clientX),
        Math.abs(startY - event.clientY),
      );
      if (totalDelta < axisLockPx) {
        suppressClick = false;
      }

      clearPointerDrag();
      snapAfterIdle();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return;
      if (
        event.target instanceof Element &&
        event.target.closest(SLIDER_POINTER_IGNORE_SELECTOR)
      ) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressClick = false;
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    window.addEventListener("click", onClickCapture, true);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("click", onClickCapture, true);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, [
    cancelSnapAnimation,
    clampScrollOffset,
    frameCount,
    getScrollOffset,
    reducedMotion,
    snapToIndex,
    syncScrollPosition,
    updateFromScroll,
  ]);

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
