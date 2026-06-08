"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CLICK_SOUND_PATH = "/assets/click.mp3";

export function useClickSound() {
  const reducedMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CLICK_SOUND_PATH);
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.35;

    return () => {
      audioRef.current = null;
    };
  }, []);

  const playClick = useCallback(() => {
    if (reducedMotion) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Autoplay or missing asset — fail silently.
    });
  }, [reducedMotion]);

  return playClick;
}
