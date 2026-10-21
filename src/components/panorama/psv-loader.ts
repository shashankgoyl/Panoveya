/**
 * Loaded on demand (dynamic import) so Photo Sphere Viewer and three.js are
 * only downloaded when a visitor chooses to open the 360° demo.
 */
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

export { Viewer } from "@photo-sphere-viewer/core";
export { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
