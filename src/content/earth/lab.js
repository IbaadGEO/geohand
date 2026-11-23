// Depth of the lithosphere–asthenosphere boundary under oceans, by plate age.
// Receiver-function depths from Fischer et al. (2010, p. 565): 25 Ma 55 km, 49 Ma 76 km (Philippine Sea Plate), 129 Ma 82 km (Pacific).
// Joined straight between those ages and clamped outside them: no depth is drawn for an age the paper does not give.
const POINTS = [[25, 55], [49, 76], [129, 82]];
export const LAB_AGES = [POINTS[0][0], POINTS[POINTS.length - 1][0]];
export const LAB_CRATON_KM = 200; // depleted mantle under old continents reaches roughly 200 km (Fischer et al. 2010, p. 553)

export function labDepth(ageMa) {
  if (ageMa <= POINTS[0][0]) return POINTS[0][1];
  for (let i = 1; i < POINTS.length; i++) {
    const [a0, d0] = POINTS[i - 1], [a1, d1] = POINTS[i];
    if (ageMa <= a1) return d0 + ((ageMa - a0) / (a1 - a0)) * (d1 - d0);
  }
  return POINTS[POINTS.length - 1][1];
}
