import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";

/** Orbit / panorama mark: a sphere, a tilted horizon orbit and a viewpoint dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("size-8", className)}>
      <circle cx="20" cy="20" r="11.5" stroke="currentColor" strokeWidth="2.6" />
      <ellipse
        cx="20"
        cy="20"
        rx="18"
        ry="6.6"
        transform="rotate(-18 20 20)"
        stroke="var(--color-mint-400)"
        strokeWidth="2.6"
      />
      <circle cx="35.2" cy="14.4" r="3.2" fill="var(--color-mint-400)" />
    </svg>
  );
}

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[1.35rem] font-semibold tracking-tight",
        tone === "light" ? "text-white" : "text-ink-900",
        className,
      )}
    >
      <LogoMark />
      <span>
        Pano<span className={tone === "light" ? "text-mint-300" : "text-mint-700"}>Veya</span>
      </span>
    </Link>
  );
}
