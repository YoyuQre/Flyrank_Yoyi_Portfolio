export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  type: string;
  points: string[];
};

export const timelineEntries: TimelineEntry[] = [
  {
    period: "Jul – Sep 2026",
    role: "Machine Learning Intern",
    org: "FlyRank AI",
    type: "Internship · Complete",
    points: [
      "Built and validated a random-forest classifier on 30K real production pages, 32 clients — F1 0.82 vs. 0.63 baseline",
      "Ran client-grouped validation and leakage audits; disclosed and corrected an inflated accuracy result",
      "Delivered a reason-coded, tiered priority queue for editorial review workflows",
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
