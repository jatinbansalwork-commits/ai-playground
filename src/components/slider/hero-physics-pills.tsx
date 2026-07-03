"use client";

import Matter from "matter-js";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
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
  friction: 0.85,
  frictionAir: 0.025,
  density: 0.002,
  restitution: 0.35,
  dragStrength: 0.32,
  throwStrength: 0.16,
  startY: 20,
  mobileScale: 0.72,
} as const;

const STATIC_LAYOUT: { left: string; top: string; rotate: string }[] = [
  { left: "58%", top: "10%", rotate: "-5deg" },
  { left: "42%", top: "20%", rotate: "2deg" },
  { left: "72%", top: "8%", rotate: "4deg" },
  { left: "50%", top: "34%", rotate: "-2deg" },
  { left: "66%", top: "28%", rotate: "3deg" },
  { left: "38%", top: "42%", rotate: "-4deg" },
  { left: "74%", top: "46%", rotate: "2deg" },
  { left: "54%", top: "56%", rotate: "-3deg" },
  { left: "44%", top: "62%", rotate: "1deg" },
  { left: "68%", top: "58%", rotate: "-2deg" },
  { left: "36%", top: "72%", rotate: "3deg" },
  { left: "58%", top: "68%", rotate: "-1deg" },
  { left: "78%", top: "74%", rotate: "4deg" },
];

interface HeroPhysicsPillsProps {
  className?: string;
  onInteract?: () => void;
}

function HeroPillGlyph({ icon }: { icon: HeroPillIconId }) {
  return <HeroPillIcon icon={icon} size={HERO_PILL_ICON_SIZE_PX} />;
}

function HeroPillSurface({
  pill,
  reducedMotion,
  layout,
  bodyRef,
}: {
  pill: HeroPillDefinition;
  reducedMotion: boolean;
  layout?: { left: string; top: string; rotate: string };
  bodyRef: (element: HTMLDivElement | null) => void;
}) {
  const padding = pill.iconOnly
    ? `${HERO_PILL_PADDING_ICON_PX}px`
    : `${HERO_PILL_PADDING_TEXT_Y_PX}px ${HERO_PILL_PADDING_TEXT_X_PX}px`;

  return (
    <div
      ref={bodyRef}
      className="hero-physics-pill absolute left-0 top-0 cursor-grab select-none"
      style={
        reducedMotion && layout
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
          minHeight: HERO_PILL_HEIGHT_PX,
          minWidth: pill.iconOnly ? HERO_PILL_HEIGHT_PX : pill.width,
          gap: HERO_PILL_GAP_PX,
          padding,
          borderRadius: 0,
          backgroundColor: pill.color,
          color: HERO_PILL_TEXT_COLOR,
          border: pill.bordered ? `1px solid ${HERO_PILL_BORDER_COLOR}` : undefined,
          boxSizing: "border-box",
        }}
      >
        {pill.label ? (
          <span className="font-mono text-[13px] font-normal uppercase leading-none">
            {pill.label}
          </span>
        ) : null}
        <HeroPillGlyph icon={pill.icon} />
      </div>
    </div>
  );
}

export function HeroPhysicsPills({ className, onInteract }: HeroPhysicsPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const onInteractRef = useRef(onInteract);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    onInteractRef.current = onInteract;
  }, [onInteract]);

  const pills = useMemo(() => HERO_PILLS, []);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const setup = () => {
      cleanup?.();
      if (disposed) return;

      const domToBody = new Map<Matter.Body, HTMLDivElement>();
      const bodySizes = new Map<Matter.Body, { width: number; height: number }>();
      let draggedBody: Matter.Body | null = null;
      let dragConstraint: Matter.Constraint | null = null;
      let pointerState = { x: 0, y: 0, time: 0, velocityX: 0, velocityY: 0 };
      let rafId: number | null = null;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width <= 0 || height <= 0) return;

      const mobileScale = width < 640 ? PHYSICS.mobileScale : 1;
      const { Engine, Runner, Bodies, Body, Composite, Constraint, Sleeping } = Matter;

      const engine = Engine.create();
      engine.gravity.y = PHYSICS.gravity;

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
      pills.forEach((pill, index) => {
        const el = pillRefs.current[index];
        let w = Math.max(el?.offsetWidth || pill.width, 24);
        let h = Math.max(el?.offsetHeight || HERO_PILL_HEIGHT_PX, 24);
        w *= mobileScale;
        h *= mobileScale;

        const minX = w / 2 + 20;
        const maxX = Math.max(width - w - 40, minX);
        const x = minX + Math.random() * (maxX - minX);
        const y = PHYSICS.startY + Math.random() * Math.max(height * 0.18, 40);

        const body = Bodies.rectangle(x, y, w, h, {
          restitution: PHYSICS.restitution,
          friction: PHYSICS.friction,
          frictionAir: PHYSICS.frictionAir,
          density: PHYSICS.density,
          angle: (Math.random() - 0.5) * 0.6,
        });

        bodies.push(body);
        if (el) {
          domToBody.set(body, el);
          bodySizes.set(body, { width: w, height: h });
          el.dataset.bodyIndex = String(index);
          if (mobileScale !== 1) {
            el.style.width = `${w}px`;
            el.style.height = `${h}px`;
          }
        }
      });

      Composite.add(engine.world, [...walls, ...bodies]);

      const pointerToLocal = (event: PointerEvent) => {
        const bounds = container.getBoundingClientRect();
        return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      };

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
          element.style.transform = "";
          element.style.width = "";
          element.style.height = "";
          element.style.cursor = "";
          delete element.dataset.bodyIndex;
        });
      };
    };

    setup();

    const observer = new ResizeObserver(() => setup());
    observer.observe(container);

    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [pills, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`hero-physics-pills pointer-events-auto absolute inset-0 overflow-hidden${className ? ` ${className}` : ""}`}
      style={{ touchAction: "pan-y" }}
      aria-hidden
    >
      {pills.map((pill, index) => (
        <HeroPillSurface
          key={pill.id}
          pill={pill}
          reducedMotion={reducedMotion}
          layout={STATIC_LAYOUT[index]}
          bodyRef={(element) => {
            pillRefs.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}
