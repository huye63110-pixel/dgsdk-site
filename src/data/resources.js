// Single source for the Resources menu and the /resources page.
//
// `posts` was moved verbatim out of src/pages/blog/index.astro, which now
// imports it, so the blog listing and the nav can never disagree.
//
// `guides` is new data, but every field is copied from what the pages already
// publish: the titles and blurbs are the ones on /guides, and each image is the
// hero that guide page already loads. /guides keeps its own hand-written markup
// — this list does not render it — so if a guide blurb is ever reworded there,
// reword it here too.
export const posts = [
  {
    slug: 'st-g-ionizing-bar-guide',
    title: 'The ST-G Ionizing Bar: How to Specify, Mount and Verify an Anti Static Bar',
    excerpt: 'What ±50 V ion balance actually means on your line, why the high voltage is generated inside the bar instead of in a separate box, how to work out the mounting pitch for any bar length, and how to check the bar is doing its job.',
    date: 'September 1, 2026',
    tags: ['Static Eliminator', 'ST-G', 'Selection Guide'],
    image: '/assets/img/static-eliminator/st-g',
    readTime: '9 min read',
  },
  {
    slug: 'lithium-battery-ionizing-bar-guide',
    title: 'Ionizing Bar Selection Guide for Lithium Battery Production',
    excerpt: 'Electrode coating, slitting and winding all generate charge as the web separates from a roller. Which bar suits which step, and where to mount it.',
    date: 'May 18, 2026',
    tags: ['Static Eliminator', 'Lithium Battery', 'Selection Guide'],
    image: '/assets/img/static-eliminator/st-e',
    readTime: '11 min read',
  },
  {
    slug: 'photovoltaic-ionizing-bar-guide',
    title: 'Smart Ionizing Bars for Photovoltaic Manufacturing',
    excerpt: 'Cell handling, backsheet lamination and glass loading are all static-critical. How to specify a bar for PV production lines.',
    date: 'May 17, 2026',
    tags: ['Static Eliminator', 'Photovoltaic', 'Selection Guide'],
    image: '/assets/img/static-eliminator/st-f',
    readTime: '12 min read',
  },
  {
    slug: 'optical-film-cleaner-tutorial',
    title: 'Optical Film Dust Removal: 9 Steps for High Cleanliness',
    excerpt: 'A step-by-step operating procedure for optical film cleaning, from roller tack selection through static verification.',
    date: 'May 14, 2026',
    tags: ['Cleaning Machine', 'Optical Film', 'Tutorial'],
    image: '/assets/img/cleaning-machine/optical',
    readTime: '10 min read',
  },
];

export const guides = [
  {
    href: '/guides/what-is-esd',
    title: 'What Is ESD?',
    blurb: 'Electrostatic discharge explained — definition, causes, how ESD damages electronics, and industry standards for ESD control.',
    image: '/assets/img/guides/what-is-esd',
  },
  {
    href: '/guides/how-to-prevent-static',
    title: 'How to Prevent Static Electricity',
    blurb: 'Practical static electricity prevention methods: grounding, ionization, humidity control, ESD-safe materials, and operator procedures.',
    image: '/assets/img/guides/how-to-prevent-static',
  },
  {
    href: '/guides/esd-control-products',
    title: 'ESD Control Products Guide',
    blurb: "Buyer's guide to ESD control products — ionizing bars, ion blowers, ion rods, and how to select the right anti-static equipment for your application.",
    image: '/assets/img/guides/esd-products-fan',
  },
  {
    href: '/guides/industrial-static-eliminator',
    title: 'Industrial Static Eliminator Solutions',
    blurb: 'Static eliminator applications by industry — electronics, display, printing, plastics, and cleanroom manufacturing, with product selection guidance.',
    image: '/assets/img/guides/industrial-dust-removal',
  },
  {
    href: '/guides/what-is-an-ionizing-bar',
    title: 'What Is an Ionizing Bar?',
    blurb: 'Understand ionization, working distance and the role of charge measurement.',
    image: '/assets/img/guides/ionizing-bar-action',
  },
  {
    href: '/guides/ionizing-bar-voltage-output',
    title: 'Ionizing Bar Voltage Output',
    blurb: 'What the kV figure means, why 24 V input and 6.5 kV output are different things, and why higher voltage is not better.',
    image: '/assets/img/guides/ionizing-bar-st-g-closeup',
  },
  {
    href: '/guides/what-is-web-cleaning',
    title: 'What Is Web Cleaning?',
    blurb: 'Contact and non-contact methods for removing dry particles from moving material, how to choose between them, and what to record in a cleaning trial.',
    image: '/assets/img/cleaning-machine/roll-chip-cleaner',
  },
];
