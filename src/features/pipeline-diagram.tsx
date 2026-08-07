"use client";

import * as React from "react";
import type { PipelineEdge, PipelineNode } from "@/content/projects/types";
import { cn } from "@/lib/utils";

const STAGE_ORDER: PipelineNode["stage"][] = ["input", "agent", "store", "output"];

const STAGE_STYLE: Record<
  PipelineNode["stage"],
  { chip: string; dot: string }
> = {
  input: { chip: "border-line bg-card/60 text-muted", dot: "bg-muted" },
  agent: {
    chip: "border-accent/25 bg-accent/8 text-accent",
    dot: "bg-accent",
  },
  store: {
    chip: "border-accent-2/25 bg-accent-2/8 text-accent-2",
    dot: "bg-accent-2",
  },
  output: {
    chip: "border-accent-3/25 bg-accent-3/8 text-accent-3",
    dot: "bg-accent-3",
  },
};

const CARD_W = 232;
const CARD_H = 84;
const PAD = 24;

type NodePos = { node: PipelineNode; x: number; y: number };

function layout(nodes: PipelineNode[], width: number): NodePos[] {
  const byStage = new Map<PipelineNode["stage"], PipelineNode[]>();
  for (const stage of STAGE_ORDER) byStage.set(stage, []);
  for (const node of nodes) byStage.get(node.stage)?.push(node);

  const cols = STAGE_ORDER.length;
  const usableW = Math.max(width - PAD * 2, 1);
  const colStep = usableW / Math.max(cols - 1, 1);
  const maxPerCol = Math.max(
    ...STAGE_ORDER.map((s) => byStage.get(s)?.length ?? 1),
    1,
  );
  const height = maxPerCol * CARD_H + (maxPerCol - 1) * 24 + PAD * 2;

  const positions: NodePos[] = [];
  STAGE_ORDER.forEach((stage, col) => {
    const group = byStage.get(stage) ?? [];
    const rowStep = (height - PAD * 2 - CARD_H) / Math.max(group.length, 1);
    group.forEach((node, row) => {
      positions.push({
        node,
        x: PAD + col * colStep + CARD_W / 2,
        y: PAD + CARD_H / 2 + row * rowStep,
      });
    });
  });

  return positions;
}

export function PipelineDiagram({
  nodes,
  edges,
}: {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const positions = React.useMemo(() => layout(nodes, width || 900), [nodes, width]);
  const byId = React.useMemo(() => {
    const map = new Map<string, NodePos>();
    for (const pos of positions) map.set(pos.node.id, pos);
    return map;
  }, [positions]);

  const maxPerCol = Math.max(
    1,
    ...STAGE_ORDER.map((s) => nodes.filter((n) => n.stage === s).length),
  );
  const height = maxPerCol * CARD_H + (maxPerCol - 1) * 24 + PAD * 2;

  if (width === 0) {
    return <div ref={containerRef} className="h-[300px]" />;
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-auto rounded-lg border border-line bg-surface/40 p-6"
    >
      <div className="relative" style={{ width, height: height + PAD * 2 }}>
        <svg
          width={width}
          height={height + PAD * 2}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 0 L 10 5 L 0 10 z"
                fill="var(--border-strong)"
              />
            </marker>
          </defs>
          {edges.map((edge, i) => {
            const from = byId.get(edge.from);
            const to = byId.get(edge.to);
            if (!from || !to) return null;
            const x1 = from.x + CARD_W / 2;
            const y1 = from.y;
            const x2 = to.x - CARD_W / 2;
            const y2 = to.y;
            const mid = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                />
                <path
                  d={d}
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                  className="pipeline-flow stroke-accent"
                  style={{ animationDelay: `${(i % 6) * 0.35}s` }}
                />
              </g>
            );
          })}
        </svg>

        {positions.map(({ node, x, y }) => {
          const style = STAGE_STYLE[node.stage];
          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y, width: CARD_W }}
            >
              <div className="flex h-[84px] flex-col justify-between rounded-md border border-line bg-solid/90 p-4 shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-semibold leading-tight text-foreground">
                    {node.label}
                  </p>
                  <span className={cn("mt-1 size-2 shrink-0 rounded-full", style.dot)} />
                </div>
                <p className="text-xs leading-snug text-muted">{node.detail}</p>
              </div>
            </div>
          );
        })}

        <div className="mt-6 flex flex-wrap gap-2">
          {STAGE_ORDER.map((stage) => (
            <span
              key={stage}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-medium capitalize",
                STAGE_STYLE[stage].chip,
              )}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
