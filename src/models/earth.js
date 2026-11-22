import { Cloud, P, I, ellipsoid, disc, unitVec, rand } from './shapes.js';

// Radii as a fraction of Earth's mean radius (6,371 km), from standard depths:
// crust base ~35 km, 410 and 660 km mantle boundaries, core-mantle boundary 2,890 km, inner core 1,221 km.
const R = 1.6; // display radius
const KM = (depth) => R * (1 - depth / 6371);
const CRUST_IN = KM(220); // real continental crust is ~35 km; drawn ~220 km thick so it is visible

/** Shell between rIn and rOut, split into top and bottom halves, each with its equatorial cross-section filled in. */
function halves(rIn, rOut, nShell, nFace) {
  const top = new Cloud(), bot = new Cloud();
  const s = ellipsoid(rOut, rOut, rOut, nShell).p;
  for (let i = 0; i < s.length; i += 3) (s[i + 1] >= 0 ? top : bot).add(s[i], s[i + 1], s[i + 2]);
  top.merge(disc(rIn, rOut, nFace / 2, 0.005));
  bot.merge(disc(rIn, rOut, nFace / 2, -0.005));
  return { top, bot };
}

/** Label anchor on the cross-section, mid-depth, at a given azimuth so labels fan out. */
const anchor = (rIn, rOut, deg) => {
  const r = (rIn + rOut) / 2, a = (deg * Math.PI) / 180;
  return [r * Math.cos(a), 0.01, r * Math.sin(a)];
};

/** Layer whose halves open vertically by `lift` when exploded. */
function layer(name, desc, color, rIn, rOut, nShell, nFace, lift, deg) {
  const { top, bot } = halves(rIn, rOut, nShell, nFace);
  return P(name, desc, color, [I(top, [0, lift, 0], anchor(rIn, rOut, deg)), I(bot, [0, -lift, 0])]);
}

export function buildEarth() {
  const parts = [];

  // Crust: 8 pieces (one per octant) that fly straight outward, a simplified stand-in for tectonic plates
  const plates = Array.from({ length: 8 }, () => new Cloud());
  for (let i = 0; i < 9000; i++) {
    const [x, y, z] = unitVec();
    const r = CRUST_IN + (R - CRUST_IN) * (i % 5 === 0 ? rand() : 1); // mostly surface, some depth
    plates[(x > 0 ? 1 : 0) + (y > 0 ? 2 : 0) + (z > 0 ? 4 : 0)].add(x * r, y * r, z * r);
  }
  // each piece moves out along its octant's diagonal
  const plateDir = (k) => [k & 1 ? 1 : -1, k & 2 ? 1 : -1, k & 4 ? 1 : -1].map((c) => c * 1.33);
  parts.push(
    P(
      'Crust',
      'Rocky outer skin: 5-10 km thick under oceans, 30-70 km under continents. It is broken into tectonic plates (shown here as 8 simple pieces) and drawn thicker than real so you can see it.',
      '#d9b38c',
      plates.map((c, k) => I(c, plateDir(k))),
    ),
  );

  parts.push(layer('Upper mantle', 'From the base of the crust down to 410 km. Its rigid top joins the crust as the lithosphere; below it, the softer asthenosphere flows slowly and lets the plates move.', '#ffb347', KM(410), CRUST_IN, 5000, 700, 1.35, 20));
  parts.push(layer('Transition zone', '410-660 km deep. Pressure squeezes mantle minerals into denser crystal forms, which may hold large amounts of water locked inside the rock.', '#ff8c42', KM(660), KM(410), 4200, 600, 1.05, 160));
  parts.push(layer('Lower mantle', '660-2,890 km deep and over half of Earth\'s volume. Hot, solid rock that creeps very slowly, helping drive plate motion.', '#e8553a', KM(2890), KM(660), 6500, 1100, 0.75, -30));
  parts.push(layer('Outer core', '2,890-5,150 km deep. Liquid iron and nickel whose swirling flow generates Earth\'s magnetic field.', '#ffd23f', KM(5150), KM(2890), 4200, 800, 0.38, 200));

  // Inner core: a solid ball, so fill the volume rather than just the surface
  const inner = new Cloud();
  const rIc = KM(5150);
  for (let i = 0; i < 2600; i++) {
    const [x, y, z] = unitVec();
    const r = rIc * (i % 3 ? 1 : Math.cbrt(rand()));
    inner.add(x * r, y * r, z * r);
  }
  parts.push(P('Inner core', 'From 5,150 km down to the centre at 6,371 km. Solid iron and nickel at roughly 5,000-6,000 °C, kept solid by enormous pressure.', '#fff3b0', [I(inner, [0, 0, 0], [0, rIc * 0.6, 0])]));

  return parts;
}
