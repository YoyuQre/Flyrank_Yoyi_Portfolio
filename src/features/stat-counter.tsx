"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import * as React from "react";

type StatCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  label?: string;
};

export function StatCounter({
  value,
  decimals = 0,
  suffix = "",
  label,
}: StatCounterProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = React.useState(reduce ? value : 0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduce ? 0.001 : 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <p className="font-display text-2xl font-semibold tabular-nums tracking-tight md:text-3xl">
        {display.toFixed(decimals)}
        {suffix}
      </p>
      {label ? <p className="text-xs leading-snug text-muted">{label}</p> : null}
    </div>
  );
}
