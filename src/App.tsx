import {
  animated,
  config,
  to,
  useScroll,
  useSpring,
  useTrail,
} from "@react-spring/web";
import {
  useEffect,
  useMemo,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Snapshot = {
  title: string;
  text: string;
};

type Detail = {
  label: string;
  value: string;
};

type VisualCard = {
  kicker: string;
  title: string;
  note: string;
  tone: "apricot" | "mint" | "sky";
};

type SectionLink = {
  id: "overview" | "about" | "work" | "elsewhere";
  label: string;
};

const profileSnapshots: Detail[] = [
  {
    label: "Current shape",
    value:
      "Full-stack engineer working across React, Node, PHP, AWS, and delivery workflows.",
  },
  {
    label: "What I optimise for",
    value:
      "Readable systems, solid defaults, and interfaces that do not fall apart under real use.",
  },
  {
    label: "How I work",
    value:
      "From browser to API to infrastructure, I would rather own the awkward bits than hand-wave them away.",
  },
];

const stackRibbon = [
  "react",
  "typescript",
  "node",
  "php",
  "aws",
  "docker",
  "apis",
  "postgres",
  "ci/cd",
];

const heroWorkbenchCards: VisualCard[] = [
  {
    kicker: "Frontend",
    title: "Responsive interfaces",
    note: "Designing responsive layouts and frontend interactions that stay clear across devices.",
    tone: "apricot",
  },
  {
    kicker: "Backend",
    title: "APIs and logic",
    note: "Sorting the backend work properly so the frontend is not stuck working around it.",
    tone: "mint",
  },
  {
    kicker: "Delivery",
    title: "Deployments and environments",
    note: "Managing releases and environments so software can be shipped reliably.",
    tone: "sky",
  },
];

const storyWorkbenchNotes = [
  "interfaces should feel calm",
  "backend choices always surface somewhere",
  "shipping is part of the feature",
];

const workLayers: Snapshot[] = [
  {
    title: "Browser",
    text: "I care about interaction design, but not as decoration. The frontend should help people move through a system without second-guessing every click.",
  },
  {
    title: "Service layer",
    text: "I am comfortable shaping APIs, backend logic, and data flow so the UI is not compensating for weak decisions underneath it.",
  },
  {
    title: "Shipping",
    text: "Deployments, environments, containers, cloud infrastructure, and the unglamorous work needed to get features out without chaos are part of the job.",
  },
];

const engineeringNotes: Snapshot[] = [
  {
    title: "Regulated software changed how I build",
    text: "Working in healthcare made me much less interested in flashy product language and much more interested in clarity, reliability, and how systems behave when people are under pressure.",
  },
  {
    title: "Agency work sharpened delivery instincts",
    text: "Fast-moving client work taught me how to get up to speed quickly, work well with designers and stakeholders, and still leave a codebase in a better state than I found it.",
  },
  {
    title: "I prefer full-stack ownership to handoffs",
    text: "The parts of the stack are connected. A rough deployment story will surface in the product. A weak API will leak into the UI. I like working across those seams.",
  },
];

const sectionLinks: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "elsewhere", label: "Elsewhere" },
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

function useInteractiveSurface(prefersReducedMotion: boolean) {
  const [surfaceSpring, surfaceApi] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    x: 0,
    y: 0,
    scale: 1,
    glow: 0,
    config: {
      tension: 210,
      friction: 24,
    },
  }));

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    surfaceApi.start({
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1,
      glow: 0,
      immediate: true,
    });
  }, [prefersReducedMotion, surfaceApi]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

    surfaceApi.start({
      rotateX: yRatio * -8,
      rotateY: xRatio * 10,
      x: xRatio * 16,
      y: yRatio * 12,
      scale: 1.012,
      glow: 1,
      immediate: false,
    });
  };

  const resetSurface = () => {
    surfaceApi.start({
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1,
      glow: 0,
      immediate: false,
    });
  };

  return {
    surfaceSpring,
    interactiveProps: prefersReducedMotion
      ? {}
      : {
          onPointerMove: handlePointerMove,
          onPointerLeave: resetSurface,
        },
  };
}

function App() {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [activeSection, setActiveSection] =
    useState<SectionLink["id"]>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ribbonItems = useMemo(() => [...stackRibbon, ...stackRibbon], []);
  const { scrollYProgress } = useScroll();
  const {
    surfaceSpring: heroWorkbenchSpring,
    interactiveProps: heroWorkbenchProps,
  } = useInteractiveSurface(prefersReducedMotion);
  const {
    surfaceSpring: storyWorkbenchSpring,
    interactiveProps: storyWorkbenchProps,
  } = useInteractiveSurface(prefersReducedMotion);

  const [backdropSpring, backdropApi] = useSpring(() => ({
    x: 0,
    y: 0,
    glowX: 58,
    glowY: 20,
    config: {
      tension: 110,
      friction: 28,
    },
  }));

  useEffect(() => {
    const handleScroll = () => {
      const nextDepth = Math.min(window.scrollY / 1200, 1);
      setScrollDepth(nextDepth);
      document.documentElement.style.setProperty(
        "--scroll-depth",
        nextDepth.toFixed(3),
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      backdropApi.start({
        x: 0,
        y: 0,
        glowX: 58,
        glowY: 20,
        immediate: true,
      });
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      const xRatio = event.clientX / window.innerWidth - 0.5;
      const yRatio = event.clientY / window.innerHeight - 0.5;

      backdropApi.start({
        x: xRatio * 44,
        y: yRatio * 32,
        glowX: 50 + xRatio * 32,
        glowY: 28 + yRatio * 24,
        immediate: false,
      });
    };

    const resetBackdrop = () => {
      backdropApi.start({
        x: 0,
        y: 0,
        glowX: 58,
        glowY: 20,
        immediate: false,
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", resetBackdrop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetBackdrop);
    };
  }, [backdropApi, prefersReducedMotion]);

  const heroSpring = useSpring({
    from: { opacity: 0, y: prefersReducedMotion ? 0 : 44 },
    to: { opacity: 1, y: 0 },
    config: config.gentle,
    immediate: prefersReducedMotion,
  });

  const heroPanelSpring = useSpring({
    from: { opacity: 0, y: prefersReducedMotion ? 0 : 64 },
    to: { opacity: 1, y: 0 },
    delay: prefersReducedMotion ? 0 : 120,
    config: config.slow,
    immediate: prefersReducedMotion,
  });

  const summaryTrail = useTrail(profileSnapshots.length, {
    from: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    to: { opacity: 1, y: 0 },
    config: config.stiff,
    immediate: prefersReducedMotion,
  });

  useEffect(() => {
    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.34;
      let nextActiveSection: SectionLink["id"] = "overview";

      for (const section of sectionLinks) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top - threshold <= 0) {
          nextActiveSection = section.id;
        }
      }

      setActiveSection((currentSection) =>
        currentSection === nextActiveSection
          ? currentSection
          : nextActiveSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
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

  const handleSectionLinkClick = () => {
    window.requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
    });
  };

  return (
    <div className="page-shell">
      <nav className="page-nav" aria-label="Page sections">
        <button
          type="button"
          className={`page-nav-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="page-nav-track"
          aria-label={
            isMobileMenuOpen ? "Close section menu" : "Open section menu"
          }
          onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
        >
          <span className="page-nav-toggle-icon" aria-hidden="true">
            <span className="page-nav-toggle-line" />
            <span className="page-nav-toggle-line" />
            <span className="page-nav-toggle-line" />
          </span>
          <span className="page-nav-toggle-label">Menu</span>
        </button>
        <div
          id="page-nav-track"
          className={`page-nav-track ${isMobileMenuOpen ? "is-open" : ""}`}
        >
          {sectionLinks.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`page-nav-link ${activeSection === section.id ? "is-active" : ""}`}
              aria-current={
                activeSection === section.id ? "location" : undefined
              }
              onClick={handleSectionLinkClick}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <animated.div
        className="interactive-glow"
        aria-hidden="true"
        style={{
          background: prefersReducedMotion
            ? undefined
            : to(
                [backdropSpring.glowX, backdropSpring.glowY],
                (glowX, glowY) =>
                  `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(98, 216, 208, 0.2), transparent 24%), radial-gradient(circle at ${100 - glowX * 0.52}% ${74 - glowY * 0.18}%, rgba(243, 143, 79, 0.16), transparent 26%)`,
              ),
        }}
      />
      <animated.div
        className="interactive-grid"
        aria-hidden="true"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : to(
                [backdropSpring.x, backdropSpring.y],
                (x, y) =>
                  `translate3d(${x * -0.2}px, ${scrollDepth * -42 + y * -0.12}px, 0)`,
              ),
        }}
      />
      <animated.div
        className="ambient ambient-left"
        aria-hidden="true"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : to(
                [backdropSpring.x, backdropSpring.y],
                (x, y) =>
                  `translate3d(${x * -0.5}px, ${scrollDepth * -82 + y * -0.28}px, 0)`,
              ),
        }}
      />
      <animated.div
        className="ambient ambient-right"
        aria-hidden="true"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : to(
                [backdropSpring.x, backdropSpring.y],
                (x, y) =>
                  `translate3d(${x * 0.42}px, ${scrollDepth * -58 + y * 0.24}px, 0)`,
              ),
        }}
      />

      <header className="hero">
        <animated.div
          className="hero-copy"
          style={{
            opacity: heroSpring.opacity,
            transform: heroSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
          }}
        >
          <p className="eyebrow">Software Engineer</p>
          <h1>
            I build the interface, the service behind it, and the way it ships.
          </h1>
          <p className="hero-summary">
            I am a full-stack engineer with eight-plus years across healthcare,
            e-commerce, agency, and product teams. Most of what I build sits
            between React interfaces, backend services, cloud infrastructure,
            and the practical decisions that keep software stable after launch.
          </p>

          <p className="hero-summary hero-summary-secondary">
            What keeps me interested is getting the joins right: browser, API,
            data, infrastructure, and release flow all moving together once real
            users, traffic, and edge cases show up.
          </p>

          <div className="hero-actions">
            <a href="#work" className="button button-primary">
              Scroll through the stack
            </a>
            <a
              href="https://github.com/stusmith90"
              className="button button-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </animated.div>

        <animated.aside
          className="hero-panel"
          style={{
            opacity: heroPanelSpring.opacity,
            transform: heroPanelSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
          }}
        >
          <animated.div
            className="hero-workbench"
            aria-label="Project workbench collage"
            {...heroWorkbenchProps}
            style={{
              transform: prefersReducedMotion
                ? "none"
                : to(
                    [
                      heroWorkbenchSpring.rotateX,
                      heroWorkbenchSpring.rotateY,
                      heroWorkbenchSpring.x,
                      heroWorkbenchSpring.y,
                      heroWorkbenchSpring.scale,
                    ],
                    (rotateX, rotateY, x, y, scale) =>
                      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  ),
            }}
          >
            <animated.div
              className="workbench-orbit"
              aria-hidden="true"
              style={{
                transform: prefersReducedMotion
                  ? "none"
                  : to(
                      [heroWorkbenchSpring.x, heroWorkbenchSpring.y],
                      (x, y) =>
                        `translate3d(${x * -0.45}px, ${y * -0.45}px, 0)`,
                    ),
              }}
            >
              <span>react</span>
              <span>node</span>
              <span>aws</span>
            </animated.div>
            {heroWorkbenchCards.map((card, index) => (
              <animated.article
                key={card.title}
                className={`workbench-card workbench-card-${card.tone}`}
                style={{
                  transform: prefersReducedMotion
                    ? "none"
                    : to(
                        [heroWorkbenchSpring.x, heroWorkbenchSpring.y],
                        (x, y) => {
                          const xShift = x * (index - 1) * 0.55;
                          const yShift = y * (0.45 + index * 0.08);
                          const rotation = (index - 1) * 1.2 + x * 0.04;

                          return `translate3d(${xShift}px, ${yShift}px, ${index * 10}px) rotate(${rotation}deg)`;
                        },
                      ),
                }}
              >
                <p>{card.kicker}</p>
                <h3>{card.title}</h3>
                <span>{card.note}</span>
              </animated.article>
            ))}
          </animated.div>
          <p className="panel-kicker">Current shape of work</p>
          <ul>
            <li>Built software across healthcare and e-commerce journeys</li>
            <li>
              Worked across React, Node, PHP, and AWS in production systems
            </li>
            <li>
              Contributed to architecture, mentoring, and delivery practices
            </li>
          </ul>
        </animated.aside>
      </header>

      <section className="signal-strip" aria-label="Technology ribbon">
        <animated.div
          className="signal-track"
          style={{
            transform: prefersReducedMotion
              ? "translate3d(0, 0, 0)"
              : scrollYProgress.to(
                  (value) => `translate3d(${-value * 22}%, 0, 0)`,
                ),
          }}
        >
          {ribbonItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </animated.div>
      </section>

      <main>
        <section
          className="summary-grid"
          aria-label="Profile overview"
          id="overview"
        >
          {summaryTrail.map((style, index) => {
            const snapshot = profileSnapshots[index];

            return (
              <animated.article
                key={snapshot.label}
                className="summary-card"
                style={{
                  opacity: style.opacity,
                  transform: style.y.to((y) => `translate3d(0, ${y}px, 0)`),
                }}
              >
                <p className="summary-label">{snapshot.label}</p>
                <p className="summary-value">{snapshot.value}</p>
              </animated.article>
            );
          })}
        </section>

        <section className="section section-story" id="about">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>
              Full-stack work means dealing with the awkward parts, not only the
              visible ones.
            </h2>
          </div>

          <div className="story-layout">
            <p>
              I have spent the last several years building secure products in
              healthcare and digital teams, working across frontend, backend,
              cloud, and delivery. That tends to change how you think. You stop
              chasing neat slogans and start caring more about whether the whole
              system makes sense.
            </p>
            <p>
              I like good-looking interfaces, but I do not think the frontend
              gets to act alone. A weak API leaks into the UI. A shaky deploy
              process shows up in delivery speed. A messy data model creates
              product friction. That is the part of engineering I enjoy most.
            </p>

            <div className="stack-list" aria-label="Technical stack areas">
              <span>React and TypeScript</span>
              <span>Node.js and PHP</span>
              <span>AWS and Docker</span>
              <span>APIs and delivery pipelines</span>
            </div>

            <animated.div
              className="story-workbench"
              aria-label="Engineering workbench notes"
              {...storyWorkbenchProps}
              style={{
                transform: prefersReducedMotion
                  ? "none"
                  : to(
                      [
                        storyWorkbenchSpring.rotateX,
                        storyWorkbenchSpring.rotateY,
                        storyWorkbenchSpring.x,
                        storyWorkbenchSpring.y,
                        storyWorkbenchSpring.scale,
                      ],
                      (rotateX, rotateY, x, y, scale) =>
                        `perspective(1200px) rotateX(${rotateX * 0.75}deg) rotateY(${rotateY * 0.75}deg) translate3d(${x * 0.7}px, ${y * 0.7}px, 0) scale(${scale})`,
                    ),
              }}
            >
              <animated.div
                className="story-ticket"
                style={{
                  transform: prefersReducedMotion
                    ? "none"
                    : to(
                        [storyWorkbenchSpring.x, storyWorkbenchSpring.y],
                        (x, y) =>
                          `translate3d(${x * 0.28}px, ${y * 0.32}px, 0) rotate(${x * 0.05}deg)`,
                      ),
                }}
              >
                <p>Week-to-week reality</p>
                <strong>
                  Untangle the joins, keep the tone human, leave the path
                  clearer than it was.
                </strong>
              </animated.div>
              <animated.div
                className="story-notes"
                style={{
                  transform: prefersReducedMotion
                    ? "none"
                    : to(
                        [storyWorkbenchSpring.x, storyWorkbenchSpring.y],
                        (x, y) =>
                          `translate3d(${x * -0.16}px, ${y * -0.22}px, 0)`,
                      ),
                }}
              >
                {storyWorkbenchNotes.map((note) => (
                  <span key={note}>{note}</span>
                ))}
              </animated.div>
            </animated.div>
          </div>
        </section>

        <section className="section stack-section" id="work">
          <div className="stack-copy">
            <p className="eyebrow">What I actually do</p>
            <h2>
              From browser to API to infrastructure, I like work that joins up.
            </h2>
            <p>
              A lot of my day-to-day work is moving between layers: shaping a UI
              flow, sorting backend behaviour, debugging an integration issue,
              then fixing the delivery path that made the whole thing harder to
              release than it should have been.
            </p>
            <p>
              That is why I call myself full-stack first. Frontend is part of
              the picture, but the interesting bit is how the entire product
              behaves when the pieces meet.
            </p>
          </div>

          <div className="stack-stage">
            {workLayers.map((layer, index) => {
              const offset = index * 48;
              const depth = 0.06 + index * 0.1;
              const rotation = (index - 1) * 2.8;

              return (
                <animated.article
                  key={layer.title}
                  className={`stack-card stack-card-${index + 1}`}
                  style={{
                    transform: prefersReducedMotion
                      ? `translate3d(0, ${offset}px, 0) rotate(${rotation}deg)`
                      : scrollYProgress.to(
                          (value) =>
                            `translate3d(0, ${offset - value * 180 * depth}px, 0) rotate(${rotation + value * (index - 1.2)}deg)`,
                        ),
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{layer.title}</h3>
                  <p>{layer.text}</p>
                </animated.article>
              );
            })}
          </div>
        </section>

        <section className="section section-notes">
          <div className="section-heading">
            <p className="eyebrow">Notes from the work</p>
            <h2>A few things that have shaped how I build software now.</h2>
          </div>

          <div className="notes-grid">
            {engineeringNotes.map((note, index) => (
              <animated.article
                key={note.title}
                className="note-card"
                style={{
                  transform: prefersReducedMotion
                    ? "translate3d(0, 0, 0)"
                    : scrollYProgress.to(
                        (value) =>
                          `translate3d(0, ${Math.max(0, 36 - value * 120) * (index + 0.2) * 0.18}px, 0)`,
                      ),
                }}
              >
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </animated.article>
            ))}
          </div>
        </section>

        <section className="section section-strengths">
          <div className="section-heading">
            <p className="eyebrow">Technical strengths</p>
            <h2>
              Comfortable zooming in on implementation and back out to delivery.
            </h2>
          </div>

          <div className="strengths-layout">
            <article>
              <h3>Interfaces</h3>
              <p>
                React, TypeScript, component architecture, interaction design,
                and the small implementation details that stop a UI feeling
                flimsy.
              </p>
            </article>
            <article>
              <h3>Services and infrastructure</h3>
              <p>
                Node.js, PHP, API design, AWS services, containerised workflows,
                and shipping paths that are maintainable after the first demo.
              </p>
            </article>
            <article>
              <h3>Team contribution</h3>
              <p>
                Code review, mentoring, architecture input, and improving the
                working environment with better defaults and clearer technical
                judgement.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer" id="elsewhere">
        <div>
          <p className="eyebrow">Elsewhere</p>
          <h2>The public version of the work lives on GitHub.</h2>
        </div>
        <a
          href="https://github.com/stusmith90"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/stusmith90
        </a>
      </footer>
    </div>
  );
}

export default App;
