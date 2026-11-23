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
const careerStart = { year: 2017, month: 8 };

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
    note: "the part people touch",
  },
  { layer: "service", word: "service", note: "the part that decides" },
  { layer: "shipping", word: "shipping", note: "the part that ships it" },
];

export const sectionLinks: SectionLink[] = [
  { id: "trace", label: "Trace", layer: "interface" },
  { id: "work", label: "Work", layer: "interface" },
  { id: "layers", label: "Layers", layer: "service" },
  { id: "log", label: "Log", layer: "service" },
  { id: "about", label: "About", layer: "shipping" },
  { id: "contact", label: "Contact", layer: "shipping" },
];

/**
 * Experience is organised by layer rather than by employer: it is the axis the
 * rest of the site argues for, and it keeps names and dates off the page. See
 * the content boundaries section of the README before adding anything that
 * would identify a company.
 */
export const companyTypes = [
  "Healthcare technology",
  "Digital creative agency",
  "Advertising and brand agency",
  "Online travel retailer",
];

export const experienceLayers: ExperienceLayer[] = [
  {
    index: "01",
    layer: "interface",
    kicker: "Interfaces under real use",
    detail:
      "React and TypeScript front ends: clinical forms that stay legible under pressure, checkout flows on a high-volume storefront, and public installations where nobody gets a tutorial first, plus some React Native on the mobile side. Component architecture, interaction detail, and the responsiveness and accessibility work that stops an interface feeling flimsy under real use.",
    stack: ["React", "TypeScript", "React Native", "JavaScript", "CSS"],
  },
  {
    index: "02",
    layer: "service",
    kicker: "Services and data",
    detail:
      "Node and PHP services, REST API design, and data models that encode a domain's rules rather than only validating fields. Search behaviour under load, third-party integrations that fail in awkward ways, and custom modules extending large content platforms.",
    stack: ["Node", "PHP", "Symfony", "PostgreSQL", "REST APIs"],
  },
  {
    index: "03",
    layer: "shipping",
    kicker: "Infrastructure and delivery",
    detail:
      "Cloud infrastructure, containers and CI/CD pipelines — including release paths safe enough for a live clinical system, and pipelines built around launch dates that could not move. Environment configuration, web servers, search infrastructure, and the unglamorous work that makes delivery predictable.",
    stack: ["AWS", "Docker", "CI/CD", "Nginx", "Linux"],
  },
];

export const aboutParagraphs = [
  `I have spent ${yearsWord} years building software that has to work — most recently in regulated healthcare, before that in high-traffic commerce and agency delivery. The common thread is that mistakes carried a cost. A clinical form filled in wrong is a legal problem. A slow checkout is lost revenue by the afternoon.`,
  "That changes what you optimise for. I care less about which framework won this year and more about whether the whole system makes sense: whether the data model matches the domain, whether the release path is safe enough to use on a Friday, whether the next engineer can read it.",
  "A weak API leaks into the interface. A shaky deploy shows up as delivery speed. The joins are where the interesting problems tend to be.",
  "Alongside the building, a fair amount of what I do is code review, mentoring and architectural input: the parts of the job that outlast whatever I personally wrote.",
];

export const stackRibbon = [
  "react",
  "react native",
  "typescript",
  "node",
  "php",
  "aws",
  "docker",
  "postgres",
  "apis",
  "ci/cd",
  "linux",
];

/**
 * One user action traced through the three layers. Each story describes how
 * that kind of request is handled in systems built so far, kept generic enough
 * that the product and the company cannot be identified.
 */
export type TraceAction = {
  id: string;
  label: string;
  stories: Record<StackLayer, string>;
};

export const traceActions: TraceAction[] = [
  {
    id: "submit-form",
    label: "Submit a statutory form",
    stories: {
      interface:
        "A long form validated field by field against a schema the server shares, so the browser and the API can never disagree about what complete means.",
      service:
        "The submission is checked against the rules the law sets — who may sign, in what order, within which time limit — and every change lands in an audit trail.",
      shipping:
        "The output is a PDF that has to match the official wording, so its layout is checked against approved snapshots before any release goes out.",
    },
  },
  {
    id: "hand-over",
    label: "Hand a case to another organisation",
    stories: {
      interface:
        "Accept and transfer steps that spell out the consequence before anyone commits: who will be responsible, and who will be able to see the record afterwards.",
      service:
        "Responsibility and visibility move together, and the hand-over is written to the audit log, because in a regulated setting the question is always who knew what, and when.",
      shipping:
        "End-to-end tests walk the hand-over as both organisations, so a change to one side cannot quietly break the other.",
    },
  },
  {
    id: "grant-access",
    label: "Grant someone access",
    stories: {
      interface:
        "What a person can do is shown as a clear state rather than a missing button, so nobody has to guess why an action is unavailable.",
      service:
        "Every check runs on the server against one access-control model, written down as decision records before it was written as code.",
      shipping:
        "Each rule is pinned by a test that names it, so widening access is always a reviewed, deliberate change rather than a side effect.",
    },
  },
];

export type CaseStudy = {
  layer: StackLayer;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
};

/**
 * Anonymised on purpose: see the content boundaries in the README. Outcomes
 * state real contributions, never invented metrics.
 */
export const caseStudies: CaseStudy[] = [
  {
    layer: "interface",
    title: "Forms that hold up legally",
    problem:
      "Paper statutory forms, where a missing signature or a wrong date makes the whole document invalid.",
    approach:
      "Built more than a dozen of them end to end: schema, validation, an interface that stays legible under pressure, and PDF output that matches the official wording.",
    outcome:
      "Forms completed digitally across many organisations, with the rules enforced by the software rather than by whoever happens to check.",
  },
  {
    layer: "service",
    title: "A new product from its first months",
    problem:
      "A public service needed its own workflow, built alongside an established product rather than bolted onto it.",
    approach:
      "One of two core engineers from the start: the data model, the triage and hand-over flows, and sharing records safely with partner organisations.",
    outcome:
      "A product in daily use by several large organisations, sharing one codebase and one design system with the rest of the platform.",
  },
  {
    layer: "service",
    title: "Access control you can explain",
    problem:
      "A product holding sensitive records about children, where getting permissions wrong is a safeguarding failure, not a bug.",
    approach:
      "Designed the access-control and membership model as a series of written decision records, then implemented it on the server with tests that name each rule.",
    outcome:
      "A permission model the whole team can reason about, with every decision and its trade-offs on record.",
  },
  {
    layer: "shipping",
    title: "AI agents with guardrails",
    problem:
      "Coding agents write plausible code quickly, and plausible is the dangerous kind in a regulated codebase.",
    approach:
      "Helped shape a team practice: rules and skills that encode the codebase's conventions, and review and quality gates every agent change has to pass.",
    outcome:
      "Agents used daily for real work, with the same standards applied to their output as to anyone else's.",
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
      "Regulated software for public services: statutory forms, audit trails, PDFs that must match the law.",
      "A new product built from its first months, and access control for a safeguarding product.",
      "Code review and mentoring at scale; AI-assisted engineering with guardrails.",
    ],
  },
  {
    version: "v3",
    role: "Full stack engineer",
    companyType: "Brand and digital agency",
    notes: [
      "Sales tools, microsites and an accessible financial website for well-known brands.",
      "React, Node, PHP and AWS, working directly with designers.",
    ],
  },
  {
    version: "v2",
    role: "Full stack developer",
    companyType: "Healthcare advertising agency",
    notes: [
      "Touchscreen apps and multisite CMS platforms with custom modules.",
      "First people to mentor.",
    ],
  },
  {
    version: "v1.1",
    role: "Software developer",
    companyType: "Online travel retailer",
    notes: [
      "APIs, search and the servers they ran on, for a high-traffic storefront.",
    ],
  },
  {
    version: "v1.0",
    role: "Support developer",
    companyType: "Online travel retailer",
    notes: [
      "Learned production by fixing it: live booking issues, reported by colleagues who needed them fixed now.",
    ],
  },
];
