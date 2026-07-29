export type TimelineEntry = {
  year: string;
  title: string;
  org: string;
  description: string;
  href?: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2024 — present",
    title: "Co-founder & CTO",
    org: "Neural Next",
    description:
      "Building ThisVersus — decision infrastructure that turns product catalogs into decision engines. Automotive, real estate, and electronics verticals. Sub-two-week integration, zero schema changes.",
    href: "https://neuralnext.co",
  },
  {
    year: "2023 — present",
    title: "Co-founder",
    org: "Data Pixel",
    description:
      "Enterprise data literacy and kinetic analytics systems — industrial-strength AI education for organizations navigating the enterprise void.",
    href: "https://datapixel.co",
  },
  {
    year: "2022",
    title: "B.S. Applied Computing & AI",
    org: "Minerva University",
    description:
      "Four-city global rotation — San Francisco, Hyderabad, London, Berlin. Applied computing with emphasis on machine learning, LLM ops, and full-stack systems.",
    href: "https://minerva.edu",
  },
  {
    year: "2020 — 2021",
    title: "Full-stack, AI",
    org: "Deepcore AI Incubator",
    description:
      "Tokyo-based startup incubator. Shipped an AI-powered iOS plant analysis app and led API/data modeling for early-stage ventures.",
    href: "https://deepcore.jp/en/",
  },
];

export const credibilityOrgs = [
  { name: "Neural Next", href: "https://neuralnext.co" },
  { name: "Data Pixel", href: "https://datapixel.co" },
  { name: "Minerva University", href: "https://minerva.edu" },
  { name: "SoftBank", note: "Engineering DNA" },
  { name: "BNY Mellon", note: "Engineering DNA" },
  { name: "IIM Bangalore", note: "Engineering DNA" },
];
