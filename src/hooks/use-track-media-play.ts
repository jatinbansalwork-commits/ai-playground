"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef } from "react";
import { ROUTES } from "@/lib/constants";
import {
  mediaIdFromSrc,
  trackMediaPlay,
  type MediaPlaySurface,
} from "@/lib/analytics";

interface MediaPlayContext {
  surface: MediaPlaySurface;
  slug?: string;
}

function resolveMediaPlayContext(pathname: string): MediaPlayContext | null {
  if (pathname.startsWith(`${ROUTES.projects}/`)) {
    const slug = pathname.slice(`${ROUTES.projects}/`.length).split("/")[0];
    return slug ? { surface: "case-study", slug } : null;
  }

  if (pathname === ROUTES.ideas) {
    return { surface: "ideas" };
  }

  if (pathname === ROUTES.craft || pathname.startsWith(`${ROUTES.craft}/`)) {
    return { surface: "craft" };
  }

  return null;
}

export function useTrackMediaPlay(slug?: string) {
  const pathname = usePathname();
  const playedRef = useRef(false);

  const trackPlay = useCallback(
    (src: string) => {
      if (playedRef.current) return;

      const context = resolveMediaPlayContext(pathname);
      if (!context) return;

      playedRef.current = true;
      trackMediaPlay({
        surface: context.surface,
        media_id: mediaIdFromSrc(src),
        slug: slug ?? context.slug,
      });
    },
    [pathname, slug],
  );

  return trackPlay;
}
