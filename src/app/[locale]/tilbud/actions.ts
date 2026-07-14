'use server';

import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import {
  quoteSchema,
  toFieldErrors,
  type QuoteFieldErrors,
  type QuoteInput,
} from '@/lib/schemas/quote';

export interface QuoteFormState {
  status: 'idle' | 'error';
  fieldErrors?: QuoteFieldErrors;
  /** Submitted values echoed back so the form can repopulate on error. */
  values?: Partial<Record<keyof QuoteInput, string>>;
}

/** Minimum plausible fill time — faster submissions are bots. */
const MIN_FILL_MS = 3000;

export async function submitQuote(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const locale = await getLocale();

  // Spam: honeypot filled or submitted inhumanly fast → silently accept
  // (redirect to thanks) without processing. Never educate the bot.
  const honeypot = String(formData.get('website') ?? '');
  const startedAt = Number(formData.get('ts') ?? 0);
  const tooFast =
    Number.isFinite(startedAt) && startedAt > 0
      ? Date.now() - startedAt < MIN_FILL_MS
      : false;
  if (honeypot !== '' || tooFast) {
    redirect({ href: '/tak', locale });
  }

  const raw = {
    segment: String(formData.get('segment') ?? ''),
    service: String(formData.get('service') ?? ''),
    company: String(formData.get('company') ?? ''),
    name: String(formData.get('name') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    email: String(formData.get('email') ?? ''),
    city: String(formData.get('city') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      fieldErrors: toFieldErrors(parsed.error),
      values: raw,
    };
  }

  await deliverQuote(parsed.data);
  redirect({ href: '/tak', locale });
  // redirect() throws; this satisfies the return type for TS.
  return { status: 'idle' };
}

/**
 * Delivery: Resend HTTP API when configured (no SDK — plain fetch per
 * the dependency principle); otherwise logged so dev/testing works
 * without credentials. Set RESEND_API_KEY, QUOTE_FROM_EMAIL and
 * QUOTE_NOTIFICATION_EMAIL in production.
 */
async function deliverQuote(data: QuoteInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFICATION_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;

  const lines = [
    `Segment: ${data.segment}`,
    `Ydelse: ${data.service}`,
    data.company ? `Virksomhed: ${data.company}` : null,
    `Navn: ${data.name}`,
    `Telefon: ${data.phone}`,
    `E-mail: ${data.email}`,
    `By: ${data.city}`,
    data.message ? `Besked:\n${data.message}` : null,
  ].filter(Boolean);

  if (!apiKey || !to || !from) {
    /*
     * Not debug output: this is the deliberate fallback so a lead is never
     * silently dropped while email is unconfigured. In production this
     * branch must never run — see the deployment checklist.
     */
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[quote] Email not configured — request logged only.');
      console.warn(lines.join('\n'));
    } else {
      console.error(
        '[quote] CRITICAL: email is not configured in production. Lead received but NOT delivered.',
        lines.join('\n'),
      );
    }
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `Nyt tilbud: ${data.service} (${data.segment}) — ${data.name}`,
      text: lines.join('\n'),
    }),
  });

  if (!res.ok) {
    // Delivery failure must not lose the lead silently server-side.
    console.error('[quote] Resend delivery failed:', res.status, await res.text());
  }
}