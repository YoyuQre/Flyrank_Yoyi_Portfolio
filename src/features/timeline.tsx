"use client";

import * as React from "react";
import { Reveal } from "@/features/reveal";
import { timelineEntries } from "@/constants/timeline";

export function Timeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const { gsap } = gsapModule;
        gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            "[data-timeline-line]",
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 72%",
                end: "bottom 55%",
                scrub: 0.6,
              },
            },
          );
        }, containerRef);
      },
    );
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative ml-2 sm:ml-3">
      <div
        data-timeline-line
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-accent via-accent-2 to-transparent"
      />
      <ol className="border-l border-line pl-8">
        {timelineEntries.map((entry, index) => (
          <li key={entry.role} className="relative pb-14 last:pb-0">
            <Reveal delay={index * 0.06} y={16}>
              <span className="absolute -left-[41px] top-1.5 flex size-3.5 items-center justify-center rounded-full border border-line bg-solid shadow-soft">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] tracking-tight text-accent">
                  {entry.period}
                </span>
                <span className="rounded-full border border-line bg-card/60 px-2.5 py-0.5 text-[10px] font-medium text-muted">
                  {entry.type}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                {entry.role}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-muted">{entry.org}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
