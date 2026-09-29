import { z } from "zod";

/**
 * Honeypot: bots fill the hidden "website" field. Routes check this before
 * validating, so a bot gets the same quiet success a real submission does.
 */
export function isHoneypotHit(body: unknown): boolean {
  return Boolean((body as { website?: unknown } | null)?.website);
}

export const subscribeInputSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  // Set by the E-Resource gate; the server looks the resource up itself.
  resourceId: z.string().optional(),
});

export const contactMessageInputSchema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});
