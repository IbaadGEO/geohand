// First mission: how can an earthquake show that part of Earth is liquid? Every claim restates PREM, Table I, p. 308,
// which the app already cites for the outer core and the earthquake view.
const WHERE = 'PREM, Table I, p. 308';

export const MISSION = {
  title: 'Mission: how can an earthquake show that part of Earth is liquid?',
  target: 'cmb', // the boundary the learner finds (a part at every level)
  below: 'outer-core', // the layer it reveals
  steps: {
    predict: {
      text: 'An earthquake sends out several kinds of wave. This mission follows the two that travel through Earth’s interior, called body waves: P waves and shear (S) waves. S waves cannot travel through liquid. Which layer do you think stops them?',
      options: [['crust', 'The crust'], ['mantle', 'The mantle'], ['outer-core', 'The outer core'], ['inner-core', 'The inner core']],
    },
    open: {
      hands: 'Open the Earth to look inside: open both hands, then pull them apart.',
      mouse: 'Open the Earth to look inside: press Pull it apart, or the space bar.',
    },
    find: {
      hands: 'Find the boundary between rock and metal, the core–mantle boundary. Point at it and hold.',
      mouse: 'Find the boundary between rock and metal, the core–mantle boundary. Click it.',
      found: 'Found it: the core–mantle boundary, 2,891 km down. Below it is the outer core, now pulled aside.',
      shown: 'Here it is: the core–mantle boundary, 2,891 km down. Below it is the outer core, now pulled aside.',
    },
    evidence: {
      text: 'Now the evidence: waves from an earthquake at the top, calculated here from PREM, a reference model fitted to earthquake recordings (Dziewonski & Anderson 1981, Abstract, p. 297). Many paths curve back up through the mantle. Follow the ones that reach the core: the amber P waves cross the outer core, bending as they slow down, while the blue direct S waves stop at its top.',
    },
    explain: {
      q: 'What does that tell us about the outer core?',
      options: ['It is liquid: S waves cannot pass through it', 'It is hotter than the mantle', 'It is denser than the mantle'],
      answer: 0,
      explain: 'It is liquid. PREM gives the outer core an S-wave speed of 0, so direct S waves cannot cross it, while P waves can. Density does jump at this boundary, from 5.57 to 9.90 g/cm^3^, but that is not what stops S waves.',
      where: WHERE,
      refs: ['prem1981'],
    },
  },
};

/** The steps in order; each waits for the learner. */
export const MISSION_STEPS = ['predict', 'open', 'find', 'evidence', 'explain', 'done'];

/** Feedback on the learner's prediction once they have seen the evidence. */
export function predictionNote(predicted, names) {
  if (predicted === MISSION.below) return 'You predicted the outer core: right.';
  return `You predicted ${names[predicted] ? names[predicted].toLowerCase() : 'another layer'}; the evidence points to the outer core.`;
}
