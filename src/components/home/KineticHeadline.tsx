"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function KineticHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { fontVariationSettings: '"wght" 300', opacity: 0.6 },
        {
          fontVariationSettings: '"wght" 700',
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        line2Ref.current,
        { x: 40, opacity: 0.4 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-2">
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
        <span ref={line1Ref} className="block">
          Arnav Hazra
        </span>
        <span
          ref={line2Ref}
          className="mt-2 block text-muted md:mt-4 md:text-5xl lg:text-6xl"
        >
          builds systems that decide.
        </span>
      </h1>
      <p className="max-w-2xl pt-6 font-mono text-sm leading-relaxed text-muted md:text-base">
        {siteConfig.positioning}
      </p>
    </div>
  );
}
