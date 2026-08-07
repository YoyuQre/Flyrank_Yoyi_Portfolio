"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/use-theme";

const NODE_COUNT = 92;

type NetworkData = {
  positions: Float32Array;
  edgePositions: Float32Array;
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(count: number): NetworkData {
  const rng = mulberry32(7);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 1.15 + rng() * 2.05;
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.85;
  }

  const edgeSet = new Set<string>();
  const pairs: number[] = [];
  const distSq = (a: number, b: number) => {
    const dx = positions[a * 3] - positions[b * 3];
    const dy = positions[a * 3 + 1] - positions[b * 3 + 1];
    const dz = positions[a * 3 + 2] - positions[b * 3 + 2];
    return dx * dx + dy * dy + dz * dz;
  };

  for (let i = 0; i < count; i++) {
    const nearest: number[] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      nearest.push(j);
    }
    nearest.sort((a, b) => distSq(i, a) - distSq(i, b));
    for (const k of [0, 1, 2]) {
      const j = nearest[k];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        pairs.push(i, j);
      }
    }
  }

  const edgePositions = new Float32Array(pairs.length * 3);
  pairs.forEach((nodeIndex, e) => {
    edgePositions[e * 3] = positions[nodeIndex * 3];
    edgePositions[e * 3 + 1] = positions[nodeIndex * 3 + 1];
    edgePositions[e * 3 + 2] = positions[nodeIndex * 3 + 2];
  });

  return { positions, edgePositions };
}

function Network({
  nodeColor,
  edgeColor,
}: {
  nodeColor: string;
  edgeColor: string;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const data = React.useMemo(() => buildNetwork(NODE_COUNT), []);
  const target = React.useRef({ x: 0, y: 0 });
  const prev = React.useRef({ x: 0, y: 0 });
  const baseRotation = React.useRef(0);

  const nodeGeo = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    return geo;
  }, [data]);

  const edgeGeo = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(data.edgePositions, 3),
    );
    return geo;
  }, [data]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const px = state.pointer.x;
    const py = state.pointer.y;
    const velX = px - prev.current.x;
    const velY = py - prev.current.y;
    prev.current = { x: px, y: py };

    const k = Math.min(delta * 2.4, 1);
    target.current.x +=
      (py * 0.34 + velY * 1.4 - target.current.x) * k;
    target.current.y +=
      (px * 0.5 + velX * 1.4 - target.current.y) * k;

    baseRotation.current += delta * 0.022;
    const t = state.clock.elapsedTime;

    group.rotation.x = target.current.x + Math.sin(t * 0.14) * 0.02;
    group.rotation.y = baseRotation.current + target.current.y;
  });

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeo}>
        <pointsMaterial
          color={nodeColor}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial
          color={edgeColor}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function StaticConstellation({
  nodeColor,
  edgeColor,
}: {
  nodeColor: string;
  edgeColor: string;
}) {
  const points = React.useMemo(() => {
    const rng = mulberry32(11);
    return Array.from({ length: 44 }, (_, i) => {
      const angle = (i / 44) * Math.PI * 2;
      const radius = 18 + rng() * 46;
      return {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.7,
      };
    });
  }, []);

  const lines = React.useMemo(() => {
    const result: string[] = [];
    points.forEach((a, i) => {
      const dists = points
        .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
        .filter(({ j }) => j !== i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);
      for (const { j } of dists) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!result.includes(key)) {
          result.push(key);
        }
      }
    });
    return result;
  }, [points]);

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {lines.map((key) => {
        const [a, b] = key.split("-").map(Number);
        return (
          <line
            key={key}
            x1={points[a].x}
            y1={points[a].y}
            x2={points[b].x}
            y2={points[b].y}
            stroke={edgeColor}
            strokeWidth="0.35"
          />
        );
      })}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="0.9" fill={nodeColor} />
      ))}
    </svg>
  );
}

export function GraphField() {
  const { theme } = useTheme();
  const [mode] = React.useState<"static" | "webgl">(() => {
    if (typeof window === "undefined") return "static";
    const canvas = document.createElement("canvas");
    const supported =
      canvas.getContext("webgl2") !== null ||
      canvas.getContext("webgl") !== null;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return supported && !reduce ? "webgl" : "static";
  });

  const dark = theme === "dark";
  const nodeColor = dark ? "#60a5fa" : "#2563eb";
  const edgeColor = dark ? "rgba(96,165,250,0.4)" : "rgba(37,99,235,0.35)";

  if (mode === "static") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <StaticConstellation nodeColor={nodeColor} edgeColor={edgeColor} />
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full"
      aria-hidden="true"
    >
      <Network nodeColor={nodeColor} edgeColor={edgeColor} />
    </Canvas>
  );
}
