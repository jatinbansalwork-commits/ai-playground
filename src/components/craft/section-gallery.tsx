import type { CraftSection } from "@/lib/craft-content";
import { CraftGrid } from "@/components/craft/craft-grid";
import { SectionChrome } from "@/components/navigation/section-chrome";

interface SectionGalleryProps {
  section: CraftSection;
}

export function SectionGallery({ section }: SectionGalleryProps) {
  return (
    <main
      data-sheet="craft"
      className="craft-page min-h-screen pb-24 text-white"
    >
      <SectionChrome minimapVariant="craft" />

      <div className="craft-page-content">
        <CraftGrid
          items={section.items}
          sectionHref={section.href}
          articleSlugs={Object.keys(section.articles)}
        />
      </div>
    </main>
  );
}
