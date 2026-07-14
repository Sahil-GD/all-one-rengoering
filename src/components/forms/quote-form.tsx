'use client';

// Client: useActionState (pending/errors) + segment-driven disclosure.

import { useActionState, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SERVICES, type ServiceSlug } from '@/lib/schemas/quote';
import {
  submitQuote,
  type QuoteFormState,
} from '@/app/[locale]/tilbud/actions';

export interface QuoteFormLabels {
  segmentLabel: string;
  segmentPrivat: string;
  segmentErhverv: string;
  service: string;
  services: Record<ServiceSlug, string>;
  company: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  submit: string;
  submitting: string;
  errorSummary: string;
  errors: { required: string; invalid: string };
}

const initialState: QuoteFormState = { status: 'idle' };

export function QuoteForm({ labels }: { labels: QuoteFormLabels }) {
  const [state, formAction, isPending] = useActionState(
    submitQuote,
    initialState,
  );
  const [segment, setSegment] = useState<'privat' | 'erhverv'>(
    (state.values?.segment as 'privat' | 'erhverv' | undefined) ?? 'privat',
  );
  // Time-gate baseline for the spam check — set once per mount.
  const startedAt = useMemo(() => Date.now(), []);

  const err = (field: keyof NonNullable<QuoteFormState['fieldErrors']>) => {
    const code = state.fieldErrors?.[field];
    return code ? labels.errors[code] : undefined;
  };
  const invalid = (field: keyof NonNullable<QuoteFormState['fieldErrors']>) =>
    state.fieldErrors?.[field] ? true : undefined;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* Spam protection: honeypot (hidden from humans) + fill-time. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <input type="hidden" name="ts" value={startedAt} />

      {state.status === 'error' && (
        <p
          role="alert"
          className="rounded-control border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
        >
          {labels.errorSummary}
        </p>
      )}

      <fieldset>
        <legend className="text-sm font-medium">{labels.segmentLabel}</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(['privat', 'erhverv'] as const).map((value) => (
            <label
              key={value}
              className={`flex h-11 cursor-pointer items-center justify-center rounded-control border text-sm font-medium transition-colors duration-150 ${
                segment === value
                  ? 'border-accent bg-accent text-accent-contrast'
                  : 'border-border bg-surface hover:border-accent'
              }`}
            >
              <input
                type="radio"
                name="segment"
                value={value}
                checked={segment === value}
                onChange={() => setSegment(value)}
                className="sr-only"
              />
              {value === 'privat' ? labels.segmentPrivat : labels.segmentErhverv}
            </label>
          ))}
        </div>
      </fieldset>

      {segment === 'erhverv' && (
        <Field label={labels.company} htmlFor="company" error={err('company')}>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            defaultValue={state.values?.company}
            aria-invalid={invalid('company')}
            aria-describedby={err('company') ? 'company-error' : undefined}
          />
        </Field>
      )}

      <Field label={labels.service} htmlFor="service" required error={err('service')}>
        <Select
          id="service"
          name="service"
          required
          defaultValue={state.values?.service ?? ''}
          aria-invalid={invalid('service')}
          aria-describedby={err('service') ? 'service-error' : undefined}
        >
          <option value="" disabled>
            —
          </option>
          {SERVICES.map((slug) => (
            <option key={slug} value={slug}>
              {labels.services[slug]}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={labels.name} htmlFor="name" required error={err('name')}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={invalid('name')}
            aria-describedby={err('name') ? 'name-error' : undefined}
          />
        </Field>
        <Field label={labels.city} htmlFor="city" required error={err('city')}>
          <Input
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            defaultValue={state.values?.city}
            aria-invalid={invalid('city')}
            aria-describedby={err('city') ? 'city-error' : undefined}
          />
        </Field>
        <Field label={labels.phone} htmlFor="phone" required error={err('phone')}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={state.values?.phone}
            aria-invalid={invalid('phone')}
            aria-describedby={err('phone') ? 'phone-error' : undefined}
          />
        </Field>
        <Field label={labels.email} htmlFor="email" required error={err('email')}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={invalid('email')}
            aria-describedby={err('email') ? 'email-error' : undefined}
          />
        </Field>
      </div>

      <Field label={labels.message} htmlFor="message" error={err('message')}>
        <Textarea
          id="message"
          name="message"
          defaultValue={state.values?.message}
          aria-invalid={invalid('message')}
          aria-describedby={err('message') ? 'message-error' : undefined}
        />
      </Field>

      <Button type="submit" size="lg" disabled={isPending} className="mt-1">
        {isPending ? labels.submitting : labels.submit}
      </Button>
    </form>
  );
}