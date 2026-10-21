import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  id,
  className,
}: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase",
            dark ? "text-mint-300" : "text-mint-700",
          )}
        >
          <span aria-hidden className={cn("h-px w-6", dark ? "bg-mint-300" : "bg-mint-600")} />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </Tag>
      {description && (
        <div
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-slate-300" : "text-ink-500",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
