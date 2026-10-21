"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { availabilityOptions, photographyExperience } from "@/lib/forms/options";
import {
  photographerApplicationSchema,
  type PhotographerApplication,
  type PhotographerApplicationInput,
} from "@/lib/forms/schemas";
import {
  CheckboxField,
  HoneypotField,
  SelectField,
  TextField,
  TextareaField,
} from "./fields";
import { SubmitAlert, SuccessPanel, type FallbackContact } from "./form-status";
import { useLeadSubmit } from "./use-lead-submit";

export function PhotographerApplicationForm({ fallback }: { fallback: FallbackContact }) {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<PhotographerApplicationInput, unknown, PhotographerApplication>({
    resolver: zodResolver(photographerApplicationSchema),
    mode: "onTouched",
    defaultValues: { phone: "+91 ", website: "", consent: false as unknown as true },
  });
  const { outcome, submit, reset } = useLeadSubmit<PhotographerApplicationInput>(
    "/api/photographer-application",
    setError,
  );

  if (outcome.state === "success") {
    return (
      <SuccessPanel
        title="Thank you — your application has been received."
        message={outcome.message}
        nextSteps="We review applications as we expand into new areas. If there's a suitable opportunity near you, we'll be in touch. Submitting an application doesn't guarantee assignments."
        resetLabel="Submit another application"
        onReset={() => {
          resetForm();
          reset();
        }}
      />
    );
  }

  const summary = () => {
    const v = getValues();
    return [
      `Name: ${v.fullName ?? ""}`,
      `Email: ${v.email ?? ""}`,
      `Phone: ${v.phone ?? ""}`,
      `Location: ${v.location ?? ""}`,
      `Experience: ${v.experience ?? ""}`,
      `Equipment: ${v.equipment ?? ""}`,
      `Portfolio: ${v.portfolioUrl ?? ""}`,
      `Availability: ${v.availability ?? ""}`,
    ].join("\n");
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit(values as PhotographerApplicationInput))}
      className="relative space-y-6"
      aria-describedby="apply-required-note"
    >
      <p id="apply-required-note" className="text-sm text-ink-500">
        Fields marked <span className="text-red-700">*</span> are required.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="app-name"
          label="Full name"
          required
          autoComplete="name"
          registration={register("fullName")}
          error={errors.fullName}
        />
        <TextField
          id="app-email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          registration={register("email")}
          error={errors.email}
        />
        <TextField
          id="app-phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          hint="Include the country code, e.g. +91 98765 43210."
          registration={register("phone")}
          error={errors.phone}
        />
        <TextField
          id="app-location"
          label="City and state"
          required
          placeholder="e.g. Kochi, Kerala"
          autoComplete="address-level2"
          registration={register("location")}
          error={errors.location}
        />
        <SelectField
          id="app-experience"
          label="Photography experience"
          required
          options={photographyExperience}
          registration={register("experience")}
          error={errors.experience}
          className="sm:col-span-2"
        />
        <TextareaField
          id="app-equipment"
          label="Equipment owned"
          required
          placeholder="e.g. 360° camera model, DSLR/mirrorless + panoramic head, tripod/monopod, lighting, drone"
          registration={register("equipment")}
          error={errors.equipment}
          className="sm:col-span-2"
        />
        <TextField
          id="app-portfolio"
          label="Portfolio URL"
          type="url"
          inputMode="url"
          placeholder="https://"
          hint="A website, Google Maps contributor profile, Instagram or cloud folder."
          registration={register("portfolioUrl")}
          error={errors.portfolioUrl}
        />
        <SelectField
          id="app-availability"
          label="Availability"
          required
          options={availabilityOptions}
          registration={register("availability")}
          error={errors.availability}
        />
      </div>

      <HoneypotField registration={register("website")} />

      <CheckboxField
        id="app-consent"
        registration={register("consent")}
        error={errors.consent}
        label={
          <>
            I agree that PanoVeya may store my details and contact me about photography
            opportunities, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-mint-700 underline underline-offset-2">
              privacy policy
            </Link>
            . <span className="text-red-700">*</span>
          </>
        }
      />

      <div aria-live="polite">
        <SubmitAlert
          outcome={outcome}
          fallback={fallback}
          mailtoSubject="Photographer network application"
          mailtoBody={summary}
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send aria-hidden /> Submit application
          </>
        )}
      </Button>
    </form>
  );
}
