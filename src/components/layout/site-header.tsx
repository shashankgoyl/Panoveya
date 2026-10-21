import Link from "next/link";
import { mainNav, primaryCta } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-midnight-950">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-mint-400 px-4 py-2 font-semibold text-midnight-950 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={primaryCta.href} size="sm" className="hidden sm:inline-flex">
            {primaryCta.label}
          </ButtonLink>
          <MobileNav items={mainNav} cta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
