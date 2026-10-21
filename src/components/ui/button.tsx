import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Button styles following shadcn/ui conventions (cva variants + cn). */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-mint-400 text-midnight-950 hover:bg-mint-300 shadow-[0_8px_24px_-8px_rgb(23_207_174/0.6)] hover:-translate-y-px",
        dark: "bg-midnight-900 text-white hover:bg-midnight-700",
        outline:
          "border border-midnight-900/15 bg-white text-ink-900 hover:border-midnight-900/30 hover:bg-mist-100",
        ghostLight:
          "border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/12 hover:border-white/35",
        link: "rounded-none px-0 text-mint-700 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & ButtonVariantProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & ButtonVariantProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
