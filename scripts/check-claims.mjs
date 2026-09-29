#!/usr/bin/env node
// Claims linter. Fails the build if site content contains claims Axiom Civil
// can't back up. Runs in CI on every PR and via `npm run check:claims`.
// To change a rule, edit RULES below in a PR that Choice reviews — agents must not
// weaken or delete rules to get their own PR to pass (see AGENTS.md).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SCAN = ['src', 'public/llms.txt', 'brand/email-signature.html'];
const EXT = new Set(['.md', '.mdx', '.json', '.astro', '.txt', '.html']);

const site = JSON.parse(readFileSync(join(ROOT, 'src/data/site.json'), 'utf8'));
const heldCerts = (site.federal?.socioeconomic ?? []).join(' ');

const RULES = [
  { re: /air[\s-]?gap/i, why: 'Not accurate for our setup. Say "on-premise" instead.' },
  { re: /zero[\s-]+(third[\s-]party\s+)?cloud/i, why: 'Absolute cloud claims are not accurate (site hosting, email, forms use cloud services).' },
  { re: /never\s+leaves?\s+(the\s+)?(facility|building|premises)/i, why: 'Absolute data-location claim. Use the wording in src/data/compute.json.' },
  { re: /partners?\s*(&|&amp;|and)\s*clients/i, why: 'Agencies were clients of former employers, not Axiom Civil. Use "experience includes work for".' },
  { re: /\b(our|axiom('s)?)\s+clients\s+(include|such as)/i, why: 'Implies agencies are Axiom Civil clients.' },
  { re: /trusted\s+by/i, why: 'Implied endorsement.' },
  { re: /\$\s?8\s?B/i, why: 'Unsupported portfolio figure. Use $4.55B (directed) only.' },
  { re: /\b(70|400)\s?B(?![a-z])[^.]{0,40}param/i, why: 'Model-size marketing claims go stale; describe what the models do.' },
  { re: /multi[\s-]?node\s+(gpu\s+)?cluster/i, why: 'Currently one compute node. Say "on-premise GPU workstations".' },
  { re: /\bguarantee[sd]?\b/i, why: 'No guarantees in marketing copy.' },
  { re: /\b(CMMC|FedRAMP|ITAR|NIST\s?800-171|SOC\s?2)\b[^.]{0,30}(certified|compliant|registered|authorized|level)/i, why: 'Compliance claims require documented certification. Add to site.json first, with Choice.' },
  { re: /\b(certified\s+)?(SDVOSB|VOSB|8\(a\)|HUBZone|WOSB|DBE)\s+(certified|firm|business)/i, why: 'Socioeconomic certification not held.', unless: (m) => heldCerts.includes(m[2]) },
  { re: /S-?Corp/i, why: 'Tax status does not belong on marketing materials.' },
  { re: /Digicsi|Varitisation|cempute|local-thst/i, why: 'Known typo from AI-generated collateral.' },
];

function walk(p, out = []) {
  const full = join(ROOT, p);
  let st;
  try { st = statSync(full); } catch { return out; }
  if (st.isDirectory()) for (const f of readdirSync(full)) walk(join(p, f), out);
  else if (EXT.has(extname(full))) out.push(full);
  return out;
}

const problems = [];
for (const file of SCAN.flatMap((p) => walk(p))) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      const m = line.match(rule.re);
      if (m && !(rule.unless && rule.unless(m))) {
        problems.push(`${relative(ROOT, file)}:${i + 1}  "${m[0]}"  → ${rule.why}`);
      }
    }
  });
}

if (problems.length) {
  console.error(`\n✗ Claims check failed (${problems.length}):\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('\nSee "Claims policy" in AGENTS.md.\n');
  process.exit(1);
}
console.log('✓ Claims check passed');
