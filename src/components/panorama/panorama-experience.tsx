"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Viewer as PsvViewer } from "@photo-sphere-viewer/core";
import type { MarkersPlugin as PsvMarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { AlertTriangle, Hand, Info, Loader2, Move3d, RotateCcw } from "lucide-react";
import type { PanoramaScene } from "@/content/panoramas";
import { cn } from "@/lib/utils";
import { OPEN_SCENE_EVENT, type OpenSceneDetail } from "./panorama-events";

type Status = "idle" | "loading" | "ready" | "error";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function toMarkers(scene: PanoramaScene) {
  return scene.hotspots.map((h) => ({
    id: h.id,
    position: { yaw: `${h.yaw}deg`, pitch: `${h.pitch}deg` },
    html: `<span class="pv-hotspot" role="img" aria-label="${escapeHtml(h.title)}"></span>`,
    size: { width: 28, height: 28 },
    anchor: "center center",
    tooltip: {
      content: `<strong>${escapeHtml(h.title)}</strong><br>${escapeHtml(h.body)}`,
      position: "top center",
    },
  }));
}

export function PanoramaExperience({ scenes }: { scenes: PanoramaScene[] }) {
  const [activeId, setActiveId] = useState(scenes[0]?.id);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PsvViewer | null>(null);
  const markersRef = useRef<PsvMarkersPlugin | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const active = scenes.find((s) => s.id === activeId) ?? scenes[0];

  const start = useCallback(async (scene: PanoramaScene) => {
    if (viewerRef.current || !containerRef.current) return;
    if (!hasWebGL()) {
      setStatus("error");
      setError("Your browser or device doesn't support WebGL, which is needed for the 360° viewer.");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const { Viewer, MarkersPlugin } = await import("./psv-loader");
      if (!containerRef.current) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const viewer = new Viewer({
        container: containerRef.current,
        panorama: scene.src,
        caption: `${scene.label} — concept demo`,
        defaultYaw: `${scene.defaultYaw}deg`,
        defaultPitch: `${scene.defaultPitch ?? 0}deg`,
        defaultZoomLvl: 30,
        navbar: ["zoom", "move", "caption", "fullscreen"],
        loadingTxt: "Loading 360° scene…",
        mousewheelCtrlKey: true,
        touchmoveTwoFingers: false,
        defaultTransition: reduceMotion
          ? { speed: 0, rotation: false, effect: "fade" }
          : { speed: 900, rotation: false, effect: "fade" },
        lang: {
          zoomOut: "Zoom out",
          zoomIn: "Zoom in",
          moveUp: "Look up",
          moveDown: "Look down",
          moveLeft: "Look left",
          moveRight: "Look right",
          fullscreen: "Fullscreen",
          ctrlZoom: "Use Ctrl + scroll to zoom",
        },
        plugins: [[MarkersPlugin, { markers: toMarkers(scene) }]],
      });
      viewerRef.current = viewer;
      markersRef.current = viewer.getPlugin(MarkersPlugin) as PsvMarkersPlugin;
      viewer.addEventListener("ready", () => setStatus("ready"), { once: true });
      viewer.addEventListener("panorama-error", () => {
        setStatus("error");
        setError("This panorama couldn't be loaded. Please check your connection and try again.");
      });
    } catch (e) {
      console.error(e);
      setStatus("error");
      setError("The 360° viewer couldn't be loaded. Please check your connection and try again.");
    }
  }, []);

  const showScene = useCallback(
    async (scene: PanoramaScene, autoStart = false) => {
      setActiveId(scene.id);
      const viewer = viewerRef.current;
      if (viewer) {
        markersRef.current?.clearMarkers();
        await viewer.setPanorama(scene.src, {
          position: { yaw: `${scene.defaultYaw}deg`, pitch: `${scene.defaultPitch ?? 0}deg` },
          caption: `${scene.label} — concept demo`,
          zoom: 30,
        });
        markersRef.current?.setMarkers(toMarkers(scene));
      } else if (autoStart) {
        void start(scene);
      }
    },
    [start],
  );

  // Allow portfolio cards elsewhere on the page to open a specific scene.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const { sceneId } = (e as CustomEvent<OpenSceneDetail>).detail;
      const scene = scenes.find((s) => s.id === sceneId);
      if (!scene) return;
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      void showScene(scene, true);
    };
    window.addEventListener(OPEN_SCENE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SCENE_EVENT, onOpen);
  }, [scenes, showScene]);

  useEffect(
    () => () => {
      viewerRef.current?.destroy();
      viewerRef.current = null;
      markersRef.current = null;
    },
    [],
  );

  const retry = () => {
    viewerRef.current?.destroy();
    viewerRef.current = null;
    setStatus("idle");
    if (active) void start(active);
  };

  if (!active) return null;

  return (
    <div ref={sectionRef} className="grid gap-6 lg:grid-cols-[1fr_17rem]">
      <div>
        <div
          className="relative isolate aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-midnight-950 shadow-[var(--shadow-glow)] ring-1 ring-white/10 sm:aspect-[16/9]"
        >
          {/* Viewer mount point. PSV renders its own canvas and controls here. */}
          <div
            ref={containerRef}
            className={cn("absolute inset-0", status === "idle" && "pointer-events-none")}
            role="application"
            aria-label={`Interactive 360° view: ${active.label}. Drag or swipe to look around.`}
          />

          {status !== "ready" && (
            <div className="absolute inset-0">
              <Image
                src={active.poster}
                alt={active.posterAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-midnight-950/40 to-midnight-950/20" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-5 sm:p-8">
                <span className="rounded-full bg-midnight-950/70 px-3 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/15 backdrop-blur">
                  Still preview · the interactive view loads on request
                </span>
                {status === "error" ? (
                  <div className="max-w-md rounded-2xl bg-midnight-950/85 p-4 text-sm text-slate-200 ring-1 ring-red-400/30">
                    <p className="flex items-start gap-2">
                      <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-red-300" />
                      <span role="alert">{error}</span>
                    </p>
                    <button
                      type="button"
                      onClick={retry}
                      className="mt-3 inline-flex items-center gap-2 font-semibold text-mint-300 hover:text-mint-200"
                    >
                      <RotateCcw aria-hidden className="size-4" /> Try again
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => void start(active)}
                    disabled={status === "loading"}
                    className="inline-flex h-12 items-center gap-2.5 rounded-full bg-mint-400 px-6 font-semibold text-midnight-950 shadow-[0_10px_30px_-8px_rgb(23_207_174/0.7)] transition hover:bg-mint-300 disabled:opacity-80"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 aria-hidden className="size-5 animate-spin" /> Loading 360° view…
                      </>
                    ) : (
                      <>
                        <Move3d aria-hidden className="size-5" /> Start the interactive 360° demo
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <Hand aria-hidden className="size-4 text-mint-300" />
            Drag or swipe to look around · pinch or Ctrl + scroll to zoom · tap the glowing points
          </p>
          <a
            href={active.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-300"
          >
            Panorama: {active.credit.label}
          </a>
        </div>
      </div>

      <div>
        <p id="scene-list-label" className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
          Sample scenes
        </p>
        <ul aria-labelledby="scene-list-label" className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
          {scenes.map((scene) => {
            const selected = scene.id === active.id;
            return (
              <li key={scene.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => void showScene(scene)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm transition",
                    selected
                      ? "bg-white/10 text-white ring-1 ring-mint-400/60"
                      : "text-slate-300 ring-1 ring-white/8 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Image
                    src={scene.poster}
                    alt=""
                    width={56}
                    height={40}
                    sizes="56px"
                    className="h-10 w-14 shrink-0 rounded-md object-cover"
                  />
                  <span className="font-medium">{scene.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 rounded-xl bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/8">
          <p className="flex items-start gap-2">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-mint-300" />
            <span>
              <strong className="text-white">{active.label}.</strong> {active.description}
            </span>
          </p>
          {active.hotspots.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-white/8 pt-3 text-xs text-slate-400">
              {active.hotspots.map((h) => (
                <li key={h.id}>
                  <span className="font-semibold text-slate-200">{h.title}:</span> {h.body}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
