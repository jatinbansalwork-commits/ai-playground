import type { CraftItem } from "@/lib/craft-content";
import { CraftCard } from "@/components/craft/craft-card";

const COLUMN_COUNT = 3;

function distributeColumns(items: CraftItem[]): CraftItem[][] {
  const columns: CraftItem[][] = Array.from({ length: COLUMN_COUNT }, () => []);

  items.forEach((item, index) => {
    columns[index % COLUMN_COUNT].push(item);
  });

  return columns;
}

interface CraftGridProps {
  items: CraftItem[];
  sectionHref: string;
  articleSlugs?: string[];
}

export function CraftGrid({
  items,
  sectionHref,
  articleSlugs = [],
}: CraftGridProps) {
  const articleSet = new Set(articleSlugs);
  const columns = distributeColumns(items);

  return (
    <div className="craft-grid">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="craft-grid-column">
          {column.map((item) => (
            <CraftCard
              key={item.slug}
              item={item}
              sectionHref={sectionHref}
              hasArticle={articleSet.has(item.slug)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
