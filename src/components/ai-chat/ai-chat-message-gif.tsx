"use client";

import { useMemo, useState } from "react";
import { resolveCuratedGifFallback } from "@/lib/ai-chat-gif-fallback";
import type { ChatGif } from "@/lib/ai-chat-types";
import { FOCUS_RING } from "@/lib/a11y";

interface AiChatMessageGifProps {
  gif: ChatGif;
  querySeed?: string;
  usedGifIds?: readonly string[];
}

export function AiChatMessageGif({
  gif,
  querySeed = "",
  usedGifIds = [],
}: AiChatMessageGifProps) {
  const [activeGif, setActiveGif] = useState(gif);
  const [hidden, setHidden] = useState(false);
  const excludeIds = useMemo(
    () => new Set(usedGifIds.filter(Boolean)),
    [usedGifIds],
  );

  if (hidden) return null;

  return (
    <figure className="mt-3.5 space-y-2">
      <div className="overflow-hidden rounded-xl bg-black/20 ring-1 ring-inset ring-white/[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote animated GIF from GIPHY CDN */}
        <img
          src={activeGif.url}
          alt={activeGif.alt}
          width={activeGif.width ?? 320}
          height={activeGif.height ?? 240}
          loading="lazy"
          decoding="async"
          className="mx-auto max-h-44 w-full object-contain"
          onError={() => {
            const fallback = resolveCuratedGifFallback(
              activeGif,
              querySeed,
              excludeIds,
            );
            if (fallback && fallback.url !== activeGif.url) {
              setActiveGif(fallback);
              return;
            }
            setHidden(true);
          }}
        />
      </div>
      <figcaption className="text-[10px] text-neutral-500">
        <a
          href="https://giphy.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={`underline decoration-white/20 underline-offset-2 transition-colors hover:text-neutral-400 ${FOCUS_RING}`}
        >
          Powered by GIPHY
        </a>
      </figcaption>
    </figure>
  );
}
