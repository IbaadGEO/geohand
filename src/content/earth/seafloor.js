// Seafloor age from Seton et al. (2020), age.2020.1.GTS2012.6m.nc (CC BY 4.0), averaged to the CRUST1.0 1° cells by scripts/pack_phase2.py.
import { cellIndex } from './crust1.js';

export const SEAFLOOR = { cells: 180 * 360, file: 'data/seafloor-age.bin' };
/** Age in Ma of the ocean floor in the cell at (lat, lon), or null where it is not ocean crust. */
export function ageAt(bytes, lat, lon) {
  const v = bytes[cellIndex(lat, lon)];
  return v === 255 ? null : v;
}
