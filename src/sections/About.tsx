import { animated, to } from "@react-spring/web";

import { aboutParagraphs, heroAnchors } from "../content";
import { useInteractiveSurface } from "../hooks/useInteractiveSurface";
import { Reveal } from "./Reveal";

type AboutProps = {
  prefersReducedMotion: boolean;
};

export function About({ prefersReducedMotion }: AboutProps) {
  const { surfaceSpring, interactiveProps } =
    useInteractiveSurface(prefersReducedMotion);

  return (
    <section className="section section-about" id="about">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">About</p>
        <h2>I would rather own the awkward parts than hand-wave them away.</h2>
      </Reveal>

      <div className="about-layout">
        <Reveal as="div" className="about-prose">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal as="div" className="about-aside" delay={120}>
          <animated.div
            className="seam-card"
            {...interactiveProps}
            style={{
              transform: prefersReducedMotion
                ? "none"
                : to(
                    [
                      surfaceSpring.rotateX,
                      surfaceSpring.rotateY,
                      surfaceSpring.x,
                      surfaceSpring.y,
                    ],
                    (rotateX, rotateY, x, y) =>
                      `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${x}px, ${y}px, 0)`,
                  ),
            }}
          >
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
          </animated.div>
        </Reveal>
      </div>
    </section>
  );
}
