"use client";

import { CONTACT_LINKS } from "@/lib/constants";
import { FOCUS_RING, externalLinkLabel } from "@/lib/a11y";
import { trackContactClick, trackResumeDownload } from "@/lib/analytics";
import { INDEX_SLIDE_CONTACT, INDEX_SLIDE_CONTACT_SIZE_PX } from "@/lib/index-typography";
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

function trackContactLink(label: (typeof CONTACT_LINKS)[number]["label"]): void {
  if (label === "Resume") {
    trackResumeDownload();
    return;
  }

  if (label === "LinkedIn") {
    trackContactClick("linkedin");
    return;
  }

  if (label === "JB Manual") {
    trackContactClick("jb_manual");
  }
}

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
            onClick={() => trackContactLink(link.label)}
            className={`absolute rounded-xl ${INDEX_SLIDE_CONTACT} ${FOCUS_RING} ${POSITION_CLASSES[link.position]}`}
            style={{ fontSize: INDEX_SLIDE_CONTACT_SIZE_PX }}
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
