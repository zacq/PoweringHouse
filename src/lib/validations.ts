import { z } from "zod";

// Honeypot field "website" must stay empty; real users never see/fill it.
export const subscribeInputSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  source: z.string().trim().max(200).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const contactMessageInputSchema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});
