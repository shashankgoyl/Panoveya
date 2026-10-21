"use client";

import { useEffect, useRef, useState } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { LeadApiResponse } from "@/lib/forms/schemas";

export type SubmitOutcome =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "not-configured"; message: string }
  | { state: "error"; message: string };

function newSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Posts a validated form to a lead API route and maps the response to UI state.
 * The success state is only set when the server confirms delivery.
 */
export function useLeadSubmit<T extends FieldValues>(endpoint: string, setError: UseFormSetError<T>) {
  const [outcome, setOutcome] = useState<SubmitOutcome>({ state: "idle" });
  const startedAt = useRef<number | null>(null);
  const submissionId = useRef<string | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(values: T) {
    if (inFlight.current) return; // guard against double clicks / repeated Enter
    inFlight.current = true;
    submissionId.current ??= newSubmissionId();
    setOutcome({ state: "idle" });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : undefined,
          submissionId: submissionId.current,
        }),
      });
      const data = (await res.json().catch(() => null)) as LeadApiResponse | null;

      if (res.ok && data?.ok) {
        setOutcome({ state: "success", message: data.message });
        return;
      }
      if (data && !data.ok) {
        if (data.code === "VALIDATION_ERROR" && data.fieldErrors) {
          for (const [field, messages] of Object.entries(data.fieldErrors)) {
            if (messages?.[0]) setError(field as Path<T>, { type: "server", message: messages[0] });
          }
        }
        setOutcome({
          state: data.code === "NOT_CONFIGURED" ? "not-configured" : "error",
          message: data.message,
        });
        return;
      }
      setOutcome({ state: "error", message: "Something went wrong. Please try again." });
    } catch {
      setOutcome({
        state: "error",
        message: "We couldn't reach our server. Check your internet connection and try again.",
      });
    } finally {
      inFlight.current = false;
    }
  }

  function reset() {
    submissionId.current = null;
    startedAt.current = Date.now();
    setOutcome({ state: "idle" });
  }

  return { outcome, submit, reset };
}
