import type { StackLayer } from "../content";

export const traceLayers: readonly StackLayer[] = [
  "interface",
  "service",
  "shipping",
];

/**
 * `reached` is the deepest layer the request has got to. A trace at rest has
 * reached every layer, so all three stories are readable without interacting;
 * starting one replays the request from the top.
 */
export type TraceState = {
  actionId: string;
  reached: number;
  isRunning: boolean;
};

export type TraceEvent =
  | { type: "start"; actionId: string }
  | { type: "advance" }
  | { type: "complete" };

const lastLayer = traceLayers.length - 1;

export function restingTrace(actionId: string): TraceState {
  return { actionId, reached: lastLayer, isRunning: false };
}

export function traceReducer(state: TraceState, event: TraceEvent): TraceState {
  switch (event.type) {
    case "start":
      return { actionId: event.actionId, reached: 0, isRunning: true };
    case "advance":
      if (!state.isRunning) {
        return state;
      }
      return state.reached >= lastLayer
        ? restingTrace(state.actionId)
        : { ...state, reached: state.reached + 1 };
    case "complete":
      return restingTrace(state.actionId);
  }
}
