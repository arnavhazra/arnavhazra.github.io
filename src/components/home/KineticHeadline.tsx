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
      className="kinetic-char inline-block will-change-transform"
      style={{ whiteSpace: char === " " ? "pre" : undefined }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

type KineticHeadlineProps = {
  pinTarget?: string;
};

export function KineticHeadline({ pinTarget }: KineticHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const handoffRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const line1Chars = line1Ref.current?.querySelectorAll(".kinetic-char") ?? [];
    const line2Chars = line2Ref.current?.querySelectorAll(".kinetic-char") ?? [];

    const ctx = gsap.context(() => {
      // Brand stays painted — mild rise only, no clip/hide
      gsap.fromTo(
        line1Chars,
        { y: 28 },
        {
          y: 0,
          duration: 0.9,
          stagger: 0.022,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        line2Chars,
        { yPercent: 80 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.016,
          delay: 0.28,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        [subRef.current, handoffRef.current],
        { y: 16 },
        { y: 0, duration: 0.7, delay: 0.55, ease: "power2.out", stagger: 0.08 },
      );

      const pinEl = pinTarget
        ? document.querySelector(pinTarget)
        : containerRef.current;

      gsap.to(line1Ref.current, {
        fontVariationSettings: '"wght" 750, "opsz" 144, "SOFT" 50, "WONK" 1',
        letterSpacing: "-0.045em",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "bottom top",
          scrub: 1.05,
        },
      });

      gsap.to(line2Ref.current, {
        opacity: 0.35,
        y: -24,
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "80% top",
          scrub: true,
        },
      });

      gsap.fromTo(
        handoffRef.current,
        { opacity: 0.25 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: pinEl,
            start: "40% top",
            end: "85% top",
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [pinTarget]);

  return (
    <div ref={containerRef} className="relative">
      <h1 className="font-display text-[clamp(3.5rem,12vw,9.5rem)] leading-[0.9] tracking-[-0.035em]">
        <span
          ref={line1Ref}
          className="block"
          style={{
            fontVariationSettings: '"wght" 520, "opsz" 96, "SOFT" 10',
          }}
        >
          {splitText(siteConfig.name)}
        </span>
        <span className="mt-4 block overflow-hidden md:mt-6">
          <span
            ref={line2Ref}
            className="block max-w-[16ch] text-[clamp(1.35rem,3.2vw,2.5rem)] leading-[1.1] tracking-[-0.025em] text-muted"
          >
            {splitText(siteConfig.tagline)}
          </span>
        </span>
      </h1>
      <p
        ref={subRef}
        className="mt-8 max-w-lg font-mono text-xs leading-relaxed text-muted md:mt-10 md:text-sm"
      >
        {siteConfig.positioning}
      </p>
      <p
        ref={handoffRef}
        className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-accent-cta md:mt-14"
      >
        Constraint → Rank
      </p>
    </div>
  );
}
