import { Section, SectionHeading } from "@/components/ui/section";
import { Timeline } from "@/features/timeline";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="A short, dense professional timeline."
        description="Applied work and formal training — every entry with a concrete output, not a job title alone."
      />
      <div className="mx-auto max-w-2xl">
        <Timeline />
      </div>
    </Section>
  );
}
