# External review prompt: geological accuracy

Attach these files from the GeoHand project, plus the PDFs of any cited papers you have:

1. `src/content/earth/numbers.js`: every number shown, at all three levels, with its source and page
2. `src/content/earth/alevel.js`, `undergrad.js` and `postgrad.js`: explanations, simplification notes and question banks for each level
3. `src/content/earth/lessons.js` and `learn.js`: lesson steps and learning-loop questions, at all three levels
4. `src/content/references.js`: the full reference list
5. `docs/values-to-check.md`: what was checked against which page, and the known conflicts between sources
6. `src/models/earth.js`: the depths the 3D model draws (`GEOMETRY`) and how the top 660 km is stretched

Then paste the prompt below.

---

You are reviewing the content of GeoHand, an interactive 3D model of Earth's interior with three levels: A-level, undergraduate and postgraduate. The levels set relative difficulty only. The rule for this project is total accuracy: every claim must be true and supported by the reference cited beside it. Nothing may be invented, rounded into falsehood or attributed to the wrong paper or page.

Review the attached files. Check:

1. **Numbers** (`numbers.js`). Each value against its cited source, page, table or figure. Check units, ranges, rounding and the label's wording.
2. **Text and questions** (`alevel.js`, `undergrad.js`, `postgrad.js`, `learn.js`). Each sentence and each answer. Ask whether the cited references actually say it, or whether it is common knowledge that the citation does not cover.
3. **Lesson steps** (`lessons.js`, all three levels).
4. **Simplification notes and drawn depths** (`earth.js`). Whether each note honestly describes how the drawing differs from reality.
5. **Consistency.** Where two parts or two levels give different values for the same thing, say whether the difference is explained.

Pay particular attention to:

- **Definitions:** the lithosphere and asthenosphere are described only through PREM's seismic regions (the LID down to 80 km, the low-velocity zone at 80–220 km). The text does not call the asthenosphere weak or partly molten. Is that framing correct, or is it misleading by omission?
- **Mantle flow:** "solid on the timescale of an earthquake wave, convects over geological time".
- **Inner-core rotation:** Song & Richards (1996) gave about 1° per year; Yang & Song (2023) found a pause around 2009; Deuss (2014) reports later estimates below 0.5° per year and some studies that find none.
- **Innermost inner core:** shown as a part at postgraduate level, with Deuss's doubts noted beside it.
- **LLSVP locations:** described as "one under Africa and one under the Pacific" at A-level. Garnero et al. (2016) place one beneath the Atlantic and southern and western Africa.
- **Moho depth:** PREM 24.4 km against ak135 35 km.
- **Heat budget:** heat made in the crust and heat from the core (Davies & Davies 2010).

**Rules for you:**

- Do not add new facts. If something is missing, say so; do not supply it unless you name a peer-reviewed source, with page, that supports it.
- If you cannot check a claim because the paper is not attached, mark it UNVERIFIED. Do not guess.
- Ignore writing style unless it makes a statement wrong.

**Output:** one table, worst problems first, with these columns:

| File | Item (part, label or question) | Claim as written | Verdict | Evidence | Fix |
|---|---|---|---|---|---|

- **Verdict** is one of: WRONG, UNSUPPORTED (true, but the cited source doesn't say it), MISLEADING, IMPRECISE, UNVERIFIED, or OK.
- **Evidence** gives the source and its page.
- **Fix** is the smallest wording change that makes the item correct.

List only items that are not OK, then give a one-line count of the items you checked.
