import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FieldNoteLayout } from "@/components/field-notes/field-note-layout";
import {
  FIELD_NOTE_SLUGS,
  getFieldNote,
  getFieldNoteExcerpt,
} from "@/lib/field-notes-content";
import { ROUTES } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export function fieldNoteStaticParams() {
  return FIELD_NOTE_SLUGS.map((slug) => ({ slug }));
}

export function fieldNoteMetadata(slug: string): Metadata {
  const note = getFieldNote(slug);
  if (!note) {
    return buildPageMetadata({
      title: "Not Found",
      description: "This field note could not be found.",
      path: `${ROUTES.notes}/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${note.title} · Field Notes`,
    description: getFieldNoteExcerpt(note),
    path: `${ROUTES.notes}/${slug}`,
    openGraphType: "article",
  });
}

export function renderFieldNotePage(slug: string) {
  const note = getFieldNote(slug);
  if (!note) notFound();
  return <FieldNoteLayout note={note} />;
}
