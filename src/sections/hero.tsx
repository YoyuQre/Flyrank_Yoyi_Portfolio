import {
  ArrowRight,
  FileDown,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GithubIcon,
  KaggleIcon,
  LinkedinIcon,
} from "@/components/ui/brand-icons";
import { GraphFieldShell } from "@/features/graph-field-shell";
import { Reveal } from "@/features/reveal";
import { TypeRotator } from "@/features/type-rotator";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-16 pt-32"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[440px] w-full max-w-[920px] -translate-x-1/2 -translate-y-1/2 opacity-90"
      >
        <GraphFieldShell />
      </div>
      <div
        aria-hidden="true"
        className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-accent-2/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <Reveal>
          <Badge tone="neutral" className="mb-8">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-status" />
            </span>
            <span className="text-foreground/80">{site.status}</span>
            <span className="text-muted">—</span>
            <span>Multi-Agent Orchestration &amp; RAG</span>
          </Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance md:text-5xl">
            Architecting{" "}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              agentic intelligence
            </span>{" "}
            and scalable ML pipelines.
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 flex items-center justify-center gap-2 font-mono text-sm text-muted">
            <span aria-hidden="true" className="select-none text-foreground/70">
              &gt;
            </span>
            <TypeRotator
              words={[
                "multi-agent orchestration",
                "rag + knowledge-graph pipelines",
                "predictive ml models",
                "agentic systems in production",
              ]}
              className="text-accent"
            />
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted md:text-base">
            Engineering intelligent systems for real-world impact — production-grade
            multi-agent platforms, persistent knowledge-graph systems, and
            high-precision predictive models.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="#projects" size="lg">
              Explore Case Studies
              <ArrowRight className="size-4" />
            </Button>
            <Button href="#about" variant="secondary" size="lg">
              <Network className="size-4" />
              Inspect System Architecture
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-foreground"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-foreground"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
            <a
              href={site.socials.kaggle}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-foreground"
            >
              <KaggleIcon className="size-4" />
              Kaggle
            </a>
            <a
              href={site.resumeUrl}
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-foreground"
            >
              <FileDown className="size-4" />
              Download Verified CV
            </a>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors duration-300 hover:text-foreground"
      >
        <svg
          width="18"
          height="30"
          viewBox="0 0 18 30"
          fill="none"
          aria-hidden="true"
          className="animate-bounce"
        >
          <rect
            x="1"
            y="1"
            width="16"
            height="26"
            rx="8"
            stroke="currentColor"
            strokeOpacity="0.4"
          />
          <circle cx="9" cy="8" r="2.5" fill="currentColor" />
        </svg>
      </a>
    </section>
  );
}
