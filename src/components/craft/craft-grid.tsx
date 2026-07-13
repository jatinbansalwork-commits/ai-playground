"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ExperimentGalleryItem } from "@/lib/experiments-registry";
import { CraftCard } from "@/components/craft/craft-card";
import { useCraftGalleryPreload } from "@/hooks/use-craft-gallery-preload";
import {
  useCraftMasonryColumnCount,
  useCraftMasonryLayout,
} from "@/hooks/use-craft-masonry-layout";
import {
  buildInitialCraftAspectMap,
  shouldUpdateCraftAspect,
} from "@/lib/craft-gallery-aspects";
import { randomShuffleSeed, shuffleWithSeed } from "@/lib/shuffle-seed";

interface CraftGridProps {
  items: ExperimentGalleryItem[];
}

const PRIORITY_CARD_COUNT = 6;

export function CraftGrid({ items }: CraftGridProps) {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const columnCount = useCraftMasonryColumnCount();

  useEffect(() => {
    setShuffleSeed(randomShuffleSeed());
  }, []);

  const orderedItems = useMemo(() => {
    if (shuffleSeed === 0) return items;
    return shuffleWithSeed(items, shuffleSeed ^ items.length);
  }, [items, shuffleSeed]);

  const initialAspects = useMemo(
    () => buildInitialCraftAspectMap(orderedItems),
    [orderedItems],
  );
  const [measuredAspects, setMeasuredAspects] =
    useState<Record<string, number>>(initialAspects);

  useEffect(() => {
    setMeasuredAspects(initialAspects);
  }, [initialAspects]);

  const masonryColumns = useCraftMasonryLayout(
    orderedItems,
    columnCount,
    measuredAspects,
  );

  const prioritySlugs = useMemo(() => {
    const slugs = masonryColumns
      .flat()
      .slice(0, PRIORITY_CARD_COUNT)
      .map((item) => item.slug);
    return new Set(slugs);
  }, [masonryColumns]);

  useCraftGalleryPreload(orderedItems);

  const handleMediaMeasure = useCallback(
    (slug: string, width: number, height: number) => {
      const widthOverHeight = width / height;
      setMeasuredAspects((previous) => {
        if (!shouldUpdateCraftAspect(previous[slug], widthOverHeight)) {
          return previous;
        }

        return { ...previous, [slug]: widthOverHeight };
      });
    },
    [],
  );

  return (
    <div className="craft-grid ideas-grid">
      {masonryColumns.map((columnItems, columnIndex) => (
        <div
          key={`craft-column-${columnIndex}`}
          className="craft-grid__column ideas-grid__column"
        >
          {columnItems.map((item) => (
            <div key={item.slug} className="craft-grid__item ideas-grid__item">
              <CraftCard
                item={item}
                priority={prioritySlugs.has(item.slug)}
                onMediaMeasure={handleMediaMeasure}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
