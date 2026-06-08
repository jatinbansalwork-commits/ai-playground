"use client";

import { useCallback, useState } from "react";
import type { MeIntroConfig } from "@/lib/me-intro";
import { ME_INTRO_CONFIG } from "@/lib/me-intro";
import { MeIntroModal } from "@/components/me/me-intro-modal";
import { MeIntroPreview } from "@/components/me/me-intro-preview";

interface MeIntroVideoProps {
  config?: MeIntroConfig;
  variant?: "frame" | "page";
}

export function MeIntroVideo({
  config = ME_INTRO_CONFIG,
  variant = "frame",
}: MeIntroVideoProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <MeIntroPreview
        config={config}
        variant={variant}
        hidden={open}
        onOpen={handleOpen}
      />
      <MeIntroModal open={open} config={config} onClose={handleClose} />
    </>
  );
}
