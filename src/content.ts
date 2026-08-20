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
  id: "work" | "about" | "contact";
  label: string;
  layer: StackLayer;
};

/**
 * The point experience is counted from. Every "N years" in the copy is derived
 * from this single constant, so the prose never needs editing and the figures
 * can never disagree with each other. Move this date to change the count.
 */
const careerStart = { year: 2018, month: 8 };

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
  { id: "work", label: "Work", layer: "interface" },
  { id: "about", label: "About", layer: "service" },
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
