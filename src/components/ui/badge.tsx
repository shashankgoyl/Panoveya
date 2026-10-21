import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "mint" | "amber" | "slate" | "dark" | "glass";

const tones: Record<Tone, string> = {
  mint: "bg-mint-200/60 text-mint-800 ring-mint-600/20",
  amber: "bg-amber-100 text-amber-900 ring-amber-600/20",
  slate: "bg-mist-100 text-ink-700 ring-ink-500/15",
  dark: "bg-midnight-900 text-white ring-white/10",
  glass: "bg-midnight-950/65 text-white ring-white/15 backdrop-blur-md",
};

export function Badge({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
