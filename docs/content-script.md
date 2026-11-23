# GeoHand: full script

Every piece of text the app shows, generated from the source files. Edit freely; mark what you changed and the edits will be carried back into the code.

Formatting kept from the source: `~2~` = subscript, `^3^` = superscript, `**bold**`. ✔ marks the correct quiz option.

## 1. Screens, buttons and labels (index.html)

- GeoHand | Explore Earth’s interior using your hands
- GeoHand
- Explore what lies beneath the surface.
- Level
- ▶ Watch the tour
- A short overview of the whole Earth, played for you
- 🌋 Earthquake mission
- Find out how we know part of Earth is liquid
- Mode
- Explore
- Lesson
- Back
- Next
- Play this lesson for me
- See it
- Finish and start exploring
- Hand controls
- Keep your hand still until the ring fills
- Open your hand and move it
- Rotate the Earth
- Make a peace sign and hold it still
- Next layer
- Point at a part or button and hold
- Its name shows at your fingertip; it is picked when the ring fills
- Open both hands, then pull them apart
- Open the Earth; bring them together to close it
- Move two fists apart or together
- Zoom in or out
- Point at “Put Earth back together”
- Reset the model
- Choose a layer or boundary
- Move this part aside
- Learn about this part
- Start the lesson here
- Ask a question
- Controls
- Loading…
- Hand tracking
- Off
- Pull apart
- Auto-spin
- Reset view
- Camera background
- Hand skeleton
- Show all labels
- Reset the model (R, or double-click)
- Fullscreen
- Stuck?
- Help when you’re stuck
- Show the cross-section by
- Tour
- Pause
- Stop tour
- Getting started
- Pull it apart
- Skip the intro
- Mission
- Close the mission
- This part
- Close
- Put Earth back together
- Explore Earth’s interior with your hands or the mouse. With hands, camera processing stays in your browser; no camera footage is uploaded.
- Select your level
- Use your hands
- needs a camera
- Use the mouse
- Watch the tour
- a short overview, played for you
- With a mouse, click a layer to highlight it or drag it out. Drag the background to rotate and scroll to zoom. Use the arrow keys to move between layers; double-click or press R to reset.
- Made by Ibaad Sidik. Hand tracking built on
- HoloHand
- by Tuba Khan.

## 2. Views (top bar) and their legends

### Layers


### Composition

- **title:** Divided by what it’s made of
- **caption:** By what it’s made of: the Moho separates silica-rich crust from magnesium-rich mantle rock, and the core–mantle boundary separates rock from iron.
- **note:** Rudnick & Gao (2003), Table 11, p. 53; McDonough & Sun (1995), Table 4, p. 237 and Abstract, p. 223
- legend: Crust: rock richer in silica (continental crust about 61% SiO~2~)
- legend: Mantle: rock richer in magnesium, about 45% SiO~2~ and 38% MgO
- legend: Core: iron–nickel metal

### Behaviour

- **title:** Divided by how it behaves
- **caption:** By how it behaves: the base of the plates (80 km in this model) lies inside the mantle. Below it, PREM’s low-velocity zone: the same mantle rock, but S waves travel more slowly and are damped more.
- **note:** Garnero et al. (2016), p. 481; PREM, Table I and footnote, p. 308 (S-wave speeds; lid base at 80 km)
- legend: Lithosphere: the plates, crust plus top of the mantle
- legend: Asthenosphere: solid, but S waves slow down
- legend: Mantle below: solid, convects slowly
- legend: Outer core: liquid
- legend: Inner core: solid

### Density

- **title:** Density (g/cm³)
- **note:** PREM, Table I, p. 308
- scale: 2.6 to 13.1

### S-wave speed

- **title:** S-wave speed (km/s)
- **note:** 0 means liquid: S waves cannot pass. PREM, Table I, p. 308
- scale: 0 to 7.3

### Earthquake

- **title:** Waves from an earthquake at the top
- **caption:** Entering the liquid outer core, P waves slow down and bend, so a band of the surface gets no direct P waves. P waves that cross the inner core land in that band from about 133° on. S waves cannot enter the liquid at all. Waves that cross the core as P and turn back into S on the far side are not drawn.
- **more:** Why the shadows? Test yourself
- **note:** Ray paths calculated here from PREM wave speeds, Table I, p. 308. The clock is sped up.
- legend: P waves: travel through solid and liquid
- legend: S waves: stop at the liquid outer core
- legend: P shadow zone: no direct P waves 98°–141° away
- legend: S shadow zone: no direct S waves beyond 102°
- question: In this drawing, why do no direct S waves arrive more than about 102° from the earthquake?
  - ✔ The liquid outer core prevents S waves from passing through
  - The mantle absorbs them
  - They are too slow to arrive
  - explanation: PREM gives an S-wave speed of 0 in the outer core, so S waves cannot travel through it and the core casts an S-wave shadow. The mantle does not block them: PREM’s S-wave speeds there are above 4 km/s. Waves that cross the core as P and turn back into S on the far side can still arrive; they are not drawn here. (PREM, Table I, p. 308; paths calculated here from it)

### Crust thickness

- **title:** Crust thickness (km), CRUST1.0
- **caption:** Each dot shows the thickness of the crust beneath it. Thick continental crust stands out against thin ocean crust.
- **more:** Where is it thickest? Test yourself
- **note:** Laske, Masters, Ma & Pasyanos (2013), CRUST1.0: total crustal thickness on a 1° grid, excluding water (file crsthk.xyz). Real thickness, shown by colour; the drawn crust stays schematic.
- scale: 0 to 75
- question: Where is the crust thickest?
  - ✔ Under the Tibetan Plateau
  - Under the central Pacific
  - Under Iceland
  - explanation: Under the Tibetan Plateau: 74 km in CRUST1.0, against about 7 km under the central Pacific and about 33 km under Iceland. (CRUST1.0, crsthk.xyz, 1° cells centred at 32.5°N 90.5°E, 0.5°N 150.5°W and 64.5°N 18.5°W)

### Temperature

- **title:** Temperature (K)
- **caption:** Most of the mantle warms only slowly with depth, about 0.2–0.5 K per km. The big rise is at the bottom: across the hot boundary layer above the core, from about 2,600 K to about 4,050 K.
- **more:** Where does it heat up fastest? Test yourself
- **note:** Mantle, 50–2,800 km: the adiabat of Katsura (2022), Table 3, pp. 6–7. Joined straight below it, between cited points: about 4,050 K at the core–mantle boundary (Anzellini et al. 2013, p. 466), the middle of 5,200–5,700 K at the inner-core boundary and of 5,000–6,000 K at the centre (Hirose et al. 2013, pp. 658, 682). The top 50 km is left out: the lithosphere is colder than the adiabat and is not in the table.
- scale: 1600 to 5600
- **note at Advanced only:** Estimates differ. Temperature step across the boundary layer above the core: 1,000 ± 500 K (Lay et al. 1998, p. 461) against about 1,400 K (Anzellini et al. 2013, p. 466). Inner-core boundary temperature: 5,200–5,700 K (Hirose et al. 2013, p. 682). A different quantity, for comparison: pure iron melts at 6,230 ± 500 K at that pressure (Anzellini et al. 2013, p. 464); the core alloy melts lower.
- question: In the profile shown, where does the temperature rise most sharply?
  - ✔ In the boundary layer just above the core
  - In the transition zone
  - In the inner core
  - explanation: Just above the core: the adiabat reaches 2,587 K at 2,800 km (Katsura 2022), while the core–mantle boundary is about 4,050 K (Anzellini et al. 2013). In the mantle above, the adiabat rises only 0.2–0.5 K per km. The drawing joins those two estimates with a straight line; the real shape of the step is not known from them. (Katsura (2022), Table 3, pp. 6–7; Anzellini et al. (2013), p. 466)

### LAB depth

- **title:** Depth of the base of the plate under the oceans (km)
- **caption:** Ocean plates thicken as they age and cool, so the base of the plate is shallow near the mid-ocean ridges and deepens away from them. Each cell’s depth comes from its sea-floor age, not from a measurement there. The oldest floor, much of it in the western Pacific, is older than the measured ages and shows grey.
- **more:** Where is the plate thickest? Test yourself
- **note:** Seafloor age from Seton et al. (2020), averaged to 1° cells, turned into depth with the measured ages of Fischer et al. (2010), p. 565: 55 km at 25 Ma, 76 km at 49 Ma, 82 km at 129 Ma, joined straight. Grey: floor younger than 25 Ma or older than 129 Ma, outside the measured ages. Land is left blank.
- scale: 55 to 82
- question: On this map, where is the ocean plate drawn thickest?
  - ✔ On the oldest coloured floor, about 129 million years old
  - Along the mid-ocean ridges
  - Around Iceland
  - explanation: On the oldest floor still inside the measured ages. The map joins the measured depths straight and reaches 82 km at 129 million years, the depth given for Pacific lithosphere of that age. Older floor is grey. Near the ridges the floor is young and the plate thin. (Fischer et al. (2010), p. 565; Seton et al. (2020) age grid)

### Tomography

- **title:** S-wave speed against the average at that depth (%), along the equator
- **caption:** The colour shows S-wave speed: red is slower than average, blue faster. Slower is often read as hotter and faster as colder, but that is an interpretation, and composition can matter too. This slice crosses both broad slow regions at the base of the mantle: one beneath the Pacific, the other beneath the South Atlantic and Africa. Near the top, the old continent of Africa shows fast and the young East Pacific seafloor shows slow.
- **more:** What do the red patches at the bottom show? Test yourself
- **note:** SEMUCB-WM1 (French & Romanowicz 2014), EarthScope EMC visualisation file: a slice through the equator from 80 km down, each depth compared with its global average. Colours stop at ±2%; the top few hundred km goes beyond that. The cut is real: 0° longitude points the same way as on the crust map.
- scale: -2 to 2
- question: What are the two broad slow (red) regions at the base of the mantle?
  - ✔ The large low-shear-velocity provinces, beneath the Pacific and beneath the South Atlantic and Africa
  - Sinking ocean plates
  - The liquid outer core
  - explanation: They match the two nearly antipodal low-velocity provinces, one beneath the Pacific and the other beneath the South Atlantic and Africa (Garnero et al. 2016, p. 481). In this slice, S waves are over 1.5% slower than average at 2,841 km beneath 150°W and 15°E. (SEMUCB-WM1 equator slice; Garnero et al. (2016), p. 481)

### Earthquake facts used by the earthquake view

```
{
  "p": [
    98,
    141
  ],
  "s": 102,
  "innerFrom": 133
}
```

## Levels (start screen)

- **Normal:** The main layers in plain words, with the key terms explained.
- **Intermediate:** More boundaries, the numbers behind them and where they come from.
- **Advanced:** Debated ideas, competing estimates and the exact pages to check.

## Words used here (glossary, Normal level)

Shown under a part, beside the text that uses the word.

- **PREM:** Preliminary Reference Earth Model: the average wave speeds and density at every depth inside the Earth, worked out from earthquake waves. [prem1981]
- **ak135:** A later reference model of how fast earthquake waves travel at each depth. [ak1351995]
- **Pyrolite:** A model rock that stands for what the mantle is made of. [mcdonough1995]
- **S waves:** Earthquake waves that shake rock from side to side. Their speed drops to zero in liquid, so they cannot cross it. [prem1981]
- **Seismic:** To do with earthquake waves.

## Earthquake mission

**Mission: how can an earthquake show that part of Earth is liquid?**

1. Predict: Earthquakes send out two kinds of wave. Shear (S) waves cannot travel through liquid. Which layer do you think stops them?
   - The crust
   - The mantle
   - The outer core
   - The inner core
2. Open: Open the Earth to look inside: open both hands, then pull them apart. / Open the Earth to look inside: press Pull it apart, or the space bar.
3. Find: Find the boundary between rock and metal, the core–mantle boundary. Point at it and hold. / Find the boundary between rock and metal, the core–mantle boundary. Click it.
   - Found: Found it: the core–mantle boundary, 2,891 km down. Below it is the outer core, now pulled aside.
   - Show me: Here it is: the core–mantle boundary, 2,891 km down. Below it is the outer core, now pulled aside.
4. Evidence (Earthquake view): Now the evidence. Waves from an earthquake at the top: the amber P waves cross the outer core, bending as they slow down. The blue direct S waves all stop at its top.
5. Explain: What does that tell us about the outer core?
   - ✔ It is liquid: S waves cannot pass through it
   - It is hotter than the mantle
   - It is denser than the mantle
   - Explanation: It is liquid. PREM gives the outer core an S-wave speed of 0, so direct S waves cannot cross it, while P waves can. Density does jump at this boundary, from 5.57 to 9.90 g/cm^3^, but that is not what stops S waves. (PREM, Table I, p. 308)

## 3. How each part behaves (state labels)

- **plate:** Solid. Moves with its tectonic plate (Garnero et al. (2016), p. 481)
- **creep:** Solid: shear waves pass, but more slowly and more damped than in the plate above (PREM, Table I and footnote, p. 308)
- **convect:** Solid, yet convects slowly over geological time. Blue sheets: old plates sinking; most stall above 660 km or are trapped at 660–1,000 km, some sink deeper. Pale columns: plumes of hot rock rising from near the core, imaged up to about 1,000 km depth (PREM, Table I, p. 308; Garnero et al. (2016), p. 481; Fukao & Obayashi (2013), pp. 5920, 5932; French & Romanowicz (2015), pp. 95–96). Note: The cut face shows this as a schematic; where the slabs and plumes sit is illustrative
- **liquid:** Liquid: shear-wave speed is 0, so it flows (PREM, Table I, p. 308)
- **solid:** Solid: shear waves pass through it (PREM, Table I, p. 308)
- **gradient:** A gradual boundary: wave speeds rise over more than 10 km, and it is not seen everywhere (Frost (2008), p. 175)
- **measured:** A boundary measured with converted seismic waves: deeper under older ocean, deeper still under old continents (Fischer et al. (2010), pp. 553, 565)
- **boundary:** A boundary where seismic wave speeds change (PREM, Table I, p. 308)

## 4. Fixed prompts in the interface code

Messages, buttons and prompts written directly in the code (one line each, as in the file).

### src/main.js

- WebGL is unavailable. Try an up-to-date version of Chrome, Edge or Firefox with hardware acceleration enabled.
- Select a layer or boundary
- Pause the lesson
- Play this lesson for me
- Step ${lesson.i + 1} of ${lesson.steps.length}
- Sources: ${sources}
- Start the lesson
- Start the lesson here
- ${n} step${n === 1 ? '' : 's'}
- Put all parts back
- Move this part aside
- Learn about this part again (last time ${done.score} of ${done.total})
- Learn about this part: about 2 minutes
- s last question, so the tour never asks the drill-in
- ${tour.i + 1} of ${tour.steps.length}
- ${lead}${s.check.explain} (${s.check.where})
- ${VIEWS[i].label} data could not be loaded
- See it in ${VIEWS[i].label}
- The camera requires HTTPS or http://localhost.
- Camera access was blocked. Allow permission in your browser and reload.
- No camera was detected.
- Loading hand model…
- Hand tracking did not load, so use the mouse.
- The hand-tracking model did not load. It needs an internet connection initially; you can still use the mouse.
- The camera is not available, so use the mouse.
- Mouse controls are enabled.
- Continue to the next step
- Return to the full Earth model
- Reset the model
- Earthquake mission
- Watch the tour
- Replay the intro
- Open both hands to pull apart, or make two fists to zoom
- Both hands open · pull apart to open
- Two fists · move apart to zoom
- This is Earth
- Open your hand and move it to turn the Earth.
- Drag the Earth to turn it.
- Now let’s take it apart
- Raise both open hands and pull them apart. Each layer is named as it comes away.
- Press Pull it apart, or the space bar. Each layer is named as it comes away.
- Point at any part and hold still until the ring fills.
- Click any part to see what it is about.
- ${intro.turned * 100}%
- ${intro.index + 1} of 3
- Put back together
- Step ${mission.i + 1} of ${MISSION_STEPS.length - 1}
- Pull it apart
- See the evidence
- I have seen it
- Mission complete: the waves showed you that the outer core is liquid. Carry on with the outer core, or explore on your own.
- Learn more about the outer core
- Explore on my own

### src/tour.js

- ${n.label}: ${n.value}
- ${check.explain} ${check.where}
- Inside the Earth
- ${levelLabel} tour: ${parts.length} parts, starting at the surface and moving towards the centre.
- Back at the full Earth model. Select another layer to explore or restart the tour.

### src/ui/learnLoop.js

- How it works
- Supporting evidence
- Test ${k + 1}
- ${names[at]}: ${part.title}
- ${at + 1} of ${names.length}
- Show the answer
- Source: ${it.where}
- Yes, I knew it
- Not quite. The next steps explain the answer.
- Review the explanation
- This is the ${title}, highlighted in the model.
- How it is drawn: ${part.simplification}
- Compare the two cross-sections.
- Find it yourself: point at the ${title} on the model and hold still.
- Find it yourself: click the ${title} on the model.
- Move an open hand to turn the Earth for a better look.
- Drag to turn the Earth for a better look.
- View the evidence
- Here it is: the ${title}. Note where it sits, then go on.
- Found it: the ${title}.
- ${n.value} (${n.where})
- Test yourself
- ${part.title}: done
- You said you knew ${before ? 'the opening answer and ' : ''}${score} of ${loop.tests.length} answers. Answers marked “Not yet” are worth another look.
- Before: ${before ? 'you already knew the opening answer' : 'the opening answer was new to you'}. Now: ${score} of ${loop.tests.length} correct.
- You’ve completed this layer.
- Try the questions you missed again.
- Return to the layer

### src/ui/stuck.js

- Need help? Choose an option
- Return to the previous step
- Repeat this step
- Need help? Try one of these
- Ask a question

### src/ui/crustActivity.js

- Correct. The Moho is the boundary between crust and mantle. In PREM, compressional waves speed up across it.
- Base of the tectonic plate
- Same depth scale in both columns (0–45 km). Each starts at the top of its crust.
- Moho · ~${depth} km
- ${title} Moho, about ${depth} kilometres deep
- The Moho marks the base of each crustal column. The continental column is thicker, so its Moho is deeper below the top of the crust. These are representative values. Local thickness varies.
- ${title} crust, ${index === 0 ? 'shallower' : 'deeper'} line
- Now select the line in the other column.
- Try again. Find where the lighter crust meets the darker mantle in each column.
- Show the Moho

### src/ui/panel.js

- ${names[0]} et al.
- ${who} ${r.year}
- info-empty only-hands
- Hold a peace sign to highlight a layer, or point at one and hold still.
- info-empty only-mouse
- Click a layer, or choose one from the list above.
- ${state.shown || 'The dots’ motion shows this'}; speeds are not to scale.
- ${state.where}. ${note}
- Simplified: ${part.simplification}
- Common questions (${part.questions.length})
- Words used here
- Search the questions…
- Search the questions
- No answer is available yet.
- Send this question

### src/ui/ask.js

- Your question has been sent.
- You’ve reached the question limit. Please try again later.
- The question could not be sent. Your text is still here, so you can try again.
- Your question
- Only your written question is sent when you select Send. Camera data is never sent, and no IP address is stored. Answered questions may appear anonymously in the README.

## Normal

### Guided lesson (Normal)

1. **[crust]** The crust is separated from the other layers. In the two sections below, choose the line where crust meets mantle in each column.
   - Sources: White et al. (1992), p. 19,683; Mooney et al. (1998), Plate 1, p. 733 · activity: compare
2. **[moho]** In a new cross-section, compressional waves speed up where crust gives way to mantle. What would you call that boundary?
   - Sources: PREM, Table I and footnote, p. 308; Garnero et al. (2016), p. 481 · activity: transfer
3. **[lithosphere]** The crust and the top of the mantle together make the tectonic plates. This model uses PREM’s seismic lid base at 80 km as a proxy for the base of the plates.
   - Sources: Garnero et al. (2016), p. 481; PREM, pp. 300, 308
4. **[mantle]** Shear waves pass through the mantle, so it responds as a solid. Over geological time it convects, heated by the core below and by radioactive decay.
   - Sources: PREM, Table I, p. 308; Garnero et al. (2016), p. 481
5. **[outer-core]** At about 2,890 km, shear waves stop. The outer core is liquid iron, and its movement makes the magnetic field.
   - Sources: PREM, Table I, p. 308; Song & Richards (1996), p. 221
6. **[inner-core]** At the centre is a solid iron ball about 1,220 km in radius, still growing as the liquid around it freezes.
   - Sources: Song & Richards (1996), p. 221

### Tour (Normal)

- Opening: Normal tour: 8 parts, from the surface down to the centre.
- Each part: its Summary (below), plus the last question of its drill-in when that drill-in is multiple choice.
- Closing: Back to the whole Earth. Pick a layer to look closer, or play the tour again.

### Normal · Crust

*id: crust · layer*

**Summary:** The crust is Earth’s outermost layer of rock. Normal oceanic igneous crust is about 7 km thick, while continental crust averages about 40 km (White et al. 1992, p. 19,683; Mooney et al. 1998, p. 733).

**More detail:** Oceanic crust forms at mid-ocean ridges. Mantle rock rises beneath the ridge, partly melts as the pressure on it drops, and the melt builds igneous crust about 7 km thick: basaltic lavas and dykes on top, over a thicker layer that is probably mainly gabbro (White et al. 1992, pp. 19,683–19,684). Continental crust is thicker: about 40 km on average in the CRUST 5.1 model, reaching about 70 km under Tibet (Mooney et al. 1998, Plate 1, p. 733). Its bulk chemistry, expressed as oxides, is richer in silica: about 61% SiO~2~ by weight (Rudnick & Gao 2003, Table 11, p. 53), against about 45% in the pyrolite model of the mantle (McDonough & Sun 1995, Table 4, p. 237).

**How it is drawn:** All crust is drawn as one 35 km layer, shown about 4 times thicker than true scale so you can see it.

**Cited numbers:**

- Normal oceanic igneous crust: about 7 km thick (white1992: Abstract, p. 19,683)
- Continental crust in CRUST 5.1: about 40 km thick on average, reaching about 70 km under Tibet (mooney1998: Plate 1 caption, p. 733)
- Silica (SiO~2~) in continental crust: about 61% by weight (bulk composition, as oxides) (rudnick2003: Table 11, p. 53)
- Density: 2.6–2.9 g/cm^3^ (prem1981: Table I, p. 308)
- Heat flowing out of the whole Earth: about 47 TW (davies2010: Abstract, p. 5)

**Common questions:**

1. Q: How does normal oceanic igneous crust form, and how thick is it?
   A: At mid-ocean ridges, mantle rock rises and partly melts as the pressure on it drops. The melt builds igneous crust about 7 km thick (White et al. 1992).
   Source: White et al., pp. 19,683–19,684 [white1992]
2. Q: Where does CRUST 5.1 show especially thick crust?
   A: Under Tibet, where it reaches about 70 km (Mooney et al. 1998). Seismic refraction there has measured up to 72 km (Christensen & Mooney 1995).
   Source: CRUST 5.1, Plate 1, p. 733; Christensen & Mooney, p. 9764 [mooney1998, christensen1995]
3. Q: What is the crust made of?
   A: Continental crust is about 61% silica (SiO~2~) by weight (Rudnick & Gao 2003). Ocean crust has basaltic lavas and dykes over a thicker layer that is probably mainly gabbro (White et al. 1992).
   Source: Rudnick & Gao, Table 11, p. 53; White et al., pp. 19,683–19,684 [rudnick2003, white1992]
4. Q: How is continental crust different from the mantle?
   A: It has more silica: about 61% SiO~2~ by weight (Rudnick & Gao 2003), against about 45% SiO~2~ and 38% MgO in the pyrolite model of the mantle (McDonough & Sun 1995). It is also less dense: 2.6–2.9 g/cm^3^, against about 3.4 at the top of the mantle (PREM).
   Source: Rudnick & Gao, Table 11, p. 53; McDonough & Sun, Table 4, p. 237; PREM, Table I, p. 308 [rudnick2003, mcdonough1995, prem1981]
5. Q: How dense is the crust?
   A: 2.6–2.9 g/cm^3^ in PREM, the reference Earth model. The mantle rock below is denser, about 3.4 g/cm^3^.
   Source: PREM, Table I, p. 308 [prem1981]
6. Q: How much heat comes out through the crust?
   A: About 47 TW leaves the whole Earth. Of that, an estimated 6–8 TW is made inside the crust itself (Davies & Davies 2010, Section 4.8).
   Source: Davies & Davies, §4.8, p. 22 [davies2010]
7. Q: Is the crust the same thing as a tectonic plate?
   A: No. A plate is a piece of the lithosphere: the crust plus the top of the mantle. New plate is made at mid-ocean ridges and old plate sinks back into the mantle at subduction zones (Garnero et al. 2016). For the visualisation, the model uses the base of PREM's seismic lid, at 80 km, as a stand-in for the base of the plate.
   Source: Garnero et al., p. 481; PREM, Table I, p. 308 [garnero2016, prem1981]

**Learn about this part (drill-in):**

- How it works: crust comparison activity
- Opening question: Before you start: where do you think the crust is thicker?
  - Under the oceans
  - ✔ Under the continents
  - About the same everywhere
  - Explanation: Under the continents. Normal oceanic igneous crust is about 7 km thick; continental crust averages about 40 km.
  - Source: White et al. (1992), p. 19,683; Mooney et al. (1998), Plate 1, p. 733
- Test 1: How is new ocean crust made?
  - ✔ Mantle rock rises at a mid-ocean ridge and partly melts as the pressure on it drops
  - Continental crust sinks and melts into ocean crust
  - Lava from volcanoes on land flows out over the sea floor
  - Explanation: At mid-ocean ridges, mantle rock rises and partly melts as the pressure on it drops. The melt builds igneous crust about 7 km thick.
  - Source: White et al. (1992), pp. 19,683–19,684
- Test 2: Is the crust the same thing as a tectonic plate?
  - Yes: a plate is a piece of the crust
  - ✔ No: a plate is the crust plus the top of the mantle
  - Explanation: No. A plate is a piece of the lithosphere: the crust plus the top of the mantle.
  - Source: Garnero et al. (2016), p. 481
- Test 3: Which is denser?
  - The crust
  - ✔ The mantle rock just below the crust
  - They are about the same
  - Explanation: The mantle rock below, at about 3.4 g/cm^3^, against 2.6–2.9 g/cm^3^ for the crust.
  - Source: PREM, Table I, p. 308

### Normal · Lithosphere

*id: lithosphere · layer*

**Summary:** The lithosphere includes the crust and uppermost mantle, which together make up the tectonic plates. The model uses PREM’s seismic lid base at 80 km as its lower boundary (PREM, pp. 300, 308; Garnero et al. 2016, p. 481).

**More detail:** PREM identifies a seismic region in the mantle directly beneath the crust down to 80 km that Dziewonski & Anderson (1981, pp. 300, 308) call the LID. They treat it as the main part of the seismic lithosphere. Below it is PREM's low-velocity zone, which this model draws as the asthenosphere. New lithosphere is made at mid-ocean ridges, and old lithosphere sinks back into the mantle at subduction zones (Garnero et al. 2016, p. 481).

**How it is drawn:** only the mantle part (35–80 km) is drawn here; the crust above it is part of the lithosphere too. PREM is a global average, so it gives one depth, 80 km. The 80 km line is a seismic boundary in PREM, used here as a proxy (PREM, pp. 300, 308).

**Cited numbers:**

- PREM seismic lid base used in the drawing: 80 km deep (prem1981: Table I, p. 308)
- Density below the crust: about 3.4 g/cm^3^ (prem1981: Table I, p. 308)

**Common questions:**

1. Q: What is the lithosphere made of?
   A: It includes the crust and the uppermost mantle. The crust is the outer rock layer. For the visualisation, the model uses the 80 km base of PREM’s seismic lid as a proxy for the base of the lithosphere.
   Source: PREM, pp. 300, 308 [prem1981]
2. Q: How thick is the lithosphere?
   A: In this visualisation, the model uses 80 km, the base of PREM's seismic lid, as a proxy for the base of the plate.
   Source: PREM, pp. 300, 308 [prem1981]
3. Q: How does PREM mark the base of the lid?
   A: At 80 km PREM moves from its lid to its low-velocity zone, and the damping of shear waves changes sharply: the shear quality factor Q~μ~ drops from 600 to 80.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: Where is new lithosphere made?
   A: At mid-ocean ridges, where plates move apart and melted mantle rock forms new crust (Garnero et al. 2016; White et al. 1992).
   Source: Garnero et al., p. 481; White et al., pp. 19,683–19,684 [garnero2016, white1992]
5. Q: What happens to old lithosphere?
   A: It sinks into the mantle at subduction zones (Garnero et al. 2016). In a seismic survey around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km depth (Fukao & Obayashi 2013).
   Source: Garnero et al., p. 481; Fukao & Obayashi, p. 5920 [garnero2016, fukao2013]
6. Q: How dense is the mantle part of the lithosphere?
   A: About 3.4 g/cm^3^ in PREM, denser than the 2.6–2.9 g/cm^3^ of the crust above.
   Source: PREM, Table I, p. 308 [prem1981]

**Learn about this part (drill-in):**

- How it works: [behaviour view] In this view the crust and the top of the mantle share one colour (blue): they move together as one plate.
- Opening question: Before you start: where is new lithosphere made?
  - ✔ At mid-ocean ridges
  - At subduction zones
  - In the core
  - Explanation: At mid-ocean ridges, where plates move apart and melted mantle rock forms new crust.
  - Source: Garnero et al. (2016), p. 481; White et al. (1992), pp. 19,683–19,684
- Test 1: What happens to old lithosphere?
  - ✔ It sinks into the mantle at subduction zones
  - It melts at mid-ocean ridges
  - It stays at the surface for ever
  - Explanation: It sinks back into the mantle at subduction zones. Around the Pacific, most imaged slabs stall above 660 km or are trapped at 660–1,000 km.
  - Source: Garnero et al. (2016), p. 481; Fukao & Obayashi (2013), p. 5920
- Test 2: Where does this model put the base of the lithosphere?
  - At the Moho, the base of the crust
  - ✔ At 80 km, the base of PREM’s seismic lid
  - At 660 km
  - Explanation: At 80 km, the base of PREM’s seismic lid, used as a proxy. The lithosphere carries on below the Moho.
  - Source: PREM, pp. 300, 308
- Test 3: What changes in PREM at 80 km, the base of the lid?
  - ✔ Shear waves are damped much more: Q~μ~ drops from 600 to 80
  - The rock turns liquid
  - The density doubles
  - Explanation: The damping of shear waves changes sharply: the shear quality factor Q~μ~ drops from 600 to 80. Shear waves still pass, so the rock is still solid.
  - Source: PREM, Table I, p. 308

### Normal · Asthenosphere

*id: asthenosphere · layer*

**Summary:** Beneath the plates is the asthenosphere. Here it is represented by PREM’s low-velocity zone, 80–220 km deep, where seismic waves travel more slowly (PREM, Table I and footnote, p. 308).

**More detail:** PREM identifies this region as the low-velocity zone. The model’s effective isotropic shear-wave speed decreases slightly through this interval and stays above zero, consistent with a solid response on seismic timescales (PREM, Table I and footnote, p. 308). The plates above move as part of the slow convection of the mantle beneath them (Garnero et al. 2016, p. 481).

**How it is drawn:** drawn as PREM's low-velocity zone, 80–220 km deep. PREM is a global average, so it gives one depth range for the whole Earth (PREM, pp. 299–300, 308).

**Cited numbers:**

- PREM low-velocity zone used in the drawing: 80–220 km deep (prem1981: Table I, p. 308)

**Common questions:**

1. Q: Why is it called the low-velocity zone?
   A: In PREM the effective isotropic shear-wave speed continues to decrease below the lid. It falls from about 4.47 km/s at 80 km to about 4.42 km/s just above 220 km.
   Source: PREM, Table I and footnote, p. 308 [prem1981]
2. Q: Is the asthenosphere liquid?
   A: No. PREM gives the low-velocity zone a shear-wave speed above zero; shear waves cannot travel through a liquid. The liquid outer core has a shear-wave speed of zero.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: How deep is the asthenosphere?
   A: The model illustrates it at 80–220 km, the depth of PREM's low-velocity zone.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: Why do the plates move?
   A: Plate movement is linked to the slow convection of the mantle underneath, over geological time (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
5. Q: Where does the melt for new ocean crust come from?
   A: From mantle rock rising beneath mid-ocean ridges. As it rises the pressure drops and part of it melts (White et al. 1992).
   Source: White et al., pp. 19,683–19,684 [white1992]
6. Q: What is below the asthenosphere?
   A: More mantle rock, all the way down to the core at about 2,890 km.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]

**Learn about this part (drill-in):**

- How it works: [behaviour view] The orange band under the plates is the asthenosphere: the same mantle rock as the blue plate above, but it behaves differently.
- Opening question: Before you start: is the asthenosphere liquid?
  - Yes, it is molten rock
  - ✔ No, it is solid
  - Explanation: No. PREM gives it a shear-wave speed above zero, and shear waves cannot travel through a liquid.
  - Source: PREM, Table I, p. 308
- Test 1: Why is it called the low-velocity zone?
  - ✔ Shear waves travel a little more slowly there than in the lid above
  - The plates move slowly over it
  - Rock moves through it slowly
  - Explanation: In PREM the effective isotropic shear-wave speed keeps falling below the lid: from about 4.47 km/s at 80 km to about 4.42 km/s just above 220 km.
  - Source: PREM, Table I and footnote, p. 308
- Test 2: How deep is it in this model?
  - 0–35 km
  - ✔ 80–220 km
  - 660–2,890 km
  - Explanation: The model illustrates it at 80–220 km, the depth of PREM’s low-velocity zone.
  - Source: PREM, Table I, p. 308
- Test 3: Where does the melt for new ocean crust come from?
  - ✔ Mantle rock rising beneath mid-ocean ridges, partly melting as the pressure drops
  - The liquid outer core
  - Melted continental crust
  - Explanation: From mantle rock rising beneath mid-ocean ridges. As it rises the pressure drops and part of it melts.
  - Source: White et al. (1992), pp. 19,683–19,684

### Normal · Mantle

*id: mantle · layer*

**Summary:** The mantle is solid rock extending from the base of the crust to about 2,890 km, just under halfway to Earth’s centre. It flows over geological time (PREM, Table I, p. 308; Garnero et al. 2016, p. 481).

**More detail:** On seismic timescales, the mantle behaves as a solid: shear waves pass through it (PREM, Table I, p. 308). It still moves, very slowly: it is heated from below by the hot outer core and from within by the decay of uranium, thorium and potassium, and it convects over geological time (Garnero et al. 2016, p. 481). Cold plates sink into it at subduction zones; in a circum-Pacific survey, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km (Fukao & Obayashi 2013, p. 5920). Under Hawaii, Iceland and Samoa, seismic images show broad columns of slow waves rooted near its base, which French & Romanowicz (2015, pp. 95–96) interpret as plumes of hot rock. Its bulk chemistry in the pyrolite model is about 45% SiO~2~ and 38% MgO by weight, expressed as oxides (McDonough & Sun 1995, Table 4, p. 237).

**How it is drawn:** drawn as one layer from 220 km down; the plate and the softer layer above it are drawn separately. The thin outer layers are drawn thicker than true scale so you can see them, so depths on the drawing are only approximate.

**Cited numbers:**

- Depth: from the Moho (24.4 km in PREM, 35 km in ak135) to about 2,890 km (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density: 3.4 at the top to 5.6 g/cm^3^ at the bottom (prem1981: Table I, p. 308)
- What it is made of (pyrolite model): about 45% silica (SiO~2~) and 38% magnesium oxide (MgO) by weight (mcdonough1995: Table 4, p. 237)
- Plumes: broad columns of slow seismic waves rooted near the base of the mantle beneath Hawaii, Iceland and Samoa, interpreted as plumes of hot rock (french2015: Abstract, p. 95)

**Common questions:**

1. Q: If the mantle is solid, how can it flow?
   A: It responds as a solid on seismic timescales: shear waves pass through it (PREM). Over geological time it convects, driven by heat from the core and from radioactive decay (Garnero et al. 2016).
   Source: PREM, Table I, p. 308; Garnero et al., p. 481 [prem1981, garnero2016]
2. Q: What heats the mantle?
   A: The hot outer core below, and the decay of uranium, thorium and potassium inside it (Garnero et al. 2016). Of the 47 TW leaving Earth's surface, an estimated 24–38 TW comes mainly from heat made in the mantle and from the planet slowly cooling (Davies & Davies 2010, Section 4.8).
   Source: Garnero et al., p. 481; Davies & Davies, §4.8, p. 22 [garnero2016, davies2010]
3. Q: What is the mantle made of?
   A: The pyrolite model gives bulk chemistry by weight, expressed as about 45% SiO~2~, 38% MgO and 8% FeO (McDonough & Sun 1995).
   Source: McDonough & Sun, Table 4, p. 237 [mcdonough1995]
4. Q: What happens to plates that sink into the mantle?
   A: In a seismic survey around the Pacific, most imaged slabs were stagnant above the 660 km boundary or trapped just below it, at 660–1,000 km. Some penetrate the boundary, and the study identified one definite case of descent into the deep lower mantle (Fukao & Obayashi 2013).
   Source: Fukao & Obayashi, pp. 5920, 5932 [fukao2013]
5. Q: What is a mantle plume?
   A: A column of hot rock rising through the mantle. French & Romanowicz (2015) imaged broad columns of slow seismic waves rooted near the base of the mantle under Hawaii, Iceland and Samoa, and interpret them as plumes; the one under Hawaii is about 800–1,000 km wide. Whether plumes feed hotspot volcanoes has been debated.
   Source: French & Romanowicz, pp. 95–97 [french2015]
6. Q: How does the density change with depth?
   A: From about 3.4 g/cm^3^ at the top to about 5.6 g/cm^3^ at the bottom (PREM).
   Source: PREM, Table I, p. 308 [prem1981]
7. Q: How thick is the mantle?
   A: From the Moho, whose depth varies, to about 2,890 km: just under halfway to Earth's centre (Garnero et al. 2016). With this model's 35 km crust, that is about 2,850 km of mantle.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123; Garnero et al., p. 481 [prem1981, ak1351995, garnero2016]
8. Q: Is the mantle the same everywhere?
   A: No. Seismic waves travel faster through the deep mantle under past subduction zones, and much slower through two huge regions at its base: one beneath the Pacific, and one beneath the Atlantic and western and southern Africa (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]

**Learn about this part (drill-in):**

- How it works: [layers view] In the cross-section, blue slabs of old plate sink, and pale plumes of hot rock rise from near the core. Where they sit is illustrative, and the speeds are not to scale.
- Opening question: Before you start: is the mantle solid or liquid?
  - Mostly liquid rock (magma)
  - ✔ Solid rock that flows very slowly
  - Explanation: Solid: shear waves pass through it. Over geological time it convects, heated by the core below and by radioactive decay.
  - Source: PREM, Table I, p. 308; Garnero et al. (2016), p. 481
- Test 1: What happens to most plates that sink into the mantle?
  - They sink straight to the core
  - ✔ They stall above 660 km or are trapped at 660–1,000 km
  - They melt at once
  - Explanation: In a seismic survey around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km. Some penetrate deeper, and one definitely reached the deep lower mantle.
  - Source: Fukao & Obayashi (2013), pp. 5920, 5932
- Test 2: What is a mantle plume?
  - ✔ A column of hot rock rising through the mantle
  - A sinking plate
  - A pocket of liquid iron
  - Explanation: A column of hot rock rising through the mantle. Seismic images show broad columns rooted near the base of the mantle under Hawaii, Iceland and Samoa; the one under Hawaii is about 800–1,000 km wide.
  - Source: French & Romanowicz (2015), pp. 95–97
- Test 3: What heats the mantle?
  - Friction from the moving plates
  - ✔ The hot core below, and the decay of uranium, thorium and potassium inside it
  - Explanation: The hot outer core below, and the decay of uranium, thorium and potassium inside the mantle.
  - Source: Garnero et al. (2016), p. 481

### Normal · Outer core

*id: outer-core · layer*

**Summary:** The outer core consists of liquid iron and nickel, extending from about 2,890 to 5,150 km deep. Its movement generates Earth’s magnetic field (PREM, Table I, p. 308; McDonough & Sun 1995, p. 223; Song & Richards 1996, p. 221).

**More detail:** Shear waves do not travel through the outer core: PREM gives it a shear-wave speed of zero, consistent with a liquid (PREM, Table I, p. 308). It is mostly iron with some nickel, plus about 10% of lighter elements such as oxygen, sulfur or silicon (McDonough & Sun 1995, p. 223). As the inner core slowly freezes, it releases energy that is thought to keep the liquid moving, and that motion generates the magnetic field (Song & Richards 1996, p. 221).

**How it is drawn:** the lighter elements are given as one figure, about 10%. Which elements they are, and how much of each, is still uncertain: McDonough & Sun give 10 ± 5% (1995, p. 223).

**Cited numbers:**

- Made of: iron and nickel, with about 10% of lighter elements such as oxygen, sulfur or silicon (mcdonough1995: Abstract, p. 223)
- Depth: about 2,890–5,150 km (prem1981: Table I, p. 308)
- Shear (S) wave speed: 0: S waves cannot pass, so it is liquid (prem1981: Table I, p. 308)
- Density: 9.9–12.2 g/cm^3^ (prem1981: Table I, p. 308)
- Temperature at the top: about 4,000 K (hirose2013: p. 658)

**Common questions:**

1. Q: How do we know the outer core is liquid?
   A: Shear waves cannot travel through liquids, and none come through the outer core. PREM gives it a shear-wave speed of zero.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What is the outer core made of?
   A: Iron and nickel, with about 10% of lighter elements such as oxygen, sulfur or silicon (McDonough & Sun 1995).
   Source: McDonough & Sun, Abstract, p. 223 [mcdonough1995]
3. Q: How does the outer core make the magnetic field?
   A: Liquid iron freezing onto the inner core releases energy. That is thought to drive convection in the outer core, and the moving liquid metal keeps the magnetic field going (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]
4. Q: How much of the Earth is core?
   A: The whole core, outer and inner together, is about 32.5% of Earth's mass (McDonough & Sun 1995).
   Source: McDonough & Sun, §6, p. 244 [mcdonough1995]
5. Q: How dense is the outer core?
   A: 9.9 g/cm^3^ at the top to 12.2 g/cm^3^ at the bottom in PREM, against about 5.6 g/cm^3^ at the bottom of the mantle.
   Source: PREM, Table I, p. 308 [prem1981]
6. Q: How big is the core?
   A: Its outer edge is about 3,480 km from the centre (Song & Richards 1996), at a depth of about 2,890 km.
   Source: Song & Richards, p. 221; PREM, Table I, p. 308 [song1996, prem1981]
7. Q: Does heat come out of the core?
   A: Yes. It heats the mantle from below (Garnero et al. 2016). Estimates of how much are highly uncertain, about 5–13 TW of the 47 TW leaving Earth's surface (Davies & Davies 2010, Section 4.8).
   Source: Garnero et al., p. 481; Davies & Davies, §4.8, p. 22 [garnero2016, davies2010]

**Learn about this part (drill-in):**

- How it works: [quake view] Follow the blue S waves: every one stops at the outer core. The amber P waves cross it, bending as they slow down.
- Opening question: Before you start: is the outer core solid or liquid?
  - Solid
  - ✔ Liquid
  - Explanation: Liquid. PREM gives it a shear-wave speed of zero: no shear waves come through it.
  - Source: PREM, Table I, p. 308
- Test 1: Which waves cannot cross the outer core?
  - P waves
  - ✔ S waves
  - Explanation: S waves: they cannot travel through a liquid. P waves do cross it, slowing from about 13.7 to about 8.1 km/s as they enter.
  - Source: PREM, Table I, p. 308
- Test 2: What is the outer core made of?
  - ✔ Iron and nickel, with about 10% of lighter elements
  - Magnesium-rich rock
  - Liquid rock like lava
  - Explanation: Iron and nickel, with about 10% of lighter elements such as oxygen, sulfur or silicon.
  - Source: McDonough & Sun (1995), Abstract, p. 223
- Test 3: What keeps Earth’s magnetic field going?
  - ✔ Moving liquid iron in the outer core
  - Magnetised rock in the crust
  - The Sun
  - Explanation: Liquid iron freezing onto the inner core releases energy. That is thought to drive convection in the outer core, and the moving liquid metal keeps the field going.
  - Source: Song & Richards (1996), p. 221

### Normal · Inner core

*id: inner-core · layer*

**Summary:** At the centre is a solid iron sphere about 1,220 km in radius. It grows slowly as liquid from the outer core freezes onto it (Song & Richards 1996, p. 221).

**More detail:** Within the inner core, shear waves travel at about 3.5 km/s just inside the inner-core boundary, consistent with a solid response (PREM, Table I, p. 308). Seismologists found it in 1936 (Song & Richards 1996, p. 221). The core has been cooling since it formed, and as it cools, liquid iron freezes onto the inner core (Song & Richards 1996, p. 221). In 1996 Song & Richards estimated that it turns about 1° a year faster than the mantle (p. 221). Yang & Song (2023, pp. 182, 184–185) inferred that relative rotation nearly stopped around 2009 and may have reversed slightly in the years they studied. They propose a cycle of about 70 years.

**How it is drawn:** drawn as a plain solid ball. On average, compressional waves travel faster in the polar direction than in the equatorial direction, and its eastern and western halves differ (Deuss 2014, p. 103).

**Cited numbers:**

- Depth: about 5,150 km to the centre (6,371 km) (prem1981: Table I, p. 308)
- Shear (S) wave speed: about 3.5 km/s just inside the inner-core boundary: S waves pass, so it is solid (prem1981: Table I, p. 308)
- Density at the centre: about 13 g/cm^3^ (prem1981: Table I, p. 308)
- Spin: Song & Richards inferred faster rotation relative to the mantle. Yang & Song inferred that relative rotation nearly stopped around 2009 and may have reversed slightly in the years they studied. (song1996, yang2023: Song & Richards p. 221; Yang & Song pp. 182, 184–185)
- Temperature at the centre: about 5,000–6,000 K (hirose2013: p. 658)

**Common questions:**

1. Q: How do we know the inner core is solid?
   A: Shear waves travel through it, at about 3.5 km/s just inside the inner-core boundary in PREM. They cannot cross a liquid.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: When was the inner core discovered?
   A: In 1936, from seismic waves (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]
3. Q: Is the inner core growing?
   A: Yes, slowly. As the core cools, liquid iron freezes onto it (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]
4. Q: Does the inner core spin?
   A: It turns with the rest of the Earth, but not always at the same rate as the mantle. Song & Richards (1996) estimated it about 1° a year faster. Yang & Song inferred that relative rotation nearly stopped around 2009 and may have reversed slightly in the years they studied. They propose a cycle of about 70 years.
   Source: Song & Richards, p. 221; Yang & Song, pp. 182, 184–185 [song1996, yang2023]
5. Q: How dense is the centre of the Earth?
   A: About 13 g/cm^3^ in PREM, roughly five times the density of PREM's upper crust (2.6 g/cm^3^).
   Source: PREM, Table I, p. 308 [prem1981]
6. Q: How big is the inner core?
   A: About 1,220 km in radius (Song & Richards 1996), less than 1% of Earth's volume.
   Source: Song & Richards, p. 221; Ishii & Dziewoński, p. 14026 [song1996, ishii2002]
7. Q: Is the inner core the same all the way through?
   A: No. On average, compressional waves travel faster in the polar direction than in the equatorial direction, and the western half differs from the eastern (Deuss 2014).
   Source: Deuss, p. 103 [deuss2014]

**Learn about this part (drill-in):**

- How it works: [vs view] The cross-section is coloured by S-wave speed. The outer core is dark: 0, liquid. The inner core lights up again: S waves pass, so it is solid.
- Opening question: Before you start: is the inner core solid or liquid?
  - Liquid, like the outer core
  - ✔ Solid
  - Explanation: Solid. Shear waves travel through it, at about 3.5 km/s just inside its boundary, and they cannot cross a liquid.
  - Source: PREM, Table I, p. 308
- Test 1: Is the inner core growing?
  - ✔ Yes, slowly, as liquid iron freezes onto it
  - No, it is melting away
  - No, it never changes
  - Explanation: Yes, slowly. As the core cools, liquid iron freezes onto the inner core.
  - Source: Song & Richards (1996), p. 221
- Test 2: How was the inner core discovered?
  - ✔ From seismic waves, in 1936
  - By drilling
  - From the magnetic field, in 1996
  - Explanation: From seismic waves, in 1936.
  - Source: Song & Richards (1996), p. 221
- Test 3: How dense is the centre of the Earth?
  - About 3 g/cm^3^
  - ✔ About 13 g/cm^3^
  - About 1 g/cm^3^
  - Explanation: About 13 g/cm^3^ in PREM, roughly five times the density of its upper crust (2.6 g/cm^3^).
  - Source: PREM, Table I, p. 308

### Normal · Moho

*id: moho · boundary*

**Summary:** The Moho marks the base of the crust. Seismic waves speed up as they cross into mantle rock (PREM, Table I and footnote, p. 308).

**More detail:** PREM records an increase in P-wave speed from 6.8 km/s in the lower crust to 8.1 km/s just below the Moho (effective isotropic value), and the density jumps from 2.9 to 3.4 g/cm^3^ (PREM, Table I and footnote, p. 308). Under the oceans the Moho is about 7 km below the top of normal igneous crust (White et al. 1992, pp. 19,683, 19,694); CRUST 5.1 gives average depths below sea level of 38 km under continents and 12.6 km under oceans (Mooney et al. 1998, §8, p. 735).

**How it is drawn:** drawn at 35 km everywhere: ak135's reference depth, which uses continental-style crust (Kennett et al. 1995, p. 110 and Table 3, p. 122). PREM puts it at 24.4 km (Table I, p. 308). The real Moho is shallower under the oceans and deeper under the continents.

**Cited numbers:**

- Depth: about 7 km below the top of normal oceanic igneous crust; mean 38 km below sea level under continents (CRUST 5.1) (white1992, mooney1998: White et al. pp. 19,683, 19,694; CRUST 5.1 §8, p. 735)

**Common questions:**

1. Q: How is the Moho found?
   A: From seismic waves. P waves speed up sharply as they cross it, from about 6.8 km/s in PREM’s crust to an effective isotropic value of about 8.1 km/s in its uppermost mantle. Christensen & Mooney (1995) mapped the continental crust from seismic refraction profiles.
   Source: PREM, Table I and footnote, p. 308; Christensen & Mooney, p. 9761 [prem1981, christensen1995]
2. Q: How deep is the Moho?
   A: About 7 km below the top of normal oceanic igneous crust. Using sea level as the reference, CRUST 5.1 puts the average Moho at 12.6 km under oceans and 38 km under continents.
   Source: White et al., pp. 19,683, 19,694; CRUST 5.1, §8, p. 735 [white1992, mooney1998]
3. Q: What changes at the Moho?
   A: The rock. Under the continents, crust with about 61% silica by weight (Rudnick & Gao 2003) gives way to mantle rock whose bulk chemistry is expressed as about 45% SiO~2~ and 38% MgO by weight in the pyrolite model (McDonough & Sun 1995). Density rises from 2.9 to 3.4 g/cm^3^ (PREM).
   Source: Rudnick & Gao, Table 11, p. 53; McDonough & Sun, Table 4, p. 237; PREM, Table I, p. 308 [rudnick2003, mcdonough1995, prem1981]
4. Q: Is the Moho the bottom of the tectonic plate?
   A: No. The plate (the lithosphere) carries on below the Moho; this model uses PREM's seismic lid, to 80 km, to stand for it.
   Source: PREM, Table I, p. 308 [prem1981]
5. Q: Do all Earth models put the Moho at the same depth?
   A: No. PREM, a global average model, uses 24.4 km. ak135 uses 35 km, because it adopts continental-style crust (Kennett et al. 1995).
   Source: PREM, Table I, p. 308; ak135, p. 110; Table 3, p. 122 [prem1981, ak1351995]
6. Q: How is the ocean Moho made?
   A: At mid-ocean ridges, melt from rising mantle rock builds igneous crust on top of the mantle. The base of that crust is the Moho, about 7 km below its top (White et al. 1992).
   Source: White et al., pp. 19,683, 19,694 [white1992]

**Learn about this part (drill-in):**

- How it works: [composition view] The Moho is where the orange crust meets the green mantle rock: two different kinds of rock.
- Opening question: Before you start: what is the Moho?
  - ✔ The base of the crust
  - The base of the tectonic plate
  - The top of the core
  - Explanation: The base of the crust, where seismic waves speed up as they pass into mantle rock.
  - Source: PREM, Table I and footnote, p. 308
- Test 1: How was the Moho found?
  - ✔ From seismic waves speeding up across it
  - By drilling through it
  - From satellite photos
  - Explanation: From seismic waves. P waves speed up sharply across it, from about 6.8 km/s in PREM’s crust to about 8.1 km/s in its uppermost mantle.
  - Source: PREM, Table I and footnote, p. 308; Christensen & Mooney (1995), p. 9761
- Test 2: Where is the Moho deeper?
  - Under the oceans
  - ✔ Under the continents
  - Explanation: Under the continents. Measured from sea level, CRUST 5.1 puts the average Moho at 38 km under continents and 12.6 km under oceans.
  - Source: Mooney et al. (1998), §8, p. 735
- Test 3: Is the Moho the bottom of the tectonic plate?
  - Yes
  - ✔ No, the plate carries on below it
  - Explanation: No. The plate (the lithosphere) carries on below the Moho; this model uses PREM’s seismic lid, to 80 km, to stand for it.
  - Source: PREM, Table I, p. 308

### Normal · Core–mantle boundary

*id: cmb · boundary*

**Summary:** About 2,890 km below the surface, the rocky mantle meets the liquid iron core. This boundary has the largest density jump inside the Earth (PREM, Table I, p. 308).

**More detail:** Across this boundary, density rises from 5.6 to 9.9 g/cm^3^. Shear waves travel through the mantle rock at about 7.3 km/s but stop at the liquid iron (PREM, Table I, p. 308). Heat crosses from the core into the mantle and helps drive mantle convection (Garnero et al. 2016, p. 481). Broad columns that French & Romanowicz (2015, pp. 95–96) interpret as plumes seem to rise from patches just above it.

**How it is drawn:** drawn as a smooth sphere. This level’s drawing leaves out the two continent-sized regions of slow seismic waves just above it, and the thin patches where waves are very slow (Garnero et al. 2016, pp. 481–482).

**Cited numbers:**

- Depth: about 2,890 km (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density jump: 5.6 → 9.9 g/cm^3^ (prem1981: Table I, p. 308)

**Common questions:**

1. Q: What happens to seismic waves at the core–mantle boundary?
   A: Shear waves stop, because the core below is liquid. P waves slow sharply, from about 13.7 to about 8.1 km/s in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: Why does the density jump so much?
   A: Rock meets metal. The mantle is silicate rock (McDonough & Sun 1995); the core is mostly iron. Density goes from 5.6 to 9.9 g/cm^3^ (PREM).
   Source: McDonough & Sun, Abstract, p. 223; Table 4, p. 237; PREM, Table I, p. 308 [mcdonough1995, prem1981]
3. Q: Does heat cross the core–mantle boundary?
   A: Yes, from the core into the mantle, which helps drive mantle convection (Garnero et al. 2016). How much is highly uncertain: an estimated 5–13 TW (Davies & Davies 2010, Section 4.8).
   Source: Garnero et al., p. 481; Davies & Davies, §4.8, p. 22 [garnero2016, davies2010]
4. Q: What lies just above the core–mantle boundary?
   A: Two continent-sized regions where shear waves are slow, one beneath the Pacific and one beneath the Atlantic and western and southern Africa, and thin patches where they are very slow (Garnero et al. 2016). Columns interpreted as plumes seem to rise from some of these patches (French & Romanowicz 2015).
   Source: Garnero et al., pp. 481–482; French & Romanowicz, pp. 95–96 [garnero2016, french2015]
5. Q: How deep is the core–mantle boundary?
   A: About 2,890 km in both PREM and ak135.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
6. Q: How far is the core–mantle boundary from Earth's centre?
   A: About 3,480 km, a little over half of Earth's radius (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]

**Learn about this part (drill-in):**

- How it works: [density view] The cross-section is coloured by density. Follow it down: the colour brightens slowly through the mantle, then jumps at the core.
- Opening question: Before you start: where inside the Earth is the biggest jump in density?
  - At the Moho
  - ✔ At the core–mantle boundary
  - At the centre
  - Explanation: At the core–mantle boundary, where rock meets metal: from 5.6 to 9.9 g/cm^3^.
  - Source: PREM, Table I, p. 308
- Test 1: What happens to S waves at the core–mantle boundary?
  - ✔ They stop, because the core below is liquid
  - They speed up
  - They pass straight through
  - Explanation: They stop, because the core below is liquid. P waves slow sharply, from about 13.7 to about 8.1 km/s.
  - Source: PREM, Table I, p. 308
- Test 2: How deep is the core–mantle boundary?
  - About 660 km
  - ✔ About 2,890 km
  - About 5,150 km
  - Explanation: About 2,890 km in both PREM and ak135.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123
- Test 3: Which way does heat cross it?
  - ✔ From the core into the mantle
  - From the mantle into the core
  - No heat crosses it
  - Explanation: From the core into the mantle, which helps drive mantle convection. How much is highly uncertain: an estimated 5–13 TW.
  - Source: Garnero et al. (2016), p. 481; Davies & Davies (2010), §4.8, p. 22

## Intermediate

### Guided lesson (Intermediate)

1. **[oceanic-crust]** New ocean crust is made at mid-ocean ridges: rising mantle partly melts as the pressure drops. Normal crust is 7.1 ± 0.8 km thick; over plume-heated mantle it reaches 10.3 ± 1.7 km.
   - Sources: White et al. (1992), pp. 19,683–19,684
2. **[lab]** At 80 km PREM’s shear quality factor Q~μ~ drops from 600 to 80; the lower it is, the more shear waves are damped. This model uses that lid base as a proxy for the base of the plates.
   - Sources: PREM, Table I and footnote, pp. 300, 308
3. **[lab-measured]** Where it has been measured, the base of the plate is not at one depth. Under the oceans it deepens as plates age and cool, from about 55 km at 25 million years to 82 km at 129 million years; under old continents it reaches roughly 200 km.
   - Sources: Fischer et al. (2010), pp. 553, 565
4. **[transition-zone]** Between 410 and 660 km, olivine gives way to its high-pressure forms wadsleyite and ringwoodite, which can hold up to about 2.5% water by weight.
   - Sources: Pearson et al. (2014), p. 221
5. **[d660]** Sinking plates often stall here. Around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km.
   - Sources: Fukao & Obayashi (2013), p. 5920
6. **[cmb]** At 2,891 km density jumps from 5.57 to 9.90 g/cm^3^ and shear waves stop. An estimated 5–13 TW of heat crosses from the core into the mantle.
   - Sources: PREM, Table I, p. 308; Davies & Davies (2010), §4.8, p. 22
7. **[icb]** Shear waves return at 3.50 km/s: the inner core is solid, and it grows as the liquid outer core freezes onto it.
   - Sources: PREM, Table I, p. 308; Song & Richards (1996), p. 221

### Tour (Intermediate)

- Opening: Intermediate tour: 16 parts, from the surface down to the centre.
- Each part: its Summary (below), plus the last question of its drill-in when that drill-in is multiple choice.
- Closing: Back to the whole Earth. Pick a layer to look closer, or play the tour again.

### Intermediate · Continental crust

*id: continental-crust · layer · within crust*

**Summary:** Continental crust is relatively thick and rich in silica, averaging 38 km in CRUST 5.1 and 41.1 km in Christensen & Mooney’s compilation (Mooney et al. 1998, p. 744; Christensen & Mooney 1995, p. 9761).

**More detail:** Continental crust is generally 30–45 km thick, with a global average of 38 km in the CRUST 5.1 model (Mooney et al. 1998, p. 744). It ranges from 20.5 km in stretched crust to 70 km under the Tibetan Plateau (Plate 1, p. 733). Christensen & Mooney’s seismic compilation gives a weighted average of 41.1 km: 30.5 km in extended crust and 46.3 km in orogens (1995, p. 9761). Its chemistry changes with depth. Silica falls from 66.6 wt% in the upper crust to 53.4 wt% in the lower crust, while MgO rises from 2.48 to 7.24 wt%; the whole crust averages 60.6 wt% SiO~2~ (Rudnick & Gao 2003, Table 11, p. 53). Continents lose heat at a mean of 70.9 mW m^-2^ (Davies & Davies 2010, Table 7, p. 20), and an estimated 6–8 TW of Earth’s heat is made by radioactive decay in the crust (Section 4.8, p. 22).

**How it is drawn:** The continental sector is schematic. Its 35 km ak135 reference thickness is drawn as 150 km. The Crust thickness view shows the real thickness worldwide, from CRUST1.0.

**Cited numbers:**

- Average thickness: 38 km (CRUST 5.1); 41.1 km (Christensen & Mooney) (mooney1998, christensen1995: CRUST 5.1 p. 744; Christensen & Mooney abstract, p. 9761)
- Range in CRUST 5.1: 20.5 km (stretched crust) to 70 km (Tibetan Plateau) (mooney1998: Plate 1 caption, p. 733)
- Average P-wave speed: 6.45 km/s (christensen1995: Abstract, p. 9761)
- Silica (SiO~2~, wt%): upper / lower / whole crust: 66.6 / 53.4 / 60.6 (rudnick2003: Table 11, p. 53)
- Heat flowing out of the whole Earth: 47 ± 2 TW (davies2010: Abstract, p. 5)
- Mean heat flow, continents: 70.9 mW m^-2^ (davies2010: Table 7, p. 20)

**Common questions:**

1. Q: How thick is continental crust?
   A: Typically 30–45 km, with a global average of 38 km in CRUST 5.1 (Mooney et al. 1998). Christensen & Mooney’s weighted average is 41.1 km (1995).
   Source: CRUST 5.1, p. 744; Christensen & Mooney, p. 9761 [mooney1998, christensen1995]
2. Q: Where is continental crust thinnest and thickest?
   A: Extended (stretched) crust averages 30.5 km and orogens (mountain belts) 46.3 km (Christensen & Mooney 1995), and CRUST 5.1 reaches 70 km under the Tibetan Plateau (Mooney et al. 1998).
   Source: Christensen & Mooney, p. 9761; CRUST 5.1, Plate 1, p. 733 [christensen1995, mooney1998]
3. Q: How does the chemistry change from the upper to the lower crust?
   A: Silica falls from 66.6 to 53.4 wt% and MgO rises from 2.48 to 7.24 wt% (Rudnick & Gao 2003). The lower crust is more mafic.
   Source: Rudnick & Gao, Table 11, p. 53 [rudnick2003]
4. Q: Where is most of the crust’s potassium?
   A: In the upper crust: 2.80 wt% K~2~O, against 2.30 in the middle crust and 0.61 in the lower crust (Rudnick & Gao 2003).
   Source: Rudnick & Gao, Table 11, p. 53 [rudnick2003]
5. Q: How fast do P waves travel through continental crust?
   A: 6.45 km/s on average. Just below the Moho the speed (Pn) is 8.09 km/s (Christensen & Mooney 1995).
   Source: Christensen & Mooney, p. 9761 [christensen1995]
6. Q: How much heat do continents lose?
   A: A mean of 70.9 mW m^-2^ (Davies & Davies 2010). An estimated 6–8 TW of the Earth’s heat is made by radioactive decay in the crust (Section 4.8).
   Source: Davies & Davies, Table 7, p. 20; §4.8, p. 22 [davies2010]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid. Moves with its tectonic plate. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: How thick is continental crust?
  - Answer: Typically 30–45 km, with a global average of 38 km in CRUST 5.1 (Mooney et al. 1998). Christensen & Mooney’s weighted average is 41.1 km (1995).
  - Source: CRUST 5.1, p. 744; Christensen & Mooney, p. 9761
- Test 1 (think, then reveal): Where is continental crust thinnest and thickest?
  - Answer: Extended (stretched) crust averages 30.5 km and orogens (mountain belts) 46.3 km (Christensen & Mooney 1995), and CRUST 5.1 reaches 70 km under the Tibetan Plateau (Mooney et al. 1998).
  - Source: Christensen & Mooney, p. 9761; CRUST 5.1, Plate 1, p. 733
- Test 2 (think, then reveal): How does the chemistry change from the upper to the lower crust?
  - Answer: Silica falls from 66.6 to 53.4 wt% and MgO rises from 2.48 to 7.24 wt% (Rudnick & Gao 2003). The lower crust is more mafic.
  - Source: Rudnick & Gao, Table 11, p. 53
- Test 3 (think, then reveal): Where is most of the crust’s potassium?
  - Answer: In the upper crust: 2.80 wt% K~2~O, against 2.30 in the middle crust and 0.61 in the lower crust (Rudnick & Gao 2003).
  - Source: Rudnick & Gao, Table 11, p. 53

### Intermediate · Oceanic crust

*id: oceanic-crust · layer · within crust*

**Summary:** Oceanic igneous crust forms at mid-ocean ridges and is typically 7.1 ± 0.8 km thick (White et al. 1992, p. 19,683).

**More detail:** Beneath mid-ocean ridges, mantle rock rises and partly melts as the pressure on it drops; the melt builds the crust (White et al. 1992, pp. 19,683–19,684). Normal igneous oceanic crust is 7.1 ± 0.8 km thick, in two seismic layers: layer 2, about 2.1 km of basaltic lavas and dykes, over layer 3, about 5.0 km that is probably mainly gabbro (p. 19,683; Table 8, p. 19,698). Hotter mantle melts more. Where spreading centres cross mantle heated by a plume the crust is 10.3 ± 1.7 km thick, and aseismic ridges above plume centres reach about 20 km (p. 19,683). Ocean floor younger than 66.5 million years loses 23.1 TW of heat, about half of the Earth’s total (Davies & Davies 2010, Section 3, p. 16).

**How it is drawn:** The oceanic sectors are schematic. Their 7 km igneous thickness is drawn as 30 km. The Crust thickness view shows the real thickness worldwide, from CRUST1.0.

**Cited numbers:**

- Thickness (igneous crust): 7.1 ± 0.8 km (white1992: Abstract, p. 19,683)
- Layers: layer 2 (about 2.1 km), read as basaltic lavas and dykes, over layer 3 (about 5.0 km), probably mainly gabbro (white1992: p. 19,683; Table 8, p. 19,698)
- Where spreading centres cross plume-heated mantle: 10.3 ± 1.7 km (white1992: Abstract, p. 19,683)

**Common questions:**

1. Q: How is oceanic crust made?
   A: At mid-ocean ridges, mantle rock rises and partly melts as the pressure on it drops. The melt builds igneous crust (White et al. 1992).
   Source: White et al., pp. 19,683–19,684 [white1992]
2. Q: What are seismic layers 2 and 3?
   A: Layer 2, about 2.1 km thick, is read as basaltic lavas and dykes. Layer 3, about 5.0 km, is probably mainly gabbro (White et al. 1992).
   Source: White et al., p. 19,683; Table 8, p. 19,698 [white1992]
3. Q: Why is ocean crust thicker over plumes?
   A: Hotter mantle melts more as it rises. Where spreading centres cross plume-heated mantle the crust is 10.3 ± 1.7 km thick, and aseismic ridges above plume centres reach about 20 km (White et al. 1992).
   Source: White et al., p. 19,683 [white1992]
4. Q: How do we know ocean crust thickness without drilling through it?
   A: From seismic measurements, which give 7.1 ± 0.8 km, and independently from rare earth element inversions of how much the mantle melted, which give 8.3 ± 1.5 km (White et al. 1992).
   Source: White et al., p. 19,683 [white1992]
5. Q: How much heat does young ocean floor lose?
   A: Ocean floor younger than 66.5 million years loses 23.1 TW, about half of the Earth’s total heat loss (Davies & Davies 2010).
   Source: Davies & Davies, Section 3, p. 16 [davies2010]
6. Q: Where is the Moho under the oceans?
   A: About 7 km below the top of normal igneous crust. CRUST 5.1 gives a mean Moho depth of 12.6 km below sea level under the oceans, counting about 4 km of water (Mooney et al. 1998).
   Source: White et al., p. 19,683; CRUST 5.1, Section 8, p. 735 [white1992, mooney1998]

**Learn about this part (drill-in):**

- How it works: crust comparison activity
- Opening question: Before you start: where is new ocean crust thicker?
  - At normal mid-ocean ridges
  - ✔ Where spreading centres cross plume-heated mantle
  - It is the same everywhere
  - Explanation: Over plume-heated mantle: 10.3 ± 1.7 km, against 7.1 ± 0.8 km for normal crust. Hotter mantle melts more as it rises.
  - Source: White et al. (1992), p. 19,683
- Test 1: What is seismic layer 3 probably made of?
  - ✔ Mainly gabbro
  - Sediment
  - Mantle peridotite
  - Explanation: Probably mainly gabbro, about 5.0 km thick, under about 2.1 km of basaltic lavas and dykes (layer 2).
  - Source: White et al. (1992), p. 19,683; Table 8, p. 19,698
- Test 2: Rare earth element inversions give a thickness of 8.3 ± 1.5 km. Why does that matter?
  - ✔ It is an independent check on the seismic 7.1 ± 0.8 km
  - It replaces the seismic value
  - It measures continental crust
  - Explanation: It comes from how much the mantle melted, not from seismic waves, so it is an independent check.
  - Source: White et al. (1992), p. 19,683
- Test 3: About how much of Earth’s heat loss is through ocean floor younger than 66.5 million years?
  - About a tenth
  - ✔ About half
  - Almost all
  - Explanation: About half: 23.1 TW of the 46.7 TW total.
  - Source: Davies & Davies (2010), Section 3, p. 16; Table 7, p. 20

### Intermediate · Lithospheric mantle

*id: lithospheric-mantle · layer · within lithosphere*

**Summary:** The lithospheric mantle is the uppermost mantle within the tectonic plates. PREM represents it as the seismic lid, from the Moho at 24.4 km to 80 km (PREM, pp. 300, 308).

**More detail:** The uppermost mantle moves with the crust as part of the same tectonic plate. PREM calls this region the LID and treats it as the main part of the seismic lithosphere (Dziewonski & Anderson 1981, pp. 300, 308). Its density is about 3.38 g/cm^3^ and its effective isotropic shear-wave speed 4.49–4.47 km/s. PREM makes it transversely isotropic: wave speeds depend on direction relative to a vertical axis (Table I and footnote, p. 308). It damps shear waves little, with a shear quality factor Q~μ~ of 600, against 80 in the low-velocity zone below.

**How it is drawn:** The top follows the drawn crust at 7 km under oceans and 35 km under continents. The lid base is drawn at 80 km.

**Cited numbers:**

- Depth (PREM lid): 24.4–80 km (prem1981: Table I, p. 308)
- Density: 3.38 g/cm^3^ (prem1981: Table I, p. 308)
- S-wave speed (effective isotropic): 4.49–4.47 km/s (prem1981: Table I and footnote, p. 308)

**Common questions:**

1. Q: Why count the top of the mantle as part of the plate?
   A: Plates are pieces of lithosphere, the crust plus the uppermost mantle (Garnero et al. 2016). PREM treats its lid, 24.4–80 km, as the main part of the seismic lithosphere.
   Source: Garnero et al., p. 481; PREM, pp. 300, 308 [garnero2016, prem1981]
2. Q: How dense is the lithospheric mantle in PREM?
   A: About 3.38 g/cm^3^, denser than the 2.6–2.9 g/cm^3^ crust above.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: What does transversely isotropic mean in PREM?
   A: Seismic speeds depend on direction relative to a vertical axis. PREM uses this from 24.4 to 220 km and also gives effective isotropic speeds for that range.
   Source: PREM, Table I footnote, p. 308 [prem1981]
4. Q: What is Q~μ~, and what is it in the lid?
   A: The shear quality factor: the higher it is, the less shear waves are damped. It is 600 in PREM’s lid and 80 in the low-velocity zone below.
   Source: PREM, Table I, p. 308 [prem1981]
5. Q: How fast do shear waves travel in the lid?
   A: About 4.49–4.47 km/s as an effective isotropic speed, falling slightly with depth.
   Source: PREM, Table I and footnote, p. 308 [prem1981]
6. Q: Is 80 km the real thickness of every plate?
   A: No. PREM is a global average and gives one depth for its lid base. For the visualisation, the model uses it as a stand-in for the base of the lithosphere.
   Source: PREM, pp. 300, 308 [prem1981]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid. Moves with its tectonic plate. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: Why count the top of the mantle as part of the plate?
  - Answer: Plates are pieces of lithosphere, the crust plus the uppermost mantle (Garnero et al. 2016). PREM treats its lid, 24.4–80 km, as the main part of the seismic lithosphere.
  - Source: Garnero et al., p. 481; PREM, pp. 300, 308
- Test 1 (think, then reveal): How dense is the lithospheric mantle in PREM?
  - Answer: About 3.38 g/cm^3^, denser than the 2.6–2.9 g/cm^3^ crust above.
  - Source: PREM, Table I, p. 308
- Test 2 (think, then reveal): What does transversely isotropic mean in PREM?
  - Answer: Seismic speeds depend on direction relative to a vertical axis. PREM uses this from 24.4 to 220 km and also gives effective isotropic speeds for that range.
  - Source: PREM, Table I footnote, p. 308
- Test 3 (think, then reveal): What is Q~μ~, and what is it in the lid?
  - Answer: The shear quality factor: the higher it is, the less shear waves are damped. It is 600 in PREM’s lid and 80 in the low-velocity zone below.
  - Source: PREM, Table I, p. 308

### Intermediate · Asthenosphere

*id: asthenosphere · layer*

**Summary:** The asthenosphere lies below the tectonic plates. This model uses PREM’s low-velocity zone at 80–220 km, where shear waves slow down and undergo stronger damping (PREM, Table I and footnote, p. 308).

**More detail:** Within PREM’s low-velocity zone the effective isotropic shear-wave speed falls from 4.47 km/s at 80 km to 4.42 km/s just above 220 km, and the shear quality factor Q~μ~ drops from 600 in the lid to 80 (Dziewonski & Anderson 1981, Table I and footnote, p. 308). Shear waves still pass, so it responds as a solid on seismic timescales. The plates above move as part of the slow convection of the mantle (Garnero et al. 2016, p. 481). Mantle rising beneath mid-ocean ridges partly melts as the pressure drops, which makes new ocean crust (White et al. 1992, pp. 19,683–19,684).

**How it is drawn:** Shown as PREM's low-velocity zone, 80–220 km deep. PREM is a global average, so it gives one depth range for the whole Earth (PREM, pp. 299–300, 308).

**Cited numbers:**

- Depth (PREM low-velocity zone): 80–220 km (prem1981: Table I, p. 308)
- S-wave speed (effective isotropic): falls with depth, 4.47 at 80 km → 4.42 km/s just above 220 km (prem1981: Table I and footnote, p. 308)
- Shear quality factor Q~μ~: 80, against 600 in the lid above: it damps waves more (prem1981: Table I, p. 308)

**Common questions:**

1. Q: What two seismic changes mark PREM’s low-velocity zone?
   A: The effective isotropic shear-wave speed falls with depth, from 4.47 to 4.42 km/s, and Q~μ~ drops from 600 to 80, so shear waves are damped more strongly.
   Source: PREM, Table I and footnote, p. 308 [prem1981]
2. Q: Does a low shear-wave speed mean the layer is molten?
   A: No. The speed stays well above zero. Shear waves cannot cross a liquid, as the outer core shows with v~S~ = 0.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: Why does stronger damping matter?
   A: A low Q~μ~ means the rock absorbs more shear-wave energy. The asthenosphere has Q~μ~ = 80, against 600 in the lid above.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: How is the asthenosphere linked to plate motion?
   A: The plates move as part of the slow convection of the mantle beneath them (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
5. Q: How does it feed new ocean crust?
   A: Beneath mid-ocean ridges mantle rock rises, the pressure on it drops and it partly melts. The melt builds crust about 7 km thick (White et al. 1992).
   Source: White et al., pp. 19,683–19,684 [white1992]
6. Q: Is the 80–220 km depth the same everywhere?
   A: No. PREM is a global average, so it gives one range. For the visualisation, the model uses it as a stand-in for the asthenosphere.
   Source: PREM, pp. 299–300, 308 [prem1981]

**Learn about this part (drill-in):**

- How it works: [behaviour view] The orange band under the plates is the asthenosphere: the same mantle rock as the blue plate above, but it behaves differently.
- Opening question: Before you start: is PREM’s low-velocity zone molten?
  - Yes, it is a liquid layer
  - ✔ No, shear waves still pass through it
  - Explanation: No. Its effective isotropic shear-wave speed stays above 4.4 km/s; the liquid outer core has a shear-wave speed of 0.
  - Source: PREM, Table I and footnote, p. 308
- Test 1: What happens to Q~μ~ at the top of the low-velocity zone?
  - It rises from 80 to 600
  - ✔ It drops from 600 to 80
  - It stays the same
  - Explanation: It drops from 600 in the lid to 80, so shear waves are damped more strongly.
  - Source: PREM, Table I, p. 308
- Test 2: How does the shear-wave speed change through the zone?
  - ✔ It falls slightly with depth
  - It drops to zero
  - It doubles
  - Explanation: It falls slightly, from 4.47 km/s at 80 km to 4.42 km/s just above 220 km.
  - Source: PREM, Table I and footnote, p. 308
- Test 3: Beneath mid-ocean ridges, why does rising mantle partly melt?
  - ✔ The pressure on it drops
  - Water is added from the ocean
  - It is heated by friction with the plate
  - Explanation: The pressure on it drops as it rises. The melt builds crust about 7 km thick.
  - Source: White et al. (1992), pp. 19,683–19,684

### Intermediate · Upper mantle

*id: upper-mantle · layer · within mantle*

**Summary:** This part of the upper mantle extends from 220 km to the 410 km discontinuity and is dominated by olivine (Pearson et al. 2014, p. 221; PREM; ak135).

**More detail:** Below the low-velocity zone, the solid mantle is dominated by olivine, Mg~2~SiO~4~, down to about 400 km (Pearson et al. 2014, p. 221). The pyrolite model gives its bulk chemistry, as oxides, as SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45 and CaO 3.55 wt% (McDonough & Sun 1995, Table 4, p. 237). Density rises with pressure from 3.44 to 3.54 g/cm^3^ between 220 and 400 km (PREM, Table I, p. 308). The mantle is heated from below by the core and from within by radioactive decay, and convects over geological time (Garnero et al. 2016, p. 481).

**How it is drawn:** Shown from 220 km down to 410 km (ak135); PREM puts the boundary at 400 km.

**Cited numbers:**

- Depth: 220 km (base of PREM low-velocity zone) to 410 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density (PREM, 220–400 km): 3.44–3.54 g/cm^3^ (prem1981: Table I, p. 308)
- Main mineral: olivine (Mg~2~SiO~4~), down to about 400 km (pearson2014: p. 221)
- Mantle composition (pyrolite model, wt% as oxides): SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45, CaO 3.55 (mcdonough1995: Table 4, p. 237)

**Common questions:**

1. Q: What mineral dominates the upper mantle?
   A: Olivine, Mg~2~SiO~4~, down to about 400 km (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
2. Q: What is the pyrolite model’s mantle chemistry?
   A: As oxides: SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45 and CaO 3.55 wt% (McDonough & Sun 1995).
   Source: McDonough & Sun, Table 4, p. 237 [mcdonough1995]
3. Q: How does density change through the upper mantle?
   A: It rises with pressure, from 3.44 g/cm^3^ at 220 km to 3.54 g/cm^3^ at 400 km in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: What drives mantle convection?
   A: Heat from the core below and from the decay of uranium, thorium and potassium within the mantle (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
5. Q: How much of Earth’s heat comes from the mantle and cooling?
   A: An estimated 24–38 TW of the 47 TW total, mainly from heat made in the mantle and from the planet slowly cooling (Davies & Davies 2010).
   Source: Davies & Davies, §4.8, p. 22 [davies2010]
6. Q: Where does the upper mantle end?
   A: At the 410 km discontinuity in ak135, 400 km in PREM, where the transition zone begins.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid, yet convects slowly over geological time. Blue sheets: old plates sinking; most stall above 660 km or are trapped at 660–1,000 km, some sink deeper. Pale columns: plumes of hot rock rising from near the core, imaged up to about 1,000 km depth. The cut face shows this as a schematic; where the slabs and plumes sit is illustrative; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What mineral dominates the upper mantle?
  - Answer: Olivine, Mg~2~SiO~4~, down to about 400 km (Pearson et al. 2014).
  - Source: Pearson et al., p. 221
- Test 1 (think, then reveal): What is the pyrolite model’s mantle chemistry?
  - Answer: As oxides: SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45 and CaO 3.55 wt% (McDonough & Sun 1995).
  - Source: McDonough & Sun, Table 4, p. 237
- Test 2 (think, then reveal): How does density change through the upper mantle?
  - Answer: It rises with pressure, from 3.44 g/cm^3^ at 220 km to 3.54 g/cm^3^ at 400 km in PREM.
  - Source: PREM, Table I, p. 308
- Test 3 (think, then reveal): What drives mantle convection?
  - Answer: Heat from the core below and from the decay of uranium, thorium and potassium within the mantle (Garnero et al. 2016).
  - Source: Garnero et al., p. 481

### Intermediate · Mantle transition zone

*id: transition-zone · layer · within mantle*

**Summary:** Between 410 and 660 km is the mantle transition zone, dominated by wadsleyite and ringwoodite, the high-pressure forms of olivine (Pearson et al. 2014, p. 221).

**More detail:** Around 410 km depth, olivine changes into its high-pressure forms, wadsleyite and ringwoodite, which are thought to dominate down to 660 km (Pearson et al. 2014, p. 221). The zone is 410–660 km in ak135 and 400–670 km in PREM (Table I, p. 308; Table 3, pp. 122–123), and its density rises from 3.72 to 3.99 g/cm^3^. Wadsleyite and ringwoodite can hold up to about 2.5% water by weight. A ringwoodite inclusion in a diamond from Juína, Brazil, implies about 1 wt% bulk water in the part of the zone it came from (Pearson et al. 2014, pp. 221, 223). Frost (2008, p. 172) sets out the sequence in a pyrolite mantle: olivine becomes wadsleyite at about 14 GPa (410 km), wadsleyite becomes ringwoodite at about 17.5 GPa (520 km), and at about 24 GPa (660 km) ringwoodite breaks down into perovskite-structured (Mg,Fe)SiO~3~ and ferropericlase.

**How it is drawn:** Shown at the ak135 depths, 410–660 km.

**Cited numbers:**

- Depth: 410–660 km (ak135); 400–670 km (PREM) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density: 3.72–3.99 g/cm^3^ (prem1981: Table I, p. 308)
- Main minerals: wadsleyite and ringwoodite, high-pressure forms of olivine thought to dominate the zone (pearson2014: Abstract, p. 221)
- Water: wadsleyite and ringwoodite can hold up to about 2.5% water by weight; the Brazilian ringwoodite inclusion implies about 1 wt% bulk water in the transition-zone mantle sampled locally (pearson2014: pp. 221, 223)
- Mineral changes (pyrolite): olivine → wadsleyite at ~14 GPa (410 km); wadsleyite → ringwoodite at ~17.5 GPa (520 km); ringwoodite → perovskite-structured (Mg,Fe)SiO~3~ + ferropericlase at ~24 GPa (660 km) (frost2008: p. 172)

**Common questions:**

1. Q: Which minerals dominate the transition zone?
   A: Wadsleyite and ringwoodite, high-pressure forms of olivine (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
2. Q: Why do its boundaries show up seismically?
   A: Density and wave speed jump at each one: at 400 km PREM’s density rises from 3.54 to 3.72 g/cm^3^, and at 670 km from 3.99 to 4.38 g/cm^3^.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: How much water can the transition zone hold?
   A: Wadsleyite and ringwoodite can hold up to about 2.5 wt% water (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
4. Q: How do we know there is water there?
   A: A ringwoodite inclusion in a diamond from Juína, Brazil, carries water. It implies about 1 wt% bulk water in the transition zone it sampled (Pearson et al. 2014).
   Source: Pearson et al., pp. 221, 223 [pearson2014]
5. Q: Why do PREM and ak135 give different depths?
   A: They are separate fits to seismic data: 400–670 km in PREM and 410–660 km in ak135.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
6. Q: What happens to sinking plates at the base of the zone?
   A: In a survey around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km (Fukao & Obayashi 2013).
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
7. Q: Why are there sharp boundaries at 410 and 660 km?
   A: They are generally accepted to come from mineral changes: olivine turns into wadsleyite at about 410 km, and ringwoodite breaks down into perovskite-structured (Mg,Fe)SiO~3~ and ferropericlase at about 660 km (Frost 2008).
   Source: Frost, pp. 171–172 [frost2008]

**Learn about this part (drill-in):**

- How it works: [layers view] The transition zone is the band between the 410 and 660 km boundaries. At the 410 km line olivine turns into wadsleyite. Deeper, at about 520 km, wadsleyite turns into ringwoodite, which lasts down to the 660 km line. These high-pressure forms are thought to make up most of the band.
- Opening question: Before you start: what happens to olivine below about 410 km?
  - It melts
  - ✔ It gives way to its high-pressure forms, wadsleyite and ringwoodite
  - Nothing changes
  - Explanation: It gives way to wadsleyite and ringwoodite, which are thought to dominate the zone down to 660 km.
  - Source: Pearson et al. (2014), p. 221
- Test 1: How much water can wadsleyite and ringwoodite hold?
  - None
  - ✔ Up to about 2.5% by weight
  - About half their weight
  - Explanation: Up to about 2.5 wt%.
  - Source: Pearson et al. (2014), p. 221
- Test 2: What evidence shows water in the transition zone?
  - ✔ A ringwoodite inclusion in a diamond from Brazil
  - Water wells
  - Lava from mid-ocean ridges
  - Explanation: A ringwoodite inclusion in a diamond from Juína, Brazil. It implies about 1 wt% bulk water where it came from.
  - Source: Pearson et al. (2014), pp. 221, 223
- Test 3: How does PREM’s density change at 670 km?
  - ✔ 3.99 → 4.38 g/cm^3^
  - 5.57 → 9.90 g/cm^3^
  - It does not change
  - Explanation: It jumps from 3.99 to 4.38 g/cm^3^.
  - Source: PREM, Table I, p. 308

### Intermediate · Lower mantle

*id: lower-mantle · layer · within mantle*

**Summary:** The lower mantle is Earth’s largest layer, from 660 km to the core at 2,891 km. Both descending slabs and rising plumes can pass through it (PREM; ak135; Fukao & Obayashi 2013; French & Romanowicz 2015).

**More detail:** PREM places the lower mantle between 670 and 2,891 km; density rises from 4.38 to 5.57 g/cm^3^ and P-wave speed from 10.75 to 13.72 km/s (Table I, p. 308). Cold slabs sink into it: P-wave tomography around the Pacific found most imaged slabs stagnant above the 660 or trapped at 660–1,000 km, with some penetrating deeper (Fukao & Obayashi 2013, p. 5920). Hot material rises: broad slow-wave conduits extend from near the core–mantle boundary up to about 1,000 km depth, and the one under Hawaii is about 800–1,000 km wide (French & Romanowicz 2015, pp. 95–96). Near its base lie two continent-sized regions of low shear-wave speed that cover about 30% of the core–mantle boundary (Garnero et al. 2016, p. 481).

**How it is drawn:** Below 660 km, intervals are about 1% thicker than a true-scale drawing. Absolute depths still shift because the shallower layers are rescaled.

**Cited numbers:**

- Depth: 660 km (ak135) to 2,891 km (PREM) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density (PREM, 670–2,891 km): 4.38–5.57 g/cm^3^ (prem1981: Table I, p. 308)
- P-wave speed (PREM, 670–2,891 km): 10.75–13.72 km/s (prem1981: Table I, p. 308)
- Sinking slabs: in a survey around the Pacific, most imaged slabs were stagnant above the 660 or trapped at 660–1,000 km (fukao2013: Abstract, p. 5920)
- Plumes: broad slow-wave conduits rise from near the core–mantle boundary to about 1,000 km depth; the one under Hawaii is about 800–1,000 km wide (french2015: pp. 95–96)

**Common questions:**

1. Q: How do density and P-wave speed change through the lower mantle?
   A: In PREM, density rises from 4.38 to 5.57 g/cm^3^ and P-wave speed from 10.75 to 13.72 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What are the four stages of a sinking slab?
   A: I stagnant above the 660; II penetrating it; III trapped at 660–1,000 km; IV sinking into the deep lower mantle. Most slabs imaged around the Pacific were at stage I or III (Fukao & Obayashi 2013).
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
3. Q: How were the slabs imaged?
   A: With P-wave tomography using more than 10 million travel times (Fukao & Obayashi 2013).
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
4. Q: What do plumes look like in seismic images?
   A: Broad, near-vertical conduits of slow shear waves rising from near the core–mantle boundary to about 1,000 km depth; under Hawaii about 800–1,000 km wide (French & Romanowicz 2015).
   Source: French & Romanowicz, pp. 95–96 [french2015]
5. Q: What sits near the base of the lower mantle?
   A: Two continent-sized low shear-velocity provinces, one beneath the Pacific and one beneath the Atlantic and western and southern Africa, covering about 30% of the core–mantle boundary (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
6. Q: Why do PREM and ak135 put its top at different depths?
   A: PREM puts the boundary at 670 km and ak135 at 660 km; they are separate fits to seismic data.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]

**Learn about this part (drill-in):**

- How it works: [layers view] In the cross-section, blue slabs of old plate sink, and pale plumes of hot rock rise from near the core. Where they sit is illustrative, and the speeds are not to scale.
- Opening question: Before you start: where do most sinking slabs around the Pacific end up?
  - At the core–mantle boundary
  - ✔ Stagnant above 660 km or trapped at 660–1,000 km
  - Back at the surface
  - Explanation: Most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km. Some penetrate deeper.
  - Source: Fukao & Obayashi (2013), p. 5920
- Test 1: How wide is the plume conduit under Hawaii?
  - About 10 km
  - ✔ About 800–1,000 km
  - About 5,000 km
  - Explanation: About 800–1,000 km wide, rising from near the core–mantle boundary.
  - Source: French & Romanowicz (2015), pp. 95–96
- Test 2: What share of the core–mantle boundary do the two low shear-velocity provinces cover?
  - About 3%
  - ✔ About 30%
  - All of it
  - Explanation: About 30%.
  - Source: Garnero et al. (2016), p. 481
- Test 3: How does P-wave speed change through PREM’s lower mantle?
  - ✔ It rises, from 10.75 to 13.72 km/s
  - It falls to zero
  - It stays constant
  - Explanation: It rises from 10.75 to 13.72 km/s between 670 and 2,891 km.
  - Source: PREM, Table I, p. 308

### Intermediate · Outer core

*id: outer-core · layer*

**Summary:** The outer core extends from 2,891 to 5,149.5 km and consists of liquid iron–nickel alloy with about 10% of a light element (McDonough & Sun 1995, p. 223; PREM).

**More detail:** Shear waves cannot propagate through the outer core: PREM gives it v~S~ = 0, so it is liquid (Table I, p. 308). P-wave speed rises from 8.06 to 10.36 km/s and density from 9.90 to 12.17 g/cm^3^. It is an iron–nickel alloy with 10 ± 5% of a light element such as oxygen, sulfur or silicon (McDonough & Sun 1995, p. 223), and the whole core is about 32.5% of Earth’s mass (Section 6, p. 244). The moving liquid makes the magnetic field (Song & Richards 1996, p. 221). Heat crossing from the core into the mantle helps drive mantle convection; an estimated 5–13 TW (Garnero et al. 2016, p. 481; Davies & Davies 2010, Section 4.8, p. 22).

**How it is drawn:** The lighter elements are given as one figure, 10 ± 5%. Which elements they are, and how much of each, is still uncertain (McDonough & Sun 1995, p. 223). The moving dots indicate that the material is liquid; they are not a simulation of its flow.

**Cited numbers:**

- Make-up: iron–nickel alloy with 10 ± 5% of a light element (O, S or Si) (mcdonough1995: Abstract, p. 223)
- Whole core (outer and inner), share of Earth’s mass: about 32.5% (mcdonough1995: Section 6, p. 244)
- Depth: 2,891–5,149.5 km (prem1981: Table I, p. 308)
- S-wave speed: 0 km/s (liquid) (prem1981: Table I, p. 308)
- P-wave speed: 8.06–10.36 km/s (prem1981: Table I, p. 308)
- Density: 9.90–12.17 g/cm^3^ (prem1981: Table I, p. 308)
- Temperature: about 4,000 K at the top (136 GPa) (hirose2013: p. 658)

**Common questions:**

1. Q: How do we know the outer core is liquid?
   A: Shear waves cannot travel through a liquid, and PREM gives the outer core a shear-wave speed of 0.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What is it made of?
   A: An iron–nickel alloy with 10 ± 5% of a light element such as oxygen, sulfur or silicon (McDonough & Sun 1995).
   Source: McDonough & Sun, p. 223 [mcdonough1995]
3. Q: How much of Earth’s iron is in the core?
   A: About 86% (McDonough & Sun 1995).
   Source: McDonough & Sun, p. 223 [mcdonough1995]
4. Q: How much of Earth’s mass is in the core?
   A: About 32.5%, for the whole core, outer and inner (McDonough & Sun 1995).
   Source: McDonough & Sun, Section 6, p. 244 [mcdonough1995]
5. Q: How does P-wave speed change across the outer core?
   A: It drops sharply at the core–mantle boundary, from 13.72 to 8.06 km/s, then rises to 10.36 km/s at the base.
   Source: PREM, Table I, p. 308 [prem1981]
6. Q: How much heat crosses from the core into the mantle?
   A: An estimated 5–13 TW, which is highly uncertain (Davies & Davies 2010). It helps drive mantle convection (Garnero et al. 2016).
   Source: Davies & Davies, §4.8, p. 22; Garnero et al., p. 481 [davies2010, garnero2016]

**Learn about this part (drill-in):**

- How it works: [quake view] Follow the blue S waves: every one stops at the outer core. The amber P waves cross it, bending as they slow down.
- Opening question: Before you start: how much of the core is lighter elements such as oxygen, sulfur or silicon?
  - None
  - ✔ About 10 ± 5%
  - About half
  - Explanation: About 10 ± 5%, in an iron–nickel alloy. Which elements, and how much of each, is still uncertain.
  - Source: McDonough & Sun (1995), p. 223
- Test 1: What share of Earth’s mass is in the core, outer and inner together?
  - About 3%
  - ✔ About 32.5%
  - About 75%
  - Explanation: About 32.5%.
  - Source: McDonough & Sun (1995), Section 6, p. 244
- Test 2: What happens to P-wave speed at the top of the outer core?
  - ✔ It drops sharply, from 13.72 to 8.06 km/s
  - It rises sharply
  - It drops to zero
  - Explanation: It drops sharply, from 13.72 to 8.06 km/s, then rises to 10.36 km/s at the base.
  - Source: PREM, Table I, p. 308
- Test 3: About how much heat crosses from the core into the mantle?
  - ✔ An estimated 5–13 TW
  - Exactly 47 TW
  - None
  - Explanation: An estimated 5–13 TW, which is highly uncertain.
  - Source: Davies & Davies (2010), §4.8, p. 22

### Intermediate · Inner core

*id: inner-core · layer*

**Summary:** The inner core is a solid iron sphere about 1,220 km in radius, accounting for less than 1% of Earth’s volume. It rotates at a slightly different rate from the mantle (Song & Richards 1996, p. 221; Ishii & Dziewoński 2002, p. 14026).

**More detail:** Shear-wave propagation resumes in the inner core: PREM gives v~S~ of 3.50–3.67 km/s, so it is solid, and its density reaches 13.09 g/cm^3^ at the centre (Table I, p. 308). It grows as the liquid around it freezes (Song & Richards 1996, p. 221). Seismic waves travel faster pole to pole than across the equator, and the western half differs from the eastern (Deuss 2014, p. 103). Its rotation relative to the mantle was estimated in 1996 at about 1° per year faster (Song & Richards 1996, p. 221). Yang & Song (2023, pp. 182, 184–185) infer that the difference nearly stopped around 2009 and may have reversed slightly, as part of a proposed seven-decade oscillation.

**How it is drawn:** Shown as a plain solid ball. Its anisotropy and the differences between its eastern and western halves are not shown (Deuss 2014, p. 103).

**Cited numbers:**

- Depth: 5,149.5–6,371 km (prem1981: Table I, p. 308)
- S-wave speed: 3.50–3.67 km/s (solid) (prem1981: Table I, p. 308)
- Density: 12.76–13.09 g/cm^3^ (prem1981: Table I, p. 308)
- Size: radius about 1,220 km; less than 1% of Earth’s volume (song1996, ishii2002: Song & Richards p. 221; Ishii & Dziewoński p. 14026)
- Rotation relative to the mantle: estimated in 1996 at about 1° per year faster; around 2009 the difference nearly stopped and may have reversed slightly, which Yang & Song read as part of a proposed seven-decade oscillation (song1996, yang2023: Song & Richards p. 221; Yang & Song pp. 182, 184–185)
- Structure: seismic waves travel faster pole to pole than across the equator, and the western half differs from the eastern (deuss2014: Abstract, p. 103)

**Common questions:**

1. Q: How do we know the inner core is solid?
   A: Shear waves travel through it at 3.50–3.67 km/s in PREM; they could not cross a liquid.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: How big is it?
   A: About 1,220 km in radius (Song & Richards 1996), less than 1% of Earth’s volume (Ishii & Dziewoński 2002).
   Source: Song & Richards, p. 221; Ishii & Dziewoński, p. 14026 [song1996, ishii2002]
3. Q: Why is it growing?
   A: The liquid outer core around it freezes onto it (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]
4. Q: What is seismic anisotropy in the inner core?
   A: Waves travel faster pole to pole than across the equator (Deuss 2014).
   Source: Deuss, p. 103 [deuss2014]
5. Q: Does the inner core turn with the mantle?
   A: Not exactly. In 1996 it was estimated to turn about 1° per year faster (Song & Richards). Yang & Song (2023) infer the difference nearly stopped around 2009 and may have reversed slightly.
   Source: Song & Richards, p. 221; Yang & Song, pp. 182, 184–185 [song1996, yang2023]
6. Q: Is the inner core the same all the way round?
   A: No. The western half differs from the eastern in how seismic waves travel through it (Deuss 2014).
   Source: Deuss, p. 103 [deuss2014]

**Learn about this part (drill-in):**

- How it works: [vs view] The cross-section is coloured by S-wave speed. The outer core is dark: 0, liquid. The inner core lights up again: S waves pass, so it is solid.
- Opening question: Before you start: does the inner core turn exactly with the mantle?
  - Yes, always
  - ✔ Not exactly: its rotation relative to the mantle has changed over time
  - Explanation: Not exactly. In 1996 it was estimated to turn about 1° per year faster; Yang & Song infer the difference nearly stopped around 2009 and may have reversed slightly.
  - Source: Song & Richards (1996), p. 221; Yang & Song (2023), pp. 182, 184–185
- Test 1: Which way do seismic waves travel faster through the inner core?
  - ✔ Pole to pole
  - Across the equator
  - The same in every direction
  - Explanation: Pole to pole, faster than across the equator.
  - Source: Deuss (2014), p. 103
- Test 2: Why is the inner core growing?
  - ✔ The liquid outer core freezes onto it
  - Meteorites add to it
  - The mantle sinks into it
  - Explanation: The liquid outer core around it freezes onto it.
  - Source: Song & Richards (1996), p. 221
- Test 3: How fast do shear waves travel in the inner core in PREM?
  - 0 km/s
  - ✔ 3.50–3.67 km/s
  - About 13 km/s
  - Explanation: 3.50–3.67 km/s: they pass, so it is solid.
  - Source: PREM, Table I, p. 308

### Intermediate · Moho

*id: moho · boundary*

**Summary:** The Moho marks the base of the crust, where P-wave speed rises to about 8 km/s. CRUST 5.1 places it 38 km below sea level beneath continents and 12.6 km beneath oceans (Mooney et al. 1998, p. 735).

**More detail:** The Moho separates crustal and mantle rock, producing a distinct increase in P-wave speed: from 6.80 to 8.11 km/s in PREM (Table I, p. 308). Under continents the speed just below it, Pn, averages 8.09 km/s (Christensen & Mooney 1995, p. 9761). Its depth follows the crust. In CRUST 5.1 the mean is 38 km below sea level under continents and 12.6 km under oceans, including about 4 km of water (Mooney et al. 1998, Section 8, p. 735). Under normal ocean it lies about 7 km below the top of the igneous crust (White et al. 1992, p. 19,683).

**How it is drawn:** The drawn Moho follows the crust at 7 km beneath the schematic oceanic sectors and 35 km beneath the continental sector.

**Cited numbers:**

- Mean depth below sea level (CRUST 5.1): 38 km under continents; 12.6 km under oceans (mooney1998: Section 8, p. 735)
- P-wave speed just below it (Pn): 8.09 km/s on average under continents (christensen1995: Abstract, p. 9761)
- P-wave speed jump in PREM: 6.80 → 8.11 km/s (prem1981: Table I, p. 308)

**Common questions:**

1. Q: How is the Moho detected?
   A: As a jump in P-wave speed where crust gives way to mantle: 6.80 to 8.11 km/s in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What is Pn?
   A: The P-wave speed just below the Moho, 8.09 km/s on average under continents (Christensen & Mooney 1995).
   Source: Christensen & Mooney, p. 9761 [christensen1995]
3. Q: How deep is the Moho under continents?
   A: 38 km below sea level on average in CRUST 5.1 (Mooney et al. 1998).
   Source: CRUST 5.1, Section 8, p. 735 [mooney1998]
4. Q: How deep is it under oceans?
   A: 12.6 km below sea level on average in CRUST 5.1, including about 4 km of water (Mooney et al. 1998); about 7 km below the top of normal igneous crust (White et al. 1992).
   Source: CRUST 5.1, Section 8, p. 735; White et al., p. 19,683 [mooney1998, white1992]
5. Q: Why does the Moho depth vary so much?
   A: It is the base of the crust, so it follows the crust’s thickness: from 20.5 km in stretched continental crust to 70 km under Tibet (Mooney et al. 1998).
   Source: CRUST 5.1, Plate 1, p. 733 [mooney1998]
6. Q: Is the Moho the base of the plate?
   A: No. The plate also includes the uppermost mantle below the Moho. PREM’s lid continues to 80 km.
   Source: PREM, pp. 300, 308 [prem1981]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: How is the Moho detected?
  - Answer: As a jump in P-wave speed where crust gives way to mantle: 6.80 to 8.11 km/s in PREM.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): What is Pn?
  - Answer: The P-wave speed just below the Moho, 8.09 km/s on average under continents (Christensen & Mooney 1995).
  - Source: Christensen & Mooney, p. 9761
- Test 2 (think, then reveal): How deep is the Moho under continents?
  - Answer: 38 km below sea level on average in CRUST 5.1 (Mooney et al. 1998).
  - Source: CRUST 5.1, Section 8, p. 735
- Test 3 (think, then reveal): How deep is it under oceans?
  - Answer: 12.6 km below sea level on average in CRUST 5.1, including about 4 km of water (Mooney et al. 1998); about 7 km below the top of normal igneous crust (White et al. 1992).
  - Source: CRUST 5.1, Section 8, p. 735; White et al., p. 19,683

### Intermediate · Base of the plate: PREM average

*id: lab · boundary*

**Summary:** PREM’s seismic lid ends at 80 km, where the shear quality factor Q~μ~ decreases from 600 to 80: the lower Q~μ~, the more shear waves are damped. This boundary is used as a proxy for the lithosphere–asthenosphere boundary in the model (PREM, pp. 300, 308).

**More detail:** Because PREM is a global average, it assigns a single depth to the base of the seismic lid: 80 km. There the shear quality factor Q~μ~ drops from 600 to 80, and below it the effective isotropic shear-wave speed keeps falling through the low-velocity zone (Dziewonski & Anderson 1981, Table I and footnote, p. 308). Dziewonski & Anderson treat the lid as the main part of the seismic lithosphere (pp. 300, 308), so this model draws the boundary between plate and asthenosphere here. The real boundary varies. Under the oceans it deepens as plates age: about 55 km at 25 million years and 82 km at 129 million years in one receiver-function study, and under old continents depleted mantle reaches roughly 200 km (Fischer et al. 2010, pp. 553, 565).

**How it is drawn:** A single depth, 80 km, used everywhere. The real boundary varies in depth: the measured line shows how.

**Cited numbers:**

- PREM seismic lid base used in the drawing: 80 km (prem1981: Table I, p. 308)
- Real depth under oceans: deepens with plate age: about 55 km at 25 Ma and 76 km at 49 Ma (Philippine Sea Plate), 82 km at 129 Ma (Pacific) (fischer2010: p. 565)
- Under old continents (cratons): depleted mantle reaches roughly 200 km (fischer2010: p. 553)

**Common questions:**

1. Q: What changes at PREM’s lid base?
   A: The shear quality factor Q~μ~ drops from 600 to 80, so shear waves are damped more strongly below it.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: Why call it a proxy?
   A: PREM gives one global depth, 80 km. For the visualisation, the model uses it as a proxy for the lithosphere–asthenosphere boundary.
   Source: PREM, pp. 300, 308 [prem1981]
3. Q: What does the shear-wave speed do below it?
   A: The effective isotropic speed keeps falling through the low-velocity zone, from 4.47 km/s at 80 km to 4.42 km/s just above 220 km.
   Source: PREM, Table I and footnote, p. 308 [prem1981]
4. Q: What is above and below it?
   A: Above: the lid, the mantle part of the lithosphere. Below: the low-velocity zone, drawn as the asthenosphere.
   Source: PREM, pp. 300, 308 [prem1981]
5. Q: Is the plate the same thickness everywhere?
   A: No. PREM gives a single depth because it is a global average.
   Source: PREM, pp. 299–300, 308 [prem1981]
6. Q: Is the lid isotropic?
   A: No. PREM makes 24.4–220 km transversely isotropic and also gives effective isotropic speeds.
   Source: PREM, Table I footnote, p. 308 [prem1981]
7. Q: Is the real lithosphere–asthenosphere boundary at 80 km everywhere?
   A: No. Under the oceans it deepens with plate age, from about 55 km at 25 million years to 82 km at 129 million years in one study; under old continents depleted mantle reaches roughly 200 km (Fischer et al. 2010).
   Source: Fischer et al., pp. 553, 565 [fischer2010]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What changes at PREM’s lid base?
  - Answer: The shear quality factor Q~μ~ drops from 600 to 80, so shear waves are damped more strongly below it.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): Why call it a proxy?
  - Answer: PREM gives one global depth, 80 km. For the visualisation, the model uses it as a proxy for the lithosphere–asthenosphere boundary.
  - Source: PREM, pp. 300, 308
- Test 2 (think, then reveal): What does the shear-wave speed do below it?
  - Answer: The effective isotropic speed keeps falling through the low-velocity zone, from 4.47 km/s at 80 km to 4.42 km/s just above 220 km.
  - Source: PREM, Table I and footnote, p. 308
- Test 3 (think, then reveal): What is above and below it?
  - Answer: Above: the lid, the mantle part of the lithosphere. Below: the low-velocity zone, drawn as the asthenosphere.
  - Source: PREM, pp. 300, 308

### Intermediate · Base of the plate: measured

*id: lab-measured · boundary*

**Summary:** Where the lithosphere–asthenosphere boundary has been measured, it is not at one depth. Under the oceans it deepens as plates age; under old continents it lies deeper still (Fischer et al. 2010, pp. 553, 565).

**More detail:** Receiver functions, converted seismic waves, pick out the boundary directly. Under the oceans it gets deeper as plates age and cool: about 55 km at 25 million years, 76 km at 49 million years in the Philippine Sea Plate and 82 km at 129 million years in the Pacific (Fischer et al. 2010, p. 565). Under old continents (cratons), depleted mantle reaches roughly 200 km (p. 553).

**How it is drawn:** The line follows Fischer et al. (2010): 55 to 82 km under the oceans, joined straight between the measured ages, and about 200 km under the continent. Which side of the ocean is young is illustrative, and ages outside 25–129 million years are not drawn.

**Cited numbers:**

- Under oceans, by plate age: 55 km at 25 Ma, 76 km at 49 Ma, 82 km at 129 Ma (fischer2010: p. 565)
- Under old continents: roughly 200 km (fischer2010: p. 553)

**Common questions:**

1. Q: Why does the line get deeper across the ocean?
   A: Older ocean plates have cooled for longer, so the lithosphere is thicker: about 55 km at 25 million years and 82 km at 129 million years (Fischer et al. 2010).
   Source: Fischer et al., p. 565 [fischer2010]
2. Q: Why is it so much deeper under the continent?
   A: Under old continents depleted mantle reaches roughly 200 km (Fischer et al. 2010).
   Source: Fischer et al., p. 553 [fischer2010]

**Learn about this part (drill-in):**

- How it works: [labmap view] Each ocean cell is coloured by the depth of the base of the plate, worked out from the age of its sea floor: pale near the mid-ocean ridges, where the plate is young and thin, and darker on older floor. The oldest floor, in the western Pacific, is beyond the measured ages and shows grey.
- Opening question: Before you start: is the base of the ocean plates at the same depth everywhere?
  - Yes, about 80 km everywhere
  - ✔ No: it gets deeper as the plate gets older
  - No: it gets shallower as the plate gets older
  - Explanation: No. Measured with receiver functions, it deepens as the plate ages and cools: about 55 km at 25 million years and 82 km at 129 million years.
  - Source: Fischer et al. (2010), p. 565
- Test 1: How deep is it under the 49-million-year-old Philippine Sea Plate?
  - ✔ About 76 km
  - About 20 km
  - About 200 km
  - Explanation: About 76 km.
  - Source: Fischer et al. (2010), p. 565
- Test 2: Where does it lie deepest?
  - ✔ Under old continents, at roughly 200 km
  - Under the mid-ocean ridges
  - Under the oldest Pacific floor
  - Explanation: Under old continents (cratons), where depleted mantle reaches roughly 200 km.
  - Source: Fischer et al. (2010), p. 553
- Test 3: Why are some ocean cells on the map grey?
  - ✔ Their sea floor is younger than 25 or older than 129 million years, outside the measured ages
  - They are land
  - They have no plate under them
  - Explanation: Their floor is younger than 25 or older than 129 million years. Fischer et al. measured depths only between those ages, so no depth is given.
  - Source: Fischer et al. (2010), p. 565; Seton et al. (2020) age grid

### Intermediate · 410 km discontinuity

*id: d410 · boundary*

**Summary:** This discontinuity marks the top of the mantle transition zone, where olivine changes into its high-pressure forms. Its depth is 410 km in ak135 and 400 km in PREM (Pearson et al. 2014, p. 221).

**More detail:** Olivine dominates to about 400 km depth; below that its high-pressure forms wadsleyite and ringwoodite take over (Pearson et al. 2014, p. 221). The change shows as a jump in density, from 3.54 to 3.72 g/cm^3^ in PREM (Table I, p. 308). PREM puts the boundary at 400 km and ak135 at 410 km (Table 3, pp. 122–123).

**How it is drawn:** Shown as a sharp surface at 410 km.

**Cited numbers:**

- Depth: 410 km (ak135); 400 km (PREM) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density jump: 3.54 → 3.72 g/cm^3^ (prem1981: Table I, p. 308)
- Mineral change: olivine → wadsleyite, at about 14 GPa (frost2008: p. 172)

**Common questions:**

1. Q: What changes at the 410?
   A: Olivine gives way to its high-pressure forms, wadsleyite and ringwoodite (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
2. Q: How big is the density jump?
   A: From 3.54 to 3.72 g/cm^3^ in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: Why is it seen in seismic data?
   A: Seismic speeds and density jump across it, so waves reflect and refract there. PREM’s P-wave speed rises from 8.91 to 9.13 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: Is it at 400 or 410 km?
   A: 400 km in PREM and 410 km in ak135.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
5. Q: Which side of it holds more water?
   A: Below it: wadsleyite and ringwoodite can hold up to about 2.5 wt% water (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
6. Q: What layer starts below it?
   A: The mantle transition zone, down to 660 km in ak135.
   Source: ak135, Table 3, pp. 122–123 [ak1351995]
7. Q: What mineral change happens at 410 km?
   A: Olivine turns into the denser structure wadsleyite, at about 14 GPa (Frost 2008).
   Source: Frost, p. 172 [frost2008]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What changes at the 410?
  - Answer: Olivine gives way to its high-pressure forms, wadsleyite and ringwoodite (Pearson et al. 2014).
  - Source: Pearson et al., p. 221
- Test 1 (think, then reveal): How big is the density jump?
  - Answer: From 3.54 to 3.72 g/cm^3^ in PREM.
  - Source: PREM, Table I, p. 308
- Test 2 (think, then reveal): Why is it seen in seismic data?
  - Answer: Seismic speeds and density jump across it, so waves reflect and refract there. PREM’s P-wave speed rises from 8.91 to 9.13 km/s.
  - Source: PREM, Table I, p. 308
- Test 3 (think, then reveal): Is it at 400 or 410 km?
  - Answer: 400 km in PREM and 410 km in ak135.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123

### Intermediate · 660 km discontinuity

*id: d660 · boundary*

**Summary:** This boundary separates the mantle transition zone from the lower mantle, at 660 km in ak135 and 670 km in PREM. Many subducting slabs stall around it (Fukao & Obayashi 2013, p. 5920).

**More detail:** The 660 km discontinuity marks the end of the transition zone (Pearson et al. 2014, p. 221). Density jumps from 3.99 to 4.38 g/cm^3^ in PREM (Table I, p. 308). Sinking plates often stall here. In a P-wave survey around the Pacific, most imaged slabs were stagnant above it or trapped just below, at 660–1,000 km; some penetrated it and sank deeper (Fukao & Obayashi 2013, p. 5920). Here ringwoodite breaks down into perovskite-structured (Mg,Fe)SiO~3~ and ferropericlase, at about 24 GPa (Frost 2008, p. 172).

**How it is drawn:** Shown as a sharp surface at 660 km.

**Cited numbers:**

- Depth: 660 km (ak135); 670 km (PREM) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density jump: 3.99 → 4.38 g/cm^3^ (prem1981: Table I, p. 308)
- Sinking slabs: in a survey around the Pacific, most imaged slabs were stagnant above it or trapped just below it, at 660–1,000 km (fukao2013: Abstract, p. 5920)
- Mineral change: ringwoodite → perovskite-structured (Mg,Fe)SiO~3~ + ferropericlase, at about 24 GPa: the start of the lower mantle (frost2008: p. 172)

**Common questions:**

1. Q: How big is the density jump at the 660?
   A: From 3.99 to 4.38 g/cm^3^ in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What happens to slabs that reach it?
   A: Most imaged around the Pacific were stagnant above it or trapped just below, at 660–1,000 km. Some penetrate it (Fukao & Obayashi 2013).
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
3. Q: How much does P-wave speed jump?
   A: From 10.27 to 10.75 km/s in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: Is it at 660 or 670 km?
   A: 660 km in ak135 and 670 km in PREM.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
5. Q: What layers does it separate?
   A: The transition zone above, from 410 km, and the lower mantle below (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
6. Q: How were stalled slabs found?
   A: By P-wave tomography using more than 10 million travel times (Fukao & Obayashi 2013).
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
7. Q: What mineral change happens at 660 km?
   A: Ringwoodite breaks down into perovskite-structured (Mg,Fe)SiO~3~ and ferropericlase, at about 24 GPa. This marks the beginning of the lower mantle (Frost 2008).
   Source: Frost, p. 172 [frost2008]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: How big is the density jump at the 660?
  - Answer: From 3.99 to 4.38 g/cm^3^ in PREM.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): What happens to slabs that reach it?
  - Answer: Most imaged around the Pacific were stagnant above it or trapped just below, at 660–1,000 km. Some penetrate it (Fukao & Obayashi 2013).
  - Source: Fukao & Obayashi, p. 5920
- Test 2 (think, then reveal): How much does P-wave speed jump?
  - Answer: From 10.27 to 10.75 km/s in PREM.
  - Source: PREM, Table I, p. 308
- Test 3 (think, then reveal): Is it at 660 or 670 km?
  - Answer: 660 km in ak135 and 670 km in PREM.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123

### Intermediate · Core–mantle boundary

*id: cmb · boundary*

**Summary:** At 2,891 km, solid mantle rock meets liquid metal in the outer core. Density almost doubles and shear waves stop (PREM, Table I, p. 308).

**More detail:** Across the core–mantle boundary, density increases from 5.57 to 9.90 g/cm^3^ and the shear-wave speed falls from 7.26 km/s to zero (PREM, Table I, p. 308). PREM puts it at 2,891 km and ak135 at 2,891.5 km. The base of the mantle is a thermal boundary layer; the estimated temperature contrast across it is about 1,000 ± 500 K (Lay et al. 1998, p. 461). Heat crossing it, an estimated 5–13 TW (Davies & Davies 2010, Section 4.8, p. 22), helps drive mantle convection (Garnero et al. 2016, p. 481). Two continent-sized low-velocity zones above it cover about 30% of its area (p. 481).

**How it is drawn:** Shown as a smooth sphere.

**Cited numbers:**

- Depth: 2,891 km (PREM); 2,891.5 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Density jump: 5.57 → 9.90 g/cm^3^ (prem1981: Table I, p. 308)
- S-wave speed: 7.26 → 0 km/s (prem1981: Table I, p. 308)
- Estimated temperature contrast across the thermal boundary layer at the base of the mantle: about 1,000 ± 500 K (lay1998: p. 461)
- Above it: two continent-sized low-velocity zones cover about 30% of its area (garnero2016: p. 481)
- Temperature at the boundary: about 4,050 ± 500 K (anzellini2013: p. 466)

**Common questions:**

1. Q: What happens to density across the boundary?
   A: It jumps from 5.57 to 9.90 g/cm^3^ in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: Why do shear waves stop here?
   A: The outer core below is liquid. PREM’s shear-wave speed falls from 7.26 km/s to zero.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: What is the thermal boundary layer?
   A: The base of the mantle, heated from the core below. The estimated temperature contrast across it is about 1,000 ± 500 K (Lay et al. 1998).
   Source: Lay et al., p. 461 [lay1998]
4. Q: How much heat crosses the boundary?
   A: An estimated 5–13 TW, which is highly uncertain (Davies & Davies 2010).
   Source: Davies & Davies, §4.8, p. 22 [davies2010]
5. Q: What lies on top of it?
   A: Two continent-sized low-velocity zones, beneath the Pacific and beneath the Atlantic and western and southern Africa, covering about 30% of its area (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
6. Q: How deep is it?
   A: 2,891 km in PREM and 2,891.5 km in ak135.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
7. Q: How hot is the core–mantle boundary?
   A: About 4,050 ± 500 K, estimated from the melting of iron (Anzellini et al. 2013).
   Source: Anzellini et al., p. 466 [anzellini2013]

**Learn about this part (drill-in):**

- How it works: [temperature view] The cross-section is coloured by temperature: the brighter, the hotter. Through most of the mantle the colour changes only slowly; the big step is just above the core.
- Opening question: Before you start: how hot is the core–mantle boundary?
  - About 1,000 K
  - ✔ About 4,050 K
  - About 10,000 K
  - Explanation: About 4,050 ± 500 K, estimated from the melting of iron.
  - Source: Anzellini et al. (2013), p. 466
- Test 1: What is the temperature contrast across the boundary layer at the base of the mantle?
  - ✔ About 1,000 ± 500 K
  - About 10 K
  - About 10,000 K
  - Explanation: About 1,000 ± 500 K, across the thermal boundary layer heated by the core below.
  - Source: Lay et al. (1998), p. 461
- Test 2: How much heat crosses from the core into the mantle?
  - ✔ An estimated 5–13 TW
  - None
  - More than 1,000 TW
  - Explanation: An estimated 5–13 TW, which is highly uncertain. It helps drive mantle convection.
  - Source: Davies & Davies (2010), §4.8, p. 22; Garnero et al. (2016), p. 481
- Test 3: What happens to density across the boundary?
  - ✔ It jumps from 5.57 to 9.90 g/cm^3^
  - It falls
  - It stays the same
  - Explanation: It jumps from 5.57 to 9.90 g/cm^3^ in PREM.
  - Source: PREM, Table I, p. 308

### Intermediate · Inner-core boundary

*id: icb · boundary*

**Summary:** At 5,149.5 km in PREM, the liquid outer core meets the solid inner core and freezes onto it (Song & Richards 1996, p. 221; PREM).

**More detail:** Shear-wave propagation resumes at the inner-core boundary: v~S~ rises from 0 to 3.50 km/s and density from 12.17 to 12.76 g/cm^3^ (PREM, Table I, p. 308). PREM puts it at 5,149.5 km and ak135 at 5,153.5 km (Table 3, pp. 122–123). The inner core grows as the liquid outer core freezes onto it here (Song & Richards 1996, p. 221).

**How it is drawn:** Shown as a smooth sphere.

**Cited numbers:**

- Depth: 5,149.5 km (PREM); 5,153.5 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- S-wave speed: 0 → 3.50 km/s (prem1981: Table I, p. 308)
- Density jump: 12.17 → 12.76 g/cm^3^ (prem1981: Table I, p. 308)
- Temperature: perhaps 5,200–5,700 K (hirose2013: Summary points, p. 682)

**Common questions:**

1. Q: What happens at the inner-core boundary?
   A: Liquid outer core freezes onto the solid inner core, so the inner core grows (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]
2. Q: How does the shear-wave speed change?
   A: From 0 in the liquid to 3.50 km/s in the solid inner core.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: How big is the density jump?
   A: From 12.17 to 12.76 g/cm^3^ in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: How deep is it?
   A: 5,149.5 km in PREM and 5,153.5 km in ak135.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
5. Q: How much does P-wave speed jump?
   A: From 10.36 to 11.03 km/s in PREM.
   Source: PREM, Table I, p. 308 [prem1981]
6. Q: How far is it from the centre?
   A: About 1,220 km, the radius of the inner core (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]
7. Q: How hot is the inner-core boundary?
   A: Perhaps 5,200–5,700 K (Hirose et al. 2013). Pure iron would melt at about 6,230 ± 500 K at that pressure; the core alloy melts lower (Anzellini et al. 2013).
   Source: Hirose et al., p. 682; Anzellini et al., p. 464 [hirose2013, anzellini2013]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What happens at the inner-core boundary?
  - Answer: Liquid outer core freezes onto the solid inner core, so the inner core grows (Song & Richards 1996).
  - Source: Song & Richards, p. 221
- Test 1 (think, then reveal): How does the shear-wave speed change?
  - Answer: From 0 in the liquid to 3.50 km/s in the solid inner core.
  - Source: PREM, Table I, p. 308
- Test 2 (think, then reveal): How big is the density jump?
  - Answer: From 12.17 to 12.76 g/cm^3^ in PREM.
  - Source: PREM, Table I, p. 308
- Test 3 (think, then reveal): How deep is it?
  - Answer: 5,149.5 km in PREM and 5,153.5 km in ak135.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123

## Advanced

### Guided lesson (Advanced)

1. **[transition-zone]** How do we know the transition zone holds water? A ringwoodite inclusion in a Brazilian diamond carries at least 1.4–1.5 wt% H~2~O, implying about 1 wt% where it came from.
   - Sources: Pearson et al. (2014), pp. 221–223
2. **[d520]** Inside the transition zone, wadsleyite turns into ringwoodite at about 17.5 GPa, roughly 520 km deep. Most reference models leave this boundary out: it is a gradient about 25 km wide and is not seen everywhere.
   - Sources: Frost (2008), pp. 172, 174–175
3. **[d660]** More than 10 million P-wave travel times show slabs at four stages: stalled above 660 km, penetrating, trapped at 660–1,000 km, or sinking deeper.
   - Sources: Fukao & Obayashi (2013), p. 5920
4. **[lower-mantle]** Broad conduits of slow shear waves rise from near the core. A thin plume would need an implausible 1,500–2,000 °C excess to match them.
   - Sources: French & Romanowicz (2015), pp. 95–97
5. **[d-double-prime]** The lowermost ~200 km is complex: intermittent 1.5–3% speed jumps, laterally varying anisotropy and patches where speeds fall by more than 10%.
   - Sources: Lay et al. (1998), pp. 461–462
6. **[post-perovskite]** Above 125 GPa and 2,500 K, about 2,700 km deep, perovskite turns into a 1.0–1.2% denser post-perovskite phase. It occurs at the depth of the D″ discontinuity and may explain it.
   - Sources: Murakami et al. (2004), Abstract, p. 855; p. 857
7. **[llsvp]** Two provinces of slow shear waves cover about 30% of the core–mantle boundary. One interpretation is dense thermochemical piles.
   - Sources: Garnero et al. (2016), pp. 481, 485
8. **[cmb]** P-wave speed drops from 13.717 to 8.065 km/s into the liquid core. The thermal boundary layer above has an estimated contrast of 1,000 ± 500 K.
   - Sources: PREM, Table I, p. 308; Lay et al. (1998), p. 461
9. **[inner-core]** Does the inner core spin faster than the mantle? Estimates have fallen from about 1° per year to near zero, and Yang & Song propose a seven-decade oscillation.
   - Sources: Song & Richards (1996), pp. 222–223; Deuss (2014), p. 115; Yang & Song (2023), pp. 182, 184–185
10. **[innermost-inner-core]** A central region about 300 km in radius with different anisotropy has been proposed. Deuss finds the evidence not compelling.
   - Sources: Ishii & Dziewoński (2002), p. 14026; Deuss (2014), p. 111

### Tour (Advanced)

- Opening: Advanced tour: 21 parts, from the surface down to the centre.
- Each part: its Summary (below), plus the last question of its drill-in when that drill-in is multiple choice.
- Closing: Back to the whole Earth. Pick a layer to look closer, or play the tour again.

### Advanced · Continental crust

*id: continental-crust · layer · within crust*

**Summary:** Seismic compilations, a global 5° model and geochemical estimates indicate continental crust about 38–41 km thick, containing about 61% SiO~2~ and becoming more mafic with depth (Christensen & Mooney 1995; Mooney et al. 1998; Rudnick & Gao 2003).

**More detail:** There are two main seismic estimates of crustal thickness: Christensen & Mooney’s compilation gives a weighted mean of 41.1 km, with 30.5 km in extended crust and 46.3 km in orogens (1995, p. 9761); CRUST 5.1 gives 38 km, with type averages of 40.8 km for shields, 39.0 for platforms, 42.7 for orogens and 30.5 for extended crust (Mooney et al. 1998, p. 744; Figure 3a, p. 730). Refraction under Tibet has measured 72 km (Christensen & Mooney, p. 9764). Composition comes two ways. Christensen & Mooney convert seismic speeds to a model with mean density 2,830 kg m^-3^ and 61.8 wt% SiO~2~ (p. 9761). Rudnick & Gao’s geochemical estimate gives 60.6 wt% SiO~2~, falling from 66.6 in the upper crust through 63.5 in the middle crust (12–23 km in a ≈40 km crust) to 53.4 in the lower crust (Table 11, p. 53; pp. 20–21). ak135 uses two crustal layers, 0–20 and 20–35 km, with its Moho at 35 km (Kennett et al. 1995, Table 3, p. 122). Davies & Davies’ Section 3 components give continents 13.8 TW at 73 mW m^-2^; their final continental mean is 70.9 mW m^-2^ (pp. 16, 20).

**How it is drawn:** The continental sector is schematic. Its 35 km ak135 reference thickness is drawn as 150 km. The Crust thickness view shows the real thickness worldwide, from CRUST1.0.

**Cited numbers:**

- Weighted average thickness: 41.1 km; extended crust 30.5 km, orogens 46.3 km (christensen1995: Abstract, p. 9761)
- CRUST 5.1 averages: shield 40.8, platform 39.0, orogen 42.7, extended 30.5 km (mooney1998: Figure 3a, p. 730)
- Middle and lower crust (≈40 km crust): middle 12–23 km, lower 23 km to the Moho (rudnick2003: Section 3.01.3.1, pp. 20–21)
- Christensen & Mooney model means: density, SiO~2~: 2,830 kg m^-3^, 61.8 wt% (christensen1995: Abstract, p. 9761)
- Upper / middle / lower crust SiO~2~, MgO, K~2~O (wt.%): 66.6, 2.48, 2.80 / 63.5, 3.59, 2.30 / 53.4, 7.24, 0.61 (rudnick2003: Table 11, p. 53)
- ak135 crust: 0–20 km and 20–35 km layers; Moho at 35 km (ak1351995: Table 3, pp. 122–123)
- Heat flowing out of the whole Earth: 47 ± 2 TW; preferred estimate 46.7 TW, from 38,347 measurements with modelled corrections for young ocean floor and hotspots (davies2010: Abstract, p. 5; Table 7, p. 20)
- Section 3 components: continents / ocean floor older than 66.5 Ma: 13.8 TW at 73 mW m^-2^ / 7.8 TW at 66 mW m^-2^ (davies2010: Section 3, p. 16)
- Ocean floor younger than 66.5 Ma: 23.1 TW at 128 mW m^-2^: about half of all heat loss (davies2010: Section 3, p. 16)

**Common questions:**

1. Q: How do the two seismic thickness estimates differ?
   A: Christensen & Mooney’s weighted compilation gives 41.1 km (1995); CRUST 5.1 gives a global continental average of 38 km (Mooney et al. 1998).
   Source: Christensen & Mooney, p. 9761; CRUST 5.1, p. 744 [christensen1995, mooney1998]
2. Q: How does crustal thickness vary by tectonic type in CRUST 5.1?
   A: Shield 40.8, platform 39.0, orogen 42.7 and extended crust 30.5 km (Mooney et al. 1998).
   Source: CRUST 5.1, Figure 3a, p. 730 [mooney1998]
3. Q: How do seismic and geochemical estimates of bulk SiO~2~ compare?
   A: Christensen & Mooney’s seismic model mean is 61.8 wt% (1995); Rudnick & Gao’s geochemical estimate is 60.6 wt% (2003).
   Source: Christensen & Mooney, p. 9761; Rudnick & Gao, Table 11, p. 53 [christensen1995, rudnick2003]
4. Q: How is the crust divided in Rudnick & Gao?
   A: For a ≈40 km crust: upper crust to 12 km, middle crust 12–23 km, lower crust from 23 km to the Moho (2003). SiO~2~ is 66.6, 63.5 and 53.4 wt% in these layers.
   Source: Rudnick & Gao, pp. 20–21; Table 11, p. 53 [rudnick2003]
5. Q: How thick is the crust under Tibet?
   A: 70 km in CRUST 5.1 (Mooney et al. 1998); refraction has measured 72 km (Christensen & Mooney 1995).
   Source: CRUST 5.1, Plate 1, p. 733; Christensen & Mooney, p. 9764 [mooney1998, christensen1995]
6. Q: How does ak135 represent the crust?
   A: As two layers, 0–20 km and 20–35 km, with the Moho at 35 km. Kennett et al. note this continental-style crust.
   Source: ak135, p. 110; Table 3, p. 122 [ak1351995]
7. Q: Why do two continental heat-flow means appear in Davies & Davies?
   A: 73 mW m^-2^ (13.8 TW) is a Section 3 component; 70.9 mW m^-2^ is the final continental mean in Table 7.
   Source: Davies & Davies, Section 3, p. 16; Table 7, p. 20 [davies2010]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid. Moves with its tectonic plate. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: How do the two seismic thickness estimates differ?
  - Answer: Christensen & Mooney’s weighted compilation gives 41.1 km (1995); CRUST 5.1 gives a global continental average of 38 km (Mooney et al. 1998).
  - Source: Christensen & Mooney, p. 9761; CRUST 5.1, p. 744
- Test 1 (think, then reveal): How does crustal thickness vary by tectonic type in CRUST 5.1?
  - Answer: Shield 40.8, platform 39.0, orogen 42.7 and extended crust 30.5 km (Mooney et al. 1998).
  - Source: CRUST 5.1, Figure 3a, p. 730
- Test 2 (think, then reveal): How do seismic and geochemical estimates of bulk SiO~2~ compare?
  - Answer: Christensen & Mooney’s seismic model mean is 61.8 wt% (1995); Rudnick & Gao’s geochemical estimate is 60.6 wt% (2003).
  - Source: Christensen & Mooney, p. 9761; Rudnick & Gao, Table 11, p. 53
- Test 3 (think, then reveal): How is the crust divided in Rudnick & Gao?
  - Answer: For a ≈40 km crust: upper crust to 12 km, middle crust 12–23 km, lower crust from 23 km to the Moho (2003). SiO~2~ is 66.6, 63.5 and 53.4 wt% in these layers.
  - Source: Rudnick & Gao, pp. 20–21; Table 11, p. 53

### Advanced · Oceanic crust

*id: oceanic-crust · layer · within crust*

**Summary:** Seismic refraction and rare earth element inversions provide independent estimates of oceanic crustal thickness: 7.1 ± 0.8 and 8.3 ± 1.5 km (White et al. 1992, p. 19,683).

**More detail:** White et al. (1992, p. 19,683) compiled seismic measurements showing normal igneous oceanic crust to be 7.1 ± 0.8 km, with bounds of 5.0–8.5 km. Their mean structure has layer 2 at 2.11 ± 0.55 km with P-wave speeds of 2.5–6.6 km/s, over layer 3 at 4.97 ± 0.90 km and 6.6–7.6 km/s, probably mainly gabbro (Table 8, p. 19,698). Independently, inverting rare earth element concentrations for how much the mantle melted gives 8.3 ± 1.5 km. Crust is 10.3 ± 1.7 km where spreading centres cross plume-heated mantle, and about 20 km on aseismic ridges above plume centres (p. 19,683). CRUST 5.1 uses a standard ocean 6.5 km thick in three layers, with P-wave speeds of 5.0, 6.6 and 7.1 km/s (Mooney et al. 1998, Section 6, p. 734). Ocean floor younger than 66.5 Ma loses 23.1 TW at 128 mW m^-2^, and older floor 7.8 TW at 66 mW m^-2^ (Davies & Davies 2010, Section 3, p. 16).

**How it is drawn:** The oceanic sectors are schematic. Their 7 km igneous thickness is drawn as 30 km. The Crust thickness view shows the real thickness worldwide, from CRUST1.0.

**Cited numbers:**

- Igneous thickness, normal crust: 7.1 ± 0.8 km (bounds 5.0–8.5 km) (white1992: Abstract, p. 19,683)
- Seismic layer 2 / layer 3: 2.11 ± 0.55 km at 2.5–6.6 km/s / 4.97 ± 0.90 km at 6.6–7.6 km/s; layer 3 is probably mainly gabbro (white1992: p. 19,683; Table 8, p. 19,698)
- From rare earth element inversions: 8.3 ± 1.5 km (white1992: Abstract, p. 19,683)
- Spreading centres over plume-heated mantle / aseismic ridges above plume centres: 10.3 ± 1.7 km / about 20 km (white1992: Abstract, p. 19,683)
- CRUST 5.1 standard ocean: 6.5 km in three layers, v~P~ 5.0, 6.6, 7.1 km/s (mooney1998: Section 6, p. 734)

**Common questions:**

1. Q: What are the two independent estimates of oceanic crustal thickness?
   A: Seismic measurements give 7.1 ± 0.8 km; rare earth element inversions give 8.3 ± 1.5 km (White et al. 1992).
   Source: White et al., p. 19,683 [white1992]
2. Q: What are the P-wave speeds and thicknesses of layers 2 and 3?
   A: Layer 2: 2.5–6.6 km/s, 2.11 ± 0.55 km. Layer 3: 6.6–7.6 km/s, 4.97 ± 0.90 km (White et al. 1992).
   Source: White et al., Table 8, p. 19,698 [white1992]
3. Q: How does mantle temperature show in crustal thickness?
   A: Where spreading centres cross plume-heated mantle the crust is 10.3 ± 1.7 km; aseismic ridges above plume centres reach about 20 km (White et al. 1992).
   Source: White et al., p. 19,683 [white1992]
4. Q: How does CRUST 5.1 represent oceanic crust?
   A: A standard 6.5 km section in three layers with P-wave speeds of 5.0, 6.6 and 7.1 km/s (Mooney et al. 1998).
   Source: CRUST 5.1, Section 6, p. 734 [mooney1998]
5. Q: How does heat flow change with sea-floor age?
   A: Floor younger than 66.5 Ma: 23.1 TW at 128 mW m^-2^. Older floor: 7.8 TW at 66 mW m^-2^ (Davies & Davies 2010).
   Source: Davies & Davies, Section 3, p. 16 [davies2010]
6. Q: Why is heat flow on young ocean floor modelled rather than only measured?
   A: Davies & Davies’ estimate uses 38,347 measurements with modelled corrections for young ocean floor and hotspots.
   Source: Davies & Davies, Abstract, p. 5; Table 7, p. 20 [davies2010]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid. Moves with its tectonic plate. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What are the two independent estimates of oceanic crustal thickness?
  - Answer: Seismic measurements give 7.1 ± 0.8 km; rare earth element inversions give 8.3 ± 1.5 km (White et al. 1992).
  - Source: White et al., p. 19,683
- Test 1 (think, then reveal): What are the P-wave speeds and thicknesses of layers 2 and 3?
  - Answer: Layer 2: 2.5–6.6 km/s, 2.11 ± 0.55 km. Layer 3: 6.6–7.6 km/s, 4.97 ± 0.90 km (White et al. 1992).
  - Source: White et al., Table 8, p. 19,698
- Test 2 (think, then reveal): How does mantle temperature show in crustal thickness?
  - Answer: Where spreading centres cross plume-heated mantle the crust is 10.3 ± 1.7 km; aseismic ridges above plume centres reach about 20 km (White et al. 1992).
  - Source: White et al., p. 19,683
- Test 3 (think, then reveal): How does CRUST 5.1 represent oceanic crust?
  - Answer: A standard 6.5 km section in three layers with P-wave speeds of 5.0, 6.6 and 7.1 km/s (Mooney et al. 1998).
  - Source: CRUST 5.1, Section 6, p. 734

### Advanced · Lithospheric mantle

*id: lithospheric-mantle · layer · within lithosphere*

**Summary:** In PREM, the seismic lid extends from 24.4 to 80 km. It is transversely isotropic about a vertical symmetry axis, with Q~μ~ = 600 (PREM, Table I and footnote, p. 308).

**More detail:** In PREM, the interval from 24.4 to 220 km is transversely isotropic, with a vertical symmetry axis; the footnote to Table I gives effective isotropic speeds for the same range (Dziewonski & Anderson 1981, p. 308). Within this, the lid (24.4–80 km) has Q~μ~ = 600, density about 3.38 g/cm^3^ and effective isotropic v~S~ 4.49–4.47 km/s. Dziewonski & Anderson treat the lid as the main part of the seismic lithosphere (pp. 300, 308). It is a single global layer, so it does not capture how lithospheric thickness varies.

**How it is drawn:** The top follows the drawn crust at 7 km under oceans and 35 km under continents. The lid base is drawn at 80 km.

**Cited numbers:**

- PREM lid: 24.4–80 km, transversely isotropic (vertical symmetry axis), Q~μ~ = 600 (prem1981: Table I and footnote, p. 308)

**Common questions:**

1. Q: What is transversely isotropic in PREM, and over what depth?
   A: Wave speeds depend on direction relative to a vertical symmetry axis, from 24.4 to 220 km.
   Source: PREM, Table I footnote, p. 308 [prem1981]
2. Q: What effective isotropic v~S~ does PREM give for the lid?
   A: About 4.49 km/s at the top, falling to 4.47 km/s at 80 km.
   Source: PREM, Table I and footnote, p. 308 [prem1981]
3. Q: How does PREM’s lid differ in attenuation from the zone below?
   A: Q~μ~ = 600 in the lid and 80 in the low-velocity zone.
   Source: PREM, Table I, p. 308 [prem1981]
4. Q: Why is PREM’s lid only a proxy for the lithosphere?
   A: PREM is a global average with a single lid base at 80 km; Dziewonski & Anderson treat the lid as the main part of the seismic lithosphere.
   Source: PREM, pp. 300, 308 [prem1981]
5. Q: What density does PREM give the lid?
   A: About 3.38 g/cm^3^.
   Source: PREM, Table I, p. 308 [prem1981]
6. Q: Where does the lid begin in PREM?
   A: At the Moho, 24.4 km, beneath a crust that includes a 3 km ocean layer.
   Source: PREM, Table I, p. 308 [prem1981]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid. Moves with its tectonic plate. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What is transversely isotropic in PREM, and over what depth?
  - Answer: Wave speeds depend on direction relative to a vertical symmetry axis, from 24.4 to 220 km.
  - Source: PREM, Table I footnote, p. 308
- Test 1 (think, then reveal): What effective isotropic v~S~ does PREM give for the lid?
  - Answer: About 4.49 km/s at the top, falling to 4.47 km/s at 80 km.
  - Source: PREM, Table I and footnote, p. 308
- Test 2 (think, then reveal): How does PREM’s lid differ in attenuation from the zone below?
  - Answer: Q~μ~ = 600 in the lid and 80 in the low-velocity zone.
  - Source: PREM, Table I, p. 308
- Test 3 (think, then reveal): Why is PREM’s lid only a proxy for the lithosphere?
  - Answer: PREM is a global average with a single lid base at 80 km; Dziewonski & Anderson treat the lid as the main part of the seismic lithosphere.
  - Source: PREM, pp. 300, 308

### Advanced · Asthenosphere

*id: asthenosphere · layer*

**Summary:** PREM represents this region as a low-velocity zone between 80 and 220 km, with Q~μ~ = 80 and effective isotropic v~S~ decreasing from 4.471 to 4.419 km/s (PREM, Table I and footnote, p. 308).

**More detail:** PREM places the low-velocity zone between 80 and 220 km. The footnote to Table I gives an effective isotropic shear-wave speed that falls from 4.471 km/s at 80 km to 4.419 km/s at 220 km, and Q~μ~ is 80, against 600 in the lid (Dziewonski & Anderson 1981, p. 308). ak135 has a boundary at 210 km instead, with only a tiny jump in v~S~, 4.518 to 4.523 km/s (Kennett et al. 1995, Table 3, pp. 122–123).

**How it is drawn:** Shown as PREM's low-velocity zone, 80–220 km deep. PREM is a global average, so it gives one depth range for the whole Earth (PREM, pp. 299–300, 308).

**Cited numbers:**

- PREM low-velocity zone: 80–220 km, Q~μ~ = 80 (prem1981: Table I, p. 308)
- Isotropic-equivalent v~S~: 4.471 km/s at 80 km → 4.419 km/s at 220 km (prem1981: Table I footnote, p. 308)

**Common questions:**

1. Q: What effective isotropic v~S~ does PREM give across the low-velocity zone?
   A: 4.471 km/s at 80 km falling to 4.419 km/s at 220 km.
   Source: PREM, Table I footnote, p. 308 [prem1981]
2. Q: What is Q~μ~ in the low-velocity zone, and why does it matter?
   A: 80, against 600 in the lid: shear waves lose energy much faster.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: Where does ak135 put the corresponding boundary?
   A: At 210 km, with a tiny v~S~ jump from 4.518 to 4.523 km/s.
   Source: ak135, Table 3, pp. 122–123 [ak1351995]
4. Q: Is the low-velocity zone liquid?
   A: No. Its shear-wave speed stays above 4.4 km/s; the liquid outer core has v~S~ = 0.
   Source: PREM, Table I and footnote, p. 308 [prem1981]
5. Q: Is the low-velocity zone isotropic in PREM?
   A: No. It lies within PREM’s transversely isotropic range, 24.4–220 km.
   Source: PREM, Table I footnote, p. 308 [prem1981]
6. Q: How do plates relate to this layer?
   A: Plates move as part of mantle convection beneath them (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid: shear waves pass, but more slowly and more damped than in the plate above. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What effective isotropic v~S~ does PREM give across the low-velocity zone?
  - Answer: 4.471 km/s at 80 km falling to 4.419 km/s at 220 km.
  - Source: PREM, Table I footnote, p. 308
- Test 1 (think, then reveal): What is Q~μ~ in the low-velocity zone, and why does it matter?
  - Answer: 80, against 600 in the lid: shear waves lose energy much faster.
  - Source: PREM, Table I, p. 308
- Test 2 (think, then reveal): Where does ak135 put the corresponding boundary?
  - Answer: At 210 km, with a tiny v~S~ jump from 4.518 to 4.523 km/s.
  - Source: ak135, Table 3, pp. 122–123
- Test 3 (think, then reveal): Is the low-velocity zone liquid?
  - Answer: No. Its shear-wave speed stays above 4.4 km/s; the liquid outer core has v~S~ = 0.
  - Source: PREM, Table I and footnote, p. 308

### Advanced · Upper mantle

*id: upper-mantle · layer · within mantle*

**Summary:** Olivine dominates the mantle between 220 and 400–410 km. The pyrolite model gives an Mg# of 89.3 (McDonough & Sun 1995, Table 4, p. 237; Pearson et al. 2014, p. 221).

**More detail:** At just over 220 km depth, PREM gives a density of 3.436 g/cm^3^, v~P~ 8.559 and v~S~ 4.644 km/s (Table I, p. 308). The pyrolite model gives the silicate Earth, as oxides, SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45, CaO 3.55 and Na~2~O 0.36 wt%, with Mg# = 100 Mg/(Mg + Fe) of 89.3 (McDonough & Sun 1995, Table 4, p. 237). Olivine, Mg~2~SiO~4~, dominates to about 400 km (Pearson et al. 2014, p. 221). The region is 220–400 km in PREM; ak135 has boundaries at 210 and 410 km (Table 3, pp. 122–123).

**How it is drawn:** Shown from 220 km down to 410 km (ak135); PREM puts the boundary at 400 km.

**Cited numbers:**

- Depth: 220–400 km (PREM); 210–410 km region in ak135 (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- PREM ρ, v~P~, v~S~ just below 220 km: 3.436 g/cm^3^, 8.559, 4.644 km/s (prem1981: Table I, p. 308)
- Pyrolite silicate Earth (wt% as oxides): SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45, CaO 3.55, Na~2~O 0.36 (mcdonough1995: Table 4, p. 237)
- Mg# = 100 Mg/(Mg + Fe): 89.3 (mcdonough1995: Table 4, p. 237)

**Common questions:**

1. Q: What does PREM give just below 220 km?
   A: Density 3.436 g/cm^3^, v~P~ 8.559 km/s and v~S~ 4.644 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What is Mg#, and what is it in the pyrolite model?
   A: 100 Mg/(Mg + Fe); 89.3 (McDonough & Sun 1995).
   Source: McDonough & Sun, Table 4, p. 237 [mcdonough1995]
3. Q: Give the main oxides of the pyrolite model.
   A: SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45, CaO 3.55, Na~2~O 0.36 wt% (McDonough & Sun 1995).
   Source: McDonough & Sun, Table 4, p. 237 [mcdonough1995]
4. Q: Which mineral dominates to about 400 km?
   A: Olivine, Mg~2~SiO~4~ (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
5. Q: How do PREM and ak135 bound this region?
   A: PREM: 220–400 km. ak135: boundaries at 210 and 410 km.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
6. Q: How large is the mantle’s share of Earth’s heat budget?
   A: An estimated 24–38 TW, mainly from heat made in the mantle and secular cooling (Davies & Davies 2010).
   Source: Davies & Davies, §4.8, p. 22 [davies2010]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid, yet convects slowly over geological time. Blue sheets: old plates sinking; most stall above 660 km or are trapped at 660–1,000 km, some sink deeper. Pale columns: plumes of hot rock rising from near the core, imaged up to about 1,000 km depth. The cut face shows this as a schematic; where the slabs and plumes sit is illustrative; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What does PREM give just below 220 km?
  - Answer: Density 3.436 g/cm^3^, v~P~ 8.559 km/s and v~S~ 4.644 km/s.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): What is Mg#, and what is it in the pyrolite model?
  - Answer: 100 Mg/(Mg + Fe); 89.3 (McDonough & Sun 1995).
  - Source: McDonough & Sun, Table 4, p. 237
- Test 2 (think, then reveal): Give the main oxides of the pyrolite model.
  - Answer: SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45, CaO 3.55, Na~2~O 0.36 wt% (McDonough & Sun 1995).
  - Source: McDonough & Sun, Table 4, p. 237
- Test 3 (think, then reveal): Which mineral dominates to about 400 km?
  - Answer: Olivine, Mg~2~SiO~4~ (Pearson et al. 2014).
  - Source: Pearson et al., p. 221

### Advanced · Mantle transition zone

*id: transition-zone · layer · within mantle*

**Summary:** The transition zone between 410 and 660 km is dominated by wadsleyite and ringwoodite. A ringwoodite inclusion in diamond JUc29 contains at least 1.4–1.5 wt% H~2~O (Pearson et al. 2014, pp. 221–222).

**More detail:** PREM places the zone at 400–670 km, with an internal boundary at 600 km (radius 5,771 km); ak135 at 410–660 km (Table I, p. 308; Table 3, pp. 122–123). Wadsleyite and ringwoodite, the high-pressure forms of olivine, are thought to dominate it, and can hold up to about 2.5 wt% water (Pearson et al. 2014, p. 221). Pearson et al. describe ringwoodite included in a diamond, JUc29, from Juína, Brazil: to their knowledge, the first terrestrial find of a high-pressure olivine polymorph. FTIR gives a minimum of 1.4–1.5 wt% H~2~O in the inclusion, with large uncertainty (pp. 221–222). They estimate about 1.0 wt% water in the transition zone it sampled (p. 223). One inclusion constrains one place; whether the zone is this wet everywhere is not settled by this sample.

**How it is drawn:** Shown at the ak135 depths, 410–660 km.

**Cited numbers:**

- Depth: 400–670 km (PREM); 410–660 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- PREM internal boundary: 600 km (radius 5,771 km) (prem1981: Table I, p. 308)
- Ringwoodite in Juína diamond JUc29: FTIR gives a minimum of 1.4–1.5 wt% H~2~O, with large uncertainty; to the authors’ knowledge, the first terrestrial find of a high-pressure olivine polymorph (pearson2014: Abstract, p. 221; p. 222)
- Water in the zone sampled: about 1.0 wt%, against a capacity of about 2.5 wt% in wadsleyite and ringwoodite (pearson2014: pp. 221, 223)
- Transformations and widths: olivine → wadsleyite (~14 GPa, 410 km, ~7 km wide when dry); wadsleyite → ringwoodite (~17.5 GPa, 520 km, ~25 km); ringwoodite → perovskite + ferropericlase (~24 GPa, 660 km, <4 km), plus garnet → perovskite over 30–40 km (frost2008: pp. 172, 175)
- Water in wadsleyite: can hold the equivalent of 3 wt% H~2~O (frost2008: p. 175)

**Common questions:**

1. Q: What is diamond JUc29, and why does it matter?
   A: A diamond from Juína, Brazil, with a ringwoodite inclusion: to the authors’ knowledge, the first terrestrial find of a high-pressure olivine polymorph (Pearson et al. 2014).
   Source: Pearson et al., p. 221; p. 222 [pearson2014]
2. Q: How much water is in the inclusion?
   A: FTIR gives a minimum of 1.4–1.5 wt% H~2~O, with large uncertainty (Pearson et al. 2014).
   Source: Pearson et al., p. 222 [pearson2014]
3. Q: What bulk water content do Pearson et al. infer?
   A: About 1.0 wt% for the transition zone sampled, against a capacity of about 2.5 wt% in wadsleyite and ringwoodite.
   Source: Pearson et al., pp. 221, 223 [pearson2014]
4. Q: Why is one inclusion not enough to say the whole zone is wet?
   A: It samples one place. Pearson et al.’s estimate is for the transition zone that the diamond sampled.
   Source: Pearson et al., p. 223 [pearson2014]
5. Q: What internal boundary does PREM put in the transition zone?
   A: At 600 km depth (radius 5,771 km).
   Source: PREM, Table I, p. 308 [prem1981]
6. Q: How do PREM and ak135 bound the zone?
   A: PREM 400–670 km; ak135 410–660 km.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]

**Learn about this part (drill-in):**

- How it works: [layers view] The transition zone is the band between the 410 and 660 km boundaries. At the 410 km line olivine turns into wadsleyite. Deeper, at about 520 km, wadsleyite turns into ringwoodite, which lasts down to the 660 km line. These high-pressure forms are thought to make up most of the band.
- Opening question: Before you start: how much water does FTIR find in the ringwoodite inclusion in diamond JUc29?
  - None
  - ✔ A minimum of 1.4–1.5 wt% H~2~O, with large uncertainty
  - Exactly 2.5 wt%
  - Explanation: A minimum of 1.4–1.5 wt% H~2~O, with large uncertainty.
  - Source: Pearson et al. (2014), p. 222
- Test 1: What bulk water content do Pearson et al. infer for the zone they sampled?
  - ✔ About 1.0 wt%
  - About 10 wt%
  - Zero
  - Explanation: About 1.0 wt%, against a capacity of about 2.5 wt% in wadsleyite and ringwoodite.
  - Source: Pearson et al. (2014), pp. 221, 223
- Test 2: Why is JUc29 notable beyond its water?
  - ✔ To the authors’ knowledge, it is the first terrestrial find of a high-pressure olivine polymorph
  - It is the largest diamond known
  - It came from the inner core
  - Explanation: To the authors’ knowledge, it is the first terrestrial find of a high-pressure olivine polymorph.
  - Source: Pearson et al. (2014), p. 221; p. 222
- Test 3: Where is PREM’s internal boundary inside the transition zone?
  - ✔ At 600 km
  - At 500 km
  - There is none
  - Explanation: At 600 km depth (radius 5,771 km).
  - Source: PREM, Table I, p. 308

### Advanced · Lower mantle

*id: lower-mantle · layer · within mantle*

**Summary:** Seismic tomography identifies slabs stalling at 660–1,000 km and broad plume conduits extending upwards from the base of the mantle (Fukao & Obayashi 2013, p. 5920; French & Romanowicz 2015, pp. 95–96).

**More detail:** PREM records density 4.381 g/cm^3^ and v~S~ 5.945 km/s at 670 km, rising to 5.491 g/cm^3^ and 7.266 km/s at 2,741 km (Table I, p. 308). Fukao & Obayashi (2013, p. 5920) used more than 10 million P-wave travel times to classify slabs around the Pacific: I stagnant above the 660, II penetrating, III trapped at 660–1,000 km, IV sinking into the deep lower mantle. Most imaged slabs were at stage I or III, and they identified one definite case of stage IV (p. 5932). French & Romanowicz (2015, pp. 95–96) imaged broad conduits in the SEMUCB-WM1 model, with v~S~ reduced by more than 1.5–2%, near-vertical from near the core–mantle boundary to about 1,000 km depth; under Hawaii about 800–1,000 km wide. Their resolution test argues against thin plumes: a tail about 200 km wide would need an implausible 1,500–2,000 °C excess to match the anomaly, while 400–500 °C is plausible for broad conduits (pp. 96–97).

**How it is drawn:** Shown from 660 km down to 2,741 km; the lowest 150 km is drawn separately as D″. Below 660 km, intervals are about 1% thicker than a true-scale drawing.

**Cited numbers:**

- PREM ρ at 670 km / 2,741 km: 4.381 / 5.491 g/cm^3^ (prem1981: Table I, p. 308)
- PREM v~S~ at 670 km / 2,741 km: 5.945 / 7.266 km/s (prem1981: Table I, p. 308)
- Slab stages (P-wave tomography, >10 million travel times): I stagnant above the 660; II penetrating; III trapped at 660–1,000 km; IV sinking deeper. Most slab images in the circum-Pacific survey were at I or III (fukao2013: Abstract, p. 5920)
- Plume conduits (SEMUCB-WM1): v~S~ reduced by more than 1.5–2%; near-vertical from near the CMB to about 1,000 km depth; about 800–1,000 km wide under Hawaii (french2015: pp. 95–96)
- Plume temperature excess: 400–500 °C plausible for broad conduits; in the authors’ resolution test, a tail about 200 km wide would need an implausible 1,500–2,000 °C to match the imaged anomaly (french2015: pp. 96–97)

**Common questions:**

1. Q: What are Fukao & Obayashi’s four slab stages?
   A: I stagnant above the 660; II penetrating; III trapped at 660–1,000 km; IV descending into the deep lower mantle (2013).
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
2. Q: Which stages were most common, and how many stage IV cases were definite?
   A: Most imaged slabs were at stage I or III; they identified one definite case of descent into the deep lower mantle.
   Source: Fukao & Obayashi, pp. 5920, 5932 [fukao2013]
3. Q: What data did they use?
   A: P-wave tomography from more than 10 million travel times.
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
4. Q: What model and anomaly define French & Romanowicz’s plume conduits?
   A: SEMUCB-WM1; v~S~ reduced by more than 1.5–2%, from near the CMB to about 1,000 km depth.
   Source: French & Romanowicz, p. 95 [french2015]
5. Q: Why do French & Romanowicz argue the conduits are genuinely broad?
   A: In their resolution test a tail about 200 km wide would need an implausible 1,500–2,000 °C excess to match the imaged anomaly; 400–500 °C is plausible for broad conduits.
   Source: French & Romanowicz, pp. 96–97 [french2015]
6. Q: How do PREM density and v~S~ change from 670 to 2,741 km?
   A: Density 4.381 → 5.491 g/cm^3^; v~S~ 5.945 → 7.266 km/s.
   Source: PREM, Table I, p. 308 [prem1981]

**Learn about this part (drill-in):**

- How it works: [tomo view] The cut is coloured by real S-wave speed from SEMUCB-WM1, against the average at each depth: red is slower, blue faster. Look for the broad slow regions at the base of the mantle: one beneath the Pacific, the other beneath the South Atlantic and Africa.
- Opening question: Before you start: French & Romanowicz image broad plume conduits. Could thin plumes, about 200 km wide, explain the same anomaly?
  - Yes, easily
  - ✔ Only with an implausible 1,500–2,000 °C temperature excess
  - Explanation: Only with an implausible 1,500–2,000 °C excess in their resolution test; 400–500 °C is plausible for broad conduits.
  - Source: French & Romanowicz (2015), pp. 96–97
- Test 1: Which slab stages did Fukao & Obayashi find most often?
  - ✔ I (stagnant above the 660) and III (trapped at 660–1,000 km)
  - II and IV
  - Only IV
  - Explanation: Stages I and III. They identified one definite case of descent into the deep lower mantle.
  - Source: Fukao & Obayashi (2013), pp. 5920, 5932
- Test 2: How large is the v~S~ reduction in the plume conduits?
  - ✔ More than 1.5–2%
  - More than 50%
  - None
  - Explanation: More than 1.5–2% in SEMUCB-WM1.
  - Source: French & Romanowicz (2015), p. 95
- Test 3: What data did Fukao & Obayashi use?
  - ✔ More than 10 million P-wave travel times
  - Gravity measurements
  - Borehole samples
  - Explanation: P-wave tomography from more than 10 million travel times.
  - Source: Fukao & Obayashi (2013), p. 5920

### Advanced · D″ layer

*id: d-double-prime · layer · within lower-mantle*

**Summary:** D″ comprises the lowermost ~200 km of the mantle. Its seismic structure includes intermittent discontinuities, anisotropy and ultralow-velocity patches (Lay et al. 1998, pp. 461–462).

**More detail:** Lay et al. (1998, p. 461) describe D″ as the lowermost ~200 km. It shows intermittent 1.5–3% jumps in P and S speed 150–300 km above the core–mantle boundary, and S-wave anisotropy that varies laterally. Ultralow-velocity zones, 5–40 km thick with P and S speeds reduced by more than 10%, lie at its base beneath the central Pacific, Alaska, Iceland and Africa (p. 462). French & Romanowicz (2015, pp. 95–96) found plume roots as patches 500–800 km across of strongly reduced v~S~; under Hawaii, Iceland and Samoa these coincide in location with known ultralow-velocity zones. PREM has its own basal segment, 2,741–2,891 km, with a separate velocity polynomial; ak135 has a model break at 2,740 km with no tabulated P- or S-speed jump. A mineral change may explain it. Murakami et al. (2004, pp. 855, 857) found that MgSiO~3~ perovskite transforms to a denser post-perovskite phase above 125 GPa and 2,500 K, about 2,700 km deep, at depths matching the D″ discontinuity; aligned platy crystals of the new phase could cause the S-wave anisotropy seen below it (p. 858).

**How it is drawn:** Shown as PREM’s basal segment, 2,741–2,891 km: 150 km thick, against the ~200 km of Lay et al. (1998, p. 461).

**Cited numbers:**

- PREM basal region: 2,741–2,891 km (radius 3,480–3,630 km), its own velocity polynomial (prem1981: Table I, p. 308)
- Plume roots: patches 500–800 km across of strongly reduced v~S~; under Hawaii, Iceland and Samoa they coincide in location with known ultralow-velocity zones (french2015: Abstract, p. 95; p. 96)
- Seismic definition: lowermost ~200 km; intermittent 1.5–3% P and S jumps 150–300 km above the CMB; laterally varying S-wave anisotropy (lay1998: p. 461)
- Ultralow-velocity zones: 5–40 km thick, P and S speeds >10% low; beneath the central Pacific, Alaska, Iceland and Africa (lay1998: p. 462)
- Post-perovskite: MgSiO~3~ perovskite transforms above 125 GPa and 2,500 K (~2,700 km), becoming 1.0–1.2% denser (murakami2004: Abstract, p. 855)
- Link to the D″ discontinuity: seen ~200–300 km above the CMB (119–125 GPa) with a ~3% velocity increase; the transition occurs at matching depths and may explain it (murakami2004: p. 857)
- Anisotropy: platy post-perovskite aligned by flow may cause V~SH~ > V~SV~, seen only below the discontinuity (murakami2004: p. 858)

**Common questions:**

1. Q: How do Lay et al. define D″?
   A: As the lowermost ~200 km of the mantle (1998).
   Source: Lay et al., p. 461 [lay1998]
2. Q: What discontinuities occur within it?
   A: Intermittent 1.5–3% jumps in P and S speed, 150–300 km above the core–mantle boundary (Lay et al. 1998).
   Source: Lay et al., p. 461 [lay1998]
3. Q: What are ultralow-velocity zones?
   A: Layers 5–40 km thick at the base of the mantle with P and S speeds reduced by more than 10% (Lay et al. 1998); Garnero et al. (2016) give commonly 5–20 km.
   Source: Lay et al., p. 462; Garnero et al., p. 482 [lay1998, garnero2016]
4. Q: How are plume roots linked to ultralow-velocity zones?
   A: Under Hawaii, Iceland and Samoa, root patches 500–800 km across coincide in location with known ultralow-velocity zones (French & Romanowicz 2015).
   Source: French & Romanowicz, pp. 95–96 [french2015]
5. Q: How do PREM and ak135 treat this region?
   A: PREM has a basal segment from 2,741 km with its own polynomial; ak135 has a model break at 2,740 km with no tabulated speed jump.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
6. Q: What does laterally varying anisotropy suggest?
   A: S-wave speed depends on direction and the pattern changes from place to place (Lay et al. 1998).
   Source: Lay et al., p. 461 [lay1998]
7. Q: What mineral change may cause the D″ discontinuity?
   A: MgSiO~3~ perovskite transforms to post-perovskite above 125 GPa and 2,500 K, about 2,700 km deep, becoming 1.0–1.2% denser. This happens at depths matching the discontinuity (Murakami et al. 2004).
   Source: Murakami et al., pp. 855, 857 [murakami2004]
8. Q: Why might D″ be anisotropic?
   A: Post-perovskite may form platy crystals that line up in shear flow, which could give horizontally polarised S waves (V~SH~) higher speeds than vertically polarised ones (V~SV~) below the discontinuity (Murakami et al. 2004).
   Source: Murakami et al., p. 858 [murakami2004]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Solid, yet convects slowly over geological time. Blue sheets: old plates sinking; most stall above 660 km or are trapped at 660–1,000 km, some sink deeper. Pale columns: plumes of hot rock rising from near the core, imaged up to about 1,000 km depth. The cut face shows this as a schematic; where the slabs and plumes sit is illustrative; speeds are not to scale.
- Opening question (think, then reveal): Before you start: How do Lay et al. define D″?
  - Answer: As the lowermost ~200 km of the mantle (1998).
  - Source: Lay et al., p. 461
- Test 1 (think, then reveal): What discontinuities occur within it?
  - Answer: Intermittent 1.5–3% jumps in P and S speed, 150–300 km above the core–mantle boundary (Lay et al. 1998).
  - Source: Lay et al., p. 461
- Test 2 (think, then reveal): What are ultralow-velocity zones?
  - Answer: Layers 5–40 km thick at the base of the mantle with P and S speeds reduced by more than 10% (Lay et al. 1998); Garnero et al. (2016) give commonly 5–20 km.
  - Source: Lay et al., p. 462; Garnero et al., p. 482
- Test 3 (think, then reveal): How are plume roots linked to ultralow-velocity zones?
  - Answer: Under Hawaii, Iceland and Samoa, root patches 500–800 km across coincide in location with known ultralow-velocity zones (French & Romanowicz 2015).
  - Source: French & Romanowicz, pp. 95–96

### Advanced · Post-perovskite

*id: post-perovskite · layer · within lower-mantle*

**Summary:** Near the base of the mantle, MgSiO~3~ perovskite may change into a denser phase, post-perovskite, above 125 GPa and 2,500 K, about 2,700 km deep (Murakami et al. 2004, p. 855).

**More detail:** Murakami et al. (2004) found that MgSiO~3~ perovskite transforms to a post-perovskite phase above 125 GPa and 2,500 K, conditions reached about 2,700 km deep, and that the new phase is 1.0–1.2% denser (Abstract, p. 855). The D″ discontinuity is seen about 200–300 km above the core–mantle boundary, at 119–125 GPa, with a speed increase of about 3%; the transition occurs at matching depths and may explain it (p. 857). Post-perovskite may form platy crystals. Lined up by flow, they could make horizontally polarised S waves (V~SH~) faster than vertically polarised ones (V~SV~), and that anisotropy is seen only below the discontinuity (p. 858).

**How it is drawn:** The band starts at the depth from Murakami et al. (2004, p. 855). Drawing it evenly all the way round, and the short streaks for lined-up crystals, are schematic.

**Cited numbers:**

- Transition: MgSiO~3~ perovskite → post-perovskite above 125 GPa and 2,500 K, about 2,700 km deep (murakami2004: Abstract, p. 855)
- Density: 1.0–1.2% denser than perovskite (murakami2004: Abstract, p. 855)
- Anisotropy: platy crystals aligned by flow may give V~SH~ > V~SV~, seen only below the D″ discontinuity (murakami2004: p. 858)

**Common questions:**

1. Q: When does perovskite become post-perovskite?
   A: Above 125 GPa and 2,500 K, about 2,700 km deep (Murakami et al. 2004).
   Source: Murakami et al., Abstract, p. 855 [murakami2004]
2. Q: How much denser is post-perovskite?
   A: 1.0–1.2% denser than perovskite (Murakami et al. 2004).
   Source: Murakami et al., Abstract, p. 855 [murakami2004]
3. Q: What do the streaks stand for?
   A: Platy post-perovskite crystals lined up by flow, which may make V~SH~ faster than V~SV~ below the D″ discontinuity (Murakami et al. 2004). Their size and spacing are schematic.
   Source: Murakami et al., p. 858 [murakami2004]

**Learn about this part (drill-in):**

- How it works: [layers view] The band of short streaks just above the core, from about 2,700 km, is post-perovskite. The streaks stand for lined-up platy crystals; their size, spacing and even spread round the cut are schematic.
- Opening question: Before you start: when does MgSiO~3~ perovskite become post-perovskite?
  - ✔ Above 125 GPa and 2,500 K, about 2,700 km deep
  - At 660 km, where ringwoodite breaks down
  - Never: perovskite is stable down to the core
  - Explanation: Above 125 GPa and 2,500 K, conditions reached about 2,700 km deep.
  - Source: Murakami et al. (2004), Abstract, p. 855
- Test 1: How much denser is post-perovskite than perovskite?
  - ✔ 1.0–1.2%
  - About 10%
  - It is less dense
  - Explanation: 1.0–1.2% denser.
  - Source: Murakami et al. (2004), Abstract, p. 855
- Test 2: Which seismic feature may the transition explain?
  - ✔ The D″ discontinuity, about 200–300 km above the core, with a speed increase of about 3%
  - The Moho
  - The 410 km discontinuity
  - Explanation: The D″ discontinuity: seen about 200–300 km above the core–mantle boundary, at 119–125 GPa, with a speed increase of about 3%. The transition occurs at matching depths.
  - Source: Murakami et al. (2004), p. 857
- Test 3: What could lined-up post-perovskite crystals do to S waves?
  - ✔ Make horizontally polarised S waves (V~SH~) faster than vertically polarised ones (V~SV~)
  - Stop them
  - Make all S waves slower
  - Explanation: Make V~SH~ faster than V~SV~. That anisotropy is seen only below the D″ discontinuity.
  - Source: Murakami et al. (2004), p. 858

### Advanced · Large low-shear-velocity provinces

*id: llsvp · layer · within lower-mantle*

**Summary:** Two nearly antipodal regions of low v~S~ cover about 30% of the core–mantle boundary. One proposed explanation is that they are dense thermochemical piles (Garnero et al. 2016, p. 481).

**More detail:** Seismic imaging identifies two large provinces of reduced shear-wave speed at the base of the mantle, one beneath the Pacific and one beneath the Atlantic and western and southern Africa, nearly antipodal and covering about 30% of the core–mantle boundary area. In places velocities are reduced up to 1,200 km above it. The Pacific province is roughly round; the African one is elongated north–south and stretched eastward in the south (Garnero et al. 2016, p. 481). One interpretation is thermochemical piles, denser than the surrounding mantle; in geodynamic models an intrinsic density excess of up to a few per cent forms piles of similar size (Abstract, p. 481; p. 485). Ultralow-velocity zones, commonly 5–20 km thick, occur within and near their margins (p. 482).

**How it is drawn:** The two cross-sections are schematic, with illustrative shapes and positions. The ~30% footprint is an estimate for the real provinces (Garnero et al. 2016, p. 481).

**Cited numbers:**

- What they are: two nearly antipodal provinces of low v~S~: one beneath the Pacific, one beneath the Atlantic and western and southern Africa (garnero2016: p. 481)
- Size: about 30% of the core–mantle boundary area; reduced velocities up to 1,200 km above the CMB in places (garnero2016: p. 481)
- Shape: Pacific roughly round; African elongated north–south, stretched eastward in the south (garnero2016: p. 481)
- Possible nature: one interpretation is thermochemical piles, denser than the surrounding mantle; in geodynamic models an intrinsic density excess of up to a few per cent forms piles of similar size (garnero2016: Abstract, p. 481; p. 485)
- ULVZs: commonly 5–20 km thick, within and near LLSVP margins (garnero2016: p. 482)

**Common questions:**

1. Q: Where are the two LLSVPs?
   A: Beneath the Pacific, and beneath the Atlantic and western and southern Africa: nearly antipodal (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
2. Q: How large are they?
   A: About 30% of the core–mantle boundary area, with reduced velocities up to 1,200 km above it in places (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
3. Q: How do their shapes differ?
   A: The Pacific province is roughly round; the African one is elongated north–south and stretched eastward in the south (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
4. Q: What is the thermochemical pile interpretation?
   A: That the provinces are piles denser than the surrounding mantle, not only hotter. In geodynamic models a density excess of up to a few per cent forms piles of similar size (Garnero et al. 2016).
   Source: Garnero et al., Abstract, p. 481; p. 485 [garnero2016]
5. Q: Is that interpretation settled?
   A: No. Garnero et al. present it as one interpretation; the density excess is a geodynamic-model result.
   Source: Garnero et al., Abstract, p. 481; p. 485 [garnero2016]
6. Q: Where do ultralow-velocity zones sit relative to them?
   A: Commonly within and near their margins, 5–20 km thick (Garnero et al. 2016).
   Source: Garnero et al., p. 482 [garnero2016]

**Learn about this part (drill-in):**

- How it works: [layers view] The two dark blobs on the core are the provinces, drawn as schematic cross-sections. Their shapes and positions are illustrative.
- Opening question: Before you start: what share of the core–mantle boundary do the two LLSVPs cover?
  - About 3%
  - ✔ About 30%
  - About 90%
  - Explanation: About 30%, with reduced velocities up to 1,200 km above the boundary in places.
  - Source: Garnero et al. (2016), p. 481
- Test 1: Is it settled that LLSVPs are dense thermochemical piles?
  - Yes
  - ✔ No: it is one interpretation, and the density excess is a geodynamic-model result
  - Explanation: No. It is one interpretation; in geodynamic models a density excess of up to a few per cent forms piles of similar size.
  - Source: Garnero et al. (2016), Abstract, p. 481; p. 485
- Test 2: How do the two provinces’ shapes differ?
  - ✔ Pacific roughly round; African elongated north–south
  - Both are perfect spheres
  - Both are long and thin
  - Explanation: The Pacific province is roughly round; the African one is elongated north–south and stretched eastward in the south.
  - Source: Garnero et al. (2016), p. 481
- Test 3: Where do ultralow-velocity zones commonly sit?
  - ✔ Within and near LLSVP margins
  - In the crust
  - At the inner-core boundary
  - Explanation: Within and near LLSVP margins, commonly 5–20 km thick.
  - Source: Garnero et al. (2016), p. 482

### Advanced · Outer core

*id: outer-core · layer*

**Summary:** The outer core is liquid Fe–Ni with 5–15% of O, S, Si or a combination. Approximately 86% of Earth’s iron is located in the core (McDonough & Sun 1995, p. 223).

**More detail:** In PREM, v~S~ = 0 throughout, with density 9.903 g/cm^3^ and v~P~ 8.065 km/s at the top, rising to 12.166 g/cm^3^ and 10.356 km/s at the base (Table I, p. 308). ak135 agrees that v~S~ is 0 through the outer core (Table 3, pp. 122–123). McDonough & Sun (1995, p. 223) model the core as Fe–Ni with 5–15% of a light element (about 10 ± 5%): oxygen, sulfur, silicon or a mix, which remains uncertain. About 86% of Earth’s iron is in the core, and the whole core is about 32.5% of Earth’s mass (p. 244). Heat crossing into the mantle is estimated at 5–13 TW (Davies & Davies 2010, Section 4.8, p. 22).

**How it is drawn:** The lighter elements are given as one figure, 10 ± 5%. Which elements they are, and how much of each, is still uncertain (McDonough & Sun 1995, p. 223). The moving dots indicate that the material is liquid; they are not a simulation of its flow.

**Cited numbers:**

- Light element: 5–15% (about 10 ± 5%) of O, S, Si or a mix; about 86% of Earth’s Fe is in the core (mcdonough1995: Abstract, p. 223)
- PREM ρ, v~P~ at top: 9.903 g/cm^3^, 8.065 km/s (prem1981: Table I, p. 308)
- PREM ρ, v~P~ at bottom: 12.166 g/cm^3^, 10.356 km/s (prem1981: Table I, p. 308)
- Light elements (Hirose et al.): density deficit 5–10 wt% relative to pure iron; may be ~6 wt% Si, ~3 wt% O and 1–2 wt% S (hirose2013: p. 658; Summary points, p. 682)
- Layering: stratification at the bottom of the outer core is well established (hirose2013: Summary points, p. 682)

**Common questions:**

1. Q: What PREM values bound the outer core?
   A: Top: 9.903 g/cm^3^, v~P~ 8.065 km/s. Base: 12.166 g/cm^3^, 10.356 km/s. v~S~ = 0 throughout.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: Do PREM and ak135 agree that it is liquid?
   A: Yes. Both have v~S~ = 0 through the outer core.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
3. Q: What light elements are candidates, and how much?
   A: O, S, Si or a mix, at 5–15% (about 10 ± 5%) (McDonough & Sun 1995).
   Source: McDonough & Sun, p. 223 [mcdonough1995]
4. Q: What share of Earth’s iron is in the core?
   A: About 86% (McDonough & Sun 1995).
   Source: McDonough & Sun, p. 223 [mcdonough1995]
5. Q: What share of Earth’s mass is the core?
   A: About 32.5%, outer and inner together (McDonough & Sun 1995).
   Source: McDonough & Sun, Section 6, p. 244 [mcdonough1995]
6. Q: How well is core heat flow known?
   A: Poorly: an estimated 5–13 TW (Davies & Davies 2010).
   Source: Davies & Davies, §4.8, p. 22 [davies2010]
7. Q: Which light elements may be in the core, and how much?
   A: Considering the density jump at the inner-core boundary, perhaps ~6 wt% Si, ~3 wt% O and 1–2 wt% S, though the light elements are still controversial (Hirose et al. 2013).
   Source: Hirose et al., Summary points, p. 682 [hirose2013]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] Liquid: shear-wave speed is 0, so it flows. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What PREM values bound the outer core?
  - Answer: Top: 9.903 g/cm^3^, v~P~ 8.065 km/s. Base: 12.166 g/cm^3^, 10.356 km/s. v~S~ = 0 throughout.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): Do PREM and ak135 agree that it is liquid?
  - Answer: Yes. Both have v~S~ = 0 through the outer core.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123
- Test 2 (think, then reveal): What light elements are candidates, and how much?
  - Answer: O, S, Si or a mix, at 5–15% (about 10 ± 5%) (McDonough & Sun 1995).
  - Source: McDonough & Sun, p. 223
- Test 3 (think, then reveal): What share of Earth’s iron is in the core?
  - Answer: About 86% (McDonough & Sun 1995).
  - Source: McDonough & Sun, p. 223

### Advanced · Inner core

*id: inner-core · layer*

**Summary:** The inner core is solid and shows anisotropy and hemispherical differences. Estimates of its rotation relative to the mantle range from 1–3° per year to near zero (Deuss 2014; Song & Richards 1996; Yang & Song 2023).

**More detail:** PREM records density 12.764 g/cm^3^, v~P~ 11.028 and v~S~ 3.504 km/s at the top and 13.088 g/cm^3^ at the centre (Table I, p. 308). Deuss (2014) reviews the structure: the polar direction is fast and the equatorial slow, with 3–4% anisotropy in some body-wave models of the deeper inner core, under an isotropic upper layer about 60–80 km thick (Abstract, p. 103; p. 108). The western hemisphere has up to 5% anisotropy below that layer and is about 1.5% slower in the top 100 km; the eastern has less than 0.7% and attenuates more strongly (pp. 112–113). Rotation: Song & Richards (1996, pp. 222–223) found BC−DF travel-time residuals on South Sandwich Islands–Alaska paths rose about 0.3 s over 1967–95, best fit 1.1° per year faster than the mantle. Later body-wave estimates declined to under 0.5° per year, some studies found none, and Waszek et al. estimated 0.1–1° per million years (Deuss 2014, p. 115). Yang & Song (2023, pp. 182, 184–185) infer that relative rotation nearly stopped in late 2009 (95% CI 2009.0–2011.0) and propose an approximately seven-decade oscillation.

**How it is drawn:** Shown as a plain solid ball. Its anisotropy and the differences between its eastern and western halves are not shown (Deuss 2014, p. 103).

**Cited numbers:**

- PREM ρ, v~P~, v~S~ at top: 12.764 g/cm^3^, 11.028, 3.504 km/s (prem1981: Table I, p. 308)
- PREM ρ at centre: 13.088 g/cm^3^ (prem1981: Table I, p. 308)
- Super-rotation (Song & Richards): BC−DF travel-time residuals (relative to PREM) on South Sandwich Islands–Alaska (COL) paths rose about 0.3 s over 1967–95; best fit 1.1° per year faster than the mantle (song1996: pp. 222–223)
- Recent change (Yang & Song): the authors infer that relative rotation nearly stopped in late 2009 (95% CI 2009.0–2011.0) and may have reversed slightly in the interval they studied, through 2021. They propose an approximately seven-decade oscillation, with another turning point in the early 1970s and a similar timescale to changes in length of day and the magnetic field (yang2023: pp. 182, 184–185)
- Anisotropy above the proposed central region: in the Ishii & Dziewoński model, the slowest P-wave direction is equatorial (east–west) (ishii2002: Abstract, p. 14026)
- Anisotropy (Deuss review): polar direction fast, equatorial slow; some body-wave models give 3–4% in the deeper inner core. The review describes an isotropic upper layer about 60–80 km thick (deuss2014: Abstract, p. 103; p. 108)
- Hemispheres: west: up to 5% anisotropy below the isotropic layer and about 1.5% slower in the top 100 km; east: less than 0.7% anisotropy and more strongly attenuating (deuss2014: Abstract, p. 103; pp. 112–113)
- Rotation estimates over time: published body-wave estimates declined from 1–3° per year in 1996 to under 0.5° per year in some later studies. Other studies found no super-rotation. Assuming hemispheric differences were frozen in during growth, Waszek et al. estimated 0.1–1° per million years (deuss2014: p. 115)
- Crystal structure: likely an iron alloy with hexagonal close-packed (hcp) structure (hirose2013: Summary points, p. 682)

**Common questions:**

1. Q: What evidence did Song & Richards use for super-rotation?
   A: BC−DF travel-time residuals, relative to PREM, on South Sandwich Islands–College, Alaska paths rose about 0.3 s over 1967–95; best fit 1.1° per year (1996).
   Source: Song & Richards, pp. 222–223 [song1996]
2. Q: How have rotation estimates changed?
   A: Body-wave estimates fell from 1–3° per year in 1996 to under 0.5° per year in some later studies; some found none (Deuss 2014).
   Source: Deuss, p. 115 [deuss2014]
3. Q: What did Yang & Song (2023) infer?
   A: Relative rotation nearly stopped in late 2009 (95% CI 2009.0–2011.0) and may have reversed slightly; they propose a seven-decade oscillation with another turning point in the early 1970s.
   Source: Yang & Song, pp. 182, 184–185 [yang2023]
4. Q: What is the anisotropy pattern?
   A: Polar fast, equatorial slow; some body-wave models give 3–4% in the deeper inner core, under an isotropic layer about 60–80 km thick (Deuss 2014).
   Source: Deuss, Abstract, p. 103; p. 108 [deuss2014]
5. Q: How do the hemispheres differ?
   A: West: up to 5% anisotropy and about 1.5% slower in the top 100 km. East: less than 0.7% anisotropy and more strongly attenuating (Deuss 2014).
   Source: Deuss, pp. 112–113 [deuss2014]
6. Q: What rotation rate do hemispheric differences imply?
   A: Assuming they were frozen in during growth, Waszek et al. estimated 0.1–1° per million years (Deuss 2014).
   Source: Deuss, p. 115 [deuss2014]
7. Q: What are PREM’s values at the top of the inner core?
   A: Density 12.764 g/cm^3^, v~P~ 11.028 km/s, v~S~ 3.504 km/s; 13.088 g/cm^3^ at the centre.
   Source: PREM, Table I, p. 308 [prem1981]

**Learn about this part (drill-in):**

- How it works: [vs view] The cross-section is coloured by S-wave speed. The outer core is dark: 0, liquid. The inner core lights up again: S waves pass, so it is solid.
- Opening question: Before you start: how have estimates of inner-core super-rotation changed since 1996?
  - They have grown larger
  - ✔ They have fallen, from 1–3° per year to under 0.5° per year in some studies, and some find none
  - They have stayed at 1° per year
  - Explanation: They have fallen from 1–3° per year to under 0.5° per year in some studies; some find no super-rotation.
  - Source: Deuss (2014), p. 115
- Test 1: What did Song & Richards measure?
  - ✔ BC−DF travel-time residuals rising about 0.3 s over 1967–95
  - Changes in gravity
  - Magnetic reversals
  - Explanation: BC−DF residuals on South Sandwich Islands–Alaska paths rose about 0.3 s over 1967–95; best fit 1.1° per year.
  - Source: Song & Richards (1996), pp. 222–223
- Test 2: When do Yang & Song infer relative rotation nearly stopped?
  - ✔ Late 2009
  - 1996
  - 1970
  - Explanation: Late 2009 (95% CI 2009.0–2011.0), within a proposed seven-decade oscillation.
  - Source: Yang & Song (2023), pp. 182, 184–185
- Test 3: Which hemisphere is more anisotropic?
  - ✔ Western, up to 5%
  - Eastern, up to 5%
  - Neither
  - Explanation: The western, up to 5% below the isotropic layer; the eastern has less than 0.7%.
  - Source: Deuss (2014), pp. 112–113

### Advanced · Innermost inner core (proposed)

*id: innermost-inner-core · layer · within inner-core*

**Summary:** An innermost region about 300 km in radius has been proposed based on differences in anisotropy (Ishii & Dziewoński 2002, p. 14026). Deuss (2014) considered the evidence unconvincing.

**More detail:** Ishii & Dziewoński (2002, p. 14026) proposed an innermost inner core about 300 km in radius. In their model its slowest P-wave direction is about 45° from east–west, against east–west in the inner core above, and it may be fossil evidence of an early stage of inner-core growth. Deuss (2014, p. 111) reviews reported radii of 300–500 km but finds the evidence not compelling: two studies found no reflection from a possible upper boundary, and another suggested the region could be an artefact of averaging the two hemispheres.

**How it is drawn:** Shown at about 300 km radius, from Ishii & Dziewoński (2002, p. 14026). Its existence is debated (Deuss 2014, p. 111).

**Cited numbers:**

- Proposed radius: about 300 km (Ishii & Dziewoński 2002) (ishii2002: Abstract, p. 14026)
- Anisotropy in their model: slowest direction about 45° from east–west, against east–west in the inner core above (ishii2002: Abstract, p. 14026)
- Meaning: may be fossil evidence of an early stage of inner-core growth (ishii2002: Abstract, p. 14026)
- Debate: Deuss (2014) found the evidence unconvincing. Two studies in the review found no reflection from a possible upper boundary. Another study suggested the region could be an artefact of averaging the two hemispheres (deuss2014: p. 111)

**Common questions:**

1. Q: What did Ishii & Dziewoński propose?
   A: A central region about 300 km in radius whose slowest P-wave direction is about 45° from east–west (2002).
   Source: Ishii & Dziewoński, p. 14026 [ishii2002]
2. Q: How does its anisotropy differ from the inner core above?
   A: Above it, the slowest direction is east–west; in the proposed region it is about 45° from east–west (Ishii & Dziewoński 2002).
   Source: Ishii & Dziewoński, p. 14026 [ishii2002]
3. Q: Why might it matter?
   A: It may be fossil evidence of an early stage of inner-core growth (Ishii & Dziewoński 2002).
   Source: Ishii & Dziewoński, p. 14026 [ishii2002]
4. Q: Why does Deuss find the evidence unconvincing?
   A: Two studies found no reflection from a possible upper boundary, and another suggested it could be an artefact of averaging the two hemispheres (Deuss 2014).
   Source: Deuss, p. 111 [deuss2014]
5. Q: What radii have been reported?
   A: 300–500 km (Deuss 2014).
   Source: Deuss, p. 111 [deuss2014]
6. Q: Why is it labelled “proposed”?
   A: Its existence is debated: Ishii & Dziewoński (2002) proposed it, and Deuss (2014) found the evidence not compelling.
   Source: Ishii & Dziewoński, p. 14026; Deuss, p. 111 [ishii2002, deuss2014]

**Learn about this part (drill-in):**

- How it works: [layers view] The small white ball at the centre is the proposed innermost inner core, drawn at about 300 km radius.
- Opening question: Before you start: is the innermost inner core established?
  - Yes, all studies agree
  - ✔ No: it was proposed in 2002, and a 2014 review found the evidence not compelling
  - Explanation: No. Ishii & Dziewoński proposed it; Deuss found the evidence not compelling.
  - Source: Ishii & Dziewoński (2002), p. 14026; Deuss (2014), p. 111
- Test 1: How does its proposed anisotropy differ from the inner core above?
  - ✔ Slowest direction about 45° from east–west, against east–west above
  - It has no anisotropy
  - It is the same
  - Explanation: Its slowest direction is about 45° from east–west; above it, east–west.
  - Source: Ishii & Dziewoński (2002), p. 14026
- Test 2: What alternative explanation does the review mention?
  - ✔ An artefact of averaging the two hemispheres
  - A meteorite
  - Liquid iron
  - Explanation: That it could be an artefact of averaging the two hemispheres; two studies also found no reflection from a possible upper boundary.
  - Source: Deuss (2014), p. 111
- Test 3: What could it be evidence of, if real?
  - ✔ An early stage of inner-core growth
  - Recent subduction
  - The magnetic field reversing
  - Explanation: It may be fossil evidence of an early stage of inner-core growth.
  - Source: Ishii & Dziewoński (2002), p. 14026

### Advanced · Moho

*id: moho · boundary*

**Summary:** CRUST 5.1 gives a global mean Moho depth of 21.8 km below sea level. Reference depths differ: 24.4 km in PREM and 35 km in ak135 (Mooney et al. 1998, p. 735).

**More detail:** CRUST 5.1 gives mean Moho depths below sea level of 21.8 km globally, 38.0 km under continents and 12.6 km under oceans, including 4.0 km of water (Mooney et al. 1998, Section 8, p. 735). Reference models use a single Moho: 24.4 km in PREM, beneath a 3 km ocean layer, and 35 km in ak135, which uses continental-style crust (PREM, Table I, p. 308; Kennett et al. 1995, p. 110). In PREM the P-wave speed jumps from 6.80 to 8.11 km/s; under continents Pn averages 8.09 km/s (Christensen & Mooney 1995, p. 9761). Neither 24.4 nor 35 km is an average for the whole planet in the same sense.

**How it is drawn:** The drawn Moho follows the crust at 7 km beneath the schematic oceanic sectors and 35 km beneath the continental sector.

**Cited numbers:**

- Mean depth below sea level (CRUST 5.1): 21.8 km global, 38.0 km continents, 12.6 km oceans (with 4.0 km of water) (mooney1998: Section 8, p. 735)
- Reference models: 24.4 km (PREM, global average with a 3 km ocean layer); 35 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- Pn speed: 8.09 km/s (christensen1995: Abstract, p. 9761)

**Common questions:**

1. Q: What mean Moho depths does CRUST 5.1 give?
   A: 21.8 km globally, 38.0 km under continents and 12.6 km under oceans (with 4.0 km of water), below sea level (Mooney et al. 1998).
   Source: CRUST 5.1, Section 8, p. 735 [mooney1998]
2. Q: Why do PREM and ak135 put the Moho at different depths?
   A: PREM uses 24.4 km beneath a 3 km ocean layer; ak135 uses 35 km with continental-style crust.
   Source: PREM, Table I, p. 308; ak135, p. 110 [prem1981, ak1351995]
3. Q: What is the average Pn speed under continents?
   A: 8.09 km/s (Christensen & Mooney 1995).
   Source: Christensen & Mooney, p. 9761 [christensen1995]
4. Q: What P-wave jump does PREM give at the Moho?
   A: 6.80 → 8.11 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
5. Q: Is 24.4 km the planet’s mean Moho depth?
   A: No. CRUST 5.1’s global mean is 21.8 km; PREM’s 24.4 km is a reference-model choice.
   Source: CRUST 5.1, Section 8, p. 735; PREM, Table I, p. 308 [mooney1998, prem1981]
6. Q: How deep is the Moho beneath normal igneous ocean crust?
   A: About 7 km below its top, from seismic measurements of 7.1 ± 0.8 km crust (White et al. 1992).
   Source: White et al., p. 19,683 [white1992]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What mean Moho depths does CRUST 5.1 give?
  - Answer: 21.8 km globally, 38.0 km under continents and 12.6 km under oceans (with 4.0 km of water), below sea level (Mooney et al. 1998).
  - Source: CRUST 5.1, Section 8, p. 735
- Test 1 (think, then reveal): Why do PREM and ak135 put the Moho at different depths?
  - Answer: PREM uses 24.4 km beneath a 3 km ocean layer; ak135 uses 35 km with continental-style crust.
  - Source: PREM, Table I, p. 308; ak135, p. 110
- Test 2 (think, then reveal): What is the average Pn speed under continents?
  - Answer: 8.09 km/s (Christensen & Mooney 1995).
  - Source: Christensen & Mooney, p. 9761
- Test 3 (think, then reveal): What P-wave jump does PREM give at the Moho?
  - Answer: 6.80 → 8.11 km/s.
  - Source: PREM, Table I, p. 308

### Advanced · PREM seismic lid base (LAB proxy)

*id: lab · boundary*

**Summary:** The base of PREM’s seismic lid is at 80 km, where Q~μ~ decreases from 600 to 80. The model uses this as a proxy for the lithosphere–asthenosphere boundary (PREM, pp. 300, 308).

**More detail:** PREM is a global average with one lid base, at 80 km. There Q~μ~ falls from 600 to 80, while effective isotropic v~S~ continues to decrease through the low-velocity zone (Table I and footnote, p. 308). Dziewonski & Anderson treat the lid as the main part of the seismic lithosphere (pp. 300, 308). ak135 has no boundary at 80 km; its nearest is at 210 km (Table 3, pp. 122–123). A single global depth cannot show how the real boundary varies. The real boundary varies. Receiver functions show oceanic lithosphere thickening with age, from 55 km at 25 Ma to 82 ± 4.4 km at 129 Ma, fitting a cooling plate with an asymptotic thickness of 104 km, while under ocean islands reported depths of 40–140 km do not track age; beneath cratons the asthenosphere lies deeper (Fischer et al. 2010, pp. 551, 565).

**How it is drawn:** A single depth, 80 km, used everywhere. The real boundary varies in depth: the measured line shows how.

**Cited numbers:**

- PREM seismic lid base used in the drawing: 80 km: Q~μ~ falls from 600 to 80 (prem1981: Table I, p. 308)
- Oceanic LAB and plate age: 55 km at 25 Ma, 76 ± 1.8 km at 49 Ma, 82 ± 4.4 km at 129 Ma; fits a cooling plate with an asymptotic thickness of 104 km (fischer2010: p. 565)
- Under ocean islands: reported depths range from 40 to 140 km, much of it not correlated with plate age (fischer2010: p. 565)
- What makes it a boundary: oceanic lithosphere fits a dry, depleted layer over a hydrated, fertile asthenosphere; beneath cratons the asthenosphere is deeper (fischer2010: Abstract, p. 551)

**Common questions:**

1. Q: What changes at 80 km in PREM?
   A: Q~μ~ falls from 600 to 80.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: Does ak135 have a boundary at 80 km?
   A: No. Its nearest boundary is at 210 km.
   Source: ak135, Table 3, pp. 122–123 [ak1351995]
3. Q: Why is this only a proxy?
   A: PREM gives a single global depth. The model uses it as a proxy for the lithosphere–asthenosphere boundary.
   Source: PREM, pp. 300, 308 [prem1981]
4. Q: What does v~S~ do across it?
   A: The effective isotropic speed keeps decreasing, from 4.471 km/s at 80 km to 4.419 km/s at 220 km.
   Source: PREM, Table I footnote, p. 308 [prem1981]
5. Q: How do Dziewonski & Anderson view the lid?
   A: As the main part of the seismic lithosphere.
   Source: PREM, pp. 300, 308 [prem1981]
6. Q: Is the region either side isotropic?
   A: No. PREM makes 24.4–220 km transversely isotropic.
   Source: PREM, Table I footnote, p. 308 [prem1981]
7. Q: What contrast may make the oceanic LAB sharp, beyond temperature?
   A: Oceanic lithosphere is consistent with a dry, chemically depleted layer over a hydrated, fertile asthenosphere (Fischer et al. 2010).
   Source: Fischer et al., Abstract, p. 551 [fischer2010]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What changes at 80 km in PREM?
  - Answer: Q~μ~ falls from 600 to 80.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): Does ak135 have a boundary at 80 km?
  - Answer: No. Its nearest boundary is at 210 km.
  - Source: ak135, Table 3, pp. 122–123
- Test 2 (think, then reveal): Why is this only a proxy?
  - Answer: PREM gives a single global depth. The model uses it as a proxy for the lithosphere–asthenosphere boundary.
  - Source: PREM, pp. 300, 308
- Test 3 (think, then reveal): What does v~S~ do across it?
  - Answer: The effective isotropic speed keeps decreasing, from 4.471 km/s at 80 km to 4.419 km/s at 220 km.
  - Source: PREM, Table I footnote, p. 308

### Advanced · Measured LAB (by plate age)

*id: lab-measured · boundary*

**Summary:** The measured lithosphere–asthenosphere boundary: under the oceans it deepens with plate age, fitting a cooling plate; beneath cratons the asthenosphere lies deeper (Fischer et al. 2010, pp. 551, 565).

**More detail:** Receiver functions show oceanic lithosphere thickening with age, from 55 km at 25 Ma to 76 ± 1.8 km at 49 Ma and 82 ± 4.4 km at 129 Ma, fitting a cooling plate with an asymptotic thickness of 104 km. Under ocean islands, reported depths of 40–140 km mostly do not track age (Fischer et al. 2010, p. 565). Oceanic lithosphere is consistent with a dry, depleted layer over a hydrated, fertile asthenosphere; beneath cratons the asthenosphere is deeper (Abstract, p. 551), with depleted mantle reaching roughly 200 km (p. 553).

**How it is drawn:** The line follows Fischer et al. (2010): 55 to 82 km under the oceans, joined straight between the measured ages, and about 200 km under the continent. Which side of the ocean is young is illustrative, and ages outside 25–129 million years are not drawn.

**Cited numbers:**

- Under oceans, by plate age: 55 km at 25 Ma, 76 ± 1.8 km at 49 Ma, 82 ± 4.4 km at 129 Ma; cooling-plate asymptote 104 km (fischer2010: p. 565)
- Under ocean islands: 40–140 km, mostly not tracking age (fischer2010: p. 565)
- Under cratons: depleted mantle to roughly 200 km (fischer2010: p. 553)

**Common questions:**

1. Q: What does the line follow under the oceans?
   A: Receiver-function depths by plate age: 55 km at 25 Ma, 76 ± 1.8 km at 49 Ma, 82 ± 4.4 km at 129 Ma (Fischer et al. 2010).
   Source: Fischer et al., p. 565 [fischer2010]
2. Q: Why does the line stop at 82 km and not reach 104 km?
   A: 104 km is the asymptote of the fitted cooling-plate model, not a measured depth; the drawing only uses measured ages, 25–129 Ma (Fischer et al. 2010).
   Source: Fischer et al., p. 565 [fischer2010]
3. Q: Does it follow plate age under ocean islands?
   A: Mostly not: reported depths there range from 40 to 140 km (Fischer et al. 2010).
   Source: Fischer et al., p. 565 [fischer2010]

**Learn about this part (drill-in):**

- How it works: [labmap view] Each ocean cell is coloured by the depth of the base of the plate, from its sea-floor age and Fischer et al.’s measured depths, joined straight. Grey cells are younger than 25 or older than 129 Ma, outside the measured ages.
- Opening question: Before you start: how thick is 129-million-year-old Pacific lithosphere, measured with receiver functions?
  - ✔ 82 ± 4.4 km
  - 104 km
  - About 200 km
  - Explanation: 82 ± 4.4 km. The 104 km is the asymptote of the fitted cooling-plate model, not a measured depth.
  - Source: Fischer et al. (2010), p. 565
- Test 1: Do LAB depths under ocean islands follow plate age?
  - ✔ Mostly not: reported depths range from 40 to 140 km
  - Yes, exactly
  - There are no measurements there
  - Explanation: Mostly not: reported depths under ocean islands range from 40 to 140 km.
  - Source: Fischer et al. (2010), p. 565
- Test 2: What does the oceanic lithosphere seem to be, compared with the asthenosphere below?
  - ✔ A dry, depleted layer over a hydrated, fertile asthenosphere
  - A wet layer over a dry one
  - The same material with the same water content
  - Explanation: A dry, depleted layer over a hydrated, fertile asthenosphere.
  - Source: Fischer et al. (2010), Abstract, p. 551
- Test 3: What is the measured depth at 49 Ma in the Philippine Sea Plate?
  - ✔ 76 ± 1.8 km
  - 55 km
  - 104 km
  - Explanation: 76 ± 1.8 km.
  - Source: Fischer et al. (2010), p. 565

### Advanced · 410 km discontinuity

*id: d410 · boundary*

**Summary:** This boundary occurs at 400 km in PREM and 410 km in ak135, where olivine changes to wadsleyite. Across it, PREM’s v~P~ increases from 8.905 to 9.134 km/s.

**More detail:** Olivine dominates to about 400 km; below, its high-pressure forms wadsleyite and ringwoodite dominate the transition zone (Pearson et al. 2014, p. 221). PREM puts the discontinuity at 400 km, with v~P~ jumping from 8.905 to 9.134 km/s and density from 3.54 to 3.72 g/cm^3^ (Table I, p. 308); ak135 puts it at 410 km (Table 3, pp. 122–123).

**How it is drawn:** Shown as a sharp surface at 410 km.

**Cited numbers:**

- Depth: 400 km (PREM); 410 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- PREM v~P~ jump: 8.905 → 9.134 km/s (prem1981: Table I, p. 308)
- Average depth and temperature: actually 418 km on average, implying 1,480 °C with ±100 °C of global variation (frost2008: p. 174)
- Above subducting slabs: raised by over 50 km in some subduction zones, consistent with mantle over 600 °C colder (frost2008: p. 175)
- Sharpness: a ~7 km gradient ending in a sharp jump (1 Hz reflections) (frost2008: p. 175)

**Common questions:**

1. Q: What P-wave jump does PREM give at 400 km?
   A: 8.905 → 9.134 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What density jump?
   A: 3.54 → 3.72 g/cm^3^.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: What mineral change is associated with it?
   A: Olivine gives way to wadsleyite and ringwoodite, its high-pressure forms (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
4. Q: Where do PREM and ak135 place it?
   A: 400 km and 410 km.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
5. Q: Why does water matter below it?
   A: Wadsleyite and ringwoodite can hold up to about 2.5 wt% water (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]
6. Q: What drawing choice is made?
   A: A sharp surface at the ak135 depth of 410 km.
   Source: ak135, Table 3, pp. 122–123 [ak1351995]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What P-wave jump does PREM give at 400 km?
  - Answer: 8.905 → 9.134 km/s.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): What density jump?
  - Answer: 3.54 → 3.72 g/cm^3^.
  - Source: PREM, Table I, p. 308
- Test 2 (think, then reveal): What mineral change is associated with it?
  - Answer: Olivine gives way to wadsleyite and ringwoodite, its high-pressure forms (Pearson et al. 2014).
  - Source: Pearson et al., p. 221
- Test 3 (think, then reveal): Where do PREM and ak135 place it?
  - Answer: 400 km and 410 km.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123

### Advanced · 520 km discontinuity

*id: d520 · boundary · within transition-zone*

**Summary:** A weaker boundary inside the transition zone, where wadsleyite becomes ringwoodite at about 17.5 GPa (Frost 2008, p. 172). Most reference models leave it out.

**More detail:** In a pyrolite mantle, wadsleyite turns into ringwoodite at about 17.5 GPa, roughly 520 km deep (Frost 2008, p. 172). Unlike the 410 and 660, this discontinuity is missing from most reference models (p. 174); PREM has none at 520 km (Table I, p. 308). It is not seen everywhere. It shows up in lower-frequency seismic waves but not in high-frequency (1 Hz) ones, which fits a speed gradient more than 10 km thick; the transformation itself spreads over about 25 km (p. 175).

**How it is drawn:** Drawn as a sharp surface at 520 km all the way round. The real boundary is a gradient about 25 km wide and is not observed globally (Frost 2008, p. 175).

**Cited numbers:**

- Depth: about 520 km; absent from most reference models (frost2008: pp. 172, 174)
- Mineral change: wadsleyite → ringwoodite, at about 17.5 GPa (frost2008: p. 172)
- Width: transformation over about 25 km; seismically a gradient more than 10 km thick, not observed globally (frost2008: p. 175)

**Common questions:**

1. Q: What mineral change happens at 520 km?
   A: Wadsleyite turns into ringwoodite, at about 17.5 GPa (Frost 2008).
   Source: Frost, p. 172 [frost2008]
2. Q: Why do most reference models leave it out?
   A: It is weaker than the 410 and 660 and is not observed globally (Frost 2008).
   Source: Frost, pp. 174–175 [frost2008]
3. Q: Why do high-frequency waves miss it?
   A: They only respond to sharp jumps. The 520 appears at lower frequencies, consistent with a gradient more than 10 km thick; the transformation spreads over about 25 km (Frost 2008).
   Source: Frost, p. 175 [frost2008]

**Learn about this part (drill-in):**

- How it works: [layers view] The faint line inside the transition zone, between the 410 and 660 km boundaries, is the 520. It is drawn sharp and all the way round; the real boundary is a gradient and is not seen everywhere.
- Opening question: Before you start: does PREM have a discontinuity at 520 km?
  - Yes, a strong one
  - ✔ No: PREM has none at 520 km, like most reference models
  - Explanation: No. Unlike the 410 and 660, the 520 is missing from most reference models, and PREM has none at 520 km.
  - Source: Frost (2008), p. 174; PREM, Table I, p. 308
- Test 1: What mineral change happens at about 520 km?
  - ✔ Wadsleyite turns into ringwoodite, at about 17.5 GPa
  - Olivine turns into wadsleyite
  - Perovskite turns into post-perovskite
  - Explanation: Wadsleyite turns into ringwoodite, at about 17.5 GPa in a pyrolite mantle.
  - Source: Frost (2008), p. 172
- Test 2: Why do high-frequency (1 Hz) waves miss it?
  - ✔ It is a speed gradient more than 10 km thick, not a sharp jump
  - It is too deep for them
  - It exists only under continents
  - Explanation: It shows up at lower frequencies but not at 1 Hz, which fits a gradient more than 10 km thick.
  - Source: Frost (2008), p. 175
- Test 3: Over what depth does the transformation itself spread?
  - ✔ About 25 km
  - About 1 km
  - About 500 km
  - Explanation: About 25 km.
  - Source: Frost (2008), p. 175

### Advanced · 660 km discontinuity

*id: d660 · boundary*

**Summary:** The boundary lies at 670 km in PREM and 660 km in ak135. PREM’s v~P~ rises from 10.266 to 10.751 km/s, and most imaged Pacific slabs stall nearby (Fukao & Obayashi 2013).

**More detail:** PREM puts the boundary at 670 km, with v~P~ jumping from 10.266 to 10.751 km/s and density from 3.99 to 4.38 g/cm^3^ (Table I, p. 308); ak135 puts it at 660 km (Table 3, pp. 122–123). It ends the transition zone (Pearson et al. 2014, p. 221). In Fukao & Obayashi’s circum-Pacific tomography, most slabs were stagnant above it (stage I) or trapped at 660–1,000 km (stage III); they identified one definite case of descent into the deep lower mantle (2013, pp. 5920, 5932).

**How it is drawn:** Shown as a sharp surface at 660 km.

**Cited numbers:**

- Depth: 670 km (PREM); 660 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- PREM v~P~ jump: 10.266 → 10.751 km/s (prem1981: Table I, p. 308)
- Sharpness: ≤2 km thick in 1 Hz reflections; ringwoodite breaks down over <4 km, garnet over 30–40 km (frost2008: p. 175)

**Common questions:**

1. Q: What P-wave jump does PREM give at 670 km?
   A: 10.266 → 10.751 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What density jump?
   A: 3.99 → 4.38 g/cm^3^.
   Source: PREM, Table I, p. 308 [prem1981]
3. Q: Where do PREM and ak135 place it?
   A: 670 km and 660 km.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
4. Q: What slab stages cluster around it?
   A: Stage I, stagnant above it, and stage III, trapped at 660–1,000 km (Fukao & Obayashi 2013).
   Source: Fukao & Obayashi, p. 5920 [fukao2013]
5. Q: Do any slabs pass through to great depth?
   A: Some penetrate; Fukao & Obayashi identified one definite case of descent into the deep lower mantle.
   Source: Fukao & Obayashi, pp. 5920, 5932 [fukao2013]
6. Q: Which zone does it end?
   A: The mantle transition zone (Pearson et al. 2014).
   Source: Pearson et al., p. 221 [pearson2014]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What P-wave jump does PREM give at 670 km?
  - Answer: 10.266 → 10.751 km/s.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): What density jump?
  - Answer: 3.99 → 4.38 g/cm^3^.
  - Source: PREM, Table I, p. 308
- Test 2 (think, then reveal): Where do PREM and ak135 place it?
  - Answer: 670 km and 660 km.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123
- Test 3 (think, then reveal): What slab stages cluster around it?
  - Answer: Stage I, stagnant above it, and stage III, trapped at 660–1,000 km (Fukao & Obayashi 2013).
  - Source: Fukao & Obayashi, p. 5920

### Advanced · Core–mantle boundary

*id: cmb · boundary*

**Summary:** At 2,891 km, v~P~ falls from 13.717 to 8.065 km/s. The thermal boundary layer above has an estimated temperature contrast of 1,000 ± 500 K (PREM; Lay et al. 1998, p. 461).

**More detail:** PREM places the boundary at 2,891.0 km and ak135 at 2,891.5 km. Across it, PREM’s v~P~ drops from 13.717 to 8.065 km/s, v~S~ from 7.26 to 0, and density jumps from 5.57 to 9.90 g/cm^3^ (Table I, p. 308). Lay et al. (1998, p. 461) estimate the temperature contrast across the thermal boundary layer at the base of the mantle as 1,000 ± 500 K, above an ambient mantle of about 3,000 K, and suggest plumes from it may carry 10–15% of surface heat flux. Heat crossing the boundary is estimated at 5–13 TW (Davies & Davies 2010, Section 4.8, p. 22). LLSVPs cover about 30% of it (Garnero et al. 2016, p. 481).

**How it is drawn:** Shown as a smooth sphere.

**Cited numbers:**

- Depth: 2,891.0 km (PREM); 2,891.5 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- PREM v~P~ drop: 13.717 → 8.065 km/s (prem1981: Table I, p. 308)
- Thermal boundary layer at the base of the mantle: estimated temperature contrast 1,000 ± 500 K; ambient about 3,000 K; plumes may carry 10–15% of surface heat flux (lay1998: p. 461)
- Temperature (from iron melting): about 4,050 ± 500 K, implying a ~1,400 K boundary layer at the base of the mantle and ~10 TW of heat flow (anzellini2013: p. 466)

**Common questions:**

1. Q: What P-wave drop does PREM give at the CMB?
   A: 13.717 → 8.065 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What temperature contrast do Lay et al. estimate?
   A: 1,000 ± 500 K across the thermal boundary layer at the base of the mantle, which has an ambient temperature of about 3,000 K (1998).
   Source: Lay et al., p. 461 [lay1998]
3. Q: What share of surface heat flux may plumes carry?
   A: 10–15% (Lay et al. 1998).
   Source: Lay et al., p. 461 [lay1998]
4. Q: How much heat crosses the boundary?
   A: An estimated 5–13 TW (Davies & Davies 2010).
   Source: Davies & Davies, §4.8, p. 22 [davies2010]
5. Q: Do PREM and ak135 agree on its depth?
   A: Within 0.5 km: 2,891.0 and 2,891.5 km.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
6. Q: What share of it lies beneath LLSVPs?
   A: About 30% (Garnero et al. 2016).
   Source: Garnero et al., p. 481 [garnero2016]
7. Q: How do the two estimates of the boundary layer above the core compare?
   A: Lay et al. (1998) estimate 1,000 ± 500 K across it; Anzellini et al. (2013), from iron melting, imply about 1,400 K and ~10 TW of heat flow.
   Source: Lay et al., p. 461; Anzellini et al., p. 466 [lay1998, anzellini2013]

**Learn about this part (drill-in):**

- How it works: [temperature view] The cross-section is coloured by temperature. The mantle follows Katsura’s adiabat to 2,587 K at 2,800 km; the step from there to about 4,050 K at the core is the thermal boundary layer. How big that step is, is debated: the legend gives both estimates.
- Opening question: Before you start: do the estimates of the boundary layer above the core agree?
  - Yes, to within 10 K
  - ✔ Not quite: about 1,000 ± 500 K (Lay et al.) against about 1,400 K (Anzellini et al.)
  - Explanation: Not quite. Lay et al. (1998) estimate 1,000 ± 500 K across it; Anzellini et al. (2013), from iron melting, imply about 1,400 K and ~10 TW of heat flow.
  - Source: Lay et al. (1998), p. 461; Anzellini et al. (2013), p. 466
- Test 1: What ambient mantle temperature do Lay et al. give above the boundary layer?
  - ✔ About 3,000 K
  - About 1,000 K
  - About 6,000 K
  - Explanation: About 3,000 K.
  - Source: Lay et al. (1998), p. 461
- Test 2: What share of surface heat flux may plumes from the boundary layer carry?
  - ✔ 10–15%
  - About 90%
  - None
  - Explanation: 10–15%.
  - Source: Lay et al. (1998), p. 461
- Test 3: What temperature does Katsura’s adiabat reach at 2,800 km?
  - ✔ 2,587 K
  - 4,050 K
  - 1,646 K
  - Explanation: 2,587 (60) K. The profile leaves out the boundary layer at the base of the mantle.
  - Source: Katsura (2022), Abstract and Table 3, pp. 6–7

### Advanced · Inner-core boundary

*id: icb · boundary*

**Summary:** PREM places this boundary at 5,149.5 km and ak135 at 5,153.5 km. Across it, PREM’s v~P~ increases from 10.356 to 11.028 km/s, while v~S~ appears at 3.504 km/s.

**More detail:** PREM places the boundary at 5,149.5 km; ak135 at 5,153.5 km. Both give v~S~ = 3.504 km/s just inside the inner core, which is an independent agreement. PREM’s v~P~ jumps from 10.356 to 11.028 km/s and density from 12.17 to 12.76 g/cm^3^ (Table I, p. 308; Table 3, pp. 122–123). The inner core grows as the outer core freezes onto it (Song & Richards 1996, p. 221). Deuss (2014, p. 103) describes an isotropic layer about 60–80 km thick just below it.

**How it is drawn:** Shown as a smooth sphere.

**Cited numbers:**

- Depth: 5,149.5 km (PREM); 5,153.5 km (ak135) (prem1981, ak1351995: PREM Table I, p. 308; ak135 Table 3, pp. 122–123)
- PREM v~P~ jump: 10.356 → 11.028 km/s (prem1981: Table I, p. 308)
- Pure iron melts at ICB pressure (330 GPa): 6,230 ± 500 K (anzellini2013: Abstract, p. 464)
- ICB temperature: perhaps 5,200–5,700 K; lower than pure iron because the alloy melts lower (expected ~700 K lower) (hirose2013, anzellini2013: Hirose et al. Summary points, p. 682; Anzellini et al. p. 464)

**Common questions:**

1. Q: What P-wave jump does PREM give at the ICB?
   A: 10.356 → 11.028 km/s.
   Source: PREM, Table I, p. 308 [prem1981]
2. Q: What shear-wave speed do PREM and ak135 give just inside the inner core?
   A: Both give 3.504 km/s.
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
3. Q: Where do the two models place it?
   A: 5,149.5 km (PREM) and 5,153.5 km (ak135).
   Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123 [prem1981, ak1351995]
4. Q: What lies just beneath it?
   A: An isotropic layer about 60–80 km thick (Deuss 2014).
   Source: Deuss, Abstract, p. 103 [deuss2014]
5. Q: What process happens at it?
   A: The liquid outer core freezes onto the inner core (Song & Richards 1996).
   Source: Song & Richards, p. 221 [song1996]
6. Q: What density jump does PREM give?
   A: 12.17 → 12.76 g/cm^3^.
   Source: PREM, Table I, p. 308 [prem1981]
7. Q: Why are the iron-melting and ICB temperatures different?
   A: Anzellini et al. (2013) measure pure iron melting at 6,230 ± 500 K at ICB pressure; the core alloy melts lower, by an expected ~700 K, and Hirose et al. (2013) put the ICB at 5,200–5,700 K.
   Source: Anzellini et al., p. 464; Hirose et al., p. 682 [anzellini2013, hirose2013]

**Learn about this part (drill-in, recall: built from the Common questions above):**

- How it works: [layers view] A boundary where seismic wave speeds change. The dots’ motion shows this; speeds are not to scale.
- Opening question (think, then reveal): Before you start: What P-wave jump does PREM give at the ICB?
  - Answer: 10.356 → 11.028 km/s.
  - Source: PREM, Table I, p. 308
- Test 1 (think, then reveal): What shear-wave speed do PREM and ak135 give just inside the inner core?
  - Answer: Both give 3.504 km/s.
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123
- Test 2 (think, then reveal): Where do the two models place it?
  - Answer: 5,149.5 km (PREM) and 5,153.5 km (ak135).
  - Source: PREM, Table I, p. 308; ak135, Table 3, pp. 122–123
- Test 3 (think, then reveal): What lies just beneath it?
  - Answer: An isotropic layer about 60–80 km thick (Deuss 2014).
  - Source: Deuss, Abstract, p. 103

## References

- **prem1981**: Dziewonski, A. M., & Anderson, D. L. (1981). Preliminary reference Earth model. *Physics of the Earth and Planetary Interiors*, 25(4), 297–356. https://doi.org/10.1016/0031-9201(81)90046-7
- **ak1351995**: Kennett, B. L. N., Engdahl, E. R., & Buland, R. (1995). Constraints on seismic velocities in the Earth from traveltimes. *Geophysical Journal International*, 122(1), 108–124. https://doi.org/10.1111/j.1365-246x.1995.tb03540.x
- **davies2010**: Davies, J. H., & Davies, D. R. (2010). Earth's surface heat flux. *Solid Earth*, 1(1), 5–24. https://doi.org/10.5194/se-1-5-2010
- **christensen1995**: Christensen, N. I., & Mooney, W. D. (1995). Seismic velocity structure and composition of the continental crust: A global view. *Journal of Geophysical Research: Solid Earth*, 100(B6), 9761–9788. https://doi.org/10.1029/95jb00259
- **white1992**: White, R. S., McKenzie, D., & O'Nions, R. K. (1992). Oceanic crustal thickness from seismic measurements and rare earth element inversions. *Journal of Geophysical Research: Solid Earth*, 97(B13), 19683–19715. https://doi.org/10.1029/92jb01749
- **mooney1998**: Mooney, W. D., Laske, G., & Masters, T. G. (1998). CRUST 5.1: A global crustal model at 5° × 5°. *Journal of Geophysical Research: Solid Earth*, 103(B1), 727–747. https://doi.org/10.1029/97jb02122
- **rudnick2003**: Rudnick, R. L., & Gao, S. (2003). Composition of the continental crust. *Treatise on Geochemistry*, 3, 1–64. https://doi.org/10.1016/b0-08-043751-6/03016-4
- **mcdonough1995**: McDonough, W. F., & Sun, S.-s. (1995). The composition of the Earth. *Chemical Geology*, 120(3–4), 223–253. https://doi.org/10.1016/0009-2541(94)00140-4
- **pearson2014**: Pearson, D. G., et al. (2014). Hydrous mantle transition zone indicated by ringwoodite included within diamond. *Nature*, 507(7491), 221–224. https://doi.org/10.1038/nature13080
- **fukao2013**: Fukao, Y., & Obayashi, M. (2013). Subducted slabs stagnant above, penetrating through, and trapped below the 660 km discontinuity. *Journal of Geophysical Research: Solid Earth*, 118(11), 5920–5938. https://doi.org/10.1002/2013jb010466
- **french2015**: French, S. W., & Romanowicz, B. (2015). Broad plumes rooted at the base of the Earth's mantle beneath major hotspots. *Nature*, 525(7567), 95–99. https://doi.org/10.1038/nature14876
- **lay1998**: Lay, T., Williams, Q., & Garnero, E. J. (1998). The core–mantle boundary layer and deep Earth dynamics. *Nature*, 392(6675), 461–468. https://doi.org/10.1038/33083
- **garnero2016**: Garnero, E. J., McNamara, A. K., & Shim, S.-H. (2016). Continent-sized anomalous zones with low seismic velocity at the base of Earth's mantle. *Nature Geoscience*, 9(7), 481–489. https://doi.org/10.1038/ngeo2733
- **deuss2014**: Deuss, A. (2014). Heterogeneity and anisotropy of Earth's inner core. *Annual Review of Earth and Planetary Sciences*, 42, 103–126. https://doi.org/10.1146/annurev-earth-060313-054658
- **ishii2002**: Ishii, M., & Dziewoński, A. M. (2002). The innermost inner core of the earth: Evidence for a change in anisotropic behavior at the radius of about 300 km. *Proceedings of the National Academy of Sciences*, 99(22), 14026–14030. https://doi.org/10.1073/pnas.172508499
- **song1996**: Song, X., & Richards, P. G. (1996). Seismological evidence for differential rotation of the Earth's inner core. *Nature*, 382(6588), 221–224. https://doi.org/10.1038/382221a0
- **yang2023**: Yang, Y., & Song, X. (2023). Multidecadal variation of the Earth's inner-core rotation. *Nature Geoscience*, 16(2), 182–187. https://doi.org/10.1038/s41561-022-01112-z
- **frost2008**: Frost, D. J. (2008). The upper mantle and transition zone. *Elements*, 4(3), 171–176. https://doi.org/10.2113/gselements.4.3.171
- **fischer2010**: Fischer, K. M., Ford, H. A., Abt, D. L., & Rychert, C. A. (2010). The lithosphere–asthenosphere boundary. *Annual Review of Earth and Planetary Sciences*, 38, 551–575. https://doi.org/10.1146/annurev-earth-040809-152438
- **murakami2004**: Murakami, M., Hirose, K., Kawamura, K., Sata, N., & Ohishi, Y. (2004). Post-perovskite phase transition in MgSiO₃. *Science*, 304(5672), 855–858. https://doi.org/10.1126/science.1095932
- **hirose2013**: Hirose, K., Labrosse, S., & Hernlund, J. (2013). Composition and state of the core. *Annual Review of Earth and Planetary Sciences*, 41, 657–691. https://doi.org/10.1146/annurev-earth-050212-124007
- **anzellini2013**: Anzellini, S., Dewaele, A., Mezouar, M., Loubeyre, P., & Morard, G. (2013). Melting of iron at Earth's inner core boundary based on fast X-ray diffraction. *Science*, 340(6131), 464–466. https://doi.org/10.1126/science.1233514
- **katsura2022**: Katsura, T. (2022). A revised adiabatic temperature profile for the mantle. *Journal of Geophysical Research: Solid Earth*, 127(2), e2021JB023562. https://doi.org/10.1029/2021JB023562
- **seton2020**: Seton, M., Müller, R. D., Zahirovic, S., Williams, S., Wright, N. M., Cannon, J., Whittaker, J. M., Matthews, K. J., & McGirr, R. (2020). A global data set of present-day oceanic crustal age and seafloor spreading parameters. *Geochemistry, Geophysics, Geosystems*, 21(10), e2020GC009214. https://doi.org/10.1029/2020GC009214
- **french2014**: French, S. W., & Romanowicz, B. A. (2014). Whole-mantle radially anisotropic shear velocity structure from spectral-element waveform tomography. *Geophysical Journal International*, 199(3), 1303–1327. https://doi.org/10.1093/gji/ggu334
- **crust12013**: Laske, G., Masters, G., Ma, Z., & Pasyanos, M. (2013). Update on CRUST1.0: A 1-degree global model of Earth’s crust. *Geophysical Research Abstracts*, 15, EGU2013-2658. https://igppweb.ucsd.edu/~gabi/crust1.html
