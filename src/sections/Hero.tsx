import { openCommandPalette } from "../components/CommandPalette";
import { cvRequestHref, heroAnchors, yearsWordCapitalised } from "../content";

/**
 * The entrance is staggered with CSS (`hero-enter` and its delay variable) so it
 * works from the pre-rendered HTML and is removed wholesale by the
 * reduced-motion media query.
 */
export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero-intro hero-enter">
        <h1 className="hero-name" id="hero-name">
          <span className="hero-dot" aria-hidden="true" />
          Stuart Ingersoll-Smith
        </h1>
        <p className="hero-role">Software engineer</p>
      </div>

      <div className="hero-anchors">
        <span className="hero-seam" aria-hidden="true" />
        {heroAnchors.map((anchor, index) => (
          <p
            key={anchor.layer}
            className="hero-anchor hero-enter"
            style={{ ["--enter-delay" as string]: `${140 + index * 90}ms` }}
          >
            <span className="hero-anchor-tick" aria-hidden="true" />
            <span className="hero-anchor-word">{anchor.word}</span>
            <span className="hero-anchor-note">{anchor.note}</span>
          </p>
        ))}
      </div>

      <div
        className="hero-outro hero-enter"
        style={{ ["--enter-delay" as string]: "520ms" }}
      >
        <p className="hero-lede">
          {yearsWordCapitalised} years building software where getting it wrong
          has real consequences — regulated healthcare, high-traffic commerce,
          agency delivery. I work across all three layers, because the seams
          between them are where things break.
        </p>

        <div className="hero-actions">
          <a href="#trace" className="button button-primary">
            Trace a request
          </a>
          <a href={cvRequestHref} className="button button-quiet">
            Request the CV
          </a>
          <button
            type="button"
            className="button button-quiet button-kbd"
            onClick={openCommandPalette}
            aria-keyshortcuts="Meta+K Control+K"
          >
            Skip to the essentials <kbd>⌘K</kbd>
          </button>
        </div>

        <p className="hero-meta">
          UK based
          <span aria-hidden="true">·</span>
          React, TypeScript, Node, PHP, AWS
          <span aria-hidden="true">·</span>
          MSc Software Engineering
        </p>
      </div>
    </section>
  );
}
