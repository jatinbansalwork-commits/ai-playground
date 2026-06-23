"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const BAR_COUNT = 16;
const IDLE_LEVEL = 0.12;

export function formatRecordingTime(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function createIdleLevels(): number[] {
  return Array.from({ length: BAR_COUNT }, () => IDLE_LEVEL);
}

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

export function useAiVoiceRecording(active: boolean) {
  const reducedMotion = useReducedMotion();
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [levels, setLevels] = useState<number[]>(createIdleLevels);
  const [error, setError] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingStartedAtRef = useRef(0);
  const idlePhaseRef = useRef(0);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    analyserRef.current?.disconnect();
    analyserRef.current = null;
    stopTracks();

    void contextRef.current?.close().catch(() => undefined);
    contextRef.current = null;

    setIsRecording(false);
  }, [stopTracks]);

  const tickVisualizer = useCallback(() => {
    const analyser = analyserRef.current;

    if (!analyser) {
      idlePhaseRef.current += reducedMotion ? 0 : 0.08;
      const phase = idlePhaseRef.current;

      setLevels(
        Array.from({ length: BAR_COUNT }, (_, index) => {
          const wave = Math.sin(phase + index * 0.55) * 0.5 + 0.5;
          return IDLE_LEVEL + wave * 0.08;
        }),
      );

      animationRef.current = requestAnimationFrame(tickVisualizer);
      return;
    }

    const buffer = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(buffer);
    const step = Math.max(1, Math.floor(buffer.length / BAR_COUNT));

    setLevels(
      Array.from({ length: BAR_COUNT }, (_, index) => {
        const sample = buffer[index * step] ?? 0;
        const normalized = sample / 255;
        return IDLE_LEVEL + normalized * 0.88;
      }),
    );

    animationRef.current = requestAnimationFrame(tickVisualizer);
  }, [reducedMotion]);

  const startRecording = useCallback(async () => {
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Microphone not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = createAudioContext();

      if (!context) {
        stream.getTracks().forEach((track) => track.stop());
        setError("Audio playback is unavailable.");
        return;
      }

      if (context.state === "suspended") {
        await context.resume().catch(() => undefined);
      }

      const analyser = context.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.82;

      const source = context.createMediaStreamSource(stream);
      source.connect(analyser);

      streamRef.current = stream;
      contextRef.current = context;
      analyserRef.current = analyser;
      recordingStartedAtRef.current = Date.now();
      setElapsedMs(0);
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setElapsedMs(Date.now() - recordingStartedAtRef.current);
      }, 200);
    } catch {
      stopTracks();
      setError("Microphone access was denied.");
    }
  }, [stopTracks]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
      return;
    }

    void startRecording();
  }, [isRecording, startRecording, stopRecording]);

  useEffect(() => {
    if (!active) {
      stopRecording();
      setElapsedMs(0);
      setError(null);
      setLevels(createIdleLevels());

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }

      return;
    }

    animationRef.current = requestAnimationFrame(tickVisualizer);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
    };
  }, [active, stopRecording, tickVisualizer]);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);

  return {
    isRecording,
    elapsedMs,
    levels,
    error,
    toggleRecording,
    timerLabel: formatRecordingTime(elapsedMs),
  };
}
