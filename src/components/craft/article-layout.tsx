import Link from "next/link";
import { ArticleBackLink } from "@/components/craft/article-back-link";
import { ArticleSectionContent } from "@/components/craft/article-section-content";
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
      className="craft-page no-scrollbar fixed inset-0 z-10 h-screen w-full overflow-y-auto overflow-x-hidden bg-[#1a1a1a] text-white"
    >
      <ArticleBackLink
        fallbackHref={backHref}
        destination={backLabel}
        className={NAV_BACK_LINK_CLASS}
      />

      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-24">
        <article className="min-w-0">
          <header className="mb-12 border-b border-neutral-800 pb-8">
            <h1 className="text-4xl font-normal tracking-tight">{article.title}</h1>
            {article.date ? (
              <time className="mt-3 block text-sm text-neutral-500">
                {article.date}
              </time>
            ) : null}
          </header>

          <div>
            {article.sections.map((entry, index) => (
              <section
                key={entry.id}
                id={entry.id}
                className={[
                  "scroll-mt-16",
                  index > 0 ? "mt-12 border-t border-neutral-800 pt-12" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <h2 className="mb-4 text-xl font-normal">{entry.title}</h2>
                <ArticleSectionContent
                  blocks={getArticleSectionBlocks(entry)}
                />
              </section>
            ))}
          </div>

          <footer className="mt-16 flex items-center justify-between border-t border-neutral-800 pt-8 text-sm">
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
