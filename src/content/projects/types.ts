export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "metrics"; metrics: { label: string; value: string }[] }
  | { type: "code"; title: string; code: string }
  | { type: "quote"; text: string; source: string };

export type CaseStudySection = {
  id: string;
  title: string;
  blocks: CaseStudyBlock[];
};

export type PipelineStage = "input" | "agent" | "store" | "output";

export type PipelineNode = {
  id: string;
  label: string;
  detail: string;
  stage: PipelineStage;
};

export type PipelineEdge = {
  from: string;
  to: string;
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  timeframe: string;
  tagline: string;
  summary: string;
  status: string;
  accent: "blue" | "violet" | "cyan";
  highlights: { label: string; value: string }[];
  stack: string[];
  skills: string[];
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  sections: CaseStudySection[];
  links: { github?: string; demo?: string; docs?: string };
};
