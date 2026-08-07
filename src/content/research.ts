export type ResearchNote = {
  title: string;
  domain: string;
  date: string;
  summary: string;
  points: string[];
};

export const researchNotes: ResearchNote[] = [
  {
    title: "Retrieval Merging in Hybrid Graph + Vector Systems",
    domain: "RAG · Knowledge Graphs",
    date: "Apr 2026",
    summary:
      "Notes from building the Prediction Market Trader Advisor: recency-weighted merging of graph and vector retrieval beats either store alone on groundedness.",
    points: [
      "Graph retrieval wins on entity-level aggregation; vectors win on episodic similarity.",
      "Naive concatenation ranks worse than either alone — ordering must be score-normalized.",
      "Early-exit routing keeps P95 latency under 1.4s in the deployed system.",
    ],
  },
  {
    title: "Class Imbalance as a Product Decision",
    domain: "Applied ML",
    date: "Mar 2026",
    summary:
      "A post-mortem on ClimaChain: why balanced metrics, not raw accuracy, should gate a model from notebooks into production.",
    points: [
      "Aggregate accuracy hides rare-class collapse; always report per-class F1.",
      "SMOTE improved minority recall without meaningful precision loss.",
      "Decision thresholds should be calibrated per deployment region.",
    ],
  },
  {
    title: "Constrained Prompt Contracts for Agent Reliability",
    domain: "Multi-Agent Systems",
    date: "Mar 2026",
    summary:
      "Field notes on keeping LLM-driven agents deterministic: narrow contracts, constrained label sets, and deterministic guards around routing.",
    points: [
      "Agent scope discipline beats clever prompting — narrow agents are debuggable.",
      "Few-shot classification with constrained outputs reached 94% intent accuracy.",
      "Deterministic priority tables for routing remove the expensive branch of the decision.",
    ],
  },
];

export type LabSlot = {
  id: string;
  label: string;
  description: string;
  eta: string;
  status: "planned" | "in-progress";
};

export const labSlots: LabSlot[] = [
  {
    id: "assistant",
    label: "Portfolio AI Assistant",
    description:
      "RAG assistant over project documentation and research notes, answering questions about my work with citations.",
    eta: "Q3 2026",
    status: "in-progress",
  },
  {
    id: "semantic-search",
    label: "Semantic Project Search",
    description:
      "Vector search across projects, papers, and case studies — natural language queries instead of keyword matching.",
    eta: "Q3 2026",
    status: "planned",
  },
  {
    id: "resume-matcher",
    label: "Resume / JD Matcher",
    description:
      "Drop a job description, get a scored fit against my verified skills with evidence-linked gaps.",
    eta: "Q4 2026",
    status: "planned",
  },
  {
    id: "pipeline-simulator",
    label: "ML Pipeline Simulator",
    description:
      "Interactive, step-through simulation of the agentic pipeline — watch intent → route → retrieval → synthesis execute.",
    eta: "Q4 2026",
    status: "planned",
  },
  {
    id: "playground",
    label: "Model Playground",
    description:
      "Run small classification experiments in-browser against the ClimaChain feature set.",
    eta: "TBD",
    status: "planned",
  },
  {
    id: "github-analytics",
    label: "GitHub Analytics",
    description:
      "Live language, contribution, and project-health analytics pulled from the GitHub API.",
    eta: "TBD",
    status: "planned",
  },
  {
    id: "learning-timeline",
    label: "Learning Timeline",
    description:
      "A chronological map of courses, certifications, and the skills each one unlocked.",
    eta: "TBD",
    status: "planned",
  },
  {
    id: "publications",
    label: "Publication Explorer",
    description:
      "A structured explorer for research notes, essays, and reproducible experiments.",
    eta: "TBD",
    status: "planned",
  },
];
