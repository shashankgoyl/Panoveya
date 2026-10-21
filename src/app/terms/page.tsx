import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms that apply to your use of the ${siteConfig.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  const entity = siteConfig.legalName ?? siteConfig.name;
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="21 October 2026">
      <p>
        These terms apply to your use of this website operated by {entity}. By using the site, you agree
        to them.
      </p>

      <h2>Information on this website</h2>
      <p>
        We try to keep information accurate and up to date, but it is provided for general purposes and
        may change. Service descriptions are not offers; the scope, price and timeline of any project
        are set out in a written quote or agreement.
      </p>

      <h2>Demos and sample imagery</h2>
      <p>
        Items marked &ldquo;Concept Demo&rdquo;, &ldquo;Illustrative Example&rdquo; or &ldquo;Illustrative
        image&rdquo; are samples created from openly licensed imagery. They are not client projects and
        do not depict businesses we have worked with. Services marked &ldquo;On our roadmap&rdquo; are
        not currently available.
      </p>

      <h2>No guaranteed results</h2>
      <p>
        Virtual tours can help customers understand your space, but we do not guarantee any particular
        increase in enquiries, bookings, revenue or search rankings. Publication of imagery on third-party
        platforms such as Google Maps is controlled by those platforms.
      </p>

      <h2>Photographer network</h2>
      <p>
        Submitting a photographer application is an expression of interest. It does not create
        employment, a contract or any guarantee of assignments.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {siteConfig.name} name, logo and original website content belong to us. Third-party sample
        imagery is used under its licence, as credited on the <Link href="/about">About page</Link>.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please don&apos;t misuse the website, including by submitting false information, sending spam or
        attempting to disrupt the service.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date above shows the latest version.</p>
      <p className="text-sm italic">
        These terms are an initial version for our launch website and will be updated once our legal
        entity and contracting details are finalised.
      </p>
    </LegalPage>
  );
}
