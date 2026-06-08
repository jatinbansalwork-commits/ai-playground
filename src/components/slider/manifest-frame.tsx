"use client";

import { Fragment } from "react";
import { MANIFEST_LINES } from "@/lib/constants";
import { INDEX_SLIDE_MANIFEST } from "@/lib/index-typography";
import { FrameShell } from "@/components/slider/frame-shell";
import type { ManifestFrame } from "@/types";

interface ManifestFramePanelProps {
  frame: ManifestFrame;
  index: number;
  onInteract: () => void;
}

export function ManifestFramePanel({
  frame,
  index,
  onInteract,
}: ManifestFramePanelProps) {
  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      <div className="manifest-panel flex h-full items-center bg-[#6B36FF] p-[50px] text-white">
        <p data-size="medium" className={`text-[75px] ${INDEX_SLIDE_MANIFEST}`}>
          {MANIFEST_LINES.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </p>
      </div>
    </FrameShell>
  );
}
