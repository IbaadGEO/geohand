// npm run updates          -> rewrite the README's Live updates section from the content
// node scripts/updates.mjs --check -> exit 1 if the README is out of date (run by npm test)
import { readFileSync, writeFileSync } from 'node:fs';
import { renderUpdates, applyUpdates } from '../src/content/updates.js';
import { EARTH } from '../src/content/earth/index.js';

const path = new URL('../README.md', import.meta.url);
const readme = readFileSync(path, 'utf8');
const next = applyUpdates(readme, renderUpdates(EARTH));
if (process.argv.includes('--check')) {
  if (next !== readme) {
    console.error('README live updates are out of date: run npm run updates');
    process.exit(1);
  }
  console.log('README live updates: up to date');
} else writeFileSync(path, next);
