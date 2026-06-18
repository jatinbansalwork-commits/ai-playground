"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const WIREFRAME_STORAGE_KEY = "jb_wireframe_mode";

interface WireframeContextValue {
  wireframe: boolean;
  toggleWireframe: () => void;
  setWireframe: (enabled: boolean) => void;
}

const WireframeContext = createContext<WireframeContextValue | null>(null);

function readStoredWireframe(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(WIREFRAME_STORAGE_KEY) === "1";
}

function persistWireframe(enabled: boolean): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(WIREFRAME_STORAGE_KEY, enabled ? "1" : "0");
}

export function WireframeProvider({ children }: { children: ReactNode }) {
  const [wireframe, setWireframeState] = useState(false);

  useEffect(() => {
    setWireframeState(readStoredWireframe());
  }, []);

  const setWireframe = useCallback((enabled: boolean) => {
    setWireframeState(enabled);
    persistWireframe(enabled);
  }, []);

  const toggleWireframe = useCallback(() => {
    setWireframeState((current) => {
      const next = !current;
      persistWireframe(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      wireframe,
      toggleWireframe,
      setWireframe,
    }),
    [wireframe, toggleWireframe, setWireframe],
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
