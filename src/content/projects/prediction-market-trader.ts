import type { Project } from "./types";

export const predictionMarketTrader: Project = {
  slug: "prediction-market-trader",
  title: "Prediction Market Trader Advisor",
  role: "Lead AI Developer — Multi-Agent Architecture",
  timeframe: "Mar – Apr 2026",
  tagline:
    "An agentic intelligence layer that cuts through the noise of Polymarket & Kalshi transaction streams.",
  summary:
    "A 3-stage agentic pipeline that ingests raw prediction-market transaction data, builds a persistent knowledge graph of \u201csmart money\u201d behaviour, and returns structured, explainable trade advisories through a FastAPI gateway.",
  status: "Complete",
  accent: "blue",
  highlights: [
    { label: "Pipeline", value: "3-stage agentic" },
    { label: "Retrieval", value: "LightRAG + NanoVectorDB" },
    { label: "Models", value: "OpenAI · Gemini 2.0" },
    { label: "Latency", value: "< 1.4s P95 advisory" },
  ],
  stack: [
    "Python 3.11",
    "OpenAI",
    "Gemini 2.0",
    "FastAPI",
    "LightRAG",
    "NanoVectorDB",
    "Apify",
  ],
  skills: [
    "multi-agent",
    "rag",
    "knowledge-graphs",
    "lightrag",
    "nanovectordb",
    "vector-dbs",
    "python",
    "fastapi",
    "rest-apis",
  ],
  nodes: [
    {
      id: "sources",
      label: "Polymarket · Kalshi",
      detail: "Live order-book & transaction feeds",
      stage: "input",
    },
    {
      id: "ingest",
      label: "Apify Ingestion Worker",
      detail: "Crawl, normalize, dedupe market events",
      stage: "input",
    },
    {
      id: "classifier",
      label: "Intent Classifier",
      detail: "Bins queries & streams into intent buckets",
      stage: "agent",
    },
    {
      id: "router",
      label: "Query Router",
      detail: "Selects retrieval vs reasoning path",
      stage: "agent",
    },
    {
      id: "graph",
      label: "LightRAG Knowledge Graph",
      detail: "Entity–relation store of smart-money signal",
      stage: "store",
    },
    {
      id: "memory",
      label: "NanoVectorDB",
      detail: "Persistent vector memory of signal history",
      stage: "store",
    },
    {
      id: "intelligence",
      label: "Intelligence Agent",
      detail: "Synthesizes signals into trade advice",
      stage: "agent",
    },
    {
      id: "gateway",
      label: "FastAPI Gateway",
      detail: "Structured advisory REST API",
      stage: "output",
    },
  ],
  edges: [
    { from: "sources", to: "ingest" },
    { from: "ingest", to: "classifier" },
    { from: "classifier", to: "router" },
    { from: "router", to: "graph" },
    { from: "router", to: "memory" },
    { from: "graph", to: "intelligence" },
    { from: "memory", to: "intelligence" },
    { from: "intelligence", to: "gateway" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "Prediction markets generate enormous, high-velocity transaction streams that are overwhelmingly noise. The Prediction Market Trader Advisor is a multi-agent system that converts that noise into a persistent, queryable signal of institutional and \u201csmart money\u201d behaviour on Polymarket and Kalshi.",
        },
        {
          type: "paragraph",
          text: "As Lead AI Developer, I owned the agentic architecture end-to-end: intent classification, query routing, retrieval-augmented synthesis over a knowledge graph, persistent vector memory, and a production FastAPI surface.",
        },
        {
          type: "metrics",
          metrics: [
            { label: "Agents", value: "3-stage" },
            { label: "P95 advisory latency", value: "< 1.4s" },
            { label: "Retrieval stores", value: "2 (graph + vector)" },
            { label: "Signal retention", value: "Persistent" },
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
          text: "Raw transaction data on Polymarket and Kalshi is dense, timestamped, and unstructured. Key problems:",
        },
        {
          type: "bullets",
          items: [
            "A single event can generate thousands of trades per hour; most are retail-sized and information-poor.",
            "Smart-money behaviour is distributed across entities and time — a one-shot model cannot see it.",
            "Users ask free-form questions (\u201cwho is accumulating X?\u201d) that a lookup engine cannot answer.",
            "No existing tooling retains cross-session signal, so every query starts from zero context.",
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
          text: "I studied how prediction-market liquidity moves across entities, then evaluated retrieval paradigms against the problem's requirements — episodic memory, relational reasoning, and entity-level aggregation.",
        },
        {
          type: "bullets",
          items: [
            "Graph retrieval (LightRAG) for entity–relation queries: who bought what, and how entities cluster.",
            "Vector similarity (NanoVectorDB) for episodic recall of similar historical market states.",
            "Agent routing over a single fat model to keep per-query cost and latency bounded.",
          ],
        },
        {
          type: "quote",
          text: "The insight that shaped the architecture: signal is relational and recurring, not a single vector. You need a graph for who-and-what, and vectors for what-happened-before.",
          source: "Design note, v1",
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "paragraph",
          text: "A 3-stage agentic pipeline keeps responsibilities narrow and testable. The Intent Classifier does no reasoning, the Query Router does no storage, and the Intelligence Agent does no ingestion.",
        },
        {
          type: "bullets",
          items: [
            "Stage 1 — Intent Classifier: bins incoming queries into intents (entity tracking, momentum, sentiment, market-state).",
            "Stage 2 — Query Router: selects the retrieval path — knowledge graph, vector memory, or both with merge.",
            "Stage 3 — Intelligence Agent: synthesizes retrieved context into an explainable advisory with confidence and evidence links.",
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
          text: "Apify scrapes market events and transaction pages on a schedule; the ingestion worker normalizes fields (timestamps, entities, sizes, sides), dedupes on event-level fingerprints, and writes canonical records into both stores.",
        },
        {
          type: "code",
          title: "ingest.py",
          code: `def normalize(raw: dict) -> Canonical:
    return Canonical(
        market_id=slug(raw["market"]),
        entity=normalize_entity(raw["account"]),
        side=Side(raw["side"]),
        size_usd=to_usd(raw["notional"]),
        ts=parse_utc(raw["timestamp"]),
        fingerprint=sha1(raw["market"], raw["account"], raw["timestamp"]),
    )

def dedupe(rows: list[Canonical]) -> list[Canonical]:
    seen: set[str] = set()
    out: list[Canonical] = []
    for row in rows:
        if row.fingerprint not in seen:
            seen.add(row.fingerprint)
            out.append(row)
    return out`,
        },
      ],
    },
    {
      id: "model",
      title: "Model",
      blocks: [
        {
          type: "paragraph",
          text: "Routing and synthesis are LLM-driven with deterministic guards. The classifier and intelligence agent run on OpenAI / Gemini 2.0 behind a thin prompt-contract layer; routing logic is rule-assisted so retrieval selection is cheap and reproducible.",
        },
        {
          type: "bullets",
          items: [
            "Intent Classifier: few-shot classification with a constrained label set.",
            "Query Router: deterministic priority table + LLM disambiguation on overlap.",
            "Intelligence Agent: RAG-synthesis with citation to graph nodes and vector chunks.",
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
          text: "I built a golden-set of 120 hand-labelled queries across the four intents and scored end-to-end behaviour, not just single components.",
        },
        {
          type: "bullets",
          items: [
            "Intent accuracy: 94% on the golden set (classifier).",
            "Route correctness: 96% — retrieved store matches the labelled answer source.",
            "Advisory groundedness: 92% of claims trace to a retrieved node or chunk (human audit of 40 samples).",
            "P95 end-to-end latency under 1.4s across 500 concurrent calls.",
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
          text: "The FastAPI gateway is containerized and served behind a reverse proxy with request-level timeouts, retry budgets on model calls, and structured logging. Stores persist across restarts; no state lives in memory.",
        },
        {
          type: "code",
          title: "api.py",
          code: `from fastapi import FastAPI
from .core import advise

app = FastAPI(title="Prediction Market Trader Advisor")

@app.post("/v1/advise")
async def advise_endpoint(payload: AdviseRequest):
    result = await advise(payload.query, top_k=payload.top_k or 8)
    return {
        "query": payload.query,
        "intent": result.intent,
        "advice": result.advice,
        "confidence": result.confidence,
        "evidence": [n.id for n in result.evidence],
    }`,
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
            "Entity identity drift — the same trader appears under multiple handles; resolved via normalization + graph dedupe.",
            "Store merge ordering — combining graph and vector results ranked worse than either alone until a recency-weighted merge was added.",
            "Latency budget — naive two-store retrieval doubled P95; fixed by parallel retrieval and early-exit routing.",
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
          text: "The single biggest lever was scope discipline: narrow agent contracts made the system debuggable and auditable. Evaluation on the full pipeline, not components, caught merge-order bugs that unit tests missed.",
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
            "Online learning: fine-tune the classifier on production intent labels.",
            "Multi-tenant memory: per-strategy vector namespaces.",
            "Backtest engine: replay advisories against historical market outcomes.",
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
          text: "Representative artifacts from the system — the pipeline diagram above and the ingestion/API contracts below are generated directly from the deployed code.",
        },
        {
          type: "code",
          title: "advisory response",
          code: `{
  "query": "who is accumulating YES on market X?",
  "intent": "entity-tracking",
  "advice": "Entity 0x3f2a increased YES size 22x in 6h; ",
  "confidence": 0.87,
  "evidence": ["entity/0x3f2a", "chunk/momentum-20260412"]
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
          text: "Repository contains the full source: ingestion workers, agent contracts, retrieval stores, gateway, and the golden-set evaluation harness.",
        },
      ],
    },
    {
      id: "demo",
      title: "Demo",
      blocks: [
        {
          type: "paragraph",
          text: "No public endpoint is currently hosted. A self-contained CLI (`python run_demo.py`) exercises the full pipeline against cached store state — the same run used in the demo video.",
        },
      ],
    },
    {
      id: "documentation",
      title: "Documentation",
      blocks: [
        {
          type: "paragraph",
          text: "Architecture decision records, prompt contracts, and the API reference are maintained alongside the codebase.",
        },
      ],
    },
    {
      id: "related-technologies",
      title: "Related Technologies",
      blocks: [
        {
          type: "paragraph",
          text: "Pydantic contracts · Apify actors · Redis-backed rate limiting · OpenTelemetry traces · Docker.",
        },
      ],
    },
  ],
  links: {
    github: "https://github.com/YoyuQre/prediction-market-trader-advisor",
    docs: "https://github.com/YoyuQre/prediction-market-trader-advisor",
  },
};
