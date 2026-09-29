# One-time setup

## 1. Push this folder to GitHub

Using **GitHub Desktop** (simplest on Windows):

1. File → **Add local repository** → choose the `axiomcivil-site` folder. If it says "not a git repository", click **create a repository** there and keep the folder name.
2. Commit everything with the message `Initial Astro rebuild`.
3. Repository → Repository settings → Remote → set the URL to `https://github.com/choice-cmd/Axiomcivil-site.git`.
4. Click **Publish / Push origin**.

Or from a terminal inside the folder:

```bash
git init -b main
git add -A
git commit -m "Initial Astro rebuild"
git remote add origin https://github.com/choice-cmd/Axiomcivil-site.git
git push -u origin main
```

## 2. Protect `main` (the main guardrail for agents)

GitHub → repo → **Settings → Branches → Add branch ruleset** (or classic rule) for `main`:

- Require a pull request before merging, with **1 approval**, and **Require review from Code Owners**.
- Require status checks to pass: select **verify** (it appears after the first PR runs).
- Block force pushes and deletions.
- Don't add agent accounts to the bypass list.

Give agents their own GitHub identity (a machine user or fine-grained token) with **Contents: read/write** and **Pull requests: read/write** on this repo only. Never give them admin.

## 3. Connect Netlify (replaces drag-and-drop)

1. Netlify → your existing axiomcivil.com site → **Site configuration → Build & deploy → Link repository** → GitHub → `choice-cmd/Axiomcivil-site`.
2. Build settings are read from `netlify.toml` (build command `npm run verify`, publish directory `dist`).
3. Turn on **Deploy Previews** for pull requests. Every agent PR then gets a preview link you can check on your phone before merging.
4. After the first deploy: **Forms → enable form detection** if prompted, then set up email notifications.

## 4. Before going live

- [ ] Fill in UEI / CAGE in `src/data/site.json` once SAM.gov registration is done.
- [ ] Confirm every project value, role, and employer attribution in `src/content/projects/`.
- [ ] Confirm your title (currently "Founder & Principal") and the AGC CM-BIM credential name.
- [ ] Check your current and future employers' outside-business policies before the site goes public.
- [ ] Replace the Gmail signature with `brand/email-signature.html`.
