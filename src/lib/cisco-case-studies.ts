export interface CiscoSection {
  id: string;
  label: string;
  tag: string;
}

export const CISCO_SECTIONS: CiscoSection[] = [
  { id: "overview", label: "Overview", tag: "OVERVIEW" },
  { id: "case-study-01", label: "Case Study 01", tag: "CASE STUDY 01" },
  { id: "case-study-02", label: "Case Study 02", tag: "CASE STUDY 02" },
  { id: "process", label: "Process", tag: "PROCESS" },
  { id: "outcomes", label: "Outcomes", tag: "OUTCOMES" },
];

export const CISCO_INTRO = {
  left: "Cisco case studies capture product design decisions, interface explorations, and shipped outcomes across enterprise workflows.",
  right: "This space is an interactive reference for case study chapters. Content will be added chapter by chapter — prototypes, screenshots, and narrative notes.",
};

export const RADIAL_TIMELINE_LABELS = [
  "Discovery",
  "Research",
  "Concept",
  "Prototype",
  "Validation",
  "Ship",
  "Iterate",
  "Scale",
];
