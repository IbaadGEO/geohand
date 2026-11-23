// "Not sure which level?": three questions, each harder than the last. Every answer restates content the app
// already cites (PREM for the first two, the inner-core rotation question for the third).
export const PLACEMENT = [
  {
    q: 'Which layer of the Earth is liquid?',
    options: ['The crust', 'The mantle', 'The outer core', 'The inner core'],
    answer: 2,
    knew: 'which layer is liquid',
    explain: 'The outer core. Earthquake shear waves cannot travel through it, which shows it is liquid.',
    where: 'PREM, Table I, p. 308',
    refs: ['prem1981'],
  },
  {
    q: 'About how deep is the boundary between the mantle and the core?',
    options: ['About 100 km', 'About 2,900 km', 'About 6,400 km'],
    answer: 1,
    knew: 'how deep the core starts',
    explain: 'About 2,900 km: PREM puts it at 2,891 km. 6,371 km is the distance to the centre.',
    where: 'PREM, Table I, p. 308',
    refs: ['prem1981'],
  },
  {
    q: 'Does the inner core turn at exactly the same rate as the rest of the Earth?',
    options: ['Yes, always', 'No: its rate compared with the mantle seems to change over time, and this is still debated', 'It does not turn at all'],
    answer: 1,
    knew: 'that inner-core rotation is still debated',
    explain: 'Song & Richards (1996) estimated it turned about 1° a year faster than the mantle. Yang & Song (2023) inferred that this nearly stopped around 2009.',
    where: 'Song & Richards 1996, p. 221; Yang & Song 2023, pp. 182, 184–185',
    refs: ['song1996', 'yang2023'],
  },
];

/** The level to suggest for a number of right answers: 0–1 Normal, 2 Intermediate, 3 Advanced. */
export const suggestLevel = (right) => (right >= 3 ? 'postgrad' : right === 2 ? 'undergrad' : 'alevel');
