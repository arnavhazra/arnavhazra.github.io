export const siteConfig = {
  name: "Arnav Hazra",
  title: "Arnav Hazra — AI Startup CTO & Applied AI Engineer",
  description:
    "Arnav Hazra builds decision infrastructure and agentic systems — 2× startup CTO, Minerva University, Neural Next & Data Pixel.",
  geoDescription:
    "Arnav Hazra is an AI startup CTO and applied AI engineer who co-founded Neural Next (ThisVersus decision infrastructure) and Data Pixel. He ships LangGraph agents, GraphRAG pipelines, edge-quantized inference, and enterprise MCP systems.",
  positioning:
    "AI data scientist and 2× startup CTO building decision infrastructure — I turn frontier AI research into products that ship.",
  tagline: "I build decision systems, not demos.",
  url: "https://arnavhazra.github.io",
  email: "arnav@neuralnext.co",
  personalEmail: "arnav.haz11@gmail.com",
  links: {
    github: "https://github.com/arnavhazra",
    linkedin: "https://www.linkedin.com/in/arnav-hazra",
    twitter: "https://twitter.com/arnavhaz",
    neuralnext: "https://neuralnext.co",
    datapixel: "https://datapixel.co",
  },
} as const;

export type ContentRole = "founder" | "builder";

export type ContentMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  repo?: string;
  company?: string;
  featured?: boolean;
  span?: "1" | "2";
  metric?: string;
  liveUrl?: string;
  role?: ContentRole;
};

export const homeTimeline = [
  {
    year: "2024 — now",
    label: "Neural Next · ThisVersus",
    detail: "Decision infrastructure live in automotive, real estate, and electronics.",
  },
  {
    year: "2023 — now",
    label: "Open source · GraphRAG + MCP",
    detail: "Hybrid retrieval at 3.4ms 2-hop; enterprise MCP with sub-ms path checks.",
  },
  {
    year: "2020 — 2022",
    label: "Shipped before founding",
    detail: "CNN iOS apps in Tokyo, LangGraph SWE loops, 0.88ms BitNet on Jetson.",
  },
] as const;
