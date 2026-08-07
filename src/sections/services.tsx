import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/features/reveal";
import { cn } from "@/lib/utils";

const services = [
  {
    index: "01",
    title: "Custom RAG & Knowledge Graph Implementation",
    description:
      "Retrieval systems that ground answers in your data — graph-aware retrieval, hybrid stores, and evals that prove groundedness before it ships.",
    deliverables: [
      "Retrieval architecture design",
      "Hybrid graph + vector store wiring",
      "Groundedness evaluation harness",
    ],
    accent: "from-accent/15",
    ring: "group-hover:border-accent/30",
  },
  {
    index: "02",
    title: "Multi-Agent Workflow Engineering",
    description:
      "Narrow-contract agents that route, retrieve, and reason without drifting — orchestrated, observable, and auditable end to end.",
    deliverables: [
      "Agent role & contract design",
      "Routing and orchestration layers",
      "Traceability and failure handling",
    ],
    accent: "from-accent-2/15",
    ring: "group-hover:border-accent-2/30",
  },
  {
    index: "03",
    title: "Predictive ML & Analytics Pipelines",
    description:
      "From messy tables to a served model — preprocessing, balance-aware modeling, evaluation you can defend, and a clean inference API.",
    deliverables: [
      "Data exploration & cleaning",
      "Model selection with honest evals",
      "API + persistence wiring",
    ],
    accent: "from-accent-3/15",
    ring: "group-hover:border-accent-3/30",
  },
  {
    index: "04",
    title: "Full-Stack AI Product Prototyping",
    description:
      "A system you can demo in days, not months — inference surface, interactive client, and persistent state in one coherent product.",
    deliverables: [
      "Architecture blueprint",
      "Working end-to-end prototype",
      "Deployment on Vercel / Supabase",
    ],
    accent: "from-accent/15",
    ring: "group-hover:border-accent/30",
  },
];

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="Contract-style engagements."
        description="Four ways I work with teams — each scoped like a system: clear inputs, an observable process, and a shippable output."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.index} delay={(index % 2) * 0.08}>
            <a
              href="#contact"
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card/70 p-6 shadow-soft backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-glass md:p-8",
                service.ring,
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent",
                  service.accent,
                )}
              />
              <div className="relative flex items-start justify-between">
                <span className="font-display text-3xl font-bold text-foreground/8">
                  {service.index}
                </span>
                <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
              <div className="relative mt-4">
                <h3 className="font-display text-lg font-semibold tracking-tight text-balance">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] text-muted"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Discuss this engagement
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
