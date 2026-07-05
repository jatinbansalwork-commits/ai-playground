"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  WORKSPACE_CONTENT_HEIGHT_PX,
  WORKSPACE_VIEWPORT,
} from "@/components/case-studies/policy-copilot/policy-copilot-momentum";

/** Scale a 1440px workspace embed to fit its container — shows the full UI without horizontal clipping. */
export function PolicyCopilotWorkspaceEmbedFit({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const update = () => {
      const width = host.getBoundingClientRect().width;
      if (width <= 0) return;
      setScale(Math.min(1, width / WORKSPACE_VIEWPORT.width));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const scaledHeight = Math.ceil(WORKSPACE_CONTENT_HEIGHT_PX * scale);

  return (
    <div ref={hostRef} className="w-full" style={{ height: scaledHeight }}>
      <div
        className="policy-copilot-embed-fit-inner"
        style={{
          width: WORKSPACE_VIEWPORT.width,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
