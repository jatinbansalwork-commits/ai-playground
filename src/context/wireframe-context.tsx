"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface WireframeContextValue {
  wireframe: boolean;
  toggleWireframe: () => void;
}

const WireframeContext = createContext<WireframeContextValue | null>(null);

export function WireframeProvider({ children }: { children: ReactNode }) {
  const [wireframe, setWireframe] = useState(false);

  const value = useMemo(
    () => ({
      wireframe,
      toggleWireframe: () => setWireframe((current) => !current),
    }),
    [wireframe],
  );

  return (
    <WireframeContext.Provider value={value}>{children}</WireframeContext.Provider>
  );
}

export function useWireframe() {
  const context = useContext(WireframeContext);
  if (!context) {
    throw new Error("useWireframe must be used within WireframeProvider");
  }
  return context;
}
