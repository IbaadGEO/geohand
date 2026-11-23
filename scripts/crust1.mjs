// Packs CRUST1.0 total crustal thickness (Laske et al. 2013) into public/data/crust1-thickness.bin.
// Input: crsthk.xyz from https://igppweb.ucsd.edu/~gabi/crust1/crsthk.xyz.zip (lon lat km per 1° cell, excl. water).
// Usage: node scripts/crust1.mjs path/to/crsthk.xyz
import fs from 'node:fs';
import { CRUST1, cellIndex } from '../src/content/earth/crust1.js';

const src = process.argv[2];
if (!src) throw new Error('usage: node scripts/crust1.mjs path/to/crsthk.xyz');
const out = new Uint8Array(CRUST1.cells);
const seen = new Uint8Array(CRUST1.cells);
for (const line of fs.readFileSync(src, 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const [lon, lat, km] = line.trim().split(/\s+/).map(Number);
  if (![lon, lat, km].every(Number.isFinite) || km < 0 || km > 255 / CRUST1.scale) throw new Error(`bad row: ${line}`);
  const i = cellIndex(lat, lon);
  out[i] = Math.round(km * CRUST1.scale);
  seen[i] = 1;
}
if (seen.includes(0)) throw new Error('some 1° cells are missing from the input');
fs.mkdirSync('public/data', { recursive: true });
fs.writeFileSync('public/data/crust1-thickness.bin', out);
console.log(`wrote ${out.length} cells`);
