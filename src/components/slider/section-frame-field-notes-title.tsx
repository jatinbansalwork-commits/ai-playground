"use client";

import { FieldNotesHandwriting } from "@/components/field-notes/field-notes-handwriting";

interface SectionFrameFieldNotesTitleProps {
  text: string;
  isActive: boolean;
}

export function SectionFrameFieldNotesTitle({
  text,
  isActive,
}: SectionFrameFieldNotesTitleProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-visible px-2">
      <FieldNotesHandwriting variant="slide" text={text} animate isActive={isActive} />
    </div>
  );
}
