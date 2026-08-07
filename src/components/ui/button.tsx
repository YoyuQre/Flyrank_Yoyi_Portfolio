import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-soft hover:bg-accent/90 hover:-translate-y-px hover:shadow-glass",
        secondary:
          "border border-line bg-card/60 backdrop-blur-sm text-foreground hover:border-line-strong hover:bg-solid hover:-translate-y-px",
        ghost: "text-muted hover:text-foreground hover:bg-card",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    target?: string;
    rel?: string;
  };

export function Button({
  className,
  variant,
  size,
  href,
  target,
  rel,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel ?? (target === "_blank" ? "noreferrer noopener" : undefined)}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
