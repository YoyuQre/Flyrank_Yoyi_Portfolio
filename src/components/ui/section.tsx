import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/features/reveal";

type SectionProps = React.ComponentProps<"section"> & {
  id: string;
  containerClassName?: string;
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-24 md:py-[120px]", className)}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-[1280px] px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-16 flex flex-col gap-4",
        align === "center" && "items-center text-center",
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted md:text-[15px]">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
