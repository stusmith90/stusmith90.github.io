import { CommandPalette } from "./components/CommandPalette";
import { stackRibbon } from "./content";
import { useAmbientPointer } from "./hooks/useAmbientPointer";
import { usePageProgress } from "./hooks/usePageProgress";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Nav } from "./sections/Nav";
import { Timeline } from "./sections/Timeline";
import { TraceRequest } from "./sections/TraceRequest";
import { Work } from "./sections/Work";

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeSection = usePageProgress();

  useAmbientPointer(prefersReducedMotion);

  return (
    <div className="page-shell">
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="backdrop-glow" aria-hidden="true" />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav activeSection={activeSection} />

      <main className="page-body" id="main" tabIndex={-1}>
        <Hero />

        <div className="ribbon">
          {/* The track is drawn twice so the scroll-linked drift never shows an
              empty edge; only the first copy is exposed to assistive technology. */}
          <div className="ribbon-track">
            <ul aria-label="Technologies">
              {stackRibbon.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul aria-hidden="true">
              {stackRibbon.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <Work />
        <TraceRequest prefersReducedMotion={prefersReducedMotion} />
        <Experience />
        <Timeline />
        <About />
        <Contact />
      </main>

      <CommandPalette />
    </div>
  );
}

export default App;
