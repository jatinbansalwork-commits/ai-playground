"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollSlider } from "@/hooks/use-scroll-slider";
import { useIsMounted } from "@/hooks/use-is-mounted";
import {
  getGhostSpacerSize,
  resetDocumentScroll,
  useIndexScrollReset,
} from "@/hooks/use-index-scroll-reset";
import { SliderProvider } from "@/context/slider-context";
import { useWireframe, WireframeProvider } from "@/context/wireframe-context";
import {
  FRAME_HEIGHT,
  FRAME_WIDTH,
  FRAMES,
} from "@/lib/constants";
import { springContainer } from "@/lib/spring";
import { IndexSlideNav } from "@/components/slider/index-slide-nav";
import { Minimap } from "@/components/slider/minimap";
import { FOCUS_RING } from "@/lib/a11y";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HeroFramePanel } from "@/components/slider/hero-frame";
import { SectionFramePanel } from "@/components/slider/section-frame";
import { ContactFramePanel } from "@/components/slider/contact-frame";
import { ManifestFramePanel } from "@/components/slider/manifest-frame";
import { SiteFooter } from "@/components/site-footer";

function IndexCanvas() {
  useIndexScrollReset();
  const {
    springTrackX,
    springScaleValue,
    playClick,
    activeFrameIndex,
    snapToIndex,
    frameCount,
  } = useScrollSlider();
  const { wireframe, toggleWireframe } = useWireframe();
  const reducedMotion = useReducedMotion();
  const [ghostSize, setGhostSize] = useState(getGhostSpacerSize);

  useEffect(() => {
    const updateGhostSize = () => {
      setGhostSize(getGhostSpacerSize());
    };

    updateGhostSize();
    const settleFrame = requestAnimationFrame(updateGhostSize);
    window.addEventListener("resize", updateGhostSize);
    return () => {
      cancelAnimationFrame(settleFrame);
      window.removeEventListener("resize", updateGhostSize);
      resetDocumentScroll();
    };
  }, []);

  return (
    <>
      <main
        id="main-content"
        data-sheet="index"
        data-debug={wireframe ? "true" : undefined}
        data-cancel-animation={wireframe ? "true" : undefined}
        className={`index-root fixed inset-0 z-10 overflow-hidden bg-[#1E1E1E]${wireframe ? " wireframe-mode" : ""}`}
        style={
          {
            "--frame-width": `${FRAME_WIDTH}px`,
            "--frame-height": `${FRAME_HEIGHT}px`,
          } as React.CSSProperties
        }
      >
        <Minimap />

        <div className="scrollable-content pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
          <motion.div
            className="pointer-events-auto origin-center"
            style={{ scale: springScaleValue }}
          >
            <motion.div
              className="relative overflow-visible"
              style={{
                x: springTrackX,
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
              }}
            >
              {FRAMES.map((frame, index) => {
                switch (frame.type) {
                case "hero":
                  return (
                    <HeroFramePanel
                      key={frame.id}
                      frame={frame}
                      index={index}
                      onInteract={playClick}
                    />
                  );
                case "section":
                  return (
                    <SectionFramePanel
                      key={frame.id}
                      frame={frame}
                      index={index}
                      onInteract={playClick}
                    />
                  );
                case "contact":
                  return (
                    <ContactFramePanel
                      key={frame.id}
                      frame={frame}
                      index={index}
                      onInteract={playClick}
                    />
                  );
                case "manifest":
                  return (
                    <ManifestFramePanel
                      key={frame.id}
                      frame={frame}
                      index={index}
                      onInteract={playClick}
                    />
                  );
                default:
                  return null;
                }
              })}
            </motion.div>
          </motion.div>
        </div>

        <CrossOverlay
          wireframe={wireframe}
          onToggle={toggleWireframe}
          onInteract={playClick}
          reducedMotion={reducedMotion}
        />

        <IndexSlideNav
          activeIndex={activeFrameIndex}
          frameCount={frameCount}
          onSelect={snapToIndex}
        />

        <SiteFooter pinned />

        <p className="sr-only">
          Use arrow keys, Page Up, Page Down, Home, or End to move between slides.
        </p>
      </main>

      <div
        aria-hidden
        className="ghost-spacer"
        suppressHydrationWarning
        style={{ width: ghostSize.width, height: ghostSize.height }}
      />
    </>
  );
}

function CrossOverlay({
  wireframe,
  onToggle,
  onInteract,
  reducedMotion,
}: {
  wireframe: boolean;
  onToggle: () => void;
  onInteract: () => void;
  reducedMotion: boolean;
}) {
  const mounted = useIsMounted();

  return (
    <motion.button
      type="button"
      aria-label="Toggle wireframe mode"
      aria-pressed={wireframe}
      onMouseDown={(event) => {
        event.stopPropagation();
        onInteract();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      className={`pointer-events-auto fixed top-1/2 left-1/2 z-50 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center mix-blend-difference ${FOCUS_RING}`}
      initial={false}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={reducedMotion ? { duration: 0 } : springContainer}
    >
      <svg
        aria-hidden
        data-cross
        width="20"
        height="20"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="14.75" y1="0" x2="14.75" y2="30" stroke="white" strokeWidth="1.5" />
        <line x1="0" y1="14.25" x2="30" y2="14.25" stroke="white" strokeWidth="1.5" />
      </svg>
    </motion.button>
  );
}

export function IndexExperience() {
  return (
    <WireframeProvider>
      <SliderProvider>
        <IndexCanvas />
      </SliderProvider>
    </WireframeProvider>
  );
}
