// Plain meanings of terms, listed under a part at the Normal level when its text uses them.
export const GLOSSARY = [
  { term: 'PREM', match: /\bPREM\b/, text: 'Preliminary Reference Earth Model: the average wave speeds and density at every depth inside the Earth, worked out from earthquake waves.', refs: ['prem1981'] },
  { term: 'ak135', match: /\bak135\b/, text: 'A later reference model of how fast earthquake waves travel at each depth.', refs: ['ak1351995'] },
  { term: 'Pyrolite', match: /pyrolite/i, text: 'A model rock that stands for what the mantle is made of.', refs: ['mcdonough1995'] },
  { term: 'S waves', match: /\b(S|shear)[- ]?waves?\b|\bshear\b/i, text: 'Earthquake waves that shake rock from side to side. Their speed drops to zero in liquid, so they cannot cross it.', refs: ['prem1981'] },
  { term: 'Seismic', match: /seismic/i, text: 'To do with earthquake waves.', refs: [] },
];

/** The glossary entries a piece of text uses, in glossary order. */
export const termsIn = (text) => GLOSSARY.filter((g) => g.match.test(text));
