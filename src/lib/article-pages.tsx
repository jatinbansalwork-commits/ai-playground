import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/craft/article-layout";
import { getCraftSection } from "@/lib/craft-content";
import {
  getAdjacentExperimentArticles,
  getExperimentArticle,
  getExperimentArticleExcerpt,
  getExperimentsArticleSection,
} from "@/lib/experiments-registry";
import { buildPageMetadata } from "@/lib/seo";

interface ArticlePageProps {
  sectionId: string;
  slug: string;
}

export function renderArticlePage({ sectionId, slug }: ArticlePageProps) {
  if (sectionId === "experiments") {
    const article = getExperimentArticle(slug);
    if (!article) notFound();

    return (
      <ArticleLayout
        section={getExperimentsArticleSection()}
        article={article}
        getAdjacentArticles={getAdjacentExperimentArticles}
      />
    );
  }

  const section = getCraftSection(sectionId);
  if (!section) notFound();

  const article = section.articles[slug];
  if (!article) notFound();

  return <ArticleLayout section={section} article={article} />;
}

export function articleMetadata(sectionId: string, slug: string): Metadata {
  if (sectionId === "experiments") {
    const article = getExperimentArticle(slug);
    if (!article) {
      return buildPageMetadata({
        title: "Not Found",
        description: "This essay could not be found.",
        path: `/craft/${slug}`,
        noIndex: true,
      });
    }

    return buildPageMetadata({
      title: `${article.title} · Craft`,
      description: getExperimentArticleExcerpt(slug),
      path: `/craft/${slug}`,
      openGraphType: "article",
    });
  }

  const section = getCraftSection(sectionId);
  const article = section?.articles[slug];
  if (!article) {
    return buildPageMetadata({
      title: "Not Found",
      description: "This essay could not be found.",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${article.title} · ${section.title}`,
    description: article.sections[0]?.paragraphs?.[0] ?? "",
    path: `/craft/${slug}`,
  });
}

export function articleStaticParams(sectionId: string) {
  if (sectionId === "experiments") {
    return Object.keys(getExperimentsArticleSection().articles).map((slug) => ({
      slug,
    }));
  }

  const section = getCraftSection(sectionId);
  if (!section) return [];
  return Object.keys(section.articles).map((slug) => ({ slug }));
}
