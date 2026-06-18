"use client";

import { useCallback, useEffect, useRef } from "react";
import { AI_CHAT_SEND_SOUND_STORAGE_KEY } from "@/lib/ai-chat-config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Opt-in via `localStorage.setItem("ai_chat_send_sound", "1")` — off by default. */
export { AI_CHAT_SEND_SOUND_STORAGE_KEY };

function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioContextCtor =
    window.AudioContext ??
    (
      window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }
    ).webkitAudioContext;

  if (!AudioContextCtor) return null;
  return new AudioContextCtor();
}

export function isChatSendSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AI_CHAT_SEND_SOUND_STORAGE_KEY) === "1";
}

export function useAiChatSounds() {
  const reducedMotion = useReducedMotion();
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  const ensureContext = useCallback(async () => {
    if (!contextRef.current) {
      contextRef.current = createAudioContext();
    }

    const context = contextRef.current;
    if (!context) return null;

    if (context.state === "suspended") {
      await context.resume().catch(() => undefined);
    }

    return context;
  }, []);

  const playOpenPop = useCallback(async () => {
    if (reducedMotion) return;

    const context = await ensureContext();
    if (!context) return;

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(540, now);
    oscillator.frequency.exponentialRampToValueAtTime(260, now + 0.09);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.16);
  }, [ensureContext, reducedMotion]);

  const playSendWhoosh = useCallback(async () => {
    if (reducedMotion || !isChatSendSoundEnabled()) return;

    const context = await ensureContext();
    if (!context) return;

    const now = context.currentTime;
    const duration = 0.17;
    const sampleCount = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
    const samples = buffer.getChannelData(0);

    for (let index = 0; index < sampleCount; index += 1) {
      const fade = 1 - index / sampleCount;
      samples[index] = (Math.random() * 2 - 1) * fade * fade;
    }

    const source = context.createBufferSource();
    source.buffer = buffer;

    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + duration);
    filter.Q.value = 0.7;

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(now);
    source.stop(now + duration);
  }, [ensureContext, reducedMotion]);

  return { playOpenPop, playSendWhoosh };
}
