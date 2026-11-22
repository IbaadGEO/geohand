import { buildEarth } from './earth.js';

// view = starting rotation (radians). parts are built lazily the first time a model is shown.
export const MODELS = [
  {
    id: 'earth',
    name: "Earth's Interior",
    category: 'Earth science',
    subtitle: 'Crust, mantle and core, opened up',
    view: { x: 0.35, y: 0.6, z: 0 },
    build: buildEarth,
  },
];
