"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-midnight-950 py-28 text-center text-white">
      <div className="container-page max-w-xl">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-4 text-slate-300">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <Button className="mt-8" onClick={reset}>
          Try again
        </Button>
      </div>
    </section>
  );
}
