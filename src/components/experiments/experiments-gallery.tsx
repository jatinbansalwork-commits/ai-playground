import { ExperimentsGalleryClient } from "@/components/experiments/experiments-gallery-client";
import { getCraftSection } from "@/lib/craft-content";

export function ExperimentsGallery() {
  const section = getCraftSection("experiments");
  if (!section) return null;

  return (
    <ExperimentsGalleryClient
      items={section.items}
      sectionHref={section.href}
      articleSlugs={Object.keys(section.articles)}
    />
  );
}
