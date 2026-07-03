"use client";

import { CONTACT_LINKS } from "@/lib/constants";
import { FOCUS_RING, externalLinkLabel } from "@/lib/a11y";
import { trackContactClick, trackResumeDownload } from "@/lib/analytics";
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
  "top-left": "top-[30px] left-[24px] sm:top-[50px] sm:left-[50px]",
  "top-right": "top-[30px] right-[24px] sm:top-[50px] sm:right-[50px]",
  "bottom-left": "bottom-[30px] left-[24px] sm:bottom-[50px] sm:left-[50px]",
  "bottom-right": "bottom-[30px] right-[24px] sm:bottom-[50px] sm:right-[50px]",
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
