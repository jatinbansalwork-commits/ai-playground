"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/constants";
import { FOCUS_RING } from "@/lib/a11y";
import { trackContactClick } from "@/lib/analytics";
import { INDEX_SLIDE_CONTACT, INDEX_SLIDE_CONTACT_SIZE_PX } from "@/lib/index-typography";
import { springLabel } from "@/lib/spring";

interface ContactEmailButtonProps {
  className?: string;
  onInteract: () => void;
}

export function ContactEmailButton({
  className = "",
  onInteract,
}: ContactEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    onInteract();
    trackContactClick("email");
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Clipboard may be unavailable.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Copy email"
        onMouseDown={onInteract}
        onClick={() => void handleCopyEmail()}
        className={`cursor-copy rounded-xl text-left ${INDEX_SLIDE_CONTACT} ${FOCUS_RING} ${className}`.trim()}
        style={{ fontSize: INDEX_SLIDE_CONTACT_SIZE_PX }}
      >
        <span className="relative block h-[1em] overflow-hidden leading-none">
          <motion.span
            className={`block ${INDEX_SLIDE_CONTACT}`}
            animate={{ y: copied ? "-50%" : "0%" }}
            transition={springLabel}
          >
            <span className="block">Email</span>
            <span className="block">Copied</span>
          </motion.span>
        </span>
      </button>

      <div role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied email to clipboard" : undefined}
      </div>
    </>
  );
}
