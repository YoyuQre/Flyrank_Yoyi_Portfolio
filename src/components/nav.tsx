"use client";

import { Download, Menu, X } from "lucide-react";
import * as React from "react";
import { navItems } from "@/constants/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

function BrandMark() {
  return (
    <a
      href="#overview"
      className="flex items-center gap-2.5"
      aria-label="Yahya AI — back to overview"
    >
      <span className="flex items-center gap-2">
        <span className="glow-dot size-2 rounded-full bg-status" />
        <span className="font-display text-sm font-bold tracking-tight">
          {site.brand}
        </span>
      </span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          "mx-auto flex h-14 w-full max-w-4xl items-center justify-between gap-3 rounded-full border border-line bg-card/70 px-4 backdrop-blur-xl transition-shadow duration-500",
          scrolled && "shadow-glass",
        )}
        aria-label="Primary"
      >
        <BrandMark />

        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-muted transition-colors duration-300 hover:bg-card hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={site.resumeUrl}
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-px hover:bg-accent/90 sm:inline-flex"
          >
            <Download className="size-3.5" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-card lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "mx-auto mt-2 w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-card/95 shadow-glass backdrop-blur-xl transition-all duration-300 ease-out-expo lg:hidden",
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white"
          >
            <Download className="size-4" />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
