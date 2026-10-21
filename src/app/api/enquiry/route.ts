import { packageOptions } from "@/lib/forms/options";
import { businessEnquirySchema } from "@/lib/forms/schemas";
import { handleLeadRequest } from "@/lib/leads/handle-request";

export async function POST(request: Request) {
  return handleLeadRequest(request, businessEnquirySchema, (d) => ({
    kind: "business-enquiry",
    subject: `New business enquiry — ${d.businessName} (${d.location})`,
    replyTo: d.email,
    fields: [
      { label: "Name", value: d.name },
      { label: "Business name", value: d.businessName },
      { label: "Business type", value: d.businessType },
      { label: "City and state", value: d.location },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phone },
      { label: "Service required", value: d.serviceRequired },
      {
        label: "Package of interest",
        value: packageOptions.find((p) => p.value === d.packageInterest)?.label ?? "Not specified",
      },
      { label: "Venue size / rooms", value: d.venueSize ?? "" },
      { label: "Additional requirements", value: d.message ?? "" },
      { label: "Consent to be contacted", value: d.consent ? "Yes" : "No" },
    ],
  }));
}
