import "server-only";

/**
 * Server-side lead delivery configuration.
 * All values come from environment variables and are never sent to the browser.
 */
export type LeadDeliveryConfig =
  | { configured: true; apiKey: string; from: string; to: string[] }
  | { configured: false; missing: string[] };

export function getLeadDeliveryConfig(): LeadDeliveryConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_NOTIFICATION_FROM?.trim();
  const to = (process.env.LEAD_NOTIFICATION_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!from) missing.push("LEAD_NOTIFICATION_FROM");
  if (to.length === 0) missing.push("LEAD_NOTIFICATION_TO");

  if (missing.length > 0 || !apiKey || !from) return { configured: false, missing };
  return { configured: true, apiKey, from, to };
}
