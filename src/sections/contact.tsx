import { MapPin, Mail, Phone } from "lucide-react";
import {
  GithubIcon,
  KaggleIcon,
  LinkedinIcon,
} from "@/components/ui/brand-icons";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/features/reveal";
import { CopyButton } from "@/features/copy-button";
import { ContactForm } from "@/features/contact-form";
import { site } from "@/lib/site";

const contactLinks = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
    icon: Phone,
  },
];

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Transmit a request."
        description="Have a system that needs architecting? Send a message and I will respond within 24 hours."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <Card className="flex h-full flex-col p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Badge tone="success" className="mb-1">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-status" />
                </span>
                {site.availability}
              </Badge>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {contactLinks.map((link) => (
                <div key={link.label} className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted">{link.label}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors duration-300 hover:text-accent"
                    >
                      <link.icon className="size-4 text-muted" />
                      {link.value}
                    </a>
                    <CopyButton value={link.value} label={link.label} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-line pt-6 text-sm text-muted">
              <MapPin className="size-4" />
              {site.location} · GMT+5:30
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex size-10 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="inline-flex size-10 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={site.socials.kaggle}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Kaggle"
                className="inline-flex size-10 items-center justify-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-foreground"
              >
                <KaggleIcon className="size-4" />
              </a>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full p-6 md:p-8">
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
