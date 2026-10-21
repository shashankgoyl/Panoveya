import { photographerApplicationSchema } from "@/lib/forms/schemas";
import { handleLeadRequest } from "@/lib/leads/handle-request";

export async function POST(request: Request) {
  return handleLeadRequest(request, photographerApplicationSchema, (d) => ({
    kind: "photographer-application",
    subject: `New photographer application — ${d.fullName} (${d.location})`,
    replyTo: d.email,
    fields: [
      { label: "Full name", value: d.fullName },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phone },
      { label: "City and state", value: d.location },
      { label: "Experience", value: d.experience },
      { label: "Equipment owned", value: d.equipment },
      { label: "Portfolio URL", value: d.portfolioUrl ?? "" },
      { label: "Availability", value: d.availability },
      { label: "Consent to be contacted", value: d.consent ? "Yes" : "No" },
    ],
  }));
}
