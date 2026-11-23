import { caseStudies } from "../content";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section className="section section-work" id="work">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Work where a mistake has legal or safeguarding consequences.</h2>
        <p className="section-lede">
          Four problems from recent work, and what made each one hard.
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
