import type { Metadata } from "next";
import { FieldNotesPageShell } from "@/components/field-notes/field-notes-list";
import { getAllFieldNotes } from "@/lib/field-notes-content";
import { FIELD_NOTES_PAGE } from "@/lib/field-notes-page-data";
import { ROUTES } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${FIELD_NOTES_PAGE.title} · JB Portfolio`,
  description: FIELD_NOTES_PAGE.description,
  path: ROUTES.notes,
});

export default function FieldNotesIndexPage() {
  return <FieldNotesPageShell notes={getAllFieldNotes()} />;
}
