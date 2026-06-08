import Link from "next/link";
import type { CraftArticle, CraftSection } from "@/lib/craft-content";
import { getAdjacentArticles } from "@/lib/craft-content";
import { SectionChrome } from "@/components/navigation/section-chrome";

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
      className="craft-page min-h-screen pb-24 text-white"
    >
      <SectionChrome />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 pt-28 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="Table of contents" className="sticky top-28">
            <Link
              href={section.href}
              className="mb-6 block text-sm text-neutral-400 transition-colors hover:text-white"
            >
              ← {section.title}
            </Link>
            <ul className="space-y-2 text-sm text-neutral-500">
              {article.sections.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="transition-colors hover:text-white"
                  >
                    {entry.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0">
          <header className="mb-12 border-b border-neutral-800 pb-8">
            <Link
              href={section.href}
              className="mb-4 inline-block text-sm text-neutral-400 transition-colors hover:text-white lg:hidden"
            >
              ← {section.title}
            </Link>
            <h1 className="text-4xl font-normal tracking-tight">{article.title}</h1>
            <time className="mt-3 block text-sm text-neutral-500">
              {article.date}
            </time>
          </header>

          <div className="space-y-12">
            {article.sections.map((entry) => (
              <section key={entry.id} id={entry.id} className="scroll-mt-28">
                <h2 className="mb-4 text-xl font-normal">{entry.title}</h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-neutral-300">
                  {entry.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
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
