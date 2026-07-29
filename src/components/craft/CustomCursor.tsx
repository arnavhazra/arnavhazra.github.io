"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribePointerMode(onChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", onChange);
  reduce.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduce.removeEventListener("change", onChange);
  };
}

function getPointerCraftEnabled() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(false);
  const active = useSyncExternalStore(
    subscribePointerMode,
    getPointerCraftEnabled,
    () => false,
  );

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("has-custom-cursor");
    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const grow = target?.closest("a, button, [data-cursor='grow']");
      setGrown(!!grow);
    };

    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className={`pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 ${
        grown ? "h-10 w-10" : "h-3 w-3"
      }`}
      style={{ left: -100, top: -100 }}
    />
  );
}
