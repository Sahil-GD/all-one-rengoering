import { type ReactNode } from 'react';

export interface FieldProps {
  label: string;
  htmlFor: string;
  /** Resolved error text (already translated). */
  error?: string | undefined;
  required?: boolean;
  children: ReactNode;
}

/** Label + control + error slot. Always-visible labels (never placeholder-as-label). */
export function Field({ label, htmlFor, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden className="text-error">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}