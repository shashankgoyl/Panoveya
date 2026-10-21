"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, CheckCircle2, Mail, MessageCircle, Settings } from "lucide-react";
import type { SubmitOutcome } from "./use-lead-submit";

export type FallbackContact = {
  email: string | null;
  whatsapp: string | null;
  phone: string | null;
};

export function SuccessPanel({
  title,
  message,
  nextSteps,
  onReset,
  resetLabel,
}: {
  title: string;
  message: string;
  nextSteps: string;
  onReset: () => void;
  resetLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="rounded-[var(--radius-card)] bg-mint-200/40 p-8 ring-1 ring-mint-600/25 focus:outline-none"
    >
      <CheckCircle2 aria-hidden className="size-10 text-mint-700" />
      <h3 className="mt-4 text-2xl font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-ink-700">{message}</p>
      <p className="mt-2 text-sm text-ink-500">{nextSteps}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-mint-700 underline underline-offset-4 hover:text-mint-800"
      >
        {resetLabel}
      </button>
    </div>
  );
}

/** Error and "not configured" states. Never claims the submission was sent. */
export function SubmitAlert({
  outcome,
  fallback,
  mailtoSubject,
  mailtoBody,
}: {
  outcome: SubmitOutcome;
  fallback: FallbackContact;
  mailtoSubject: string;
  mailtoBody: () => string;
}) {
  if (outcome.state !== "error" && outcome.state !== "not-configured") return null;
  const notConfigured = outcome.state === "not-configured";
  const hasFallback = Boolean(fallback.email || fallback.whatsapp || fallback.phone);

  return (
    <div
      role="alert"
      className={
        notConfigured
          ? "rounded-2xl bg-amber-50 p-5 text-sm text-amber-950 ring-1 ring-amber-600/30"
          : "rounded-2xl bg-red-50 p-5 text-sm text-red-950 ring-1 ring-red-600/25"
      }
    >
      <p className="flex items-start gap-2 font-semibold">
        {notConfigured ? (
          <Settings aria-hidden className="mt-0.5 size-4 shrink-0" />
        ) : (
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
        )}
        {outcome.message}
      </p>
      {notConfigured && (
        <>
          <p className="mt-2">
            Your answers are still in the form, so nothing has been lost.
            {hasFallback ? " Please contact us directly instead:" : " Please try again later."}
          </p>
          {hasFallback && (
            <ul className="mt-3 flex flex-wrap gap-3">
              {fallback.email && (
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-semibold ring-1 ring-amber-600/30 hover:bg-amber-100"
                    href={`mailto:${fallback.email}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody())}`}
                  >
                    <Mail aria-hidden className="size-4" /> Email your details
                  </a>
                </li>
              )}
              {fallback.whatsapp && (
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-semibold ring-1 ring-amber-600/30 hover:bg-amber-100"
                    href={`https://wa.me/${fallback.whatsapp}?text=${encodeURIComponent(mailtoBody())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden className="size-4" /> WhatsApp us
                  </a>
                </li>
              )}
              {fallback.phone && (
                <li className="self-center">
                  Call{" "}
                  <a className="font-semibold underline" href={`tel:${fallback.phone.replace(/\s/g, "")}`}>
                    {fallback.phone}
                  </a>
                </li>
              )}
            </ul>
          )}
          {process.env.NODE_ENV === "development" && (
            <p className="mt-3 rounded-lg bg-white/70 p-3 font-mono text-xs">
              Developer note: set RESEND_API_KEY, LEAD_NOTIFICATION_FROM and LEAD_NOTIFICATION_TO in
              .env.local (see .env.example), then restart the dev server.
            </p>
          )}
        </>
      )}
    </div>
  );
}
