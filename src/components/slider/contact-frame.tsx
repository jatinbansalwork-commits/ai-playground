"use client";

import { CONTACT_LINKS } from "@/lib/constants";
import { FOCUS_RING, externalLinkLabel } from "@/lib/a11y";
import { INDEX_SLIDE_CONTACT } from "@/lib/index-typography";
import { ContactEmailButton } from "@/components/slider/contact-email-button";
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
  return (
    <FrameShell frame={frame} index={index} onInteract={onInteract}>
      <div className="contact-frame relative h-full w-full">
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

        <ContactEmailButton
          onInteract={onInteract}
          className={`absolute ${POSITION_CLASSES["bottom-left"]}`}
        />
      </div>
    </FrameShell>
  );
}
