"use client";

import { Minimap } from "@/components/slider/minimap";
import { SliderProvider } from "@/context/slider-context";
import { useMinimapFromScroll } from "@/hooks/use-minimap-from-scroll";

function SectionChromeInner({
  minimapVariant,
}: {
  minimapVariant: "index" | "craft";
}) {
  useMinimapFromScroll();

  return (
    <header className="fixed top-0 right-0 left-0 z-30 pt-16">
      <Minimap href="/" variant={minimapVariant} />
    </header>
  );
}

export function SectionChrome({
  minimapVariant = "craft",
}: {
  minimapVariant?: "index" | "craft";
}) {
  return (
    <SliderProvider>
      <SectionChromeInner minimapVariant={minimapVariant} />
    </SliderProvider>
  );
}
