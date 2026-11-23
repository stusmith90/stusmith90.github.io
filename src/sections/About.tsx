import { aboutParagraphs, heroAnchors } from "../content";
import { useInteractiveSurface } from "../hooks/useInteractiveSurface";
import { Reveal } from "./Reveal";

type AboutProps = {
  prefersReducedMotion: boolean;
};

export function About({ prefersReducedMotion }: AboutProps) {
  const interactiveProps = useInteractiveSurface(prefersReducedMotion);

  return (
    <section className="section section-about" id="about">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">About</p>
        <h2>I would rather own the awkward parts than hand-wave them away.</h2>
      </Reveal>

      <div className="about-layout">
        <Reveal as="div" className="about-prose">
          {aboutParagraphs.map((paragraph, index) => (
            // The paragraphs are a fixed list that is never reordered, so the position is a stable key.
            <p key={index}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal as="div" className="about-aside" delay={120}>
          <div className="seam-card" {...interactiveProps}>
            <p className="seam-card-kicker">One product, three layers</p>
            {heroAnchors.map((anchor, index) => (
              <div className="seam-card-layer" key={anchor.layer}>
                <span className="seam-card-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="seam-card-word">{anchor.word}</span>
                <span className="seam-card-note">{anchor.note}</span>
              </div>
            ))}
            <p className="seam-card-foot">
              Break any one of them and the other two get the blame.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
