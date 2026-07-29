import { z } from "zod";

export const contentMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).optional(),
  repo: z.string().url().optional(),
  company: z.string().optional(),
  featured: z.boolean().optional(),
  span: z.enum(["1", "2"]).optional(),
  metric: z.string().optional(),
  liveUrl: z.string().url().optional(),
  role: z.enum(["founder", "builder"]).optional(),
});

export type ContentMetaInput = z.infer<typeof contentMetaSchema>;
