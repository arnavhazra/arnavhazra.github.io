export const siteConfig = {
  name: "Arnav Hazra",
  title: "Arnav Hazra — AI Founder & Data Scientist",
  description:
    "AI data scientist and 2× startup CTO building decision infrastructure. I turn frontier AI research into products that ship.",
  positioning:
    "AI data scientist and 2× startup CTO building decision infrastructure — I turn frontier AI research into products that ship.",
  url: "https://arnavhazra.com",
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

export type ContentMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  repo?: string;
  company?: string;
  featured?: boolean;
  span?: "1" | "2";
};
