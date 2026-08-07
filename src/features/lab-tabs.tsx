"use client";

import * as React from "react";
import { Hammer } from "lucide-react";
import { labSlots } from "@/content/research";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function LabTabs() {
  const [activeId, setActiveId] = React.useState(labSlots[0].id);
  const active = labSlots.find((slot) => slot.id === activeId) ?? labSlots[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div
        role="tablist"
        aria-label="AI Lab modules"
        className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-card/50 p-1.5 backdrop-blur-xl lg:flex-col"
      >
        {labSlots.map((slot) => {
          const isActive = slot.id === activeId;
          return (
            <button
              key={slot.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(slot.id)}
              className={cn(
                "flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-md px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors duration-300",
                isActive
                  ? "bg-solid text-foreground shadow-soft"
                  : "text-muted hover:text-foreground",
              )}
            >
              <span>{slot.label}</span>
              {slot.status === "in-progress" ? (
                <span className="size-1.5 shrink-0 rounded-full bg-accent-3" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="flex flex-col justify-between gap-8 rounded-lg border border-line bg-card/70 p-6 shadow-soft backdrop-blur-xl md:p-8"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold">{active.label}</h3>
            <Badge tone={active.status === "in-progress" ? "accent" : "neutral"}>
              {active.status === "in-progress" ? "In development" : "Slotted"}
            </Badge>
            <Badge tone="neutral">{active.eta}</Badge>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {active.description}
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-line-strong bg-surface/40 p-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Hammer className="size-3.5" />
            <span className="font-mono">
              module://{active.id} — build scheduled
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-2.5 w-3/4 rounded-full bg-line/60" />
            <div className="h-2.5 w-1/2 rounded-full bg-line/60" />
            <div className="h-2.5 w-2/3 rounded-full bg-line/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
