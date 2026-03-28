import { file, glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import { hashnodeLoader, hashnodeTagsLoader } from "@/loaders/hashnode";

function slug() {
  return z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "Invalid slug");
}

const posts = defineCollection({
  loader: hashnodeLoader(),
  schema: z.object({
    title: z.string().max(128),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.object({ collection: z.literal("categories"), id: z.string() }),
    tags: z
      .array(z.object({ collection: z.literal("tags"), id: z.string() }))
      .optional()
      .default([]),
    summary: z.string().optional().default(""),
    cover: z.string().url().optional(),
    draft: z.boolean().default(false),
    new: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    links: z
      .object({
        homepage: z.string().url().optional(),
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
    status: z
      .enum(["planning", "in-progress", "completed", "archived"])
      .default("completed"),
    image: z.string().optional(),
  }),
});

const categories = defineCollection({
  loader: file("./src/content/miscs/categories.json"),
  schema: z.object({
    name: z.string().max(32),
    slug: slug(),
    description: z
      .string()
      .max(512)
      .optional()
      .default("")
      .describe("In markdown format"),
    icon: z.string().optional().default("mdi:folder"),
  }),
});

const tags = defineCollection({
  loader: hashnodeTagsLoader(),
  schema: z.object({
    name: z.string(),
    slug: z
      .string()
      .min(1)
      .max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "Invalid slug"),
    description: z
      .string()
      .max(512)
      .optional()
      .default("")
      .describe("In markdown format"),
  }),
});

const friends = defineCollection({
  loader: file("./src/content/miscs/friends.json"),
  schema: z.object({
    name: z.string().max(64),
    description: z.string().optional().describe("One line string"),
    link: z.string().url(),
    avatar: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/pages",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  posts,
  projects,
  categories,
  tags,
  friends,
  pages,
};
