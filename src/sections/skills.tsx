"use client";

import { X } from "lucide-react";
import { skillCategories, skills } from "@/constants/skills";
import { Section, SectionHeading } from "@/components/ui/section";
import { useSkillFilter } from "@/features/skill-filter";
import { cn } from "@/lib/utils";

export function Skills() {
  const { active, setActive } = useSkillFilter();

  const select = (id: string) => {
    setActive(active === id ? null : id);
    if (active !== id) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills & Capabilities"
        title="A filter, not a progress bar."
        description="Select a capability and the interface jumps to the systems where it was actually deployed. Every claim on this page is traceable to a shipped artifact."
      />

      <div className="flex flex-col gap-10">
        {skillCategories.map((category) => {
          const group = skills.filter((skill) => skill.category === category);
          return (
            <div key={category}>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.map((skill) => {
                  const isActive = active === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => select(skill.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out-expo",
                        isActive
                          ? "border-accent bg-accent text-white shadow-soft"
                          : "border-line bg-card/60 text-muted hover:border-line-strong hover:text-foreground",
                        skill.relatedProjects.length === 0 &&
                          !isActive &&
                          "cursor-default border-dashed",
                      )}
                    >
                      {skill.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {active ? (
        <div className="mt-10 flex items-center gap-3 rounded-lg border border-line bg-surface/60 px-5 py-4">
          <p className="text-sm text-muted">
            Filtering projects by{" "}
            <span className="font-medium text-foreground">
              {skills.find((s) => s.id === active)?.label}
            </span>
          </p>
          <button
            type="button"
            onClick={() => setActive(null)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:text-foreground"
          >
            <X className="size-3" />
            Clear
          </button>
        </div>
      ) : null}
    </Section>
  );
}
