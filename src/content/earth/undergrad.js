import { draft } from './_draft.js';

export default {
  level: 'undergrad',
  parts: [
    draft('continental-crust', 'layer', 'Continental crust', 'crust'),
    draft('oceanic-crust', 'layer', 'Oceanic crust', 'crust'),
    draft('lithospheric-mantle', 'layer', 'Lithospheric mantle', 'lithosphere'),
    draft('asthenosphere', 'layer', 'Asthenosphere'),
    draft('transition-zone', 'layer', 'Mantle transition zone', 'mantle'),
    draft('lower-mantle', 'layer', 'Lower mantle', 'mantle'),
    draft('outer-core', 'layer', 'Outer core'),
    draft('inner-core', 'layer', 'Inner core'),
    draft('moho', 'boundary', 'Moho'),
    draft('lab', 'boundary', 'Lithosphere–asthenosphere boundary'),
    draft('d410', 'boundary', '410 km discontinuity'),
    draft('d660', 'boundary', '660 km discontinuity'),
    draft('cmb', 'boundary', 'Core–mantle boundary'),
    draft('icb', 'boundary', 'Inner-core boundary'),
  ],
};
