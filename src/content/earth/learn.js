// Learning loops: a check before the layer is shown, then tests after it. Every correct answer and explanation
// restates the part's cited content (alevel.js), with the same page locators. Wrong options are labelled wrong.
const item = (q, options, answer, explain, where, ...refs) => ({ q, options, answer, explain, where, refs });

export const LOOPS = {
  alevel: {
    crust: {
      see: 'compare', // the oceanic/continental Moho comparison (ui/crustActivity.js)
      check: item(
        'Before you look: where do you think the crust is thicker?',
        ['Under the oceans', 'Under the continents', 'About the same everywhere'],
        1,
        'Under the continents. Normal oceanic igneous crust is about 7 km thick; continental crust averages about 40 km.',
        'White et al. (1992), p. 19,683; Mooney et al. (1998), Plate 1, p. 733', 'white1992', 'mooney1998',
      ),
      tests: [
        item(
          'How is new ocean crust made?',
          ['Mantle rock rises at a mid-ocean ridge and partly melts as the pressure on it drops', 'Continental crust sinks and melts into ocean crust', 'Lava from volcanoes on land flows out over the sea floor'],
          0,
          'At mid-ocean ridges, mantle rock rises and partly melts as the pressure on it drops. The melt builds igneous crust about 7 km thick.',
          'White et al. (1992), pp. 19,683–19,684', 'white1992',
        ),
        item(
          'Is the crust the same thing as a tectonic plate?',
          ['Yes: a plate is a piece of the crust', 'No: a plate is the crust plus the top of the mantle'],
          1,
          'No. A plate is a piece of the lithosphere: the crust plus the top of the mantle.',
          'Garnero et al. (2016), p. 481', 'garnero2016',
        ),
        item(
          'Which is denser?',
          ['The crust', 'The mantle rock just below the crust', 'They are about the same'],
          1,
          'The mantle rock below, at about 3.4 g/cm^3^, against 2.6–2.9 g/cm^3^ for the crust.',
          'PREM, Table I, p. 308', 'prem1981',
        ),
      ],
    },
    lithosphere: {
      see: { view: 'behaviour', look: 'In this view the crust and the top of the mantle share one colour (blue): they move together as one plate.' },
      check: item(
        'Before you look: where is new lithosphere made?',
        ['At mid-ocean ridges', 'At subduction zones', 'In the core'],
        0,
        'At mid-ocean ridges, where plates move apart and melted mantle rock forms new crust.',
        'Garnero et al. (2016), p. 481; White et al. (1992), pp. 19,683–19,684', 'garnero2016', 'white1992',
      ),
      tests: [
        item(
          'What happens to old lithosphere?',
          ['It sinks into the mantle at subduction zones', 'It melts at mid-ocean ridges', 'It stays at the surface for ever'],
          0,
          'It sinks back into the mantle at subduction zones. Around the Pacific, most imaged slabs stall above 660 km or are trapped at 660–1,000 km.',
          'Garnero et al. (2016), p. 481; Fukao & Obayashi (2013), p. 5920', 'garnero2016', 'fukao2013',
        ),
        item(
          'Where does this model put the base of the lithosphere?',
          ['At the Moho, the base of the crust', 'At 80 km, the base of PREM’s seismic lid', 'At 660 km'],
          1,
          'At 80 km, the base of PREM’s seismic lid, used as a stand-in. The lithosphere carries on below the Moho.',
          'PREM, pp. 300, 308', 'prem1981',
        ),
        item(
          'What changes in PREM at 80 km, the base of the lid?',
          ['Shear waves are damped much more: Q~μ~ drops from 600 to 80', 'The rock turns liquid', 'The density doubles'],
          0,
          'The damping of shear waves changes sharply: the shear quality factor Q~μ~ drops from 600 to 80. Shear waves still pass, so the rock is still solid.',
          'PREM, Table I, p. 308', 'prem1981',
        ),
      ],
    },
    asthenosphere: {
      see: { view: 'behaviour', look: 'The orange band under the plates is the asthenosphere: the same mantle rock as the blue plate above, but it behaves differently.' },
      check: item(
        'Before you look: is the asthenosphere liquid?',
        ['Yes, it is molten rock', 'No, it is solid'],
        1,
        'No. PREM gives it a shear-wave speed above zero, and shear waves cannot travel through a liquid.',
        'PREM, Table I, p. 308', 'prem1981',
      ),
      tests: [
        item(
          'Why is it called the low-velocity zone?',
          ['Shear waves travel a little more slowly there than in the lid above', 'The plates move slowly over it', 'Rock moves through it slowly'],
          0,
          'In PREM the effective isotropic shear-wave speed keeps falling below the lid: from about 4.47 km/s at 80 km to about 4.42 km/s just above 220 km.',
          'PREM, Table I and footnote, p. 308', 'prem1981',
        ),
        item(
          'How deep is it in this model?',
          ['0–35 km', '80–220 km', '660–2,890 km'],
          1,
          'This model draws it at 80–220 km, the depth of PREM’s low-velocity zone.',
          'PREM, Table I, p. 308', 'prem1981',
        ),
        item(
          'Where does the melt for new ocean crust come from?',
          ['Mantle rock rising beneath mid-ocean ridges, partly melting as the pressure drops', 'The liquid outer core', 'Melted continental crust'],
          0,
          'From mantle rock rising beneath mid-ocean ridges. As it rises the pressure drops and part of it melts.',
          'White et al. (1992), pp. 19,683–19,684', 'white1992',
        ),
      ],
    },
    mantle: {
      see: { view: 'layers', look: 'Watch the cut face: blue slabs of old plate sink, and pale plumes of hot rock rise from near the core. Where they sit is illustrative, and speeds are not to scale.' },
      check: item(
        'Before you look: is the mantle solid or liquid?',
        ['Mostly liquid rock (magma)', 'Solid rock that flows very slowly'],
        1,
        'Solid: shear waves pass through it. Over geological time it convects, heated by the core below and by radioactive decay.',
        'PREM, Table I, p. 308; Garnero et al. (2016), p. 481', 'prem1981', 'garnero2016',
      ),
      tests: [
        item(
          'What happens to most plates that sink into the mantle?',
          ['They sink straight to the core', 'They stall above 660 km or are trapped at 660–1,000 km', 'They melt at once'],
          1,
          'In a seismic survey around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km. Some penetrate deeper, and one definitely reached the deep lower mantle.',
          'Fukao & Obayashi (2013), pp. 5920, 5932', 'fukao2013',
        ),
        item(
          'What is a mantle plume?',
          ['A column of hot rock rising through the mantle', 'A sinking plate', 'A pocket of liquid iron'],
          0,
          'A column of hot rock rising through the mantle. Seismic images show broad columns rooted near the base of the mantle under Hawaii, Iceland and Samoa; the one under Hawaii is about 800–1,000 km wide.',
          'French & Romanowicz (2015), pp. 95–97', 'french2015',
        ),
        item(
          'What heats the mantle?',
          ['Friction from the moving plates', 'The hot core below, and the decay of uranium, thorium and potassium inside it'],
          1,
          'The hot outer core below, and the decay of uranium, thorium and potassium inside the mantle.',
          'Garnero et al. (2016), p. 481', 'garnero2016',
        ),
      ],
    },
    'outer-core': {
      see: { view: 'quake', look: 'Watch the blue S waves: every one stops at the outer core. The amber P waves cross it, bending as they slow down.' },
      check: item(
        'Before you look: is the outer core solid or liquid?',
        ['Solid', 'Liquid'],
        1,
        'Liquid. PREM gives it a shear-wave speed of zero: no shear waves come through it.',
        'PREM, Table I, p. 308', 'prem1981',
      ),
      tests: [
        item(
          'Which waves cannot cross the outer core?',
          ['P waves', 'S waves'],
          1,
          'S waves: they cannot travel through a liquid. P waves do cross it, slowing from about 13.7 to about 8.1 km/s as they enter.',
          'PREM, Table I, p. 308', 'prem1981',
        ),
        item(
          'What is the outer core made of?',
          ['Iron and nickel, with about 10% of lighter elements', 'Magnesium-rich rock', 'Liquid rock like lava'],
          0,
          'Iron and nickel, with about 10% of lighter elements such as oxygen, sulfur or silicon.',
          'McDonough & Sun (1995), Abstract, p. 223', 'mcdonough1995',
        ),
        item(
          'What keeps Earth’s magnetic field going?',
          ['Moving liquid iron in the outer core', 'Magnetised rock in the crust', 'The Sun'],
          0,
          'Liquid iron freezing onto the inner core releases energy. That is thought to drive convection in the outer core, and the moving liquid metal keeps the field going.',
          'Song & Richards (1996), p. 221', 'song1996',
        ),
      ],
    },
    'inner-core': {
      see: { view: 'vs', look: 'This view colours the cut by S-wave speed. The outer core is dark: 0, liquid. The inner core lights up again: S waves pass, so it is solid.' },
      check: item(
        'Before you look: is the inner core solid or liquid?',
        ['Liquid, like the outer core', 'Solid'],
        1,
        'Solid. Shear waves travel through it, at about 3.5 km/s just inside its boundary, and they cannot cross a liquid.',
        'PREM, Table I, p. 308', 'prem1981',
      ),
      tests: [
        item(
          'Is the inner core growing?',
          ['Yes, slowly, as liquid iron freezes onto it', 'No, it is melting away', 'No, it never changes'],
          0,
          'Yes, slowly. As the core cools, liquid iron freezes onto the inner core.',
          'Song & Richards (1996), p. 221', 'song1996',
        ),
        item(
          'How was the inner core discovered?',
          ['From seismic waves, in 1936', 'By drilling', 'From the magnetic field, in 1996'],
          0,
          'From seismic waves, in 1936.',
          'Song & Richards (1996), p. 221', 'song1996',
        ),
        item(
          'How dense is the centre of the Earth?',
          ['About 3 g/cm^3^', 'About 13 g/cm^3^', 'About 1 g/cm^3^'],
          1,
          'About 13 g/cm^3^ in PREM, roughly five times the density of its upper crust (2.6 g/cm^3^).',
          'PREM, Table I, p. 308', 'prem1981',
        ),
      ],
    },
    moho: {
      see: { view: 'composition', look: 'The Moho is where the orange crust meets the green mantle rock: two different kinds of rock.' },
      check: item(
        'Before you look: what is the Moho?',
        ['The base of the crust', 'The base of the tectonic plate', 'The top of the core'],
        0,
        'The base of the crust, where seismic waves speed up as they pass into mantle rock.',
        'PREM, Table I and footnote, p. 308', 'prem1981',
      ),
      tests: [
        item(
          'How was the Moho found?',
          ['From seismic waves speeding up across it', 'By drilling through it', 'From satellite photos'],
          0,
          'From seismic waves. P waves speed up sharply across it, from about 6.8 km/s in PREM’s crust to about 8.1 km/s in its uppermost mantle.',
          'PREM, Table I and footnote, p. 308; Christensen & Mooney (1995), p. 9761', 'prem1981', 'christensen1995',
        ),
        item(
          'Where is the Moho deeper?',
          ['Under the oceans', 'Under the continents'],
          1,
          'Under the continents. Measured from sea level, CRUST 5.1 puts the average Moho at 38 km under continents and 12.6 km under oceans.',
          'Mooney et al. (1998), §8, p. 735', 'mooney1998',
        ),
        item(
          'Is the Moho the bottom of the tectonic plate?',
          ['Yes', 'No, the plate carries on below it'],
          1,
          'No. The plate (the lithosphere) carries on below the Moho; this model uses PREM’s seismic lid, to 80 km, to stand for it.',
          'PREM, Table I, p. 308', 'prem1981',
        ),
      ],
    },
    cmb: {
      see: { view: 'density', look: 'This view colours the cut by density. Follow it down: the colour brightens slowly through the mantle, then jumps at the core.' },
      check: item(
        'Before you look: where inside the Earth is the biggest jump in density?',
        ['At the Moho', 'At the core–mantle boundary', 'At the centre'],
        1,
        'At the core–mantle boundary, where rock meets metal: from 5.6 to 9.9 g/cm^3^.',
        'PREM, Table I, p. 308', 'prem1981',
      ),
      tests: [
        item(
          'What happens to S waves at the core–mantle boundary?',
          ['They stop, because the core below is liquid', 'They speed up', 'They pass straight through'],
          0,
          'They stop, because the core below is liquid. P waves slow sharply, from about 13.7 to about 8.1 km/s.',
          'PREM, Table I, p. 308', 'prem1981',
        ),
        item(
          'How deep is the core–mantle boundary?',
          ['About 660 km', 'About 2,890 km', 'About 5,150 km'],
          1,
          'About 2,890 km in both PREM and ak135.',
          'PREM, Table I, p. 308; ak135, Table 3, pp. 122–123', 'prem1981', 'ak1351995',
        ),
        item(
          'Which way does heat cross it?',
          ['From the core into the mantle', 'From the mantle into the core', 'No heat crosses it'],
          0,
          'From the core into the mantle, which helps drive mantle convection. How much is highly uncertain: an estimated 5–13 TW.',
          'Garnero et al. (2016), p. 481; Davies & Davies (2010), §4.8, p. 22', 'garnero2016', 'davies2010',
        ),
      ],
    },
  },
};

export const loopFor = (level, id) => LOOPS[level]?.[id] || null;
