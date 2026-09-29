# axiomcivil.com

Website for **Axiom Civil**, a practice of A4 Strategic Solutions LLC. It's a static [Astro](https://astro.build) site deployed on Netlify from this repo.

- **Agents:** read [`AGENTS.md`](AGENTS.md) first.
- **Content** is in `src/data/*.json` and `src/content/**.md`. The layout in `src/components` rarely needs to change.
- **Brand:** `brand/tokens.json` (colors, type, logo rules) and `public/brand/*.svg` (vector logos).
- **Capability statement:** `/capabilities`. Open it and click *Print / Save as PDF*.

## Run locally

```bash
npm ci
npm run dev        # http://localhost:4321
npm run verify     # claims check + production build
```

## Structure

```
AGENTS.md                  rules for AI agents (claims policy, workflow)
brand/                     tokens.json, email-signature.html
docs/                      setup
public/brand/              logo SVGs (+ PNG for email)
scripts/check-claims.mjs   blocks unsupported marketing claims
scripts/pull-leads.mjs     pulls form submissions to a private machine
scripts/make-images.py     regenerates favicons + social image from the SVGs
src/content/               services, projects, insights (Markdown, schema-validated)
src/data/                  site info, stats, bio, process, data handling (JSON)
src/components/            page sections
src/pages/                 routes: /, /capabilities, /insights, /privacy, /thanks, 404
```

## One-time setup

See [`docs/setup.md`](docs/setup.md): push to GitHub, protect `main`, and connect Netlify.
