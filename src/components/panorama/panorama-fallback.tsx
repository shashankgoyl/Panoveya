import { ImageOff } from "lucide-react";

/** Shown when no genuine equirectangular panorama is configured in content/panoramas.ts. */
export function PanoramaFallback() {
  return (
    <div className="flex aspect-[16/9] flex-col items-center justify-center rounded-[var(--radius-card)] bg-gradient-to-br from-midnight-800 to-midnight-950 p-8 text-center ring-1 ring-white/10">
      <ImageOff aria-hidden className="size-10 text-mint-300" />
      <p className="mt-4 font-display text-xl text-white">Interactive demo coming soon</p>
      <p className="mt-2 max-w-md text-sm text-slate-400">
        No 360° panorama is configured yet. Add a 2:1 equirectangular image to{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">public/panoramas</code> and
        list it in{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">src/content/panoramas.ts</code>.
      </p>
    </div>
  );
}
