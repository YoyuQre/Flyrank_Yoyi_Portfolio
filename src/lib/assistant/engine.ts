import { projects } from "@/content/projects";
import { researchNotes } from "@/content/research";
import { skills } from "@/constants/skills";
import { timelineEntries } from "@/constants/timeline";
import { site } from "@/lib/site";

export type AssistantKind =
  | "project"
  | "research"
  | "skill"
  | "profile"
  | "experience";

export type AssistantMatch = {
  id: string;
  kind: AssistantKind;
  title: string;
  href: string;
  snippet: string;
  score: number;
};

type Chunk = {
  id: string;
  kind: AssistantKind;
  title: string;
  href: string;
  text: string;
  titleTokens: Map<string, number>;
  bodyTokens: Map<string, number>;
};

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "in", "on", "for", "to",
  "with", "at", "by", "from", "is", "are", "was", "were", "be", "been",
  "it", "its", "this", "that", "these", "those", "you", "your", "we",
  "our", "they", "their", "what", "which", "who", "how", "when", "where",
  "about", "does", "did", "do", "have", "has", "had", "not", "no", "yes",
  "tell", "me", "more", "most", "some", "any", "all", "into", "over",
  "under", "than", "then", "will", "would", "can", "could", "should",
  "please", "give", "get", "need", "want", "like", "know", "my", "so",
  "very", "just", "using", "used", "work", "works", "built", "building",
]);

const TOKEN_RE = /[^a-z0-9+#.]+/g;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(TOKEN_RE, " ")
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function toFreqMap(tokens: string[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const token of tokens) {
    map.set(token, (map.get(token) ?? 0) + 1);
  }
  return map;
}

function projectText(block: {
  type: string;
  title?: string;
  text?: string;
  items?: string[];
  metrics?: { label: string; value: string }[];
  code?: string;
  source?: string;
}): string {
  switch (block.type) {
    case "paragraph":
      return block.text ?? "";
    case "bullets":
      return (block.items ?? []).join(" ");
    case "metrics":
      return (block.metrics ?? [])
        .map((m) => `${m.label}: ${m.value}`)
        .join(" ");
    case "code":
      return `${block.title ?? ""} ${block.code ?? ""}`.trim();
    case "quote":
      return `${block.text ?? ""} ${block.source ?? ""}`.trim();
    default:
      return "";
  }
}

function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  for (const project of projects) {
    const baseHref = `/projects/${project.slug}`;

    chunks.push({
      id: `project:${project.slug}:summary`,
      kind: "project",
      title: project.title,
      href: baseHref,
      text: [
        project.role,
        project.timeframe,
        project.tagline,
        project.summary,
        project.highlights.map((h) => `${h.label}: ${h.value}`).join(", "),
        `Stack: ${project.stack.join(", ")}`,
        "project projects case study work",
      ].join(" "),
      titleTokens: new Map(),
      bodyTokens: new Map(),
    });

    for (const section of project.sections) {
      const body = section.blocks.map(projectText).filter(Boolean).join(" ");
      if (!body) continue;
      chunks.push({
        id: `project:${project.slug}:${section.id}`,
        kind: "project",
        title: `${project.title} — ${section.title}`,
        href: baseHref,
        text: body,
        titleTokens: new Map(),
        bodyTokens: new Map(),
      });
    }
  }

  for (const note of researchNotes) {
    chunks.push({
      id: `research:${note.title}`,
      kind: "research",
      title: note.title,
      href: "/#research",
      text: `${note.domain} ${note.date} ${note.summary} ${note.points.join(" ")} research note notes thinking`,
      titleTokens: new Map(),
      bodyTokens: new Map(),
    });
  }

  for (const skill of skills) {
    chunks.push({
      id: `skill:${skill.id}`,
      kind: "skill",
      title: skill.label,
      href: "/#skills",
      text: `${skill.label} skill skills expertise ${skill.category} ${skill.relatedProjects.join(" ")}`,
      titleTokens: new Map(),
      bodyTokens: new Map(),
    });
  }

  const profile = [
    { id: "profile:who", title: site.name, href: "/#about",
      text: `${site.name} ${site.role} ${site.tagline} ${site.location} ${site.status} ${site.availability}` },
    { id: "profile:contact", title: "Contact", href: "/#contact",
      text: `Email ${site.email} Phone ${site.phone} ${site.location} ${site.availability}` },
    { id: "profile:resume", title: "Resume", href: site.resumeUrl,
      text: `Resume CV download ${site.name} ${site.role}` },
    { id: "profile:socials", title: "Social Profiles", href: "/#contact",
      text: `GitHub ${site.socials.github} LinkedIn ${site.socials.linkedin} Kaggle ${site.socials.kaggle}` },
  ];
  for (const p of profile) {
    chunks.push({
      ...p,
      kind: "profile",
      titleTokens: new Map(),
      bodyTokens: new Map(),
    });
  }

  for (const entry of timelineEntries) {
    chunks.push({
      id: `experience:${entry.role}:${entry.org}`,
      kind: "experience",
      title: entry.role,
      href: "/#experience",
      text: `${entry.period} ${entry.role} ${entry.org} ${entry.type} ${entry.points.join(" ")} experience role work`,
      titleTokens: new Map(),
      bodyTokens: new Map(),
    });
  }

  for (const chunk of chunks) {
    chunk.titleTokens = toFreqMap(tokenize(chunk.title));
    chunk.bodyTokens = toFreqMap(tokenize(chunk.text));
  }

  return chunks;
}

let cachedChunks: Chunk[] | undefined;

function getChunks(): Chunk[] {
  if (!cachedChunks) cachedChunks = buildChunks();
  return cachedChunks;
}

function scoreChunk(chunk: Chunk, queryTokens: string[]): number {
  let score = 0;
  for (const token of queryTokens) {
    const bodyCount = chunk.bodyTokens.get(token) ?? 0;
    const titleCount = chunk.titleTokens.get(token) ?? 0;
    if (bodyCount) score += 1 + 0.5 * Math.min(bodyCount, 3);
    if (titleCount) score += 1.5;
  }
  if (score === 0) return 0;
  return score / (1 + 0.08 * Math.sqrt(chunk.bodyTokens.size));
}

function makeSnippet(text: string, max = 180): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

export function searchAssistant(query: string, limit = 6): AssistantMatch[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = getChunks()
    .map((chunk) => ({
      chunk,
      score: scoreChunk(chunk, queryTokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ chunk, score }) => ({
    id: chunk.id,
    kind: chunk.kind,
    title: chunk.title,
    href: chunk.href,
    snippet: makeSnippet(chunk.text),
    score,
  }));
}
