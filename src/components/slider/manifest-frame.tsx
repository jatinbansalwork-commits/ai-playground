"use client";

import { MANIFEST_LINES } from "@/lib/constants";
import { INDEX_SLIDE_MANIFEST } from "@/lib/index-typography";
import { FrameShell } from "@/components/slider/frame-shell";
import { ScrambleText } from "@/components/ui/scramble-text";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ManifestFrame } from "@/types";

interface ManifestFramePanelProps {
  frame: ManifestFrame;
  index: number;
  onInteract: () => void;
}

const MANIFEST_WORDS = MANIFEST_LINES.join("\n");

function ManifestStaticText() {
  return (
    <p data-size="medium" className={INDEX_SLIDE_MANIFEST}>
      {MANIFEST_LINES.map((line, lineIndex) => (
        <span key={line}>
          {lineIndex > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </p>
  );
}

export function ManifestFramePanel({
  frame,
  index,
  onInteract,
}: ManifestFramePanelProps) {
  const mounted = useIsMounted();
  const reducedMotion = useReducedMotion();
  // ScrambleText only after mount — avoids SSR/client tree mismatch from
  // reduced-motion branching and Originkit's client-only layout measurements.
  const showScramble = mounted && !reducedMotion;

  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      <div className="manifest-panel flex h-full items-center bg-brand-accent p-6 text-brand-accent-foreground sm:p-[50px]">
        {showScramble ? (
          <ScrambleText
            words={MANIFEST_WORDS}
            tag="div"
            className={INDEX_SLIDE_MANIFEST}
            color="var(--brand-accent-foreground)"
            style={{ gap: 0 }}
            enterAnimation={{
              mode: "multiLine",
              scrambleIntensity: 50,
              replay: true,
              restState: "solid",
              ease: { type: "tween", duration: 1.6, ease: "easeOut" },
            }}
            hoverAnimation={{
              type: "diffusion",
              lines: "multiLine",
              radius: 2,
              collapse: true,
              collapseTime: 0.8,
            }}
          />
        ) : (
          <ManifestStaticText />
        )}
      </div>
    </FrameShell>
  );
}
