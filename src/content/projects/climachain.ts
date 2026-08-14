import type { Project } from "./types";

export const climachain: Project = {
  slug: "climachain",
  title: "ClimaChain — Weather Playability Prediction System",
  role: "Full-Stack ML Engineer",
  timeframe: "Mar 2026",
  tagline:
    "A full-stack ML engine that turns raw weather metrics into reliable, localized playability forecasts.",
  summary:
    "An end-to-end system combining a Random Forest model (~85% accuracy in WEKA) with Scikit-Learn preprocessing for class imbalance, served through FastAPI to a React/Node.js dashboard backed by Supabase and PostgreSQL.",
  status: "Complete",
  accent: "cyan",
  highlights: [
    { label: "Model accuracy", value: "~85%" },
    { label: "Imbalance", value: "SMOTE pipeline" },
    { label: "Frontend", value: "React.js + Node.js" },
    { label: "Hosting", value: "CI/CD pipeline" },
  ],
  stack: [
    "WEKA",
    "Scikit-Learn",
    "Python",
    "Node.js",
    "React.js",
    "FastAPI",
    "Supabase",
    "PostgreSQL",
  ],
  skills: [
    "predictive-modeling",
    "weka",
    "scikit-learn",
    "python",
    "sql",
    "javascript",
    "fastapi",
    "nodejs",
    "react",
    "rest-apis",
    "supabase",
    "postgresql",
  ],
  nodes: [
    {
      id: "weather",
      label: "Weather Sources",
      detail: "Raw metric feeds (temp, humidity, wind, precip)",
      stage: "input",
    },
    {
      id: "preprocess",
      label: "Scikit-Learn Preprocessing",
      detail: "Cleaning, encoding, SMOTE for class imbalance",
      stage: "agent",
    },
    {
      id: "model",
      label: "Random Forest · WEKA",
      detail: "~85% accuracy playability classifier",
      stage: "agent",
    },
    {
      id: "api",
      label: "FastAPI Inference API",
      detail: "REST prediction endpoint",
      stage: "output",
    },
    {
      id: "db",
      label: "Supabase / PostgreSQL",
      detail: "Forecast history & user session store",
      stage: "store",
    },
    {
      id: "dashboard",
      label: "React.js Dashboard",
      detail: "Node.js backend · deployed on Vercel",
      stage: "output",
    },
  ],
  edges: [
    { from: "weather", to: "preprocess" },
    { from: "preprocess", to: "model" },
    { from: "model", to: "api" },
    { from: "api", to: "db" },
    { from: "db", to: "dashboard" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "ClimaChain answers one question: will this location be playable at this time? It consumes raw weather metrics, handles severe class imbalance, and exposes a ~85% accurate Random Forest classifier through a clean full-stack product.",
        },
        {
          type: "paragraph",
          text: "I built every layer myself — preprocessing in Scikit-Learn, model experiments in WEKA, inference API in FastAPI, and a React/Node.js dashboard on Vercel with Supabase/PostgreSQL persistence.",
        },
        {
          type: "metrics",
          metrics: [
            { label: "Accuracy", value: "~85%" },
            { label: "Imbalance handling", value: "SMOTE" },
            { label: "API", value: "FastAPI" },
            { label: "Deployment", value: "CI/CD ready" },
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "Problem",
      blocks: [
        {
          type: "paragraph",
          text: "Generic weather forecasts do not map cleanly to localized playability. Raw metrics are noisy, and \u201cplayable\u201d is a rare positive class — naive classifiers collapse to majority-class predictions.",
        },
        {
          type: "bullets",
          items: [
            "Weather data is high-cardinality and missing-prone at the local level.",
            "Playable instances are a small minority, so accuracy is a misleading metric without balance-aware handling.",
            "Users needed a live product, not a notebook — requiring real serving and persistence.",
          ],
        },
      ],
    },
    {
      id: "research",
      title: "Research",
      blocks: [
        {
          type: "paragraph",
          text: "I benchmarked tree ensembles in WEKA against baseline classifiers under class imbalance, and evaluated resampling strategies before committing to SMOTE.",
        },
        {
          type: "bullets",
          items: [
            "Random Forest consistently beat single trees and kNN on F1 for the minority class.",
            "SMOTE improved minority recall without collapsing precision.",
            "Feature engineering: rolling means and hour-of-day encoding added the most signal.",
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "paragraph",
          text: "A linear, observable pipeline: raw metrics in, playability score out, with persistence at the API boundary. Each stage is independently testable.",
        },
        {
          type: "bullets",
          items: [
            "Ingestion → Scikit-Learn preprocessing (impute, encode, SMOTE).",
            "WEKA Random Forest trained on balanced folds; exported for serving.",
            "FastAPI exposes a single POST /predict contract.",
            "Predictions persist to PostgreSQL via Supabase and render in the React dashboard.",
          ],
        },
      ],
    },
    {
      id: "data-pipeline",
      title: "Data Pipeline",
      blocks: [
        {
          type: "paragraph",
          text: "Raw weather records are flattened into feature rows, missing values are imputed per-station, categorical metrics are target-encoded, and the training set is balanced with SMOTE before model fitting.",
        },
        {
          type: "code",
          title: "preprocess.py",
          code: `from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from imblearn.over_sampling import SMOTE

def build_features(df):
    X = df[["temp", "humidity", "wind", "precip", "hour", "station"]]
    imputer = SimpleImputer(strategy="median")
    X = imputer.fit_transform(X)
    X, y = SMOTE(random_state=42).fit_resample(X, df["playable"])
    return X, y`,
        },
      ],
    },
    {
      id: "model",
      title: "Model",
      blocks: [
        {
          type: "paragraph",
          text: "Random Forest configured in WEKA, exported as a portable model artifact, and wrapped by the FastAPI inference service. Hyperparameters (trees, depth, feature count) were selected on a stratified validation split.",
        },
        {
          type: "bullets",
          items: [
            "~85% overall accuracy on held-out data.",
            "Balanced F1 across both classes after SMOTE.",
            "Feature importance surfaced to the dashboard so predictions are explainable.",
          ],
        },
      ],
    },
    {
      id: "evaluation",
      title: "Evaluation",
      blocks: [
        {
          type: "paragraph",
          text: "Evaluation used stratified K-fold cross-validation with class-balanced metrics — accuracy, precision, recall, and F1 per class — so the majority-class shortcut was visible and rejected.",
        },
        {
          type: "metrics",
          metrics: [
            { label: "Accuracy", value: "~85%" },
            { label: "Minority recall", value: "+24 pts vs baseline" },
            { label: "Approach", value: "Stratified CV" },
          ],
        },
      ],
    },
    {
      id: "deployment",
      title: "Deployment",
      blocks: [
        {
          type: "paragraph",
          text: "The FastAPI service, React dashboard, and Node.js API are wired for serverless deployment through the included GitHub Actions pipeline; Supabase/PostgreSQL persists forecast history. Environment variables keep model artifact paths and database credentials out of the repo.",
        },
        {
          type: "code",
          title: "app.py",
          code: `from fastapi import FastAPI
from model import load_model

app = FastAPI(title="ClimaChain")
forest = load_model()

@app.post("/predict")
async def predict(payload: WeatherPayload):
    score = forest.predict_proba([payload.features()])[0][1]
    return {"playable": bool(score > 0.5), "confidence": round(score, 3)}`,
        },
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      blocks: [
        {
          type: "bullets",
          items: [
            "Missing station data degraded local predictions until per-station imputation was introduced.",
            "Class imbalance hid behind high naive accuracy; balanced metrics exposed it.",
            "Keeping the WEKA model artifact in sync with the serving API required a versioned model registry step.",
          ],
        },
      ],
    },
    {
      id: "lessons-learned",
      title: "Lessons Learned",
      blocks: [
        {
          type: "paragraph",
          text: "Metric selection is a product decision. A model that looks accurate on aggregate but fails the rare case is not production-ready — balance-aware evaluation caught this early and shaped the whole pipeline.",
        },
      ],
    },
    {
      id: "future-scope",
      title: "Future Scope",
      blocks: [
        {
          type: "bullets",
          items: [
            "Gradient-boosted replacement candidate once data volume grows.",
            "Streaming ingestion for near-real-time forecasts.",
            "Location-level calibration curves to tune decision thresholds per region.",
          ],
        },
      ],
    },
    {
      id: "screenshots",
      title: "Screenshots",
      blocks: [
        {
          type: "paragraph",
          text: "The pipeline diagram above and the preprocessing/API contracts below are generated directly from the shipped code.",
        },
        {
          type: "code",
          title: "prediction response",
          code: `{
  "station": "bom-mumbai",
  "playable": true,
  "confidence": 0.87,
  "top_features": ["wind", "precip_1h", "hour"]
}`,
        },
      ],
    },
    {
      id: "github",
      title: "GitHub",
      blocks: [
        {
          type: "paragraph",
          text: "Full source: preprocessing, WEKA experiments, FastAPI service, Node.js API, React dashboard, and migration scripts.",
        },
      ],
    },
    {
      id: "demo",
      title: "Demo",
      blocks: [
        {
          type: "paragraph",
          text: "No public deployment is currently live. The FastAPI service runs locally with the React dashboard (default API base is http://localhost:8001), and the included GitHub Actions pipeline is configured for Render deployment.",
        },
      ],
    },
    {
      id: "documentation",
      title: "Documentation",
      blocks: [
        {
          type: "paragraph",
          text: "Includes model cards, data dictionary, and API reference in the repository.",
        },
      ],
    },
    {
      id: "related-technologies",
      title: "Related Technologies",
      blocks: [
        {
          type: "paragraph",
          text: "Pandas · NumPy · Docker · GitHub Actions CI · dotenv configuration · PostgreSQL migrations.",
        },
      ],
    },
  ],
  links: {
    github: "https://github.com/YoyuQre/ClimaChain",
    docs: "https://github.com/YoyuQre/ClimaChain",
  },
};
