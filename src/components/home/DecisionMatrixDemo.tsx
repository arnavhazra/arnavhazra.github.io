"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const axes = [
  { id: "budget", label: "Budget", options: ["Under ₹15L", "₹15–25L", "Premium"] },
  { id: "safety", label: "Safety", options: ["Standard", "4-star+", "5-star NCAP"] },
  { id: "range", label: "Use case", options: ["City", "Highway", "Mixed"] },
] as const;

const catalog = [
  { name: "Compact EV", budget: 0, safety: 1, range: 0, score: 82 },
  { name: "Mid SUV", budget: 1, safety: 2, range: 2, score: 91 },
  { name: "Premium sedan", budget: 2, safety: 2, range: 1, score: 88 },
  { name: "City hatch", budget: 0, safety: 0, range: 0, score: 74 },
];

export function DecisionMatrixDemo() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [selection, setSelection] = useState<Record<string, number>>({
    budget: 1,
    safety: 2,
    range: 1,
  });

  const ranked = useMemo(() => {
    return [...catalog]
      .map((item) => {
        const match =
          (item.budget === selection.budget ? 1 : 0) +
          (item.safety === selection.safety ? 1 : 0) +
          (item.range === selection.range ? 1 : 0);
        return { ...item, match };
      })
      .sort((a, b) => b.match - a.match || b.score - a.score);
  }, [selection]);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=90%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="matrix-chapter"
      aria-label="Interactive decision matrix demo"
      className="blotter relative min-h-[100svh] border-y border-border/50"
    >
      <div className="blotter-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 py-20 md:py-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-cta">
              Constraint → Rank
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
              Decision blotter
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Three axes. Four options. The site itself is a small decision engine —
            no LLM required.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div className="space-y-7 border-t border-border/60 pt-6">
            {axes.map((axis) => (
              <fieldset key={axis.id}>
                <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {axis.label}
                </legend>
                <div
                  className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
                  role="group"
                  aria-label={axis.label}
                >
                  {axis.options.map((option, index) => {
                    const active = selection[axis.id] === index;
                    return (
                      <button
                        key={option}
                        type="button"
                        data-cursor="grow"
                        onClick={() =>
                          setSelection((prev) => ({ ...prev, [axis.id]: index }))
                        }
                        className={`relative font-mono text-[11px] uppercase tracking-wider transition ${
                          active
                            ? "text-accent-cta"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {option}
                        <span
                          aria-hidden
                          className={`absolute -bottom-1 left-0 h-px w-full transition ${
                            active ? "bg-accent-cta" : "bg-transparent"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <ol className="border-t border-border/60">
            {ranked.map((item, index) => (
              <motion.li
                key={item.name}
                layout={!prefersReduced}
                className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-border/50 py-5 md:gap-6"
              >
                <p className="font-display text-3xl tracking-tight text-muted md:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0">
                  <p className="truncate text-lg font-medium md:text-xl">{item.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                    score {item.score}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-accent-cta md:text-sm">
                    {item.match}/3
                  </p>
                  <div className="mt-2 ml-auto h-px w-14 overflow-hidden bg-border md:w-20">
                    <motion.div
                      className="h-full bg-accent-cta"
                      initial={false}
                      animate={{ width: `${item.score}%` }}
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 320, damping: 34 }
                      }
                    />
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
