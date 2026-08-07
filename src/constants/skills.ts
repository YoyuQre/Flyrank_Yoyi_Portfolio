export type SkillCategory =
  | "Core AI/ML"
  | "Languages"
  | "Web & Backend"
  | "Data & Databases";

export type Skill = {
  id: string;
  label: string;
  category: SkillCategory;
  relatedProjects: string[];
};

export const skillCategories: SkillCategory[] = [
  "Core AI/ML",
  "Languages",
  "Web & Backend",
  "Data & Databases",
];

export const skills: Skill[] = [
  {
    id: "multi-agent",
    label: "Multi-Agent Systems",
    category: "Core AI/ML",
    relatedProjects: ["prediction-market-trader"],
  },
  {
    id: "rag",
    label: "RAG",
    category: "Core AI/ML",
    relatedProjects: ["prediction-market-trader"],
  },
  {
    id: "knowledge-graphs",
    label: "Knowledge Graphs",
    category: "Core AI/ML",
    relatedProjects: ["prediction-market-trader"],
  },
  {
    id: "lightrag",
    label: "LightRAG",
    category: "Core AI/ML",
    relatedProjects: ["prediction-market-trader"],
  },
  {
    id: "predictive-modeling",
    label: "Predictive Modeling",
    category: "Core AI/ML",
    relatedProjects: ["climachain"],
  },
  {
    id: "weka",
    label: "WEKA",
    category: "Core AI/ML",
    relatedProjects: ["climachain"],
  },
  {
    id: "scikit-learn",
    label: "Scikit-Learn",
    category: "Core AI/ML",
    relatedProjects: ["climachain", "prediction-market-trader"],
  },
  {
    id: "data-mining",
    label: "Data Mining",
    category: "Core AI/ML",
    relatedProjects: ["climachain"],
  },
  {
    id: "python",
    label: "Python",
    category: "Languages",
    relatedProjects: ["prediction-market-trader", "climachain"],
  },
  {
    id: "sql",
    label: "SQL",
    category: "Languages",
    relatedProjects: ["climachain"],
  },
  {
    id: "c-cpp",
    label: "C / C++",
    category: "Languages",
    relatedProjects: [],
  },
  {
    id: "java",
    label: "Java",
    category: "Languages",
    relatedProjects: [],
  },
  {
    id: "javascript",
    label: "JavaScript",
    category: "Languages",
    relatedProjects: ["climachain"],
  },
  {
    id: "r",
    label: "R",
    category: "Languages",
    relatedProjects: [],
  },
  {
    id: "t-sql",
    label: "T-SQL",
    category: "Languages",
    relatedProjects: [],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    category: "Web & Backend",
    relatedProjects: ["prediction-market-trader", "climachain"],
  },
  {
    id: "nodejs",
    label: "Node.js",
    category: "Web & Backend",
    relatedProjects: ["climachain"],
  },
  {
    id: "react",
    label: "React.js",
    category: "Web & Backend",
    relatedProjects: ["climachain"],
  },
  {
    id: "flask",
    label: "Flask",
    category: "Web & Backend",
    relatedProjects: [],
  },
  {
    id: "streamlit",
    label: "Streamlit",
    category: "Web & Backend",
    relatedProjects: ["prediction-market-trader"],
  },
  {
    id: "rest-apis",
    label: "REST APIs",
    category: "Web & Backend",
    relatedProjects: ["prediction-market-trader", "climachain"],
  },
  {
    id: "supabase",
    label: "Supabase",
    category: "Web & Backend",
    relatedProjects: ["climachain"],
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    category: "Data & Databases",
    relatedProjects: ["climachain"],
  },
  {
    id: "mysql",
    label: "MySQL",
    category: "Data & Databases",
    relatedProjects: [],
  },
  {
    id: "hive",
    label: "Hive",
    category: "Data & Databases",
    relatedProjects: [],
  },
  {
    id: "pig",
    label: "Apache Pig",
    category: "Data & Databases",
    relatedProjects: [],
  },
  {
    id: "tableau",
    label: "Tableau",
    category: "Data & Databases",
    relatedProjects: [],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "Data & Databases",
    relatedProjects: [],
  },
  {
    id: "vector-dbs",
    label: "Vector DBs",
    category: "Data & Databases",
    relatedProjects: ["prediction-market-trader"],
  },
  {
    id: "nanovectordb",
    label: "NanoVectorDB",
    category: "Data & Databases",
    relatedProjects: ["prediction-market-trader"],
  },
  {
    id: "hadoop",
    label: "Hadoop",
    category: "Data & Databases",
    relatedProjects: [],
  },
  {
    id: "ssms",
    label: "SSMS",
    category: "Data & Databases",
    relatedProjects: [],
  },
  {
    id: "excel",
    label: "Advanced Excel",
    category: "Data & Databases",
    relatedProjects: [],
  },
];
