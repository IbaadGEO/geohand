// A-level text. Every claim comes from a checked reference (docs/values-to-check.md).
import { part, q } from './part.js';

const P = (id, kind, title, text) => part('alevel', id, kind, title, text);

export default {
  level: 'alevel',
  parts: [
    P('crust', 'layer', 'Crust', {
      short: "The crust is Earth’s outermost layer of rock. Normal oceanic igneous crust is about 7 km thick, while continental crust averages about 40 km (White et al. 1992, p. 19,683; Mooney et al. 1998, p. 733).",
      long: "Oceanic crust forms at mid-ocean ridges. Mantle rock rises beneath the ridge, partly melts as the pressure on it drops, and the melt builds igneous crust about 7 km thick: basaltic lavas and dykes on top, over a thicker layer that is probably mainly gabbro (White et al. 1992, pp. 19,683–19,684). Continental crust is thicker: about 40 km on average in the CRUST 5.1 model, reaching about 70 km under Tibet (Mooney et al. 1998, Plate 1, p. 733). Its bulk chemistry, expressed as oxides, is richer in silica: about 61% SiO~2~ by weight (Rudnick & Gao 2003, Table 11, p. 53), against about 45% in the pyrolite model of the mantle (McDonough & Sun 1995, Table 4, p. 237).",
      simplification: "All crust is drawn as one 35 km layer, shown about 4 times thicker than true scale so you can see it.",
      questions: [
        q("How does normal oceanic igneous crust form, and how thick is it?", "At mid-ocean ridges, mantle rock rises and partly melts as the pressure on it drops. The melt builds igneous crust about 7 km thick (White et al. 1992).", "White et al., pp. 19,683–19,684", 'white1992'),
        q("Where does CRUST 5.1 show especially thick crust?", "Under Tibet, where it reaches about 70 km (Mooney et al. 1998). Seismic refraction there has measured up to 72 km (Christensen & Mooney 1995).", "CRUST 5.1, Plate 1, p. 733; Christensen & Mooney, p. 9764", 'mooney1998', 'christensen1995'),
        q("What is the crust made of?", "Continental crust is about 61% silica (SiO~2~) by weight (Rudnick & Gao 2003). Ocean crust has basaltic lavas and dykes over a thicker layer that is probably mainly gabbro (White et al. 1992).", "Rudnick & Gao, Table 11, p. 53; White et al., pp. 19,683–19,684", 'rudnick2003', 'white1992'),
        q("How is continental crust different from the mantle?", "It has more silica: about 61% SiO~2~ by weight (Rudnick & Gao 2003), against about 45% SiO~2~ and 38% MgO in the pyrolite model of the mantle (McDonough & Sun 1995). It is also less dense: 2.6–2.9 g/cm^3^, against about 3.4 at the top of the mantle (PREM).", "Rudnick & Gao, Table 11, p. 53; McDonough & Sun, Table 4, p. 237; PREM, Table I, p. 308", 'rudnick2003', 'mcdonough1995', 'prem1981'),
        q("How dense is the crust?", "2.6–2.9 g/cm^3^ in PREM, the reference Earth model. The mantle rock below is denser, about 3.4 g/cm^3^.", "PREM, Table I, p. 308", 'prem1981'),
        q("How much heat comes out through the crust?", "About 47 TW leaves the whole Earth. Of that, an estimated 6–8 TW is made inside the crust itself (Davies & Davies 2010, Section 4.8).", "Davies & Davies, §4.8, p. 22", 'davies2010'),
        q("Is the crust the same thing as a tectonic plate?", "No. A plate is a piece of the lithosphere: the crust plus the top of the mantle. New plate is made at mid-ocean ridges and old plate sinks back into the mantle at subduction zones (Garnero et al. 2016). For the visualisation, the model uses the base of PREM's seismic lid, at 80 km, as a stand-in for the base of the plate.", "Garnero et al., p. 481; PREM, Table I, p. 308", 'garnero2016', 'prem1981'),
      ],
    }),
    P('lithosphere', 'layer', 'Lithosphere', {
      short: "The lithosphere includes the crust and uppermost mantle, which together make up the tectonic plates. The model uses PREM’s seismic lid base at 80 km as its lower boundary (PREM, pp. 300, 308; Garnero et al. 2016, p. 481).",
      long: "PREM identifies a seismic region in the mantle directly beneath the crust down to 80 km that Dziewonski & Anderson (1981, pp. 300, 308) call the LID. They treat it as the main part of the seismic lithosphere. Below it is PREM's low-velocity zone, which this model draws as the asthenosphere. New lithosphere is made at mid-ocean ridges, and old lithosphere sinks back into the mantle at subduction zones (Garnero et al. 2016, p. 481).",
      simplification: "only the mantle part (35–80 km) is drawn here; the crust above it is part of the lithosphere too. PREM is a global average, so it gives one depth, 80 km. The 80 km line is a seismic boundary in PREM, used here as a proxy (PREM, pp. 300, 308).",
      questions: [
        q("What is the lithosphere made of?", "It includes the crust and the uppermost mantle. The crust is the outer rock layer. For the visualisation, the model uses the 80 km base of PREM’s seismic lid as a proxy for the base of the lithosphere.", "PREM, pp. 300, 308", 'prem1981'),
        q("How thick is the lithosphere?", "In this visualisation, the model uses 80 km, the base of PREM's seismic lid, as a proxy for the base of the plate.", "PREM, pp. 300, 308", 'prem1981'),
        q("How does PREM mark the base of the lid?", "At 80 km PREM moves from its lid to its low-velocity zone, and the damping of shear waves changes sharply: the shear quality factor Q~μ~ drops from 600 to 80.", "PREM, Table I, p. 308", 'prem1981'),
        q("Where is new lithosphere made?", "At mid-ocean ridges, where plates move apart and melted mantle rock forms new crust (Garnero et al. 2016; White et al. 1992).", "Garnero et al., p. 481; White et al., pp. 19,683–19,684", 'garnero2016', 'white1992'),
        q("What happens to old lithosphere?", "It sinks into the mantle at subduction zones (Garnero et al. 2016). In a seismic survey around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km depth (Fukao & Obayashi 2013).", "Garnero et al., p. 481; Fukao & Obayashi, p. 5920", 'garnero2016', 'fukao2013'),
        q("How dense is the mantle part of the lithosphere?", "About 3.4 g/cm^3^ in PREM, denser than the 2.6–2.9 g/cm^3^ of the crust above.", "PREM, Table I, p. 308", 'prem1981'),
      ],
    }),
    P('asthenosphere', 'layer', 'Asthenosphere', {
      short: "Beneath the plates is the asthenosphere. Here it is represented by PREM’s low-velocity zone, 80–220 km deep, where seismic waves travel more slowly (PREM, Table I and footnote, p. 308).",
      long: "PREM identifies this region as the low-velocity zone. The model’s effective isotropic shear-wave speed decreases slightly through this interval and stays above zero, consistent with a solid response on seismic timescales (PREM, Table I and footnote, p. 308). The plates above move as part of the slow convection of the mantle beneath them (Garnero et al. 2016, p. 481).",
      simplification: "drawn as PREM's low-velocity zone, 80–220 km deep. PREM is a global average, so it gives one depth range for the whole Earth (PREM, pp. 299–300, 308).",
      questions: [
        q("Why is it called the low-velocity zone?", "In PREM the effective isotropic shear-wave speed continues to decrease below the lid. It falls from about 4.47 km/s at 80 km to about 4.42 km/s just above 220 km.", "PREM, Table I and footnote, p. 308", 'prem1981'),
        q("Is the asthenosphere liquid?", "No. PREM gives the low-velocity zone a shear-wave speed above zero; shear waves cannot travel through a liquid. The liquid outer core has a shear-wave speed of zero.", "PREM, Table I, p. 308", 'prem1981'),
        q("How deep is the asthenosphere?", "The model illustrates it at 80–220 km, the depth of PREM's low-velocity zone.", "PREM, Table I, p. 308", 'prem1981'),
        q("Why do the plates move?", "Plate movement is linked to the slow convection of the mantle underneath, over geological time (Garnero et al. 2016).", "Garnero et al., p. 481", 'garnero2016'),
        q("Where does the melt for new ocean crust come from?", "From mantle rock rising beneath mid-ocean ridges. As it rises the pressure drops and part of it melts (White et al. 1992).", "White et al., pp. 19,683–19,684", 'white1992'),
        q("What is below the asthenosphere?", "More mantle rock, all the way down to the core at about 2,890 km.", "PREM, Table I, p. 308; ak135, Table 3, pp. 122–123", 'prem1981', 'ak1351995'),
      ],
    }),
    P('mantle', 'layer', 'Mantle', {
      short: "The mantle is solid rock extending from the base of the crust to about 2,890 km, just under halfway to Earth’s centre. It flows over geological time (PREM, Table I, p. 308; Garnero et al. 2016, p. 481).",
      long: "On seismic timescales, the mantle behaves as a solid: shear waves pass through it (PREM, Table I, p. 308). It still moves, very slowly: it is heated from below by the hot outer core and from within by the decay of uranium, thorium and potassium, and it convects over geological time (Garnero et al. 2016, p. 481). Cold plates sink into it at subduction zones; in a circum-Pacific survey, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km (Fukao & Obayashi 2013, p. 5920). Under Hawaii, Iceland and Samoa, seismic images show broad columns of slow waves rooted near its base, which French & Romanowicz (2015, pp. 95–96) interpret as plumes of hot rock. Its bulk chemistry in the pyrolite model is about 45% SiO~2~ and 38% MgO by weight, expressed as oxides (McDonough & Sun 1995, Table 4, p. 237).",
      simplification: "drawn as one layer from 220 km down; the plate and the softer layer above it are drawn separately. The thin outer layers are drawn thicker than true scale so you can see them, so depths on the drawing are only approximate.",
      questions: [
        q("If the mantle is solid, how can it flow?", "It responds as a solid on seismic timescales: shear waves pass through it (PREM). Over geological time it convects, driven by heat from the core and from radioactive decay (Garnero et al. 2016).", "PREM, Table I, p. 308; Garnero et al., p. 481", 'prem1981', 'garnero2016'),
        q("What heats the mantle?", "The hot outer core below, and the decay of uranium, thorium and potassium inside it (Garnero et al. 2016). Of the 47 TW leaving Earth's surface, an estimated 24–38 TW comes mainly from heat made in the mantle and from the planet slowly cooling (Davies & Davies 2010, Section 4.8).", "Garnero et al., p. 481; Davies & Davies, §4.8, p. 22", 'garnero2016', 'davies2010'),
        q("What is the mantle made of?", "The pyrolite model gives bulk chemistry by weight, expressed as about 45% SiO~2~, 38% MgO and 8% FeO (McDonough & Sun 1995).", "McDonough & Sun, Table 4, p. 237", 'mcdonough1995'),
        q("What happens to plates that sink into the mantle?", "In a seismic survey around the Pacific, most imaged slabs were stagnant above the 660 km boundary or trapped just below it, at 660–1,000 km. Some penetrate the boundary, and the study identified one definite case of descent into the deep lower mantle (Fukao & Obayashi 2013).", "Fukao & Obayashi, pp. 5920, 5932", 'fukao2013'),
        q("What is a mantle plume?", "A column of hot rock rising through the mantle. French & Romanowicz (2015) imaged broad columns of slow seismic waves rooted near the base of the mantle under Hawaii, Iceland and Samoa, and interpret them as plumes; the one under Hawaii is about 800–1,000 km wide. Whether plumes feed hotspot volcanoes has been debated.", "French & Romanowicz, pp. 95–97", 'french2015'),
        q("How does the density change with depth?", "From about 3.4 g/cm^3^ at the top to about 5.6 g/cm^3^ at the bottom (PREM).", "PREM, Table I, p. 308", 'prem1981'),
        q("How thick is the mantle?", "From the Moho, whose depth varies, to about 2,890 km: just under halfway to Earth's centre (Garnero et al. 2016). With this model's 35 km crust, that is about 2,850 km of mantle.", "PREM, Table I, p. 308; ak135, Table 3, pp. 122–123; Garnero et al., p. 481", 'prem1981', 'ak1351995', 'garnero2016'),
        q("Is the mantle the same everywhere?", "No. Seismic waves travel faster through the deep mantle under past subduction zones, and much slower through two huge regions at its base: one beneath the Pacific, and one beneath the Atlantic and western and southern Africa (Garnero et al. 2016).", "Garnero et al., p. 481", 'garnero2016'),
      ],
    }),
    P('outer-core', 'layer', 'Outer core', {
      short: "The outer core consists of liquid iron and nickel, extending from about 2,890 to 5,150 km deep. Its movement generates Earth’s magnetic field (PREM, Table I, p. 308; McDonough & Sun 1995, p. 223; Song & Richards 1996, p. 221).",
      long: "Shear waves do not travel through the outer core: PREM gives it a shear-wave speed of zero, consistent with a liquid (PREM, Table I, p. 308). It is mostly iron with some nickel, plus about 10% of lighter elements such as oxygen, sulfur or silicon (McDonough & Sun 1995, p. 223). As the inner core slowly freezes, it releases energy that is thought to keep the liquid moving, and that motion generates the magnetic field (Song & Richards 1996, p. 221).",
      simplification: "the lighter elements are given as one figure, about 10%. Which elements they are, and how much of each, is still uncertain: McDonough & Sun give 10 ± 5% (1995, p. 223).",
      questions: [
        q("How do we know the outer core is liquid?", "Shear waves cannot travel through liquids, and none come through the outer core. PREM gives it a shear-wave speed of zero.", "PREM, Table I, p. 308", 'prem1981'),
        q("What is the outer core made of?", "Iron and nickel, with about 10% of lighter elements such as oxygen, sulfur or silicon (McDonough & Sun 1995).", "McDonough & Sun, Abstract, p. 223", 'mcdonough1995'),
        q("How does the outer core make the magnetic field?", "Liquid iron freezing onto the inner core releases energy. That is thought to drive convection in the outer core, and the moving liquid metal keeps the magnetic field going (Song & Richards 1996).", "Song & Richards, p. 221", 'song1996'),
        q("How much of the Earth is core?", "The whole core, outer and inner together, is about 32.5% of Earth's mass (McDonough & Sun 1995).", "McDonough & Sun, §6, p. 244", 'mcdonough1995'),
        q("How dense is the outer core?", "9.9 g/cm^3^ at the top to 12.2 g/cm^3^ at the bottom in PREM, against about 5.6 g/cm^3^ at the bottom of the mantle.", "PREM, Table I, p. 308", 'prem1981'),
        q("How big is the core?", "Its outer edge is about 3,480 km from the centre (Song & Richards 1996), at a depth of about 2,890 km.", "Song & Richards, p. 221; PREM, Table I, p. 308", 'song1996', 'prem1981'),
        q("Does heat come out of the core?", "Yes. It heats the mantle from below (Garnero et al. 2016). Estimates of how much are highly uncertain, about 5–13 TW of the 47 TW leaving Earth's surface (Davies & Davies 2010, Section 4.8).", "Garnero et al., p. 481; Davies & Davies, §4.8, p. 22", 'garnero2016', 'davies2010'),
      ],
    }),
    P('inner-core', 'layer', 'Inner core', {
      short: "At the centre is a solid iron sphere about 1,220 km in radius. It grows slowly as liquid from the outer core freezes onto it (Song & Richards 1996, p. 221).",
      long: "Within the inner core, shear waves travel at about 3.5 km/s just inside the inner-core boundary, consistent with a solid response (PREM, Table I, p. 308). Seismologists found it in 1936 (Song & Richards 1996, p. 221). The core has been cooling since it formed, and as it cools, liquid iron freezes onto the inner core (Song & Richards 1996, p. 221). In 1996 Song & Richards estimated that it turns about 1° a year faster than the mantle (p. 221). Yang & Song (2023, pp. 182, 184–185) inferred that relative rotation nearly stopped around 2009 and may have reversed slightly in the years they studied. They propose a cycle of about 70 years.",
      simplification: "drawn as a plain solid ball. On average, compressional waves travel faster in the polar direction than in the equatorial direction, and its eastern and western halves differ (Deuss 2014, p. 103).",
      questions: [
        q("How do we know the inner core is solid?", "Shear waves travel through it, at about 3.5 km/s just inside the inner-core boundary in PREM. They cannot cross a liquid.", "PREM, Table I, p. 308", 'prem1981'),
        q("When was the inner core discovered?", "In 1936, from seismic waves (Song & Richards 1996).", "Song & Richards, p. 221", 'song1996'),
        q("Is the inner core growing?", "Yes, slowly. As the core cools, liquid iron freezes onto it (Song & Richards 1996).", "Song & Richards, p. 221", 'song1996'),
        q("Does the inner core spin?", "It turns with the rest of the Earth, but not always at the same rate as the mantle. Song & Richards (1996) estimated it about 1° a year faster. Yang & Song inferred that relative rotation nearly stopped around 2009 and may have reversed slightly in the years they studied. They propose a cycle of about 70 years.", "Song & Richards, p. 221; Yang & Song, pp. 182, 184–185", 'song1996', 'yang2023'),
        q("How dense is the centre of the Earth?", "About 13 g/cm^3^ in PREM, roughly five times the density of PREM's upper crust (2.6 g/cm^3^).", "PREM, Table I, p. 308", 'prem1981'),
        q("How big is the inner core?", "About 1,220 km in radius (Song & Richards 1996), less than 1% of Earth's volume.", "Song & Richards, p. 221; Ishii & Dziewoński, p. 14026", 'song1996', 'ishii2002'),
        q("Is the inner core the same all the way through?", "No. On average, compressional waves travel faster in the polar direction than in the equatorial direction, and the western half differs from the eastern (Deuss 2014).", "Deuss, p. 103", 'deuss2014'),
      ],
    }),
    P('moho', 'boundary', 'Moho', {
      short: "The Moho marks the base of the crust. Seismic waves speed up as they cross into mantle rock (PREM, Table I and footnote, p. 308).",
      long: "PREM records an increase in P-wave speed from 6.8 km/s in the lower crust to 8.1 km/s just below the Moho (effective isotropic value), and the density jumps from 2.9 to 3.4 g/cm^3^ (PREM, Table I and footnote, p. 308). Under the oceans the Moho is about 7 km below the top of normal igneous crust (White et al. 1992, pp. 19,683, 19,694); CRUST 5.1 gives average depths below sea level of 38 km under continents and 12.6 km under oceans (Mooney et al. 1998, §8, p. 735).",
      simplification: "drawn at 35 km everywhere: ak135's reference depth, which uses continental-style crust (Kennett et al. 1995, p. 110 and Table 3, p. 122). PREM puts it at 24.4 km (Table I, p. 308). The real Moho is shallower under the oceans and deeper under the continents.",
      questions: [
        q("How is the Moho found?", "From seismic waves. P waves speed up sharply as they cross it, from about 6.8 km/s in PREM’s crust to an effective isotropic value of about 8.1 km/s in its uppermost mantle. Christensen & Mooney (1995) mapped the continental crust from seismic refraction profiles.", "PREM, Table I and footnote, p. 308; Christensen & Mooney, p. 9761", 'prem1981', 'christensen1995'),
        q("How deep is the Moho?", "About 7 km below the top of normal oceanic igneous crust. Using sea level as the reference, CRUST 5.1 puts the average Moho at 12.6 km under oceans and 38 km under continents.", "White et al., pp. 19,683, 19,694; CRUST 5.1, §8, p. 735", 'white1992', 'mooney1998'),
        q("What changes at the Moho?", "The rock. Under the continents, crust with about 61% silica by weight (Rudnick & Gao 2003) gives way to mantle rock whose bulk chemistry is expressed as about 45% SiO~2~ and 38% MgO by weight in the pyrolite model (McDonough & Sun 1995). Density rises from 2.9 to 3.4 g/cm^3^ (PREM).", "Rudnick & Gao, Table 11, p. 53; McDonough & Sun, Table 4, p. 237; PREM, Table I, p. 308", 'rudnick2003', 'mcdonough1995', 'prem1981'),
        q("Is the Moho the bottom of the tectonic plate?", "No. The plate (the lithosphere) carries on below the Moho; this model uses PREM's seismic lid, to 80 km, to stand for it.", "PREM, Table I, p. 308", 'prem1981'),
        q("Do all Earth models put the Moho at the same depth?", "No. PREM, a global average model, uses 24.4 km. ak135 uses 35 km, because it adopts continental-style crust (Kennett et al. 1995).", "PREM, Table I, p. 308; ak135, p. 110; Table 3, p. 122", 'prem1981', 'ak1351995'),
        q("How is the ocean Moho made?", "At mid-ocean ridges, melt from rising mantle rock builds igneous crust on top of the mantle. The base of that crust is the Moho, about 7 km below its top (White et al. 1992).", "White et al., pp. 19,683, 19,694", 'white1992'),
      ],
    }),
    P('cmb', 'boundary', 'Core–mantle boundary', {
      short: "About 2,890 km below the surface, the rocky mantle meets the liquid iron core. This boundary has the largest density jump inside the Earth (PREM, Table I, p. 308).",
      long: "Across this boundary, density rises from 5.6 to 9.9 g/cm^3^. Shear waves travel through the mantle rock at about 7.3 km/s but stop at the liquid iron (PREM, Table I, p. 308). Heat crosses from the core into the mantle and helps drive mantle convection (Garnero et al. 2016, p. 481). Broad columns that French & Romanowicz (2015, pp. 95–96) interpret as plumes seem to rise from patches just above it.",
      simplification: "drawn as a smooth sphere. This level’s drawing leaves out the two continent-sized regions of slow seismic waves just above it, and the thin patches where waves are very slow (Garnero et al. 2016, pp. 481–482).",
      questions: [
        q("What happens to seismic waves at the core–mantle boundary?", "Shear waves stop, because the core below is liquid. P waves slow sharply, from about 13.7 to about 8.1 km/s in PREM.", "PREM, Table I, p. 308", 'prem1981'),
        q("Why does the density jump so much?", "Rock meets metal. The mantle is silicate rock (McDonough & Sun 1995); the core is mostly iron. Density goes from 5.6 to 9.9 g/cm^3^ (PREM).", "McDonough & Sun, Abstract, p. 223; Table 4, p. 237; PREM, Table I, p. 308", 'mcdonough1995', 'prem1981'),
        q("Does heat cross the core–mantle boundary?", "Yes, from the core into the mantle, which helps drive mantle convection (Garnero et al. 2016). How much is highly uncertain: an estimated 5–13 TW (Davies & Davies 2010, Section 4.8).", "Garnero et al., p. 481; Davies & Davies, §4.8, p. 22", 'garnero2016', 'davies2010'),
        q("What lies just above the core–mantle boundary?", "Two continent-sized regions where shear waves are slow, one beneath the Pacific and one beneath the Atlantic and western and southern Africa, and thin patches where they are very slow (Garnero et al. 2016). Columns interpreted as plumes seem to rise from some of these patches (French & Romanowicz 2015).", "Garnero et al., pp. 481–482; French & Romanowicz, pp. 95–96", 'garnero2016', 'french2015'),
        q("How deep is the core–mantle boundary?", "About 2,890 km in both PREM and ak135.", "PREM, Table I, p. 308; ak135, Table 3, pp. 122–123", 'prem1981', 'ak1351995'),
        q("How far is the core–mantle boundary from Earth's centre?", "About 3,480 km, a little over half of Earth's radius (Song & Richards 1996).", "Song & Richards, p. 221", 'song1996'),
      ],
    }),
  ],
};
