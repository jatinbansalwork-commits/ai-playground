"use client";

import { useAiVoiceRecording } from "@/hooks/use-ai-voice-recording";
import { FOCUS_RING } from "@/lib/a11y";

interface AiVoiceInputProps {
  active?: boolean;
  id?: string;
}

function MicIcon({ recording }: { recording: boolean }) {
  if (recording) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <rect x="4" y="4" width="8" height="8" rx="1.5" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M8 1.25a2.25 2.25 0 0 0-2.25 2.25V8A2.25 2.25 0 0 0 8 10.25 2.25 2.25 0 0 0 10.25 8V3.5A2.25 2.25 0 0 0 8 1.25Z"
        fill="currentColor"
      />
      <path
        d="M4.25 7.25a.75.75 0 0 0-1.5 0V8a4.75 4.75 0 0 0 4.25 4.7V13h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5H9.5v-.3A4.75 4.75 0 0 0 13.75 8v-.75a.75.75 0 0 0-1.5 0V8a3.25 3.25 0 0 1-6.5 0v-.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AiVoiceInput({ active = true, id }: AiVoiceInputProps) {
  const { isRecording, levels, error, toggleRecording, timerLabel } =
    useAiVoiceRecording(active);

  return (
    <div
      id={id}
      className="ai-voice-input"
      role="group"
      aria-label="Voice input with visualizer and recording timer"
    >
      <div className="ai-voice-input__shell">
        <div
          className="ai-voice-input__visualizer"
          aria-hidden={!isRecording}
          data-recording={isRecording ? "true" : "false"}
        >
          {levels.map((level, index) => (
            <span
              key={index}
              className="ai-voice-input__bar"
              style={{ transform: `scaleY(${level})` }}
            />
          ))}
        </div>

        <div className="ai-voice-input__controls">
          <span
            className="ai-voice-input__timer"
            role="timer"
            aria-live="polite"
            aria-label={`Recording time ${timerLabel}`}
          >
            {timerLabel}
          </span>

          <button
            type="button"
            className={`ai-voice-input__mic ${FOCUS_RING}`}
            onClick={toggleRecording}
            aria-pressed={isRecording}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <MicIcon recording={isRecording} />
          </button>
        </div>
      </div>

      {error ? (
        <p className="ai-voice-input__error" role="status">
          {error}
        </p>
      ) : (
        <p className="ai-voice-input__hint">
          {isRecording ? "Listening…" : "Tap the mic to start voice input."}
        </p>
      )}
    </div>
  );
}
