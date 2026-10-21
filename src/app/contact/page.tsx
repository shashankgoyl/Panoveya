import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BusinessEnquiryForm } from "@/components/forms/business-enquiry-form";
import { PageHero } from "@/components/layout/page-hero";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Free Quote",
  description:
    "Request a free, no-obligation quote for a 360° virtual tour of your hotel, restaurant, venue, property, showroom or campus. PanoVeya serves businesses across India.",
  path: "/contact",
});

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mint-200/50 text-mint-800">
        <Icon aria-hidden className="size-4" />
      </span>
      <div className="text-sm">
        <p className="font-semibold text-ink-900">{label}</p>
        <div className="mt-0.5 text-ink-500">{children}</div>
      </div>
    </li>
  );
}

const NotPublished = () => <span className="italic">Not yet published — please use the form</span>;

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        eyebrow="Contact"
        title="Tell us about your space"
        intro="Share a few details and we'll recommend the right tour and send a no-obligation quote. Prices depend on your venue size, capture points, travel, editing, hosting and publishing needs."
      />
      <section className="bg-mist-50 py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div
            id="enquiry"
            className="rounded-[1.5rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-midnight-900/6 sm:p-10"
          >
            <h2 className="text-2xl font-semibold text-ink-900">Business enquiry</h2>
            <p className="mt-2 mb-8 text-sm text-ink-500">
              For hotels, restaurants, venues, property, retail and institutions.
            </p>
            <BusinessEnquiryForm
              fallback={{ email: contact.email, whatsapp: contact.whatsapp, phone: contact.phone }}
            />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-midnight-900/6">
              <h2 className="font-semibold text-ink-900">Other ways to reach us</h2>
              <ul className="mt-5 space-y-4">
                <ContactRow icon={Mail} label="Email">
                  {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <NotPublished />}
                </ContactRow>
                <ContactRow icon={Phone} label="Phone">
                  {contact.phone ? (
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                  ) : (
                    <NotPublished />
                  )}
                </ContactRow>
                {contact.whatsapp && (
                  <ContactRow icon={MessageCircle} label="WhatsApp">
                    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </ContactRow>
                )}
                <ContactRow icon={MapPin} label="Where we work">
                  {contact.address ? <p>{contact.address}</p> : null}
                  <p>{contact.serviceArea}</p>
                </ContactRow>
                <ContactRow icon={Clock} label="Response time">
                  {contact.responseTime}
                </ContactRow>
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] bg-midnight-900 p-6 text-white">
              <Camera aria-hidden className="size-6 text-mint-300" />
              <h2 className="mt-3 font-semibold">Are you a 360° photographer?</h2>
              <p className="mt-2 text-sm text-slate-300">
                Use our separate application form to register your interest in the PanoVeya network.
              </p>
              <Link
                href="/photographer-network#apply"
                className="mt-4 inline-flex text-sm font-semibold text-mint-300 hover:text-mint-200"
              >
                Apply to join the network →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
