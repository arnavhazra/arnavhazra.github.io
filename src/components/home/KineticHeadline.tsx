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
      gsap.set([...line1Chars, ...line2Chars], { opacity: 0, y: 28 });
      gsap.set(subRef.current, { opacity: 0, y: 16 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(line1Chars, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.025,
        })
        .to(
          line2Chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.018,
          },
          "-=0.35",
        )
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      gsap.to(line1Ref.current, {
        fontVariationSettings: '"wght" 650, "SOFT" 25, "WONK" 1',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative space-y-3">
      <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
        <span ref={line1Ref} className="block">
          {splitText(siteConfig.name)}
        </span>
        <span
          ref={line2Ref}
          className="mt-3 block text-muted md:mt-5 md:text-4xl lg:text-5xl"
        >
          {splitText(siteConfig.tagline)}
        </span>
      </h1>
      <p
        ref={subRef}
        className="max-w-2xl pt-4 font-mono text-sm leading-relaxed text-muted md:text-base"
      >
        {siteConfig.positioning}
      </p>
    </div>
  );
}
