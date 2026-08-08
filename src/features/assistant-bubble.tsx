"use client";

import { Bot, X } from "lucide-react";
import * as React from "react";
import { AssistantChat } from "@/features/assistant-chat";

export function AssistantBubble() {
  const [open, setOpen] = React.useState(false);

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="w-[min(92vw,380px)] overflow-hidden rounded-lg border border-line bg-solid/95 shadow-glass backdrop-blur-xl">
          <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
            <span className="flex size-7 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Bot className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">
                Portfolio Assistant
              </p>
              <p className="flex items-center gap-1.5 text-[10px] text-muted">
                <span className="size-1.5 rounded-full bg-status glow-dot" />
                Retrieval over this site
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors duration-300 hover:bg-card hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
          <AssistantChat
            className="h-[420px] rounded-none border-0"
            onNavigate={handleNavigate}
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        className="group inline-flex size-14 items-center justify-center rounded-full bg-accent text-white shadow-glass transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-accent/90"
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <Bot className="size-6" />
        )}
      </button>
    </div>
  );
}
