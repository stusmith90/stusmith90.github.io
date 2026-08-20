import { animated, config, useSpring, useTrail } from "@react-spring/web";

import { heroAnchors, yearsWordCapitalised } from "../content";

type HeroProps = {
  prefersReducedMotion: boolean;
};

export function Hero({ prefersReducedMotion }: HeroProps) {
  const introSpring = useSpring({
    from: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    to: { opacity: 1, y: 0 },
    config: config.gentle,
    immediate: prefersReducedMotion,
  });

  const anchorTrail = useTrail(heroAnchors.length, {
    from: { opacity: 0, y: prefersReducedMotion ? 0 : 46 },
    to: { opacity: 1, y: 0 },
    delay: prefersReducedMotion ? 0 : 140,
    config: { tension: 190, friction: 26 },
    immediate: prefersReducedMotion,
  });

  const outroSpring = useSpring({
    from: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    to: { opacity: 1, y: 0 },
    delay: prefersReducedMotion ? 0 : 520,
    config: config.gentle,
    immediate: prefersReducedMotion,
  });

  return (
    <header className="hero" id="top">
      <animated.div
        className="hero-intro"
        style={{
          opacity: introSpring.opacity,
          transform: introSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
        }}
      >
        <p className="hero-name">
          <span className="hero-dot" aria-hidden="true" />
          Stuart Ingersoll-Smith
        </p>
        <p className="hero-role">Software engineer</p>
      </animated.div>

      <div className="hero-anchors">
        <span className="hero-seam" aria-hidden="true" />
        {anchorTrail.map((style, index) => {
          const anchor = heroAnchors[index];

          return (
            <animated.p
              key={anchor.layer}
              className="hero-anchor"
              style={{
                opacity: style.opacity,
                transform: style.y.to((y) => `translate3d(0, ${y}px, 0)`),
              }}
            >
              <span className="hero-anchor-tick" aria-hidden="true" />
              <span className="hero-anchor-word">{anchor.word}</span>
              <span className="hero-anchor-note">{anchor.note}</span>
            </animated.p>
          );
        })}
      </div>

      <animated.div
        className="hero-outro"
        style={{
          opacity: outroSpring.opacity,
          transform: outroSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
        }}
      >
        <p className="hero-lede">
          {yearsWordCapitalised} years building software where the failure modes
          are real — regulated healthcare, high-traffic commerce, agency
          delivery. I work across all three layers, because the seams between
          them are where things actually break.
        </p>

        <div className="hero-actions">
          <a href="#work" className="button button-primary">
            See the work
          </a>
          <a href="#contact" className="button button-quiet">
            Get in touch
          </a>
        </div>

        <p className="hero-meta">
          UK based
          <span aria-hidden="true">·</span>
          React, TypeScript, Node, PHP, AWS
          <span aria-hidden="true">·</span>
          MSc Software Engineering
        </p>
      </animated.div>
    </header>
  );
}
