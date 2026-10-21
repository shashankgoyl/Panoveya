import { z } from "zod";
import {
  availabilityOptions,
  businessTypes,
  packageOptions,
  photographyExperience,
  servicesRequired,
} from "./options";

/**
 * Validation schemas shared by the client forms and the API routes.
 * The server always re-validates — never trust client-side validation alone.
 */

const trimmed = (min: number, max: number, label: string) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .trim()
    .min(1, `Please enter your ${label}.`)
    .min(min, `${label[0].toUpperCase()}${label.slice(1)} must be at least ${min} characters.`)
    .max(max, `Please keep this under ${max} characters.`);

const email = z
  .string({ error: "Please enter your email address." })
  .trim()
  .min(1, "Please enter your email address.")
  .max(254, "That email address is too long.")
  .pipe(z.email({ error: "Please enter a valid email address, e.g. name@example.com." }));

/** International phone number with country code, e.g. +91 98765 43210. */
const phone = z
  .string({ error: "Please enter your phone number." })
  .trim()
  .min(1, "Please enter your phone number.")
  .refine((v) => /^\+[1-9][\d\s()-]{6,20}$/.test(v), {
    message: "Include your country code, e.g. +91 98765 43210.",
  })
  .refine(
    (v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 8 && digits.length <= 15;
    },
    { message: "That phone number doesn't look complete." },
  );

const consent = z.literal(true, {
  error: "Please confirm we may contact you about your enquiry.",
});

/** Anti-spam fields included with every submission. */
const antiSpam = {
  /** Honeypot: hidden from people, often filled by bots. Must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Milliseconds since the form was rendered. Submissions that are too fast are rejected. */
  elapsedMs: z.number().int().nonnegative().optional(),
  /** Random token per form session, used to drop accidental duplicate submissions. */
  submissionId: z.string().min(8).max(64).optional(),
};

export const businessEnquirySchema = z.object({
  name: trimmed(2, 100, "name"),
  businessName: trimmed(2, 150, "business name"),
  businessType: z.enum(businessTypes, { error: "Please choose your business type." }),
  location: trimmed(2, 120, "city and state"),
  email,
  phone,
  serviceRequired: z.enum(servicesRequired, { error: "Please choose the service you need." }),
  packageInterest: z.enum(["", ...packageOptions.map((p) => p.value)]).optional(),
  venueSize: z
    .string()
    .trim()
    .max(120, "Please keep this under 120 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2,000 characters.")
    .optional()
    .or(z.literal("")),
  consent,
  ...antiSpam,
});

export type BusinessEnquiryInput = z.input<typeof businessEnquirySchema>;
export type BusinessEnquiry = z.output<typeof businessEnquirySchema>;

const optionalUrl = z
  .string()
  .trim()
  .max(300, "Please keep this under 300 characters.")
  .optional()
  .or(z.literal(""))
  .refine((v) => !v || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(v), {
    message: "Please enter a full link starting with https://",
  });

export const photographerApplicationSchema = z.object({
  fullName: trimmed(2, 100, "full name"),
  email,
  phone,
  location: trimmed(2, 120, "city and state"),
  experience: z.enum(photographyExperience, { error: "Please choose your experience level." }),
  equipment: trimmed(3, 1000, "equipment details"),
  portfolioUrl: optionalUrl,
  availability: z.enum(availabilityOptions, { error: "Please choose your availability." }),
  consent,
  ...antiSpam,
});

export type PhotographerApplicationInput = z.input<typeof photographerApplicationSchema>;
export type PhotographerApplication = z.output<typeof photographerApplicationSchema>;

/** Shape of every JSON response from the lead API routes. */
export type LeadApiResponse =
  | { ok: true; message: string }
  | {
      ok: false;
      code:
        | "VALIDATION_ERROR"
        | "NOT_CONFIGURED"
        | "DELIVERY_FAILED"
        | "RATE_LIMITED"
        | "SPAM_SUSPECTED"
        | "BAD_REQUEST";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };
