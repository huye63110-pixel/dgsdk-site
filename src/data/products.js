// Single source for the product catalogue.
//
// These arrays used to live in the frontmatter of the two category index pages.
// The site header's Products mega menu needs the same list on every page, and a
// second copy in the header would drift from the category pages the first time
// anyone edited one of them — so both now import from here.
//
// The data below was moved verbatim out of:
//   src/pages/products/static-eliminator/index.astro  (barProducts, blowerProducts)
//   src/pages/products/cleaning-machine/index.astro   (sheetProducts, webProducts)
// Each group keeps its own `canonical` in an IIFE so the absolute `url` values
// come out exactly as they did before the move.
const base = 'https://www.dg-sdk.com';

const staticEliminator = (() => {
  const canonical = base + '/products/static-eliminator';
const barProducts = [
  {
    name: 'ST-G Intelligent Ionizing Bar', slug: 'st-g-series', cat: 'Ionizing Bars', code: 'ST-G',
    url: canonical + '/st-g-series', image: base + '/assets/img/static-eliminator/st-g.jpg',
    img: '/assets/img/static-eliminator/st-g',
    desc: 'The all-round bar, with the tightest ion balance of the three bar series at ±50 V (ST-E ±80 V, ST-F ±100 V). Pulsed AC applies alternating positive and negative high voltage to a single emitter pin, which produces more ions than conventional AC and avoids the uneven neutralization AC bars are known for. Pulse frequency is adjustable, so the same bar handles a fast-moving web or a still workspace. 6.5 kV DC pulse from a DC 24 V supply, 12 W.',
    specs: ['Ion balance ±50 V', '6.5 kV DC pulse', '30–1000 mm', 'DC 24 V · 12 W']
  },
  {
    name: 'ST-E Intelligent Ionizing Bar', slug: 'st-e-series', cat: 'Ionizing Bars', code: 'ST-E',
    url: canonical + '/st-e-series', image: base + '/assets/img/static-eliminator/st-e.jpg',
    img: '/assets/img/static-eliminator/st-e',
    desc: 'High-frequency pulsed DC with fixed-polarity emitter pins arranged alternately along the bar — each pin holds one polarity instead of alternating, which is the design reason this is the bar positioned for wide or long spans. The 150 % ion-generation figure is rated for the intelligent bar series against a conventional design, not for the ST-E alone, and is published without a comparison model or test conditions. Built for large-area, high-speed lines. Ion balance ±80 V, 6.5 kV DC pulse, 12 W.',
    specs: ['Ion balance ±80 V', '6.5 kV DC pulse', '30–1000 mm', 'Alternating fixed-polarity pins']
  },
  {
    name: 'ST-F Intelligent Ionizing Bar', slug: 'st-f-series', cat: 'Ionizing Bars', code: 'ST-F',
    url: canonical + '/st-f-series', image: base + '/assets/img/static-eliminator/st-f.jpg',
    img: '/assets/img/static-eliminator/st-f',
    desc: 'The speed model. Pulsed DC with the Hibweer L.C.C. system, which stops generating negative ions while it makes positive ones and vice versa — giving very strong balance control and neutralizing 2.5 times faster than a conventional bar. Choose it when the material moves too fast for a standard bar to keep up. Ion balance ±100 V, 6.5 kV DC pulse.',
    specs: ['2.5× a conventional bar', 'Ion balance ±100 V', '6.5 kV DC pulse', '30–1000 mm']
  },
];
const blowerProducts = [
  {
    name: 'ST-S200 Mini Ionizer Fan', slug: 'st-s200', cat: 'Ionizing Blowers', code: 'ST-S200',
    url: canonical + '/st-s200', image: base + '/assets/img/static-eliminator/st-s200.jpg',
    img: '/assets/img/static-eliminator/st-s200',
    desc: 'The smallest unit in the range, small enough to build into a machine. Synchronous positive and negative emitters at ±5000 V with tungsten-alloy tips and a decoupled discharge barrel. Clears a 450 × 450 mm area in under 1.5 s measured 150 mm in front of the outlet, at under 38.9 dB and 0.05 ppm ozone. 128 × 53.5 × 180 mm, 400 g, CE marked, one-year warranty.',
    specs: ['450 × 450 mm coverage', '≤1.5 s decay', '≤48.2 CFM', 'CE · 1-year warranty']
  },
  {
    name: 'ST101A Desktop Ionizing Air Blower', slug: 'st-101a', cat: 'Ionizing Blowers', code: 'ST101A',
    url: canonical + '/st-101a', image: base + '/assets/img/static-eliminator/st-101a.jpg',
    img: '/assets/img/static-eliminator/st-101a',
    desc: 'A desktop blower for one operator position or inspection table. Airflow is adjustable from 45 to 110 CFM over a 40 × 60 cm area, with ion balance held at 0 V ±10 V. At 3.3 kg and 90 × 170 × 260 mm it sits beside a microscope or rework station without taking the bench.',
    specs: ['45–110 CFM', 'Ion balance 0 V ±10 V', '40 × 60 cm', '3.3 kg']
  },
  {
    name: 'ST104A Horizontal Ion Blower', slug: 'st-104a', cat: 'Ionizing Blowers', code: 'ST104A',
    url: canonical + '/st-104a', image: base + '/assets/img/static-eliminator/st-104a.jpg',
    img: '/assets/img/static-eliminator/st-104a',
    desc: 'The ST104A pushes air horizontally across a 60 × 120 cm zone at 70 to 120 CFM, roughly double the coverage of the desktop unit, with ion balance held at 0 V ±10 V. Suited to a two-operator bench, a packing station, or the open side of a conveyor.',
    specs: ['70–120 CFM', 'Ion balance 0 V ±10 V', '60 × 120 cm', '5.8 kg']
  },
  {
    name: 'ST1200 Horizontal Ion Fan', slug: 'st-1200', cat: 'Ionizing Blowers', code: 'ST1200',
    url: canonical + '/st-1200', image: base + '/assets/img/static-eliminator/st-1200.jpg',
    img: '/assets/img/static-eliminator/st-1200',
    desc: 'The widest coverage in the range: 140 × 120 cm at 150 to 360 CFM. At 1280 mm long the ST1200 spans a full line rather than a single station and draws 40 to 80 W. Ion balance is held at 0 V ±10 V.',
    specs: ['150–360 CFM', 'Ion balance 0 V ±10 V', '140 × 120 cm', '40–80 W']
  },
];
  return { barProducts, blowerProducts };
})();
export const barProducts = staticEliminator.barProducts;
export const blowerProducts = staticEliminator.blowerProducts;

const cleaningMachine = (() => {
  const canonical = base + '/products/cleaning-machine';
const sheetProducts = [
  {
    name: 'LCM Module Cleaner', slug: 'lcm-cleaner', cat: 'Sheet & Board', code: 'LCM',
    url: canonical + '/lcm-cleaner', image: base + '/assets/img/cleaning-machine/lcm-cleaner.jpg',
    img: '/assets/img/cleaning-machine/lcm-cleaner',
    specs: ['0.022–0.34 mm', 'Breakage <0.02 %', '0–50 m/min', 'Static <100 V']
  },
  {
    name: 'CCL Cleaning Machine', slug: 'ccl-cleaner', cat: 'Sheet & Board', code: 'ST-DT1340',
    url: canonical + '/ccl-cleaner', image: base + '/assets/img/cleaning-machine/ccl-cleaner.jpg',
    img: '/assets/img/cleaning-machine/ccl-cleaner',
    specs: ['0.05–3 mm', '99.9 % removal', '0–70 m/min', '350 W']
  },
  {
    name: 'SMT Inline Cleaner', slug: 'smt-cleaner', cat: 'Sheet & Board', code: 'SMT600',
    url: canonical + '/smt-cleaner', image: base + '/assets/img/cleaning-machine/smt-cleaner.jpg',
    img: '/assets/img/cleaning-machine/smt-cleaner',
    specs: ['Dual-sided rollers', 'Integrated static elimination', 'Quick-change window', '220 V / 50 Hz']
  },
  {
    name: 'PCB Surface Cleaner', slug: 'pcb-cleaner', cat: 'Sheet & Board', code: 'STXF',
    url: canonical + '/pcb-cleaner', image: base + '/assets/img/cleaning-machine/pcb-cleaner.jpg',
    img: '/assets/img/cleaning-machine/pcb-cleaner',
    specs: ['0.05–2 mm', '99.9 % removal', '0–20 m/min', 'Static <50 V']
  },
  {
    name: 'PCB Vertical Cleaner', slug: 'pcb-vertical-cleaner', cat: 'Sheet & Board', code: 'STC-640',
    url: canonical + '/pcb-vertical-cleaner', image: base + '/assets/img/cleaning-machine/stick-pcb-vertical-cleaning-machine.jpg',
    img: '/assets/img/cleaning-machine/stick-pcb-vertical-cleaning-machine',
    specs: ['W620 × L510 mm max', '0.1–2 mm', '~6 s per board', 'Static <50 V']
  },
  {
    name: 'FPC 4-Axis Cleaner', slug: 'fpc-4-axis-cleaner', cat: 'Sheet & Board', code: 'STXT',
    url: canonical + '/fpc-4-axis-cleaner', image: base + '/assets/img/cleaning-machine/fpc-4-axis-cleaner.jpg',
    img: '/assets/img/cleaning-machine/fpc-4-axis-cleaner',
    specs: ['0.022–0.34 mm', '4 tacky rollers', '0–50 m/min', 'Static <200 V']
  },
  {
    name: 'FPC 8-Axis Cleaner', slug: 'fpc-8-axis-cleaner', cat: 'Sheet & Board', code: 'STXS',
    url: canonical + '/fpc-8-axis-cleaner', image: base + '/assets/img/cleaning-machine/fpc-8-axis-cleaner.jpg',
    img: '/assets/img/cleaning-machine/fpc-8-axis-cleaner',
    specs: ['0.028–2 mm', '8 tacky rollers', '0–35 m/min', 'Static <200 V']
  },
  {
    name: 'Stamp Inspection Cleaner', slug: 'inspection-cleaner', cat: 'Sheet & Board', code: 'ST-XT',
    url: canonical + '/inspection-cleaner', image: base + '/assets/img/cleaning-machine/inspection-cleaner.jpg',
    img: '/assets/img/cleaning-machine/inspection-cleaner',
    specs: ['0.05–0.65 mm', '2 MP colour CCD', '0–50 m/min', 'Backlight 20 000 LUX']
  },
  {
    name: 'Polarizer Precision Cleaner', slug: 'polarizer-cleaner', cat: 'Sheet & Board', code: null,
    note: 'Model code to confirm',
    url: canonical + '/polarizer-cleaner', image: base + '/assets/img/cleaning-machine/polarizer-cleaner.jpg',
    img: '/assets/img/cleaning-machine/polarizer-cleaner'
  },
  {
    name: 'Backlight Panel Cleaner', slug: 'backlight-cleaner', cat: 'Sheet & Board', code: null,
    note: 'Model code to confirm',
    url: canonical + '/backlight-cleaner', image: base + '/assets/img/cleaning-machine/backlight-cleaner.jpg',
    img: '/assets/img/cleaning-machine/backlight-cleaner'
  },
];
const webProducts = [
  {
    name: 'Large-Size Optical Film Cleaner', slug: 'optical-film-cleaner', cat: 'Roll-to-Roll', code: 'STFK',
    url: canonical + '/optical-film-cleaner', image: base + '/assets/img/cleaning-machine/optical.jpg',
    img: '/assets/img/cleaning-machine/optical',
    specs: ['0.065–0.68 mm', '99.9 % removal', '0–40 m/min', 'Static <100 V']
  },
  {
    name: 'Roll-to-Roll Cleaner', slug: 'roll-chip-cleaner', cat: 'Roll-to-Roll', code: 'Coil Universal',
    url: canonical + '/roll-chip-cleaner', image: base + '/assets/img/cleaning-machine/roll-chip-cleaner.jpg',
    img: '/assets/img/cleaning-machine/roll-chip-cleaner',
    specs: ['0.05–2 mm', 'Surface static <50 V', '0–20 m/min', 'Unwind + rewind']
  },
];
  return { sheetProducts, webProducts };
})();
export const sheetProducts = cleaningMachine.sheetProducts;
export const webProducts = cleaningMachine.webProducts;

// The three groups the Products mega menu shows down its left column, in the
// order the confirmed design lists them. Every href is a page that already
// exists — the menu adds no new product URLs.
export const productCategories = [
  {
    id: 'static-control',
    label: 'Static Control',
    heading: 'Ionizing Bars',
    href: '/products/static-eliminator',
    base: '/products/static-eliminator',
    items: barProducts,
  },
  {
    id: 'air-blowers',
    label: 'Ionizing Air Blowers',
    heading: 'Ionizing Air Blowers',
    href: '/products/static-eliminator/ionizing-air-blowers',
    base: '/products/static-eliminator',
    items: blowerProducts,
  },
  {
    id: 'cleaning-machines',
    label: 'Cleaning Machines',
    heading: 'Cleaning Machines',
    href: '/products/cleaning-machine',
    base: '/products/cleaning-machine',
    items: [...sheetProducts, ...webProducts],
  },
];

/**
 * The opening sentences of a product's existing `desc`, for the menu's preview
 * panel. It only ever cuts on a sentence boundary already in the copy — it
 * never rewrites, so nothing in the menu says anything the product page does
 * not. Two cleaning machines carry no `desc` at all; they get their specs and
 * no prose rather than a blurb written to fill the space.
 *
 * The boundary is a full stop followed by whitespace and a capital, so
 * abbreviations mid-sentence ("the Hibweer L.C.C. system") are left alone.
 */
export function menuBlurb(desc, minLength = 90, maxSentences = 2) {
  if (!desc) return '';
  const sentences = desc.split(/(?<=\.)\s+(?=[A-Z])/);
  let out = '';
  for (let i = 0; i < sentences.length && i < maxSentences; i += 1) {
    out = out ? out + ' ' + sentences[i] : sentences[i];
    if (out.length >= minLength) break;
  }
  return out;
}
