import type { StackLayer } from "../content";

export const traceLayers: readonly StackLayer[] = [
  "interface",
  "service",
  "shipping",
];

/**
 * A trace either waits at the top, is travelling down through the layers, or
 * has arrived. `reached` is the deepest layer the request has got to; every
 * layer above it stays lit so the reader can reread any story.
 */
export type TraceState =
  | { kind: "idle"; actionId: string }
  | { kind: "running"; actionId: string; reached: number }
  | { kind: "done"; actionId: string; selected: number };

export type TraceEvent =
  | { type: "start"; actionId: string }
  | { type: "advance" }
  | { type: "select"; layerIndex: number }
  | { type: "complete" };

const lastLayer = traceLayers.length - 1;

export function traceReducer(state: TraceState, event: TraceEvent): TraceState {
  switch (event.type) {
    case "start":
      return { kind: "running", actionId: event.actionId, reached: 0 };
    case "advance":
      if (state.kind !== "running") {
        return state;
      }
      return state.reached >= lastLayer
        ? { kind: "done", actionId: state.actionId, selected: lastLayer }
        : { ...state, reached: state.reached + 1 };
    case "complete":
      return { kind: "done", actionId: state.actionId, selected: lastLayer };
    case "select":
      return {
        kind: "done",
        actionId: state.actionId,
        selected: event.layerIndex,
      };
  }
}

/** The layer whose story is on show, or none before the first trace. */
export function focusedLayer(state: TraceState): number | null {
  switch (state.kind) {
    case "idle":
      return null;
    case "running":
      return state.reached;
    case "done":
      return state.selected;
  }
}

/** Whether a layer has been reached, so its story can be opened. */
export function isLayerReached(state: TraceState, layerIndex: number) {
  switch (state.kind) {
    case "idle":
      return false;
    case "running":
      return layerIndex <= state.reached;
    case "done":
      return true;
  }
}
