"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AiVoiceInput } from "@/components/ideas/ai-voice-input";
import { AiChatAvatar } from "@/components/ai-chat/ai-chat-avatar";
import {
  IDEAS_DETAIL_AUTHOR,
  IDEAS_PLACEHOLDER_CARD,
} from "@/lib/ideas-page-data";
import { FOCUS_RING } from "@/lib/a11y";
import { springSnappy } from "@/lib/spring";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface IdeasPlaceholderModalProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function IdeasPlaceholderModal({
  open,
  onClose,
  returnFocusRef,
}: IdeasPlaceholderModalProps) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const mounted = typeof document !== "undefined";

  useFocusTrap(panelRef, open, { returnFocusRef });

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="ideas-detail"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          role="presentation"
        >
          <div className="ideas-detail__backdrop-blur" aria-hidden />
          <button
            type="button"
            aria-label="Close detail"
            className="ideas-detail__backdrop"
            onClick={handleClose}
          />

          <motion.article
            ref={panelRef}
            className="ideas-detail__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={springSnappy}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="ideas-detail__preview">
              <button
                type="button"
                aria-label="Close"
                className={`ideas-detail__close ${FOCUS_RING}`}
                onClick={handleClose}
              >
                ×
              </button>
              <div
                className="ideas-card__preview-placeholder ideas-detail__placeholder-preview"
                aria-hidden
              />
            </div>

            <div className="ideas-detail__meta">
              <h2 id={titleId} className="ideas-detail__title">
                {IDEAS_PLACEHOLDER_CARD.title}
              </h2>
              <AiVoiceInput active={open} id={descId} />

              <ul className="ideas-detail__chips" aria-label="Tags">
                {IDEAS_PLACEHOLDER_CARD.chips.map((chip) => (
                  <li key={chip}>
                    <span className="ideas-detail__chip">
                      <span className="ideas-detail__chip-hash" aria-hidden>
                        #
                      </span>
                      {chip}
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="ideas-detail__divider" />

              <p className="ideas-detail__note">{IDEAS_PLACEHOLDER_CARD.editorNote}</p>

              <hr className="ideas-detail__divider" />

              <footer className="ideas-detail__footer">
                <span className="ideas-detail__avatar" aria-hidden>
                  <AiChatAvatar size={28} />
                </span>
                <div className="ideas-detail__byline">
                  <span className="ideas-detail__author">
                    {IDEAS_DETAIL_AUTHOR.name}
                  </span>
                </div>
              </footer>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
