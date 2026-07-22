"use client";

/**
 * Adapted from OriginKit Emoji Burst
 * https://www.originkit.dev/components/emojiburst
 *
 * Particle layer portals to document.body so parent overflow / rounded
 * cards cannot clip the burst.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface Particle {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  life: number;
}

export interface EmojiBurstButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  /** When false, click behaves normally with no particles. */
  burstEnabled?: boolean;
  emojis?: string;
  burstCount?: number;
  power?: number;
  spread?: number;
  gravity?: number;
  emojiSize?: number;
  shakeIntensity?: number;
  /** Device vibration pattern in ms (ignored when unsupported). */
  hapticPattern?: number | number[];
}

function triggerHaptic(pattern: number | number[]): void {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }
  try {
    navigator.vibrate(pattern);
  } catch {
    // Some browsers expose vibrate but reject it.
  }
}

export function EmojiBurstButton({
  children,
  burstEnabled = true,
  emojis = "🎉,✨,🔓,🥳,⭐,💥,😄,🎊",
  burstCount = 14,
  power = 11,
  spread = 55,
  gravity = 4,
  emojiSize = 18,
  shakeIntensity = 8,
  hapticPattern = [24, 36, 24],
  className,
  disabled,
  onPointerDown,
  ...buttonProps
}: EmojiBurstButtonProps) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLButtonElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const [portalReady, setPortalReady] = useState(false);

  const gravityVal = gravity * 0.15;

  const cfgRef = useRef({
    emojis,
    burstCount,
    power,
    spread,
    gravity: gravityVal,
    emojiSize,
    shakeIntensity,
    hapticPattern,
  });
  cfgRef.current = {
    emojis,
    burstCount,
    power,
    spread,
    gravity: gravityVal,
    emojiSize,
    shakeIntensity,
    hapticPattern,
  };

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const step = useCallback((ts: number) => {
    const arr = particlesRef.current;
    const cfg = cfgRef.current;

    let dt = lastTsRef.current ? (ts - lastTsRef.current) / 16.6667 : 1;
    lastTsRef.current = ts;
    if (dt > 3) dt = 3;

    const W = typeof window !== "undefined" ? window.innerWidth : 0;
    const H = typeof window !== "undefined" ? window.innerHeight : 0;

    for (let i = arr.length - 1; i >= 0; i--) {
      const p = arr[i];
      p.vy += cfg.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      p.life -= dt;

      if (
        p.life <= 0 ||
        p.y > H + p.size * 2.5 ||
        p.x < -p.size * 3 ||
        p.x > W + p.size * 3
      ) {
        p.el.remove();
        arr.splice(i, 1);
        continue;
      }

      const fade = p.life < 22 ? Math.max(0, p.life / 22) : 1;
      p.el.style.opacity = String(fade);
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    }

    if (arr.length > 0) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      rafRef.current = 0;
      lastTsRef.current = 0;
    }
  }, []);

  const burst = useCallback(() => {
    if (typeof window === "undefined") return;
    const layer = layerRef.current;
    const obj = objectRef.current;
    if (!layer || !obj) return;

    const cfg = cfgRef.current;
    const list = cfg.emojis
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const safe = list.length ? list : ["🎉"];

    const or = obj.getBoundingClientRect();
    const ox = or.left + or.width / 2;
    const oy = or.top + or.height / 2;

    triggerHaptic(cfg.hapticPattern);

    if (typeof obj.animate === "function" && cfg.shakeIntensity > 0) {
      const s = cfg.shakeIntensity;
      const duration = Math.min(520, 220 + s * 18);
      obj.animate(
        [
          { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          {
            transform: `translate(${s * 1.2}px, ${-s * 0.8}px) rotate(-4deg) scale(1.04)`,
          },
          {
            transform: `translate(${-s * 1.1}px, ${s * 0.5}px) rotate(5deg) scale(0.97)`,
          },
          {
            transform: `translate(${s * 0.9}px, ${-s * 0.3}px) rotate(-3deg) scale(1.06)`,
          },
          {
            transform: `translate(${-s * 0.6}px, ${s * 0.4}px) rotate(3deg) scale(0.98)`,
          },
          {
            transform: `translate(${s * 0.35}px, ${-s * 0.15}px) rotate(-1.5deg) scale(1.03)`,
          },
          { transform: "translate(0, 0) rotate(0deg) scale(1)" },
        ],
        { duration, easing: "cubic-bezier(.36,.07,.19,.97)" },
      );
    }

    const arr = particlesRef.current;
    const MAX = 140;
    const size = cfg.emojiSize;

    for (let k = 0; k < cfg.burstCount; k++) {
      if (arr.length >= MAX) break;
      const el = document.createElement("span");
      el.textContent = safe[(Math.random() * safe.length) | 0];
      el.style.position = "absolute";
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.fontSize = `${size}px`;
      el.style.lineHeight = "1";
      el.style.willChange = "transform, opacity";
      el.style.pointerEvents = "none";
      el.style.userSelect = "none";
      el.setAttribute("aria-hidden", "true");
      layer.appendChild(el);

      const ang =
        ((-90 + (Math.random() * 2 - 1) * cfg.spread) * Math.PI) / 180;
      const speed = cfg.power * (0.65 + Math.random() * 0.8);
      arr.push({
        el,
        x: ox - size / 2,
        y: oy - size / 2,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        rot: Math.random() * 360,
        vrot: (Math.random() * 2 - 1) * (12 + cfg.shakeIntensity),
        size,
        life: 220 + cfg.shakeIntensity * 8,
      });
    }

    if (!rafRef.current) {
      lastTsRef.current = 0;
      rafRef.current = requestAnimationFrame(step);
    }
  }, [step]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      for (const p of particlesRef.current) p.el.remove();
      particlesRef.current = [];
    };
  }, []);

  return (
    <div className="relative mt-5 w-full">
      {portalReady
        ? createPortal(
            <div
              ref={layerRef}
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[9999] overflow-visible"
            />,
            document.body,
          )
        : null}
      <button
        ref={objectRef}
        disabled={disabled}
        className={className}
        {...buttonProps}
        onPointerDown={(event) => {
          if (burstEnabled && !disabled) burst();
          onPointerDown?.(event);
        }}
      >
        {children}
      </button>
    </div>
  );
}
