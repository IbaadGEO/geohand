# Values to check

**Source checks dated 2026-11-22.** The entries below identify printed values and calculations. PREM densities and velocities at specific depths are evaluated from the Table I polynomials. The depth transform, schematic geometry and citation display are checked in code.

The references listed below support the geological values. Drawing choices are documented separately. A reference gets a `checked` date only when all its lines are ticked.

## External review, 2026-11-22

An external reviewer checked the numbers, A-level text, lesson and drawing notes against 16 of the PDFs (Deuss 2014 was not in their set; it was checked separately, section 22). The fixes below use the cited papers for geological claims and the code for geometry and citation display.

- The 32.5% of Earth's mass is the whole core, not the outer core (McDonough & Sun p. 244).
- Inner-core rotation: Yang & Song (2023) infer relative rotation nearly stopped around 2009 and may have reversed slightly during their observation period, through 2021 (pp. 182, 184–185), as part of a proposed oscillation. Song & Richards' rate is shown as the 1996 estimate, and their 0.3 s is for travel-time residuals relative to PREM.
- PREM has a liquid ocean layer, so the outer core is not "the only liquid layer in PREM".
- Ocean crust is basaltic lavas and dykes (layer 2) over a layer that is probably mainly gabbro (layer 3) (White et al. p. 19,683), not "basalt".
- 7 km is the thickness of normal oceanic igneous crust, measured from its top, not depth below the sea floor.
- Lithosphere and asthenosphere: PREM's seismic lid (to 80 km) and low-velocity zone (80–220 km) are now named as stand-ins, not definitions.
- ak135's 35 km Moho reflects its continental-style crust (Kennett et al. p. 110); PREM uses 24.4 km. Neither is "an average for the whole planet" in the same sense.
- The mantle's top is the Moho, whose depth varies; 2,850 km of mantle is for this model's 35 km crust.
- Composition values are bulk weight % as oxides, and the mantle figures are the pyrolite model; Mg# is shown on its own row with its definition.
- Plumes: French & Romanowicz image slow-wave conduits and interpret them as plumes; v~S~ is reduced by more than 1.5–2%; 800–1,000 km is the Hawaii width; the 1,500–2,000 °C figure is from their resolution test.
- Slabs: "most" refers to imaged slabs in Fukao & Obayashi's survey around the Pacific.
- Pearson et al.: 1.4–1.5 wt% is a minimum with large uncertainty, in the inclusion; about 1 wt% is their estimate for the mantle sampled; "first find" is to the authors' knowledge.
- Davies & Davies: continental mean heat flow is 70.9 mW m⁻² (Table 7, p. 20); 73 is a Section 3 component. The 6–8, 5–13 and 24–38 TW figures are budget estimates (Section 4.8, p. 22).
- PREM v~S~ at the base of the mantle rounds to 7.26 km/s, not 7.27. Upper-mantle values at 220 km are from just below 220 km; lid and low-velocity-zone values are effective isotropic.
- Lower-mantle and upper-mantle bands name which model sets each end (ak135 660 km; PREM 670 km and 400 km).
- Lay et al.'s 1,000 ± 500 K is a contrast across the thermal boundary layer at the base of the mantle, not a jump at the boundary itself.
- LLSVPs: "one interpretation" is thermochemical piles; the density excess is a geodynamic-model result. The drawn blobs are schematic cross-sections. At A-level the African province is now "beneath the Atlantic and western and southern Africa".
- The innermost inner core is labelled "proposed"; its radius and anisotropy are from the Ishii & Dziewoński model.
- 70 km under Tibet is the CRUST 5.1 value; Christensen & Mooney report 72 km from refraction (p. 9764).
- Christensen & Mooney's 61.8 wt% SiO~2~ is labelled as their model mean, beside Rudnick & Gao's 60.6.
- The depth scale: depths above 660 km are redrawn; below 660 km intervals are about 1% thicker than true-scale intervals, while absolute depths remain shifted.
- Drawing: under oceanic crust there was a 28 km gap down to a Moho drawn at 35 km. The Moho and the lithospheric mantle now follow the crust drawn above them (7 km under oceans, 35 km under continents).
- The panel shows page locators for numerical values and the A-level text and questions. A-level lesson steps show author names and page locators.

## 1. PREM: Dziewonski & Anderson (1981), Table I, p. 308

Table I gives each layer as a formula in x = radius ÷ 6,371 km. The densities and speeds below are those formulas worked out at the depth named (depth = 6,371 − radius). Check the boundaries, the constant values in the crust, and that v~S~ is 0 in the outer core; the rest follows from the formulas.

- [x] Region radii: inner core to 1,221.5; outer core to 3,480.0; lower mantle to 5,701.0, with internal breaks at 3,630 and 5,600; transition zone to 5,971.0, with an internal break at 5,771; then 6,151.0, LVZ to 6,291.0, LID to 6,346.6, crust to 6,368.0, ocean to 6,371.0 km
- [x] So the depths are: ICB 5,149.5; CMB 2,891.0; 670; 600; 400; 220; LID base 80; Moho 24.4; ocean floor 3 km
- [x] Outer core v~S~ = 0
- [x] Crust: 2.900 g/cm³, v~P~ 6.800, v~S~ 3.900 km/s (15–24.4 km) and 2.600, 5.800, 3.200 (3–15 km)
- [x] Q~μ~: 600 in the LID, 80 in the LVZ (80–220 km)
- [x] Footnote: 24.4–220 km is transversely isotropic; effective isotropic v~P~ = 4.1875 + 3.9382x, v~S~ = 2.1519 + 2.3481x
- [x] Spot-check a few computed values against the paper's Table II if your copy is readable:
  - centre ρ 13.088
  - inner core top ρ 12.764, v~P~ 11.028, v~S~ 3.504
  - outer core top ρ 9.903, v~P~ 8.065
  - base of mantle ρ 5.566, v~P~ 13.717, v~S~ 7.265 (7.26 at two decimals)
  - lower mantle top (670 km) ρ 4.381, v~P~ 10.751, v~S~ 5.945
  - 400 km ρ 3.543 → 3.724

Checked: every Table I coefficient used for the computed values was read against the table, and the values below follow from them. Table II is an unreadable rotated scan, so the spot-checks were not compared with it; ak135 agrees independently (inner core v~S~ 3.504 in both).

## 2. ak135: Kennett, Engdahl & Buland (1995), Table 3, pp. 122–123

- [x] Velocity jumps listed at 20, 35, 210, 410, 660, 2,891.5 and 5,153.5 km depth
- [x] v~S~ = 0 through the outer core; 3.504 km/s just inside the inner core (5,153.5 km)

Also noted: ak135 repeats 210 km with a tiny jump (v~S~ 4.518 → 4.523) and has a model break at 2,740 km with no tabulated P- or S-speed jump. PREM's comparable basal segment starts at 2,741 km; the drawing uses the PREM segment for D″.

## 4. Heat flux: Davies & Davies (2010)

- [x] Abstract, p. 5: 47 ± 2 TW, from 38,347 measurements
- [x] Notes to Table 3, p. 15: 46.7 TW before rounding
- [x] Section 3, p. 16: components: continents 13.8 TW / 73 mW m⁻²; oceans older than 66.5 Ma 7.8 TW / 66 mW m⁻²; younger 23.1 TW / 128 mW m⁻²
- [x] Table 7, p. 20: final continental mean 70.9 mW m⁻²; global 46.7 TW

The "about half of all heat loss" note for young ocean floor is worked out (23.1 ÷ 46.7 = 49%), not quoted.

## 5. Christensen & Mooney (1995), abstract, p. 9761

- [x] Weighted average continental crust 41.1 km; extended crust 30.5 km; orogens 46.3 km
- [x] Average crustal P-wave speed 6.45 km/s; Pn 8.09 km/s
- [x] Mean crustal density 2,830 kg/m³; average SiO~2~ 61.8%

## 6. White, McKenzie & O'Nions (1992)

- [x] Abstract, p. 19,683: igneous oceanic crust 7.1 ± 0.8 km, bounds 5.0–8.5 km; rare earth element inversions 8.3 ± 1.5 km; near plumes 10.3 ± 1.7 km; aseismic ridges 20 ± 1 km
- [x] Table 8, p. 19,698 ("Mean Oceanic Crustal Structure (This Paper)"): Layer 2 2.5–6.6 km/s, 2.11 ± 0.55 km; Layer 3 6.6–7.6 km/s, 4.97 ± 0.90 km; total 7.08 ± 0.78 km

## 7. CRUST 5.1: Mooney, Laske & Masters (1998)

- [x] Plate 1 caption, p. 733: continental crust averages 38 km, from 20.5 km (extended crust) to 70 km (Tibetan Plateau)
- [x] Figure 3a, p. 730: averages shield 40.77, platform 38.96, orogen 42.66, extended 30.54 km (panel order confirmed from the page layout: 40.77 is in the Shield panel, 38.96 in the Platform panel)
- [x] Section 6, p. 734: oceanic crust 6–7 km; model uses 6.5 km; layer P-wave speeds 5.0, 6.6, 7.1 km/s
- [x] Section 8, p. 735: mean Moho depths 21.8 km (global), 38.0 km (continents), 12.6 km (oceans, with 4.0 km of water)
- [x] p. 744: continental crust typically 30–45 km, global average 38 km

## 8. Rudnick & Gao (2003)

- [x] Section 3.01.3.1, pp. 20–21: for a ≈40 km crust, middle crust 12–23 km, lower crust from 23 km to the Moho
- [x] Table 11, p. 53: SiO~2~ 66.6 / 63.5 / 53.4 / 60.6 (upper / middle / lower / total); MgO 2.48 / 3.59 / 7.24; K~2~O 2.80 / 2.30 / 0.61

### Notes

- CRUST 5.1 (p. 734) quotes White et al. as 7.2 km; White et al.'s own abstract gives 7.1 ± 0.8 km (Table 8: 7.08). GeoHand uses White et al.'s figure.
- The Christensen & Mooney header in the PDF text reads "NO. B7", but the publisher's download line says B6, which matches the DOI record. The reference keeps B6.
- #9 (Fischer et al. 2010, lithosphere–asthenosphere boundary) was not in this batch.

## 10. McDonough & Sun (1995)

- [x] Abstract, p. 223: core is Fe–Ni with 5–15% of a light element (about 10 ± 5%; O, S, Si); about 86% of Earth's Fe is in the core
- [x] Table 4, p. 237, pyrolite column 1: SiO~2~ 45.0, Al~2~O~3~ 4.45, FeO 8.05, MgO 37.8, CaO 3.55, Na~2~O 0.36; 100Mg/(Mg+Fe) 89.3
- [x] Section 6, p. 244: the whole core (outer and inner) is about 32.5% of Earth's mass

## 12. Pearson et al. (2014)

- [x] Abstract, p. 221: transition zone 410–660 km; wadsleyite and ringwoodite hold up to about 2.5 wt% water; ringwoodite in a diamond from Juína, Brazil; the zone is hydrous to about 1 wt% locally; olivine (Mg~2~SiO~4~) dominant to about 400 km
- [x] p. 222: the inclusion holds at least 1.4–1.5 wt% H~2~O (FTIR minimum, large uncertainty)
- [x] p. 223: about 1.0 wt% for the transition zone the diamond sampled

## 13. Fukao & Obayashi (2013), abstract, p. 5920

- [x] More than 10 million travel times; Stage I stagnant above the 660, II penetrating, III trapped at 660–1,000 km, IV descending into the deep lower mantle; most slabs at Stage I or III

## 15. French & Romanowicz (2015)

- [x] Abstract, p. 95: plumes rooted at the base of the mantle; ultralow-velocity zones under Hawaii, Iceland and Samoa
- [x] p. 95: v~S~ reduced by more than 1.5–2%; conduits extend up to at least 1,000 km depth
- [x] p. 96: root patches 500–800 km across; a ~200 km-wide plume would need >10% reduction (1,500–2,000 °C excess); 800–1,000 km wide under Hawaii
- [x] p. 97: 400–500 °C excess plausible

Section 3 was checked on 2026-11-22 against the text of the owner's PDFs, like the sections above. Frost (2008, #11) and Grand (2002, #14) were not in this batch.

## 16. Lay, Williams & Garnero (1998)

- [x] p. 461: thermal boundary layer contrast 1,000 ± 500 K; ambient about 3,000 K; plumes may carry 10–15% of surface heat flux; D″ is the lowermost 200 km; 1.5–3% P and S discontinuities 150–300 km above the CMB; laterally varying S-wave anisotropy
- [x] p. 462: ultralow-velocity layer 5–40 km thick with P and S reductions over 10%; extensive beneath the central Pacific, Alaska, Iceland and Africa

## 19. Garnero, McNamara & Shim (2016)

- [x] p. 481: two nearly antipodal LLSVPs, beneath the Pacific and beneath the Atlantic and western and southern Africa; about 30% of the CMB area; reduced velocities up to 1,200 km above the CMB in places; Pacific round, African elongated north–south and stretched eastward in the south; abstract calls them thermochemical piles denser than the surrounding mantle
- [x] p. 482: ULVZs commonly 5–20 km thick, within and near LLSVP margins
- [x] p. 485: an intrinsic density increase of up to a few per cent is enough to form piles

Section 4 was checked on 2026-11-22 against the text of the owner's PDFs. Lay et al. give ULVZs as 5–40 km thick and Garnero et al. as commonly 5–20 km; both are shown, each with its own source. D″ is the lowermost ~200 km in Lay et al., while PREM's basal region is 150 km (2,741–2,891 km); the model draws PREM's.

## 23. Ishii & Dziewoński (2002), abstract, p. 14026

- [x] Innermost inner core radius about 300 km; slowest direction about 45° from east–west, against east–west in the overlying inner core; may be fossil evidence of early inner-core history; the inner core is less than 1% of Earth's volume

## 24. Song & Richards (1996)

- [x] p. 221: rotation about 1° per year faster than the mantle and crust; inner-core radius about 1,220 km
- [x] p. 222: BC−DF residuals on South Sandwich Islands to College, Alaska (COL) paths rose about 0.3 s over 1967–95
- [x] p. 223: best estimate 1.1° per year faster

## 25. Yang & Song (2023)

- [x] Abstract, p. 182: differential relative rotation nearly stopped around 2009 and may have reversed slightly within the period studied; about a seven-decade oscillation with another turning point in the early 1970s; matches length-of-day and magnetic-field changes; inner-core radius about 1,220 km
- [x] p. 184: overturn in late 2009, 95% CI 2009.0–2011.0

Section 5 was checked on 2026-11-22 against the text of the owner's PDFs. The Song & Richards PDF has a font that the usual text extractor cannot read, so its text was taken with a second extractor (pdfminer). Song & Richards's estimate of roughly 1° per year refers to an earlier observation period. Yang & Song infer a near-zero relative rate around 2009 and a possible slight reversal within their observation period, through 2021.

## 22. Deuss (2014)

Checked against the publisher version in the Utrecht University repository (dspace.library.uu.nl/handle/1874/307029).

- [x] Abstract, p. 103: polar direction faster than equatorial; top 60–80 km isotropic; evidence for an innermost inner core less compelling; western hemisphere more anisotropic, slower and less attenuating
- [x] p. 108: 3–4% anisotropy down to the centre; isotropic layer 50–80 km
- [x] p. 111: innermost inner core reported at 300–500 km radius, but "not compelling"; no reflection found; may be an artefact of averaging over the hemispheres (Lythgoe et al. 2013)
- [x] p. 112: western hemisphere about 1.5% slower in the top 100 km
- [x] p. 113: west up to 5% anisotropy below the isotropic layer; east less than 0.7%
- [x] p. 115: body-wave rotation rates fell from 1–3° per year to under 0.5° per year; some studies find none; Waszek et al. (2011) 0.1–1° per million years

Deuss doubts the innermost inner core that Ishii & Dziewoński (2002) proposed. The postgrad panel shows both sides rather than dropping the part.

## Section 6: papers added 2026-11-23

Checked against the text of the owner's PDFs (text extracted locally; the papers are not stored in the project). Page numbers are the journal's.

### 11. Frost (2008), Elements 4, 171–176
- [x] p. 171: peridotite's Al-bearing phase changes with depth: plagioclase (<30 km), spinel (30–70 km), garnet (>70 km); transition zone ~410 to 660 km; its discontinuities are generally accepted to arise from mineral phase transformations
- [x] p. 172: ~14 GPa (410 km) olivine → wadsleyite; ~17.5 GPa (520 km) wadsleyite → ringwoodite; ~24 GPa (660 km) ringwoodite → perovskite-structured (Mg,Fe)SiO₃ + ferropericlase, the beginning of the lower mantle; pyrolite has about 56% olivine (range of models 49–62%, at 1.5 GPa)
- [x] p. 174: average 410 is actually at 418 km, implying 1,480 °C, with global topography of ±100 °C
- [x] p. 175: the 410 is raised by over 50 km in some subduction zones, consistent with temperatures over 600 °C lower; dry olivine–wadsleyite coexistence ~0.25 GPa or 7 km; wadsleyite to ringwoodite ~25 km; ringwoodite to perovskite <4 km plus a broader garnet transformation over 30–40 km; 1 Hz reflections imply the 660 is ≤2 km thick and the 410 a 7 km gradient ending in a sharp jump; wadsleyite holds the equivalent of 3 wt% H₂O

Note: Pearson et al. give up to about 2.5 wt% water for wadsleyite and ringwoodite; Frost gives 3 wt% for wadsleyite. Both are shown with their sources.

### 9. Fischer et al. (2010), Annu. Rev. Earth Planet. Sci. 38, 551–575
- [x] p. 551: oceanic lithosphere consistent with a dry, chemically depleted layer over a hydrated, fertile asthenosphere; beneath cratons, evidence for a deeper asthenosphere
- [x] p. 553: in continental cratons, xenoliths indicate depleted mantle compositions to roughly 200 km
- [x] p. 565: Kawakatsu et al. (2009): Philippine Sea Plate 25 Ma lithosphere ~55 km thick, 49 Ma 76 ± 1.8 km; Pacific 129 Ma 82 ± 4.4 km; modelled by a cooling plate with asymptotic thickness 104 km; at ocean islands reported depths range from 40 to 140 km, much of it not correlated with plate age

### 17. Murakami et al. (2004), Science 304, 855–858
- [x] p. 855: MgSiO₃ perovskite transforms to a new phase (stacked SiO₆-octahedral sheets) above 125 GPa and 2,500 K, ~2,700 km depth near the base of the mantle, with a density increase of 1.0–1.2%; the D″ discontinuity may be attributed to it
- [x] p. 857: the D″ discontinuity is seen in many regions ~200–300 km above the CMB (119–125 GPa) with a velocity increase of ~3%, its ubiquity debated; effects of FeO, Fe₂O₃ and Al₂O₃ not yet evaluated
- [x] p. 858: preferred orientation of platy post-perovskite may cause the S-wave anisotropy (V~SH~ > V~SV~) seen only below the D″ discontinuity

### 20. Hirose et al. (2013), Annu. Rev. Earth Planet. Sci. 41, 657–691
- [x] p. 658: core is 32% of Earth's mass and 16% of its volume; conditions from 136 GPa and ~4,000 K to 364 GPa and 5,000–6,000 K; density deficit relative to pure iron estimated at 5–10 wt%; candidate light elements Si, O, S, C, H
- [x] p. 682 (Summary points): inner core likely hcp iron alloy; considering the density jump at the ICB, the core may include ~6 wt% Si, ~3 wt% O and 1–2 wt% S; ICB temperature may be 5,200–5,700 K; stratification at the bottom of the outer core is well established

### 21. Anzellini et al. (2013), Science 340, 464–466
- [x] p. 464: melting temperature of iron at the ICB (330 GPa) 6,230 ± 500 K; ICB temperature bracketed between pure-iron melting and the alloy liquidus, expected ~700 K lower
- [x] p. 466: implies a CMB temperature of 4,050 ± 500 K, a thermal boundary layer of ~1,400 K at the base of the mantle and a high CMB heat flux (~10 TW)

Note: Anzellini et al.'s 6,230 K is the melting point of pure iron; Hirose et al.'s 5,200–5,700 K is for the ICB itself, lower because the alloy melts lower. Anzellini's ~1,400 K boundary layer and Lay et al.'s 1,000 ± 500 K are both shown with their sources.

## Section 7: data views added 2026-11-23

### 28. Katsura (2022), JGR Solid Earth 127, e2021JB023562
- [x] Abstract and Key Points: 1,839 (38) K at the 410; 1,646 (35) K at 50 km; 1,994 (40) K just above and 1,960 (40) K just below the 660; 2,587 (60) K at 2,800 km
- [x] Table 3, pp. 6–7: every row from 50 to 2,800 km copied into `src/content/earth/temperature.js` (jumps at 410, 520, 660 km kept)
- [x] p. 7: the profile ignores the thermal boundary layer at the base of the mantle, so the view joins it straight to the CMB value and says so
- [x] Core part of the view: straight lines between Anzellini et al. 4,050 K (CMB), 5,450 K (middle of Hirose et al. 5,200–5,700 K, ICB) and 5,500 K (middle of 5,000–6,000 K, centre). Midpoints accepted (2026-11-23)
- [ ] Hirose et al. Table 2 (p. 674) also has a "Preferred value" column (ranges reported as CMB 3,800–4,200 K, ICB 5,200–5,700 K). Read the preferred ICB value in the PDF; if it differs from 5,450 K, use it in `temperature.js` and its test

### 29. Seton et al. (2020) age grid
- [x] Spot checks of the packed 1° cells: Pacific east of Japan (30.5°N 150.5°E) 155 Ma; near the Mid-Atlantic Ridge (0.5°S 13.5°W) 13 Ma; central Pacific (0.5°N 150.5°W) 77 Ma; Tibet not ocean
- [x] Full author list (nine authors) filled in from Crossref, matching the ANU research portal; title is "data set", issue 21(10)

### 30. SEMUCB-WM1 (French & Romanowicz 2014)
- [x] Equator slice: S waves over 1.5% slower than average at 2,841 km beneath 150°W (Pacific) and 15°E (Africa); fast (+6.4%) at 80 km under 15°E; slow (−6.8%) at 80 km under 100°W (East Pacific)
- [x] Permission: Prof. Barbara Romanowicz (UC Berkeley) agreed by email on 2026-11-23 to the model being used and displayed, on condition that French & Romanowicz (2014) and the EMC DOI are credited. Both are shown in the Tomography view's key and in the README

### 31. Learning loops and lessons for the new parts (2026-11-23)
- [ ] Read the new drill-in questions in `src/content/earth/learn.js`: Intermediate `lab-measured` and `cmb`; Advanced `d520`, `post-perovskite`, `lab-measured` and `cmb`. Each restates the part's cited text
- [ ] Read the three new lesson steps in `src/content/earth/lessons.js`: `lab-measured` (Intermediate), `d520` and `post-perovskite` (Advanced)
- [ ] Advanced Temperature legend: the competing estimates (Hirose p. 682 and Anzellini p. 464 for the inner-core boundary; Lay p. 461 and Anzellini p. 466 for the boundary layer)

## Not used

These could not be obtained, so they were removed from the app and nothing cites them: Grand 2002 (#14), Garnero & McNamara 2008 (#18), and the three textbooks (Lowrie & Fichtner, Turcotte & Schubert, Stacey & Davis).
