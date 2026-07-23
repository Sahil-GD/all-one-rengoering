import { quoteHref } from '@/config/navigation';
import { isConfirmed, type ClaimKey } from '@/config/claims';
import { siteConfig } from '@/config/site';
import { type Locale } from '@/i18n/routing';

/**
 * Homepage content per locale — TEMPORARY COPY (layout is production;
 * copy is finalized in the content phase). Rules upheld in every locale:
 * no invented statistics, testimonials, or response-time promises.
 * Claims pending verification are marked [BEKRÆFT] and MUST be
 * confirmed or removed before launch.
 */

export interface Cta {
  label: string;
  href: string;
}

/**
 * Imagery contract. Files live under /public/images — see docs/IMAGERY.md
 * for the shot list, sizes, and filenames. Fields stay undefined until
 * real assets exist; MediaFrame renders a designed brand placeholder
 * meanwhile (never a broken image). Images are locale-independent.
 */
export interface MediaRef {
  src: string;
  alt: string;
}

export type ServiceIcon = 'home' | 'sparkles' | 'truck' | 'building';

export type WhyUsIcon = 'shield' | 'leaf' | 'calendar' | 'user';

export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  description: string;
  image: MediaRef;
  /** Three concrete inclusions — turns a claim into a promise. */
  features: readonly string[];
  /** Deep-link to the full service page. */
  href: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    /* Brand slogan, one line per field. Written in normal case in
       markup; uppercased via CSS (screen readers read words). */
    sloganLine1: string;
    sloganLine2: string;
    support: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    /** The hero photograph — proof beside the promise. */
    image: MediaRef;
    /** Glass cards overlapping the image edge — layered composition. */
    floatingCards: readonly {
      icon: 'shield' | 'pin' | 'tag';
      title: string;
      text: string;
      /** When set, the card only renders if the claim is confirmed. */
      claim?: ClaimKey;
    }[];
  };
  trustItems: readonly { label: string; claim?: ClaimKey }[];
  marqueeItems: readonly string[];
  transformation: {
    eyebrow: string;
    heading: string;
    lead: string;
    before: MediaRef;
    after: MediaRef;
    /** True while `before` is a filtered copy of `after` (no real pair yet). */
    simulated: boolean;
    exampleLabel: string;
    labelBefore: string;
    labelAfter: string;
    instruction: string;
    sliderLabel: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: readonly string[];
    checklist: readonly string[];
    image: MediaRef;
  };
  whyUs: {
    eyebrow: string;
    heading: string;
    items: ReadonlyArray<{ icon: WhyUsIcon; title: string; description: string }>;
  };
  coverage: {
    heading: string;
    sub: string;
    towns: readonly string[];
    note: string;
    cta: Cta;
  };
  audienceCards: ReadonlyArray<{
    kicker: string;
    title: string;
    description: string;
    href: string;
    image?: MediaRef | undefined;
  }>;
  audienceLinkLabel: string;
  services: {
    eyebrow: string;
    heading: string;
    itemCtaLabel: string;
    items: readonly ServiceItem[];
  };
  processContent: {
    heading: string;
    steps: ReadonlyArray<{ title: string; description: string }>;
  };
  faq: {
    heading: string;
    lead: string;
    items: ReadonlyArray<{ question: string; answer: string }>;
  };
  ctaBand: {
    heading: string;
    sub: string;
    cta: Cta;
    phoneNote: string;
  };
}

/*
 * Interim imagery: free-license stock from Pexels (no attribution
 * required; photographers credited in docs/IMAGERY.md). Replace with
 * brand/AI imagery by swapping these URLs — same MediaRef shape.
 */
const pexels = (id: number): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

const img = {
  livingRoom: pexels(9565782),
  boardroom: pexels(7534216),
  scandiRoom: pexels(4207785),
  cleanSpray: pexels(4021256),
  cleanSink: pexels(9462224),
  cleanSupplies: pexels(28576636),
};

const da: HomeContent = {
  hero: {
    eyebrow: 'Professionelt rengøringsfirma på Sjælland',
    /* Brand slogan — kept in English as a brand mark in both locales.
       Swap to 'Dit rod.' / 'Vores mission.' here if preferred. */
    sloganLine1: 'Your mess.',
    sloganLine2: 'Our mission.',
    support:
      'Professionel rengøring til hjem og erhverv på hele Sjælland – med gratis og uforpligtende tilbud.',
    primaryCta: { label: 'Få et gratis tilbud', href: quoteHref },
    secondaryCta: { label: 'Se vores ydelser', href: '#ydelser' },
    image: {
     src: img.livingRoom,
      alt: 'Lys, nyrengjort stue i et dansk hjem',
    },
    floatingCards: [
      {
        icon: 'shield',
        claim: 'insured',
        title: 'Forsikret arbejde',
        text: 'Medarbejdere og inventar er dækket.',
      },
      {
        icon: 'pin',
        title: 'Hele Sjælland',
        text: 'Fra København til Vestsjælland.',
      },
      {
        icon: 'tag',
        title: 'Fast pris',
        text: 'Ingen skjulte gebyrer, ingen overraskelser.',
      },
    ],
  },
  trustItems: [
    { label: 'Gratis og uforpligtende tilbud' },
    { label: 'Fast pris – ingen skjulte gebyrer' },
    { label: 'Forsikret og ansvarsdækket', claim: 'insured' },
    { label: `Registreret dansk virksomhed · CVR ${siteConfig.cvr}` },
  ],
  marqueeItems: [
    'Fast rengøring',
    'Hovedrengøring',
    'Flytterengøring',
    'Erhvervsrengøring',
    'Hele Sjælland',
  ],
  transformation: {
    eyebrow: 'Din rod. Vores opgave.',
    heading: 'Se forskellen professionel rengøring gør',
    lead: 'Et hjem, der er blevet gjort ordentligt rent, ser ikke bare pænere ud – det føles anderledes at komme hjem til. Træk håndtaget, og se selv.',
    /* [BEKRÆFT] Erstat med rigtige før/efter-fotos af egne opgaver:
       samme rum, samme kameraposition, før og efter. Sæt derefter
       simulated: false — så forsvinder både grime-effekten og
       "Illustration"-mærkatet automatisk. */
    before: { src: img.cleanSink, alt: 'Køkken før rengøring' },
    after: { src: img.cleanSink, alt: 'Samme køkken efter professionel rengøring' },
    simulated: true,
    exampleLabel: 'Illustration',
    labelBefore: 'Før',
    labelAfter: 'Efter',
    instruction: 'Træk håndtaget fra side til side',
    sliderLabel: 'Sammenlign før og efter rengøring',
  },
  intro: {
    eyebrow: 'Om os',
    heading: 'Dit rengøringsfirma på hele Sjælland',
    paragraphs: [
      'Hos All One Rengøring tilrettelægger vi hver opgave efter dine behov og ønsker – uanset om det gælder dit hjem eller din virksomhed. Du får en klar, gennemsigtig aftale og rengøring, der bliver udført ordentligt og til tiden.',
      'Vi udarbejder gerne dit tilbud ud fra en telefonsamtale eller en besigtigelse af opgaven, så prisen passer til virkeligheden – ikke omvendt. Tilbuddet er altid gratis og uforpligtende.',
    ],
    checklist: [
      'Skræddersyet rengøringsplan',
      // [BEKRÆFT: ingen binding]
      'Ingen binding – du bestemmer',
      'Faste og gennemsigtige priser',
      'Samme høje kvalitet hver gang',
    ],
    image: { src: img.scandiRoom, alt: 'Lyst skandinavisk rum efter rengøring' },
  },
  whyUs: {
    eyebrow: 'Fordele',
    heading: 'Derfor vælger kunder os',
    items: [
      {
        icon: 'shield',
        // [BEKRÆFT: forsikringsdækning]
        title: 'Forsikret arbejde',
        description:
          'Både medarbejdere og dit inventar er dækket, så du kan være helt tryg.',
      },
      {
        icon: 'leaf',
        // [BEKRÆFT: miljøvenlige midler]
        title: 'Miljøbevidst rengøring',
        description:
          'Vi bruger skånsomme og effektive midler med omtanke for hjem, mennesker og miljø.',
      },
      {
        icon: 'calendar',
        title: 'Fleksible tidspunkter',
        description:
          'Rengøringen planlægges, så den passer ind i din hverdag eller virksomhedens åbningstider.',
      },
      {
        icon: 'user',
        // [BEKRÆFT: fast kontaktperson]
        title: 'Fast kontaktperson',
        description:
          'Du får én fast kontakt, der kender din aftale og dine ønsker.',
      },
    ],
  },
  coverage: {
    heading: 'Vi kører i hele Sjælland',
    sub: 'Din adresse er ikke afgørende – vi udfører rengøring for private og virksomheder i hele regionen.',
    towns: [
      'København',
      'Frederiksberg',
      'Roskilde',
      'Hillerød',
      'Helsingør',
      'Næstved',
      'Slagelse',
      'Køge',
      'Holbæk',
      'Greve',
    ],
    note: '… og resten af Sjælland.',
    cta: { label: 'Få et gratis tilbud', href: quoteHref },
  },
  audienceCards: [
    {
      kicker: 'Privat',
      title: 'Rengøring i hjemmet',
      description:
        'Fast rengøring, hovedrengøring og flytterengøring – tilpasset dit hjem og din hverdag.',
      href: '/privat',
      image: { src: img.livingRoom, alt: 'Nyrengjort skandinavisk stue' },
    },
    {
      kicker: 'Erhverv',
      title: 'Rengøring til virksomheder',
      // [BEKRÆFT: fast kontaktperson] — confirm before launch.
      description:
        'Professionel erhvervsrengøring med fast kontaktperson og løbende kvalitetssikring.',
      href: '/erhverv',
      image: { src: img.boardroom, alt: 'Moderne mødelokale med træpaneler' },
    },
  ],
  audienceLinkLabel: 'Læs mere',
  /** [BEKRÆFT: ydelsesliste] — final service list pending confirmation. */
  services: {
    eyebrow: 'Ydelser',
    heading: 'Hvad kan vi hjælpe med?',
    itemCtaLabel: 'Få et tilbud',
    items: [
      {
        icon: 'home',
        title: 'Fast rengøring',
        description:
          'Kom hjem til et rent hjem – hver uge eller hver 14. dag, planlagt efter din hverdag.',
        image: { src: img.cleanSink, alt: 'Grundig rengøring af køkken' },
        features: [
          'Støvsugning og gulvvask',
          'Køkken og badeværelse',
          'Fast interval efter din plan',
        ],
        href: '/ydelser/fast-rengoering',
      },
      {
        icon: 'sparkles',
        title: 'Hovedrengøring',
        description:
          'Fra loft til gulv og helt ind i hjørnerne – når hjemmet fortjener en frisk start.',
        image: { src: img.cleanSupplies, alt: 'Professionelt rengøringsudstyr' },
        features: [
          'Loft til gulv, hjørne til hjørne',
          'Afkalkning og emhætte',
          'Efter håndværkere eller fest',
        ],
        href: '/ydelser/hovedrengoering',
      },
      {
        icon: 'truck',
        title: 'Flytterengøring',
        description:
          'Aflever boligen skinnende ren til syn og overdragelse – uden selv at løfte en klud.',
        image: { src: img.livingRoom, alt: 'Nyrengjort bolig klar til overdragelse' },
        features: [
          'Skabe og hvidevarer indvendigt',
          'Klar til syn og overdragelse',
          'Fast pris efter kvadratmeter',
        ],
        href: '/ydelser/flytterengoering',
      },
      {
        icon: 'building',
        title: 'Erhvervsrengøring',
        description:
          'Rene lokaler, glade medarbejdere – i eller uden for jeres åbningstid.',
        image: { src: img.boardroom, alt: 'Rent, moderne mødelokale' },
        features: [
          'Kontorer, køkken og toiletter',
          'I eller uden for arbejdstid',
          'Fast kontaktperson',
        ],
        href: '/ydelser/erhvervsrengoering',
      },
    ],
  },
  processContent: {
    heading: 'Sådan foregår det',
    steps: [
      {
        title: 'Fortæl os om opgaven',
        description:
          'Beskriv dine behov via formularen – det tager kun få minutter.',
      },
      {
        title: 'Modtag dit tilbud',
        description:
          'Du får et gratis og uforpligtende tilbud med en fast og gennemsigtig pris.',
      },
      {
        title: 'Vi klarer rengøringen',
        description:
          'Vores team møder op som aftalt og leverer kvalitet, du kan regne med.',
      },
    ],
  },
  faq: {
    heading: 'Ofte stillede spørgsmål',
    lead: 'Find svar på de mest almindelige spørgsmål – eller kontakt os direkte.',
    items: [
      {
        question: 'Hvad koster rengøring?',
        answer:
          'Prisen afhænger af opgavens omfang, boligens størrelse, og hvor ofte vi skal gøre rent. Udfyld formularen, og modtag et gratis og uforpligtende tilbud.',
      },
      {
        question: 'Er tilbuddet bindende?',
        answer:
          'Nej. Alle tilbud er gratis og helt uforpligtende, og du bestemmer selv, om du vil gå videre.',
      },
      {
        question: 'Kan jeg få fast rengøring?',
        answer:
          'Ja. Vi tilbyder fast rengøring med et interval, der passer dig – for eksempel hver uge eller hver 14. dag.',
      },
      {
        question: 'Hvilke områder dækker I?',
        answer:
          'Vi udfører rengøring på hele Sjælland – både for private og virksomheder.',
      },
      {
        question: 'Hvordan kommer jeg i gang?',
        answer:
          'Udfyld formularen med en kort beskrivelse af opgaven, så vender vi tilbage med et uforpligtende tilbud.',
      },
      {
        question: 'Kan jeg få servicefradrag?',
        answer:
          'Ja. Som privatkunde kan du benytte servicefradraget og trække en del af arbejdslønnen fra i skat. Se de aktuelle satser på skat.dk.',
      },
      {
        // [BEKRÆFT: medbringer udstyr og midler]
        question: 'Skal jeg selv have rengøringsmidler?',
        answer:
          'Nej. Vi medbringer selv professionelt udstyr og rengøringsmidler.',
      },
    ],
  },
  ctaBand: {
    heading: 'Skal vi tage os af rengøringen?',
    sub: 'Få et gratis og uforpligtende tilbud i dag.',
    cta: { label: 'Få et gratis tilbud', href: quoteHref },
    phoneNote: 'eller ring på',
  },
};

const _en: HomeContent = {
  hero: {
    eyebrow: 'Professional cleaning company in Zealand',
    sloganLine1: 'Your mess.',
    sloganLine2: 'Our mission.',
    support:
      'Professional cleaning for homes and businesses across Zealand – with free, no-obligation quotes.',
    primaryCta: { label: 'Get a free quote', href: quoteHref },
    secondaryCta: { label: 'See our services', href: '#ydelser' },
    image: {
      src: img.cleanSpray,
      alt: 'Professional cleaning of a surface in a bright home',
    },
    floatingCards: [
      {
        icon: 'shield',
        claim: 'insured',
        title: 'Insured work',
        text: 'Staff and your property are covered.',
      },
      {
        icon: 'pin',
        title: 'All of Zealand',
        text: 'From Copenhagen to West Zealand.',
      },
      {
        icon: 'tag',
        title: 'Fixed price',
        text: 'No hidden fees, no surprises.',
      },
    ],
  },
  trustItems: [
    { label: 'Free, no-obligation quotes' },
    { label: 'Fixed price – no hidden fees' },
    { label: 'Fully insured', claim: 'insured' },
    { label: `Registered Danish company · CVR ${siteConfig.cvr}` },
  ],
  marqueeItems: [
    'Recurring cleaning',
    'Deep cleaning',
    'Move-out cleaning',
    'Commercial cleaning',
    'All of Zealand',
  ],
  transformation: {
    eyebrow: 'Your mess. Our mission.',
    heading: 'See the difference professional cleaning makes',
    lead: 'A home that has been properly cleaned does not just look better – it feels different to come home to. Drag the handle and see for yourself.',
    /* [BEKRÆFT] Replace with real before/after photos of your own jobs:
       same room, same camera position, before and after. Then set
       simulated: false — the grime effect and the "Example" chip
       disappear automatically. */
    before: { src: img.cleanSink, alt: 'Kitchen before cleaning' },
    after: { src: img.cleanSink, alt: 'The same kitchen after professional cleaning' },
    simulated: true,
    exampleLabel: 'Example',
    labelBefore: 'Before',
    labelAfter: 'After',
    instruction: 'Drag the handle from side to side',
    sliderLabel: 'Compare before and after cleaning',
  },
  intro: {
    eyebrow: 'About us',
    heading: 'Your cleaning company across Zealand',
    paragraphs: [
      'At All One Rengøring we tailor every job to your needs and wishes – whether it concerns your home or your business. You get a clear, transparent agreement and cleaning that is done properly and on time.',
      'We are happy to prepare your quote from a phone call or an on-site walkthrough, so the price matches reality – not the other way around. Quotes are always free and non-binding.',
    ],
    checklist: [
      'Tailored cleaning plan',
      // [BEKRÆFT: ingen binding]
      'No lock-in – you decide',
      'Fixed, transparent prices',
      'The same high quality every time',
    ],
    image: { src: img.scandiRoom, alt: 'Bright Scandinavian room after cleaning' },
  },
  whyUs: {
    eyebrow: 'Benefits',
    heading: 'Why customers choose us',
    items: [
      {
        icon: 'shield',
        // [BEKRÆFT: forsikringsdækning]
        title: 'Insured work',
        description:
          'Both our staff and your property are covered, so you can feel completely secure.',
      },
      {
        icon: 'leaf',
        // [BEKRÆFT: miljøvenlige midler]
        title: 'Eco-conscious cleaning',
        description:
          'We use gentle, effective products with consideration for homes, people and the environment.',
      },
      {
        icon: 'calendar',
        title: 'Flexible scheduling',
        description:
          'Cleaning is planned to fit your daily life or your business hours.',
      },
      {
        icon: 'user',
        // [BEKRÆFT: fast kontaktperson]
        title: 'Dedicated contact person',
        description:
          'You get one fixed contact who knows your agreement and preferences.',
      },
    ],
  },
  coverage: {
    heading: 'We cover all of Zealand',
    sub: 'Your address is not a barrier – we clean for private customers and businesses across the region.',
    towns: [
      'Copenhagen',
      'Frederiksberg',
      'Roskilde',
      'Hillerød',
      'Helsingør',
      'Næstved',
      'Slagelse',
      'Køge',
      'Holbæk',
      'Greve',
    ],
    note: '… and the rest of Zealand.',
    cta: { label: 'Get a free quote', href: quoteHref },
  },
  audienceCards: [
    {
      kicker: 'Private',
      title: 'Cleaning for your home',
      description:
        'Recurring cleaning, deep cleaning and move-out cleaning – tailored to your home and routine.',
      href: '/privat',
      image: { src: img.livingRoom, alt: 'Nyrengjort skandinavisk stue' },
    },
    {
      kicker: 'Business',
      title: 'Cleaning for businesses',
      // [BEKRÆFT: fast kontaktperson] — confirm before launch.
      description:
        'Professional commercial cleaning with a dedicated contact person and ongoing quality control.',
      href: '/erhverv',
      image: { src: img.boardroom, alt: 'Moderne mødelokale med træpaneler' },
    },
  ],
  audienceLinkLabel: 'Learn more',
  services: {
    eyebrow: 'Services',
    heading: 'How can we help?',
    itemCtaLabel: 'Get a quote',
    items: [
      {
        icon: 'home',
        title: 'Recurring cleaning',
        description:
          'Come home to a clean home – weekly or every other week, planned around your life.',
        image: { src: img.cleanSink, alt: 'Thorough kitchen cleaning' },
        features: [
          'Vacuuming and floor washing',
          'Kitchen and bathroom',
          'Fixed interval on your plan',
        ],
        href: '/ydelser/fast-rengoering',
      },
      {
        icon: 'sparkles',
        title: 'Deep cleaning',
        description:
          'Ceiling to floor and into every corner – when your home deserves a fresh start.',
        image: { src: img.cleanSupplies, alt: 'Professional cleaning equipment' },
        features: [
          'Ceiling to floor, corner to corner',
          'Descaling and extractor hood',
          'After tradesmen or a party',
        ],
        href: '/ydelser/hovedrengoering',
      },
      {
        icon: 'truck',
        title: 'Move-out cleaning',
        description:
          'Hand over a sparkling clean home for inspection – without lifting a cloth yourself.',
        image: { src: img.livingRoom, alt: 'Freshly cleaned home ready for handover' },
        features: [
          'Cupboards and appliances inside',
          'Ready for inspection and handover',
          'Fixed price by square metre',
        ],
        href: '/ydelser/flytterengoering',
      },
      {
        icon: 'building',
        title: 'Commercial cleaning',
        description:
          'Clean premises, happy staff – during or outside your opening hours.',
        image: { src: img.boardroom, alt: 'Clean, modern meeting room' },
        features: [
          'Offices, kitchen and restrooms',
          'During or outside working hours',
          'Dedicated contact person',
        ],
        href: '/ydelser/erhvervsrengoering',
      },
    ],
  },
  processContent: {
    heading: 'How it works',
    steps: [
      {
        title: 'Tell us about the task',
        description:
          'Describe your needs via the form – it only takes a few minutes.',
      },
      {
        title: 'Receive your quote',
        description:
          'You get a free, no-obligation quote with a fixed, transparent price.',
      },
      {
        title: 'We handle the cleaning',
        description:
          'Our team arrives as agreed and delivers quality you can count on.',
      },
    ],
  },
  faq: {
    heading: 'Frequently asked questions',
    lead: 'Find answers to the most common questions – or contact us directly.',
    items: [
      {
        question: 'What does cleaning cost?',
        answer:
          'The price depends on the scope of the task, the size of the home, and how often we clean. Fill in the form and receive a free, no-obligation quote.',
      },
      {
        question: 'Is the quote binding?',
        answer:
          'No. All quotes are free and entirely non-binding – you decide whether to proceed.',
      },
      {
        question: 'Can I get recurring cleaning?',
        answer:
          'Yes. We offer recurring cleaning at an interval that suits you – for example weekly or every other week.',
      },
      {
        question: 'Which areas do you cover?',
        answer:
          'We clean across all of Zealand – for both private customers and businesses.',
      },
      {
        question: 'How do I get started?',
        answer:
          'Fill in the form with a short description of the task, and we will get back to you with a no-obligation quote.',
      },
      {
        question: 'Can I use the Danish service deduction (servicefradrag)?',
        answer:
          'Yes. As a private customer you can use the servicefradrag and deduct part of the labour cost from your taxes. See current rates at skat.dk.',
      },
      {
        // [BEKRÆFT: medbringer udstyr og midler]
        question: 'Do I need to provide cleaning supplies?',
        answer: 'No. We bring professional equipment and cleaning products.',
      },
    ],
  },
  ctaBand: {
    heading: 'Shall we take care of the cleaning?',
    sub: 'Get a free, no-obligation quote today.',
    cta: { label: 'Get a free quote', href: quoteHref },
    phoneNote: 'or call',
  },
};

export const homeContent: Record<Locale, HomeContent> = { da };

/** Trust surfaces render only what the business has actually confirmed. */
export function visibleTrustItems(content: HomeContent) {
  return content.trustItems.filter(
    (item) => !item.claim || isConfirmed(item.claim),
  );
}

export function visibleHeroCards(content: HomeContent) {
  return content.hero.floatingCards.filter(
    (card) => !card.claim || isConfirmed(card.claim),
  );
}
