import Link from "next/link";
import { ArticleBackLink } from "@/components/craft/article-back-link";
import { CraftArticlePageAnalytics } from "@/components/craft/craft-article-page-analytics";
import { ArticleSectionContent } from "@/components/craft/article-section-content";
import { CASE_STUDY_EDITORIAL_CLASS } from "@/components/case-studies/case-study-editorial-fonts";
import type { CraftArticle, CraftSection } from "@/lib/craft-content";
import { getAdjacentArticles, getArticleSectionBlocks } from "@/lib/craft-content";
import { NAV_BACK_LINK_CLASS } from "@/lib/a11y";

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

  const backHref = section.backHref ?? section.href;
  const backLabel = section.backLabel ?? section.title;

  return (
    <main
      data-sheet="craft-article"
      className="case-study-main craft-page fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-background text-white"
    >
      <CraftArticlePageAnalytics slug={article.slug} />
      <ArticleBackLink
        fallbackHref={backHref}
        destination={backLabel}
        className={NAV_BACK_LINK_CLASS}
      />

      <div className="case-study-body mx-auto w-full max-w-5xl px-4 pb-24 sm:px-8">
        <article className={`${CASE_STUDY_EDITORIAL_CLASS} min-w-0`}>
          <div className="case-study-editorial-flow">
            <header className="case-study-editorial-intro">
              <h1 className="craft-article-title pt-[200px] text-4xl md:text-5xl">
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
                <h2 className="craft-article-section-title mb-6 text-white">
                  {entry.title}
                </h2>
                <ArticleSectionContent blocks={getArticleSectionBlocks(entry)} />
              </section>
            ))}
          </div>

          <footer className="mt-16 flex items-center justify-between pt-8 font-sans text-sm">
            {prev ? (
              <Link
                href={`${section.href}/${prev}`}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`${section.href}/${next}`}
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
