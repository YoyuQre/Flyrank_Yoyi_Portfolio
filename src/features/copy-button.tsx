"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

type CopyButtonProps = {
  value: string;
  label: string;
  className?: string;
};

export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-md border border-line bg-card/60 px-3 py-1.5 text-xs text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
      }
    >
      {copied ? (
        <Check className="size-3.5 text-status" />
      ) : (
        <Copy className="size-3.5" />
      )}
      <span className="font-mono">{copied ? "Copied" : value}</span>
    </button>
  );
}
