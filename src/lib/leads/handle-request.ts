import "server-only";
import { NextResponse } from "next/server";
import type { z } from "zod";
import type { LeadApiResponse } from "@/lib/forms/schemas";
import { deliverLead, type Lead } from "./deliver";
import {
  clientKey,
  isRateLimited,
  looksAutomated,
  markDelivered,
  wasAlreadyDelivered,
} from "./guards";

const json = (body: LeadApiResponse, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Shared POST handler for lead forms:
 * parse → spam checks → rate limit → validate → deliver → honest response.
 * A success response is only returned after the lead has actually been delivered.
 */
export async function handleLeadRequest<S extends z.ZodType>(
  request: Request,
  schema: S,
  toLead: (data: z.output<S>) => Lead,
): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "BAD_REQUEST", message: "We couldn't read that submission." }, 400);
  }
  if (!body || typeof body !== "object") {
    return json({ ok: false, code: "BAD_REQUEST", message: "We couldn't read that submission." }, 400);
  }

  const raw = body as Record<string, unknown>;

  if (looksAutomated(raw)) {
    return json(
      {
        ok: false,
        code: "SPAM_SUSPECTED",
        message: "Your submission couldn't be accepted. Please wait a moment and try again.",
      },
      400,
    );
  }

  if (isRateLimited(clientKey(request.headers))) {
    return json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "Too many submissions from your connection. Please try again in a few minutes.",
      },
      429,
    );
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Please check the highlighted fields.",
        fieldErrors,
      },
      422,
    );
  }

  const submissionId =
    typeof raw.submissionId === "string" ? raw.submissionId : undefined;
  if (wasAlreadyDelivered(submissionId)) {
    return json({ ok: true, message: "We've already received this submission." }, 200);
  }

  const result = await deliverLead(toLead(parsed.data));

  if (result.status === "not_configured") {
    console.warn(
      `[leads] Lead delivery is not configured. Missing: ${result.missing.join(", ")}. The submission was NOT delivered.`,
    );
    return json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "Our online form isn't connected to our inbox yet, so your details have not been sent.",
      },
      503,
    );
  }

  if (result.status === "failed") {
    console.error(`[leads] Delivery failed: ${result.reason}`);
    return json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: "Something went wrong while sending your details. Please try again shortly.",
      },
      502,
    );
  }

  markDelivered(submissionId);
  return json({ ok: true, message: "Thank you — your details have been received." }, 200);
}
