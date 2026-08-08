"use client";

import {
  ArrowUpRight,
  Bot,
  CornerDownLeft,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type AssistantKind =
  | "project"
  | "research"
  | "skill"
  | "profile"
  | "experience";

type AssistantMatch = {
  id: string;
  kind: AssistantKind;
  title: string;
  href: string;
  snippet: string;
  score: number;
};

type AssistantResponse = {
  ok: boolean;
  matches: AssistantMatch[];
};

type Message = {
  role: "user" | "assistant";
  text: string;
  matches?: AssistantMatch[];
};

const KIND_LABEL: Record<AssistantKind, string> = {
  project: "Project",
  research: "Research",
  skill: "Skill",
  profile: "Profile",
  experience: "Experience",
};

const SUGGESTIONS = [
  "What projects has Yahya built?",
  "Tell me about the Prediction Market Trader",
  "What is his experience with RAG?",
  "How do I contact him?",
];

const GREETING =
  "I'm a retrieval assistant over this site's content — projects, research notes, skills, and experience. Ask me anything; I'll pull the most relevant sources.";

export function AssistantChat({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "assistant", text: GREETING },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const ask = async (raw: string) => {
    const query = raw.trim();
    if (!query || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = (await res.json()) as AssistantResponse;

      if (data.ok && data.matches.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `Found ${data.matches.length} relevant source${data.matches.length === 1 ? "" : "s"}:`,
            matches: data.matches,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "No close matches in the site content. Try asking about a project, skill, research note, or how to get in touch.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "The search service didn't respond. Try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void ask(input);
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-line bg-solid/50",
        className,
      )}
    >
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto p-4"
        role="log"
        aria-live="polite"
      >
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div key={index} className="flex justify-end">
              <div className="max-w-[85%] rounded-md bg-accent px-3.5 py-2.5 text-sm text-white shadow-soft">
                {message.text}
              </div>
            </div>
          ) : (
            <div key={index} className="flex gap-2.5">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                <Bot className="size-3.5" />
              </span>
              <div className="min-w-0 max-w-[85%] space-y-2.5">
                <p className="text-sm leading-relaxed text-foreground">
                  {message.text}
                </p>
                {message.matches ? (
                  <div className="flex flex-col gap-2">
                    {message.matches.map((match) => (
                      <a
                        key={match.id}
                        href={match.href}
                        onClick={onNavigate}
                        className="group block rounded-md border border-line bg-card/70 p-3 transition-colors duration-300 hover:border-accent/30 hover:bg-card"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-2">
                            {KIND_LABEL[match.kind]}
                          </span>
                          <ArrowUpRight className="ml-auto size-3.5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                        </div>
                        <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                          {match.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                          {match.snippet}
                        </p>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ),
        )}
        {loading ? (
          <div className="flex gap-2.5">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Bot className="size-3.5" />
            </span>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Loader2 className="size-4 animate-spin" />
              Searching the site…
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-line p-3">
        {messages.length <= 1 ? (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void ask(suggestion)}
                className="inline-flex items-center gap-1 rounded-full border border-line bg-card/60 px-2.5 py-1 text-[11px] text-muted transition-colors duration-300 hover:border-accent/30 hover:text-foreground"
              >
                <Sparkles className="size-3" />
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about projects, skills, experience…"
            aria-label="Ask the assistant"
            className="h-10 w-full rounded-md border border-line bg-solid/60 px-3.5 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-accent/40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-white shadow-soft transition-all duration-300 ease-out-expo hover:bg-accent/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </button>
        </form>
        <p className="mt-2 flex items-center gap-1 text-[10px] text-muted/70">
          <CornerDownLeft className="size-3" />
          Retrieval-only · answers link straight to page sections
        </p>
      </div>
    </div>
  );
}
