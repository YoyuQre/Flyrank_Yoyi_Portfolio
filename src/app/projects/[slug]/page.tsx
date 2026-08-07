import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import {
  getProject,
  projects,
} from "@/content/projects";
import type { CaseStudyBlock } from "@/content/projects/types";
import { Badge } from "@/components/ui/badge";
import { PipelineDiagram } from "@/features/pipeline-diagram";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-pretty text-sm leading-relaxed text-muted md:text-[15px]">{block.text}</p>;
    case "bullets":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted md:text-[15px]">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "metrics":
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {block.metrics.map((metric) => (
            <div key={metric.label} className="rounded-md border border-line bg-solid/50 px-4 py-3.5">
              <p className="text-[11px] text-muted">{metric.label}</p>
              <p className="mt-1 font-display text-lg font-semibold tabular-nums text-foreground">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      );
    case "code":
      return (
        <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#0b1220]">
          <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-slate-700" />
              <span className="size-2.5 rounded-full bg-slate-700" />
              <span className="size-2.5 rounded-full bg-slate-700" />
            </span>
            <span className="ml-2 font-mono text-xs text-slate-400">
              {block.title}
            </span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-slate-300">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "quote":
      return (
        <blockquote className="rounded-lg border-l-2 border-accent bg-surface/60 px-5 py-4">
          <p className="text-sm italic leading-relaxed text-foreground/90">
            “{block.text}”
          </p>
          {block.source ? (
            <footer className="mt-2 text-xs text-muted">{block.source}</footer>
          ) : null}
        </blockquote>
      );
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto w-full max-w-[1280px] px-6 pb-24 pt-32">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All case studies
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success">{project.status}</Badge>
          <Badge tone="neutral">{project.timeframe}</Badge>
          <Badge tone="accent">{project.role}</Badge>
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted md:text-base">
          {project.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-card/60 px-3 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-px hover:bg-accent/90"
            >
              <GithubIcon className="size-4" />
              View on GitHub
            </a>
          ) : null}
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-line-strong"
            >
              <ExternalLink className="size-4" />
              Live demo
            </a>
          ) : null}
          {project.links.docs ? (
            <a
              href={project.links.docs}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-line-strong"
            >
              <BookOpen className="size-4" />
              Documentation
            </a>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.highlights.map((h) => (
            <div key={h.label} className="rounded-md border border-line bg-card/60 px-4 py-3">
              <p className="text-[11px] text-muted">{h.label}</p>
              <p className="mt-1 font-mono text-xs font-medium text-foreground">{h.value}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 flex flex-col gap-1" aria-label="Case study sections">
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <FileText className="size-3.5" />
              Sections
            </p>
            {project.sections.map((section, i) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-baseline gap-2 rounded-md px-2.5 py-1.5 text-[13px] text-muted transition-colors duration-300 hover:bg-card hover:text-foreground"
              >
                <span className="font-mono text-[10px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-col gap-14">
          {project.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-t border-line pt-10"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="mt-5 flex flex-col gap-5">
                {section.id === "architecture" ? (
                  <PipelineDiagram nodes={project.nodes} edges={project.edges} />
                ) : null}
                {section.blocks.map((block, b) => (
                  <Block key={b} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <footer className="mt-20 border-t border-line pt-10">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col gap-2 rounded-lg border border-line bg-card/60 p-6 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-glass"
        >
          <span className="text-xs text-muted">Next case study</span>
          <span className="flex items-center justify-between gap-4">
            <span className="font-display text-xl font-semibold tracking-tight">
              {next.title}
            </span>
            <ArrowRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
          </span>
        </Link>
      </footer>
    </article>
  );
}
