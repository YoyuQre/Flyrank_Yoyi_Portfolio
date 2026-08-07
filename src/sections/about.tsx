import {
  ArrowRight,
  Award,
  Cpu,
  GraduationCap,
  Radar,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { StatCounter } from "@/features/stat-counter";
import { Reveal } from "@/features/reveal";

const architectureStack = [
  "FastAPI",
  "React / Node.js",
  "Supabase · PostgreSQL",
  "LightRAG",
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="Built on systems thinking, measured in outcomes."
        description="AI engineering is systems work. Here is the foundation it stands on — academics, applied internship work, verification, and the stack I reach for when a system needs to ship."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Reveal className="md:col-span-2">
          <Card className="flex h-full flex-col justify-between p-6 md:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <GraduationCap className="size-5" />
                </span>
                <h3 className="font-display text-base font-semibold">
                  Academic Performance
                </h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                B.E. Computer Engineering — IoT, Cybersecurity &amp; Blockchain,
                M.H. Saboo Siddik College of Engineering, Mumbai University.
              </p>
            </div>
            <div className="mt-8">
              <div className="font-display text-5xl font-semibold tabular-nums tracking-tight text-accent">
                <StatCounter value={9.28} decimals={2} suffix="/10" />
              </div>
              <p className="mt-2 text-xs text-muted">Cumulative GPA</p>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <Card className="flex h-full flex-col justify-between p-6 md:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-2/10 text-accent-2">
                  <Radar className="size-5" />
                </span>
                <h3 className="font-display text-base font-semibold">
                  Current Internship
                </h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Machine Learning Intern at{" "}
                <span className="font-medium text-foreground">
                  FlyRank AI
                </span>
                . July 2026 cohort — a self-paced program that builds toward
                proof: foundation submissions and an accepted capstone.
              </p>
            </div>
            <ul className="mt-8 flex flex-col gap-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-accent-2" />
                Machine Learning track · July 2026 cohort, accepted from the
                waitlist
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-accent-2" />
                Anthropic courses: prompting, ML systems &amp; backend
                foundations
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-accent-2" />
                Foundation submissions + accepted capstone as program proof
              </li>
            </ul>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-2">
          <Card className="flex h-full flex-col justify-between p-6 md:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-3/10 text-accent-3">
                  <Award className="size-5" />
                </span>
                <h3 className="font-display text-base font-semibold">
                  Core Certifications
                </h3>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4 rounded-md border border-line bg-solid/50 p-4">
                <div>
                  <p className="text-sm font-medium">Aptech BI &amp; Data Analytics</p>
                  <p className="mt-0.5 text-xs text-muted">
                    Distinction · Jun 2025 – Apr 2026
                  </p>
                </div>
                <div className="font-display text-xl font-semibold text-accent">
                  <StatCounter value={88} suffix="%" />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-md border border-line bg-solid/50 p-4">
                <div>
                  <p className="text-sm font-medium">Tata Group AI Analytics</p>
                  <p className="mt-0.5 text-xs text-muted">Forage simulation</p>
                </div>
                <div className="font-display text-xl font-semibold text-accent">
                  <StatCounter value={85} suffix="%" />
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
              {[
                "Celonis Foundations",
                "Hadoop Developer in Real World",
                "Introduction to Tableau",
              ].map((cert) => (
                <Badge key={cert} tone="neutral" className="text-[11px]">
                  {cert}
                </Badge>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <Card className="flex h-full flex-col justify-between p-6 md:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <Cpu className="size-5" />
                </span>
                <h3 className="font-display text-base font-semibold">
                  Architecture Mindset
                </h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Modern full-stack ML: a clean inference surface, an interactive
                client, and persistent state — wired together deliberately.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {architectureStack.map((item) => (
                <Badge key={item} tone="accent" className="font-mono text-[11px]">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal className="md:col-span-2 lg:col-span-4">
          <Card className="flex h-full flex-col p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-2/10 text-accent-2">
                <Users className="size-5" />
              </span>
              <h3 className="font-display text-base font-semibold">
                Leadership &amp; Community
              </h3>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-md border border-line bg-solid/50 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">
                  Tech. Head
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  ISTE Students Chapter · 2026–27
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Planning and executing technical events and workshops,
                  managing the chapter&apos;s website and technical platforms,
                  and driving technical excellence among members.
                </p>
              </div>
              <div className="rounded-md border border-line bg-solid/50 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">
                  General Secretary
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  VAPT Excellence Center · 2026–27
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Owning records, documentation, and meeting coordination,
                  while keeping the core committee, team leads, and members
                  aligned for smooth chapter operations.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
