import "server-only";
import { Resend } from "resend";
import { getLeadDeliveryConfig } from "./config";

/**
 * Lead delivery integration point.
 *
 * Today leads are delivered as notification emails via Resend. To add a CRM,
 * database or webhook later, extend `deliverLead` — the API routes and forms
 * don't need to change.
 */
export type LeadKind = "business-enquiry" | "photographer-application";

export type LeadField = { label: string; value: string };

export type Lead = {
  kind: LeadKind;
  subject: string;
  /** Email address of the person who submitted the form, used as reply-to. */
  replyTo: string;
  fields: LeadField[];
};

export type DeliveryResult =
  | { status: "sent"; id: string | null }
  | { status: "not_configured"; missing: string[] }
  | { status: "failed"; reason: string };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function renderText(lead: Lead, receivedAt: string) {
  return [
    lead.subject,
    "",
    ...lead.fields.map((f) => `${f.label}: ${f.value || "—"}`),
    "",
    `Received: ${receivedAt}`,
    "Sent from the PanoVeya website.",
  ].join("\n");
}

function renderHtml(lead: Lead, receivedAt: string) {
  const rows = lead.fields
    .map(
      (f) => `<tr>
  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;vertical-align:top;width:200px">${escapeHtml(f.label)}</td>
  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;font-size:14px;white-space:pre-wrap">${escapeHtml(f.value || "—")}</td>
</tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0"><tr><td align="center">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#071226;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:bold">${escapeHtml(lead.subject)}</td></tr>
<tr><td style="padding:8px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
<tr><td style="padding:16px 24px;color:#64748b;font-size:12px">Received ${escapeHtml(receivedAt)} · Reply to this email to respond directly to the sender.</td></tr>
</table></td></tr></table></body></html>`;
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const config = getLeadDeliveryConfig();
  if (!config.configured) return { status: "not_configured", missing: config.missing };

  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    const resend = new Resend(config.apiKey);
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: lead.replyTo,
      subject: lead.subject,
      text: renderText(lead, `${receivedAt} IST`),
      html: renderHtml(lead, `${receivedAt} IST`),
      tags: [{ name: "lead_kind", value: lead.kind }],
    });
    if (error) return { status: "failed", reason: `${error.name}: ${error.message}` };
    return { status: "sent", id: data?.id ?? null };
  } catch (err) {
    return { status: "failed", reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
