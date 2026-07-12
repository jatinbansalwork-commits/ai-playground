"use client";

import { Kalam } from "next/font/google";
import { INDEX_SLIDE_TYPE } from "@/lib/index-typography";

const fieldNotesHand = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** Coral marker tone — matches Rauno-style Field Notes slides. */
const FIELD_NOTES_INK = "#E36952";

interface SectionFrameFieldNotesTitleProps {
  text: string;
}

export function SectionFrameFieldNotesTitle({
  text,
}: SectionFrameFieldNotesTitleProps) {
  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <p
        aria-hidden
        className={`pointer-events-none max-w-full text-center leading-[0.95] tracking-tight ${INDEX_SLIDE_TYPE} ${fieldNotesHand.className}`}
        style={{
          color: FIELD_NOTES_INK,
          fontSize: "clamp(3rem, 8.5vw, 5.5rem)",
          fontWeight: 700,
        }}
      >
        {text}
      </p>
    </div>
  );
}
