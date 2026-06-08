"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

interface SliderContextValue {
  trackX: MotionValue<number>;
  minimapX: MotionValue<number>;
  scale: MotionValue<number>;
}

const SliderContext = createContext<SliderContextValue | null>(null);

export function SliderProvider({ children }: { children: ReactNode }) {
  const trackX = useMotionValue(0);
  const minimapX = useMotionValue(0);
  const scale = useMotionValue(1);

  const value = useMemo(
    () => ({ trackX, minimapX, scale }),
    [trackX, minimapX, scale],
  );

  return (
    <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
  );
}

export function useSliderContext() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSliderContext must be used within SliderProvider");
  }
  return context;
}
