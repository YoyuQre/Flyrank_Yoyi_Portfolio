"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GraphField = dynamic(
  () => import("@/features/graph-field").then((m) => m.GraphField),
  { ssr: false, loading: () => null },
);

export function GraphFieldShell() {
  return (
    <Suspense fallback={null}>
      <GraphField />
    </Suspense>
  );
}
