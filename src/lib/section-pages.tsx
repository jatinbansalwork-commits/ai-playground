import { notFound } from "next/navigation";
import { SectionGallery } from "@/components/craft/section-gallery";
import { getCraftSection } from "@/lib/craft-content";
import { SITE_NAME } from "@/lib/constants";

interface SectionPageProps {
  sectionId: string;
}

export function renderSectionPage({ sectionId }: SectionPageProps) {
  const section = getCraftSection(sectionId);
  if (!section) notFound();
  return <SectionGallery section={section} />;
}

export function sectionMetadata(sectionId: string) {
  const section = getCraftSection(sectionId);
  if (!section) return { title: "Not Found" };
  return {
    title: `${section.title} · ${SITE_NAME}`,
    description: section.description,
  };
}
