// CRUST1.0 total crustal thickness on a 1° grid (Laske, Masters, Ma & Pasyanos 2013), excluding water.
// Packed by scripts/crust1.mjs: one byte per cell, km × scale, rows from 89.5°N southwards, columns from 179.5°W eastwards.
export const CRUST1 = { cells: 180 * 360, scale: 3, file: 'data/crust1-thickness.bin' };

/** Index of the 1° cell holding latitude/longitude in degrees. */
export function cellIndex(lat, lon) {
  const row = Math.min(179, Math.max(0, Math.floor(90 - lat)));
  const col = ((Math.floor(lon + 180) % 360) + 360) % 360;
  return row * 360 + col;
}

/** Crustal thickness in km at latitude/longitude, from the packed bytes. */
export const thicknessAt = (bytes, lat, lon) => bytes[cellIndex(lat, lon)] / CRUST1.scale;
