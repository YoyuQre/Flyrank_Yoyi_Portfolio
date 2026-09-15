import type { Project } from "./types";

export const contentDeclinePrediction: Project = {
  slug: "content-decline-prediction",
  title: "Content Decline Prediction — FlyRank ML Capstone",
  role: "Machine Learning Intern",
  timeframe: "Jul – Sep 2026",
  tagline:
    "A validated random-forest model that ranks which content pages are most likely declining in search, so editors can review the highest-value pages first — built on 30K real production pages across 32 pseudonymized clients.",
  summary:
    "A validated random-forest model that ranks which content pages are most likely declining in search, so editors can review the highest-value pages first — built on 30K real production pages across 32 pseudonymized clients.",
  status: "Complete",
  accent: "violet",
  caseStudyUrl: "https://yoyuqre.github.io/flyrank_assgn_1/",
  highlights: [
    { label: "Pages analyzed", value: "30,000" },
    { label: "Accuracy vs. baseline", value: "0.81 vs. 0.53" },
    { label: "Precision@50", value: "1.00" },
    { label: "Validation", value: "Client-grouped split" },
  ],
  stack: [
    "Python",
    "Scikit-Learn",
    "Pandas",
    "Random Forest",
    "Leakage Auditing",
  ],
  skills: ["predictive-modeling", "scikit-learn", "data-mining", "python"],
  nodes: [
    {
      id: "pages",
      label: "30K Production Pages",
      detail: "Content inventory across 32 pseudonymized clients",
      stage: "input",
    },
    {
      id: "features",
      label: "Feature Engineering",
      detail: "Pandas feature extraction across page signals",
      stage: "agent",
    },
    {
      id: "model",
      label: "Random Forest Classifier",
      detail: "Client-grouped validated · leakage-audited",
      stage: "agent",
    },
    {
      id: "queue",
      label: "Editorial Priority Queue",
      detail: "Reason-coded, tiered P1–P4",
      stage: "output",
    },
  ],
  edges: [
    { from: "pages", to: "features" },
    { from: "features", to: "model" },
    { from: "model", to: "queue" },
  ],
  sections: [],
  links: {
    github: "https://github.com/YoyuQre/flyrank_assgn_1",
    docs: "https://yoyuqre.github.io/flyrank_assgn_1/",
  },
};