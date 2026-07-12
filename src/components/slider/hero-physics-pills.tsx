"use client";

import type Matter from "matter-js";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  HeroPillIcon,
  type HeroPillIconId,
} from "@/components/slider/hero-pill-icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  HERO_PILL_BORDER_COLOR,
  HERO_PILL_GAP_PX,
  HERO_PILL_HEIGHT_PX,
  HERO_PILL_ICON_SIZE_PX,
  HERO_PILL_PADDING_ICON_PX,
  HERO_PILL_PADDING_TEXT_X_PX,
  HERO_PILL_PADDING_TEXT_Y_PX,
  HERO_PILL_TEXT_COLOR,
  HERO_PILLS,
  type HeroPillDefinition,
} from "@/lib/hero-pills-data";

const PHYSICS = {
  gravity: 1,
  mobileGravity: 0.9,
  friction: 0.85,
  frictionAir: 0.028,
  mobileFrictionAir: 0.04,
  density: 0.002,
  restitution: 0.35,
  dragStrength: 0.32,
  throwStrength: 0.16,
  /** All pills release together — copy and pile move as one beat. */
  spawnStaggerMs: 0,
  spawnJitterMs: 0,
  /** Global pill size vs design tokens (1.44 = 20% above the 1.2 display scale). */
  sizeScale: 1.44,
  /** Scale pills when the physics container is narrow (tablet / laptop). */
  compactScale: 0.72,
  compactScaleBreakpoint: 640,
  /** Debounce resize / font reflow before rebuilding the Matter world. */
  setupDebounceMs: 48,
} as const;

/** Viewports below iPad width — lighter Matter.js (still draggable). */
const MOBILE_LAYOUT_MEDIA = "(max-width: 767px)";

/** Static pile along the bottom edge of the hero sheet (mobile + reduced motion). */
const BOTTOM_SHEET_LAYOUT: { left: string; top: string; rotate: string }[] = [
  { left: "3%", top: "70%", rotate: "-3deg" },
  { left: "26%", top: "68%", rotate: "2deg" },
  { left: "52%", top: "72%", rotate: "-4deg" },
  { left: "72%", top: "70%", rotate: "3deg" },
  { left: "8%", top: "78%", rotate: "4deg" },
  { left: "34%", top: "76%", rotate: "-2deg" },
  { left: "58%", top: "80%", rotate: "3deg" },
  { left: "78%", top: "78%", rotate: "-3deg" },
  { left: "4%", top: "86%", rotate: "2deg" },
  { left: "30%", top: "84%", rotate: "-4deg" },
  { left: "54%", top: "88%", rotate: "3deg" },
  { left: "74%", top: "86%", rotate: "-2deg" },
  { left: "40%", top: "92%", rotate: "1deg" },
];

type MatterModule = typeof Matter;

let matterModulePromise: Promise<MatterModule> | null = null;

function loadMatterModule(): Promise<MatterModule> {
  matterModulePromise ??= import("matter-js");
  return matterModulePromise;
}

interface HeroPhysicsPillsProps {
  className?: string;
  onInteract?: () => void;
  entranceEnabled?: boolean;
}

function HeroPillGlyph({ icon, size }: { icon: HeroPillIconId; size: number }) {
  return <HeroPillIcon icon={icon} size={size} />;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function seededUnit(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function getPillLayoutScale(containerWidth: number, isMobileLayout: boolean): number {
  if (isMobileLayout) return PHYSICS.compactScale;
  return containerWidth < PHYSICS.compactScaleBreakpoint ? PHYSICS.compactScale : 1;
}

function measurePillZoneMinY(container: HTMLElement, height: number): number {
  const headlineEl = container.parentElement?.querySelector<HTMLElement>(
    ".index-slide-hero-copy h1",
  );
  let pillZoneMinY = Math.round(height * 0.48);
  if (headlineEl) {
    const headlineBottomLocal = headlineEl.offsetTop + headlineEl.offsetHeight;
    pillZoneMinY = Math.min(
      height - 48,
      Math.max(pillZoneMinY, Math.round(headlineBottomLocal + 28)),
    );
  }
  return pillZoneMinY;
}

function getContainerLayoutSize(container: HTMLElement): { width: number; height: number } {
  return {
    width: container.offsetWidth,
    height: container.offsetHeight,
  };
}

function pointerToContainerLocal(container: HTMLElement, event: PointerEvent) {
  const bounds = container.getBoundingClientRect();
  const scaleX = container.offsetWidth / bounds.width;
  const scaleY = container.offsetHeight / bounds.height;
  return {
    x: (event.clientX - bounds.left) * scaleX,
    y: (event.clientY - bounds.top) * scaleY,
  };
}

function getZoneLayoutScale(pillZoneHeight: number, baseScale: number): number {
  const zoneScale = clamp(pillZoneHeight / 200, 0.5, 1);
  return baseScale * zoneScale;
}

function getSpawnPosition(
  index: number,
  total: number,
  width: number,
  bodyW: number,
  bodyH: number,
): { x: number; y: number; angle: number } {
  const minX = bodyW / 2 + 16;
  const maxX = Math.max(width - bodyW / 2 - 16, minX);
  const lane = total <= 1 ? 0.5 : index / (total - 1);
  const x =
    minX +
    lane * (maxX - minX) +
    (seededUnit(index, 1) - 0.5) * 36;

  const column = index % 5;
  const row = Math.floor(index / 5);
  const y =
    8 +
    column * (bodyH * 0.42 + 12) +
    row * (bodyH + 26) +
    seededUnit(index, 2) * 20;

  return {
    x: clamp(x, minX, maxX),
    y,
    angle: (seededUnit(index, 3) - 0.5) * 0.5,
  };
}

function getPillDimensions(
  pill: HeroPillDefinition,
  element: HTMLDivElement | null,
  layoutScale: number,
): { width: number; height: number } {
  const height = Math.max(
    element?.offsetHeight ?? 0,
    HERO_PILL_HEIGHT_PX * layoutScale * PHYSICS.sizeScale,
    24,
  );
  const width = Math.max(
    element?.offsetWidth ?? 0,
    (pill.iconOnly ? HERO_PILL_HEIGHT_PX : pill.width) * layoutScale * PHYSICS.sizeScale,
    24,
  );
  return { width, height };
}

function applyPreviewTransforms(
  container: HTMLElement,
  pills: readonly HeroPillDefinition[],
  pillRefs: { current: (HTMLDivElement | null)[] },
  layoutScale: number,
) {
  const { width, height } = getContainerLayoutSize(container);
  if (width <= 0 || height <= 0) return;

  pills.forEach((pill, index) => {
    const element = pillRefs.current[index];
    if (!element) return;

    const { width: bodyW, height: bodyH } = getPillDimensions(pill, element, layoutScale);
    const spawn = getSpawnPosition(index, pills.length, width, bodyW, bodyH);

    element.style.transform = `translate3d(${spawn.x - bodyW / 2}px, ${spawn.y - bodyH / 2}px, 0) rotate(${spawn.angle}rad)`;
    element.style.cursor = "grab";
  });
}

function HeroPillSurface({
  pill,
  isStatic,
  layout,
  layoutScale,
  bodyRef,
}: {
  pill: HeroPillDefinition;
  isStatic: boolean;
  layout?: { left: string; top: string; rotate: string };
  layoutScale: number;
  bodyRef: (element: HTMLDivElement | null) => void;
}) {
  const height = HERO_PILL_HEIGHT_PX * layoutScale * PHYSICS.sizeScale;
  const width =
    (pill.iconOnly ? HERO_PILL_HEIGHT_PX : pill.width) * layoutScale * PHYSICS.sizeScale;
  const padding = pill.iconOnly
    ? `${HERO_PILL_PADDING_ICON_PX * layoutScale * PHYSICS.sizeScale}px`
    : `${HERO_PILL_PADDING_TEXT_Y_PX * layoutScale * PHYSICS.sizeScale}px ${HERO_PILL_PADDING_TEXT_X_PX * layoutScale * PHYSICS.sizeScale}px`;
  const iconSize = Math.max(
    12,
    Math.round(HERO_PILL_ICON_SIZE_PX * layoutScale * PHYSICS.sizeScale),
  );
  const fontSize = Math.max(10, Math.round(13 * layoutScale * PHYSICS.sizeScale));

  return (
    <div
      ref={bodyRef}
      className={[
        "hero-physics-pill absolute left-0 top-0 select-none",
        isStatic
          ? "pointer-events-none touch-auto"
          : "hero-physics-pill-draggable cursor-grab touch-none",
      ].join(" ")}
      style={
        isStatic && layout
          ? {
              left: layout.left,
              top: layout.top,
              transform: `rotate(${layout.rotate})`,
            }
          : { willChange: "transform" }
      }
    >
      <div
        className="relative inline-flex items-center justify-center whitespace-nowrap"
        style={{
          minHeight: height,
          minWidth: width,
          gap: HERO_PILL_GAP_PX * layoutScale * PHYSICS.sizeScale,
          padding,
          borderRadius: 0,
          backgroundColor: pill.color,
          color: HERO_PILL_TEXT_COLOR,
          border: pill.bordered ? `1px solid ${HERO_PILL_BORDER_COLOR}` : undefined,
          boxSizing: "border-box",
        }}
      >
        {pill.label ? (
          <span
            className="font-mono font-normal uppercase leading-none"
            style={{ fontSize }}
          >
            {pill.label}
          </span>
        ) : null}
        <HeroPillGlyph icon={pill.icon} size={iconSize} />
      </div>
    </div>
  );
}

export function HeroPhysicsPills({
  className,
  onInteract,
  entranceEnabled = true,
}: HeroPhysicsPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const onInteractRef = useRef(onInteract);
  const reducedMotion = useReducedMotion();
  const [layoutScale, setLayoutScale] = useState(1);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const layoutScaleRef = useRef(1);
  const scheduleSetupRef = useRef<(() => void) | null>(null);
  const activeLayoutKeyRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    layoutScaleRef.current = layoutScale;
  }, [layoutScale]);

  useLayoutEffect(() => {
    onInteractRef.current = onInteract;
  }, [onInteract]);

  const pills = useMemo(() => HERO_PILLS, []);

  useLayoutEffect(() => {
    const media = window.matchMedia(MOBILE_LAYOUT_MEDIA);
    const updateMobile = () => setIsMobileLayout(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);
    return () => media.removeEventListener("change", updateMobile);
  }, []);

  const useStaticPills = reducedMotion || !entranceEnabled;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const measure = () => {
      const { width, height } = getContainerLayoutSize(container);
      if (width <= 0 || height <= 0) return;

      const mobile = window.matchMedia(MOBILE_LAYOUT_MEDIA).matches;
      if (mobile) {
        const nextScale = getPillLayoutScale(width, true);
        if (Math.abs(nextScale - layoutScaleRef.current) > 0.02) {
          setLayoutScale(nextScale);
        }
        return;
      }

      const pillZoneMinY = measurePillZoneMinY(container, height);
      const zoneHeight = height - pillZoneMinY - 24;
      const baseScale = getPillLayoutScale(width, false);
      const nextScale = getZoneLayoutScale(zoneHeight, baseScale);
      if (Math.abs(nextScale - layoutScaleRef.current) > 0.02) {
        setLayoutScale(nextScale);
      }
    };

    measure();
    const observer = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 160);
    });
    observer.observe(container);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (useStaticPills) return;

    const container = containerRef.current;
    if (!container) return;

    applyPreviewTransforms(container, pills, pillRefs, layoutScale);
  }, [layoutScale, pills, useStaticPills]);

  useEffect(() => {
    if (useStaticPills) return;

    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let matterApi: MatterModule | null = null;
    let cleanup: (() => void) | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleSetup = (immediate = false) => {
      if (resizeTimer) clearTimeout(resizeTimer);
      const run = () => requestAnimationFrame(() => scheduleSetupRef.current?.());
      if (immediate) {
        run();
        return;
      }
      resizeTimer = setTimeout(run, PHYSICS.setupDebounceMs);
    };

    const setup = () => {
      if (disposed || !matterApi) return;

      const { Engine, Runner, Bodies, Body, Composite, Constraint, Sleeping } = matterApi;

      const { width, height } = getContainerLayoutSize(container);
      if (width <= 0 || height <= 0) return;

      const layoutKey = `${width}x${height}@${layoutScaleRef.current.toFixed(3)}`;
      if (activeLayoutKeyRef.current === layoutKey && cleanup) return;

      const pillsReady = pills.every(
        (_, index) => (pillRefs.current[index]?.offsetWidth ?? 0) > 0,
      );
      if (!pillsReady) {
        scheduleSetup(true);
        return;
      }

      cleanup?.();
      activeLayoutKeyRef.current = layoutKey;

      const domToBody = new Map<Matter.Body, HTMLDivElement>();
      const bodySizes = new Map<Matter.Body, { width: number; height: number }>();
      let draggedBody: Matter.Body | null = null;
      let dragConstraint: Matter.Constraint | null = null;
      let pointerState = { x: 0, y: 0, time: 0, velocityX: 0, velocityY: 0 };
      let rafId: number | null = null;

      const mobileLayout = window.matchMedia(MOBILE_LAYOUT_MEDIA).matches;

      const engine = Engine.create();
      engine.gravity.y = mobileLayout ? PHYSICS.mobileGravity : PHYSICS.gravity;

      const runner = Runner.create();
      const thickness = 80;
      const walls = [
        Bodies.rectangle(width / 2, height + thickness / 2, width + 160, thickness, {
          isStatic: true,
        }),
        Bodies.rectangle(width / 2, -thickness / 2, width + 160, thickness, {
          isStatic: true,
        }),
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, {
          isStatic: true,
        }),
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, {
          isStatic: true,
        }),
      ];

      const bodies: Matter.Body[] = [];
      const spawnTimers: number[] = [];

      pills.forEach((pill, index) => {
        const element = pillRefs.current[index];
        const { width: bodyW, height: bodyH } = getPillDimensions(
          pill,
          element,
          layoutScaleRef.current,
        );
        const spawn = getSpawnPosition(index, pills.length, width, bodyW, bodyH);

        const addBody = () => {
          if (disposed) return;

          const body = Bodies.rectangle(spawn.x, spawn.y, bodyW, bodyH, {
            restitution: PHYSICS.restitution,
            friction: PHYSICS.friction,
            frictionAir: mobileLayout ? PHYSICS.mobileFrictionAir : PHYSICS.frictionAir,
            density: PHYSICS.density,
            angle: spawn.angle,
          });

          Body.setVelocity(body, {
            x: (seededUnit(index, 4) - 0.5) * 1.2,
            y: 1.8 + seededUnit(index, 5) * 1.4,
          });

          bodies.push(body);
          Composite.add(engine.world, body);

          if (element) {
            domToBody.set(body, element);
            bodySizes.set(body, { width: bodyW, height: bodyH });
            element.dataset.bodyIndex = String(index);
            element.style.cursor = "grab";
          }
        };

        const delay =
          index * PHYSICS.spawnStaggerMs + seededUnit(index, 6) * PHYSICS.spawnJitterMs;
        if (delay < 16) {
          addBody();
        } else {
          spawnTimers.push(window.setTimeout(addBody, delay));
        }
      });

      Composite.add(engine.world, walls);

      const pointerToLocal = (event: PointerEvent) =>
        pointerToContainerLocal(container, event);

      const bodyForElement = (element: Element) => {
        const index = Number((element as HTMLElement).dataset.bodyIndex);
        return bodies[index] ?? null;
      };

      const onPointerDown = (event: PointerEvent) => {
        const target = (event.target as Element).closest("[data-body-index]");
        if (!target) return;

        const body = bodyForElement(target);
        if (!body) return;

        event.preventDefault();
        event.stopPropagation();
        onInteractRef.current?.();

        const position = pointerToLocal(event);
        draggedBody = body;
        pointerState = {
          x: position.x,
          y: position.y,
          time: performance.now(),
          velocityX: 0,
          velocityY: 0,
        };
        Sleeping.set(body, false);

        dragConstraint = Constraint.create({
          bodyA: body,
          pointB: position,
          stiffness: PHYSICS.dragStrength,
          damping: 0.08,
          length: 0,
        });
        Composite.add(engine.world, dragConstraint);
        (target as HTMLElement).style.cursor = "grabbing";

        try {
          (target as HTMLElement).setPointerCapture(event.pointerId);
        } catch {
          // Pointer capture is optional.
        }
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!draggedBody || !dragConstraint) return;

        event.preventDefault();
        const position = pointerToLocal(event);
        const now = performance.now();
        const delta = Math.max(now - pointerState.time, 16);
        const velocityX = ((position.x - pointerState.x) / delta) * 16;
        const velocityY = ((position.y - pointerState.y) / delta) * 16;

        pointerState = {
          x: position.x,
          y: position.y,
          time: now,
          velocityX,
          velocityY,
        };
        dragConstraint.pointB = position;
        Body.setAngularVelocity(draggedBody, velocityX * 0.008);
        Sleeping.set(draggedBody, false);
      };

      const onPointerUp = () => {
        if (!draggedBody || !dragConstraint) return;

        Composite.remove(engine.world, dragConstraint);
        dragConstraint = null;

        const body = draggedBody;
        draggedBody = null;
        Body.setVelocity(body, {
          x: pointerState.velocityX * PHYSICS.throwStrength,
          y: pointerState.velocityY * PHYSICS.throwStrength,
        });
        Sleeping.set(body, false);

        const element = domToBody.get(body);
        if (element) element.style.cursor = "grab";
      };

      container.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);

      const syncDom = () => {
        if (disposed) return;

        domToBody.forEach((element, body) => {
          const size = bodySizes.get(body);
          if (!size) return;

          element.style.transform = `translate3d(${body.position.x - size.width / 2}px, ${body.position.y - size.height / 2}px, 0) rotate(${body.angle}rad)`;
        });
        rafId = requestAnimationFrame(syncDom);
      };

      Runner.run(runner, engine);
      rafId = requestAnimationFrame(syncDom);

      cleanup = () => {
        spawnTimers.forEach((timer) => window.clearTimeout(timer));
        container.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);

        if (rafId !== null) cancelAnimationFrame(rafId);

        Runner.stop(runner);
        Engine.clear(engine);
        draggedBody = null;
        dragConstraint = null;
        domToBody.clear();
        bodySizes.clear();

        pillRefs.current.forEach((element) => {
          if (!element) return;
          delete element.dataset.bodyIndex;
        });

        applyPreviewTransforms(container, pills, pillRefs, layoutScaleRef.current);
      };
    };

    void loadMatterModule().then((module) => {
      if (disposed) return;
      matterApi = module;
      scheduleSetupRef.current = setup;
      applyPreviewTransforms(container, pills, pillRefs, layoutScaleRef.current);
      scheduleSetup(true);
    });

    const observer = new ResizeObserver(() => scheduleSetup());
    observer.observe(container);

    const headlineEl = container.parentElement?.querySelector(
      ".index-slide-hero-copy h1",
    );
    const fontObserver =
      headlineEl && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => scheduleSetup())
        : null;
    if (headlineEl && fontObserver) fontObserver.observe(headlineEl);

    void document.fonts.ready.then(() => {
      if (!disposed) scheduleSetup();
    });

    return () => {
      disposed = true;
      scheduleSetupRef.current = null;
      activeLayoutKeyRef.current = null;
      if (resizeTimer) clearTimeout(resizeTimer);
      observer.disconnect();
      fontObserver?.disconnect();
      cleanup?.();
    };
  }, [entranceEnabled, isMobileLayout, pills, useStaticPills]);

  useLayoutEffect(() => {
    if (useStaticPills) return;
    const id = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      applyPreviewTransforms(container, pills, pillRefs, layoutScale);
      scheduleSetupRef.current?.();
    });
    return () => cancelAnimationFrame(id);
  }, [isMobileLayout, layoutScale, pills, useStaticPills]);

  return (
    <div
      ref={containerRef}
      className={[
        "hero-physics-pills",
        useStaticPills ? "pointer-events-none overflow-hidden" : "pointer-events-auto overflow-hidden",
        useStaticPills ? "absolute inset-0" : "absolute inset-x-0 -top-36 bottom-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={useStaticPills ? undefined : { touchAction: "none" }}
      aria-hidden
    >
      {pills.map((pill, index) => (
        <HeroPillSurface
          key={pill.id}
          pill={pill}
          isStatic={useStaticPills}
          layout={useStaticPills ? BOTTOM_SHEET_LAYOUT[index] : undefined}
          layoutScale={layoutScale}
          bodyRef={(element) => {
            pillRefs.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}
