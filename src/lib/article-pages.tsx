import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/craft/article-layout";
import { getCraftSection } from "@/lib/craft-content";
import { SITE_NAME } from "@/lib/constants";

interface ArticlePageProps {
  sectionId: string;
  slug: string;
}

export function renderArticlePage({ sectionId, slug }: ArticlePageProps) {
  const section = getCraftSection(sectionId);
  if (!section) notFound();

  const article = section.articles[slug];
  if (!article) notFound();

  return <ArticleLayout section={section} article={article} />;
}

export function articleMetadata(sectionId: string, slug: string) {
  const section = getCraftSection(sectionId);
  const article = section?.articles[slug];
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} · ${section.title} · ${SITE_NAME}`,
  };
}

export function articleStaticParams(sectionId: string) {
  const section = getCraftSection(sectionId);
  if (!section) return [];
  return Object.keys(section.articles).map((slug) => ({ slug }));
}
