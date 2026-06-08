"use client";

import { useCallback, useEffect, useRef } from "react";

const CLICK_SOUND_PATH = "/assets/click.mp3";

export function useClickSound() {
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
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Autoplay or missing asset — fail silently.
    });
  }, []);

  return playClick;
}
