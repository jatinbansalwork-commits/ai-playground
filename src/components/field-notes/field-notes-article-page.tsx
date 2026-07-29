"use client";

import { FieldNotesArticleBody } from "@/components/field-notes/field-notes-article-body";
import { FieldNotesHandwriting } from "@/components/field-notes/field-notes-handwriting";
import { FieldNotesPageAnalytics } from "@/components/field-notes/field-notes-page-analytics";
import { FieldNotesSignature } from "@/components/field-notes/field-notes-signature";
import { NavBackLink } from "@/components/navigation/nav-back-link";
import { useSubpageScrollReset } from "@/hooks/use-index-scroll-reset";
import { BACK_HOME } from "@/lib/session-navigation";

interface FieldNotesArticlePageProps {
  title: string;
  noteId?: string;
}

export function FieldNotesArticlePage({
  title,
  noteId = "1",
}: FieldNotesArticlePageProps) {
  useSubpageScrollReset();

  return (
    <main
      id="main-content"
      data-sheet="field-notes"
      tabIndex={-1}
      className="field-notes-page no-scrollbar fixed inset-0 z-10 overflow-y-auto overflow-x-hidden bg-white text-neutral-900"
    >
      <NavBackLink href={BACK_HOME.href} destination="home" />
      <FieldNotesPageAnalytics noteId={noteId} title={title} />
      <article className="field-notes-page__article">
        <header className="field-notes-page__header">
          <FieldNotesHandwriting variant="page" text={title} animate />
        </header>

        <div className="field-notes-page__body" aria-label="Field note content">
          <FieldNotesArticleBody />
        </div>

        <footer className="field-notes-page__footer">
          <FieldNotesSignature />
        </footer>
      </article>
    </main>
  );
}
