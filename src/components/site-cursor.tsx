"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]:not([tabindex="-1"]), .cursor-pointer';

function isCoarsePointer(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function SiteCursor() {
  const reducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reducedMotion || isCoarsePointer()) {
      setEnabled(false);
      return;
    }

    const root = document.documentElement;
    root.classList.add("site-custom-cursor");
    setEnabled(true);

    const moveCursor = (clientX: number, clientY: number) => {
      const node = cursorRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
    };

    const onMouseMove = (event: MouseEvent) => {
      moveCursor(event.clientX, event.clientY);
      setVisible(true);
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      root.classList.remove("site-custom-cursor");
      setEnabled(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`site-cursor${visible ? " site-cursor--visible" : ""}${
        hovering ? " site-cursor--hover" : ""
      }`}
      aria-hidden
    />
  );
}
