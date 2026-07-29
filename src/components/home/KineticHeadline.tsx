"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

function splitText(text: string) {
  return text.split("").map((char, i) => (
    <span
      key={`${char}-${i}`}
      className="inline-block will-change-transform"
      style={{ whiteSpace: char === " " ? "pre" : undefined }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export function KineticHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const line1Chars = line1Ref.current?.querySelectorAll("span") ?? [];
    const line2Chars = line2Ref.current?.querySelectorAll("span") ?? [];

    const ctx = gsap.context(() => {
      gsap.set([...line1Chars, ...line2Chars], { opacity: 0, y: 36 });
      gsap.set(subRef.current, { opacity: 0, y: 12 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(line1Chars, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.028,
        })
        .to(
          line2Chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.016,
          },
          "-=0.4",
        )
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.25");

      gsap.to(line1Ref.current, {
        fontVariationSettings: '"wght" 700, "opsz" 144, "SOFT" 40, "WONK" 1',
        letterSpacing: "-0.04em",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <h1 className="font-display text-[clamp(3.25rem,11vw,9rem)] leading-[0.92] tracking-[-0.03em]">
        <span
          ref={line1Ref}
          className="block"
          style={{ fontVariationSettings: '"wght" 500, "opsz" 96, "SOFT" 0' }}
        >
          {splitText(siteConfig.name)}
        </span>
        <span
          ref={line2Ref}
          className="mt-4 block max-w-[18ch] text-[clamp(1.35rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-muted md:mt-6"
        >
          {splitText(siteConfig.tagline)}
        </span>
      </h1>
      <p
        ref={subRef}
        className="mt-6 max-w-md font-mono text-xs leading-relaxed text-muted md:mt-8 md:text-sm"
      >
        {siteConfig.positioning}
      </p>
    </div>
  );
}
