"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessTypes, packageOptions, servicesRequired } from "@/lib/forms/options";
import {
  businessEnquirySchema,
  type BusinessEnquiry,
  type BusinessEnquiryInput,
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

export function BusinessEnquiryForm({ fallback }: { fallback: FallbackContact }) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<BusinessEnquiryInput, unknown, BusinessEnquiry>({
    resolver: zodResolver(businessEnquirySchema),
    mode: "onTouched",
    defaultValues: { phone: "+91 ", website: "", consent: false as unknown as true, packageInterest: "" },
  });
  const { outcome, submit, reset } = useLeadSubmit<BusinessEnquiryInput>("/api/enquiry", setError);

  // Pre-select a package when arriving from a pricing card (/contact?package=professional).
  useEffect(() => {
    const pkg = new URLSearchParams(window.location.search).get("package");
    if (pkg && packageOptions.some((p) => p.value === pkg)) {
      setValue("packageInterest", pkg as BusinessEnquiryInput["packageInterest"]);
    }
  }, [setValue]);

  if (outcome.state === "success") {
    return (
      <SuccessPanel
        title="Thank you — we've received your enquiry."
        message={outcome.message}
        nextSteps="We'll review your requirements and reply by email or phone. If anything changes in the meantime, just reply to our message."
        resetLabel="Send another enquiry"
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
      `Name: ${v.name ?? ""}`,
      `Business: ${v.businessName ?? ""} (${v.businessType ?? ""})`,
      `Location: ${v.location ?? ""}`,
      `Email: ${v.email ?? ""}`,
      `Phone: ${v.phone ?? ""}`,
      `Service: ${v.serviceRequired ?? ""}`,
      `Package: ${v.packageInterest ?? ""}`,
      `Size / rooms: ${v.venueSize ?? ""}`,
      `Requirements: ${v.message ?? ""}`,
    ].join("\n");
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => submit(values as BusinessEnquiryInput))}
      className="relative space-y-6"
      aria-describedby="enquiry-required-note"
    >
      <p id="enquiry-required-note" className="text-sm text-ink-500">
        Fields marked <span className="text-red-700">*</span> are required.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="enq-name"
          label="Your name"
          required
          autoComplete="name"
          registration={register("name")}
          error={errors.name}
        />
        <TextField
          id="enq-business"
          label="Business name"
          required
          autoComplete="organization"
          registration={register("businessName")}
          error={errors.businessName}
        />
        <SelectField
          id="enq-type"
          label="Business type"
          required
          options={businessTypes}
          registration={register("businessType")}
          error={errors.businessType}
        />
        <TextField
          id="enq-location"
          label="City and state"
          required
          placeholder="e.g. Jaipur, Rajasthan"
          autoComplete="address-level2"
          registration={register("location")}
          error={errors.location}
        />
        <TextField
          id="enq-email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          registration={register("email")}
          error={errors.email}
        />
        <TextField
          id="enq-phone"
          label="Phone with country code"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          hint="Include the country code, e.g. +91 98765 43210."
          registration={register("phone")}
          error={errors.phone}
        />
        <SelectField
          id="enq-service"
          label="Service required"
          required
          options={servicesRequired}
          registration={register("serviceRequired")}
          error={errors.serviceRequired}
        />
        <SelectField
          id="enq-package"
          label="Package of interest"
          options={packageOptions}
          placeholder="Not sure yet"
          registration={register("packageInterest")}
          error={errors.packageInterest}
        />
        <TextField
          id="enq-size"
          label="Approximate venue size or number of rooms"
          placeholder="e.g. 3,000 sq ft, or 24 rooms + 2 banquet halls"
          registration={register("venueSize")}
          error={errors.venueSize}
          className="sm:col-span-2"
        />
        <TextareaField
          id="enq-message"
          label="Additional requirements"
          placeholder="Areas you'd like captured, timelines, number of branches, where you'll use the tour…"
          registration={register("message")}
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      <HoneypotField registration={register("website")} />

      <CheckboxField
        id="enq-consent"
        registration={register("consent")}
        error={errors.consent}
        label={
          <>
            I agree that PanoVeya may contact me by email or phone about this enquiry, as described
            in the{" "}
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
          mailtoSubject="Business enquiry for PanoVeya"
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
            <Send aria-hidden /> Get my free quote
          </>
        )}
      </Button>
    </form>
  );
}
