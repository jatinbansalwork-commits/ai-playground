import Link from "next/link";
import { CraftArticlePageAnalytics } from "@/components/craft/craft-article-page-analytics";
import { ArticleSectionContent } from "@/components/craft/article-section-content";
import { CASE_STUDY_EDITORIAL_CLASS } from "@/components/case-studies/case-study-editorial-fonts";
import type { CraftArticle, CraftSection } from "@/lib/craft-content";
import { getAdjacentArticles, getArticleSectionBlocks } from "@/lib/craft-content";

interface ArticleLayoutProps {
  section: CraftSection;
  article: CraftArticle;
  getAdjacentArticles?: (slug: string) => { prev: string | null; next: string | null };
}

export function ArticleLayout({
  section,
  article,
  getAdjacentArticles: resolveAdjacentArticles,
}: ArticleLayoutProps) {
  const { prev, next } = resolveAdjacentArticles
    ? resolveAdjacentArticles(article.slug)
    : getAdjacentArticles(section.id, article.slug);

  return (
    <main
      data-sheet="craft-article"
      className="case-study-main craft-page no-scrollbar fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-white text-neutral-900"
    >
      <CraftArticlePageAnalytics slug={article.slug} />

      <div className="case-study-body mx-auto w-full max-w-5xl px-4 pb-24 sm:px-8">
        <article className={`${CASE_STUDY_EDITORIAL_CLASS} min-w-0`}>
          <div className="case-study-editorial-flow">
            <header className="case-study-editorial-intro">
              <h1 className="craft-article-title pt-[200px] text-4xl text-neutral-900 md:text-5xl">
                {article.title}
              </h1>
              {article.date ? (
                <time className="mt-4 block font-sans text-sm tracking-wide text-neutral-500">
                  {article.date}
                </time>
              ) : null}
            </header>

            {article.sections.map((entry) => (
              <section
                key={entry.id}
                id={entry.id}
                className="craft-article-section scroll-mt-16"
              >
                <h2 className="craft-article-section-title mb-6 text-neutral-900">
                  {entry.title}
                </h2>
                <ArticleSectionContent blocks={getArticleSectionBlocks(entry)} />
              </section>
            ))}
          </div>

          <footer className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8 font-sans text-sm">
            {prev ? (
              <Link
                href={`${section.href}/${prev}`}
                className="text-neutral-500 transition-colors hover:text-neutral-900"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`${section.href}/${next}`}
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
  );
}
