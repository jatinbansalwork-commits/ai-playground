"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { SITE_NAME } from "@/lib/constants";
import { resetDocumentScroll } from "@/hooks/use-index-scroll-reset";
import { CISCO_SECTIONS } from "@/lib/cisco-case-studies";
import { PlatformScrollChrome } from "@/components/models/platform-scroll-chrome";

interface CiscoCaseStudiesPageProps {
  showScrollChrome?: boolean;
}

export function CiscoCaseStudiesPage({
  showScrollChrome = true,
}: CiscoCaseStudiesPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    resetDocumentScroll();
  }, []);

  const syncScroll = useCallback(() => {
    if (!showScrollChrome) return;
    const markerY = window.innerHeight * 0.5;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    CISCO_SECTIONS.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - markerY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(
      Math.round((closestIndex / Math.max(CISCO_SECTIONS.length - 1, 1)) * 35),
    );
  }, [showScrollChrome]);

  useEffect(() => {
    if (!showScrollChrome) return;

    syncScroll();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncScroll);
    };
  }, [syncScroll, showScrollChrome]);

  return (
    <div className="platform-home-root relative">
      <Link
        href="/"
        aria-label={`Back to ${SITE_NAME}`}
        className="absolute top-8 left-8 z-20 flex size-12 items-center justify-center text-4xl leading-none text-neutral-500 transition-colors hover:text-white md:left-12"
      >
        ←
      </Link>

      {showScrollChrome ? (
        <PlatformScrollChrome activeIndex={activeIndex} />
      ) : null}

      <main data-sheet="models" className="platform-home-main">
        <div className="platform-home-sheet">
          <section
            className="platform-home-section platform-home-section-intro"
            aria-hidden
          />
        </div>

        {CISCO_SECTIONS.map((section) => (
          <div
            key={section.id}
            className={`platform-home-sheet ${
              section.id === "overview"
                ? "platform-home-sheet-overview"
                : "platform-home-sheet-chapter"
            }`}
          >
            <section
              id={section.id}
              className={`platform-home-section platform-home-chapter ${
                section.id === "overview"
                  ? "platform-home-chapter-overview"
                  : "platform-home-chapter-default"
              }`}
              aria-hidden
            />
          </div>
        ))}
      </main>
    </div>
  );
}
