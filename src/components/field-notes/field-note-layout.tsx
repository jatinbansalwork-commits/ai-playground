import Link from "next/link";
import { ArticleSectionContent } from "@/components/craft/article-section-content";
import { ArticleBackLink } from "@/components/craft/article-back-link";
import { CASE_STUDY_EDITORIAL_CLASS } from "@/components/case-studies/case-study-editorial-fonts";
import { getArticleSectionBlocks } from "@/lib/craft-content";
import type { FieldNote } from "@/lib/field-notes-content";
import { getAdjacentFieldNotes } from "@/lib/field-notes-content";
import { NAV_BACK_LINK_CLASS } from "@/lib/a11y";
import { ROUTES } from "@/lib/constants";
import { BACK_NOTES } from "@/lib/session-navigation";

interface FieldNoteLayoutProps {
  note: FieldNote;
}

export function FieldNoteLayout({ note }: FieldNoteLayoutProps) {
  const { prev, next } = getAdjacentFieldNotes(note.slug);

  return (
    <main
      data-sheet="field-note"
      className="case-study-main craft-page fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-background text-white"
    >
      <ArticleBackLink fallback={BACK_NOTES} className={NAV_BACK_LINK_CLASS} />

      <div className="case-study-body mx-auto w-full max-w-5xl px-4 pb-24 sm:px-8">
        <article className={`${CASE_STUDY_EDITORIAL_CLASS} min-w-0`}>
          <div className="case-study-editorial-flow">
            <header className="case-study-editorial-intro">
              <h1 className="craft-article-title pt-[200px] text-4xl md:text-5xl">
                {note.title}
              </h1>
              <time className="mt-4 block font-sans text-sm tracking-wide text-neutral-500">
                {note.date}
              </time>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-neutral-400">
                {note.lede}
              </p>
            </header>

            {note.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="craft-article-section scroll-mt-16"
              >
                <h2 className="craft-article-section-title mb-6 text-white">
                  {section.title}
                </h2>
                <ArticleSectionContent blocks={getArticleSectionBlocks(section)} />
              </section>
            ))}
          </div>

          <footer className="mt-16 flex items-center justify-between pt-8 font-sans text-sm">
            {prev ? (
              <Link
                href={`${ROUTES.notes}/${prev}`}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`${ROUTES.notes}/${next}`}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                Next →
              </Link>
            ) : (
              <span />
            )}
          </footer>
        </article>
      </div>
    </main>
  );
}
