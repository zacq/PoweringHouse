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
  // Set by the /awareness growth-kit forms and the LeadMagnetModal downloads.
  name: z.string().trim().max(120).optional(),
  list: z.enum(["growth-kit", "cina-breakfast", "cina-craftsmanship", "ph-coaching", "cina-cohort"]).optional(),
});

export const contactMessageInputSchema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  // Long enough for the CINA diagnostic, which lists every ticked symptom.
  subject: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});
