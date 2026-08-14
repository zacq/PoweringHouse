import { z } from "zod";
import { CATEGORIES } from "./categories";

const categoryValues = CATEGORIES.map((c) => c.value) as [string, ...string[]];

export const postInputSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().trim().min(10, "Excerpt is too short").max(280),
  content: z.string().trim().min(20, "Post content is too short"),
  category: z.enum(categoryValues),
  coverImage: z.string().trim().url().optional().or(z.literal("")).optional(),
  published: z.boolean().default(false),
});

export type PostInput = z.infer<typeof postInputSchema>;

// Honeypot field "website" must stay empty; real users never see/fill it.
export const commentInputSchema = z.object({
  postId: z.string().min(1),
  authorName: z.string().trim().min(2, "Name is too short").max(80),
  authorEmail: z.string().trim().email("Enter a valid email").max(160),
  body: z.string().trim().min(3, "Comment is too short").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const subscribeInputSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  website: z.string().max(0).optional().or(z.literal("")),
});
