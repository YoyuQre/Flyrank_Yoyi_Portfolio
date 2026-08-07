"use client";

import * as React from "react";
import { Reveal } from "@/features/reveal";

type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  type: string;
  points: string[];
};

const entries: TimelineEntry[] = [
  {
    period: "Jul 2026 – Present",
    role: "Machine Learning Intern",
    org: "FlyRank AI",
    type: "Internship",
    points: [
      "Machine Learning track — July 2026 cohort",
      "Anthropic courses: prompting, ML systems & backend foundations",
      "Building proof: foundation submissions + accepted capstone",
    ],
  },
  {
    period: "Jul 2026 – Present",
    role: "Tech. Head",
    org: "ISTE Students Chapter · M.H. Saboo Siddik College",
    type: "Leadership",
    points: [
      "Planning and executing technical events, workshops, and competitions",
      "Managing the chapter's website and technical platforms",
      "Promoting innovation and technical collaboration among members",
    ],
  },
  {
    period: "Jul 2026 – Present",
    role: "General Secretary",
    org: "VAPT Excellence Center · M.H. Saboo Siddik College",
    type: "Leadership",
    points: [
      "Maintaining official records, documentation, and administrative proceedings",
      "Coordinating meetings, agendas, minutes, and follow-ups",
      "Aligning core committee, team leads, and members for smooth operations",
    ],
  },
  {
    period: "Apr – May 2026",
    role: "Data Science Intern",
    org: "Cognifyz IT Solutions Pvt. Ltd.",
    type: "Internship",
    points: [
      "Collected, cleaned, and preprocessed complex datasets (Pandas / NumPy)",
      "Exploratory data analysis and dashboards with Matplotlib and Seaborn",
      "Identified trends and performance patterns for business decisions",
    ],
  },
  {
    period: "Jun 2025 – Apr 2026",
    role: "BI Analysis & Data Analytics",
    org: "Aptech Learning",
    type: "Certification",
    points: [
      "Graduated with Distinction — 88%",
      "Data analytics and business intelligence foundations",
      "SQL, Excel and dashboarding workflows",
    ],
  },
  {
    period: "2024 – Present",
    role: "B.E. Computer Engineering",
    org: "M.H. Saboo Siddik College · Mumbai University",
    type: "Academic",
    points: [
      "CGPA 9.28/10 · Sem 4 SGPA 9.7",
      "IoT, Cybersecurity & Blockchain applications",
      "Technical leadership across student systems",
    ],
  },
];

export function Timeline() {
  const containerRef = React.useRef<HTMLOListElement>(null);

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
    <ol ref={containerRef} className="relative ml-2 border-l border-line pl-8 sm:ml-3">
      <div
        data-timeline-line
        aria-hidden="true"
        className="absolute -left-px top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-accent via-accent-2 to-transparent"
      />
      {entries.map((entry, index) => (
        <Reveal key={entry.role} delay={index * 0.06} y={16}>
          <li className="relative pb-14 last:pb-0">
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
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
