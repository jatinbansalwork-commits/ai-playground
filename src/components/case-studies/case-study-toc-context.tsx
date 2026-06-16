"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { slugifyCaseStudyHeading } from "@/lib/case-study-heading";

interface CaseStudyHeadingRegistryValue {
  allocateId: (title: string) => string;
}

const CaseStudyHeadingRegistryContext =
  createContext<CaseStudyHeadingRegistryValue | null>(null);

/** Provides stable in-page heading ids for anchor links and focus management. */
export function CaseStudyTocProvider({ children }: { children: ReactNode }) {
  const usedIdsRef = useRef(new Set<string>());

  const allocateId = useCallback((title: string) => {
    const base = slugifyCaseStudyHeading(title) || "section";
    let id = base;
    let suffix = 2;

    while (usedIdsRef.current.has(id)) {
      id = `${base}-${suffix}`;
      suffix += 1;
    }

    usedIdsRef.current.add(id);
    return id;
  }, []);

  const value = useMemo(() => ({ allocateId }), [allocateId]);

  return (
    <CaseStudyHeadingRegistryContext.Provider value={value}>
      {children}
    </CaseStudyHeadingRegistryContext.Provider>
  );
}

export function useCaseStudyHeading(
  title: string,
  _level: 2 | 3,
  _enabled = true,
): { id: string; title: string } {
  const registry = useContext(CaseStudyHeadingRegistryContext);
  const idRef = useRef<string | null>(null);

  if (!idRef.current) {
    idRef.current = registry
      ? registry.allocateId(title)
      : slugifyCaseStudyHeading(title) || "section";
  }

  const id = idRef.current;

  return { id, title };
}
