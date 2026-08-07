"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { projects } from "@/content/projects";
import type { Project } from "@/content/projects/types";
import { skills } from "@/constants/skills";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { useSkillFilter } from "@/features/skill-filter";
import { Reveal } from "@/features/reveal";
import { cn } from "@/lib/utils";

const ACCENT: Record<
  Project["accent"],
  { bar: string; label: string; text: string }
> = {
  blue: {
    bar: "from-blue-500/20 via-accent/10 to-transparent",
    label: "text-accent",
    text: "bg-accent",
  },
  violet: {
    bar: "from-violet-500/20 via-accent-2/10 to-transparent",
    label: "text-accent-2",
    text: "bg-accent-2",
  },
  cyan: {
    bar: "from-cyan-500/20 via-accent-3/10 to-transparent",
    label: "text-accent-3",
    text: "bg-accent-3",
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = ACCENT[project.accent];
  const visibleStack = project.stack.slice(0, 5);

  return (
    <Reveal delay={(index % 2) * 0.08}>
      <article className="group relative h-full overflow-hidden rounded-lg border border-line bg-card/70 shadow-soft backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-glass">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b",
            accent.bar,
          )}
        />
        <div className="relative flex h-full flex-col p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="success">{project.status}</Badge>
                <Badge tone="neutral">{project.timeframe}</Badge>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-balance">
                {project.title}
              </h3>
              <p className={cn("mt-1 text-sm font-medium", accent.label)}>
                {project.role}
              </p>
            </div>
            <span className="font-display text-3xl font-bold text-foreground/8">
              0{index + 1}
            </span>
          </div>

          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-md border border-line bg-solid/50 px-3 py-2.5"
              >
                <p className="text-[11px] text-muted">{h.label}</p>
                <p className="mt-0.5 font-mono text-xs font-medium text-foreground">
                  {h.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {visibleStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-solid/40 px-2.5 py-1 font-mono text-[10px] text-muted"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > visibleStack.length ? (
              <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted">
                +{project.stack.length - visibleStack.length}
              </span>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-5">
            <a
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-accent"
            >
              <BookOpen className="size-4" />
              Read case study
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
              >
                <GithubIcon className="size-4" />
                Source
              </a>
            ) : null}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
              >
                <ArrowUpRight className="size-4" />
                Demo
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const { active } = useSkillFilter();

  const activeSkill = active ? skills.find((s) => s.id === active) : null;
  const matched =
    activeSkill && activeSkill.relatedProjects.length > 0
      ? projects.filter((p) => activeSkill.relatedProjects.includes(p.slug))
      : [];
  const noMatch = Boolean(activeSkill) && matched.length === 0;
  const visible = noMatch ? projects : matched.length > 0 ? matched : projects;
  const dimmed: Project[] = noMatch
    ? []
    : activeSkill
      ? projects.filter((p) => !matched.includes(p))
      : [];

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Intelligence Engine"
        title="Case studies, not portfolios."
        description="Two production systems built end-to-end. Each opens into a full engineering write-up — problem, research, architecture, pipeline, model, evaluation, deployment, and lessons learned."
      />

      {activeSkill ? (
        <p className="-mt-10 mb-10 text-sm text-muted">
          Showing projects deploying{" "}
          <span className="font-medium text-foreground">{activeSkill.label}</span>
          {noMatch
            ? " — none yet, building next."
            : ` (${matched.length} of ${projects.length}).`}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {dimmed.length > 0 ? (
        <div className="mt-6 flex flex-col gap-6">
          {dimmed.map((project, index) => (
            <div key={project.slug} className="opacity-40 transition-opacity duration-300">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
