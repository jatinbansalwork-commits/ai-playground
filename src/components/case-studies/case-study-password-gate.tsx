"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import { PRESENCE_ACCENT, PRESENCE_ACCENT_FOREGROUND } from "@/lib/constants";

const GATE_SURFACE = "#FFFFFF";
const GATE_INK = "#0A0A0A";
const GATE_MUTED = "#525252";

interface CaseStudyPasswordGateProps {
  slug: string;
  title?: string;
  children: ReactNode;
}

const UNLOCK_PRESS_BEATS = [
  {
    label: "Tap to unlock",
    hint: "Three taps. Make them count.",
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
    hint: "Cute. That barely counted.",
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
    hint: "Last smash — make it dramatic.",
    emojis: "🫨,🚀,💥,🎉,🤩,🔓,⭐,🎊,🔥",
    burstCount: 30,
    power: 18,
    spread: 78,
    emojiSize: 26,
    shakeIntensity: 18,
    hapticPattern: [30, 40, 30, 40, 55, 40, 70] as number[],
  },
] as const;

function LockGlyph({
  open,
  typing,
  ready,
  reduceMotion,
}: {
  open: boolean;
  typing: boolean;
  ready: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(15,23,42,0.06)]"
      animate={
        reduceMotion
          ? undefined
          : open
            ? { scale: [1, 1.06, 1], rotate: [0, -2, 0] }
            : typing
              ? { rotate: [0, -4, 3, 0], y: [0, -1, 0] }
              : ready
                ? { scale: [1, 1.03, 1] }
                : { scale: 1 }
      }
      transition={
        open
          ? { duration: 0.55, ease: "easeOut" }
          : typing
            ? { duration: 0.28 }
            : ready
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
      }
    >
      {!reduceMotion && (ready || open) ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: `0 0 0 1px color-mix(in srgb, ${PRESENCE_ACCENT} 40%, transparent), 0 0 24px color-mix(in srgb, ${PRESENCE_ACCENT} 22%, transparent)`,
          }}
          animate={{ opacity: open ? [0.35, 0.85, 0.5] : [0.15, 0.45, 0.15] }}
          transition={{ duration: open ? 0.7 : 2.4, repeat: open ? 0 : Infinity }}
        />
      ) : null}
      <svg viewBox="0 0 48 48" className="relative h-10 w-10" fill="none" aria-hidden>
        <motion.g
          initial={false}
          animate={{
            rotate: open ? -22 : 0,
            x: open ? 3 : 0,
            y: open ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 340, damping: 18 }}
          style={{ transformOrigin: "34px 16px" }}
        >
          <path
            d="M16 22V16a8 8 0 0 1 16 0v6"
            stroke={PRESENCE_ACCENT}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.g>
        <rect
          x="12"
          y="22"
          width="24"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-neutral-800"
        />
        <motion.circle
          cx="24"
          cy="31"
          r="2.5"
          fill={PRESENCE_ACCENT}
          animate={{ scale: open ? [1, 1.4, 1] : ready ? [1, 1.15, 1] : 1 }}
          transition={
            open
              ? { duration: 0.45 }
              : ready
                ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
          }
        />
      </svg>
    </motion.div>
  );
}

function PressProgress({
  pressCount,
  target,
  reduceMotion,
}: {
  pressCount: number;
  target: number;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className="mt-5 flex items-center justify-center gap-2.5"
      aria-label={`${pressCount} of ${target} unlock taps`}
    >
      {Array.from({ length: target }, (_, index) => {
        const filled = index < pressCount;
        const active = index === pressCount;
        return (
          <motion.span
            key={index}
            className="relative h-2.5 w-8 overflow-hidden rounded-full"
            style={{
              backgroundColor: filled
                ? PRESENCE_ACCENT
                : "rgba(15,23,42,0.08)",
              boxShadow: active
                ? `0 0 0 1px color-mix(in srgb, ${PRESENCE_ACCENT} 45%, transparent), 0 0 16px color-mix(in srgb, ${PRESENCE_ACCENT} 28%, transparent)`
                : filled
                  ? `0 0 14px color-mix(in srgb, ${PRESENCE_ACCENT} 30%, transparent)`
                  : undefined,
            }}
            initial={false}
            animate={
              reduceMotion
                ? { scale: 1 }
                : filled
                  ? { scale: [1, 1.18, 1] }
                  : active
                    ? { opacity: [0.45, 1, 0.45], scale: [1, 1.04, 1] }
                    : { opacity: 1, scale: 1 }
            }
            transition={
              filled
                ? { duration: 0.35, ease: "easeOut" }
                : active
                  ? { duration: 1.25, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
            }
          />
        );
      })}
    </div>
  );
}

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
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(!gated);
  const [unlocked, setUnlocked] = useState(!gated);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [pressCount, setPressCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [justCaptured, setJustCaptured] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [typingPulse, setTypingPulse] = useState(0);
  const [shakeToken, setShakeToken] = useState(0);

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
      setError("Enter a valid email so I know who unlocked this.");
      setShakeToken((value) => value + 1);
      return false;
    }

    const normalised = normaliseCaseStudyEmail(email);
    setEmail(normalised);
    setEmailCaptured(true);
    setJustCaptured(true);
    setError(null);
    setPressCount(0);
    queueCaseStudyAccessLog({ email: normalised, slug, title });
    trackCaseStudyAccessRequest(slug);
    window.setTimeout(() => setJustCaptured(false), 1200);
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
  const buttonLabel = emailCaptured ? unlockBeat.label : "Continue";
  const phaseTitle = emailCaptured
    ? "Almost there"
    : `Unlock ${title}`;
  const phaseBody = emailCaptured
    ? "This one’s under wraps. Tap the button three times to open the full case study."
    : "This one’s under wraps — the AI firewall creation experience at Cisco isn’t public yet. Drop your email and I’ll unlock it for you.";

  return (
    <div className="relative isolate mt-10 md:mt-14">
      {ready ? (
        <div className="sticky top-24 z-20 flex justify-center px-4 py-6 md:top-28 md:py-8">
          <motion.form
            key={shakeToken}
            onSubmit={handleSubmit}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${inputId}-heading`}
            aria-describedby={`${inputId}-copy`}
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={
              shakeToken > 0 && !reduceMotion
                ? { opacity: 1, y: 0, scale: 1, x: [0, -8, 7, -5, 3, 0] }
                : { opacity: 1, y: 0, scale: 1, x: 0 }
            }
            transition={
              shakeToken > 0 && !reduceMotion
                ? { duration: 0.42, ease: "easeOut" }
                : { type: "spring", stiffness: 280, damping: 28 }
            }
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-8"
            style={{
              background: `radial-gradient(120% 90% at 50% -10%, color-mix(in srgb, ${PRESENCE_ACCENT} ${emailCaptured ? 20 : inputFocused || emailValid ? 14 : 9}%, white), ${GATE_SURFACE})`,
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${PRESENCE_ACCENT}, transparent)`,
              }}
              animate={{
                opacity: emailCaptured || emailValid ? 0.9 : 0.45,
                scaleX: emailCaptured || emailValid ? 1 : 0.72,
              }}
              transition={{ duration: 0.35 }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full blur-3xl"
              style={{
                background: `color-mix(in srgb, ${PRESENCE_ACCENT} 28%, transparent)`,
              }}
              animate={{
                opacity: emailCaptured ? 0.55 : emailValid ? 0.4 : inputFocused ? 0.3 : 0.18,
                scale: emailCaptured ? 1.15 : 1,
              }}
            />

            <div className="relative flex flex-col items-center text-center">
              <LockGlyph
                open={emailCaptured}
                typing={typingPulse > 0 && !emailCaptured}
                ready={emailValid && !emailCaptured}
                reduceMotion={reduceMotion}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={emailCaptured ? "unlock" : "email"}
                  initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -8, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="mt-5"
                >
                  <h2
                    id={`${inputId}-heading`}
                    className="text-balance text-2xl font-medium tracking-tight sm:text-[1.75rem]"
                    style={{ color: GATE_INK }}
                  >
                    {phaseTitle}
                  </h2>
                  <p
                    id={`${inputId}-copy`}
                    className="mx-auto mt-2 max-w-[34ch] text-sm leading-relaxed"
                    style={{ color: GATE_MUTED }}
                  >
                    {phaseBody}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-6">
              <AnimatePresence mode="wait" initial={false}>
                {!emailCaptured ? (
                  <motion.div
                    key="email-field"
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion
                        ? undefined
                        : { opacity: 0, y: -12, scale: 0.98 }
                    }
                    transition={{ duration: 0.26 }}
                  >
                    <label htmlFor={inputId} className="sr-only">
                      Email address
                    </label>
                    <motion.div
                      className="relative"
                      animate={
                        reduceMotion
                          ? undefined
                          : emailValid
                            ? { scale: [1, 1.015, 1] }
                            : { scale: 1 }
                      }
                      transition={{ duration: 0.35 }}
                    >
                      <input
                        id={inputId}
                        type="email"
                        name="case-study-email"
                        autoComplete="email"
                        inputMode="email"
                        autoFocus
                        value={email}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setTypingPulse((value) => value + 1);
                          if (error) setError(null);
                        }}
                        placeholder="@email.com"
                        aria-invalid={error ? true : undefined}
                        aria-describedby={
                          error ? `${inputId}-error` : `${inputId}-privacy`
                        }
                        className={`w-full rounded-2xl border bg-neutral-50 px-4 py-3.5 pr-11 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-[border-color,box-shadow,background-color] ${
                          emailValid
                            ? "border-[color:var(--presence-accent)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--presence-accent)_18%,transparent)]"
                            : "border-neutral-200 focus:border-[color:var(--presence-accent)] focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--presence-accent)_20%,transparent)]"
                        } ${FOCUS_RING}`}
                      />
                      <AnimatePresence>
                        {emailValid ? (
                          <motion.span
                            key="check"
                            aria-hidden
                            initial={
                              reduceMotion ? false : { opacity: 0, scale: 0.4 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{
                              type: "spring",
                              stiffness: 480,
                              damping: 22,
                            }}
                            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm"
                            style={{ color: PRESENCE_ACCENT }}
                          >
                            ✓
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                    <p
                      id={`${inputId}-privacy`}
                      className="mt-2.5 text-center text-xs leading-relaxed text-neutral-500"
                    >
                      No newsletter, no spam — just this unlock.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email-chip"
                    initial={
                      reduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-center"
                    style={{
                      boxShadow: justCaptured
                        ? `0 0 0 1px color-mix(in srgb, ${PRESENCE_ACCENT} 35%, transparent), 0 0 24px color-mix(in srgb, ${PRESENCE_ACCENT} 16%, transparent)`
                        : undefined,
                    }}
                  >
                    <p className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
                      Unlocking for
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-neutral-900">
                      {email}
                    </p>
                    <AnimatePresence>
                      {justCaptured ? (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-1 text-xs"
                          style={{ color: PRESENCE_ACCENT }}
                        >
                          Email saved — now the fun part.
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {emailCaptured ? (
                  <motion.div
                    key="press-ui"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <PressProgress
                      pressCount={pressCount}
                      target={CASE_STUDY_ACCESS_PRESS_TARGET}
                      reduceMotion={reduceMotion}
                    />
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={unlockBeat.hint}
                        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                        className="mt-3 text-center text-sm text-neutral-500"
                        aria-live="polite"
                      >
                        {unlockBeat.hint}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {error ? (
                <motion.p
                  id={`${inputId}-error`}
                  className="mt-3 text-center text-sm text-red-600"
                  role="alert"
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              ) : null}

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : canSubmit
                      ? { y: 0, opacity: 1, scale: 1 }
                      : { y: 0, opacity: 0.72, scale: 0.985 }
                }
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
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
                  className={`relative z-0 inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold tracking-tight transition-[opacity,transform,box-shadow] enabled:hover:brightness-110 enabled:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35 ${FOCUS_RING}`}
                  style={{
                    background: PRESENCE_ACCENT,
                    color: PRESENCE_ACCENT_FOREGROUND,
                    boxShadow: canSubmit
                      ? `0 12px 40px color-mix(in srgb, ${PRESENCE_ACCENT} ${emailCaptured ? 45 : 32}%, transparent)`
                      : undefined,
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={buttonLabel}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      {buttonLabel}
                    </motion.span>
                  </AnimatePresence>
                </EmojiBurstButton>
              </motion.div>
            </div>
          </motion.form>
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
