"use client";

import { CISCO_INTRO, CISCO_SECTIONS } from "@/lib/cisco-case-studies";
import { ScrollMinimapRuler } from "@/components/models/scroll-minimap-ruler";

interface CiscoCaseStudiesPageProps {
  showScrollChrome?: boolean;
}

export function CiscoCaseStudiesPage({
  showScrollChrome = true,
}: CiscoCaseStudiesPageProps) {
  return (
    <div className="platform-home-root relative w-full">
      {showScrollChrome ? <ScrollMinimapRuler /> : null}

      <div className="platform-home-main">
        <div className="platform-home-sheet">
          <section className="platform-home-section platform-home-section-intro">
            <div className="platform-home-intro-hero">
              <h1>Recent Work</h1>
            </div>
            <div className="platform-home-columns platform-home-columns-wrap platform-home-intro">
              <div className="platform-home-copy">
                <p>{CISCO_INTRO.left}</p>
              </div>
              <div className="platform-home-copy">
                <p>{CISCO_INTRO.right}</p>
              </div>
            </div>
          </section>
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
            >
              <h2>{section.label}</h2>
              <p>
                {section.id === "overview"
                  ? "Overview chapter content will be published here."
                  : `${section.label} content will be added in a future update.`}
              </p>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
