import type { Metadata } from "next";
import {
  articleMetadata,
  articleStaticParams,
  renderArticlePage,
} from "@/lib/article-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { getExperimentArticle, getExperimentArticleExcerpt } from "@/lib/experiments-registry";
import { craftArticleJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("experiments", slug);
}

export function generateStaticParams() {
  return articleStaticParams("experiments");
}

export default async function ExperimentArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getExperimentArticle(slug);

  return (
    <>
      {article ? (
        <JsonLd
          data={craftArticleJsonLd({
            slug,
            title: article.title,
            description: getExperimentArticleExcerpt(slug),
          })}
        />
      ) : null}
      {renderArticlePage({ sectionId: "experiments", slug })}
    </>
  );
}
