import { useEffect, useState } from "react";

import { sectionLinks, type SectionLink } from "../content";

/**
 * One scroll subscription for the whole page. Scroll depth is published as a CSS
 * custom property rather than React state so parallax does not re-render the
 * tree on every frame; only the active section, which changes rarely, is state.
 */
export function usePageProgress() {
  const [activeSection, setActiveSection] = useState<SectionLink["id"]>(
    sectionLinks[0].id,
  );

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const scrollable = document.body.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        Math.min(Math.max(progress, 0), 1).toFixed(4),
      );
      document.documentElement.style.setProperty(
        "--scroll-depth",
        Math.min(window.scrollY / 1200, 1).toFixed(4),
      );

      const threshold = window.innerHeight * 0.34;
      let nextActiveSection = sectionLinks[0].id;

      for (const section of sectionLinks) {
        const element = document.getElementById(section.id);

        if (element && element.getBoundingClientRect().top - threshold <= 0) {
          nextActiveSection = section.id;
        }
      }

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
    };

    const scheduleMeasure = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  return activeSection;
}
