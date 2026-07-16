"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SITE_FONT_STACK } from "@/lib/fonts";

const CURSOR_COLOR = "#02BCEA";
const CURSOR_TEXT_COLOR = "#0A0A0A";
const CURSOR_SIZE = 31;
const CURSOR_LABEL = "I'm here";
const PRESS_SCALE = 0.92;
const LABEL_TILT_STRENGTH = 25;
const Z_INDEX = 9999;

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]:not([tabindex="-1"]), .cursor-pointer';

function isCoarsePointer(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function SiteCursor() {
  const reducedMotion = useReducedMotion();

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const lastSampleRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const arrowSpring = useMemo<SpringOptions>(
    () => ({ stiffness: 380, damping: 32, mass: 0.6 }),
    [],
  );
  const labelSpringCfg = useMemo<SpringOptions>(
    () => ({ stiffness: 220, damping: 26, mass: 0.7 }),
    [],
  );

  const labelOffset = useMemo(
    () => ({ x: CURSOR_SIZE * 0.9, y: CURSOR_SIZE * 0.2 + 6 }),
    [],
  );

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const arrowX = useSpring(mouseX, arrowSpring);
  const arrowY = useSpring(mouseY, arrowSpring);
  const labelX = useSpring(mouseX, labelSpringCfg);
  const labelY = useSpring(mouseY, labelSpringCfg);

  const scaleMV = useMotionValue(1);
  const labelTiltTarget = useMotionValue(0);
  const labelRotation = useSpring(labelTiltTarget, {
    stiffness: 200,
    damping: 24,
    mass: 0.6,
  });

  const labelTranslateX = useTransform(labelX, (v) => v + labelOffset.x);
  const labelTranslateY = useTransform(labelY, (v) => v + labelOffset.y);

  useEffect(() => {
    const target = pressed ? PRESS_SCALE : hoveringInteractive ? 1.08 : 1;
    const controls = animate(scaleMV, target, {
      type: "spring",
      stiffness: 500,
      damping: 28,
      mass: 0.5,
    });
    return () => controls.stop();
  }, [pressed, hoveringInteractive, scaleMV]);

  useEffect(() => {
    if (reducedMotion || isCoarsePointer()) {
      document.documentElement.classList.remove("site-custom-cursor");
      setEnabled(false);
      setVisible(false);
      return;
    }

    const root = document.documentElement;
    root.classList.add("site-custom-cursor");
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const last = lastSampleRef.current;
      let vx = 0;
      let vy = 0;
      if (last) {
        const dt = Math.max(1, now - last.t);
        vx = ((x - last.x) / dt) * 1000;
        vy = ((y - last.y) / dt) * 1000;
      }
      lastSampleRef.current = { x, y, t: now };

      mouseX.set(x);
      mouseY.set(y);

      const speed = Math.hypot(vx, vy);
      const norm = Math.min(1, speed / 1500);
      const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1;
      labelTiltTarget.set(sign * norm * LABEL_TILT_STRENGTH);

      setVisible(true);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setHoveringInteractive(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const onLeave = () => {
      setVisible(false);
      setPressed(false);
      lastSampleRef.current = null;
      labelTiltTarget.set(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      root.classList.remove("site-custom-cursor");
      setEnabled(false);
      setVisible(false);
      setPressed(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, mouseX, mouseY, labelTiltTarget]);

  if (!enabled) return null;

  return (
    <div
      className="site-cursor-layer"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: Z_INDEX,
      }}
      aria-hidden
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x: labelTranslateX,
          y: labelTranslateY,
          rotate: labelRotation,
          scale: scaleMV,
          background: CURSOR_COLOR,
          borderRadius: 999,
          padding: `${CURSOR_SIZE * 0.18}px ${CURSOR_SIZE * 0.36}px`,
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
          opacity: visible ? 1 : 0,
          transformOrigin: "0% 50%",
          transition: "opacity 140ms ease",
          willChange: "transform, opacity",
          userSelect: "none",
        }}
      >
        <span
          style={{
            color: CURSOR_TEXT_COLOR,
            fontSize: Math.max(7, CURSOR_SIZE * 0.43),
            lineHeight: 1.1,
            fontWeight: 600,
            fontFamily: SITE_FONT_STACK,
            whiteSpace: "nowrap",
            letterSpacing: 0.1,
          }}
        >
          {CURSOR_LABEL}
        </span>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x: arrowX,
          y: arrowY,
          scale: scaleMV,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          opacity: visible ? 1 : 0,
          transformOrigin: "0% 0%",
          transition: "opacity 140ms ease",
          willChange: "transform, opacity",
        }}
      >
        <svg
          width={CURSOR_SIZE}
          height={CURSOR_SIZE}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", overflow: "visible" }}
        >
          <path
            d="M5 3 L23 14 L14 16 L11 24 Z"
            fill={CURSOR_COLOR}
            stroke="rgba(0,0,0,0.18)"
            strokeWidth={0.6}
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
