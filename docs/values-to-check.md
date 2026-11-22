# Values to check: papers 1, 2 and 4

**Checked 2026-11-22** against the text of the owner's PDFs. All lines match; notes on each paper below.

Every number GeoHand shows so far comes from one of the three papers below. Tick each line once you've found the value in the paper. When all lines for a paper are ticked, its reference gets a `checked` date and that paper's numbers count as verified.

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
  - base of mantle ρ 5.566, v~P~ 13.717, v~S~ 7.265
  - lower mantle top (670 km) ρ 4.381, v~P~ 10.751, v~S~ 5.945
  - 400 km ρ 3.543 → 3.724

Checked: every Table I coefficient used for the computed values was read against the table, and the values below follow from them. Table II is an unreadable rotated scan, so the spot-checks were not compared with it; ak135 agrees independently (inner core v~S~ 3.504 in both).

## 2. ak135: Kennett, Engdahl & Buland (1995), Table 3, pp. 122–123

- [x] Velocity jumps listed at 20, 35, 210, 410, 660, 2,891.5 and 5,153.5 km depth
- [x] v~S~ = 0 through the outer core; 3.504 km/s just inside the inner core (5,153.5 km)

Also noted: ak135 repeats 210 km with a tiny jump (v~S~ 4.518 → 4.523) and repeats 2,740 km with no jump, only a change of gradient; that is the top of its D″ layer, matching PREM's 2,741 km.

## 4. Heat flux: Davies & Davies (2010)

- [x] Abstract, p. 5: 47 ± 2 TW, from 38,347 measurements
- [x] Notes to Table 3, p. 15: 46.7 TW before rounding
- [x] Section 3, p. 16: continents 13.8 TW / 73 mW m⁻²; older oceans 7.8 TW / 66 mW m⁻²; young oceans 23.1 TW / 128 mW m⁻²

The "about half of all heat loss" note for young ocean floor is worked out (23.1 ÷ 46.7 = 49%), not quoted.

## What these papers don't cover yet

- **Oceanic crust thickness:** needs White et al. (1992), #6. It is drawn at 7 km, unsourced, and shows no numbers.
- **Large low-velocity provinces and the innermost inner core:** need #19 and #23. They are left out of the postgraduate model for now.
- **Temperatures, compositions and how each layer formed:** need the crust, mantle and core papers (#5–25).
