import type { Metadata } from "next";
import {
  articleMetadata,
  articleStaticParams,
  renderArticlePage,
} from "@/lib/article-pages";

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
  return renderArticlePage({ sectionId: "experiments", slug });
}
