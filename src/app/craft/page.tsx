import { CraftPage } from "@/components/craft/craft-page";
import { getCraftGalleryPreloadResources } from "@/lib/craft-gallery-preload";
import { getExperimentGalleryItems } from "@/lib/experiments-registry";

const CRAFT_GALLERY_ITEMS = getExperimentGalleryItems();

export default function CraftRoutePage() {
  const preloadResources = getCraftGalleryPreloadResources(CRAFT_GALLERY_ITEMS);

  return (
    <>
      {preloadResources.map(({ href, as }) => (
        <link key={href} rel="preload" href={href} as={as} />
      ))}
      <CraftPage items={CRAFT_GALLERY_ITEMS} />
    </>
  );
}
