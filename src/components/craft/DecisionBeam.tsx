"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function DecisionBeam() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !pathRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-[max(0.75rem,calc((100vw-72rem)/2))] z-[5] hidden h-full w-8 md:block"
      viewBox="0 0 32 1000"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M16 0 C16 120, 8 200, 16 320 S24 480, 16 600 S8 780, 16 1000"
        fill="none"
        stroke="var(--accent-cta)"
        strokeWidth="1"
        opacity="0.45"
      />
    </svg>
  );
}
