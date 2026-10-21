"use client";

import type { ComponentProps, ReactNode } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

const controlBase =
  "mt-2 block w-full rounded-xl border bg-white px-4 text-[0.95rem] text-ink-900 shadow-xs transition-colors placeholder:text-ink-500/70 focus:border-mint-600 focus:ring-2 focus:ring-mint-400/40 focus:outline-none disabled:bg-mist-100";

type BaseProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: FieldError;
  required?: boolean;
  registration: UseFormRegisterReturn;
  className?: string;
};

function describedBy(id: string, hint?: ReactNode, error?: FieldError) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block text-sm font-semibold text-ink-900">
      {label}
      {required ? (
        <span className="ml-0.5 text-red-700" aria-hidden>
          *
        </span>
      ) : (
        <span className="ml-1.5 text-xs font-normal text-ink-500">(optional)</span>
      )}
    </label>
  );
}

function Meta({ id, hint, error }: { id: string; hint?: ReactNode; error?: FieldError }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error.message}
        </p>
      )}
    </>
  );
}

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  registration,
  className,
  ...inputProps
}: BaseProps & Omit<ComponentProps<"input">, "id" | "name" | keyof UseFormRegisterReturn>) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, "h-12", error ? "border-red-600" : "border-midnight-900/15")}
        {...inputProps}
        {...registration}
      />
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function TextareaField({
  id,
  label,
  hint,
  error,
  required,
  registration,
  className,
  ...props
}: BaseProps & Omit<ComponentProps<"textarea">, "id" | "name" | keyof UseFormRegisterReturn>) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        rows={4}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, "py-3", error ? "border-red-600" : "border-midnight-900/15")}
        {...props}
        {...registration}
      />
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  registration,
  className,
  options,
  placeholder = "Select an option",
}: BaseProps & {
  options: readonly (string | { value: string; label: string })[];
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <select
        id={id}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, "h-12 pr-10", error ? "border-red-600" : "border-midnight-900/15")}
        defaultValue=""
        {...registration}
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value;
          const text = typeof o === "string" ? o : o.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  registration,
  className,
}: Omit<BaseProps, "hint" | "required" | "label"> & { label: ReactNode }) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 rounded border-midnight-900/30 accent-mint-600"
          {...registration}
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-ink-700">
          {label}
        </label>
      </div>
      {error?.message && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
}

/** Honeypot field: hidden from people and assistive tech; bots tend to fill it in. */
export function HoneypotField({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden" inert>
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}
