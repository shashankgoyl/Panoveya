import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { contact } = siteConfig;
  const entity = siteConfig.legalName ?? siteConfig.name;
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="21 October 2026">
      <p>
        This policy explains how {entity} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal
        information you share through this website. We aim to collect only what we need to respond to
        you.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Business enquiries:</strong> your name, business name and type, city and state, email,
          phone number, service requirements, venue size and any additional details you provide.
        </li>
        <li>
          <strong>Photographer applications:</strong> your name, email, phone number, city and state,
          experience, equipment, portfolio link and availability.
        </li>
        <li>
          <strong>Technical data:</strong> our hosting provider may process standard request data such as
          IP address and browser type for security and to keep the site running. We use it to limit
          abusive or automated submissions.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry, prepare a quote and deliver services you request.</li>
        <li>To assess photographer applications and contact you about potential assignments.</li>
        <li>To protect the website against spam and misuse.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Consent</h2>
      <p>
        Our forms ask for your consent before we contact you. You can withdraw consent at any time by
        contacting us, after which we will stop contacting you about that enquiry or application.
      </p>

      <h2>Service providers</h2>
      <p>
        Form submissions are delivered to our team by email using a third-party email delivery provider,
        and the website is hosted by a third-party hosting provider. These providers process data on our
        behalf and may store it outside India.
      </p>

      <h2>Retention</h2>
      <p>
        We keep enquiry and application details only as long as needed for the purposes above or as
        required by law, then delete them.
      </p>

      <h2>Your rights</h2>
      <p>
        Subject to applicable law, including India&apos;s Digital Personal Data Protection Act, 2023, you
        may ask to access, correct or erase your personal data, or raise a grievance about how it has
        been handled.
      </p>

      <h2>Contact</h2>
      <p>
        {contact.email ? (
          <>
            Email us at <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </>
        ) : (
          <>
            A dedicated privacy contact will be published here. Until then, please reach us through the{" "}
            <Link href="/contact">contact page</Link>.
          </>
        )}
      </p>
      <p className="text-sm italic">
        This policy is an initial version for our launch website and will be updated as our services and
        legal entity details are finalised.
      </p>
    </LegalPage>
  );
}
