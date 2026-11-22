import { draft } from './_draft.js';

export default {
  level: 'undergrad',
  parts: [
    draft('undergrad', 'continental-crust', 'layer', 'Continental crust', 'crust', 'The continental sector is schematic. Its 35 km ak135 reference thickness is drawn as 150 km.'),
    draft('undergrad', 'oceanic-crust', 'layer', 'Oceanic crust', 'crust', 'The oceanic sectors are schematic. Their 7 km igneous thickness is drawn as 30 km.'),
    draft('undergrad', 'lithospheric-mantle', 'layer', 'Lithospheric mantle', 'lithosphere', 'The top follows the drawn crust at 7 km under oceans and 35 km under continents. The lid base is drawn at 80 km.'),
    draft('undergrad', 'asthenosphere', 'layer', 'Asthenosphere'),
    draft('undergrad', 'upper-mantle', 'layer', 'Upper mantle', 'mantle'),
    draft('undergrad', 'transition-zone', 'layer', 'Mantle transition zone', 'mantle'),
    draft('undergrad', 'lower-mantle', 'layer', 'Lower mantle', 'mantle'),
    draft('undergrad', 'outer-core', 'layer', 'Outer core'),
    draft('undergrad', 'inner-core', 'layer', 'Inner core'),
    draft('undergrad', 'moho', 'boundary', 'Moho', undefined, 'The drawn Moho follows the crust at 7 km beneath the schematic oceanic sectors and 35 km beneath the continental sector.'),
    draft('undergrad', 'lab', 'boundary', 'PREM seismic lid base (LAB proxy)'),
    draft('undergrad', 'd410', 'boundary', '410 km discontinuity'),
    draft('undergrad', 'd660', 'boundary', '660 km discontinuity'),
    draft('undergrad', 'cmb', 'boundary', 'Core–mantle boundary'),
    draft('undergrad', 'icb', 'boundary', 'Inner-core boundary'),
  ],
};
