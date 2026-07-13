"use client";

import { useEffect, useRef } from "react";
import { trackFieldNotesView } from "@/lib/analytics";

interface FieldNotesPageAnalyticsProps {
  noteId: string;
  title: string;
}

/** Fires `field_notes_view` once per mount. */
export function FieldNotesPageAnalytics({
  noteId,
  title,
}: FieldNotesPageAnalyticsProps): null {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackFieldNotesView({ note_id: noteId, title });
  }, [noteId, title]);

  return null;
}
