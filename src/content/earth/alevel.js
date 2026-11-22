// A-level text. Every claim comes from a checked reference (docs/values-to-check.md).
import { part, q } from './part.js';

const P = (id, kind, title, text) => part('alevel', id, kind, title, text);

export default {
  level: 'alevel',
  parts: [
    P('crust', 'layer', 'Crust', {
      short: "The outer layer of rock: about 7 km thick under the oceans and about 40 km under the continents.",
      long: "Ocean crust is made at mid-ocean ridges. Mantle rock rises beneath the ridge, partly melts as the pressure on it drops, and the melt builds new crust about 7 km thick (White et al. 1992). Continental crust is thicker, about 40 km on average and up to 70 km under Tibet (Mooney et al. 1998). It is also richer in silica: about 61% SiO~2~, against about 45% in the mantle below (Rudnick & Gao 2003; McDonough & Sun 1995).",
      simplification: "drawn about four times too thick so it can be seen, and at one thickness (35 km) everywhere. Real crust is about 7 km thick under oceans and about 40 km under continents.",
      questions: [
        q("Why is the crust thinner under the oceans?", "Ocean crust forms at mid-ocean ridges, where rising mantle rock partly melts as the pressure drops. That melt makes a layer about 7 km thick (White et al. 1992). Continental crust averages about 40 km (Mooney et al. 1998).", 'white1992', 'mooney1998'),
        q("Where is the crust thickest?", "Under Tibet, where it reaches about 70 km (Mooney et al. 1998).", 'mooney1998'),
        q("What is the crust made of?", "Continental crust is about 61% silica, SiO~2~ (Rudnick & Gao 2003). Ocean crust is basalt formed from melted mantle rock at mid-ocean ridges (White et al. 1992).", 'rudnick2003', 'white1992'),
        q("How is the crust different from the mantle?", "It has more silica and less magnesium. Continental crust is about 61% SiO~2~; mantle rock is about 45% SiO~2~ and 38% MgO (Rudnick & Gao 2003; McDonough & Sun 1995). It is also less dense: 2.6–2.9 g/cm^3^ against about 3.4 at the top of the mantle (PREM).", 'rudnick2003', 'mcdonough1995', 'prem1981'),
        q("How dense is the crust?", "2.6–2.9 g/cm^3^ in PREM, the reference Earth model. The mantle rock below is denser, about 3.4 g/cm^3^.", 'prem1981'),
        q("How much heat comes out through the crust?", "About 47 TW leaves the whole Earth (Davies & Davies 2010). Of that, about 6–8 TW is thought to be made inside the crust itself.", 'davies2010'),
        q("Is the crust the same thing as a tectonic plate?", "No. A plate is a piece of the lithosphere: the crust plus the top of the mantle, about 80 km thick in PREM. New plate is made at mid-ocean ridges and old plate sinks back into the mantle at subduction zones (Garnero et al. 2016).", 'prem1981', 'garnero2016'),
      ],
    }),
    P('lithosphere', 'layer', 'Lithosphere', {
      short: "The crust plus the top of the mantle, about 80 km thick in PREM. Tectonic plates are pieces of it.",
      long: "In PREM, the mantle rock just under the crust carries seismic waves fast, down to 80 km. Dziewonski & Anderson (1981) call this region the LID and treat it as the main part of the seismic lithosphere. Below 80 km the waves slow: that is the asthenosphere. New lithosphere is made at mid-ocean ridges, and old lithosphere sinks back into the mantle at subduction zones (Garnero et al. 2016).",
      simplification: "only the mantle part (35–80 km) is drawn here; the crust above it is part of the lithosphere too. PREM is a global average, so it gives one thickness, 80 km.",
      questions: [
        q("What is the difference between the crust and the lithosphere?", "The crust is the top layer of rock, set apart by what it is made of. The lithosphere is the crust plus the top of the mantle, about 80 km thick in PREM, set apart by how seismic waves travel through it.", 'prem1981'),
        q("How thick is the lithosphere?", "About 80 km in PREM, which is an average for the whole Earth.", 'prem1981'),
        q("How do we know where the lithosphere ends?", "From seismic waves. In PREM they travel fast through the LID, down to 80 km, and more slowly in the low-velocity zone below it.", 'prem1981'),
        q("Where is new lithosphere made?", "At mid-ocean ridges, where plates move apart and melted mantle rock forms new crust (Garnero et al. 2016; White et al. 1992).", 'garnero2016', 'white1992'),
        q("What happens to old lithosphere?", "It sinks into the mantle at subduction zones. Seismic images show many sinking slabs stalling around 660 km depth, and some going deeper (Fukao & Obayashi 2013).", 'garnero2016', 'fukao2013'),
        q("How dense is the mantle part of the lithosphere?", "About 3.4 g/cm^3^ in PREM, denser than the 2.6–2.9 g/cm^3^ of the crust above.", 'prem1981'),
      ],
    }),
    P('asthenosphere', 'layer', 'Asthenosphere', {
      short: "The layer under the plates, about 80–220 km deep in PREM, where seismic waves travel more slowly.",
      long: "PREM calls this region the low-velocity zone. Almost everywhere else in the mantle, seismic waves speed up as they go deeper; here they slow slightly instead. Shear waves still pass through it, so it is solid rock. The plates above move as part of the slow convection of the mantle beneath them (Garnero et al. 2016).",
      simplification: "drawn as PREM's low-velocity zone, 80–220 km deep. PREM is a global average, so it gives one depth range for the whole Earth.",
      questions: [
        q("Why is it called the low-velocity zone?", "Seismic waves travel more slowly here than in the lithosphere above. In PREM the shear-wave speed falls from about 4.47 km/s at 80 km to about 4.42 km/s at 220 km.", 'prem1981'),
        q("Is the asthenosphere liquid?", "No. Shear waves pass through it, and they cannot travel through a liquid. The outer core, where shear waves stop, is the only liquid layer in PREM.", 'prem1981'),
        q("How deep is the asthenosphere?", "About 80–220 km in PREM.", 'prem1981'),
        q("Why do the plates move?", "Plate movement is linked to the slow convection of the mantle underneath, over geological time (Garnero et al. 2016).", 'garnero2016'),
        q("Where does the melt for new ocean crust come from?", "From mantle rock rising beneath mid-ocean ridges. As it rises the pressure drops and part of it melts (White et al. 1992).", 'white1992'),
        q("What is below the asthenosphere?", "More mantle rock, all the way down to the core at about 2,890 km.", 'prem1981', 'ak1351995'),
      ],
    }),
    P('mantle', 'layer', 'Mantle', {
      short: "Solid rock from the base of the crust down to 2,890 km, just under halfway to the centre. Over geological time it flows.",
      long: "Shear waves pass through the mantle, so it is solid (PREM). It still moves, very slowly: it is heated from below by the hot outer core and from within by the decay of uranium, thorium and potassium, and it convects (Garnero et al. 2016). Cold plates sink into it at subduction zones, and many stall near 660 km (Fukao & Obayashi 2013). Broad plumes of hot rock rise from its base under Hawaii, Iceland and Samoa (French & Romanowicz 2015). Its rock is about 45% silica and 38% magnesium oxide (McDonough & Sun 1995).",
      simplification: "drawn as one layer from 220 km down. The lithosphere and asthenosphere above are mantle rock too, drawn as their own layers. The top 660 km of the model is stretched so thin layers show; below that the scale is true.",
      questions: [
        q("If the mantle is solid, how can it flow?", "Shear waves show it is solid over the seconds an earthquake wave takes to pass. Over geological time it still convects, driven by heat from the core and from radioactive decay (Garnero et al. 2016).", 'prem1981', 'garnero2016'),
        q("What heats the mantle?", "The hot outer core below, and the decay of uranium, thorium and potassium inside it (Garnero et al. 2016). Of the 47 TW leaving Earth's surface, about 24–38 TW comes from heat made in the mantle and from the planet slowly cooling (Davies & Davies 2010).", 'garnero2016', 'davies2010'),
        q("What is the mantle made of?", "Rock that is about 45% silica (SiO~2~) and 38% magnesium oxide (MgO), with about 8% iron oxide (McDonough & Sun 1995).", 'mcdonough1995'),
        q("What happens to plates that sink into the mantle?", "Seismic images show most either lie flat above the 660 km boundary or are held just below it, at 660–1,000 km. Some sink further (Fukao & Obayashi 2013).", 'fukao2013'),
        q("What is a mantle plume?", "A column of hot rock rising through the mantle. French & Romanowicz (2015) imaged broad ones rising from the base of the mantle under Hawaii, Iceland and Samoa; the one under Hawaii is about 800–1,000 km wide. Whether plumes feed hotspot volcanoes has been debated.", 'french2015'),
        q("How does the density change with depth?", "From about 3.4 g/cm^3^ at the top to about 5.6 g/cm^3^ at the bottom (PREM). The rock is squeezed harder the deeper it is.", 'prem1981'),
        q("How thick is the mantle?", "It runs from the base of the crust, about 35 km, to about 2,890 km: about 2,850 km of rock, just under halfway to Earth's centre (Garnero et al. 2016).", 'prem1981', 'ak1351995', 'garnero2016'),
        q("Is the mantle the same everywhere?", "No. Seismic waves travel faster through the deep mantle under past subduction zones, and much slower through two huge regions at its base, one under Africa and one under the Pacific (Garnero et al. 2016).", 'garnero2016'),
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
        q("How much of the Earth is core?", "The core is about 32.5% of Earth's mass (McDonough & Sun 1995).", 'mcdonough1995'),
        q("How dense is the outer core?", "9.9 g/cm^3^ at the top to 12.2 g/cm^3^ at the bottom in PREM, against about 5.6 g/cm^3^ at the bottom of the mantle.", 'prem1981'),
        q("How big is the core?", "Its outer edge is about 3,480 km from the centre (Song & Richards 1996), at a depth of about 2,890 km.", 'song1996', 'prem1981'),
        q("Does heat come out of the core?", "Yes. It heats the mantle from below (Garnero et al. 2016). Estimates of how much are uncertain, about 5–13 TW of the 47 TW leaving Earth's surface (Davies & Davies 2010).", 'garnero2016', 'davies2010'),
      ],
    }),
    P('inner-core', 'layer', 'Inner core', {
      short: "A solid ball of iron about 1,220 km in radius at the centre. It is slowly growing as the outer core freezes onto it.",
      long: "Shear waves travel through it at about 3.5 km/s, so it is solid (PREM). Seismologists found it in 1936 (Song & Richards 1996). The core has been cooling since it formed, and as it cools, liquid iron freezes onto the inner core. In 1996 Song & Richards reported that the inner core turns about 1° a year faster than the mantle. Yang & Song (2023) found that difference paused around 2009.",
      simplification: "drawn as a plain solid ball. Seismic waves cross it faster from pole to pole than across the equator, and its eastern and western halves differ (Deuss 2014).",
      questions: [
        q("How do we know the inner core is solid?", "Shear waves travel through it, at about 3.5 km/s in PREM. They cannot cross a liquid.", 'prem1981'),
        q("When was the inner core discovered?", "In 1936, from seismic waves (Song & Richards 1996).", 'song1996'),
        q("Is the inner core growing?", "Yes, slowly. As the core cools, liquid iron freezes onto it (Song & Richards 1996).", 'song1996'),
        q("Does the inner core spin?", "It turns with the rest of the Earth, but not quite at the same rate. In 1996 Song & Richards reported it about 1° a year faster than the mantle; Yang & Song (2023) found that difference paused around 2009.", 'song1996', 'yang2023'),
        q("How dense is the centre of the Earth?", "About 13 g/cm^3^ in PREM, more than four times as dense as surface rock.", 'prem1981'),
        q("How big is the inner core?", "About 1,220 km in radius (Song & Richards 1996), less than 1% of Earth's volume.", 'song1996', 'ishii2002'),
        q("Is the inner core the same all the way through?", "No. Seismic waves cross it faster from pole to pole than across the equator, and the western half differs from the eastern (Deuss 2014).", 'deuss2014'),
      ],
    }),
    P('moho', 'boundary', 'Moho', {
      short: "The base of the crust, where seismic waves speed up as they pass into mantle rock.",
      long: "In PREM, P waves speed up from 6.8 km/s in the lower crust to 8.1 km/s just below the Moho, and the density jumps from 2.9 to 3.4 g/cm^3^. The Moho is about 7 km below the sea floor and about 40 km under the continents (White et al. 1992; Mooney et al. 1998).",
      simplification: "drawn at 35 km everywhere, the ak135 average. The real Moho is shallower under the oceans and deeper under the continents.",
      questions: [
        q("How is the Moho found?", "From seismic waves. P waves speed up sharply as they cross it, from about 6.8 to about 8.1 km/s in PREM. Christensen & Mooney (1995) mapped the continental crust this way.", 'prem1981', 'christensen1995'),
        q("How deep is the Moho?", "About 7 km below the sea floor and about 40 km under the continents, reaching about 70 km under Tibet (White et al. 1992; Mooney et al. 1998).", 'white1992', 'mooney1998'),
        q("What changes at the Moho?", "The rock: crust above, rich in silica; mantle rock below, about 45% silica and 38% magnesium oxide (McDonough & Sun 1995). Density rises from 2.9 to 3.4 g/cm^3^ (PREM).", 'mcdonough1995', 'prem1981'),
        q("Is the Moho the bottom of the tectonic plate?", "No. The plate (the lithosphere) carries on below the Moho, to about 80 km in PREM.", 'prem1981'),
        q("Do all Earth models put the Moho at the same depth?", "No. PREM uses 24.4 km and ak135 uses 35 km. Both are averages for the whole planet.", 'prem1981', 'ak1351995'),
        q("How is the ocean Moho made?", "At mid-ocean ridges, melt from rising mantle rock builds crust on top of the mantle. The base of that new crust is the Moho, about 7 km down (White et al. 1992).", 'white1992'),
      ],
    }),
    P('cmb', 'boundary', 'Core–mantle boundary', {
      short: "Where the rocky mantle meets the liquid iron core, about 2,890 km down. It has the largest jump in density inside the Earth.",
      long: "Density jumps from 5.6 to 9.9 g/cm^3^ across it. Shear waves travel through the mantle rock at about 7.3 km/s but stop at the liquid iron (PREM). Heat crosses from the core into the mantle and helps drive mantle convection (Garnero et al. 2016). Broad plumes of hot rock seem to rise from patches just above it (French & Romanowicz 2015).",
      simplification: "drawn as a smooth sphere. Just above it sit two continent-sized regions where seismic waves are slow, and thin patches where they are very slow (Garnero et al. 2016).",
      questions: [
        q("What happens to seismic waves at the core–mantle boundary?", "Shear waves stop, because the core below is liquid. P waves slow sharply, from about 13.7 to about 8.1 km/s in PREM.", 'prem1981'),
        q("Why does the density jump so much?", "Rock meets metal. The mantle is silicate rock (McDonough & Sun 1995); the core is mostly iron. Density goes from 5.6 to 9.9 g/cm^3^ (PREM).", 'mcdonough1995', 'prem1981'),
        q("Does heat cross the core–mantle boundary?", "Yes, from the core into the mantle, which helps drive mantle convection (Garnero et al. 2016). How much is uncertain: about 5–13 TW (Davies & Davies 2010).", 'garnero2016', 'davies2010'),
        q("What lies just above the core–mantle boundary?", "Two continent-sized regions where shear waves are slow, one under Africa and one under the Pacific, and thin patches where they are very slow (Garnero et al. 2016). Some plumes seem to rise from these patches (French & Romanowicz 2015).", 'garnero2016', 'french2015'),
        q("How deep is the core–mantle boundary?", "About 2,890 km in both PREM and ak135.", 'prem1981', 'ak1351995'),
        q("How far is the core–mantle boundary from Earth's centre?", "About 3,480 km, a little over half of Earth's radius (Song & Richards 1996).", 'song1996'),
      ],
    }),
  ],
};
