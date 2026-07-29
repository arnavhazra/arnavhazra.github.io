"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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

  return (
    <section
      aria-label="Interactive decision matrix demo"
      className="border-t border-border/70 pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0"
    >
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Live proof
        </p>
        <h2 className="mt-2 font-display text-xl tracking-tight md:text-2xl">
          Filter like ThisVersus
        </h2>
      </div>

      <div className="space-y-5">
        {axes.map((axis) => (
          <fieldset key={axis.id}>
            <legend className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {axis.label}
            </legend>
            <div
              className="mt-2 flex flex-wrap gap-x-4 gap-y-2"
              role="group"
              aria-label={axis.label}
            >
              {axis.options.map((option, index) => {
                const active = selection[axis.id] === index;
                return (
                  <button
                    key={option}
                    type="button"
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

      <ol className="mt-8 space-y-0 border-t border-border/60">
        {ranked.map((item, index) => (
          <motion.li
            key={item.name}
            layout={!prefersReduced}
            className="flex items-center justify-between gap-4 border-b border-border/50 py-3"
          >
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-0.5 truncate font-medium">{item.name}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-xs text-accent-cta">
                {item.match}/3 match
              </p>
              <div className="mt-1.5 h-px w-16 overflow-hidden bg-border">
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
    </section>
  );
}
