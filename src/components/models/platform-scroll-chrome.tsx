"use client";

const TICK_COUNT = 36;

interface PlatformScrollChromeProps {
  activeIndex: number;
}

export function PlatformScrollChrome({
  activeIndex,
}: PlatformScrollChromeProps) {
  return (
    <div className="platform-scroll-chrome" aria-hidden>
      <div className="platform-minimap">
        {Array.from({ length: TICK_COUNT }).map((_, index) => {
          const isMajor = index % 7 === 0;

          return (
            <span
              key={index}
              className={`platform-minimap-tick ${isMajor ? "is-major" : "is-minor"} ${
                index === activeIndex ? "is-active" : ""
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
