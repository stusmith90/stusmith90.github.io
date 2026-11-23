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
  "Most recently I have built Mental Health Act software for NHS trusts and police forces, and access control for a children's safeguarding product. Before that, agency work for well-known brands and a high-traffic ticketing site.",
  "In that kind of work a mistake is a legal or safeguarding problem, not just a bug. So I care whether the data model matches the domain, whether each rule lives in one place with a test on it, and whether a release is safe to ship on any day of the week.",
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
    id: "submit-form",
    label: "Sign a Mental Health Act form",
    stories: {
      interface:
        "A long form validated field by field against a schema the server shares, so the browser and the API can never disagree about what complete means.",
      service:
        "The server checks the rules the law sets — who may sign, in what order, within which time limit — and records every change in an audit log.",
      shipping:
        "The form becomes a PDF that must match the official wording, so its layout is compared against approved copies before any release.",
    },
  },
  {
    id: "hand-over",
    label: "Hand a patient over to NHS staff",
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
    label: "Give someone access to a child's record",
    stories: {
      interface:
        "What a person can do is shown as a clear state rather than a missing button, so nobody has to guess why an action is unavailable.",
      service:
        "Every check runs on the server against one access model. Access ends when the duty of care that granted it ends.",
      shipping:
        "Each access rule has a test named after it, so widening access is always a reviewed decision rather than a side effect.",
    },
  },
];

export type CaseStudy = {
  layer: StackLayer;
  title: string;
  problem: string;
  hardPart: string;
  approach: string;
  outcome: string;
};

/** Outcomes state real contributions, never invented metrics. */
export const caseStudies: CaseStudy[] = [
  {
    layer: "service",
    title: "A police app, from its first months",
    problem:
      "Police officers needed to record mental health detentions and hand people over to NHS staff, inside a platform built for NHS trusts.",
    hardPart:
      "An incident moves between organisations, and each force has its own legal forms. The product had to support every force without being copied for each one.",
    approach:
      "Designed the original data model and built the detention and hand-over steps. Later replaced the separate per-force copies of a capacity assessment with one shared version, with tests that fail if a force's form loses a section.",
    outcome:
      "In use by three UK police forces, including one force's national rollout.",
  },
  {
    layer: "service",
    title: "Who pays a doctor's fee",
    problem:
      "Doctors who carry out Mental Health Act assessments bill a council or an NHS board. When the patient lives outside the area that arranged the assessment, the payer can change.",
    hardPart:
      "Boards set different policies, the patient's home area is sometimes unknown, and a failed lookup must never stop a doctor being paid.",
    approach:
      "Designed the rules that decide who pays, stored that decision on each claim so pricing and references follow from it, added a fallback for lookups that fail, and built an export in the finance team's own format.",
    outcome:
      "Claims are billed to the right body automatically, and each board's policy is managed from an admin screen rather than by hand.",
  },
  {
    layer: "service",
    title: "Access to children's records",
    problem:
      "A children's safeguarding product, where the wrong person seeing a record is a safeguarding failure rather than a bug.",
    hardPart:
      "Access flows through networks of organisations — councils, regional groups, the Department for Education — and has to disappear the moment a duty of care ends.",
    approach:
      "Designed the access model, agreed each decision with the team in writing, and enforced it on the server with a test for each rule. Administrators are warned before removing someone still responsible for a child.",
    outcome:
      "Every access rule traces back to a written decision the whole team agreed.",
  },
  {
    layer: "shipping",
    title: "AI agents under the same review",
    problem:
      "Coding agents write plausible code quickly. In a codebase with legal consequences, plausible is not enough.",
    hardPart:
      "Getting agent-written changes to follow the codebase's own conventions, without slowing the team down.",
    approach:
      "Wrote rules that teach agents the codebase's conventions, and kept every agent change behind the same review and tests as anyone else's.",
    outcome: "Agents used daily on production work, held to the same standard.",
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
      "Mental Health Act software for NHS trusts and police forces, and access control for children's safeguarding. See Selected work.",
    ],
  },
  {
    version: "v3",
    role: "Full stack engineer",
    companyType: "Brand and digital agency",
    notes: [
      "A sales tool for a payments company, an accessible investment website and campaign microsites.",
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
