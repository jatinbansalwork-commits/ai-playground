"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { EmojiBurstButton } from "@/components/effects/emoji-burst-button";
import { FOCUS_RING } from "@/lib/a11y";
import {
  trackCaseStudyAccessRequest,
  trackCaseStudyAccessUnlock,
} from "@/lib/analytics";
import {
  CASE_STUDY_ACCESS_PRESS_TARGET,
  isCaseStudyAccessGated,
  isValidCaseStudyAccessEmail,
  normaliseCaseStudyEmail,
  persistCaseStudyAccessUnlock,
  queueCaseStudyAccessLog,
  readCaseStudyAccessUnlock,
} from "@/lib/case-study-password-gate";
import { PRESENCE_ACCENT, PRESENCE_ACCENT_FOREGROUND, SITE_CANVAS } from "@/lib/constants";

interface CaseStudyPasswordGateProps {
  slug: string;
  title?: string;
  children: ReactNode;
}

const UNLOCK_PRESS_BEATS = [
  {
    label: "Unlock",
    hint: '😉 Just press "Unlock" 3 times',
    emojis: "🔓,✨,😄,⭐,🎉",
    burstCount: 12,
    power: 10,
    spread: 48,
    emojiSize: 18,
    shakeIntensity: 7,
    hapticPattern: [18, 28, 18] as number[],
  },
  {
    label: "Harder…",
    hint: "😂 Cute. That barely counted.",
    emojis: "😂,💥,🔥,🥳,✨,🎊",
    burstCount: 20,
    power: 14,
    spread: 62,
    emojiSize: 22,
    shakeIntensity: 12,
    hapticPattern: [22, 35, 22, 35, 28] as number[],
  },
  {
    label: "One more!",
    hint: "🫨 Last smash — make it dramatic",
    emojis: "🫨,🚀,💥,🎉,🤩,🔓,⭐,🎊,🔥",
    burstCount: 30,
    power: 18,
    spread: 78,
    emojiSize: 26,
    shakeIntensity: 18,
    hapticPattern: [30, 40, 30, 40, 55, 40, 70] as number[],
  },
] as const;

/**
 * Full body content stays blurred. Visitor enters email (logged), then presses
 * the unlock button three times to reveal the case study.
 */
export function CaseStudyPasswordGate({
  slug,
  title = "this case study",
  children,
}: CaseStudyPasswordGateProps) {
  const gated = isCaseStudyAccessGated(slug);
  const inputId = useId();
  const [ready, setReady] = useState(!gated);
  const [unlocked, setUnlocked] = useState(!gated);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [pressCount, setPressCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gated) {
      setReady(true);
      setUnlocked(true);
      return;
    }
    setUnlocked(readCaseStudyAccessUnlock(slug));
    setReady(true);
  }, [gated, slug]);

  const captureEmail = useCallback(() => {
    if (!isValidCaseStudyAccessEmail(email)) {
      setError("Enter a valid email address to continue.");
      return false;
    }

    const normalised = normaliseCaseStudyEmail(email);
    setEmail(normalised);
    setEmailCaptured(true);
    setError(null);
    setPressCount(0);
    queueCaseStudyAccessLog({ email: normalised, slug, title });
    trackCaseStudyAccessRequest(slug);
    return true;
  }, [email, slug, title]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!emailCaptured) {
        captureEmail();
        return;
      }

      const nextPress = pressCount + 1;
      setPressCount(nextPress);

      if (nextPress < CASE_STUDY_ACCESS_PRESS_TARGET) {
        return;
      }

      persistCaseStudyAccessUnlock(slug);
      trackCaseStudyAccessUnlock(slug);
      setUnlocked(true);
    },
    [captureEmail, emailCaptured, pressCount, slug],
  );

  if (!gated || unlocked) {
    return <>{children}</>;
  }

  const emailValid = isValidCaseStudyAccessEmail(email);
  const canSubmit = emailCaptured || emailValid;
  const unlockBeat =
    UNLOCK_PRESS_BEATS[
      Math.min(pressCount, UNLOCK_PRESS_BEATS.length - 1)
    ];
  const buttonLabel = emailCaptured ? unlockBeat.label : "Unlock case study";
  const unlockHint = emailCaptured ? unlockBeat.hint : null;

  return (
    <div className="relative isolate mt-10 md:mt-14">
      {ready ? (
        <div className="sticky top-24 z-20 flex justify-center px-4 py-6 md:top-28 md:py-8">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md overflow-visible rounded-2xl border border-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8"
            style={{ backgroundColor: SITE_CANVAS }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${inputId}-heading`}
          >
            <h2
              id={`${inputId}-heading`}
              className="text-balance text-center text-2xl font-medium tracking-tight text-white"
            >
              Unlock {title}
            </h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-neutral-400">
              This one isn&apos;t public. The AI firewall creation experience at
              Cisco is gated — enter your email to continue.
            </p>

            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              name="case-study-email"
              autoComplete="email"
              inputMode="email"
              autoFocus={!emailCaptured}
              readOnly={emailCaptured}
              value={email}
              onChange={(event) => {
                if (emailCaptured) return;
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter your email"
              className={`mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition-[border-color,box-shadow] focus:border-[color:var(--presence-accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--presence-accent)_28%,transparent)] read-only:opacity-80 ${FOCUS_RING}`}
            />

            {unlockHint ? (
              <p className="mt-3 text-center text-sm text-neutral-400" aria-live="polite">
                {unlockHint}
              </p>
            ) : null}

            {error ? (
              <p className="mt-3 text-center text-sm text-red-300" role="alert">
                {error}
              </p>
            ) : null}

            <EmojiBurstButton
              type="submit"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              burstEnabled={emailCaptured}
              emojis={unlockBeat.emojis}
              burstCount={unlockBeat.burstCount}
              power={unlockBeat.power}
              spread={unlockBeat.spread}
              emojiSize={unlockBeat.emojiSize}
              shakeIntensity={unlockBeat.shakeIntensity}
              hapticPattern={[...unlockBeat.hapticPattern]}
              className={`relative z-0 inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS_RING}`}
              style={{
                background: PRESENCE_ACCENT,
                color: PRESENCE_ACCENT_FOREGROUND,
              }}
            >
              {buttonLabel}
            </EmojiBurstButton>
          </form>
        </div>
      ) : null}

      <div
        className="pointer-events-none relative z-0 -mt-48 select-none blur-xl md:-mt-56 [&_a]:pointer-events-none [&_button]:pointer-events-none [&_input]:pointer-events-none [&_textarea]:pointer-events-none"
        aria-hidden
        inert
      >
        {children}
      </div>
    </div>
  );
}
