# stusmith90.github.io

A standalone React portfolio for Stuart Ingersoll-Smith, deployed to GitHub
Pages from this repository.

## Local development

1. `pnpm install`
2. `pnpm dev`
3. Open the local URL printed by Vite.

## Build

- `pnpm build`
- `pnpm preview`

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages.

## Content boundaries

These are deliberate constraints, not omissions. Read them before adding copy.

- **No employment dates anywhere.** Roles are not tied to years or to a
  duration, so the work cannot be lined up against a public work history.
- **No employer or client names anywhere.** Work is described by the kind of
  company it was, and by the layers of the stack that were owned. The intent is
  that a former colleague cannot identify the company from the description, so
  keep new detail generic enough to hold that line.
- **The site is excluded from search engines** via `<meta name="robots">` and
  `public/robots.txt`. It is meant to be reached from a link that was shared
  deliberately, not from a search result. Removing either of those undoes the
  privacy position above.
- **Public role label is "Software engineer".** Deliberately plainer than the
  seniority on the CV. Per-role titles inside the work section stay factual.
- **No phone number.** The email address is published as the single contact
  route.
- Outcome lines carry no invented metrics. Where a real figure is not known, the
  line states a genuine non-numeric contribution instead; `TODO(outcome)`
  comments in `src/content.ts` mark the entries still waiting for a number.
