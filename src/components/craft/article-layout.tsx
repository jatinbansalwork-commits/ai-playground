"use client";

import Link from "next/link";
import { useRef } from "react";
import { CraftArticlePageAnalytics } from "@/components/craft/craft-article-page-analytics";
import { ArticleSectionContent } from "@/components/craft/article-section-content";
import { ScrollMinimapRuler } from "@/components/models/scroll-minimap-ruler";
import { NavBackLink } from "@/components/navigation/nav-back-link";
import { CASE_STUDY_EDITORIAL_CLASS } from "@/components/case-studies/case-study-editorial-fonts";
import type { CraftArticle, CraftSection } from "@/lib/craft-content";
import { getArticleSectionBlocks } from "@/lib/craft-content";
import { BACK_HOME } from "@/lib/session-navigation";

interface ArticleLayoutProps {
  section: CraftSection;
  article: CraftArticle;
  /** Resolved on the server — Client Components cannot receive functions. */
  prevSlug?: string | null;
  nextSlug?: string | null;
}

export function ArticleLayout({
  section,
  article,
  prevSlug = null,
  nextSlug = null,
}: ArticleLayoutProps) {
  const scrollRootRef = useRef<HTMLElement>(null);

  return (
    <>
      <main
        ref={scrollRootRef}
        id="main-content"
        data-sheet="craft-article"
        className="case-study-main craft-page no-scrollbar fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-white text-neutral-900"
        tabIndex={-1}
      >
        <NavBackLink href={BACK_HOME.href} destination="home" />
        <CraftArticlePageAnalytics slug={article.slug} />

        <div className="case-study-body mx-auto w-full max-w-5xl px-4 pb-24 sm:px-8">
          <article className={`${CASE_STUDY_EDITORIAL_CLASS} min-w-0`}>
            <div className="case-study-editorial-flow">
              <header className="case-study-editorial-intro">
                <div className="flex flex-col gap-3 md:gap-4">
                  {article.date ? (
                    <time className="block font-sans text-sm font-medium tracking-wide text-neutral-500">
                      {article.date}
                    </time>
                  ) : null}
                  <h1 className="craft-article-title text-4xl text-neutral-900 md:text-5xl">
                    {article.title}
                  </h1>
                </div>
              </header>

              {article.sections.map((entry) => (
                <section
                  key={entry.id}
                  id={entry.id}
                  className="craft-article-section scroll-mt-16"
                >
                  <h2 className="craft-article-section-title text-neutral-900">
                    {entry.title}
                  </h2>
                  <ArticleSectionContent blocks={getArticleSectionBlocks(entry)} />
                </section>
              ))}
            </div>

            <footer className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8 font-sans text-sm">
              {prevSlug ? (
                <Link
                  href={`${section.href}/${prevSlug}`}
                  className="text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  ← Previous
                </Link>
              ) : (
                <span />
              )}
              {nextSlug ? (
                <Link
                  href={`${section.href}/${nextSlug}`}
                  className="text-neutral-500 transition-colors hover:text-neutral-900"
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

      <ScrollMinimapRuler scrollRootRef={scrollRootRef} />
    </>
  );
}
