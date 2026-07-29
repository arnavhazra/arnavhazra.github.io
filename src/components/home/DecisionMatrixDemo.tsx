"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

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
      className="card-glass rounded-3xl border border-border p-6 md:p-8"
    >
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Live proof · decision infrastructure
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">
            Filter a catalog like ThisVersus does
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Three axes, four options — the site itself is a small decision engine.
          No LLM required.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {axes.map((axis) => (
          <fieldset key={axis.id} className="space-y-2">
            <legend className="font-mono text-[10px] uppercase tracking-widest text-accent-cta">
              {axis.label}
            </legend>
            <div className="flex flex-wrap gap-2">
              {axis.options.map((option, index) => {
                const active = selection[axis.id] === index;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setSelection((prev) => ({ ...prev, [axis.id]: index }))
                    }
                    className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition ${
                      active
                        ? "border-accent-cta bg-accent-cta/10 text-accent-cta"
                        : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {ranked.map((item, index) => (
          <motion.div
            key={item.name}
            layout
            className="rounded-xl border border-border bg-surface/80 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Rank {index + 1}
                </p>
                <p className="mt-1 font-medium">{item.name}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-accent-cta">
                  {item.match}/3 match
                </p>
                <p className="font-mono text-[10px] text-muted">
                  score {item.score}
                </p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-accent-cta"
                initial={false}
                animate={{ width: `${item.score}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
