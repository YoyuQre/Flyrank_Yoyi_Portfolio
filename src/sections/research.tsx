import { researchNotes } from "@/content/research";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/features/reveal";
import { LabTabs } from "@/features/lab-tabs";

export function Research() {
  return (
    <Section id="research">
      <SectionHeading
        eyebrow="Research & Architecture"
        title="Notes from the field, and the lab next door."
        description="Short, honest write-ups on the decisions that shaped shipped systems — plus the AI Lab: a roadmap of interactive modules being engineered into this site."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {researchNotes.map((note, index) => (
          <Reveal key={note.title} delay={index * 0.08}>
            <Card className="flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{note.domain}</Badge>
                <Badge tone="neutral">{note.date}</Badge>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-balance">
                {note.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {note.summary}
              </p>
              <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                {note.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Reveal className="mb-10">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">
              AI Lab
            </p>
            <h3 className="font-display text-xl font-semibold tracking-tight">
              Interactive modules, engineered into this site.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              These modules make the site itself a demonstration of agentic and
              RAG engineering — each one will ship with its own mini case study.
            </p>
          </div>
        </Reveal>
        <LabTabs />
      </div>
    </Section>
  );
}
