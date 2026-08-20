import { useEffect, useState } from "react";

import { sectionLinks, type SectionLink } from "../content";

type NavProps = {
  activeSection: SectionLink["id"];
};

export function Nav({ activeSection }: NavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    window.requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
    });
  };

  return (
    <>
      <nav className="rail" aria-label="Page sections">
        <span className="rail-line" aria-hidden="true">
          <span className="rail-fill" />
        </span>
        <ul className="rail-list">
          {sectionLinks.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`rail-link ${activeSection === section.id ? "is-active" : ""}`}
                aria-current={
                  activeSection === section.id ? "location" : undefined
                }
              >
                <span className="rail-tick" aria-hidden="true" />
                <span className="rail-label">{section.label}</span>
                <span className="rail-layer" aria-hidden="true">
                  {section.layer}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="mobile-nav" aria-label="Page sections">
        <a href="#top" className="mobile-nav-mark">
          SIS
        </a>
        <button
          type="button"
          className={`mobile-nav-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-track"
          aria-label={
            isMobileMenuOpen ? "Close section menu" : "Open section menu"
          }
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span className="mobile-nav-toggle-icon" aria-hidden="true">
            <span className="mobile-nav-toggle-line" />
            <span className="mobile-nav-toggle-line" />
          </span>
          <span className="mobile-nav-toggle-label">Menu</span>
        </button>
        <div
          id="mobile-nav-track"
          className={`mobile-nav-track ${isMobileMenuOpen ? "is-open" : ""}`}
        >
          {sectionLinks.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`mobile-nav-link ${activeSection === section.id ? "is-active" : ""}`}
              aria-current={
                activeSection === section.id ? "location" : undefined
              }
              onClick={closeMobileMenu}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
