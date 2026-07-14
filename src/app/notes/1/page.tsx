import type { Metadata } from "next";
import { FieldNotesArticlePage } from "@/components/field-notes/field-notes-article-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "JB's Case Notes #1",
  description:
    "Design field notes from Jatin Bansal — observations, sketches, and product thinking in progress.",
  path: "/notes/1",
});

export default function FieldNotesOnePage() {
  return <FieldNotesArticlePage noteId="1" title="JB's Case Notes #1" />;
}
