"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { getExperimentMedia } from "@/lib/experiment-media";
import {
  getIdeasCardMeta,
  IDEAS_DETAIL_AUTHOR,
} from "@/lib/ideas-page-data";
import {
  trackAiExperimentDetailView,
  trackAiExperimentItemClick,
  trackExternalDemoOpen,
} from "@/lib/analytics";
import { IdeasDetailMedia } from "@/components/ideas/ideas-detail-media";
import { AiChatAvatar } from "@/components/ai-chat/ai-chat-avatar";
import { FOCUS_RING, externalLinkLabel } from "@/lib/a11y";
import { springSnappy } from "@/lib/spring";

interface IdeasDetailModalProps {
  item: ExperimentGalleryItem | null;
  onClose: () => void;
}

export function IdeasDetailModal({ item, onClose }: IdeasDetailModalProps) {
  const open = item !== null;
  const titleId = useId();
  const descId = useId();
  const mounted = typeof document !== "undefined";

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

  useEffect(() => {
    if (!open || !item) return;

    trackAiExperimentDetailView(item.slug);
  }, [open, item]);

  if (!mounted) return null;

  const media = item ? getExperimentMedia(item.slug, "ai-experiment") : null;
  const meta = item ? getIdeasCardMeta(item.slug) : null;
  const href = item?.href;

  return createPortal(
    <AnimatePresence>
      {open && item && meta ? (
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
              {media ? (
                <IdeasDetailMedia media={media} title={item.title} active={open} />
              ) : null}
            </div>

            <div className="ideas-detail__meta">
              <h2 id={titleId} className="ideas-detail__title">
                {item.title}
              </h2>
              <p id={descId} className="ideas-detail__subtext">
                {meta.subtext}
              </p>

              <ul className="ideas-detail__chips" aria-label="Tags">
                {meta.chips.map((chip) => (
                  <li key={chip}>
                    <span className="ideas-detail__chip">
                      <span className="ideas-detail__chip-hash" aria-hidden>
                        #
                      </span>
                      {chip}
                    </span>
                  </li>
                ))}
                {href ? (
                  <li>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ideas-detail__chip ideas-detail__chip--link ${FOCUS_RING}`}
                      aria-label={externalLinkLabel(item.title)}
                      onClick={() => {
                        trackExternalDemoOpen({
                          slug: item.slug,
                          url: href,
                          surface: "ai-experiment",
                        });
                        trackAiExperimentItemClick({
                          slug: item.slug,
                          cta: "live-demo",
                          url: href,
                        });
                      }}
                    >
                      <span className="ideas-detail__chip-icon" aria-hidden>
                        ↗
                      </span>
                      Live demo
                    </a>
                  </li>
                ) : null}
              </ul>

              <hr className="ideas-detail__divider" />

              <p className="ideas-detail__note">{meta.editorNote}</p>

              <hr className="ideas-detail__divider" />

              <footer className="ideas-detail__footer">
                <span className="ideas-detail__avatar" aria-hidden>
                  <AiChatAvatar size={28} />
                </span>
                <div className="ideas-detail__byline">
                  <span className="ideas-detail__author">
                    {IDEAS_DETAIL_AUTHOR.name}
                  </span>
                  {item.date ? (
                    <time
                      className="ideas-detail__date"
                      dateTime={item.date}
                    >
                      {item.date}
                    </time>
                  ) : null}
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
