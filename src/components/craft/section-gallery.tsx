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
          items={section.items.map((item) => ({
            slug: item.slug,
            title: item.title,
            date: item.date ?? "",
            external: item.external,
            href: item.href,
          }))}
        />
      </div>
    </main>
  );
}
