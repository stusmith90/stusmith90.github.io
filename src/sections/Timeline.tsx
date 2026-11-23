import { useId, useState } from "react";

import { releaseLog } from "../content";
import { Reveal } from "./Reveal";

type LogView = "changelog" | "plain";

export function Timeline() {
  const [view, setView] = useState<LogView>("changelog");
  const headingId = useId();

  return (
    <section
      className="section section-log"
      id="log"
      aria-labelledby={headingId}
    >
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Release log</p>
        <h2 id={headingId}>A career, written the way software ships.</h2>
        <p className="section-lede">
          Newest first. Each version is a change of scope, not a date.
        </p>
      </Reveal>

      <div className="log-toggle" role="group" aria-label="Log view">
        <button
          type="button"
          aria-pressed={view === "changelog"}
          onClick={() => setView("changelog")}
        >
          Changelog
        </button>
        <button
          type="button"
          aria-pressed={view === "plain"}
          onClick={() => setView("plain")}
        >
          Plain
        </button>
      </div>

      {view === "changelog" ? (
        <ol className="log-list">
          {releaseLog.map((entry) => (
            <li className="log-entry" key={entry.version}>
              <p className="log-version">{entry.version}</p>
              <div className="log-body">
                <h3 className="log-role">
                  {entry.role}
                  <span className="log-company"> · {entry.companyType}</span>
                </h3>
                <ul className="log-notes">
                  {entry.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="log-plain">
          {releaseLog.map((entry) => (
            <li key={entry.version}>
              <strong>{entry.role}</strong>, {entry.companyType.toLowerCase()}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
