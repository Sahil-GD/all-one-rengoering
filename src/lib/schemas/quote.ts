import { z } from 'zod';

/**
 * Quote request contract — shared by client validation, the server
 * action, and (later) the booking system. Field error messages are
 * locale keys resolved via next-intl ('required' | 'invalid').
 */
export const SERVICES = [
  'fast-rengoering',
  'hovedrengoering',
  'flytterengoering',
  'erhvervsrengoering',
] as const;

export type ServiceSlug = (typeof SERVICES)[number];

export const quoteSchema = z.object({
  segment: z.enum(['privat', 'erhverv']),
  service: z.enum(SERVICES),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(200),
  city: z.string().trim().min(2).max(80),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type QuoteFieldErrors = Partial<
  Record<keyof QuoteInput, 'required' | 'invalid'>
>;

/** Map zod issues to locale-independent error keys, first issue wins. */
export function toFieldErrors(error: z.ZodError): QuoteFieldErrors {
  const out: QuoteFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof QuoteInput | undefined;
    if (!field || out[field]) continue;
    out[field] =
      issue.code === 'invalid_type' || issue.code === 'too_small'
        ? 'required'
        : 'invalid';
  }
  return out;
}