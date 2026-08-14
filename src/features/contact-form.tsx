"use client";

import { Loader2, Send } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function validate(
  name: string,
  email: string,
  message: string,
): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length < 20) {
    errors.message = "Tell me a little more — at least 20 characters.";
  }
  return errors;
}

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formError, setFormError] = React.useState("");
  const submittingRef = React.useRef(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const next = validate(name, email, message);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    submittingRef.current = true;
    setStatus("submitting");
    setFormError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.ok) {
        setStatus("error");
        setFormError(
          data?.error ??
            "Something went wrong while sending your message. Please try again.",
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setFormError(
        "Something went wrong while sending your message. Please try again.",
      );
    } finally {
      submittingRef.current = false;
    }
  };

  const field = (key: keyof FieldErrors) =>
    errors[key] ? (
      <p className="mt-1.5 text-xs text-red-500" role="alert">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-medium text-muted"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={cn(
              "h-11 w-full rounded-md border border-line bg-solid/60 px-4 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-accent/40",
              errors.name && "border-red-500/50",
            )}
            placeholder="Jane Doe"
          />
          {field("name")}
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-medium text-muted"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={cn(
              "h-11 w-full rounded-md border border-line bg-solid/60 px-4 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-accent/40",
              errors.email && "border-red-500/50",
            )}
            placeholder="jane@company.com"
          />
          {field("email")}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-medium text-muted"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          className={cn(
            "w-full resize-none rounded-md border border-line bg-solid/60 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-accent/40",
            errors.message && "border-red-500/50",
          )}
          placeholder="Describe the system you want to build…"
        />
        {field("message")}
      </div>

      {status === "success" ? (
        <p className="rounded-md border border-status/25 bg-status/8 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          Thanks! Your message has been sent successfully. I&apos;ll reply
          within 24 hours.
        </p>
      ) : status === "error" ? (
        <p className="rounded-md border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-500">
          {formError || "Something went wrong while sending your message. Please try again."}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-8 text-sm font-medium text-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-px hover:bg-accent/90 hover:shadow-glass disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "submitting" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {status === "submitting" ? "Transmitting…" : "Send Message"}
      </button>
    </form>
  );
}
