"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { MeIntroConfig } from "@/lib/me-intro";
import { EXPERIMENTS_CARD } from "@/lib/experiments-bento";
import { springSnappy } from "@/lib/spring";

interface MeIntroModalProps {
  open: boolean;
  config: MeIntroConfig;
  onClose: () => void;
}

export function MeIntroModal({ open, config, onClose }: MeIntroModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mounted = typeof document !== "undefined";

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!open) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.muted = false;
    void video.play().catch(() => undefined);
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={springSnappy}
          role="dialog"
          aria-modal="true"
          aria-label={config.alt}
        >
          <button
            type="button"
            aria-label="Close introduction video"
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            className={`relative z-10 w-full max-w-md p-2 ${EXPERIMENTS_CARD.shell}`}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={springSnappy}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-lg leading-none text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              onClick={onClose}
            >
              ×
            </button>

            <div
              className={`relative aspect-square w-full overflow-hidden ${EXPERIMENTS_CARD.preview}`}
            >
              <video
                ref={videoRef}
                src={config.fullSrc}
                poster={config.poster}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                preload="auto"
                aria-label={config.alt}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
