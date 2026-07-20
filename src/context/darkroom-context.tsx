"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const DARKROOM_STORAGE_KEY = "jb_darkroom_mode";
const DARKROOM_CLASS = "darkroom-mode";
const DARKROOM_CHANGE_EVENT = "jb-darkroom-change";

interface DarkroomContextValue {
  darkroom: boolean;
  toggleDarkroom: () => void;
  setDarkroom: (enabled: boolean) => void;
}

const DarkroomContext = createContext<DarkroomContextValue | null>(null);

function readStoredDarkroom(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(DARKROOM_STORAGE_KEY) === "1";
}

function persistDarkroom(enabled: boolean): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(DARKROOM_STORAGE_KEY, enabled ? "1" : "0");
  syncDarkroomClass(enabled);
  window.dispatchEvent(new Event(DARKROOM_CHANGE_EVENT));
}

function syncDarkroomClass(enabled: boolean): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle(DARKROOM_CLASS, enabled);
}

function subscribeDarkroom(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(DARKROOM_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(DARKROOM_CHANGE_EVENT, onStoreChange);
}

export function DarkroomProvider({ children }: { children: ReactNode }) {
  const darkroom = useSyncExternalStore(
    subscribeDarkroom,
    readStoredDarkroom,
    () => false,
  );

  useLayoutEffect(() => {
    syncDarkroomClass(darkroom);
  }, [darkroom]);

  const setDarkroom = useCallback((enabled: boolean) => {
    persistDarkroom(enabled);
  }, []);

  const toggleDarkroom = useCallback(() => {
    persistDarkroom(!readStoredDarkroom());
  }, []);

  const value = useMemo(
    () => ({
      darkroom,
      toggleDarkroom,
      setDarkroom,
    }),
    [darkroom, toggleDarkroom, setDarkroom],
  );

  return (
    <DarkroomContext.Provider value={value}>{children}</DarkroomContext.Provider>
  );
}

export function useDarkroom() {
  const context = useContext(DarkroomContext);
  if (!context) {
    throw new Error("useDarkroom must be used within DarkroomProvider");
  }
  return context;
}
