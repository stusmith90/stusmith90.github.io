import { releaseLog } from "../content";
import { Reveal } from "./Reveal";

export function Timeline() {
  return (
    <section className="section section-log" id="log">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Career</p>
        <h2>Roles, newest first.</h2>
        <p className="section-lede">
          Written as a release log: each version is a change of scope. Names and
          dates are on the CV.
        </p>
      </Reveal>

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
    </section>
  );
}
