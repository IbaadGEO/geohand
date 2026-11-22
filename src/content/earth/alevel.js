// A-level text. Every claim comes from a checked reference (docs/values-to-check.md).
import { part, q } from './part.js';

const P = (id, kind, title, text) => part('alevel', id, kind, title, text);

export default {
  level: 'alevel',
  parts: [
    P('crust', 'layer', 'Crust', {
      short: "The outer layer of rock. Normal ocean crust is about 7 km thick; continental crust averages about 40 km.",
      long: "Ocean crust is made at mid-ocean ridges. Mantle rock rises beneath the ridge, partly melts as the pressure on it drops, and the melt builds igneous crust about 7 km thick: basaltic lavas and dykes on top, over a thicker layer that is probably mainly gabbro (White et al. 1992). Continental crust is thicker: about 40 km on average in the CRUST 5.1 model, reaching about 70 km under Tibet (Mooney et al. 1998). It is also richer in silica: about 61% SiO~2~ by weight (Rudnick & Gao 2003), against about 45% in the pyrolite model of the mantle (McDonough & Sun 1995).",
      simplification: "drawn about four times too thick so it can be seen, and at one thickness (35 km) everywhere. Normal ocean crust is about 7 km thick and continental crust averages about 40 km.",
      questions: [
        q("How does normal ocean crust form, and how thick is it?", "At mid-ocean ridges, mantle rock rises and partly melts as the pressure on it drops. The melt builds igneous crust about 7 km thick (White et al. 1992).", 'white1992'),
        q("Where does CRUST 5.1 show especially thick crust?", "Under Tibet, where it reaches about 70 km (Mooney et al. 1998). Seismic refraction there has measured up to 72 km (Christensen & Mooney 1995).", 'mooney1998', 'christensen1995'),
        q("What is the crust made of?", "Continental crust is about 61% silica (SiO~2~) by weight (Rudnick & Gao 2003). Ocean crust has basaltic lavas and dykes over a thicker layer that is probably mainly gabbro (White et al. 1992).", 'rudnick2003', 'white1992'),
        q("How is continental crust different from the mantle?", "It has more silica: about 61% SiO~2~ by weight (Rudnick & Gao 2003), against about 45% SiO~2~ and 38% MgO in the pyrolite model of the mantle (McDonough & Sun 1995). It is also less dense: 2.6–2.9 g/cm^3^, against about 3.4 at the top of the mantle (PREM).", 'rudnick2003', 'mcdonough1995', 'prem1981'),
        q("How dense is the crust?", "2.6–2.9 g/cm^3^ in PREM, the reference Earth model. The mantle rock below is denser, about 3.4 g/cm^3^.", 'prem1981'),
        q("How much heat comes out through the crust?", "About 47 TW leaves the whole Earth. Of that, an estimated 6–8 TW is made inside the crust itself (Davies & Davies 2010, Section 4.8).", 'davies2010'),
        q("Is the crust the same thing as a tectonic plate?", "No. A plate is a piece of the lithosphere: the crust plus the top of the mantle. New plate is made at mid-ocean ridges and old plate sinks back into the mantle at subduction zones (Garnero et al. 2016). This model uses the base of PREM's seismic lid, at 80 km, as a stand-in for the base of the plate.", 'garnero2016', 'prem1981'),
      ],
    }),
    P('lithosphere', 'layer', 'Lithosphere', {
      short: "The crust plus the top of the mantle. Tectonic plates are pieces of it. This model uses PREM's seismic lid, down to 80 km, to stand for it.",
      long: "In PREM, the mantle rock just under the crust forms a seismic region down to 80 km that Dziewonski & Anderson (1981) call the LID. They treat it as the main part of the seismic lithosphere. Below it is PREM's low-velocity zone, which this model draws as the asthenosphere. New lithosphere is made at mid-ocean ridges, and old lithosphere sinks back into the mantle at subduction zones (Garnero et al. 2016).",
      simplification: "only the mantle part (35–80 km) is drawn here; the crust above it is part of the lithosphere too. PREM is a global average, so it gives one depth, 80 km. The 80 km line is a seismic boundary in PREM, used here as a stand-in.",
      questions: [
        q("What is the difference between the crust and the lithosphere?", "The crust is the top layer of rock, set apart by what it is made of. The lithosphere is the crust plus the top of the mantle. This model takes its base from PREM's seismic lid, at about 80 km.", 'prem1981'),
        q("How thick is the lithosphere?", "This model uses the base of PREM's seismic lid, 80 km, which is an average for the whole Earth.", 'prem1981'),
        q("How does PREM mark the base of the lid?", "At 80 km PREM moves from its lid to its low-velocity zone, and the damping of shear waves changes sharply: the shear quality factor Q~μ~ drops from 600 to 80.", 'prem1981'),
        q("Where is new lithosphere made?", "At mid-ocean ridges, where plates move apart and melted mantle rock forms new crust (Garnero et al. 2016; White et al. 1992).", 'garnero2016', 'white1992'),
        q("What happens to old lithosphere?", "It sinks into the mantle at subduction zones (Garnero et al. 2016). In a seismic survey around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km depth (Fukao & Obayashi 2013).", 'garnero2016', 'fukao2013'),
        q("How dense is the mantle part of the lithosphere?", "About 3.4 g/cm^3^ in PREM, denser than the 2.6–2.9 g/cm^3^ of the crust above.", 'prem1981'),
      ],
    }),
    P('asthenosphere', 'layer', 'Asthenosphere', {
      short: "The layer under the plates. This model draws it as PREM's low-velocity zone, 80–220 km deep, where seismic waves travel more slowly.",
      long: "PREM calls this region the low-velocity zone. Almost everywhere else in the mantle, seismic waves speed up as they go deeper; here they slow slightly instead. PREM gives it a shear-wave speed above zero, so it is solid. The plates above move as part of the slow convection of the mantle beneath them (Garnero et al. 2016).",
      simplification: "drawn as PREM's low-velocity zone, 80–220 km deep. PREM is a global average, so it gives one depth range for the whole Earth.",
      questions: [
        q("Why is it called the low-velocity zone?", "Seismic waves travel more slowly here than in the lid above. In PREM's effective isotropic values, the shear-wave speed falls from about 4.47 km/s at 80 km to about 4.42 km/s just above 220 km.", 'prem1981'),
        q("Is the asthenosphere liquid?", "No. PREM gives the low-velocity zone a shear-wave speed above zero; shear waves cannot travel through a liquid. The liquid outer core has a shear-wave speed of zero.", 'prem1981'),
        q("How deep is the asthenosphere?", "This model draws it at 80–220 km, the depth of PREM's low-velocity zone.", 'prem1981'),
        q("Why do the plates move?", "Plate movement is linked to the slow convection of the mantle underneath, over geological time (Garnero et al. 2016).", 'garnero2016'),
        q("Where does the melt for new ocean crust come from?", "From mantle rock rising beneath mid-ocean ridges. As it rises the pressure drops and part of it melts (White et al. 1992).", 'white1992'),
        q("What is below the asthenosphere?", "More mantle rock, all the way down to the core at about 2,890 km.", 'prem1981', 'ak1351995'),
      ],
    }),
    P('mantle', 'layer', 'Mantle', {
      short: "Solid rock from the base of the crust down to about 2,890 km, just under halfway to the centre. Over geological time it flows.",
      long: "The mantle responds as a solid on seismic timescales: shear waves pass through it (PREM). It still moves, very slowly: it is heated from below by the hot outer core and from within by the decay of uranium, thorium and potassium, and it convects over geological time (Garnero et al. 2016). Cold plates sink into it at subduction zones; around the Pacific, most imaged slabs stall near 660 km (Fukao & Obayashi 2013). Under Hawaii, Iceland and Samoa, seismic images show broad columns of slow waves rooted near its base, which French & Romanowicz (2015) interpret as plumes of hot rock. In the pyrolite model its rock is about 45% silica and 38% magnesium oxide by weight (McDonough & Sun 1995).",
      simplification: "drawn as one layer from 220 km down. The mantle part of the lithosphere and the low-velocity zone are drawn separately above it. Shallow layers are exaggerated: depths above 660 km are redrawn (35 km is drawn as about 150 km); below 660 km the scale is within about 1% of true.",
      questions: [
        q("If the mantle is solid, how can it flow?", "It responds as a solid on seismic timescales: shear waves pass through it (PREM). Over geological time it convects, driven by heat from the core and from radioactive decay (Garnero et al. 2016).", 'prem1981', 'garnero2016'),
        q("What heats the mantle?", "The hot outer core below, and the decay of uranium, thorium and potassium inside it (Garnero et al. 2016). Of the 47 TW leaving Earth's surface, an estimated 24–38 TW comes mainly from heat made in the mantle and from the planet slowly cooling (Davies & Davies 2010, Section 4.8).", 'garnero2016', 'davies2010'),
        q("What is the mantle made of?", "In the pyrolite model, rock that is about 45% silica (SiO~2~), 38% magnesium oxide (MgO) and 8% iron oxide (FeO) by weight (McDonough & Sun 1995).", 'mcdonough1995'),
        q("What happens to plates that sink into the mantle?", "In a seismic survey around the Pacific, most imaged slabs were stagnant above the 660 km boundary or trapped just below it, at 660–1,000 km. A few sink further (Fukao & Obayashi 2013).", 'fukao2013'),
        q("What is a mantle plume?", "A column of hot rock rising through the mantle. French & Romanowicz (2015) imaged broad columns of slow seismic waves rooted near the base of the mantle under Hawaii, Iceland and Samoa, and interpret them as plumes; the one under Hawaii is about 800–1,000 km wide. Whether plumes feed hotspot volcanoes has been debated.", 'french2015'),
        q("How does the density change with depth?", "From about 3.4 g/cm^3^ at the top to about 5.6 g/cm^3^ at the bottom (PREM).", 'prem1981'),
        q("How thick is the mantle?", "From the Moho, whose depth varies, to about 2,890 km: just under halfway to Earth's centre (Garnero et al. 2016). With this model's 35 km crust, that is about 2,850 km of mantle.", 'prem1981', 'ak1351995', 'garnero2016'),
        q("Is the mantle the same everywhere?", "No. Seismic waves travel faster through the deep mantle under past subduction zones, and much slower through two huge regions at its base: one beneath the Pacific, and one beneath the Atlantic and western and southern Africa (Garnero et al. 2016).", 'garnero2016'),
      ],
    }),
    P('outer-core', 'layer', 'Outer core', {
      short: "Liquid iron and nickel, from about 2,890 to 5,150 km deep. Its movement makes Earth's magnetic field.",
      long: "No shear waves pass through the outer core: PREM gives it a shear-wave speed of zero, so it is liquid. It is mostly iron with some nickel, plus about 10% of lighter elements such as oxygen, sulfur or silicon (McDonough & Sun 1995). As the inner core slowly freezes, it releases energy that is thought to keep the liquid moving, and that motion generates the magnetic field (Song & Richards 1996; Deuss 2014).",
      simplification: "the lighter elements are given as one figure, about 10%. Which elements they are, and how much of each, is still uncertain: McDonough & Sun give 10 ± 5%.",
      questions: [
        q("How do we know the outer core is liquid?", "Shear waves cannot travel through liquids, and none come through the outer core. PREM gives it a shear-wave speed of zero.", 'prem1981'),
        q("What is the outer core made of?", "Iron and nickel, with about 10% of lighter elements such as oxygen, sulfur or silicon (McDonough & Sun 1995).", 'mcdonough1995'),
        q("How does the outer core make the magnetic field?", "Liquid iron freezing onto the inner core releases energy. That is thought to drive convection in the outer core, and the moving liquid metal keeps the magnetic field going (Song & Richards 1996; Deuss 2014).", 'song1996', 'deuss2014'),
        q("How much of the Earth is core?", "The whole core, outer and inner together, is about 32.5% of Earth's mass (McDonough & Sun 1995).", 'mcdonough1995'),
        q("How dense is the outer core?", "9.9 g/cm^3^ at the top to 12.2 g/cm^3^ at the bottom in PREM, against about 5.6 g/cm^3^ at the bottom of the mantle.", 'prem1981'),
        q("How big is the core?", "Its outer edge is about 3,480 km from the centre (Song & Richards 1996), at a depth of about 2,890 km.", 'song1996', 'prem1981'),
        q("Does heat come out of the core?", "Yes. It heats the mantle from below (Garnero et al. 2016). Estimates of how much are highly uncertain, about 5–13 TW of the 47 TW leaving Earth's surface (Davies & Davies 2010, Section 4.8).", 'garnero2016', 'davies2010'),
      ],
    }),
    P('inner-core', 'layer', 'Inner core', {
      short: "A solid ball of iron about 1,220 km in radius at the centre. It is slowly growing as the outer core freezes onto it.",
      long: "Shear waves travel through it at about 3.5 km/s, so it is solid (PREM). Seismologists found it in 1936 (Song & Richards 1996). The core has been cooling since it formed, and as it cools, liquid iron freezes onto the inner core. In 1996 Song & Richards estimated that it turns about 1° a year faster than the mantle. Yang & Song (2023) found that around 2009 the difference nearly stopped and may since have reversed slightly; they propose a cycle of about 70 years.",
      simplification: "drawn as a plain solid ball. Seismic waves cross it faster from pole to pole than across the equator, and its eastern and western halves differ (Deuss 2014).",
      questions: [
        q("How do we know the inner core is solid?", "Shear waves travel through it, at about 3.5 km/s in PREM. They cannot cross a liquid.", 'prem1981'),
        q("When was the inner core discovered?", "In 1936, from seismic waves (Song & Richards 1996).", 'song1996'),
        q("Is the inner core growing?", "Yes, slowly. As the core cools, liquid iron freezes onto it (Song & Richards 1996).", 'song1996'),
        q("Does the inner core spin?", "It turns with the rest of the Earth, but not always at the same rate as the mantle. Song & Richards (1996) estimated it about 1° a year faster. Yang & Song (2023) found the difference nearly stopped around 2009 and may since have reversed slightly, and propose a cycle of about 70 years.", 'song1996', 'yang2023'),
        q("How dense is the centre of the Earth?", "About 13 g/cm^3^ in PREM, roughly five times the density of PREM's upper crust (2.6 g/cm^3^).", 'prem1981'),
        q("How big is the inner core?", "About 1,220 km in radius (Song & Richards 1996), less than 1% of Earth's volume.", 'song1996', 'ishii2002'),
        q("Is the inner core the same all the way through?", "No. Seismic waves cross it faster from pole to pole than across the equator, and the western half differs from the eastern (Deuss 2014).", 'deuss2014'),
      ],
    }),
    P('moho', 'boundary', 'Moho', {
      short: "The base of the crust, where seismic waves speed up as they pass into mantle rock.",
      long: "In PREM, P waves speed up from 6.8 km/s in the lower crust to 8.1 km/s just below the Moho (effective isotropic value), and the density jumps from 2.9 to 3.4 g/cm^3^. Under the oceans the Moho is about 7 km below the top of normal igneous crust (White et al. 1992); under the continents it is about 40 km deep (Mooney et al. 1998).",
      simplification: "drawn at 35 km everywhere: ak135's reference depth, which uses continental-style crust. PREM puts it at 24.4 km. The real Moho is shallower under the oceans and deeper under the continents.",
      questions: [
        q("How is the Moho found?", "From seismic waves. P waves speed up sharply as they cross it, from about 6.8 to about 8.1 km/s in PREM. Christensen & Mooney (1995) mapped the continental crust from seismic refraction profiles.", 'prem1981', 'christensen1995'),
        q("How deep is the Moho?", "About 7 km below the top of normal oceanic igneous crust (White et al. 1992), and about 40 km under the continents, reaching about 70 km under Tibet in CRUST 5.1 (Mooney et al. 1998).", 'white1992', 'mooney1998'),
        q("What changes at the Moho?", "The rock. Under the continents, crust with about 61% silica by weight (Rudnick & Gao 2003) gives way to mantle rock that is about 45% silica and 38% magnesium oxide in the pyrolite model (McDonough & Sun 1995). Density rises from 2.9 to 3.4 g/cm^3^ (PREM).", 'rudnick2003', 'mcdonough1995', 'prem1981'),
        q("Is the Moho the bottom of the tectonic plate?", "No. The plate (the lithosphere) carries on below the Moho; this model uses PREM's seismic lid, to 80 km, to stand for it.", 'prem1981'),
        q("Do all Earth models put the Moho at the same depth?", "No. PREM, a global average model, uses 24.4 km. ak135 uses 35 km, because it adopts continental-style crust (Kennett et al. 1995).", 'prem1981', 'ak1351995'),
        q("How is the ocean Moho made?", "At mid-ocean ridges, melt from rising mantle rock builds igneous crust on top of the mantle. The base of that crust is the Moho, about 7 km below its top (White et al. 1992).", 'white1992'),
      ],
    }),
    P('cmb', 'boundary', 'Core–mantle boundary', {
      short: "Where the rocky mantle meets the liquid iron core, about 2,890 km down. It has the largest jump in density inside the Earth.",
      long: "Density jumps from 5.6 to 9.9 g/cm^3^ across it. Shear waves travel through the mantle rock at about 7.3 km/s but stop at the liquid iron (PREM). Heat crosses from the core into the mantle and helps drive mantle convection (Garnero et al. 2016). Broad columns that French & Romanowicz (2015) interpret as plumes seem to rise from patches just above it.",
      simplification: "drawn as a smooth sphere. The A-level drawing leaves out the two continent-sized regions of slow seismic waves just above it, and the thin patches where waves are very slow (Garnero et al. 2016).",
      questions: [
        q("What happens to seismic waves at the core–mantle boundary?", "Shear waves stop, because the core below is liquid. P waves slow sharply, from about 13.7 to about 8.1 km/s in PREM.", 'prem1981'),
        q("Why does the density jump so much?", "Rock meets metal. The mantle is silicate rock (McDonough & Sun 1995); the core is mostly iron. Density goes from 5.6 to 9.9 g/cm^3^ (PREM).", 'mcdonough1995', 'prem1981'),
        q("Does heat cross the core–mantle boundary?", "Yes, from the core into the mantle, which helps drive mantle convection (Garnero et al. 2016). How much is highly uncertain: an estimated 5–13 TW (Davies & Davies 2010, Section 4.8).", 'garnero2016', 'davies2010'),
        q("What lies just above the core–mantle boundary?", "Two continent-sized regions where shear waves are slow, one beneath the Pacific and one beneath the Atlantic and western and southern Africa, and thin patches where they are very slow (Garnero et al. 2016). Columns interpreted as plumes seem to rise from some of these patches (French & Romanowicz 2015).", 'garnero2016', 'french2015'),
        q("How deep is the core–mantle boundary?", "About 2,890 km in both PREM and ak135.", 'prem1981', 'ak1351995'),
        q("How far is the core–mantle boundary from Earth's centre?", "About 3,480 km, a little over half of Earth's radius (Song & Richards 1996).", 'song1996'),
      ],
    }),
  ],
};
