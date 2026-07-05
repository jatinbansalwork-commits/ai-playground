"use client";

import type { ReactNode } from "react";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

type IconProps = { className?: string };

function Svg({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg className={cn("shrink-0", className)} viewBox="0 0 16 16" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M8 1.5l4.5 1.8v3.7c0 3.2-2.2 5.1-4.5 5.5-2.3-.4-4.5-2.3-4.5-5.5V3.3L8 1.5z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 8l1.5 1.5 3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  );
}

export function CrosshairIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  );
}

export function UsersImpactIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 13c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10 13c.2-1.6 1.2-2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </Svg>
  );
}

export function ConflictIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 4h10M3 8h6M3 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 10l2 2M14 10l-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  );
}

export function BlastRadiusIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </Svg>
  );
}

export type EntityTypeIconId =
  | "identity"
  | "application"
  | "saas"
  | "database"
  | "zone"
  | "device"
  | "audit"
  | "schedule"
  | "default";

export function EntityTypeIcon({ type, className }: { type: EntityTypeIconId; className?: string }) {
  const paths: Record<EntityTypeIconId, ReactNode> = {
    identity: (
      <>
        <circle cx="8" cy="5.5" r="2.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.5 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    application: <path d="M4 4h8v8H4zM6 6h4M6 9h4" stroke="currentColor" strokeWidth="1.2" />,
    saas: (
      <>
        <path d="M3 11l5-7 5 7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    database: (
      <>
        <ellipse cx="8" cy="5" rx="4.5" ry="1.8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.5 5v6c0 1 2 1.8 4.5 1.8S12.5 12 12.5 11V5" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
    zone: (
      <>
        <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
      </>
    ),
    device: (
      <>
        <rect x="5" y="2.5" width="6" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 12.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    audit: (
      <>
        <path d="M4 3h6l2 2v8H4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 8h4M6 10.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </>
    ),
    schedule: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    default: <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.2" />,
  };
  return <Svg className={className}>{paths[type]}</Svg>;
}

export type FrameworkIconId =
  | "HIPAA"
  | "SOX"
  | "SOC 2"
  | "ISO 27001"
  | "PCI"
  | "Acceptable use"
  | "Golden config"
  | "default";

export function FrameworkStrokeIcon({ framework, className }: { framework: string; className?: string }) {
  const id = (Object.keys(FRAMEWORK_PATHS).find((k) => framework.includes(k)) ?? "default") as FrameworkIconId;
  return <Svg className={className}>{FRAMEWORK_PATHS[id]}</Svg>;
}

const FRAMEWORK_PATHS: Record<FrameworkIconId, ReactNode> = {
  HIPAA: (
    <>
      <path d="M8 2v12M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  SOX: (
    <>
      <path d="M3 12V5l5-2 5 2v7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 9h4M6 11h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  "SOC 2": (
    <>
      <rect x="4.5" y="6" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 6V5a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  "ISO 27001": <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />,
  PCI: (
    <>
      <rect x="2.5" y="5" width="11" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  "Acceptable use": (
    <>
      <path d="M4 4h8v8H4z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 7h4M6 10h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  "Golden config": (
    <>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  default: <path d="M4 8l2.5 2.5L12 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />,
};

export function SafetyCheckIcon({
  kind,
  className,
}: {
  kind: "shield" | "crosshair" | "users" | "conflict";
  className?: string;
}) {
  switch (kind) {
    case "shield":
      return <ShieldCheckIcon className={className} />;
    case "crosshair":
      return <CrosshairIcon className={className} />;
    case "users":
      return <UsersImpactIcon className={className} />;
    case "conflict":
      return <ConflictIcon className={className} />;
  }
}
