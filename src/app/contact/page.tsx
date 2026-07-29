import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} — investors, hiring managers, and collaborators.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
        Start a conversation
      </h1>
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
        Investors evaluating decision infrastructure. Hiring managers who care
        about agentic systems and production RAG. Collaborators building
        something hard. I respond fastest to email — tell me what you are trying
        to decide, not just what role you are filling.
      </p>

      <div className="mt-12 space-y-6">
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-4 rounded-2xl border border-border card-glass p-6 transition hover:border-accent-cta/40"
        >
          <Mail className="text-accent-cta" size={20} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Work · Neural Next
            </p>
            <p className="mt-1">{siteConfig.email}</p>
          </div>
        </a>

        <a
          href={`mailto:${siteConfig.personalEmail}`}
          className="flex items-center gap-4 rounded-2xl border border-border card-glass p-6 transition hover:border-accent-cta/40"
        >
          <Mail className="text-muted" size={20} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Personal
            </p>
            <p className="mt-1">{siteConfig.personalEmail}</p>
          </div>
        </a>

        <div className="flex gap-4 pt-4">
          <a
            href={siteConfig.links.github}
            className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-accent-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-accent-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
