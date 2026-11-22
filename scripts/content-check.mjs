// Checks all content against the reference list. Exit 1 on errors. --release also fails on unchecked references.
import { checkContent } from '../src/content/check.js';
import { EARTH } from '../src/content/earth/index.js';
import { REFS } from '../src/content/references.js';

const { errors, warnings } = checkContent(EARTH, REFS, { release: process.argv.includes('--release') });
for (const w of warnings) console.warn('warning:', w);
for (const e of errors) console.error('error:', e);
console.log(`content: ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
