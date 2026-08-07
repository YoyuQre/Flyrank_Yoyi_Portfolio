import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mohammed Yahya — AI Engineer & Systems Architect";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0f172a",
          color: "#f1f5f9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.35em",
              color: "#94a3b8",
            }}
          >
            YAHYA.AI
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Architecting agentic intelligence and scalable ML pipelines.
          </div>
          <div style={{ fontSize: 28, color: "#94a3b8", maxWidth: 820 }}>
            Mohammed Yahya · AI Engineer & Systems Architect
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: 20,
            color: "#3b82f6",
          }}
        >
          <span>Multi-Agent Orchestration</span>
          <span>·</span>
          <span>RAG & Knowledge Graphs</span>
          <span>·</span>
          <span>Predictive ML</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
