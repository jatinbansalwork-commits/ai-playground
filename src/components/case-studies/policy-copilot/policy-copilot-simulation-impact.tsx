"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { BlastRadiusIcon, EntityTypeIcon, UsersImpactIcon } from "@/components/case-studies/policy-copilot/policy-copilot-icons";
import { CLAUDE, COPILOT_TYPE, LIVING_MOTION } from "@/components/case-studies/policy-copilot/policy-copilot-momentum";
import { cn } from "@/components/case-studies/policy-copilot/policy-copilot-ui";

const IMPACT_LAYERS = [
  {
    id: "users",
    label: "Users gaining access",
    value: "240 doctors",
    detail: "Doctors-AD-Group · managed hospital endpoints only",
    tone: "allow" as const,
    icon: UsersImpactIcon,
  },
  {
    id: "apps",
    label: "Applications reachable",
    value: "EHR + audit trail",
    detail: "Electronic Health Records · session logging enabled",
    tone: "allow" as const,
    icon: () => <EntityTypeIcon type="application" className="h-4 w-4" />,
  },
  {
    id: "paths",
    label: "Traffic paths",
    value: "2 new allow paths",
    detail: "Clinical user segment → application tier · HTTPS 443",
    tone: "neutral" as const,
    icon: () => <EntityTypeIcon type="zone" className="h-4 w-4" />,
  },
  {
    id: "blast",
    label: "Blast radius",
    value: "Low impact",
    detail: "Nurses and contractors excluded · no lateral movement",
    tone: "warn" as const,
    icon: BlastRadiusIcon,
  },
] as const;

const ILLUSTRATION_ARIA_LABEL =
  "Simulation and impact analysis — network visualisation of affected users, applications, traffic paths, and blast radius before deployment.";

function toneStyles(tone: "allow" | "warn" | "neutral") {
  if (tone === "allow") {
    return { accent: CLAUDE.validated, muted: CLAUDE.validatedMuted };
  }
  if (tone === "warn") {
    return { accent: CLAUDE.warning, muted: CLAUDE.warningMuted };
  }
  return { accent: CLAUDE.primary, muted: CLAUDE.primaryMuted };
}

function NetworkNode({
  x,
  y,
  label,
  sublabel,
  active,
  tone = "neutral",
}: {
  x: number;
  y: number;
  label: string;
  sublabel: string;
  active?: boolean;
  tone?: "allow" | "warn" | "neutral";
}) {
  const { accent, muted } = toneStyles(tone);

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-52}
        y={-22}
        width={104}
        height={44}
        rx={10}
        fill={active ? muted : CLAUDE.surfaceOverlay}
        stroke={active ? accent : CLAUDE.hairline}
        strokeWidth={active ? 1.5 : 1}
      />
      <text
        x={0}
        y={-2}
        textAnchor="middle"
        fill={CLAUDE.text}
        fontSize={11}
        fontWeight={500}
        fontFamily={CLAUDE.fontBody}
      >
        {label}
      </text>
      <text
        x={0}
        y={12}
        textAnchor="middle"
        fill={CLAUDE.textMuted}
        fontSize={9}
        fontFamily={CLAUDE.fontBody}
      >
        {sublabel}
      </text>
    </g>
  );
}

function ImpactLayerCard({
  layer,
  selected,
  onSelect,
}: {
  layer: (typeof IMPACT_LAYERS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const { accent, muted } = toneStyles(layer.tone);
  const Icon = layer.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
        !selected && "hover:bg-white/[0.02]",
      )}
      style={{
        backgroundColor: selected ? muted : CLAUDE.surfaceOverlay,
        boxShadow: selected ? `inset 0 0 0 1px ${accent}55` : `inset 0 0 0 1px ${CLAUDE.hairline}`,
      }}
      aria-pressed={selected}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: muted, color: accent }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
          <span className="text-[12px] font-medium" style={{ color: CLAUDE.text }}>
            {layer.label}
          </span>
          <span className="text-[11px] font-medium tabular-nums" style={{ color: accent }}>
            {layer.value}
          </span>
        </span>
        <span className="mt-0.5 block text-[11px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          {layer.detail}
        </span>
      </span>
    </button>
  );
}

export function PolicyCopilotSimulationImpact() {
  const reduced = useReducedMotion();
  const [focus, setFocus] = useState<(typeof IMPACT_LAYERS)[number]["id"]>("users");

  const w = 520;
  const h = 220;
  const users = { x: 78, y: 72 };
  const devices = { x: 78, y: 148 };
  const firewall = { x: 260, y: 110 };
  const ehr = { x: 442, y: 72 };
  const audit = { x: 442, y: 148 };

  const userPath = `M ${users.x + 52} ${users.y} C 170 ${users.y}, 210 ${firewall.y}, ${firewall.x - 44} ${firewall.y}`;
  const devicePath = `M ${devices.x + 52} ${devices.y} C 170 ${devices.y}, 210 ${firewall.y}, ${firewall.x - 44} ${firewall.y}`;
  const ehrPath = `M ${firewall.x + 44} ${firewall.y - 12} C 330 ${firewall.y - 28}, 380 ${ehr.y}, ${ehr.x - 52} ${ehr.y}`;
  const auditPath = `M ${firewall.x + 44} ${firewall.y + 12} C 330 ${firewall.y + 28}, 380 ${audit.y}, ${audit.x - 52} ${audit.y}`;

  const pathTransition = reduced
    ? { duration: 0 }
    : { duration: 0.9, ease: LIVING_MOTION.confidence.ease };

  const focusLine =
    focus === "users"
      ? "Doctors-AD-Group gains HTTPS access to EHR through the clinical segment."
      : focus === "apps"
        ? "EHR application object and audit logging destination become reachable on approve."
        : focus === "paths"
          ? "Two allow paths light up — identity to firewall, firewall to application tier."
          : "Blast radius stays narrow — 240 in scope, nurses and contractors unchanged.";

  return (
    <figure
      className="overflow-hidden rounded-xl border border-white/10"
      style={{ backgroundColor: "#0D1114" }}
      aria-label={ILLUSTRATION_ARIA_LABEL}
    >
      <div className="border-b px-4 py-4 md:px-5 md:py-5" style={{ borderColor: CLAUDE.hairline }}>
        <p className={cn(COPILOT_TYPE.eyebrow)} style={{ color: CLAUDE.primary }}>
          High-Fidelity UI
        </p>
        <p
          className={cn(COPILOT_TYPE.titleLg, "mt-1")}
          style={{ fontFamily: CLAUDE.fontDisplay, color: CLAUDE.text }}
        >
          Simulation &amp; Impact Analysis
        </p>
        <p className="mt-1 max-w-3xl text-[13px] leading-relaxed" style={{ color: CLAUDE.textMuted }}>
          A modern network visualisation highlighting affected users, applications, traffic paths,
          impacted assets, and blast radius — visual and easy to understand instead of dense technical
          tables.
        </p>
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-5 md:p-5">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
        >
          <div className="flex items-center justify-between gap-3 border-b px-3.5 py-2.5" style={{ borderColor: CLAUDE.hairline }}>
            <div>
              <p className="text-[12px] font-medium" style={{ color: CLAUDE.text }}>
                Deployment preview
              </p>
              <p className="text-[10px]" style={{ color: CLAUDE.textSoft }}>
                Simulated outcome · draft policy
              </p>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: CLAUDE.validatedMuted, color: CLAUDE.validated }}
            >
              Ready to review
            </span>
          </div>

          <div className="px-2 py-3 md:px-3 md:py-4">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full select-none" role="img" aria-hidden>
              <defs>
                <linearGradient id="sim-allow-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={CLAUDE.validated} stopOpacity="0.12" />
                  <stop offset="100%" stopColor={CLAUDE.validated} stopOpacity="0.42" />
                </linearGradient>
                <pattern id="sim-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path
                    d="M 24 0 L 0 0 0 24"
                    fill="none"
                    stroke={CLAUDE.hairline}
                    strokeWidth="0.6"
                  />
                </pattern>
              </defs>
              <rect width={w} height={h} fill="url(#sim-grid)" opacity="0.35" />

              {[userPath, devicePath, ehrPath, auditPath].map((path, index) => (
                <motion.path
                  key={path}
                  d={path}
                  fill="none"
                  stroke={index < 2 ? "rgb(93 184 114 / 0.35)" : "rgb(92 151 238 / 0.45)"}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ ...pathTransition, delay: reduced ? 0 : index * 0.12 }}
                />
              ))}

              {(focus === "users" || focus === "paths") && !reduced ? (
                <motion.path
                  d={userPath}
                  fill="none"
                  stroke="url(#sim-allow-glow)"
                  strokeWidth={7}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={pathTransition}
                />
              ) : null}

              {(focus === "apps" || focus === "paths") && !reduced ? (
                <motion.path
                  d={ehrPath}
                  fill="none"
                  stroke="url(#sim-allow-glow)"
                  strokeWidth={7}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ ...pathTransition, delay: 0.08 }}
                />
              ) : null}

              <NetworkNode
                x={users.x}
                y={users.y}
                label="Doctors-AD-Group"
                sublabel="240 users"
                active={focus === "users" || focus === "blast"}
                tone="allow"
              />
              <NetworkNode
                x={devices.x}
                y={devices.y}
                label="Managed endpoints"
                sublabel="Hospital devices"
                active={focus === "paths"}
              />
              <NetworkNode
                x={firewall.x}
                y={firewall.y}
                label="Clinical segment"
                sublabel="Policy enforcement"
                active={focus === "paths"}
                tone="neutral"
              />
              <NetworkNode
                x={ehr.x}
                y={ehr.y}
                label="EHR application"
                sublabel="ePHI · HTTPS"
                active={focus === "apps"}
                tone="allow"
              />
              <NetworkNode
                x={audit.x}
                y={audit.y}
                label="Audit logging"
                sublabel="Compliance trail"
                active={focus === "apps"}
                tone="allow"
              />

              {focus === "blast" && !reduced ? (
                <motion.circle
                  cx={firewall.x}
                  cy={firewall.y}
                  r={58}
                  fill="none"
                  stroke={CLAUDE.warning}
                  strokeWidth={1}
                  strokeDasharray="4 6"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 0.55, scale: 1 }}
                  transition={pathTransition}
                />
              ) : null}
            </svg>
          </div>

          <div
            className="mx-3 mb-3 rounded-lg px-3 py-2 md:mx-4 md:mb-4"
            style={{ backgroundColor: CLAUDE.surfaceRaised, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
          >
            <p className="text-[11px] leading-relaxed" style={{ color: CLAUDE.textSecondary }}>
              {focusLine}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {IMPACT_LAYERS.map((layer) => (
            <ImpactLayerCard
              key={layer.id}
              layer={layer}
              selected={focus === layer.id}
              onSelect={() => setFocus(layer.id)}
            />
          ))}
        </div>
      </div>

      <div
        className="mx-4 mb-4 rounded-xl px-3 py-2.5 md:mx-5 md:mb-5"
        style={{ backgroundColor: CLAUDE.surfaceOverlay, boxShadow: `inset 0 0 0 1px ${CLAUDE.hairline}` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span style={{ color: CLAUDE.textMuted }}>Configuration hidden → impact surfaced</span>
          <span className="font-medium tabular-nums" style={{ color: CLAUDE.validated }}>
            240 users · 2 apps · low blast radius
          </span>
        </div>
      </div>
    </figure>
  );
}
