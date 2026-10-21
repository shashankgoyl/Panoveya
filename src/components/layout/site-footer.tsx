import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { companyLinks, legalLinks } from "@/content/navigation";
import { industries } from "@/content/industries";
import { servicePages } from "@/content/services";
import { activeSocialLinks, siteConfig } from "@/content/site";
import { Logo } from "./logo";

async function CopyrightYear() {
  "use cache";
  // Resolved at build/cache time; redeploys keep it current.
  return <>{new Date().getFullYear()}</>;
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="text-slate-400 italic">{children}</span>;
}

export function SiteFooter() {
  const { contact } = siteConfig;
  const socials = activeSocialLinks();

  return (
    <footer className="bg-midnight-950 text-slate-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-slate-400">{siteConfig.description}</p>
          <p className="mt-4 font-display text-sm text-mint-300">{siteConfig.tagline}</p>
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Follow</p>
            {socials.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-mint-400/50 hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm">
                <Placeholder>Social profiles will be listed here once launched.</Placeholder>
              </p>
            )}
          </div>
        </div>

        <FooterColumn title="Services">
          {servicePages.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.shortTitle}
            </FooterLink>
          ))}
          <FooterLink href="/services">All services</FooterLink>
        </FooterColumn>

        <FooterColumn title="Industries">
          {industries.map((i) => (
            <FooterLink key={i.slug} href={`/industries/${i.slug}`}>
              {i.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {companyLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-mint-400" />
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              ) : (
                <Placeholder>Email address to be published</Placeholder>
              )}
            </li>
            <li className="flex gap-2.5">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-mint-400" />
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {contact.phone}
                </a>
              ) : (
                <Placeholder>Phone number to be published</Placeholder>
              )}
            </li>
            {contact.whatsapp && (
              <li className="flex gap-2.5">
                <MessageCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-mint-400" />
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            )}
            <li className="flex gap-2.5">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-mint-400" />
              {contact.address ? (
                <span>{contact.address}</span>
              ) : (
                <span>{siteConfig.country}</span>
              )}
            </li>
          </ul>
          <Link
            href="/contact#enquiry"
            className="mt-6 inline-flex text-sm font-semibold text-mint-300 hover:text-mint-200"
          >
            Send an enquiry →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.legalName ?? siteConfig.name}. All rights reserved.
          </p>
          <p>
            Sample imagery: CC0 panoramas from{" "}
            <a
              href="https://polyhaven.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-300"
            >
              Poly Haven
            </a>
            , shown as concept demos.
          </p>
          <ul className="flex gap-5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-slate-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-400 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
