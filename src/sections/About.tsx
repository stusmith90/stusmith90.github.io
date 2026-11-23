import { aboutParagraphs } from "../content";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section className="section section-about" id="about">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">About</p>
        <h2>What I care about.</h2>
      </Reveal>

      <Reveal as="div" className="about-prose">
        {aboutParagraphs.map((paragraph, index) => (
          // The paragraphs are a fixed list that is never reordered, so the position is a stable key.
          <p key={index}>{paragraph}</p>
        ))}
      </Reveal>
    </section>
  );
}
