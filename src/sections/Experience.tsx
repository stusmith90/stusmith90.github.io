import {
  companyTypes,
  cvRequestHref,
  experienceLayers,
  yearsWordCapitalised,
} from "../content";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section className="section section-ink" id="layers">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>
          {yearsWordCapitalised} years across three layers of the same problem.
        </h2>
        <p className="section-lede">
          Organised by layer rather than by employer, because that is how the
          work divides. Names and dates are on the CV, which is{" "}
          <a className="inline-link" href={cvRequestHref}>
            available on request
          </a>
          .
        </p>
      </Reveal>

      <Reveal as="div" className="exp-companies" delay={80}>
        <p className="exp-companies-label">Kinds of company</p>
        <ul>
          {companyTypes.map((company) => (
            <li key={company}>{company}</li>
          ))}
        </ul>
      </Reveal>

      <div className="exp-layers">
        {experienceLayers.map((entry, index) => (
          <Reveal
            as="article"
            key={entry.layer}
            className="exp-layer"
            delay={index * 90}
          >
            <p className="exp-index" aria-hidden="true">
              {entry.index}
            </p>

            <div className="exp-body">
              <h3 className="exp-word">{entry.layer}</h3>
              <p className="exp-kicker">{entry.kicker}</p>
              <p className="exp-detail">{entry.detail}</p>
              <ul className="exp-stack">
                {entry.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
