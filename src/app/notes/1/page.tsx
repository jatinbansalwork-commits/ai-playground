import type { Metadata } from "next";
import { FieldNotesArticlePage } from "@/components/field-notes/field-notes-article-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notes by JB #1",
  description:
    "Design notes from Jatin Bansal — observations, sketches, and product thinking in progress.",
  path: "/notes/1",
});

export default function FieldNotesOnePage() {
  return <FieldNotesArticlePage noteId="1" title="Notes by JB #1" />;
}
