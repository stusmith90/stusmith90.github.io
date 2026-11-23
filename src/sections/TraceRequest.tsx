import { useEffect, useReducer } from "react";

import { traceActions } from "../content";
import {
  focusedLayer,
  isLayerReached,
  traceLayers,
  traceReducer,
} from "../trace/traceMachine";
import { Reveal } from "./Reveal";

/** Long enough to read the layer name as the request passes it, short enough not to feel like a loading screen. */
const stepDurationMs = 950;

type TraceRequestProps = {
  prefersReducedMotion: boolean;
};

export function TraceRequest({ prefersReducedMotion }: TraceRequestProps) {
  const [state, dispatch] = useReducer(traceReducer, {
    kind: "idle",
    actionId: traceActions[0].id,
  });

  useEffect(() => {
    if (state.kind !== "running") {
      return;
    }

    const timer = window.setTimeout(
      () => dispatch({ type: "advance" }),
      stepDurationMs,
    );

    return () => window.clearTimeout(timer);
  }, [state]);

  const action =
    traceActions.find((candidate) => candidate.id === state.actionId) ??
    traceActions[0];
  const focused = focusedLayer(state);
  const focusedName = focused === null ? null : traceLayers[focused];

  const startTrace = (actionId: string) => {
    dispatch({ type: "start", actionId });

    if (prefersReducedMotion) {
      dispatch({ type: "complete" });
    }
  };

  return (
    <section className="section section-trace" id="trace">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Trace a request</p>
        <h2>Pick something a person does. Follow it down the stack.</h2>
        <p className="section-lede">
          Every action crosses all three layers. These are the decisions waiting
          at each one, taken from systems I have built.
        </p>
      </Reveal>

      <div className="trace-layout">
        <div
          className="trace-actions"
          role="group"
          aria-label="Actions to trace"
        >
          {traceActions.map((candidate) => {
            const isCurrent =
              state.kind !== "idle" && candidate.id === state.actionId;

            return (
              <button
                key={candidate.id}
                type="button"
                className={`trace-action ${isCurrent ? "is-current" : ""}`}
                aria-pressed={isCurrent}
                onClick={() => startTrace(candidate.id)}
              >
                <span className="trace-action-verb" aria-hidden="true">
                  →
                </span>
                {candidate.label}
              </button>
            );
          })}
        </div>

        <div
          className="trace-stack"
          data-state={state.kind}
          style={{ ["--packet-index" as string]: focused ?? -1 }}
        >
          <span className="trace-wire" aria-hidden="true">
            <span className="trace-packet" />
          </span>

          <ol className="trace-layers" aria-label="Layers of the stack">
            {traceLayers.map((layer, index) => {
              const reached = isLayerReached(state, index);
              const isFocused = focused === index;

              return (
                <li key={layer}>
                  <button
                    type="button"
                    className={`trace-layer ${reached ? "is-reached" : ""} ${isFocused ? "is-focused" : ""}`}
                    disabled={!reached}
                    aria-current={isFocused ? "step" : undefined}
                    onClick={() =>
                      dispatch({ type: "select", layerIndex: index })
                    }
                  >
                    <span className="trace-layer-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="trace-layer-name">{layer}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="trace-story" aria-live="polite">
            {focusedName === null ? (
              <p className="trace-story-hint">
                Choose an action to send it through the stack.
              </p>
            ) : (
              <>
                <p className="trace-story-layer">
                  {action.label} · {focusedName}
                </p>
                <p className="trace-story-text">
                  {action.stories[focusedName]}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
