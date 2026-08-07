import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        Error 404
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Node not found in the graph.
      </h1>
      <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted">
        The page you requested does not exist or has moved. Return to the
        overview to continue exploring the system.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-px hover:bg-accent/90"
      >
        <ArrowLeft className="size-4" />
        Back to overview
      </Link>
    </main>
  );
}
