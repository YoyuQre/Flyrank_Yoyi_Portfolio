import { Mail } from "lucide-react";
import {
  GithubIcon,
  KaggleIcon,
  LinkedinIcon,
} from "@/components/ui/brand-icons";
import { navItems } from "@/constants/nav";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card/40 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="flex items-center gap-2.5 font-display text-sm font-bold tracking-tight">
            <span className="glow-dot size-2 rounded-full bg-status" />
            {site.brand}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            AI Engineer & Systems Architect. Architecting agentic
            intelligence and scalable ML pipelines in {site.location}.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={site.socials.kaggle}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Kaggle"
              className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
            >
              <KaggleIcon className="size-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Footer">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="text-xs leading-relaxed text-muted">
          {site.status}
          <br />
          &copy; {new Date().getFullYear()} Mohammed Yahya Mohammed Qayyum
          Qureshi
          <br />
          Built as a Next.js engineering product.
        </p>
      </div>
    </footer>
  );
}
