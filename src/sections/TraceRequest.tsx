import { useEffect, useReducer } from "react";

import { traceActions } from "../content";
import { restingTrace, traceLayers, traceReducer } from "../trace/traceMachine";
import { Reveal } from "./Reveal";

/** Long enough to see the request arrive at a layer, short enough not to feel like a loading screen. */
const stepDurationMs = 700;

type TraceRequestProps = {
  prefersReducedMotion: boolean;
};

export function TraceRequest({ prefersReducedMotion }: TraceRequestProps) {
  const [state, dispatch] = useReducer(
    traceReducer,
    traceActions[0].id,
    restingTrace,
  );

  useEffect(() => {
    if (!state.isRunning) {
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
        <h2>One action, followed through the whole stack.</h2>
        <p className="section-lede">
          Pick something a person does. Each layer shows the decision waiting
          there, taken from systems I have built.
        </p>
      </Reveal>

      <div className="trace-layout">
        <div
          className="trace-actions"
          role="group"
          aria-label="Actions to trace"
        >
          {traceActions.map((candidate) => {
            const isCurrent = candidate.id === state.actionId;

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

        <div className="trace-stack">
          <ol className="trace-layers" aria-live="polite">
            {traceLayers.map((layer, index) => (
              <li
                key={layer}
                className={`trace-layer ${index <= state.reached ? "is-reached" : ""} ${state.isRunning && index === state.reached ? "is-current" : ""}`}
              >
                <p className="trace-layer-head">
                  <span className="trace-layer-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="trace-layer-name">{layer}</span>
                </p>
                <p className="trace-layer-story">{action.stories[layer]}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
