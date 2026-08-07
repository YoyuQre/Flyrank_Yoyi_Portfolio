import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  tone?: "default" | "accent" | "success" | "neutral";
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tone === "default" && "border-line bg-card text-muted",
        tone === "accent" && "border-accent/20 bg-accent/8 text-accent",
        tone === "success" && "border-status/20 bg-status/8 text-status",
        tone === "neutral" &&
          "border-line bg-surface/60 text-muted font-mono text-[11px] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
