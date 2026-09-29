# AGENTS.md — instructions for AI agents working on axiomcivil.com

This file is for any AI agent that edits this repo. Humans: see README.md.

## What this repo is

The public website for **Axiom Civil**, a practice of A4 Strategic Solutions LLC, run by **Choice Sterling, PLS**. It's a static Astro site. Pushes to `main` deploy to production on Netlify automatically, so **nothing reaches `main` without Choice approving a pull request.**

## Hard rules

1. **Never push to `main`.** Work on a branch named `agent/<your-name>/<short-topic>` and open a PR. Choice merges.
2. **One topic per PR.** Keep diffs small and explain *why* in the PR description.
3. **Run `npm run verify` before opening a PR.** It runs the claims check and a full build. Both must pass.
4. **Don't weaken guardrails.** Don't edit `scripts/check-claims.mjs`, `AGENTS.md`, `.github/`, `netlify.toml`, or `src/content.config.ts` unless the task is explicitly about them. If a rule blocks you, say so in the PR. Don't work around it.
5. **Never publish.** Insights posts are always created with `draft: true`. Only Choice changes a post to `draft: false`.
6. **No secrets or private data in the repo.** No API keys, tokens, client files, lead submissions, personal addresses, or internal IPs (including VPN or LAN addresses).
7. **Don't touch the logo files** in `public/brand/` or brand colors unless asked. `brand/tokens.json` is the source of truth.

## Where content lives (edit these, not the layout)

| What | File |
|---|---|
| Company name, contact, legal line, NAICS, UEI/CAGE | `src/data/site.json` |
| Headline stats | `src/data/stats.json` |
| Bio, credentials, software | `src/data/about.json` |
| Process steps | `src/data/pipeline.json` |
| Data-handling section | `src/data/compute.json` |
| Services (one file each) | `src/content/services/*.md` |
| Project experience (one file each) | `src/content/projects/*.md` |
| Insights / blog drafts | `src/content/insights/*.md` (copy `example-draft.md`) |

Schemas in `src/content.config.ts` enforce field names and lengths. If the build fails with a schema error, fix the content. Don't loosen the schema.

Change layout or design (`src/components`, `src/layouts`, `src/styles`) only when the task explicitly asks for it.

## Claims policy (read before writing any copy)

Axiom Civil serves federal and DOD owners. Overstated claims are a legal and reputational risk. The check in `scripts/check-claims.mjs` catches the common ones, but the rules below apply regardless:

- **Project experience belongs to Choice personally**, performed while employed by the contractors named (Kiewit, Skanska, etc.). Never describe NAVFAC, USACE, Caltrans, Sound Transit, DOD, or any agency as Axiom Civil's client, partner, or endorser. Use "experience includes work for…".
- **Data handling:** say "on-premise", "Axiom-owned hardware", "not sent to third-party AI services". Never say air-gapped, zero cloud, or never leaves the facility. If our data-handling practices change, flag it in an issue so the site can be corrected.
- **Compute:** don't claim a cluster, node counts, or model parameter sizes. Describe what the hardware and models do.
- **Certifications:** only list licenses, certifications, and registrations that appear in `src/data/site.json` or `src/data/about.json`. No CMMC, FedRAMP, ITAR, NIST 800-171, SDVOSB/VOSB, 8(a), or similar unless Choice has added them there.
- **Licensure:** Choice is a California PLS. Don't imply licensed land surveying in other states.
- **Numbers:** only use figures already in the data files. Don't invent stats, testimonials, reviews, or client quotes.
- **AI:** AI assists, and a licensed surveyor reviews. Don't claim AI produces final survey deliverables.

## Voice

First person as Choice on the About section and in Insights. Otherwise "we" is fine. Plain, specific, and confident, the way a senior field professional talks. No hype words ("revolutionary", "cutting-edge", "world-class"), no emoji. Audience: owners' reps, prime contractors' project managers and survey leads, and federal contracting staff.

## Common tasks

- **Add a project:** create `src/content/projects/<slug>.md` matching the schema; set `order`. Owner = the agency; contractor = Choice's employer at the time.
- **Draft an insight:** copy `src/content/insights/example-draft.md` to `<slug>.md`, keep `draft: true`, and write 600–1,200 words. Topics must come from Choice's actual experience; ask in the PR if unsure.
- **Update company data** (UEI, CAGE, SAM status): edit `src/data/site.json`. The capability statement at `/capabilities` updates automatically.
- **Leads:** lead data never goes in this repo.

## Commands

```bash
npm ci               # install
npm run dev          # local preview at http://localhost:4321
npm run verify       # claims check + build (required before PR)
```
