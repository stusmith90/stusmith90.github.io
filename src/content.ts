export type StackLayer = "interface" | "service" | "shipping";

export type HeroAnchor = {
  layer: StackLayer;
  word: string;
  note: string;
};

export type ExperienceLayer = {
  index: string;
  layer: StackLayer;
  kicker: string;
  detail: string;
  stack: string[];
};

export type SectionLink = {
  id: "trace" | "work" | "layers" | "log" | "about" | "contact";
  label: string;
  layer: StackLayer;
};

/**
 * The point experience is counted from. Every "N years" in the copy is derived
 * from this single constant, so the prose never needs editing and the figures
 * can never disagree with each other. Move this date to change the count.
 */
const careerStart = { year: 2016, month: 2 };

const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

export function experienceYears(now = new Date()) {
  const months =
    (now.getFullYear() - careerStart.year) * 12 +
    (now.getMonth() + 1 - careerStart.month);

  return Math.max(1, Math.floor(months / 12));
}

/** Spelled out where it reads as prose; falls back to digits past the word list. */
export function experienceYearsWord(now = new Date()) {
  const years = experienceYears(now);

  return numberWords[years] ?? String(years);
}

export const yearsWord = experienceYearsWord();
export const yearsWordCapitalised =
  yearsWord.charAt(0).toUpperCase() + yearsWord.slice(1);

export const contactEmail = "itstuartsmith@gmail.com";
export const githubUrl = "https://github.com/stusmith90";
export const siteUrl = "https://stusmith90.github.io/";

/** Opens a pre-addressed email asking for the full CV, which carries the names and dates this site leaves out. */
export const cvRequestHref = `mailto:${contactEmail}?subject=${encodeURIComponent("CV request")}`;

/**
 * The three anchors drive both the hero display type and the depth rail, so the
 * order here is the order the reader travels down the page.
 */
export const heroAnchors: HeroAnchor[] = [
  {
    layer: "interface",
    word: "interface",
    note: "screens and forms people rely on",
  },
  { layer: "service", word: "service", note: "APIs, data and the rules" },
  { layer: "shipping", word: "shipping", note: "tests, CI and releases" },
];

/** Page order; nav labels match each section's eyebrow. */
export const sectionLinks: SectionLink[] = [
  { id: "work", label: "Work", layer: "interface" },
  { id: "trace", label: "Trace", layer: "interface" },
  { id: "layers", label: "Experience", layer: "service" },
  { id: "log", label: "Career", layer: "service" },
  { id: "about", label: "About", layer: "shipping" },
  { id: "contact", label: "Contact", layer: "shipping" },
];

/**
 * Experience is organised by layer rather than by employer. Sectors may be named;
 * employers, clients and dates may not — see the content boundaries in the README.
 */
export const experienceLayers: ExperienceLayer[] = [
  {
    index: "01",
    layer: "interface",
    kicker: "Interfaces people depend on",
    detail:
      "React and TypeScript front ends: long legal forms used by clinicians and police officers, booking flows on a high-traffic ticketing site and touchscreen apps, plus React Native on mobile. Accessibility is tested with the keyboard, a screen reader and automated checks rather than assumed.",
    stack: ["React", "TypeScript", "React Native", "Vite", "Storybook"],
  },
  {
    index: "02",
    layer: "service",
    kicker: "Services, data and rules",
    detail:
      "Node and PHP services, REST APIs, and PostgreSQL schema design and migrations. Server-side authorisation, audit logs of who changed what and when, and data models that hold a domain's legal and financial rules rather than only validating fields.",
    stack: ["Node.js", "PostgreSQL", "Express", "REST APIs", "PHP"],
  },
  {
    index: "03",
    layer: "shipping",
    kicker: "Testing and delivery",
    detail:
      "End-to-end tests that act as more than one organisation, visual regression testing, CI on GitHub Actions and releases to AWS. My first role was fixing live problems on a busy booking site, and I still build with the person on call in mind.",
    stack: ["Playwright", "Vitest", "GitHub Actions", "AWS", "Docker"],
  },
];

export const aboutParagraphs = [
  "I have spent ten years across healthcare, agency work for financial services and consumer brands, and high-traffic e-commerce. Most recently I have built healthcare software used by NHS trusts and UK police forces.",
  "The work I enjoy most is where a mistake is expensive: money billed to the wrong organisation, the wrong person seeing a record, a legal document that does not hold up. So I care whether the data model matches the domain, whether each rule lives in one place with a test on it, and whether a release is safe to ship on any day of the week.",
  "I use AI coding tools every day, with the same review and tests as any other change.",
];

export const stackRibbon = [
  "typescript",
  "react",
  "node.js",
  "postgresql",
  "aws",
  "react native",
  "playwright",
  "docker",
  "rest apis",
  "github actions",
  "php",
];

/**
 * One user action traced through the three layers. Each story describes how
 * that kind of request is handled in systems built so far.
 */
export type TraceAction = {
  id: string;
  label: string;
  stories: Record<StackLayer, string>;
};

export const traceActions: TraceAction[] = [
  {
    id: "pay-claim",
    label: "Pay a claim",
    stories: {
      interface:
        "The price and payment reference are worked out by the server rather than typed in, so they cannot be entered wrong.",
      service:
        "The server decides which organisation pays from their own policies, stores that decision on the claim, and falls back safely when a detail is missing, so a valid claim is never blocked.",
      shipping:
        "The finance export follows the finance team's own template column for column, because a wrong column is a wrong payment.",
    },
  },
  {
    id: "hand-over",
    label: "Hand a case to another organisation",
    stories: {
      interface:
        "The hand-over screen spells out the consequence before anyone confirms it: who becomes responsible, and who can see the record afterwards.",
      service:
        "Responsibility and visibility move together in one step, and the hand-over is written to the audit log, because the question afterwards is always who knew what, and when.",
      shipping:
        "End-to-end tests walk the hand-over as both organisations, so a change on one side cannot quietly break the other.",
    },
  },
  {
    id: "grant-access",
    label: "Give someone access",
    stories: {
      interface:
        "What a person can do is shown as a clear state rather than a missing button, so nobody has to guess why an action is unavailable.",
      service:
        "Every check runs on the server against one access model, and access ends when the relationship that granted it ends.",
      shipping:
        "Each access rule has a test named after it, so widening access is always a reviewed decision rather than a side effect.",
    },
  },
];

export type CaseStudy = {
  layer: StackLayer;
  title: string;
  /** Where the work happened, in one line: the industry is evidence, not the headline. */
  context: string;
  problem: string;
  hardPart: string;
  approach: string;
  outcome: string;
};

/** Outcomes state real contributions, never invented metrics. */
export const caseStudies: CaseStudy[] = [
  {
    layer: "service",
    title: "Routing payments between organisations",
    context: "Doctors' assessment fees, billed to councils and NHS boards.",
    problem:
      "Each claim has to be billed to the right organisation, and when the person assessed lives outside the area that arranged the work, the payer can change.",
    hardPart:
      "Each organisation sets its own policy, some details are sometimes unknown, and a failed lookup must never stop someone being paid.",
    approach:
      "Designed the rules that decide who pays, stored that decision on each claim so pricing and references follow from it, added a fallback for lookups that fail, and built an export in the finance team's own format.",
    outcome:
      "Claims are billed to the right organisation automatically, and each organisation's policy is managed from an admin screen rather than by hand.",
  },
  {
    layer: "service",
    title: "Access that follows a relationship",
    context:
      "Children's records shared across councils, regional groups and a national department.",
    problem:
      "Who may see a record depends on a relationship that changes over time, and the wrong person seeing it is a serious failure rather than a bug.",
    hardPart:
      "Access flows through networks of organisations and has to disappear the moment the relationship that granted it ends.",
    approach:
      "Designed the access model, agreed each decision with the team in writing, and enforced it on the server with a test for each rule. Administrators are warned before removing someone who is still responsible for a record.",
    outcome:
      "Every access rule traces back to a written decision the whole team agreed.",
  },
  {
    layer: "service",
    title: "One product, each client's own rules",
    context: "A new app used by three UK police forces.",
    problem:
      "Each client works to its own legal forms and processes, but they all need the same product, kept up to date together.",
    hardPart:
      "Supporting every client's differences without copying the product for each one, so a change made once reaches everyone.",
    approach:
      "One of the first engineers: designed the original data model and built the core workflow. Later replaced the separate per-client copies of a legal assessment with one shared version, with tests that fail if any client's form loses a section.",
    outcome:
      "In use by three clients, including one client's national rollout.",
  },
  {
    layer: "shipping",
    title: "AI agents under the same review",
    context: "A production codebase in a regulated industry.",
    problem:
      "Coding agents write plausible code quickly, and where mistakes have legal consequences, plausible is not enough.",
    hardPart:
      "Getting agent-written changes to follow the codebase's own conventions, without slowing the team down.",
    approach:
      "Wrote rules that teach agents the codebase's conventions, and kept every agent change behind the same review and tests as anyone else's.",
    outcome: "Agents used on production work, held to the same standard.",
  },
];

export type ReleaseEntry = {
  version: string;
  role: string;
  companyType: string;
  notes: string[];
};

/**
 * The career written as a changelog, newest first. Versions mark changes of
 * scope rather than dates, which the content boundaries keep off the site.
 */
export const releaseLog: ReleaseEntry[] = [
  {
    version: "v4",
    role: "Software engineer",
    companyType: "Healthcare technology",
    notes: [
      "Healthcare software for NHS trusts and UK police forces: payments between organisations, access control and legal records. See Selected work.",
    ],
  },
  {
    version: "v3",
    role: "Full stack engineer",
    companyType: "Brand and digital agency",
    notes: [
      "A sales tool for a payments company, an accessible website for an investment platform, and campaign microsites.",
    ],
  },
  {
    version: "v2",
    role: "Full stack developer",
    companyType: "Healthcare agency",
    notes: [
      "Touchscreen apps and a multisite CMS platform for pharmaceutical brands.",
    ],
  },
  {
    version: "v1.1",
    role: "Software developer",
    companyType: "Online ticket retailer",
    notes: ["Features, APIs and search for a high-traffic booking site."],
  },
  {
    version: "v1.0",
    role: "Support developer",
    companyType: "Online ticket retailer",
    notes: [
      "Fixed live problems on the booking site for colleagues who needed them fixed now.",
    ],
  },
];
