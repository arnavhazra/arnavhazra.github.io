"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import { KineticHeadline } from "@/components/home/KineticHeadline";
import { Magnetic } from "@/components/craft/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export function HeroChapter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-chapter"
      className="hero-gradient relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-28 md:pb-24 md:pt-32">
        <KineticHeadline pinTarget="#hero-chapter" />
        <div className="mt-10">
          <Magnetic>
            <Link
              href="/work"
              data-cursor="grow"
              className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent-cta transition hover:text-foreground"
            >
              See what shipped →
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
