import type { Metadata } from "next";
import { LogoMark } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-midnight-950 bg-orbit-grid py-28 text-center text-white">
      <div className="container-page max-w-xl">
        <LogoMark className="mx-auto size-14 text-white" />
        <p className="mt-6 font-display text-sm font-semibold tracking-[0.2em] text-mint-300 uppercase">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold">This space hasn&apos;t been captured yet</h1>
        <p className="mt-4 text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="ghostLight">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
