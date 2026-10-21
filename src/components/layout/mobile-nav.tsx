"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/content/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes (state is preserved across navigations).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-midnight-950"
      >
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="flex flex-col">
            {items.map((item, i) => (
              <li key={item.href} className="border-b border-white/8">
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-xl text-white"
                >
                  {item.label}
                  <span aria-hidden className="text-mint-300">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
