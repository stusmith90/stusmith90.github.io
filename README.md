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
  company and the sector it served (for example NHS trusts and police forces),
  not by name. The full CV, sent on request, carries the names.
- **The site is excluded from search engines** via `<meta name="robots">` and
  `public/robots.txt`. It is meant to be reached from a link that was shared
  deliberately, not from a search result. Removing either of those undoes the
  privacy position above.
- **Public role label is "Senior full-stack engineer",** matching the CV
  headline. Per-role titles inside the career log stay factual.
- **No phone number.** The email address is published as the single contact
  route.
- Outcome lines carry no invented metrics. Where a real figure is not known, the
  line states a genuine non-numeric contribution instead.
