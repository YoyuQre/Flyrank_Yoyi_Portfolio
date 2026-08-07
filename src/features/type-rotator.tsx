"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const TYPING_MS = 55;
const DELETING_MS = 28;
const HOLD_MS = 1800;

export function TypeRotator({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeout: ReturnType<typeof setTimeout>;

    if (reduce) {
      timeout = setTimeout(() => setText(words[0]), 0);
      return () => clearTimeout(timeout);
    }

    const word = words[index];

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 250);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? word.slice(0, prev.length - 1)
              : word.slice(0, prev.length + 1),
          );
        },
        deleting ? DELETING_MS : TYPING_MS,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span aria-hidden="true" className="inline-flex items-baseline gap-[3px]">
      <span className={cn("whitespace-pre", className)}>{text}</span>
      <span className="caret-blink inline-block h-[1em] w-[2px] translate-y-[1px] rounded-full bg-accent" />
    </span>
  );
}
