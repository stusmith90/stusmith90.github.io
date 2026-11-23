import { caseStudies } from "../content";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section className="section section-work" id="work">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Problems where the cost of a mistake was the point.</h2>
        <p className="section-lede">
          Described by what they were rather than who they were for.
        </p>
      </Reveal>

      <div className="work-grid">
        {caseStudies.map((study, index) => (
          <Reveal
            as="article"
            key={study.title}
            className="work-card"
            delay={index * 80}
          >
            <p className="work-layer">{study.layer}</p>
            <h3 className="work-title">{study.title}</h3>
            <dl className="work-detail">
              <dt>Problem</dt>
              <dd>{study.problem}</dd>
              <dt>Approach</dt>
              <dd>{study.approach}</dd>
              <dt>Outcome</dt>
              <dd>{study.outcome}</dd>
            </dl>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
