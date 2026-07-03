"use client";

import { useEffect, useRef } from "react";
import { useWireframe } from "@/context/wireframe-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  createSeededRandom,
  getViewportPixelCount,
  INDEX_FLOATING_PIXEL_BASE_SIZE,
  INDEX_FLOATING_PIXEL_COLORS,
  INDEX_FLOATING_PIXEL_REPULSION_FORCE,
  INDEX_FLOATING_PIXEL_REPULSION_RADIUS,
  INDEX_FLOATING_PIXEL_SPEED,
} from "@/lib/index-floating-pixels";

interface PixelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

const VIEWPORT_SEED = 0x6d5a3c21;

function spawnParticle(
  width: number,
  height: number,
  rand: () => number,
  fromCenter = false,
): PixelParticle {
  const speed = INDEX_FLOATING_PIXEL_SPEED;
  const color =
    INDEX_FLOATING_PIXEL_COLORS[
      Math.floor(rand() * INDEX_FLOATING_PIXEL_COLORS.length)
    ] ?? INDEX_FLOATING_PIXEL_COLORS[0];
  const size = INDEX_FLOATING_PIXEL_BASE_SIZE + rand() * 2;

  if (fromCenter) {
    const burst = rand() * 300;
    const vx = (rand() > 0.5 ? 1 : -1) * (rand() * speed + speed * 0.2);
    const vy = (rand() - 0.5) * speed * 0.8;
    return {
      x: width / 2 + vx * burst,
      y: height / 2 + vy * burst,
      vx,
      vy,
      color,
      size,
    };
  }

  const edge = Math.floor(rand() * 4);
  let x = rand() * width;
  let y = rand() * height;
  let vx = (rand() - 0.5) * speed * 0.6;
  let vy = (rand() - 0.5) * speed * 0.6;

  if (edge === 0) {
    x = -20;
    vx = rand() * speed + speed * 0.2;
  } else if (edge === 1) {
    x = width + 20;
    vx = -(rand() * speed + speed * 0.2);
  } else if (edge === 2) {
    y = -20;
    vy = rand() * speed + speed * 0.2;
  } else {
    y = height + 20;
    vy = -(rand() * speed + speed * 0.2);
  }

  return { x, y, vx, vy, color, size };
}

/** Full-viewport floating pixel field behind the index slider (Mosaic.select style). */
export function IndexFloatingPixels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<PixelParticle[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const { wireframe } = useWireframe();

  useEffect(() => {
    if (wireframe) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rand = createSeededRandom(VIEWPORT_SEED);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return { width: 0, height: 0 };

      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      return { width, height };
    };

    const resetParticles = (width: number, height: number) => {
      const count = getViewportPixelCount(width, height);
      particlesRef.current = Array.from({ length: count }, () =>
        spawnParticle(width, height, rand, true),
      );
    };

    let { width, height } = resize();
    if (width === 0 || height === 0) return;
    resetParticles(width, height);

    const drawStatic = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particlesRef.current) {
        context.fillStyle = particle.color;
        context.fillRect(
          particle.x - particle.size / 2,
          particle.y - particle.size / 2,
          particle.size,
          particle.size,
        );
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    if (reducedMotion) {
      drawStatic();
      const observer = new ResizeObserver(() => {
        const size = resize();
        if (!size.width || !size.height) return;
        width = size.width;
        height = size.height;
        resetParticles(width, height);
        drawStatic();
      });
      observer.observe(container);
      return () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
      };
    }

    const tick = () => {
      context.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.map((particle) => {
        let next = { ...particle };
        const dx = next.x - pointerRef.current.x;
        const dy = next.y - pointerRef.current.y;
        const distance = Math.hypot(dx, dy);

        if (distance < INDEX_FLOATING_PIXEL_REPULSION_RADIUS && distance > 0) {
          const force =
            ((INDEX_FLOATING_PIXEL_REPULSION_RADIUS - distance) /
              INDEX_FLOATING_PIXEL_REPULSION_RADIUS) *
            INDEX_FLOATING_PIXEL_REPULSION_FORCE;
          next.vx += (dx / distance) * force;
          next.vy += (dy / distance) * force;
        }

        next.x += next.vx;
        next.y += next.vy;

        if (
          next.x < -100 ||
          next.x > width + 100 ||
          next.y < -100 ||
          next.y > height + 100
        ) {
          next = spawnParticle(width, height, rand);
        }

        context.fillStyle = next.color;
        context.fillRect(
          next.x - next.size / 2,
          next.y - next.size / 2,
          next.size,
          next.size,
        );

        return next;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    tick();

    const observer = new ResizeObserver(() => {
      const size = resize();
      if (!size.width || !size.height) return;
      width = size.width;
      height = size.height;
      resetParticles(width, height);
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion, wireframe]);

  if (wireframe) return null;

  return (
    <div
      ref={containerRef}
      className="index-floating-pixels pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
