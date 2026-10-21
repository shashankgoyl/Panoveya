"use client";

import { Move3d } from "lucide-react";
import { requestOpenScene } from "./panorama-events";

/** Opens a scene in the on-page 360° viewer. Falls back to a plain anchor link without JS. */
export function OpenSceneButton({ sceneId, label }: { sceneId: string; label: string }) {
  return (
    <a
      href="#experience"
      onClick={(e) => {
        e.preventDefault();
        requestOpenScene(sceneId);
      }}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-mint-700 hover:text-mint-800"
    >
      <Move3d aria-hidden className="size-4" />
      {label}
    </a>
  );
}
