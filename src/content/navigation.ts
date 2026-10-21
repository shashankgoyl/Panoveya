export type NavItem = { label: string; href: string };

/** Primary navigation. Anchors point to homepage sections; they also work from inner pages. */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Our Network", href: "/photographer-network" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = { label: "Get a Free Quote", href: "/contact#enquiry" };
export const photographerCta: NavItem = {
  label: "Apply to Join the Network",
  href: "/photographer-network#apply",
};

export const companyLinks: NavItem[] = [
  { label: "About PanoVeya", href: "/about" },
  { label: "Photographer Network", href: "/photographer-network" },
  { label: "Insights", href: "/insights" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];
