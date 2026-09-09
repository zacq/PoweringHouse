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

export const offerInputSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(3)
      .max(80)
      .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
    name: z.string().trim().min(3, "Name is too short").max(160),
    offerLine: z.enum(["BUSINESS_GROWTH_DESIGN", "OPERATIONS_EXCELLENCE", "BOTH"]),
    order: z.coerce.number().int().min(0).max(999).default(0),
    isFree: z.boolean().default(false),
    showInMarketPlace: z.boolean().default(true),
    promise: z.string().trim().min(10, "Promise is too short"),
    whoFor: z.string().trim().min(10, "Who it's for is too short"),
    whoNotFor: z.string().trim().min(10, "Who it's not for is too short"),
    whatHappens: z.string().trim().min(10, "What happens is too short"),
    commitment: z.string().trim().optional().or(z.literal("")),
    price: z.string().trim().optional().or(z.literal("")),
    priceIsDraft: z.boolean().default(true),
    story: z.string().trim().optional().or(z.literal("")),
    storyIsDraft: z.boolean().default(true),
    ctaType: z.enum(["ENQUIRY_FORM", "EXTERNAL_LINK", "INTERNAL_LINK"]),
    ctaLabel: z.string().trim().optional().or(z.literal("")),
    externalUrl: z.string().trim().url().optional().or(z.literal("")),
    published: z.boolean().default(true),
  })
  .refine((data) => data.ctaType !== "EXTERNAL_LINK" || Boolean(data.externalUrl), {
    message: "External-link offers need a URL",
    path: ["externalUrl"],
  });

export type OfferInput = z.infer<typeof offerInputSchema>;

// Honeypot field "website" must stay empty; real users never see/fill it.
export const enquiryInputSchema = z.object({
  offerId: z.string().min(1),
  fullName: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  businessName: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const ventureInputSchema = z
  .object({
    businessName: z.string().trim().min(2, "Business name is too short").max(160),
    sector: z.string().trim().min(2, "Sector is too short").max(100),
    before: z.string().trim().min(10, "Before is too short"),
    after: z.string().trim().min(10, "After is too short"),
    metricLabel: z.string().trim().min(2, "Metric label is too short").max(80),
    metricBefore: z.string().trim().min(1, "Metric before is required").max(80),
    metricAfter: z.string().trim().min(1, "Metric after is required").max(80),
    consentOnFile: z.boolean().default(false),
    photo: z.string().trim().url().optional().or(z.literal("")),
    published: z.boolean().default(false),
    order: z.coerce.number().int().min(0).max(999).default(0),
  })
  .refine((data) => !data.published || data.consentOnFile, {
    message: "Can't publish a venture without consent on file",
    path: ["published"],
  });

export type VentureInput = z.infer<typeof ventureInputSchema>;

export const eResourceInputSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(160),
  description: z.string().trim().min(10, "Description is too short"),
  fileUrl: z.string().trim().url("Enter a valid URL"),
  access: z.enum(["OPEN", "GATED"]),
  published: z.boolean().default(true),
});

export type EResourceInput = z.infer<typeof eResourceInputSchema>;

export const eventInputSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(160),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  startsAt: z.coerce.date({ errorMap: () => ({ message: "Enter a valid date and time" }) }),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  link: z.string().trim().url().optional().or(z.literal("")),
  published: z.boolean().default(true),
});

export type EventInput = z.infer<typeof eventInputSchema>;

// Honeypot field "website" must stay empty; real users never see/fill it.
export const contactMessageInputSchema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});
