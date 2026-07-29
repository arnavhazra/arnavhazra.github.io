import { describe, expect, it } from "vitest";

import { cn, formatDate } from "./utils";

describe("cn", () => {
  it("merges tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-muted", false && "hidden", "block")).toBe("text-muted block");
  });
});

describe("formatDate", () => {
  it("formats ISO dates in en-US long form", () => {
    expect(formatDate("2024-03-15")).toBe("March 15, 2024");
  });
});
