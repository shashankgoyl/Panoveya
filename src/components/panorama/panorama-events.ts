/** Lets other parts of the page (e.g. portfolio cards) open a scene in the 360° viewer. */
export const OPEN_SCENE_EVENT = "panoveya:open-scene";

export type OpenSceneDetail = { sceneId: string };

export function requestOpenScene(sceneId: string) {
  window.dispatchEvent(
    new CustomEvent<OpenSceneDetail>(OPEN_SCENE_EVENT, { detail: { sceneId } }),
  );
}
