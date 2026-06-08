"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_EMAIL, CONTACT_LINKS } from "@/lib/constants";
import { FOCUS_RING, externalLinkLabel } from "@/lib/a11y";
import { INDEX_SLIDE_CONTACT } from "@/lib/index-typography";
import { springLabel } from "@/lib/spring";
import { FrameShell } from "@/components/slider/frame-shell";
import type { ContactFrame } from "@/types";

interface ContactFramePanelProps {
  frame: ContactFrame;
  index: number;
  onInteract: () => void;
}

const POSITION_CLASSES = {
  "top-left": "top-[50px] left-[50px]",
  "top-right": "top-[50px] right-[50px]",
  "bottom-left": "bottom-[50px] left-[50px]",
  "bottom-right": "bottom-[50px] right-[50px]",
} as const;

export function ContactFramePanel({
  frame,
  index,
  onInteract,
}: ContactFramePanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    onInteract();
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Clipboard may be unavailable.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      <div className="contact-frame relative flex h-full w-full items-center justify-center">
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={externalLinkLabel(link.label)}
            onMouseDown={onInteract}
            className={`absolute rounded-xl text-[85px] ${INDEX_SLIDE_CONTACT} ${FOCUS_RING} ${POSITION_CLASSES[link.position]}`}
          >
            {link.label}
          </a>
        ))}

        <button
          type="button"
          aria-label="Copy email"
          onMouseDown={onInteract}
          onClick={() => void handleCopyEmail()}
          className={`contact-center cursor-copy rounded-xl text-[85px] ${INDEX_SLIDE_CONTACT}`}
        >
          <div className="grid h-[102px] grid-cols-1 grid-rows-[102px] place-items-center overflow-hidden">
            <motion.p
              className={`col-start-1 row-start-1 flex h-[102px] items-center ${INDEX_SLIDE_CONTACT}`}
              animate={{ y: copied ? -90 : 0 }}
              transition={springLabel}
            >
              Email
            </motion.p>
            <motion.p
              className={`col-start-1 row-start-1 flex h-[102px] items-center ${INDEX_SLIDE_CONTACT}`}
              animate={{ y: copied ? 0 : 90 }}
              transition={springLabel}
            >
              Copied
            </motion.p>
          </div>
        </button>

        <div role="status" aria-live="polite" className="sr-only">
          {copied ? "Copied email to clipboard" : undefined}
        </div>
      </div>
    </FrameShell>
  );
}
