"use client";

import { FieldNotesArticleBody } from "@/components/field-notes/field-notes-article-body";
import { FieldNotesHandwriting } from "@/components/field-notes/field-notes-handwriting";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";

interface FieldNotesArticlePageProps {
  title: string;
}

export function FieldNotesArticlePage({ title }: FieldNotesArticlePageProps) {
  useSubpageScrollReset();

  return (
    <main
      id="main-content"
      data-sheet="field-notes"
      tabIndex={-1}
      className="field-notes-page no-scrollbar fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-white text-neutral-900"
    >
      <article className="field-notes-page__article">
        <header className="field-notes-page__header">
          <FieldNotesHandwriting variant="page" text={title} animate />
        </header>

        <div className="field-notes-page__body" aria-label="Field note content">
          <FieldNotesArticleBody />
        </div>
      </article>
    </main>
  );
}
