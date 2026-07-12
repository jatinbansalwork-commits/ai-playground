"use client";

import { FieldNotesHandwriting } from "@/components/field-notes/field-notes-handwriting";
import { SessionNavBackLink } from "@/components/navigation/session-nav-back-link";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { BACK_HOME } from "@/lib/session-navigation";

interface FieldNotesArticlePageProps {
  noteNumber: number;
  title: string;
}

export function FieldNotesArticlePage({ noteNumber, title }: FieldNotesArticlePageProps) {
  useSubpageScrollReset();

  return (
    <main
      id="main-content"
      data-sheet="field-notes"
      tabIndex={-1}
      className="field-notes-page no-scrollbar fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-white text-neutral-900"
    >
      <SessionNavBackLink fallback={BACK_HOME} className="field-notes-page__back" />

      <article className="field-notes-page__article">
        <header className="field-notes-page__header">
          <p className="field-notes-page__number" aria-hidden>
            {noteNumber}
          </p>
          <FieldNotesHandwriting variant="page" text={title} animate />
        </header>

        <div className="field-notes-page__body" aria-label="Field note content">
          {/* Content will be added later. */}
        </div>
      </article>
    </main>
  );
}
