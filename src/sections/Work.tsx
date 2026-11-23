import { caseStudies } from "../content";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section className="section section-work" id="work">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Problems where getting the details wrong is expensive.</h2>
        <p className="section-lede">
          Four from recent work: the problem first, then where it happened and
          what made it hard.
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
            <p className="work-context">{study.context}</p>
            <dl className="work-detail">
              <dt>Problem</dt>
              <dd>{study.problem}</dd>
              <dt>What was hard</dt>
              <dd>{study.hardPart}</dd>
              <dt>What I did</dt>
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
