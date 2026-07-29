import type { Metadata } from "next";
import Link from "next/link";

import { resumeData } from "@/lib/resume-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `ATS-readable resume for ${siteConfig.name} — AI startup CTO, applied AI engineer.`,
  robots: { index: true, follow: true },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Resume · structured for ATS and recruiters
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{siteConfig.name}</h1>
      <p className="mt-2 font-mono text-sm text-muted">
        Co-founder & CTO · Applied AI · Minerva University
      </p>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Dense keyword layer only — narrative context lives on{" "}
        <Link href="/about" className="font-medium text-foreground underline underline-offset-2">
          About
        </Link>{" "}
        and{" "}
        <Link href="/work" className="font-medium text-foreground underline underline-offset-2">
          Work
        </Link>
        .
      </p>

      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent-cta">
          Summary
        </h2>
        <p className="mt-3 text-sm leading-relaxed">{resumeData.summary}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent-cta">
          Skills
        </h2>
        <p className="mt-3 text-sm leading-relaxed">
          {resumeData.skills.join(" · ")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent-cta">
          Experience
        </h2>
        <ul className="mt-4 space-y-8">
          {resumeData.experience.map((job) => (
            <li key={`${job.company}-${job.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium">{job.role}</h3>
                <span className="font-mono text-xs text-muted">{job.period}</span>
              </div>
              <p className="font-mono text-sm text-muted">{job.company}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent-cta">
          Education
        </h2>
        <ul className="mt-4 space-y-4">
          {resumeData.education.map((edu) => (
            <li key={edu.school}>
              <p className="font-medium">{edu.degree}</p>
              <p className="font-mono text-sm text-muted">
                {edu.school} · {edu.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent-cta">
          Open Source & Technical Projects
        </h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
          {resumeData.projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-border/60 pt-10">
        <p className="font-mono text-xs text-muted">
          {siteConfig.email} · {siteConfig.links.github} ·{" "}
          {siteConfig.links.linkedin}
        </p>
      </section>
    </div>
  );
}
