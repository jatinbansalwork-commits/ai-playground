import type { CaseStudyFaqItem } from "@/components/case-studies/case-study-faq";

export const POLICY_COPILOT_FAQ_ITEMS: readonly CaseStudyFaqItem[] = [
  {
    question: "What problem was Policy Copilot solving?",
    answer:
      "Firewall administrators spend most of their time translating business requests into technical policies—gathering context, checking compliance, and validating risk long before they open the rule editor. Policy Copilot brings that thinking into the product instead of treating it as invisible prep work.",
  },
  {
    question: "Who was the primary user?",
    answer:
      "Security administrators and architects responsible for firewall policy in large enterprises. They are experienced practitioners who need speed without sacrificing explainability, accuracy, or control.",
  },
  {
    question: "Why start with intent instead of configuration?",
    answer:
      "Research showed the hardest work happens before the first rule is written. Starting with business intent—who needs access, to what, and under which conditions—allowed administrators to confirm meaning before the product translated it into technical policy.",
  },
  {
    question: "How does the product build trust before deployment?",
    answer:
      "Trust is built into every step of the workflow: reflecting understanding before generation, validating continuously, explaining recommendations, and asking for clarification when confidence is low. Nothing reaches production until a human approves it.",
  },
  {
    question: "Are these real Cisco product screens?",
    answer:
      "No. The designs shown here are recreated from memory because the original files remain under Cisco intellectual property. They faithfully represent the product direction and interaction model while respecting confidentiality.",
  },
  {
    question: "What was your role on the project?",
    answer:
      "I led the end-to-end product design, including product discovery, UX strategy, AI interaction design, prototyping, visual design, and collaboration with Product Managers and Engineers.",
  },
  {
    question: "Was this shipped?",
    answer:
      "Policy Copilot explored the future direction of AI-assisted firewall policy creation. Some interaction patterns informed ongoing product discussions, while others remained exploratory. This case study focuses on the product thinking, design decisions, and interaction model rather than release status.",
  },
  {
    question: "What was your biggest takeaway?",
    answer:
      "I started this project believing AI should automate work. I finished believing its greatest value is helping people make better decisions. The most meaningful interactions weren't when the AI generated something—they were when it explained its reasoning, admitted uncertainty, and helped people move forward with confidence.",
  },
] as const;
