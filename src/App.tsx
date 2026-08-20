import { stackRibbon } from "./content";
import { useAmbientPointer } from "./hooks/useAmbientPointer";
import { usePageProgress } from "./hooks/usePageProgress";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Nav } from "./sections/Nav";
import { Experience } from "./sections/Experience";

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeSection = usePageProgress();

  useAmbientPointer(prefersReducedMotion);

  const ribbonItems = [...stackRibbon, ...stackRibbon];

  return (
    <div className="page-shell">
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="backdrop-glow" aria-hidden="true" />

      <a className="skip-link" href="#work">
        Skip to work
      </a>

      <Nav activeSection={activeSection} />

      <div className="page-body">
        <Hero prefersReducedMotion={prefersReducedMotion} />

        <div className="ribbon" aria-label="Technologies">
          <div className="ribbon-track">
            {ribbonItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <main>
          <Experience />
          <About prefersReducedMotion={prefersReducedMotion} />
        </main>

        <Contact />
      </div>
    </div>
  );
}

export default App;
